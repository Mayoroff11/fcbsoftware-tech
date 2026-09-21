import type { IncomingMessage, ServerResponse } from 'http';
import { serverDb } from './_db.ts';
import type { AssetSymbol, NetworkId } from '../src/types/payment.ts';

/**
 * Serverless API handler for /api/invoices (Create, Retrieve, Update)
 */
export default async function handler(
  req: IncomingMessage & { body?: any; query?: any },
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
    res.setHeader('Allow', 'GET, POST, PUT, OPTIONS');
    res.end();
    return;
  }

  // Parse query string parameters if not populated
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const idFromQuery = url.searchParams.get('id') || req.query?.id;

  // 1. GET /api/invoices?id=FCB-XXXXXX
  if (req.method === 'GET') {
    if (!idFromQuery) {
      return sendJson(400, { success: false, error: 'Invoice ID is required as query parameter ?id=...' });
    }
    const invoice = serverDb.getInvoice(idFromQuery);
    if (!invoice) {
      return sendJson(404, { success: false, error: `Invoice '${idFromQuery}' not found.` });
    }
    return sendJson(200, { success: true, invoice });
  }

  // Parse body for POST / PUT
  let body: any = {};
  if (req.body && typeof req.body === 'object') {
    body = req.body;
  } else {
    try {
      const rawData = await new Promise<string>((resolve, reject) => {
        let chunk = '';
        req.on('data', (d) => {
          chunk += d;
          if (chunk.length > 50000) reject(new Error('Payload too large'));
        });
        req.on('end', () => resolve(chunk));
        req.on('error', (err) => reject(err));
      });
      if (rawData) {
        body = JSON.parse(rawData);
      }
    } catch {
      return sendJson(400, { success: false, error: 'Invalid JSON body' });
    }
  }

  // 2. POST /api/invoices (Create new invoice with ATOMIC wallet rotation)
  if (req.method === 'POST') {
    try {
      const { planId, asset, network, customerEmail } = body;
      const invoice = serverDb.createInvoice(
        planId || '1m-personal',
        (asset as AssetSymbol) || 'BTC',
        network as NetworkId,
        customerEmail
      );
      return sendJson(201, { success: true, invoice });
    } catch (err: any) {
      return sendJson(500, { success: false, error: err?.message || 'Failed to create invoice' });
    }
  }

  // 3. PUT /api/invoices (Update asset / network for existing invoice)
  if (req.method === 'PUT') {
    try {
      const { invoiceId, asset, network } = body;
      if (!invoiceId || !asset || !network) {
        return sendJson(400, { success: false, error: 'invoiceId, asset, and network are required.' });
      }
      const updated = serverDb.updateInvoiceAssetNetwork(invoiceId, asset as AssetSymbol, network as NetworkId);
      if (!updated) {
        return sendJson(404, { success: false, error: 'Invoice not found or cannot be modified.' });
      }
      return sendJson(200, { success: true, invoice: updated });
    } catch (err: any) {
      return sendJson(500, { success: false, error: err?.message || 'Failed to update invoice' });
    }
  }

  return sendJson(405, { success: false, error: 'Method Not Allowed' });
}
