import React from 'react';
import { Info } from 'lucide-react';
import { NetworkId } from '../../types/payment.ts';
import { NETWORKS } from '../../config/cryptoConfig.ts';

interface NetworkFeeNoticeProps {
  network: NetworkId;
}

export const NetworkFeeNotice: React.FC<NetworkFeeNoticeProps> = ({ network }) => {
  const netConfig = NETWORKS[network] || NETWORKS.bitcoin;

  return (
    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
      <Info className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="leading-relaxed">
          <strong className="font-semibold text-slate-800">Network Fee Notice:</strong> Please make sure your wallet has enough balance to cover the network fee in addition to the invoice amount. This helps ensure the full required payment reaches the receiving address.
        </p>
        <p className="text-[11px] text-slate-500 font-medium">
          Active Network: <span className="text-slate-700 font-semibold">{netConfig.name} ({netConfig.networkFamily})</span> • Confirmation Target: {netConfig.confirmationBlocks} {netConfig.confirmationBlocks === 1 ? 'block' : 'blocks'}
        </p>
      </div>
    </div>
  );
};

