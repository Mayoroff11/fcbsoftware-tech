import React, { useState, useRef, useEffect } from 'react';
import { ASSETS, NETWORKS } from '../../config/cryptoConfig.ts';
import { AssetSymbol, NetworkId } from '../../types/payment.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';
import { getNetworkIcon } from '../crypto/CryptoIcons.tsx';
import { ChevronDown, Network, Check } from 'lucide-react';

interface NetworkSelectorProps {
  selectedAsset: AssetSymbol;
  selectedNetwork: NetworkId;
  onSelectNetwork: (network: NetworkId) => void;
  disabled?: boolean;
}

export const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedAsset,
  selectedNetwork,
  onSelectNetwork,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const assetConfig = ASSETS[selectedAsset] || ASSETS.BTC;
  const supportedNetworks = assetConfig.supportedNetworks || [];

  const currentNetworkConfig = NETWORKS[selectedNetwork] || NETWORKS.bitcoin;
  const currentNetworkItem = supportedNetworks.find((n) => n.networkId === selectedNetwork) || supportedNetworks[0];

  // Click outside listener
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

  const handleSelect = (networkId: NetworkId) => {
    onSelectNetwork(networkId);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5 text-violet-600" />
          <span>Blockchain Network</span>
        </span>
        <span className="text-[11px] font-normal normal-case text-slate-500">
          {supportedNetworks.length} {supportedNetworks.length === 1 ? 'network' : 'networks'} supported
        </span>
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        id="dropdown-select-network"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full py-2.5 px-3.5 rounded-xl border bg-white text-left transition-all flex items-center justify-between gap-2 cursor-pointer shadow-2xs hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${
          isOpen ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-slate-200'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}`}
      >
        <div className="flex items-center gap-2.5 truncate min-w-0">
          <CryptoNetworkIcon
            asset={selectedAsset}
            network={selectedNetwork}
            size="sm"
            showNetworkBadge={true}
          />
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-xs font-bold text-slate-900 truncate">
              {currentNetworkConfig.name}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200/80 shrink-0">
              {currentNetworkItem?.tokenStandard || currentNetworkConfig.shortName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-slate-400">
          <span className="text-[10px] text-slate-400 hidden sm:inline font-mono">
            ~{currentNetworkConfig.confirmationBlocks} confs
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-600' : ''}`} />
        </div>
      </button>

      {/* Dropdown Popover */}
      {isOpen && !disabled && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white rounded-xl border border-violet-100 shadow-xl shadow-violet-950/10 py-1.5 max-h-72 overflow-y-auto divide-y divide-slate-100/80 focus:outline-none"
        >
          {supportedNetworks.map((item) => {
            const net = NETWORKS[item.networkId];
            if (!net) return null;
            const isSelected = selectedNetwork === item.networkId;

            return (
              <button
                key={item.networkId}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.networkId)}
                className={`w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer hover:bg-violet-50/80 ${
                  isSelected ? 'bg-violet-50 font-bold text-violet-900' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="rounded-full overflow-hidden shadow-2xs shrink-0">
                    {getNetworkIcon(item.networkId, 22)}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-900 truncate flex items-center gap-1.5">
                      <span>{net.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {item.tokenStandard || net.shortName} · ~{net.confirmationBlocks} block confirmations
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
                    {item.tokenStandard || net.shortName}
                  </span>
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
