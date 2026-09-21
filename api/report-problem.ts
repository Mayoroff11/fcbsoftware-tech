import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

interface ProblemReportPayload {
  email?: string;
  subject?: string;
  message?: string;
  honeypot?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_MESSAGE_LENGTH = 8;
const SUPPORT_DESTINATION_EMAIL = 'support@fcbsoftware.tech';

/**
 * Serverless function handler compatible with Vercel and Node.js HTTP servers.
 */
export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  // CORS & method helper
  const sendJsonResponse = (statusCode: number, data: { success: boolean; message?: string; error?: string }) => {
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
    return sendJsonResponse(405, {
      success: false,
      error: 'Method Not Allowed. Only POST requests are supported.'
    });
  }

  try {
    // Parse request body if not already parsed
    let body: ProblemReportPayload = {};
    if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      const rawData = await new Promise<string>((resolve, reject) => {
        let chunk = '';
        req.on('data', (d) => {
          chunk += d;
          if (chunk.length > 50000) {
            reject(new Error('Payload too large'));
          }
        });
        req.on('end', () => resolve(chunk));
        req.on('error', (err) => reject(err));
      });

      if (rawData) {
        try {
          body = JSON.parse(rawData);
        } catch {
          return sendJsonResponse(400, {
            success: false,
            error: 'Invalid JSON payload format.'
          });
        }
      }
    }

    // Honeypot spam check
    if (body.honeypot && body.honeypot.trim().length > 0) {
      // Silently accept without sending to discourage bots
      return sendJsonResponse(200, {
        success: true,
        message: 'Your report has been sent successfully. Our support team will review it and respond to you by email.'
      });
    }

    // Server-side Validation
    const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
    const rawSubject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

    if (!rawEmail) {
      return sendJsonResponse(400, {
        success: false,
        error: 'Email address is required.'
      });
    }

    if (rawEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(rawEmail)) {
      return sendJsonResponse(400, {
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    if (!rawSubject) {
      return sendJsonResponse(400, {
        success: false,
        error: 'Subject is required.'
      });
    }

    if (rawSubject.length > MAX_SUBJECT_LENGTH) {
      return sendJsonResponse(400, {
        success: false,
        error: `Subject cannot exceed ${MAX_SUBJECT_LENGTH} characters.`
      });
    }

    if (!rawMessage) {
      return sendJsonResponse(400, {
        success: false,
        error: 'Problem / Message description is required.'
      });
    }

    if (rawMessage.length < MIN_MESSAGE_LENGTH) {
      return sendJsonResponse(400, {
        success: false,
        error: `Problem description must be at least ${MIN_MESSAGE_LENGTH} characters.`
      });
    }

    if (rawMessage.length > MAX_MESSAGE_LENGTH) {
      return sendJsonResponse(400, {
        success: false,
        error: `Problem description cannot exceed ${MAX_MESSAGE_LENGTH} characters.`
      });
    }

    // Retrieve Zoho SMTP credentials from server-side environment variables
    const zohoEmail = process.env.ZOHO_EMAIL;
    const zohoPassword = process.env.ZOHO_SMTP_PASSWORD;
    const zohoHost = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
    const zohoPort = parseInt(process.env.ZOHO_SMTP_PORT || '465', 10);

    if (!zohoEmail || !zohoPassword) {
      console.error('[FCB Report Error] Missing server-side ZOHO_EMAIL or ZOHO_SMTP_PASSWORD credentials.');
      return sendJsonResponse(503, {
        success: false,
        error: "We couldn't send your report right now. Please try again or contact support directly at support@fcbsoftware.tech."
      });
    }

    // Configure Nodemailer transporter with Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: zohoHost,
      port: zohoPort,
      secure: zohoPort === 465, // true for 465, false for 587
      auth: {
        user: zohoEmail,
        pass: zohoPassword,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const emailSubject = `FCB Website Report: ${rawSubject}`;

    const textBody = `FCB WEBSITE — REPORT A PROBLEM

Customer Email:
${rawEmail}

Subject:
${rawSubject}

Problem / Message:
${rawMessage}
`;

    const htmlBody = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e1b33; margin: 0; padding: 24px; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { border-bottom: 2px solid #7c3aed; padding-bottom: 14px; margin-bottom: 20px; }
    .title { font-size: 18px; font-weight: 700; color: #4c1d95; margin: 0; }
    .field-group { margin-bottom: 16px; }
    .field-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #0f172a; word-break: break-word; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; white-space: pre-wrap; font-size: 14px; }
    .footer { margin-top: 24px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">FCB WEBSITE — REPORT A PROBLEM</h1>
    </div>
    
    <div class="field-group">
      <div class="field-label">Customer Email</div>
      <div class="field-value"><a href="mailto:${rawEmail}" style="color: #6d28d9; text-decoration: none; font-weight: 600;">${rawEmail}</a></div>
    </div>

    <div class="field-group">
      <div class="field-label">Subject</div>
      <div class="field-value">${rawSubject}</div>
    </div>

    <div class="field-group">
      <div class="field-label">Problem / Message</div>
      <div class="message-box">${rawMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>

    <div class="footer">
      This message was submitted via the FCB Report a Problem system. Replying directly to this email will reply to ${rawEmail}.
    </div>
  </div>
</body>
</html>`;

    // Send email via Zoho SMTP
    await transporter.sendMail({
      from: `"FCB Website Report" <${zohoEmail}>`,
      to: SUPPORT_DESTINATION_EMAIL,
      replyTo: rawEmail,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    return sendJsonResponse(200, {
      success: true,
      message: 'Your report has been sent successfully. Our support team will review it and respond to you by email.'
    });

  } catch (error: any) {
    console.error('[FCB Report Error] Error sending email via Zoho SMTP:', error?.message || error);
    return sendJsonResponse(500, {
      success: false,
      error: "We couldn't send your report right now. Please try again or contact support directly at support@fcbsoftware.tech."
    });
  }
}
