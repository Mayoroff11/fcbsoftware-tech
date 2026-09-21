import type {
  PaymentVerificationRequest,
  PaymentVerificationResponse,
  Invoice,
} from '../types/payment.ts';
import { InvoiceService } from './InvoiceService.ts';

export class PaymentVerificationService {
  /**
   * Sends customer payment details to the authoritative server-side endpoint.
   * The server validates the transaction format, on-chain destination, asset,
   * amount, uniqueness, and sends Zoho admin notification upon successful verification.
   */
  public static async verifyPayment(
    request: PaymentVerificationRequest
  ): Promise<PaymentVerificationResponse> {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId: request.invoiceId.trim().toUpperCase(),
          txHash: request.txHash.trim(),
          customerEmail: request.customerEmail.trim(),
          receiptFileName: request.receiptFileName,
          receiptDataUrl: request.receiptDataUrl,
        }),
      });

      let data: PaymentVerificationResponse;
      try {
        data = await response.json();
      } catch {
        throw new Error('Unable to parse server verification response.');
      }

      // If invoice was updated on the server, synchronize local client cache
      if (data.invoice) {
        InvoiceService.cacheInvoice(data.invoice);
      }

      if (!response.ok && !data.status) {
        return {
          success: false,
          status: 'failed',
          message: data.error || 'Unable to complete transaction verification.',
          error: data.error,
        };
      }

      return data;
    } catch (err: any) {
      console.warn('[FCB Verification] API call fallback:', err);
      // Fallback in purely offline client environment
      return {
        success: false,
        status: 'payment_not_yet_detected',
        message:
          "We couldn't verify this transaction yet. If you recently sent the payment, it may still be processing. Please check the transaction hash and try again shortly.",
        error: err?.message,
      };
    }
  }
}
