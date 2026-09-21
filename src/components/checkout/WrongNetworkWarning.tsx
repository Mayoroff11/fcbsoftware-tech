import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { AssetSymbol, NetworkId } from '../../types/payment.ts';
import { NETWORKS, ASSETS } from '../../config/cryptoConfig.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';

interface WrongNetworkWarningProps {
  asset: AssetSymbol;
  network: NetworkId;
}

export const WrongNetworkWarning: React.FC<WrongNetworkWarningProps> = ({ asset, network }) => {
  const netConfig = NETWORKS[network] || NETWORKS.bitcoin;
  const assetConfig = ASSETS[asset] || ASSETS.BTC;
  const netSupport = assetConfig.supportedNetworks?.find((n) => n.networkId === network);
  const standard = netSupport?.tokenStandard || netConfig.shortName;

  return (
    <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 flex items-start gap-3 shadow-2xs">
      <div className="shrink-0 flex items-center justify-center pt-0.5">
        <CryptoNetworkIcon
          asset={asset}
          network={network}
          size="sm"
          showNetworkBadge={true}
        />
      </div>
      <div className="space-y-1 text-xs">
        <div className="font-bold tracking-tight text-amber-900 flex items-center gap-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>CRITICAL NETWORK WARNING:</span>
          </span>
          <span className="underline decoration-amber-500 font-extrabold">
            Send {asset} ONLY over {netConfig.name} ({standard})
          </span>
        </div>
        <p className="text-amber-800 leading-relaxed text-[11.5px]">
          This receiving address is specifically configured for <strong className="text-amber-950">{asset}</strong> on the <strong className="text-amber-950">{netConfig.name} ({standard})</strong> blockchain. Transmitting via any other network or sending unsupported tokens will result in irreversible transaction failure and permanent loss of funds.
        </p>
      </div>
    </div>
  );
};
