import React from 'react';
import { AssetSymbol, NetworkId } from '../../types/payment.ts';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * High-quality authentic vector SVG assets for Cryptocurrencies and Blockchains.
 * Standard official brand geometry and colors. Zero external CDN dependencies.
 */

// 1. BITCOIN (BTC)
export const BitcoinIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#F7931A" />
    <path
      d="M22.5 13.8c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.6 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.3l-2.3-.6-.5 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.3c.1 0 .1 0 .2.1l-.2-.1-1.2 4.7c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3l-.8 2 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.8 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1 2.1-2.5zm-3.8 5.4c-.5 2.1-4 .9-5.1.7l.9-3.7c1.1.3 4.7.8 4.2 3zm.5-5.5c-.5 1.9-3.4.9-4.3.7l.8-3.3c.9.2 3.9.7 3.5 2.6z"
      fill="#FFFFFF"
    />
  </svg>
);

// 2. ETHEREUM (ETH)
export const EthereumIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#627EEA" />
    <g fill="#FFFFFF" fillRule="nonzero">
      <path opacity="0.6" d="M16 4v8.87l7.5 3.35L16 4z" />
      <path d="M16 4L8.5 16.22l7.5-3.35V4z" />
      <path opacity="0.6" d="M16 21.97v6.03l7.51-10.37L16 21.97z" />
      <path d="M16 28v-6.03l-7.5-4.34L16 28z" />
      <path opacity="0.2" d="M16 20.6l7.5-4.38-7.5-3.35v7.73z" />
      <path opacity="0.6" d="M8.5 16.22l7.5 4.38v-7.73l-7.5 3.35z" />
    </g>
  </svg>
);

// 3. TETHER USD (USDT)
export const TetherIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#26A17B" />
    <path
      d="M17.8 15.6v-2.3h5.7V9.7H8.5v3.6h5.7v2.3c-4.9.2-8.5 1.2-8.5 2.4s3.6 2.2 8.5 2.4v6.1h3.6v-6.1c4.9-.2 8.5-1.2 8.5-2.4s-3.6-2.2-8.5-2.4zm0 3.3v-.1c-.5 0-1.1.1-1.8.1-.6 0-1.3 0-1.8-.1v.1c-3.8-.2-6.5-.9-6.5-1.8 0-.8 2.7-1.6 6.5-1.8v2.4c.5 0 1.2.1 1.8.1.7 0 1.3 0 1.8-.1v-2.4c3.8.2 6.5.9 6.5 1.8 0 .9-2.7 1.6-6.5 1.9z"
      fill="#FFFFFF"
    />
  </svg>
);

// 4. USD COIN (USDC)
export const UsdcIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#2775CA" />
    <path
      d="M20.2 18.2c0-1.8-1.1-2.4-3.2-2.7-1.5-.2-1.8-.6-1.8-1.3 0-.7.6-1.2 1.7-1.2 1.1 0 1.6.4 1.8 1.2.1.2.2.3.4.3h1.2c.2 0 .4-.2.3-.4-.3-1.4-1.3-2.3-2.7-2.5V10c0-.2-.2-.4-.4-.4h-1c-.2 0-.4.2-.4.4v1.6c-1.5.2-2.5 1.3-2.5 2.7 0 1.8 1.1 2.4 3.2 2.7 1.4.3 1.8.7 1.8 1.4 0 .8-.7 1.3-1.8 1.3-1.4 0-1.9-.5-2.1-1.4 0-.2-.2-.3-.4-.3h-1.3c-.2 0-.4.2-.3.4.3 1.5 1.4 2.5 3 2.7V24c0 .2.2.4.4.4h1c.2 0 .4-.2.4-.4v-1.6c1.6-.3 2.6-1.3 2.6-2.8z"
      fill="#FFFFFF"
    />
    <path
      d="M16 4.5C9.65 4.5 4.5 9.65 4.5 16S9.65 27.5 16 27.5 27.5 22.35 27.5 16 22.35 4.5 16 4.5zm0 21.2c-5.18 0-9.4-4.22-9.4-9.4 0-5.18 4.22-9.4 9.4-9.4 5.18 0 9.4 4.22 9.4 9.4 0 5.18-4.22 9.4-9.4 9.4z"
      fill="#FFFFFF"
      opacity="0.5"
    />
  </svg>
);

// 5. SOLANA (SOL)
export const SolanaIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#000000" />
    <defs>
      <linearGradient id="solGrad1" x1="23.5" y1="8" x2="8.5" y2="13" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="solGrad2" x1="23.5" y1="13.5" x2="8.5" y2="18.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="solGrad3" x1="23.5" y1="19" x2="8.5" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
    </defs>
    <path
      d="M8.5 21.6l2.7-2.6h12.3l-2.7 2.6H8.5z"
      fill="url(#solGrad3)"
    />
    <path
      d="M8.5 10.4l2.7-2.6h12.3l-2.7 2.6H8.5z"
      fill="url(#solGrad1)"
    />
    <path
      d="M23.5 16l-2.7 2.6H8.5l2.7-2.6h12.3z"
      fill="url(#solGrad2)"
    />
  </svg>
);

// 6. TRON (TRX)
export const TronIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#FF0013" />
    <path
      d="M25.5 10.3l-9.2-4.5c-.2-.1-.4-.1-.6 0l-7.2 3.6c-.3.2-.5.5-.5.8v10.5c0 .4.2.7.5.9l7.2 4.5c.2.1.4.1.6 0l9.2-4.5c.3-.2.5-.5.5-.9V11.2c0-.4-.2-.7-.5-.9zm-9.5-2.6l7.1 3.5-3.3 1.9-6.3-4.2 2.5-1.2zm-6.2 3.8l5.2 3.5-5.2 2.9V11.5zm6.7 14.1l-5.7-3.6 5.7-3.2v6.8zm1-1.3v-5.6l6.6-3.7v4.7l-6.6 4.6zm6.6-8.5l-6.6 3.7-6.2-4.1 11.8-6.6 1 7z"
      fill="#FFFFFF"
    />
  </svg>
);

// 7. BNB (BNB / BEP20)
export const BnbIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
    <path
      d="M16 6.5l3.2 3.2-3.2 3.2-3.2-3.2L16 6.5zm5.7 5.7l3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2zm-11.4 0l3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2zM16 18.7l3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2zm0-4.6l1.9 1.9-1.9 1.9-1.9-1.9 1.9-1.9z"
      fill="#FFFFFF"
    />
  </svg>
);

// 8. TONCOIN (TON)
export const TonIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#0088CC" />
    <path
      d="M16 7l-8.5 7.5L16 25l8.5-10.5L16 7zm-6.2 7.7l6.2-5.5 6.2 5.5-6.2 8.5-6.2-8.5z"
      fill="#FFFFFF"
    />
    <path
      d="M16 9.2v14.3l6.2-8.5L16 9.2z"
      fill="#FFFFFF"
      opacity="0.3"
    />
  </svg>
);

// 9. ARBITRUM (ARB)
export const ArbitrumIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#28A0F0" />
    <path
      d="M20.9 9.5l-3.8 6.4 3.7 6.6h2.9l-5.1-9.2 3.7-6.2h-1.4zm-9.8 13h2.9l2.8-4.9-1.4-2.5-4.3 7.4zm4.9-8.6l2.1-3.6-2.1-3.8h-2.9l3.5 6.2-.6 1.2z"
      fill="#FFFFFF"
    />
  </svg>
);

// 10. BASE (BASE)
export const BaseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path
      d="M16 7.5C11.3 7.5 7.5 11.3 7.5 16s3.8 8.5 8.5 8.5c4.4 0 8.1-3.4 8.5-7.7h-7.8c-.4 0-.7-.3-.7-.7v-.2c0-.4.3-.7.7-.7h7.8c-.4-4.3-4.1-7.7-8.5-7.7z"
      fill="#FFFFFF"
    />
  </svg>
);

// 11. POLYGON (POL / MATIC)
export const PolygonIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#8247E5" />
    <path
      d="M20.8 13.8c-.7-.4-1.7-.4-2.4 0l-3.3 1.9-2.2 1.3-3.3 1.9c-.7.4-1.7.4-2.4 0l-2.6-1.5c-.7-.4-1.2-1.2-1.2-2s.4-1.6 1.2-2l2.6-1.5c.7-.4 1.7-.4 2.4 0l3.3 1.9 2.2-1.3-3.3-1.9c-.7-.4-1.7-.4-2.4 0l-2.6 1.5c-1.5.9-2.4 2.4-2.4 4.1s.9 3.2 2.4 4.1l2.6 1.5c1.5.9 3.3.9 4.8 0l3.3-1.9 2.2-1.3 3.3-1.9c.7-.4 1.7-.4 2.4 0l2.6 1.5c.7.4 1.2 1.2 1.2 2s-.4 1.6-1.2 2l-2.6 1.5c-.7.4-1.7.4-2.4 0l-3.3-1.9-2.2 1.3 3.3 1.9c.7.4 1.7.4 2.4 0l2.6-1.5c1.5-.9 2.4-2.4 2.4-4.1s-.9-3.2-2.4-4.1l-2.6-1.5z"
      fill="#FFFFFF"
    />
  </svg>
);

// 12. OPTIMISM (OP)
export const OptimismIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#FF0420" />
    <path
      d="M13.2 11.2c-2.8 0-4.7 2.2-4.7 5.2 0 2.9 1.9 5.2 4.7 5.2s4.7-2.3 4.7-5.2c0-3-1.9-5.2-4.7-5.2zm0 8c-1.3 0-2.2-1.2-2.2-2.8s.9-2.8 2.2-2.8 2.2 1.2 2.2 2.8-.9 2.8-2.2 2.8zm7.8-8h-3.4v10.4h2.5v-3.7h.9c2.3 0 3.9-1.4 3.9-3.3 0-2-1.6-3.4-3.9-3.4zm0 4.6h-.9v-2.4h.9c1 0 1.6.5 1.6 1.2 0 .7-.6 1.2-1.6 1.2z"
      fill="#FFFFFF"
    />
  </svg>
);

// 13. AVALANCHE (AVAX)
export const AvalancheIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#E84142" />
    <path
      d="M17.4 7.6c-.6-1.1-2.2-1.1-2.8 0L6.2 22.3c-.6 1.1.2 2.4 1.4 2.4h3.8c.8 0 1.5-.4 1.9-1.1l2.7-4.8 2.7 4.8c.4.7 1.1 1.1 1.9 1.1h3.8c1.2 0 2-1.3 1.4-2.4L17.4 7.6zm-1.4 3.4l5.3 9.4h-2.3l-3-5.3-3 5.3h-2.3l5.3-9.4z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * Helper to get the canonical SVG icon component for any cryptocurrency asset.
 */
export function getAssetIcon(symbol: AssetSymbol, size = 24, className = '') {
  switch (symbol) {
    case 'BTC':
      return <BitcoinIcon size={size} className={className} />;
    case 'ETH':
      return <EthereumIcon size={size} className={className} />;
    case 'USDT':
      return <TetherIcon size={size} className={className} />;
    case 'USDC':
      return <UsdcIcon size={size} className={className} />;
    case 'SOL':
      return <SolanaIcon size={size} className={className} />;
    case 'TRX':
      return <TronIcon size={size} className={className} />;
    case 'BNB':
      return <BnbIcon size={size} className={className} />;
    case 'TON':
      return <TonIcon size={size} className={className} />;
    case 'POL':
      return <PolygonIcon size={size} className={className} />;
    case 'AVAX':
      return <AvalancheIcon size={size} className={className} />;
    default:
      return <BitcoinIcon size={size} className={className} />;
  }
}

/**
 * Helper to get the canonical SVG icon component for any blockchain network.
 */
export function getNetworkIcon(networkId: NetworkId, size = 24, className = '') {
  switch (networkId) {
    case 'bitcoin':
      return <BitcoinIcon size={size} className={className} />;
    case 'ethereum':
      return <EthereumIcon size={size} className={className} />;
    case 'tron':
      return <TronIcon size={size} className={className} />;
    case 'bsc':
      return <BnbIcon size={size} className={className} />;
    case 'solana':
      return <SolanaIcon size={size} className={className} />;
    case 'arbitrum':
      return <ArbitrumIcon size={size} className={className} />;
    case 'base':
      return <BaseIcon size={size} className={className} />;
    case 'polygon':
      return <PolygonIcon size={size} className={className} />;
    case 'optimism':
      return <OptimismIcon size={size} className={className} />;
    case 'avalanche':
      return <AvalancheIcon size={size} className={className} />;
    case 'ton':
      return <TonIcon size={size} className={className} />;
    default:
      return <EthereumIcon size={size} className={className} />;
  }
}
