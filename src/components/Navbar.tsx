import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Key } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface NavbarProps {
  onOpenLicense: (tierId?: string) => void;
  onOpenSupport: () => void;
  onOpenDocs: () => void;
  onNavigateHome?: (sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenLicense, 
  onOpenSupport, 
  onOpenDocs,
  onNavigateHome 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome('hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8"
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 relative ${
          isScrolled
            ? 'bg-white/92 backdrop-blur-2xl border border-violet-200/90 shadow-[0_12px_32px_-6px_rgba(109,40,217,0.12),0_2px_6px_rgba(0,0,0,0.03)]'
            : 'bg-white/75 backdrop-blur-xl border border-white/95 shadow-[0_4px_24px_-4px_rgba(109,40,217,0.06),0_1px_3px_rgba(0,0,0,0.02)]'
        }`}
      >
        {/* Subtle top specular reflection line */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        <div className="flex items-center justify-between h-16 sm:h-[68px] px-3.5 sm:px-5 lg:px-6">
          {/* Brand Logo Presentation */}
          <a
            href="#"
            id="nav-brand-link"
            onClick={handleBrandClick}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-xl p-1 transition-all duration-200 cursor-pointer"
            aria-label="FCB Home"
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13.5px] font-medium text-slate-600">
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about')}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.04] transition-all cursor-pointer font-medium"
            >
              About
            </button>
            <button
              id="nav-link-licenses"
              onClick={() => scrollToSection('licenses')}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.04] transition-all cursor-pointer font-medium"
            >
              Licenses
            </button>
            <button
              id="nav-link-demonstrations"
              onClick={() => scrollToSection('demonstrations')}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.04] transition-all cursor-pointer font-medium"
            >
              Demonstrations
            </button>
            <button
              id="nav-link-reviews"
              onClick={() => scrollToSection('reviews')}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.04] transition-all cursor-pointer font-medium"
            >
              Reviews
            </button>
            <button
              id="nav-link-pricing"
              onClick={() => scrollToSection('pricing')}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.04] transition-all cursor-pointer font-medium"
            >
              Pricing
            </button>
            <a
              href="mailto:support@fcbsoftware.tech"
              id="nav-link-support"
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.04] transition-all cursor-pointer font-medium"
            >
              Support
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="nav-btn-docs"
              onClick={onOpenDocs}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white border border-slate-200/90 hover:border-violet-300 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer backdrop-blur-xl shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-600" />
              <span>FCB Documentation</span>
            </button>

            <button
              id="nav-btn-acquire-license"
              onClick={() => scrollToSection('pricing')}
              className="px-4 py-1.5 sm:px-4.5 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(109,40,217,0.28)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.38)] hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer border border-white/25 active:translate-y-0"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Acquire License</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 text-slate-700 hover:text-slate-950 bg-white/90 border border-violet-200/90 rounded-xl focus:outline-none cursor-pointer shadow-2xs backdrop-blur-md transition-all active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden border-t border-violet-100/90 px-4 pt-3 pb-5 space-y-3 bg-white/95 backdrop-blur-2xl rounded-b-2xl shadow-xl shadow-violet-950/5"
          >
            <div className="flex flex-col space-y-0.5">
              <button
                onClick={() => scrollToSection('about')}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 rounded-xl transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('licenses')}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 rounded-xl transition-colors cursor-pointer"
              >
                Licenses
              </button>
              <button
                onClick={() => scrollToSection('demonstrations')}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 rounded-xl transition-colors cursor-pointer"
              >
                Demonstrations
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 rounded-xl transition-colors cursor-pointer"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 rounded-xl transition-colors cursor-pointer"
              >
                Pricing
              </button>
              <a
                href="mailto:support@fcbsoftware.tech"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-violet-700 hover:bg-violet-50/80 rounded-xl transition-colors cursor-pointer block"
              >
                Support
              </a>
            </div>

            <div className="pt-3 border-t border-violet-100 flex flex-col sm:hidden gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDocs();
                }}
                className="w-full py-2.5 px-4 text-xs font-medium text-slate-700 bg-white hover:bg-violet-50 border border-violet-200/80 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-violet-600" />
                <span>FCB Documentation</span>
              </button>

              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-violet-500/25 cursor-pointer border border-white/20"
              >
                <Key className="w-4 h-4" />
                <span>Acquire License</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
