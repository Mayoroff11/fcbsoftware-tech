import React, { useState } from 'react';
import { X, BookOpen, Check } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenDevTeam?: () => void;
  onOpenSecurity?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenRefundPolicy,
  onOpenDevTeam,
  onOpenSecurity,
  onOpenPrivacyPolicy 
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'rpc' | 'security' | 'psbt'>('system');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white/95 border border-violet-200/80 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl my-8 backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-violet-50 border border-violet-100 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Documentation &amp; Architecture</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              FCB Operational Specifications
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard operating procedures, system requirements, and network topology for FCB software deployments.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-violet-100 text-xs font-medium space-x-1 sm:space-x-2 overflow-x-auto pb-1">
            {[
              { id: 'system', label: 'System Requirements' },
              { id: 'security', label: 'Security & Air-Gap' },
              { id: 'rpc', label: 'Node RPC Configuration' },
              { id: 'psbt', label: 'PSBT Workflow (BIP 174/370)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-violet-100/90 text-violet-800 font-bold border border-violet-300/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-violet-50/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[260px] text-xs text-slate-700 leading-relaxed">
            {activeTab === 'system' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Workstation Environments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-bold text-slate-900 mb-1">Linux</div>
                    <p className="text-slate-600 text-[11px]">Ubuntu 20.04+, Debian 11+, RHEL 8+, Arch Linux. Available as self-contained standalone binary / AppImage.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-bold text-slate-900 mb-1">macOS</div>
                    <p className="text-slate-600 text-[11px]">macOS 12.0 (Monterey) through macOS 15+ (Sequoia). Native universal binaries for Apple Silicon (M1/M2/M3/M4) &amp; Intel.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-bold text-slate-900 mb-1">Windows</div>
                    <p className="text-slate-600 text-[11px]">Windows 10 / 11 (64-bit Enterprise / Pro recommended). Code-signed executable with offline policy support.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 space-y-2">
                  <div className="text-slate-900 font-semibold">Resource Footprint</div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>RAM: 512 MB minimum (2 GB recommended for high-volume batch assemblies)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Disk: 120 MB standalone binary footprint</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Network: Optional (fully functional in complete air-gap mode)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Cryptographic Isolation Protocol</h4>
                <p className="text-slate-600">
                  FCB operates under a strict offline-first security paradigm. The application is completely decoupled from any centralized analytics, remote logging, or proprietary telemetry servers.
                </p>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-semibold text-violet-800">Deterministic Binary Checksums</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Every software release includes SHA256 hashes cryptographically signed with our verified PGP release key for binary integrity validation prior to execution.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-semibold text-violet-800">Zero Memory Retention Policy</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Transient key buffers and PSBT authorization tokens are wiped with zeroization routines immediately after signature witness assembly.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rpc' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Direct Node Integration</h4>
                <p className="text-slate-600">
                  Configure FCB to interact directly with your self-hosted Bitcoin Core instance or cluster via standard JSON-RPC.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 space-y-1">
                  <div className="text-slate-400"># Example bitcoin.conf parameters for FCB connection</div>
                  <div>server=1</div>
                  <div>rpcuser=fcb_operator</div>
                  <div>rpcpassword=&lt;secure_generated_rpc_key&gt;</div>
                  <div>rpcport=8332</div>
                  <div>rpcallowip=127.0.0.1</div>
                  <div>txindex=1</div>
                </div>
              </div>
            )}

            {activeTab === 'psbt' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Partially Signed Bitcoin Transactions</h4>
                <p className="text-slate-600">
                  FCB strictly adheres to BIP 174 and BIP 370 standards for multi-party and air-gapped cryptographic signing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-bold text-violet-700 mb-1">1. Creator</div>
                    <div className="text-[11px] text-slate-600">Constructs raw unsigned inputs, outputs, and locktime specifications.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-bold text-violet-700 mb-1">2. Signer</div>
                    <div className="text-[11px] text-slate-600">Air-gapped hardware/vault cryptographically attests signatures to witness scripts.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200/80">
                    <div className="font-bold text-violet-700 mb-1">3. Finalizer</div>
                    <div className="text-[11px] text-slate-600">Validates consensus witness fields and packages payload into broadcastable raw hex.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer of Modal */}
          <div className="pt-4 border-t border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {onOpenRefundPolicy && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRefundPolicy();
                  }}
                  className="text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors cursor-pointer"
                >
                  Returns &amp; Refunds Policy →
                </button>
              )}
              {onOpenDevTeam && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenDevTeam();
                  }}
                  className="text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors cursor-pointer"
                >
                  Development Team →
                </button>
              )}
              {onOpenSecurity && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenSecurity();
                  }}
                  className="text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors cursor-pointer"
                >
                  Security Specification →
                </button>
              )}
              {onOpenPrivacyPolicy && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPrivacyPolicy();
                  }}
                  className="text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors cursor-pointer"
                >
                  Privacy Policy →
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-colors cursor-pointer shadow-md shadow-violet-500/25 self-end"
            >
              Close Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
