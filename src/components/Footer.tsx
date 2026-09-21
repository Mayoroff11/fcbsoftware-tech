import React from 'react';
import {
  ArrowUp,
  Youtube,
  Facebook
} from 'lucide-react';
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
            TOP ROW: BRAND & IDENTITY + BACK TO TOP + SOCIALS
           ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-violet-200/60">
          {/* Brand Info */}
          <div className="space-y-2.5 max-w-md">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Professional Bitcoin Transaction Software engineered for deterministic execution, air-gapped signing, and direct RPC node operations.
            </p>
          </div>

          {/* Socials & Back to Top Container */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Social:
              </span>
              
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-xl bg-white hover:bg-violet-50 border border-violet-200/80 text-slate-600 hover:text-violet-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-xl bg-white hover:bg-violet-50 border border-violet-200/80 text-slate-600 hover:text-violet-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Youtube className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-xl bg-white hover:bg-violet-50 border border-violet-200/80 text-slate-600 hover:text-violet-700 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>

            {/* Back to Top Button */}
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
