import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const parsedUrl = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const pathname = parsedUrl.pathname;

        if (pathname === '/api/report-problem' || pathname.startsWith('/api/report-problem')) {
          try {
            const { default: handler } = await import('./api/report-problem.ts');
            await handler(req as any, res as any);
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Internal Server Error' }));
          }
          return;
        }

        if (pathname === '/api/invoices' || pathname.startsWith('/api/invoices')) {
          try {
            const { default: handler } = await import('./api/invoices.ts');
            await handler(req as any, res as any);
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Internal Server Error' }));
          }
          return;
        }

        if (pathname === '/api/verify-payment' || pathname.startsWith('/api/verify-payment')) {
          try {
            const { default: handler } = await import('./api/verify-payment.ts');
            await handler(req as any, res as any);
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err?.message || 'Internal Server Error' }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
