import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, ArrowRight, Bitcoin, CreditCard, Building } from 'lucide-react';
import { ALL_LICENSE_PLANS, DURATION_GROUPS } from '../data/websiteData.ts';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTierId?: string;
  onProceedToCheckout?: (tierId: string) => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  initialTierId = '1m-business',
  onProceedToCheckout
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(initialTierId);
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [osTarget, setOsTarget] = useState('linux');
  const [paymentMethod, setPaymentMethod] = useState<'btc' | 'wire' | 'card'>('btc');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTierId) {
      setSelectedTier(initialTierId);
    }
  }, [initialTierId]);

  if (!isOpen) return null;

  const currentPlan = ALL_LICENSE_PLANS.find((t) => t.id === selectedTier) || ALL_LICENSE_PLANS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (paymentMethod === 'btc' && onProceedToCheckout) {
      onClose();
      onProceedToCheckout(selectedTier);
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 border border-violet-200/80 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl my-8 backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-violet-50 border border-violet-100 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider">
                <Key className="w-3.5 h-3.5" />
                <span>Software License Acquisition</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Acquire FCB Software License
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your operator details below to receive binary cryptographic hashes and perpetual activation credentials for your chosen edition.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Plan Banner / Selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Selected License Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs text-slate-900 focus:outline-none focus:border-violet-500 cursor-pointer shadow-xs"
                >
                  {DURATION_GROUPS.map((group) => (
                    <optgroup key={group.id} label={`${group.name} Plans`} className="bg-white text-slate-900">
                      <option value={group.personal.id} className="bg-white text-slate-900">
                        {group.name} - {group.personal.title} ({group.personal.price})
                      </option>
                      <option value={group.business.id} className="bg-white text-slate-900">
                        {group.name} - {group.business.title} ({group.business.price})
                      </option>
                    </optgroup>
                  ))}
                </select>

                <div className="p-3.5 rounded-xl bg-violet-50/80 border border-violet-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-violet-800">{currentPlan.durationName} — {currentPlan.title}</span>
                    <span className="text-slate-600 ml-2">({currentPlan.description})</span>
                  </div>
                  <div className="font-price font-bold text-slate-900 text-sm">
                    {currentPlan.price}
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="license-email" className="text-xs font-medium text-slate-700">
                    Operator / Delivery Email *
                  </label>
                  <input
                    id="license-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="desk@institution.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="license-org" className="text-xs font-medium text-slate-700">
                    Organization / Desk Name
                  </label>
                  <input
                    id="license-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Treasury Services"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Target Operating System */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Target Operating System</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'linux', label: 'Linux (x86_64 / ARM)' },
                    { id: 'macos', label: 'macOS (Apple / Intel)' },
                    { id: 'windows', label: 'Windows (64-bit)' }
                  ].map((os) => (
                    <button
                      type="button"
                      key={os.id}
                      onClick={() => setOsTarget(os.id)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        osTarget === os.id
                          ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                          : 'bg-white border-violet-200 text-slate-700 hover:bg-violet-50'
                      }`}
                    >
                      {os.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settlement Preference */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Settlement Currency Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('btc')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                      paymentMethod === 'btc'
                        ? 'bg-violet-50 border-violet-500 text-violet-800 font-semibold shadow-xs'
                        : 'bg-white border-violet-200 text-slate-700 hover:bg-violet-50'
                    }`}
                  >
                    <Bitcoin className="w-4 h-4 text-violet-600" />
                    <span>Bitcoin On-Chain</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                      paymentMethod === 'wire'
                        ? 'bg-violet-50 border-violet-500 text-violet-800 font-semibold shadow-xs'
                        : 'bg-white border-violet-200 text-slate-700 hover:bg-violet-50'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Bank Wire / Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-violet-50 border-violet-500 text-violet-800 font-semibold shadow-xs'
                        : 'bg-white border-violet-200 text-slate-700 hover:bg-violet-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Corporate Card</span>
                  </button>
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="pt-4 border-t border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  Total:{' '}
                  <span className="text-slate-900 font-bold text-base font-price">
                    {currentPlan.price}
                  </span>{' '}
                  <span className="text-[11px] text-slate-500">({currentPlan.durationName} {currentPlan.title})</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-500/25 active:scale-[0.99]"
                >
                  <span>Submit License Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-6">
            <div className="w-14 h-14 rounded-full bg-violet-100 border border-violet-300 flex items-center justify-center mx-auto text-violet-700">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                License Request Received
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you. We have logged your request for the <strong className="text-slate-900">{currentPlan.durationName} — {currentPlan.title}</strong> ({osTarget.toUpperCase()}). Settlement instructions and binary signature checksums have been queued for <strong className="text-violet-700">{email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-violet-50/80 border border-violet-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Request Ref ID:</span>
                <span className="font-mono font-bold text-slate-900">FCB-{Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Selected Tier:</span>
                <span className="text-slate-900 font-medium">{currentPlan.durationName} {currentPlan.title} ({currentPlan.price})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Settlement Method:</span>
                <span className="text-slate-900 font-medium">{paymentMethod.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-violet-50 border border-violet-200 transition-colors cursor-pointer"
              >
                Close & Return
              </button>
              {onProceedToCheckout && (
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout(selectedTier);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-colors cursor-pointer shadow-md shadow-violet-500/25 flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to Crypto Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
