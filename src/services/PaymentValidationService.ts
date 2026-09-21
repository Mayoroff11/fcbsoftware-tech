import { Invoice, PaymentStatus } from '../types/payment.ts';
import { MAX_AUTO_CONFIRM_OVERPAYMENT_USD } from '../config/cryptoConfig.ts';

export interface PaymentEvaluation {
  status: PaymentStatus;
  isAcceptableForAutoConfirm: boolean;
  isUnderpaid: boolean;
  isOverpaidWithinLimit: boolean;
  isOverpaidAboveLimit: boolean;
  receivedAmount: number;
  underpaidAmount?: number;
  overpaidAmount?: number;
  overpaidUsdAmount?: number;
  message: string;
}

/**
 * Authoritative payment amount evaluator.
 * Uses the invoice's LOCKED crypto amount and LOCKED exchange rate as the source of truth.
 * 
 * Rules:
 * 1. Underpayment: received < required -> 'underpaid' (Payment Shortfall). No auto-confirmation.
 * 2. Exact or Reasonable Overpayment: received >= required and (excess * lockedRate) <= $200 -> eligible for auto-confirmation.
 * 3. Overpayment > $200: (excess * lockedRate) > $200 -> 'overpaid_manual_review'. Prevents automatic fulfillment.
 */
export class PaymentValidationService {
  public static evaluatePayment(
    invoice: Invoice,
    receivedCryptoAmount: number
  ): PaymentEvaluation {
    const requiredCrypto = invoice.cryptoAmount;
    const lockedRate = invoice.exchangeRate;

    // 1. Underpayment check (with 0.1% rounding tolerance)
    if (receivedCryptoAmount < requiredCrypto * 0.999) {
      const shortfallCrypto = requiredCrypto - receivedCryptoAmount;
      return {
        status: 'underpaid',
        isAcceptableForAutoConfirm: false,
        isUnderpaid: true,
        isOverpaidWithinLimit: false,
        isOverpaidAboveLimit: false,
        receivedAmount: receivedCryptoAmount,
        underpaidAmount: shortfallCrypto,
        message: `Underpaid: received ${receivedCryptoAmount} ${invoice.asset}, required ${invoice.cryptoAmountFormatted} ${invoice.asset}.`
      };
    }

    // 2. Calculate excess funds using the locked invoice exchange rate
    const excessCrypto = Math.max(0, receivedCryptoAmount - requiredCrypto);
    const excessUsd = excessCrypto * lockedRate;

    // 3. Excess above the $200 threshold -> Manual Review
    if (excessUsd > MAX_AUTO_CONFIRM_OVERPAYMENT_USD) {
      return {
        status: 'overpaid_manual_review',
        isAcceptableForAutoConfirm: false,
        isUnderpaid: false,
        isOverpaidWithinLimit: false,
        isOverpaidAboveLimit: true,
        receivedAmount: receivedCryptoAmount,
        overpaidAmount: excessCrypto,
        overpaidUsdAmount: excessUsd,
        message: `Overpayment of +$${excessUsd.toFixed(2)} USD detected (exceeds $${MAX_AUTO_CONFIRM_OVERPAYMENT_USD} auto-fulfillment threshold). Sent for manual operator review.`
      };
    }

    // 4. Exact or acceptable overpayment within $200 limit
    const isOverpaidWithinLimit = excessUsd > 0.01;
    return {
      status: 'payment_detected',
      isAcceptableForAutoConfirm: true,
      isUnderpaid: false,
      isOverpaidWithinLimit,
      isOverpaidAboveLimit: false,
      receivedAmount: receivedCryptoAmount,
      overpaidAmount: isOverpaidWithinLimit ? excessCrypto : undefined,
      overpaidUsdAmount: isOverpaidWithinLimit ? excessUsd : undefined,
      message: isOverpaidWithinLimit
        ? `Payment detected with acceptable overpayment (+$${excessUsd.toFixed(2)} USD within $${MAX_AUTO_CONFIRM_OVERPAYMENT_USD} limit).`
        : 'Payment detected successfully for the full required amount.'
    };
  }
}
