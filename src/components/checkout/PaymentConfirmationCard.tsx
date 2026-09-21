import React, { useState } from 'react';
import { Invoice } from '../../types/payment.ts';
import { NETWORKS } from '../../config/cryptoConfig.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Key,
  Download,
  ArrowRight,
  Terminal,
  FileCheck
} from 'lucide-react';

interface PaymentConfirmationCardProps {
  invoice: Invoice;
  onNavigateHome: () => void;
  onOpenDocs?: () => void;
}

export const PaymentConfirmationCard: React.FC<PaymentConfirmationCardProps> = ({
  invoice,
  onNavigateHome,
  onOpenDocs
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const netConfig = NETWORKS[invoice.network] || NETWORKS.bitcoin;

  const licenseKey = invoice.licenseHash || `FCB-LKEY-${invoice.id.replace('FCB-', '')}-AUTHENTICATED`;

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Primary Success Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-emerald-200/90 shadow-lg text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Cryptographic Settlement Complete
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Payment Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your payment for the <strong className="text-slate-900">{invoice.planName}</strong> has been independently verified on the {netConfig.name} blockchain.
          </p>
        </div>

        {/* License Credentials Box */}
        <div className="pt-2 max-w-xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900 text-left text-white border border-slate-800 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-violet-300 font-bold uppercase tracking-wider text-[11px]">
                <Key className="w-3.5 h-3.5 text-violet-400" />
                <span>Software Activation License Key</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                ACTIVE
              </span>
            </div>

            <div className="p-3 bg-black/40 rounded-lg font-mono text-xs sm:text-sm text-emerald-300 break-all select-all border border-slate-800 font-bold tracking-wider">
              {licenseKey}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Authorized for: {invoice.durationName} • {invoice.planType.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={handleCopyKey}
                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction & Settlement Receipt */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <FileCheck className="w-4 h-4 text-violet-600" />
            <span>Transaction Receipt</span>
          </div>
          <span className="font-mono text-xs text-slate-500 font-semibold">{invoice.id}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500">Plan Purchased</span>
            <div className="font-semibold text-slate-900">{invoice.planName}</div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500">USD Valuation</span>
            <div className="font-bold text-slate-900">${invoice.usdAmount.toLocaleString('en-US')} USD</div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500">Settlement Amount</span>
            <div className="flex items-center gap-2">
              <CryptoNetworkIcon
                asset={invoice.asset}
                network={invoice.network}
                size="xs"
                showNetworkBadge={true}
              />
              <span className="font-mono font-bold text-slate-900">{invoice.cryptoAmountFormatted} {invoice.asset}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500">Settlement Network</span>
            <div className="font-semibold text-slate-900">{netConfig.name} ({netConfig.networkFamily})</div>
          </div>

          {invoice.transactionHash && (
            <div className="sm:col-span-2 space-y-1 pt-2 border-t border-slate-100">
              <span className="text-slate-500">Verified Blockchain Transaction Hash</span>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 break-all select-all">
                <span>{invoice.transactionHash}</span>
                {invoice.explorerUrl && (
                  <a
                    href={invoice.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-violet-700 hover:text-violet-900 flex items-center gap-1 font-sans font-bold hover:underline"
                    title="View on blockchain explorer"
                  >
                    <span>Explorer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activation Instructions */}
      <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-900">
          <Terminal className="w-4 h-4 text-violet-700" />
          <span>Next Steps: Binary Activation</span>
        </div>

        <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
          <p>
            1. Launch your FCB software binary on your operating system (Linux, macOS, or Windows).
          </p>
          <p>
            2. When prompted on first launch or in the Settings terminal, input your activation license key above.
          </p>
          <p>
            3. The binary executes local cryptographic checksum validation and activates your designated transaction allowance.
          </p>
        </div>

        <div className="pt-3 border-t border-violet-200/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
          >
            Return to Overview
          </button>

          {onOpenDocs && (
            <button
              type="button"
              onClick={onOpenDocs}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>View Technical Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
