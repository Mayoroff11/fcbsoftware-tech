import React from 'react';
import { AssetSymbol, NetworkId } from '../../types/payment.ts';
import { getAssetIcon, getNetworkIcon } from './CryptoIcons.tsx';
import { ASSETS } from '../../config/cryptoConfig.ts';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface CryptoNetworkIconProps {
  asset: AssetSymbol;
  network?: NetworkId;
  size?: IconSize;
  showNetworkBadge?: boolean;
  className?: string;
  badgeClassName?: string;
}

const SIZE_CONFIGS: Record<
  IconSize,
  {
    container: string;
    mainSize: number;
    badgeSize: number;
    badgeOffset: string;
    badgeRing: string;
  }
> = {
  xs: {
    container: 'w-5 h-5',
    mainSize: 20,
    badgeSize: 10,
    badgeOffset: '-bottom-0.5 -right-0.5',
    badgeRing: 'ring-1 ring-white'
  },
  sm: {
    container: 'w-6 h-6',
    mainSize: 24,
    badgeSize: 12,
    badgeOffset: '-bottom-0.5 -right-0.5',
    badgeRing: 'ring-1.5 ring-white'
  },
  md: {
    container: 'w-8 h-8',
    mainSize: 32,
    badgeSize: 15,
    badgeOffset: '-bottom-1 -right-1',
    badgeRing: 'ring-2 ring-white shadow-2xs'
  },
  lg: {
    container: 'w-10 h-10',
    mainSize: 40,
    badgeSize: 18,
    badgeOffset: '-bottom-1 -right-1',
    badgeRing: 'ring-2 ring-white shadow-2xs'
  },
  xl: {
    container: 'w-12 h-12',
    mainSize: 48,
    badgeSize: 20,
    badgeOffset: '-bottom-1.5 -right-1.5',
    badgeRing: 'ring-2.5 ring-white shadow-xs'
  }
};

/**
 * Checks whether this asset on this network is a 1:1 native coin
 * (e.g. BTC on Bitcoin, ETH on Ethereum, SOL on Solana, TRX on TRON, TON on TON).
 * If true, secondary badge is redundant. If ETH is on Arbitrum, secondary badge is necessary!
 */
export function isNativeCoinOnNetwork(asset: AssetSymbol, network?: NetworkId): boolean {
  if (!network) return true;
  if (asset === 'BTC' && network === 'bitcoin') return true;
  if (asset === 'ETH' && network === 'ethereum') return true;
  if (asset === 'SOL' && network === 'solana') return true;
  if (asset === 'TRX' && network === 'tron') return true;
  if (asset === 'TON' && network === 'ton') return true;
  if (asset === 'BNB' && network === 'bsc') return true;
  if (asset === 'POL' && network === 'polygon') return true;
  if (asset === 'AVAX' && network === 'avalanche') return true;
  return false;
}

export const CryptoNetworkIcon: React.FC<CryptoNetworkIconProps> = ({
  asset,
  network,
  size = 'md',
  showNetworkBadge = true,
  className = '',
  badgeClassName = ''
}) => {
  const cfg = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;
  const isNative = isNativeCoinOnNetwork(asset, network);
  const shouldRenderBadge = showNetworkBadge && network && !isNative;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${cfg.container} ${className}`}>
      {/* Primary Cryptocurrency/Token Logo */}
      <div className="rounded-full flex items-center justify-center overflow-hidden shadow-2xs">
        {getAssetIcon(asset, cfg.mainSize)}
      </div>

      {/* Secondary Blockchain Network Badge (smaller, overlapping at bottom-right) */}
      {shouldRenderBadge && (
        <div
          className={`absolute ${cfg.badgeOffset} rounded-full overflow-hidden ${cfg.badgeRing} bg-white flex items-center justify-center ${badgeClassName}`}
          title={`Network: ${network}`}
        >
          {getNetworkIcon(network, cfg.badgeSize)}
        </div>
      )}
    </div>
  );
};
