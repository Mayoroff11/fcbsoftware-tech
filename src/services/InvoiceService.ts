import { Invoice, AssetSymbol, NetworkId, WalletId, PaymentStatus } from '../types/payment.ts';
import { ALL_LICENSE_PLANS } from '../data/websiteData.ts';
import { WALLET_CONFIGS, NETWORKS, ASSETS, getReceivingAddress } from '../config/cryptoConfig.ts';
import { WalletRotationService } from './WalletRotationService.ts';
import { RateService } from './RateService.ts';

const INVOICES_STORAGE_KEY = 'fcb_invoices_registry_v1';
const INVOICE_DURATION_MS = 15 * 60 * 1000; // 15 Minutes quote window

export class InvoiceService {
  /**
   * Retrieves all persisted invoices from authoritative storage
   */
  private static getAllInvoices(): Record<string, Invoice> {
    try {
      const data = localStorage.getItem(INVOICES_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return {};
  }

  /**
   * Saves invoice to storage
   */
  private static saveInvoice(invoice: Invoice): void {
    try {
      const invoices = this.getAllInvoices();
      invoices[invoice.id] = invoice;
      localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
    } catch {
      // Fallback
    }
  }

  /**
   * Helper to generate unique invoice ID (e.g. FCB-842915)
   */
  private static generateInvoiceId(): string {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
    return `FCB-${randomSuffix}`;
  }

  /**
   * Parses numerical USD amount from plan price string (e.g. "$1,999" -> 1999)
   */
  public static parseUsdPrice(priceStr: string): number {
    const cleaned = priceStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 1999 : num;
  }

  /**
   * Creates a brand new invoice with ATOMIC WALLET ROTATION (A -> B -> C -> A...)
   */
  public static async createInvoice(
    planId: string = '1m-personal',
    initialAsset: AssetSymbol = 'BTC',
    initialNetwork?: NetworkId
  ): Promise<Invoice> {
    const plan = ALL_LICENSE_PLANS.find((p) => p.id === planId) || ALL_LICENSE_PLANS[0];
    const usdAmount = this.parseUsdPrice(plan.price);

    // 1. Assign next wallet atomically in rotation
    const assignedWalletId: WalletId = WalletRotationService.getNextWallet();

    // 2. Validate asset and network
    const assetConfig = ASSETS[initialAsset] || ASSETS.BTC;
    const defaultNetwork = initialNetwork || assetConfig.supportedNetworks[0].networkId;
    const networkConfig = NETWORKS[defaultNetwork];

    // 3. Resolve receiving address
    const receivingAddress = getReceivingAddress(assignedWalletId, defaultNetwork);

    // 4. Fetch market exchange rates
    const rates = await RateService.getLatestRates();
    const rate = rates[initialAsset] || assetConfig.defaultPriceUsd;

    // 5. Calculate crypto amount
    const { amount, formatted } = RateService.calculateCryptoAmount(usdAmount, rate, initialAsset);

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
      walletId: assignedWalletId,
      asset: initialAsset,
      network: defaultNetwork,
      receivingAddress,
      tokenContract: selectedNetworkSupported?.tokenContract,
      cryptoAmount: amount,
      cryptoAmountFormatted: formatted,
      exchangeRate: rate,
      createdAt: now,
      expiresAt: now + INVOICE_DURATION_MS,
      status: 'awaiting_payment',
      confirmations: 0,
      requiredConfirmations: networkConfig.confirmationBlocks,
      updatedAt: now,
      licenseHash: `FCB-LKEY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    this.saveInvoice(invoice);
    return invoice;
  }

  /**
   * Retrieves an existing invoice by ID.
   * Restores the exact same invoice (same wallet, address, rate, amount, timestamps).
   */
  public static getInvoice(invoiceId: string): Invoice | null {
    if (!invoiceId) return null;
    const formattedId = invoiceId.trim().toUpperCase();
    const invoices = this.getAllInvoices();
    let invoice = invoices[formattedId] || null;

    if (invoice) {
      invoice = this.checkAndUpdateExpiry(invoice);
    }
    return invoice;
  }

  /**
   * Updates an invoice's asset or network while PRESERVING:
   * - the same invoice ID
   * - the same assigned wallet ID
   * - the original expiry countdown
   */
  public static async updateInvoiceAssetNetwork(
    invoiceId: string,
    newAsset: AssetSymbol,
    newNetwork: NetworkId
  ): Promise<Invoice | null> {
    const invoice = this.getInvoice(invoiceId);
    if (!invoice) return null;

    const assetConfig = ASSETS[newAsset] || ASSETS.BTC;
    const selectedNetworkSupported = assetConfig.supportedNetworks.find((n) => n.networkId === newNetwork);
    const networkConfig = NETWORKS[newNetwork];

    // Re-resolve address for the assigned wallet on the new network
    const receivingAddress = getReceivingAddress(invoice.walletId, newNetwork);

    // Fetch current rate for new asset
    const rates = await RateService.getLatestRates();
    const rate = rates[newAsset] || assetConfig.defaultPriceUsd;

    const { amount, formatted } = RateService.calculateCryptoAmount(invoice.usdAmount, rate, newAsset);

    invoice.asset = newAsset;
    invoice.network = newNetwork;
    invoice.receivingAddress = receivingAddress;
    invoice.tokenContract = selectedNetworkSupported?.tokenContract;
    invoice.cryptoAmount = amount;
    invoice.cryptoAmountFormatted = formatted;
    invoice.exchangeRate = rate;
    invoice.requiredConfirmations = networkConfig.confirmationBlocks;
    invoice.updatedAt = Date.now();

    this.saveInvoice(invoice);
    return invoice;
  }

  /**
   * Checks if an invoice has expired
   */
  public static checkAndUpdateExpiry(invoice: Invoice): Invoice {
    if (invoice.status === 'awaiting_payment' && Date.now() > invoice.expiresAt) {
      invoice.status = 'expired';
      invoice.updatedAt = Date.now();
      this.saveInvoice(invoice);
    }
    return invoice;
  }

  /**
   * Updates payment status with verification details
   */
  public static updateStatus(
    invoiceId: string,
    status: PaymentStatus,
    details?: Partial<Invoice>
  ): Invoice | null {
    const invoice = this.getInvoice(invoiceId);
    if (!invoice) return null;

    invoice.status = status;
    invoice.updatedAt = Date.now();

    if (details) {
      if (details.transactionHash !== undefined) invoice.transactionHash = details.transactionHash;
      if (details.detectedAt !== undefined) invoice.detectedAt = details.detectedAt;
      if (details.confirmedAt !== undefined) invoice.confirmedAt = details.confirmedAt;
      if (details.confirmations !== undefined) invoice.confirmations = details.confirmations;
      if (details.receivedAmount !== undefined) invoice.receivedAmount = details.receivedAmount;
      if (details.underpaidAmount !== undefined) invoice.underpaidAmount = details.underpaidAmount;
      if (details.overpaidAmount !== undefined) invoice.overpaidAmount = details.overpaidAmount;
      if (details.overpaidUsdAmount !== undefined) invoice.overpaidUsdAmount = details.overpaidUsdAmount;
      if (details.explorerUrl !== undefined) invoice.explorerUrl = details.explorerUrl;
    }

    this.saveInvoice(invoice);
    return invoice;
  }
}
