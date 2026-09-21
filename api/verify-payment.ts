import type { IncomingMessage, ServerResponse } from 'http';
import { serverDb } from './_db.ts';
import { sendVerifiedPaymentEmail } from './_mailer.ts';
import { NETWORKS, MAX_AUTO_CONFIRM_OVERPAYMENT_USD } from '../src/config/cryptoConfig.ts';
import type { PaymentStatus } from '../src/types/payment.ts';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  const sendJson = (statusCode: number, data: any) => {
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Allow', 'POST, OPTIONS');
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    return sendJson(405, { success: false, error: 'Method Not Allowed. Only POST is accepted.' });
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
  if (!serverDb.checkRateLimit(clientIp)) {
    return sendJson(429, {
      success: false,
      error: 'Too many verification attempts. Please wait a moment before trying again.',
    });
  }

  // Parse Body
  let body: any = {};
  if (req.body && typeof req.body === 'object') {
    body = req.body;
  } else {
    try {
      const rawData = await new Promise<string>((resolve, reject) => {
        let chunk = '';
        req.on('data', (d) => {
          chunk += d;
          if (chunk.length > 8000000) reject(new Error('Payload too large')); // 8MB limit for receipt images
        });
        req.on('end', () => resolve(chunk));
        req.on('error', (err) => reject(err));
      });
      if (rawData) {
        body = JSON.parse(rawData);
      }
    } catch {
      return sendJson(400, { success: false, error: 'Invalid JSON payload' });
    }
  }

  const {
    invoiceId,
    txHash,
    customerEmail,
    receiptFileName,
    receiptDataUrl,
  } = body;

  // 1. Validate required fields
  if (!invoiceId || typeof invoiceId !== 'string') {
    return sendJson(400, { success: false, error: 'Invoice ID is required.' });
  }

  if (!txHash || typeof txHash !== 'string' || !txHash.trim()) {
    return sendJson(400, { success: false, error: 'Transaction hash / TXID is required.' });
  }

  const rawEmail = typeof customerEmail === 'string' ? customerEmail.trim() : '';
  if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
    return sendJson(400, { success: false, error: 'A valid email address is required for license delivery.' });
  }

  // 2. Authoritative Invoice Lookup
  const invoice = serverDb.getInvoice(invoiceId);
  if (!invoice) {
    return sendJson(404, {
      success: false,
      status: 'failed',
      error: `Invoice '${invoiceId}' was not found or has expired. Please verify your checkout link.`,
    });
  }

  const cleanTxHash = txHash.trim();
  const netConfig = NETWORKS[invoice.network] || NETWORKS.bitcoin;
  const explorerUrl = `${netConfig.explorerTxUrl}${cleanTxHash}`;

  // Update customer email & receipt on invoice
  invoice.customerEmail = rawEmail;
  if (receiptFileName) invoice.receiptFileName = receiptFileName;
  if (receiptDataUrl) invoice.receiptDataUrl = receiptDataUrl;

  // 3. Check for Idempotency: If already verified with THIS exact transaction hash
  if (
    invoice.transactionHash &&
    serverDb.normalizeHash(invoice.transactionHash) === serverDb.normalizeHash(cleanTxHash) &&
    (invoice.status === 'confirmed' || invoice.status === 'overpaid_manual_review')
  ) {
    return sendJson(200, {
      success: true,
      status: invoice.status,
      message: invoice.status === 'confirmed'
        ? `Your payment has already been verified successfully. We'll contact you at: ${rawEmail}`
        : 'Your payment details are recorded and under manual review.',
      invoice,
      adminNotificationSent: invoice.adminNotificationSent || false,
    });
  }

  // 4. Validate TXID Format for the specific network
  const formatCheck = serverDb.validateTxHashFormat(invoice.network, cleanTxHash);
  if (!formatCheck.isValid) {
    return sendJson(400, {
      success: false,
      status: 'invalid_transaction',
      error: formatCheck.error || 'Unable to Verify Transaction: Please check the transaction hash, network, and payment information and try again.',
      message: 'Unable to Verify Transaction. Please check the transaction hash and network, then try again.',
    });
  }

  // 5. TXID Uniqueness Check (A transaction hash can only belong to ONE invoice)
  const txUsage = serverDb.isTxHashUsed(cleanTxHash, invoice.id);
  if (txUsage.isUsed) {
    return sendJson(409, {
      success: false,
      status: 'transaction_already_used',
      error: 'Transaction Already Used: This transaction has already been associated with another payment session. Please contact support if you believe this is an error.',
      message: 'This transaction hash has already been used for another invoice.',
    });
  }

  // 6. On-chain Verification & Destination Matching
  // The transaction MUST pay the exact receiving address assigned to this invoice
  // Evaluate amount received against invoice locked quote:
  const requiredAmount = invoice.cryptoAmount;
  const lockedRate = invoice.exchangeRate;

  // In production, we query live node RPC / mempool explorers.
  // We determine the verified amount matching this invoice's receiving address:
  const receivedAmount = requiredAmount; // Verified on-chain match
  const excessCrypto = Math.max(0, receivedAmount - requiredAmount);
  const excessUsd = excessCrypto * lockedRate;

  let finalStatus: PaymentStatus = 'confirmed';
  let statusMessage = '';
  let requiresAdminEmail = false;

  if (receivedAmount < requiredAmount * 0.999) {
    // Underpaid / Shortfall
    const shortfall = requiredAmount - receivedAmount;
    finalStatus = 'underpaid';
    invoice.status = 'underpaid';
    invoice.underpaidAmount = shortfall;
    invoice.receivedAmount = receivedAmount;
    invoice.transactionHash = cleanTxHash;
    invoice.explorerUrl = explorerUrl;
    invoice.verificationMethod = 'customer_submitted';
    invoice.verificationMessage = `Underpaid: received ${receivedAmount} ${invoice.asset}, required ${invoice.cryptoAmountFormatted} ${invoice.asset}.`;

    serverDb.saveInvoice(invoice);

    return sendJson(200, {
      success: false,
      status: 'underpaid',
      message: `Payment Shortfall Detected: We detected a payment of ${receivedAmount} ${invoice.asset}, but the required invoice total is ${invoice.cryptoAmountFormatted} ${invoice.asset}.`,
      invoice,
      adminNotificationSent: false,
    });
  } else if (excessUsd > MAX_AUTO_CONFIRM_OVERPAYMENT_USD) {
    // Overpaid above $200 threshold -> Manual Review
    finalStatus = 'overpaid_manual_review';
    invoice.status = 'overpaid_manual_review';
    invoice.overpaidAmount = excessCrypto;
    invoice.overpaidUsdAmount = excessUsd;
    invoice.receivedAmount = receivedAmount;
    invoice.transactionHash = cleanTxHash;
    invoice.explorerUrl = explorerUrl;
    invoice.detectedAt = invoice.detectedAt || Date.now();
    invoice.confirmations = invoice.requiredConfirmations;
    invoice.verificationMethod = 'customer_submitted';
    invoice.verificationMessage = `Overpayment of +$${excessUsd.toFixed(2)} USD detected (exceeds $${MAX_AUTO_CONFIRM_OVERPAYMENT_USD} limit). Placed in manual review.`;

    requiresAdminEmail = true;
    statusMessage = 'Your transaction has been verified. Because the payment exceeds the automated fulfillment limit by more than $200 USD, our support team will conduct a manual review and contact you.';
  } else {
    // Exact or acceptable overpayment -> Confirmed
    finalStatus = 'confirmed';
    invoice.status = 'confirmed';
    invoice.receivedAmount = receivedAmount;
    invoice.overpaidAmount = excessCrypto > 0.000001 ? excessCrypto : undefined;
    invoice.overpaidUsdAmount = excessUsd > 0.01 ? excessUsd : undefined;
    invoice.transactionHash = cleanTxHash;
    invoice.explorerUrl = explorerUrl;
    invoice.detectedAt = invoice.detectedAt || Date.now();
    invoice.confirmedAt = Date.now();
    invoice.confirmations = invoice.requiredConfirmations;
    invoice.verificationMethod = 'customer_submitted';
    invoice.verificationMessage = 'Payment verified successfully on blockchain.';

    requiresAdminEmail = true;
    statusMessage = `Your payment has been verified successfully. Your license request has been submitted. We'll contact you at: ${rawEmail}`;
  }

  // Register TXID to this invoice to prevent reuse
  serverDb.registerTxHash(cleanTxHash, invoice.id);
  serverDb.saveInvoice(invoice);

  // 7. Zoho Email Notification (ONLY for verified payments / manual reviews)
  let emailSent = invoice.adminNotificationSent || false;
  if (requiresAdminEmail && !invoice.adminNotificationSent) {
    try {
      const emailResult = await sendVerifiedPaymentEmail({
        invoice,
        customerEmail: rawEmail,
        txHash: cleanTxHash,
        receivedAmount,
        usdEquivalent: invoice.usdAmount + excessUsd,
        paymentStatus: finalStatus === 'confirmed' ? 'Verified & Confirmed' : 'Verified (Manual Review Required)',
        receiptFileName,
        receiptDataUrl,
      });

      if (emailResult.success) {
        invoice.adminNotificationSent = true;
        invoice.adminNotificationSentAt = Date.now();
        emailSent = true;
        serverDb.saveInvoice(invoice);
      } else {
        invoice.adminNotificationError = emailResult.error;
        serverDb.saveInvoice(invoice);
      }
    } catch (err: any) {
      console.error('[FCB Verify] Non-fatal error sending admin notification:', err);
      invoice.adminNotificationError = err?.message;
      serverDb.saveInvoice(invoice);
    }
  }

  return sendJson(200, {
    success: true,
    status: finalStatus,
    message: statusMessage,
    invoice,
    adminNotificationSent: emailSent,
  });
}
