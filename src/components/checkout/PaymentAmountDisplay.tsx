import React, { useState } from 'react';
import { Copy, Check, Lock, DollarSign } from 'lucide-react';
import { AssetSymbol, NetworkId } from '../../types/payment.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';

interface PaymentAmountDisplayProps {
  cryptoAmountFormatted: string;
  asset: AssetSymbol;
  network?: NetworkId;
  usdAmount: number;
  exchangeRate: number;
}

export const PaymentAmountDisplay: React.FC<PaymentAmountDisplayProps> = ({
  cryptoAmountFormatted,
  asset,
  network,
  usdAmount,
  exchangeRate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAmount = async () => {
    try {
      await navigator.clipboard.writeText(cryptoAmountFormatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white shadow-md border border-violet-800/40 relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Amount & Price */}
        <div className="space-y-1.5 min-w-0">
          <div className="text-[11px] font-bold tracking-wider uppercase text-violet-300 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Exact Payment Total</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <CryptoNetworkIcon
              asset={asset}
              network={network}
              size="md"
              showNetworkBadge={true}
            />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white">
                {cryptoAmountFormatted}
              </span>
              <span className="text-base sm:text-lg font-bold text-violet-300 font-display">
                {asset}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 flex-wrap">
            <span>≈ ${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
            <span className="text-slate-500">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-violet-200">
              <Lock className="w-3 h-3 text-violet-400" />
              <span>Locked: 1 {asset} = ${exchangeRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </span>
          </div>
        </div>

        {/* Copy Amount Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={handleCopyAmount}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 backdrop-blur-md active:scale-95 shadow-2xs"
            title="Copy exact crypto amount"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                <span className="text-emerald-300 font-bold">Amount Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-violet-300" />
                <span>Copy Amount</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
