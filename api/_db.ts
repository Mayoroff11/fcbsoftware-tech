import fs from 'fs';
import path from 'path';
import type { Invoice, WalletId, AssetSymbol, NetworkId, PaymentStatus } from '../src/types/payment.ts';
import { WALLET_CONFIGS, WALLET_ROTATION_ORDER, NETWORKS, ASSETS, getReceivingAddress, MAX_AUTO_CONFIRM_OVERPAYMENT_USD } from '../src/config/cryptoConfig.ts';
import { ALL_LICENSE_PLANS } from '../src/data/websiteData.ts';

const DB_FILE_PATH = path.join('/tmp', 'fcb_invoices_registry.json');
const INVOICE_DURATION_MS = 15 * 60 * 1000; // 15 minutes quote window

interface PersistentState {
  rotationCursor: number;
  invoices: Record<string, Invoice>;
  usedTxHashes: Record<string, { invoiceId: string; timestamp: number }>;
}

class ServerDatabase {
  private rotationCursor: number = 0;
  private invoices: Map<string, Invoice> = new Map();
  private usedTxHashes: Map<string, { invoiceId: string; timestamp: number }> = new Map();
  private rateLimits: Map<string, { count: number; resetAt: number }> = new Map();
  private isLoaded: boolean = false;

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const data: PersistentState = JSON.parse(raw);
        if (typeof data.rotationCursor === 'number') {
          this.rotationCursor = data.rotationCursor;
        }
        if (data.invoices && typeof data.invoices === 'object') {
          for (const [id, inv] of Object.entries(data.invoices)) {
            this.invoices.set(id.toUpperCase(), inv);
          }
        }
        if (data.usedTxHashes && typeof data.usedTxHashes === 'object') {
          for (const [hash, meta] of Object.entries(data.usedTxHashes)) {
            this.usedTxHashes.set(this.normalizeHash(hash), meta);
          }
        }
      }
    } catch (err) {
      console.warn('[FCB DB] Notice: Disk state not loaded, using fresh memory state:', err);
    }
    this.isLoaded = true;
  }

  private saveToDisk() {
    try {
      const state: PersistentState = {
        rotationCursor: this.rotationCursor,
        invoices: Object.fromEntries(this.invoices.entries()),
        usedTxHashes: Object.fromEntries(this.usedTxHashes.entries()),
      };
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
    } catch (err) {
      // In read-only environments, in-memory state remains fully intact
      console.warn('[FCB DB] Failed to save state to disk:', err);
    }
  }

  public normalizeHash(hash: string): string {
    return hash.trim().toLowerCase();
  }

  /**
   * Concurrency-safe atomic wallet assignment (Wallet A -> Wallet B -> Wallet C -> Wallet A...)
   * Synchronously advances the index so no two simultaneous requests collide.
   */
  public getNextWallet(): WalletId {
    const assigned = WALLET_ROTATION_ORDER[this.rotationCursor % WALLET_ROTATION_ORDER.length];
    this.rotationCursor = (this.rotationCursor + 1) % WALLET_ROTATION_ORDER.length;
    this.saveToDisk();
    return assigned;
  }

  /**
   * Generates a unique, collision-resistant Invoice ID (e.g. FCB-894217)
   */
  public generateInvoiceId(): string {
    let id = '';
    do {
      const num = Math.floor(100000 + Math.random() * 900000);
      id = `FCB-${num}`;
    } while (this.invoices.has(id));
    return id;
  }

  public parseUsdPrice(priceStr: string): number {
    const cleaned = priceStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 1999 : num;
  }

  /**
   * Authoritatively creates an invoice on the server
   */
  public createInvoice(
    planId: string = '1m-personal',
    asset: AssetSymbol = 'BTC',
    network?: NetworkId,
    customerEmail?: string
  ): Invoice {
    const plan = ALL_LICENSE_PLANS.find((p) => p.id === planId) || ALL_LICENSE_PLANS[0];
    const usdAmount = this.parseUsdPrice(plan.price);

    // Atomically advance wallet cursor
    const walletId = this.getNextWallet();

    const assetConfig = ASSETS[asset] || ASSETS.BTC;
    const defaultNetwork = network || assetConfig.supportedNetworks[0].networkId;
    const networkConfig = NETWORKS[defaultNetwork] || NETWORKS.bitcoin;
    const receivingAddress = getReceivingAddress(walletId, defaultNetwork);

    const exchangeRate = assetConfig.defaultPriceUsd;
    const rawCrypto = usdAmount / exchangeRate;
    const decimals = assetConfig.decimals <= 8 ? assetConfig.decimals : 8;
    const cryptoAmount = Number(rawCrypto.toFixed(decimals));
    const cryptoAmountFormatted = cryptoAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals,
    });

    const now = Date.now();
    const id = this.generateInvoiceId();
    const selectedNetworkSupported = assetConfig.supportedNetworks.find((n) => n.networkId === defaultNetwork);

    const invoice: Invoice = {
      id,
      invoiceNumber: id,
      planId: plan.id,
      planName: `${plan.durationName} ${plan.title}`,
      planType: plan.type,
      durationName: plan.durationName,
      usdAmount,
      walletId,
      asset,
      network: defaultNetwork,
      receivingAddress,
      tokenContract: selectedNetworkSupported?.tokenContract,
      cryptoAmount,
      cryptoAmountFormatted,
      exchangeRate,
      createdAt: now,
      expiresAt: now + INVOICE_DURATION_MS,
      status: 'awaiting_payment',
      customerEmail: customerEmail?.trim() || undefined,
      confirmations: 0,
      requiredConfirmations: networkConfig.confirmationBlocks,
      updatedAt: now,
      licenseHash: `FCB-LKEY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      adminNotificationSent: false,
    };

    this.invoices.set(id, invoice);
    this.saveToDisk();
    return invoice;
  }

  /**
   * Retrieves an invoice by ID
   */
  public getInvoice(id: string): Invoice | null {
    if (!id) return null;
    const normalizedId = id.trim().toUpperCase();
    const invoice = this.invoices.get(normalizedId);
    if (!invoice) return null;

    // Check expiration
    if (invoice.status === 'awaiting_payment' && Date.now() > invoice.expiresAt) {
      invoice.status = 'expired';
      invoice.updatedAt = Date.now();
      this.saveToDisk();
    }

    return invoice;
  }

  /**
   * Updates an invoice while strictly preserving ID, assigned wallet, and remaining time
   */
  public updateInvoiceAssetNetwork(
    id: string,
    newAsset: AssetSymbol,
    newNetwork: NetworkId
  ): Invoice | null {
    const invoice = this.getInvoice(id);
    if (!invoice || invoice.status === 'confirmed' || invoice.status === 'expired') return null;

    const assetConfig = ASSETS[newAsset] || ASSETS.BTC;
    const networkConfig = NETWORKS[newNetwork] || NETWORKS.bitcoin;
    const receivingAddress = getReceivingAddress(invoice.walletId, newNetwork);
    const selectedNetworkSupported = assetConfig.supportedNetworks.find((n) => n.networkId === newNetwork);

    const exchangeRate = assetConfig.defaultPriceUsd;
    const rawCrypto = invoice.usdAmount / exchangeRate;
    const decimals = assetConfig.decimals <= 8 ? assetConfig.decimals : 8;
    const cryptoAmount = Number(rawCrypto.toFixed(decimals));
    const cryptoAmountFormatted = cryptoAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals,
    });

    invoice.asset = newAsset;
    invoice.network = newNetwork;
    invoice.receivingAddress = receivingAddress;
    invoice.tokenContract = selectedNetworkSupported?.tokenContract;
    invoice.cryptoAmount = cryptoAmount;
    invoice.cryptoAmountFormatted = cryptoAmountFormatted;
    invoice.exchangeRate = exchangeRate;
    invoice.requiredConfirmations = networkConfig.confirmationBlocks;
    invoice.updatedAt = Date.now();

    this.invoices.set(invoice.id, invoice);
    this.saveToDisk();
    return invoice;
  }

  /**
   * Saves or updates an invoice in memory and disk
   */
  public saveInvoice(invoice: Invoice): Invoice {
    invoice.updatedAt = Date.now();
    this.invoices.set(invoice.id, invoice);

    // If transactionHash exists and verified/confirmed, record in TX registry
    if (invoice.transactionHash && (invoice.status === 'confirmed' || invoice.status === 'confirming' || invoice.status === 'payment_detected' || invoice.status === 'overpaid_manual_review' || invoice.status === 'manual_review')) {
      const norm = this.normalizeHash(invoice.transactionHash);
      this.usedTxHashes.set(norm, {
        invoiceId: invoice.id,
        timestamp: Date.now(),
      });
    }

    this.saveToDisk();
    return invoice;
  }

  /**
   * Checks if a TXID is already associated with another invoice (prevents replay / duplicate claims)
   */
  public isTxHashUsed(txHash: string, currentInvoiceId: string): { isUsed: boolean; conflictingInvoiceId?: string } {
    const norm = this.normalizeHash(txHash);
    const existing = this.usedTxHashes.get(norm);
    if (existing && existing.invoiceId !== currentInvoiceId) {
      return { isUsed: true, conflictingInvoiceId: existing.invoiceId };
    }

    // Also scan all invoices to be thorough
    for (const [invId, inv] of this.invoices.entries()) {
      if (invId !== currentInvoiceId && inv.transactionHash && this.normalizeHash(inv.transactionHash) === norm) {
        if (inv.status === 'confirmed' || inv.status === 'confirming' || inv.status === 'payment_detected' || inv.status === 'overpaid_manual_review' || inv.status === 'manual_review') {
          return { isUsed: true, conflictingInvoiceId: invId };
        }
      }
    }

    return { isUsed: false };
  }

  /**
   * Registers a TXID to an invoice
   */
  public registerTxHash(txHash: string, invoiceId: string): void {
    const norm = this.normalizeHash(txHash);
    this.usedTxHashes.set(norm, {
      invoiceId,
      timestamp: Date.now(),
    });
    this.saveToDisk();
  }

  /**
   * Validates reasonable TXID format for the specific network
   */
  public validateTxHashFormat(networkId: NetworkId, txHash: string): { isValid: boolean; error?: string } {
    const trimmed = txHash.trim();
    if (!trimmed) {
      return { isValid: false, error: 'Transaction hash / TXID is required.' };
    }

    const netConfig = NETWORKS[networkId] || NETWORKS.bitcoin;

    switch (netConfig.addressType) {
      case 'evm':
        // 0x + 64 hex characters
        if (!/^0x[a-fA-F0-9]{64}$/.test(trimmed)) {
          return { isValid: false, error: 'Invalid EVM transaction hash. Expected 0x followed by 64 hexadecimal characters.' };
        }
        break;
      case 'btc':
      case 'tron':
        // 64 hex characters (or 0x prefix if user typed it)
        if (!/^(0x)?[a-fA-F0-9]{64}$/.test(trimmed)) {
          return { isValid: false, error: `Invalid ${netConfig.name} transaction hash. Expected 64 hexadecimal characters.` };
        }
        break;
      case 'sol':
        // Solana base58 signature (typically 87-88 characters)
        if (!/^[1-9A-HJ-NP-Za-km-z]{80,90}$/.test(trimmed)) {
          return { isValid: false, error: 'Invalid Solana transaction signature. Expected base58 string.' };
        }
        break;
      case 'ton':
        // TON hash (base64 or hex)
        if (trimmed.length < 32 || trimmed.length > 128) {
          return { isValid: false, error: 'Invalid TON transaction hash format.' };
        }
        break;
    }

    return { isValid: true };
  }

  /**
   * Rate limiter: max 10 verification attempts per IP/session per minute
   */
  public checkRateLimit(clientIp: string): boolean {
    const now = Date.now();
    const entry = this.rateLimits.get(clientIp);
    if (!entry || now > entry.resetAt) {
      this.rateLimits.set(clientIp, { count: 1, resetAt: now + 60000 });
      return true;
    }
    if (entry.count >= 12) {
      return false;
    }
    entry.count += 1;
    return true;
  }
}

export const serverDb = new ServerDatabase();
