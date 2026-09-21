import { ASSETS } from '../config/cryptoConfig.ts';
import { AssetSymbol, ExchangeRates } from '../types/payment.ts';

// In-memory cache for exchange rates with TTL
interface CacheEntry {
  rates: ExchangeRates;
  timestamp: number;
}

let cachedRates: CacheEntry | null = null;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

export class RateService {
  /**
   * Fetches latest USD market rates for all supported assets.
   * If third-party API is temporarily unreachable, seamlessly falls back to cached/calibrated rates.
   */
  static async getLatestRates(): Promise<ExchangeRates> {
    const now = Date.now();
    if (cachedRates && now - cachedRates.timestamp < CACHE_TTL_MS) {
      return cachedRates.rates;
    }

    try {
      // Free public CoinGecko rate query
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin,binancecoin,solana,tron,the-open-network,matic-network,avalanche-2&vs_currencies=usd';
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(3500)
      });

      if (response.ok) {
        const data = await response.json();
        const rates: ExchangeRates = {
          BTC: data.bitcoin?.usd || ASSETS.BTC.defaultPriceUsd,
          ETH: data.ethereum?.usd || ASSETS.ETH.defaultPriceUsd,
          USDT: data.tether?.usd || 1.0,
          USDC: data['usd-coin']?.usd || 1.0,
          BNB: data.binancecoin?.usd || ASSETS.BNB.defaultPriceUsd,
          SOL: data.solana?.usd || ASSETS.SOL.defaultPriceUsd,
          TRX: data.tron?.usd || ASSETS.TRX.defaultPriceUsd,
          TON: data['the-open-network']?.usd || ASSETS.TON.defaultPriceUsd,
          POL: data['matic-network']?.usd || ASSETS.POL.defaultPriceUsd,
          AVAX: data['avalanche-2']?.usd || ASSETS.AVAX.defaultPriceUsd
        };

        cachedRates = { rates, timestamp: now };
        return rates;
      }
    } catch (err) {
      console.warn('Market rate provider API offline or throttled; applying calibrated exchange rates', err);
    }

    // Fallback baseline
    const fallbackRates: ExchangeRates = {
      BTC: ASSETS.BTC.defaultPriceUsd,
      ETH: ASSETS.ETH.defaultPriceUsd,
      USDT: 1.0,
      USDC: 1.0,
      BNB: ASSETS.BNB.defaultPriceUsd,
      SOL: ASSETS.SOL.defaultPriceUsd,
      TRX: ASSETS.TRX.defaultPriceUsd,
      TON: ASSETS.TON.defaultPriceUsd,
      POL: ASSETS.POL.defaultPriceUsd,
      AVAX: ASSETS.AVAX.defaultPriceUsd
    };

    cachedRates = { rates: fallbackRates, timestamp: now };
    return fallbackRates;
  }

  /**
   * Calculates the exact crypto amount for a given USD price and asset
   */
  static calculateCryptoAmount(usdPrice: number, rate: number, asset: AssetSymbol): { amount: number; formatted: string } {
    if (!rate || rate <= 0) return { amount: 0, formatted: '0.00' };

    const rawAmount = usdPrice / rate;

    // Formatting based on asset type
    let formatted: string;
    if (asset === 'BTC') {
      formatted = rawAmount.toFixed(8);
    } else if (asset === 'ETH' || asset === 'BNB' || asset === 'SOL' || asset === 'AVAX') {
      formatted = rawAmount.toFixed(6);
    } else if (asset === 'USDT' || asset === 'USDC') {
      formatted = rawAmount.toFixed(2);
    } else {
      formatted = rawAmount.toFixed(4);
    }

    return {
      amount: parseFloat(formatted),
      formatted
    };
  }
}
