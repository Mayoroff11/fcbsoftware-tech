import React, { useState, useRef, useEffect } from 'react';
import { ASSETS } from '../../config/cryptoConfig.ts';
import { AssetSymbol } from '../../types/payment.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';
import { ChevronDown, Coins, Check } from 'lucide-react';

interface AssetSelectorProps {
  selectedAsset: AssetSymbol;
  onSelectAsset: (asset: AssetSymbol) => void;
  disabled?: boolean;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  selectedAsset,
  onSelectAsset,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter only assets that have at least one supported network
  const availableAssets = Object.values(ASSETS).filter(
    (asset) => asset.supportedNetworks && asset.supportedNetworks.length > 0
  );

  const currentAssetConfig = ASSETS[selectedAsset] || availableAssets[0] || ASSETS.BTC;

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (symbol: AssetSymbol) => {
    onSelectAsset(symbol);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-violet-600" />
          <span>Payment Method</span>
        </span>
        <span className="text-[11px] font-normal normal-case text-slate-500">
          Select Cryptocurrency
        </span>
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        id="dropdown-select-asset"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full py-2.5 px-3.5 rounded-xl border bg-white text-left transition-all flex items-center justify-between gap-2 cursor-pointer shadow-2xs hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${
          isOpen ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-slate-200'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CryptoNetworkIcon
            asset={currentAssetConfig.symbol}
            size="sm"
            showNetworkBadge={false}
          />
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-xs font-bold text-slate-900 truncate">
              {currentAssetConfig.name}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              ({currentAssetConfig.symbol})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
          {currentAssetConfig.symbol === 'USDT' || currentAssetConfig.symbol === 'USDC' ? (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              STABLE
            </span>
          ) : null}
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-600' : ''}`} />
        </div>
      </button>

      {/* Dropdown Popover */}
      {isOpen && !disabled && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white rounded-xl border border-violet-100 shadow-xl shadow-violet-950/10 py-1.5 max-h-72 overflow-y-auto divide-y divide-slate-100/80 focus:outline-none"
        >
          {availableAssets.map((asset) => {
            const isSelected = selectedAsset === asset.symbol;
            return (
              <button
                key={asset.symbol}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(asset.symbol)}
                className={`w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer hover:bg-violet-50/80 ${
                  isSelected ? 'bg-violet-50 font-bold text-violet-900' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CryptoNetworkIcon
                    asset={asset.symbol}
                    size="sm"
                    showNetworkBadge={false}
                  />
                  <div className="flex items-baseline gap-1.5 truncate">
                    <span className="text-xs font-semibold text-slate-900 truncate">
                      {asset.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      ({asset.symbol})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {asset.symbol === 'USDT' || asset.symbol === 'USDC' ? (
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      USD
                    </span>
                  ) : null}
                  {isSelected ? (
                    <Check className="w-4 h-4 text-violet-600 stroke-[2.5]" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
