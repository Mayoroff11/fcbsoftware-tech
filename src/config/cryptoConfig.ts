import { WalletConfig, NetworkConfig, AssetConfig, WalletId, NetworkId, AssetSymbol } from '../types/payment.ts';

// -----------------------------------------------------------------------------
// CONFIGURED RECEIVING WALLETS (A, B, C)
// Public addresses only - zero private keys or seed phrases
// -----------------------------------------------------------------------------
export const WALLET_CONFIGS: Record<WalletId, WalletConfig> = {
  wallet_a: {
    id: 'wallet_a',
    label: 'Settlement Pool Alpha',
    evmAddress: '0x9F1837170490fF4216882628D8Bed1EBd8EDFFfa',
    btcAddress: 'bc1qhu2lpsrpv2gmnk838n7fdfk3qt8swx9mmdjffc',
    solAddress: 'E29jVhVyXyj9hpmYwTDSnYA6amkJtVhis3SzGYuHXrcs',
    tronAddress: 'TUFbXdH1ZuXAJMAjwa8ccSRikEZvNuneH4',
    tonAddress: 'UQCUsVh71d2r9B2wAcxUanV8Bu3PsjbRoGGP4Ockt9qnH5ol',
    enabled: true
  },
  wallet_b: {
    id: 'wallet_b',
    label: 'Settlement Pool Beta',
    evmAddress: '0x575Eb374b8178029CA2112A3ce805E40F3fd3159',
    btcAddress: 'bc1qxz72ypkvfr2ggj6lgwuyhg49qeyjzarqrqdzsu',
    solAddress: '6gKd726FLP1fGoUm9yyPspfC9bGTUEyhseP2FHLx5W2o',
    tronAddress: 'TRvddhUmMLxH5Bouy6RNu72SF64yf7XgPh',
    tonAddress: 'UQBLYLVPes-Zfq8x2QGZQ72wRbCiF-BqSMGFvE2dEEZczFhO',
    enabled: true
  },
  wallet_c: {
    id: 'wallet_c',
    label: 'Settlement Pool Gamma',
    evmAddress: '0x5FA09827B2f1Ea6049108595A3dA738D8F35e61a',
    btcAddress: 'bc1qc6e2dtdhens4s08a0jn9r759lv9s6ehz2d0c53',
    solAddress: '8rFp8EQbsVsgZpZBtb4QJ6M9uzfcUbhSRCekqCrwFTfK',
    tronAddress: 'TUFCzXGG71jLNrVBHMS9xYapM8i8bTz1Rq',
    tonAddress: 'UQDuCXmqfZdgu8o3KylYSIC8JbYTJUOy7Tf1QzSFdCkmgPyO',
    enabled: true
  }
};

export const WALLET_ROTATION_ORDER: WalletId[] = ['wallet_a', 'wallet_b', 'wallet_c'];

// -----------------------------------------------------------------------------
// SUPPORTED BLOCKCHAIN NETWORKS
// -----------------------------------------------------------------------------
export const NETWORKS: Record<NetworkId, NetworkConfig> = {
  bitcoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    shortName: 'BTC',
    addressType: 'btc',
    explorerTxUrl: 'https://mempool.space/tx/',
    explorerAddressUrl: 'https://mempool.space/address/',
    confirmationBlocks: 2,
    blockTimeSec: 600,
    networkFamily: 'Bitcoin',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    iconName: 'bitcoin'
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    shortName: 'ERC20',
    addressType: 'evm',
    explorerTxUrl: 'https://etherscan.io/tx/',
    explorerAddressUrl: 'https://etherscan.io/address/',
    confirmationBlocks: 12,
    blockTimeSec: 12,
    networkFamily: 'EVM',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    iconName: 'ethereum'
  },
  tron: {
    id: 'tron',
    name: 'TRON',
    shortName: 'TRC20',
    addressType: 'tron',
    explorerTxUrl: 'https://tronscan.org/#/transaction/',
    explorerAddressUrl: 'https://tronscan.org/#/address/',
    confirmationBlocks: 19,
    blockTimeSec: 3,
    networkFamily: 'Tron',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    iconName: 'tron'
  },
  bsc: {
    id: 'bsc',
    name: 'BNB Smart Chain',
    shortName: 'BEP20',
    addressType: 'evm',
    explorerTxUrl: 'https://bscscan.com/tx/',
    explorerAddressUrl: 'https://bscscan.com/address/',
    confirmationBlocks: 15,
    blockTimeSec: 3,
    networkFamily: 'EVM',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    iconName: 'bsc'
  },
  solana: {
    id: 'solana',
    name: 'Solana',
    shortName: 'SPL',
    addressType: 'sol',
    explorerTxUrl: 'https://solscan.io/tx/',
    explorerAddressUrl: 'https://solscan.io/account/',
    confirmationBlocks: 32,
    blockTimeSec: 0.4,
    networkFamily: 'Solana',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    iconName: 'solana'
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum One',
    shortName: 'Arbitrum',
    addressType: 'evm',
    explorerTxUrl: 'https://arbiscan.io/tx/',
    explorerAddressUrl: 'https://arbiscan.io/address/',
    confirmationBlocks: 20,
    blockTimeSec: 0.25,
    networkFamily: 'EVM',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    iconName: 'arbitrum'
  },
  base: {
    id: 'base',
    name: 'Base',
    shortName: 'Base',
    addressType: 'evm',
    explorerTxUrl: 'https://basescan.org/tx/',
    explorerAddressUrl: 'https://basescan.org/address/',
    confirmationBlocks: 15,
    blockTimeSec: 2,
    networkFamily: 'EVM',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    iconName: 'base'
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon PoS',
    shortName: 'Polygon',
    addressType: 'evm',
    explorerTxUrl: 'https://polygonscan.com/tx/',
    explorerAddressUrl: 'https://polygonscan.com/address/',
    confirmationBlocks: 32,
    blockTimeSec: 2,
    networkFamily: 'EVM',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    iconName: 'polygon'
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    shortName: 'OP',
    addressType: 'evm',
    explorerTxUrl: 'https://optimistic.etherscan.io/tx/',
    explorerAddressUrl: 'https://optimistic.etherscan.io/address/',
    confirmationBlocks: 20,
    blockTimeSec: 2,
    networkFamily: 'EVM',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    iconName: 'optimism'
  },
  avalanche: {
    id: 'avalanche',
    name: 'Avalanche C-Chain',
    shortName: 'AVAX-C',
    addressType: 'evm',
    explorerTxUrl: 'https://snowtrace.io/tx/',
    explorerAddressUrl: 'https://snowtrace.io/address/',
    confirmationBlocks: 12,
    blockTimeSec: 2,
    networkFamily: 'EVM',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    iconName: 'avalanche'
  },
  ton: {
    id: 'ton',
    name: 'TON Mainnet',
    shortName: 'TON',
    addressType: 'ton',
    explorerTxUrl: 'https://tonscan.org/tx/',
    explorerAddressUrl: 'https://tonscan.org/address/',
    confirmationBlocks: 12,
    blockTimeSec: 5,
    networkFamily: 'TON',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    iconName: 'ton'
  }
};

// -----------------------------------------------------------------------------
// ASSETS & NETWORK SUPPORT MATRIX
// -----------------------------------------------------------------------------
export const ASSETS: Record<AssetSymbol, AssetConfig> = {
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    decimals: 8,
    defaultPriceUsd: 84500,
    iconColor: '#F7931A',
    supportedNetworks: [
      { networkId: 'bitcoin', isNative: true, tokenStandard: 'Native' }
    ]
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    defaultPriceUsd: 1.00,
    iconColor: '#26A17B',
    supportedNetworks: [
      { networkId: 'tron', tokenContract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', decimals: 6, isNative: false, tokenStandard: 'TRC20' },
      { networkId: 'ethereum', tokenContract: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'bsc', tokenContract: '0x55d398326f99059ff775485246999027b3197955', decimals: 18, isNative: false, tokenStandard: 'BEP20' },
      { networkId: 'arbitrum', tokenContract: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'solana', tokenContract: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6, isNative: false, tokenStandard: 'SPL' },
      { networkId: 'polygon', tokenContract: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'optimism', tokenContract: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'avalanche', tokenContract: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', decimals: 6, isNative: false, tokenStandard: 'ERC20' }
    ]
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    defaultPriceUsd: 1.00,
    iconColor: '#2775CA',
    supportedNetworks: [
      { networkId: 'ethereum', tokenContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'base', tokenContract: '0x833589fCD6edb6E08f4c7C32D4f71b54bdA02913', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'arbitrum', tokenContract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'solana', tokenContract: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6, isNative: false, tokenStandard: 'SPL' },
      { networkId: 'polygon', tokenContract: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'bsc', tokenContract: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18, isNative: false, tokenStandard: 'BEP20' },
      { networkId: 'optimism', tokenContract: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6, isNative: false, tokenStandard: 'ERC20' },
      { networkId: 'avalanche', tokenContract: '0xB97EF8Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6, isNative: false, tokenStandard: 'ERC20' }
    ]
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    defaultPriceUsd: 2280,
    iconColor: '#627EEA',
    supportedNetworks: [
      { networkId: 'ethereum', isNative: true, tokenStandard: 'Native' },
      { networkId: 'arbitrum', isNative: true, tokenStandard: 'Native' },
      { networkId: 'optimism', isNative: true, tokenStandard: 'Native' },
      { networkId: 'base', isNative: true, tokenStandard: 'Native' }
    ]
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    defaultPriceUsd: 138,
    iconColor: '#14F195',
    supportedNetworks: [
      { networkId: 'solana', isNative: true, tokenStandard: 'Native' }
    ]
  },
  BNB: {
    symbol: 'BNB',
    name: 'BNB',
    decimals: 18,
    defaultPriceUsd: 615,
    iconColor: '#F3BA2F',
    supportedNetworks: [
      { networkId: 'bsc', isNative: true, tokenStandard: 'Native' }
    ]
  },
  TRX: {
    symbol: 'TRX',
    name: 'TRON',
    decimals: 6,
    defaultPriceUsd: 0.22,
    iconColor: '#FF0013',
    supportedNetworks: [
      { networkId: 'tron', isNative: true, tokenStandard: 'Native' }
    ]
  },
  TON: {
    symbol: 'TON',
    name: 'Toncoin',
    decimals: 9,
    defaultPriceUsd: 3.65,
    iconColor: '#0088CC',
    supportedNetworks: [
      { networkId: 'ton', isNative: true, tokenStandard: 'Native' }
    ]
  },
  POL: {
    symbol: 'POL',
    name: 'Polygon',
    decimals: 18,
    defaultPriceUsd: 0.38,
    iconColor: '#8247E5',
    supportedNetworks: [
      { networkId: 'polygon', isNative: true, tokenStandard: 'Native' }
    ]
  },
  AVAX: {
    symbol: 'AVAX',
    name: 'Avalanche',
    decimals: 18,
    defaultPriceUsd: 24.50,
    iconColor: '#E84142',
    supportedNetworks: [
      { networkId: 'avalanche', isNative: true, tokenStandard: 'Native' }
    ]
  }
};

/**
 * Returns the appropriate public receiving address for a given wallet and network
 */
export function getReceivingAddress(walletId: WalletId, networkId: NetworkId): string {
  const wallet = WALLET_CONFIGS[walletId] || WALLET_CONFIGS.wallet_a;
  const network = NETWORKS[networkId];

  if (!network) {
    throw new Error(`Unsupported network: ${networkId}`);
  }

  switch (network.addressType) {
    case 'btc':
      return wallet.btcAddress;
    case 'sol':
      return wallet.solAddress;
    case 'tron':
      return wallet.tronAddress;
    case 'ton':
      return wallet.tonAddress;
    case 'evm':
    default:
      return wallet.evmAddress;
  }
}

/**
 * Generates the standardized Payment URI for QR code encoding
 */
export function generatePaymentUri(
  asset: AssetSymbol,
  networkId: NetworkId,
  address: string,
  cryptoAmount: number
): string {
  switch (asset) {
    case 'BTC':
      return `bitcoin:${address}?amount=${cryptoAmount}`;
    case 'ETH':
      if (networkId === 'ethereum') {
        return `ethereum:${address}?value=${cryptoAmount}`;
      }
      return address;
    case 'SOL':
      return `solana:${address}?amount=${cryptoAmount}`;
    case 'TON':
      return `ton://transfer/${address}?amount=${Math.round(cryptoAmount * 1e9)}`;
    case 'TRX':
      return `tron:${address}?amount=${cryptoAmount}`;
    case 'USDT':
    case 'USDC':
    default:
      // Return raw address for tokens to ensure 100% wallet scan compatibility
      return address;
  }
}

// -----------------------------------------------------------------------------
// PAYMENT CONFIRMATION & OVERPAYMENT THRESHOLDS
// -----------------------------------------------------------------------------
/**
 * Maximum USD equivalent overpayment allowable for automatic blockchain confirmation.
 * Any amount received equal to or greater than the locked invoice requirement,
 * with an excess up to this configured USD limit (calculated via locked invoice exchange rate),
 * will automatically confirm and provision license credentials.
 * Excess exceeding this threshold transitions to manual operator review.
 */
export const MAX_AUTO_CONFIRM_OVERPAYMENT_USD = 200;
