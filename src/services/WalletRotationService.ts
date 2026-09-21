import { WALLET_ROTATION_ORDER } from '../config/cryptoConfig.ts';
import { WalletId } from '../types/payment.ts';

const ROTATION_STORAGE_KEY = 'fcb_wallet_rotation_cursor';

export class WalletRotationService {
  /**
   * Retrieves the current rotation index without advancing it
   */
  static getCurrentIndex(): number {
    try {
      const stored = localStorage.getItem(ROTATION_STORAGE_KEY);
      if (stored !== null) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val >= 0) {
          return val % WALLET_ROTATION_ORDER.length;
        }
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
    return 0;
  }

  /**
   * Atomically assigns the next wallet in rotation (A -> B -> C -> A...)
   * This is called EXCLUSIVELY when a new invoice is created.
   */
  static getNextWallet(): WalletId {
    const currentIndex = this.getCurrentIndex();
    const assignedWallet = WALLET_ROTATION_ORDER[currentIndex];

    // Advance cursor to next slot atomically
    const nextIndex = (currentIndex + 1) % WALLET_ROTATION_ORDER.length;
    try {
      localStorage.setItem(ROTATION_STORAGE_KEY, nextIndex.toString());
    } catch {
      // Fallback
    }

    return assignedWallet;
  }

  /**
   * Peek at next wallet for preview or testing
   */
  static peekNextWallet(): WalletId {
    const currentIndex = this.getCurrentIndex();
    return WALLET_ROTATION_ORDER[currentIndex];
  }
}
