export type WalletId = 'wallet_a' | 'wallet_b' | 'wallet_c';

export interface WalletConfig {
  id: WalletId;
  label: string;
  evmAddress: string;
  btcAddress: string;
  solAddress: string;
  tronAddress: string;
  tonAddress: string;
  enabled: boolean;
}

export type AssetSymbol = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'SOL' | 'TRX' | 'TON' | 'POL' | 'AVAX';

export type NetworkId =
  | 'bitcoin'
  | 'ethereum'
  | 'bsc'
  | 'arbitrum'
  | 'optimism'
  | 'base'
  | 'polygon'
  | 'avalanche'
  | 'solana'
  | 'tron'
  | 'ton';

export interface NetworkConfig {
  id: NetworkId;
  name: string;
  shortName: string;
  addressType: 'evm' | 'btc' | 'sol' | 'tron' | 'ton';
  explorerTxUrl: string;
  explorerAddressUrl: string;
  confirmationBlocks: number;
  blockTimeSec: number;
  networkFamily: 'EVM' | 'Bitcoin' | 'Solana' | 'Tron' | 'TON';
  badgeColor: string;
  iconName: string;
}

export interface AssetConfig {
  symbol: AssetSymbol;
  name: string;
  decimals: number;
  defaultPriceUsd: number;
  iconColor: string;
  supportedNetworks: {
    networkId: NetworkId;
    tokenContract?: string;
    decimals?: number;
    isNative: boolean;
    tokenStandard?: 'ERC20' | 'TRC20' | 'BEP20' | 'SPL' | 'Native';
  }[];
}

export type PaymentStatus =
  | 'awaiting_payment'
  | 'payment_detected'
  | 'confirming'
  | 'confirmed'
  | 'underpaid'
  | 'overpaid'
  | 'overpaid_manual_review'
  | 'expired';

export interface Invoice {
  id: string; // e.g. "FCB-883921"
  invoiceNumber: string;
  planId: string;
  planName: string;
  planType: 'personal' | 'business';
  durationName: string;
  usdAmount: number;
  walletId: WalletId;
  asset: AssetSymbol;
  network: NetworkId;
  receivingAddress: string;
  tokenContract?: string;
  cryptoAmount: number;
  cryptoAmountFormatted: string;
  exchangeRate: number;
  createdAt: number;
  expiresAt: number;
  status: PaymentStatus;
  transactionHash?: string;
  detectedAt?: number;
  confirmedAt?: number;
  confirmations: number;
  requiredConfirmations: number;
  explorerUrl?: string;
  underpaidAmount?: number;
  overpaidAmount?: number;
  overpaidUsdAmount?: number;
  receivedAmount?: number;
  updatedAt: number;
  licenseHash?: string;
}

export interface ExchangeRates {
  [key: string]: number; // USD price per 1 unit of asset
}
