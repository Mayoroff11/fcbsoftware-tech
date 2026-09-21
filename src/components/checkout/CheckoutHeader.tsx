import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, RefreshCw, Menu, X, Home, Shield, FileText, Users, RotateCcw, BookOpen, LifeBuoy } from 'lucide-react';
import { BrandLogoMark } from '../BrandLogo.tsx';

interface CheckoutHeaderProps {
  invoiceNumber: string;
  onNavigateHome: () => void;
  onGenerateNewInvoice: () => void;
  onOpenPricing?: () => void;
  onOpenSecurity?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenDevTeam?: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenDocs?: () => void;
  onOpenSupport?: () => void;
  isGeneratingNew?: boolean;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  invoiceNumber,
  onNavigateHome,
  onGenerateNewInvoice,
  onOpenPricing,
  onOpenSecurity,
  onOpenPrivacyPolicy,
  onOpenDevTeam,
  onOpenRefundPolicy,
  onOpenDocs,
  onOpenSupport,
  isGeneratingNew = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-violet-100 bg-white/90 backdrop-blur-xl sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Back to Home & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              id="checkout-back-to-home"
              onClick={onNavigateHome}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 border border-slate-200/90 hover:border-violet-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
              title="Return to FCB Home Page"
            >
              <ArrowLeft className="w-4 h-4 text-violet-600" />
              <span>Return to Home</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
              title="Return to FCB Home"
            >
              <BrandLogoMark size={32} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 tracking-tight text-base font-display group-hover:text-violet-700 transition-colors">
                    FCB
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 px-2 py-0.5 rounded-md bg-violet-50 border border-violet-200/80">
                    Checkout
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Center: Desktop Header Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={onNavigateHome}
              className="px-2.5 py-1.5 rounded-lg hover:text-violet-700 hover:bg-violet-50/60 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={onOpenPricing || onNavigateHome}
              className="px-2.5 py-1.5 rounded-lg hover:text-violet-700 hover:bg-violet-50/60 transition-colors cursor-pointer"
            >
              Pricing
            </button>
            {onOpenSecurity && (
              <button
                type="button"
                onClick={onOpenSecurity}
                className="px-2.5 py-1.5 rounded-lg hover:text-violet-700 hover:bg-violet-50/60 transition-colors cursor-pointer"
              >
                Security
              </button>
            )}
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="px-2.5 py-1.5 rounded-lg hover:text-violet-700 hover:bg-violet-50/60 transition-colors cursor-pointer"
              >
                Privacy
              </button>
            )}
            {onOpenDevTeam && (
              <button
                type="button"
                onClick={onOpenDevTeam}
                className="px-2.5 py-1.5 rounded-lg hover:text-violet-700 hover:bg-violet-50/60 transition-colors cursor-pointer"
              >
                Dev Team
              </button>
            )}
            {onOpenRefundPolicy && (
              <button
                type="button"
                onClick={onOpenRefundPolicy}
                className="px-2.5 py-1.5 rounded-lg hover:text-violet-700 hover:bg-violet-50/60 transition-colors cursor-pointer"
              >
                Refunds
              </button>
            )}
          </nav>

          {/* Right: Security & Invoice Reference */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-mono font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{invoiceNumber}</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Settlement</span>
            </div>

            <button
              type="button"
              onClick={onGenerateNewInvoice}
              disabled={isGeneratingNew}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-violet-50 border border-violet-200 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-2xs"
              title="Generate a new invoice with fresh quote"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-600 ${isGeneratingNew ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">New Quote</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-slate-700 hover:bg-violet-50 border border-slate-200 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 pb-2 border-t border-violet-100 mt-2.5 space-y-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
            >
              <Home className="w-4 h-4 text-violet-600" />
              <span>Home</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPricing) onOpenPricing();
                else onNavigateHome();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
            >
              <FileText className="w-4 h-4 text-violet-600" />
              <span>License Pricing</span>
            </button>
            {onOpenSecurity && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSecurity();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
              >
                <Shield className="w-4 h-4 text-violet-600" />
                <span>Security</span>
              </button>
            )}
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrivacyPolicy();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
              >
                <Lock className="w-4 h-4 text-violet-600" />
                <span>Privacy Policy</span>
              </button>
            )}
            {onOpenDevTeam && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDevTeam();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
              >
                <Users className="w-4 h-4 text-violet-600" />
                <span>Development Team</span>
              </button>
            )}
            {onOpenRefundPolicy && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRefundPolicy();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
              >
                <RotateCcw className="w-4 h-4 text-violet-600" />
                <span>Refund Policy</span>
              </button>
            )}
            {onOpenDocs && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDocs();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
              >
                <BookOpen className="w-4 h-4 text-violet-600" />
                <span>Documentation</span>
              </button>
            )}
            {onOpenSupport && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupport();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 flex items-center gap-2 cursor-pointer font-medium"
              >
                <LifeBuoy className="w-4 h-4 text-violet-600" />
                <span>Support</span>
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
