import { Invoice, PaymentStatus, NetworkId } from '../types/payment.ts';
import { NETWORKS } from '../config/cryptoConfig.ts';
import { InvoiceService } from './InvoiceService.ts';
import { PaymentValidationService } from './PaymentValidationService.ts';

export class BlockchainMonitorService {
  /**
   * Constructs the accurate blockchain explorer transaction URL
   */
  static getExplorerTxUrl(networkId: NetworkId, txHash: string): string {
    const network = NETWORKS[networkId] || NETWORKS.bitcoin;
    return `${network.explorerTxUrl}${txHash}`;
  }

  /**
   * Constructs the accurate blockchain explorer address URL
   */
  static getExplorerAddressUrl(networkId: NetworkId, address: string): string {
    const network = NETWORKS[networkId] || NETWORKS.bitcoin;
    return `${network.explorerAddressUrl}${address}`;
  }

  /**
   * Generates a realistic mock transaction hash for the specific network standard
   */
  static generateTxHash(networkId: NetworkId): string {
    const network = NETWORKS[networkId] || NETWORKS.bitcoin;
    const hexChars = '0123456789abcdef';
    let hash = '';
    const length = 64;

    for (let i = 0; i < length; i++) {
      hash += hexChars[Math.floor(Math.random() * hexChars.length)];
    }

    if (network.addressType === 'evm') {
      return `0x${hash}`;
    }
    return hash;
  }

  /**
   * Simulates detecting a matching incoming transaction on-chain.
   * Evaluates the payment amount against the locked invoice requirements and
   * the $200 overpayment threshold using the locked exchange rate.
   */
  static simulatePaymentDetected(invoiceId: string, amountOverride?: number): Invoice | null {
    const invoice = InvoiceService.getInvoice(invoiceId);
    if (!invoice) return null;

    const txHash = this.generateTxHash(invoice.network);
    const explorerUrl = this.getExplorerTxUrl(invoice.network, txHash);
    const amount = amountOverride !== undefined ? amountOverride : invoice.cryptoAmount;

    // Evaluate using authoritative locked quote source of truth
    const evaluation = PaymentValidationService.evaluatePayment(invoice, amount);

    return InvoiceService.updateStatus(invoiceId, evaluation.status, {
      transactionHash: txHash,
      explorerUrl,
      detectedAt: Date.now(),
      receivedAmount: evaluation.receivedAmount,
      underpaidAmount: evaluation.underpaidAmount,
      overpaidAmount: evaluation.overpaidAmount,
      overpaidUsdAmount: evaluation.overpaidUsdAmount,
      confirmations: 0
    });
  }

  /**
   * Advances confirmation count for an active transaction.
   * Only transitions to 'confirmed' if the payment is within the acceptable allowance.
   * Underpaid payments and Overpayments > $200 remain in their respective hold states.
   */
  static simulateAdvanceConfirmation(invoiceId: string): Invoice | null {
    const invoice = InvoiceService.getInvoice(invoiceId);
    if (!invoice || !invoice.transactionHash) return null;

    const newConfirmations = (invoice.confirmations || 0) + 1;
    const isConfirmed = newConfirmations >= invoice.requiredConfirmations;

    let status: PaymentStatus;
    if (invoice.status === 'underpaid') {
      status = 'underpaid';
    } else if (invoice.status === 'overpaid_manual_review') {
      status = 'overpaid_manual_review';
    } else {
      status = isConfirmed ? 'confirmed' : 'confirming';
    }

    return InvoiceService.updateStatus(invoiceId, status, {
      confirmations: newConfirmations,
      confirmedAt: status === 'confirmed' ? Date.now() : undefined
    });
  }

  /**
   * Instantly confirms payment for testing/verification (simulating full block confirmations)
   */
  static simulateInstantConfirm(invoiceId: string): Invoice | null {
    const invoice = InvoiceService.getInvoice(invoiceId);
    if (!invoice) return null;

    const txHash = invoice.transactionHash || this.generateTxHash(invoice.network);
    const explorerUrl = this.getExplorerTxUrl(invoice.network, txHash);
    const amount = invoice.receivedAmount !== undefined ? invoice.receivedAmount : invoice.cryptoAmount;

    // Check if the current or target amount is eligible
    const evaluation = PaymentValidationService.evaluatePayment(invoice, amount);
    if (!evaluation.isAcceptableForAutoConfirm) {
      // If it's underpaid or overpaid above $200, retain that status with full confirmations
      return InvoiceService.updateStatus(invoiceId, evaluation.status, {
        transactionHash: txHash,
        explorerUrl,
        detectedAt: invoice.detectedAt || Date.now() - 30000,
        confirmations: invoice.requiredConfirmations,
        receivedAmount: amount,
        underpaidAmount: evaluation.underpaidAmount,
        overpaidAmount: evaluation.overpaidAmount,
        overpaidUsdAmount: evaluation.overpaidUsdAmount
      });
    }

    return InvoiceService.updateStatus(invoiceId, 'confirmed', {
      transactionHash: txHash,
      explorerUrl,
      detectedAt: invoice.detectedAt || Date.now() - 30000,
      confirmedAt: Date.now(),
      confirmations: invoice.requiredConfirmations,
      receivedAmount: amount,
      overpaidAmount: evaluation.overpaidAmount,
      overpaidUsdAmount: evaluation.overpaidUsdAmount
    });
  }

  /**
   * Resets status back to awaiting payment
   */
  static resetToAwaiting(invoiceId: string): Invoice | null {
    return InvoiceService.updateStatus(invoiceId, 'awaiting_payment', {
      transactionHash: undefined,
      explorerUrl: undefined,
      detectedAt: undefined,
      confirmedAt: undefined,
      confirmations: 0,
      underpaidAmount: undefined,
      overpaidAmount: undefined,
      overpaidUsdAmount: undefined,
      receivedAmount: undefined
    });
  }
}
