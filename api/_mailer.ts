import nodemailer from 'nodemailer';
import type { Invoice } from '../src/types/payment.ts';
import { NETWORKS } from '../src/config/cryptoConfig.ts';

const SUPPORT_EMAIL = 'support@fcbsoftware.tech';

export interface SendPaymentEmailOptions {
  invoice: Invoice;
  customerEmail: string;
  txHash: string;
  receivedAmount: number;
  usdEquivalent: number;
  paymentStatus: string;
  receiptFileName?: string;
  receiptDataUrl?: string;
}

/**
 * Sends authoritative Verified Payment notification to support@fcbsoftware.tech via Zoho SMTP.
 * ONLY called after backend has successfully verified the blockchain transaction.
 */
export async function sendVerifiedPaymentEmail(
  options: SendPaymentEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const {
    invoice,
    customerEmail,
    txHash,
    receivedAmount,
    usdEquivalent,
    paymentStatus,
    receiptFileName,
    receiptDataUrl,
  } = options;

  const zohoEmail = process.env.ZOHO_EMAIL;
  const zohoPassword = process.env.ZOHO_SMTP_PASSWORD;
  const zohoHost = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
  const zohoPort = parseInt(process.env.ZOHO_SMTP_PORT || '465', 10);

  if (!zohoEmail || !zohoPassword) {
    console.warn('[FCB Mailer] Notice: ZOHO_EMAIL or ZOHO_SMTP_PASSWORD is not set in environment.');
    return {
      success: false,
      error: 'SMTP credentials not configured on server.',
    };
  }

  const transporter = nodemailer.createTransport({
    host: zohoHost,
    port: zohoPort,
    secure: zohoPort === 465,
    auth: {
      user: zohoEmail,
      pass: zohoPassword,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const netConfig = NETWORKS[invoice.network] || NETWORKS.bitcoin;
  const explorerUrl = `${netConfig.explorerTxUrl}${txHash}`;
  const timestamp = new Date().toISOString();

  const attachments: any[] = [];
  if (receiptDataUrl && receiptDataUrl.startsWith('data:')) {
    try {
      const match = receiptDataUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        attachments.push({
          filename: receiptFileName || `payment_receipt_${invoice.id}.png`,
          content: Buffer.from(base64Data, 'base64'),
          contentType: mimeType,
        });
      }
    } catch (err) {
      console.warn('[FCB Mailer] Could not attach receipt image:', err);
    }
  }

  const subject = `FCB — VERIFIED PAYMENT: ${invoice.id} - ${invoice.planName}`;

  const plainText = `
============================================================
FCB SOFTWARE — VERIFIED BLOCKCHAIN PAYMENT NOTIFICATION
============================================================

Invoice ID:           ${invoice.id}
License Plan:         ${invoice.planName} (${invoice.planType})
USD Price:            $${invoice.usdAmount.toLocaleString('en-US')} USD

Customer Email:       ${customerEmail}
Payment Asset:        ${invoice.asset}
Blockchain Network:   ${netConfig.name} (${netConfig.shortName})
Receiving Address:    ${invoice.receivingAddress}
Assigned Wallet:      ${invoice.walletId.toUpperCase()}

Transaction Hash:     ${txHash}
Explorer URL:         ${explorerUrl}
Amount Received:      ${receivedAmount} ${invoice.asset}
USD Equivalent:       $${usdEquivalent.toFixed(2)} USD

Payment Status:       ${paymentStatus}
Block Confirmations:  ${invoice.confirmations} / ${invoice.requiredConfirmations}
Receipt Uploaded:     ${receiptFileName ? `Yes (${receiptFileName})` : 'None'}
Timestamp:            ${timestamp}

------------------------------------------------------------
Note: This notification was sent automatically because the
transaction hash and destination address have been verified
against invoice requirements.
============================================================
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; opacity: 0.9; }
    .badge { display: inline-block; background: #10b981; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-top: 10px; }
    .content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
    .field-value { font-size: 14px; font-weight: 600; color: #0f172a; }
    .field-value.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; word-break: break-all; background: #f1f5f9; padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
    .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verified Blockchain Payment Received</h1>
      <p>A customer has successfully completed cryptographic settlement.</p>
      <div class="badge">Verified Payment</div>
    </div>
    <div class="content">
      <div class="grid">
        <div class="field-group">
          <div class="field-label">Invoice Ref</div>
          <div class="field-value">${invoice.id}</div>
        </div>
        <div class="field-group">
          <div class="field-label">License Plan</div>
          <div class="field-value">${invoice.planName}</div>
        </div>
      </div>

      <div class="field-group">
        <div class="field-label">Customer Email (License Delivery)</div>
        <div class="field-value" style="color: #4f46e5;"><a href="mailto:${customerEmail}" style="color: #4f46e5; text-decoration: none;">${customerEmail}</a></div>
      </div>

      <div class="divider"></div>

      <div class="grid">
        <div class="field-group">
          <div class="field-label">Payment Asset & Network</div>
          <div class="field-value">${invoice.asset} (${netConfig.name})</div>
        </div>
        <div class="field-group">
          <div class="field-label">Amount Received</div>
          <div class="field-value">${receivedAmount} ${invoice.asset} (~$${usdEquivalent.toFixed(2)} USD)</div>
        </div>
      </div>

      <div class="field-group">
        <div class="field-label">Receiving Address (${invoice.walletId.toUpperCase()})</div>
        <div class="field-value mono">${invoice.receivingAddress}</div>
      </div>

      <div class="field-group">
        <div class="field-label">Verified Transaction Hash (TXID)</div>
        <div class="field-value mono">
          <a href="${explorerUrl}" target="_blank" rel="noopener noreferrer" style="color: #4f46e5; text-decoration: underline;">
            ${txHash}
          </a>
        </div>
      </div>

      <div class="grid">
        <div class="field-group">
          <div class="field-label">Payment Status</div>
          <div class="field-value" style="color: #059669;">${paymentStatus}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Confirmations</div>
          <div class="field-value">${invoice.confirmations} / ${invoice.requiredConfirmations} Blocks</div>
        </div>
      </div>

      ${receiptFileName ? `
        <div class="field-group">
          <div class="field-label">Supporting Evidence / Receipt</div>
          <div class="field-value" style="font-size: 12px; color: #64748b;">Attached: ${receiptFileName}</div>
        </div>
      ` : ''}
    </div>
    <div class="footer">
      FCB Software Automated Settlement Engine &bull; ${timestamp}
    </div>
  </div>
</body>
</html>
`.trim();

  try {
    const info = await transporter.sendMail({
      from: `"FCB Settlement Engine" <${zohoEmail}>`,
      to: SUPPORT_EMAIL,
      replyTo: customerEmail,
      subject,
      text: plainText,
      html: htmlContent,
      attachments,
    });

    console.log(`[FCB Mailer] Verified payment email sent to ${SUPPORT_EMAIL} (messageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[FCB Mailer] Error sending verified payment email via Zoho:', err);
    return { success: false, error: err?.message || 'SMTP transmission error' };
  }
}
