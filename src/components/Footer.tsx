import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface FooterProps {
  onOpenLicense: (tierId?: string) => void;
  onOpenSupport: () => void;
  onOpenReportProblem?: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenDevTeam?: () => void;
  onOpenSecurity?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onNavigateHome?: (sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenLicense, 
  onOpenSupport, 
  onOpenReportProblem,
  onOpenRefundPolicy,
  onOpenDevTeam,
  onOpenSecurity,
  onOpenPrivacyPolicy,
  onNavigateHome
}) => {
  const scrollTo = (id: string) => {
    if (onNavigateHome) {
      onNavigateHome(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (onNavigateHome) {
      onNavigateHome('hero');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="footer" className="bg-white/60 text-slate-600 text-xs border-t border-violet-200/60 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        
        {/* =========================================================
            TOP ROW: BRAND & IDENTITY + BACK TO TOP
           ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-violet-200/60">
          {/* Brand Info */}
          <div className="space-y-2.5 max-w-md">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Professional Bitcoin Transaction Software engineered for deterministic execution, air-gapped signing, and direct RPC node operations.
            </p>
          </div>

          {/* Back to Top Container */}
          <div className="flex items-center">
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-800 border border-violet-200/80 hover:border-violet-300 transition-all flex items-center gap-2 cursor-pointer text-xs font-semibold shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-violet-600" />
            </button>
          </div>
        </div>

        {/* =========================================================
            4 COLUMNS LINK GRID
            1. PRODUCT | 2. COMPANY | 3. DEVELOPER | 4. SUPPORT
           ========================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-12">
          
          {/* Column 1: PRODUCT */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('architecture')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('demonstrations')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  Video Tutorials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('licenses')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  Licenses
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: COMPANY */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  About FCB
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left"
                >
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: DEVELOPER */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Developer
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenDevTeam}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left font-medium"
                >
                  Development Team
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSecurity}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left font-medium"
                >
                  Security
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left font-medium"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: SUPPORT */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:support@fcbsoftware.tech"
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left block"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <button
                  id="footer-link-report-problem"
                  onClick={onOpenReportProblem}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left font-medium"
                >
                  Report a Problem
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRefundPolicy}
                  className="hover:text-violet-700 text-slate-600 transition-colors cursor-pointer text-left font-medium"
                >
                  Return / Refund Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================
            FOOTER BOTTOM BAR
           ========================================================= */}
        <div className="pt-8 border-t border-violet-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} FCB. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacyPolicy}
              className="hover:text-violet-700 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-violet-300">•</span>
            <button
              onClick={onOpenRefundPolicy}
              className="hover:text-violet-700 transition-colors cursor-pointer"
            >
              Terms / Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
