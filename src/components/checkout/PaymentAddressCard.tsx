import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, QrCode, ExternalLink, Shield, CheckCircle2 } from 'lucide-react';
import { AssetSymbol, NetworkId } from '../../types/payment.ts';
import { ASSETS, NETWORKS, generatePaymentUri } from '../../config/cryptoConfig.ts';
import { BlockchainMonitorService } from '../../services/BlockchainMonitorService.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';

interface PaymentAddressCardProps {
  receivingAddress: string;
  asset: AssetSymbol;
  network: NetworkId;
  cryptoAmount: number;
  tokenContract?: string;
}

export const PaymentAddressCard: React.FC<PaymentAddressCardProps> = ({
  receivingAddress,
  asset,
  network,
  cryptoAmount,
  tokenContract
}) => {
  const [copied, setCopied] = useState(false);

  const assetConfig = ASSETS[asset] || ASSETS.BTC;
  const networkConfig = NETWORKS[network] || NETWORKS.bitcoin;
  const networkItem = assetConfig.supportedNetworks?.find((n) => n.networkId === network);
  const tokenStandard = networkItem?.tokenStandard || networkConfig.shortName;

  const paymentUri = generatePaymentUri(asset, network, receivingAddress, cryptoAmount);
  const explorerAddressUrl = BlockchainMonitorService.getExplorerAddressUrl(network, receivingAddress);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(receivingAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback manual selection
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-violet-100 shadow-sm space-y-6">
      
      {/* Header with Title & Blockchain Explorer Link */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="space-y-0.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-violet-600" />
            <span>Cryptographic Receiving Destination</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Send exactly to this single-use rotational settlement address.
          </p>
        </div>

        <a
          href={explorerAddressUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1 hover:underline cursor-pointer shrink-0"
          title="Inspect address on public blockchain explorer"
        >
          <span>Explorer</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Selected Payment Identity Row */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <CryptoNetworkIcon
            asset={asset}
            network={network}
            size="lg"
            showNetworkBadge={true}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900 font-display">
                {asset}
              </span>
              <span className="text-xs text-slate-500 font-medium truncate">
                {assetConfig.name}
              </span>
            </div>
            <div className="text-[11px] font-semibold text-violet-700 flex items-center gap-1">
              <span>{networkConfig.name}</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-violet-100/70 text-violet-800 font-bold">
                {tokenStandard}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase font-bold text-slate-400">Required Network</div>
          <div className="text-xs font-bold text-slate-800">{networkConfig.name}</div>
        </div>
      </div>

      {/* Main Grid: QR Code + Click-to-Copy Address */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        
        {/* QR Code Container */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <div className="p-2.5 bg-white rounded-lg shadow-2xs border border-slate-100">
            <QRCodeSVG
              value={paymentUri}
              size={136}
              level="M"
              includeMargin={false}
              className="w-32 h-32"
            />
          </div>
          <span className="text-[10px] text-slate-500 mt-2 font-medium">
            Scan with your crypto wallet
          </span>
        </div>

        {/* Address & Clickable Container */}
        <div className="sm:col-span-8 space-y-4">
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Receiving Address</span>
              <span className="text-[10px] text-slate-400 font-medium">
                {copied ? '✓ Copied to clipboard' : 'Click address to copy'}
              </span>
            </div>

            {/* Clickable Address Box */}
            <div
              id="box-clickable-address"
              role="button"
              tabIndex={0}
              onClick={handleCopy}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopy();
                }
              }}
              title="Click anywhere to copy full address"
              className={`group relative p-3.5 rounded-xl border font-mono text-xs sm:text-[13px] break-all select-all leading-relaxed tracking-wide transition-all cursor-pointer shadow-inner focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
                copied
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100'
                  : 'bg-slate-900 hover:bg-slate-950 border-slate-800 hover:border-violet-500/60 text-white'
              }`}
            >
              <div className="pr-6">
                {receivingAddress}
              </div>

              <div className="absolute top-3 right-3 text-slate-400 group-hover:text-violet-300 transition-colors">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                )}
              </div>

              {/* Floating Copy Feedback Banner */}
              {copied && (
                <div className="mt-2 text-[11px] font-sans font-bold text-emerald-300 flex items-center gap-1.5 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Full destination address copied to clipboard</span>
                </div>
              )}
            </div>
          </div>

          {/* Explicit Copy Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="btn-copy-address"
              onClick={handleCopy}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 ${
                copied
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                  : 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-500/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Address Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Token contract indicator if applicable */}
          {tokenContract && (
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
              <Shield className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <div className="truncate">
                <span className="font-semibold text-slate-700">Token Contract: </span>
                <span className="font-mono text-slate-600 text-[10px] select-all">{tokenContract}</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
