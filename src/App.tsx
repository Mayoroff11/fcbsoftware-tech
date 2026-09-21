import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSoftware } from './components/AboutSoftware.tsx';
import { VideoDemos } from './components/VideoDemos.tsx';
import { Pricing } from './components/Pricing.tsx';
import { Reviews } from './components/Reviews.tsx';
import { FinalCta } from './components/FinalCta.tsx';
import { Footer } from './components/Footer.tsx';
import { LicenseModal } from './components/LicenseModal.tsx';
import { SupportModal } from './components/SupportModal.tsx';
import { ReportProblemModal } from './components/ReportProblemModal.tsx';
import { DocumentationModal } from './components/DocumentationModal.tsx';
import { BlockchainOverlay } from './components/BlockchainOverlay.tsx';
import { RefundPolicy } from './components/RefundPolicy.tsx';
import { DevelopmentTeam } from './components/DevelopmentTeam.tsx';
import { Security } from './components/Security.tsx';
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx';
import { PaymentPage } from './components/checkout/PaymentPage.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'refund-policy' | 'dev-team' | 'security' | 'privacy-policy' | 'checkout'>('home');
  const [activeInvoiceId, setActiveInvoiceId] = useState<string | undefined>(undefined);
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string>('1m-personal');
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [reportProblemModalOpen, setReportProblemModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const checkoutMatch = hash.match(/#(?:checkout|payment)(?:\/([A-Za-z0-9_-]+))?/i);

      if (checkoutMatch) {
        if (checkoutMatch[1]) {
          setActiveInvoiceId(checkoutMatch[1].toUpperCase());
        }
        setCurrentView('checkout');
      } else if (hash === '#refund-policy' || hash === '#return-policy') {
        setCurrentView('refund-policy');
      } else if (
        hash === '#development-team' || 
        hash === '#dev-team' || 
        hash === '#developer-team'
      ) {
        setCurrentView('dev-team');
      } else if (
        hash === '#security' || 
        hash === '#fcb-security' || 
        hash === '#protection'
      ) {
        setCurrentView('security');
      } else if (
        hash === '#privacy-policy' || 
        hash === '#privacy' || 
        hash === '#customer-privacy'
      ) {
        setCurrentView('privacy-policy');
      } else {
        // Any other hash like #pricing, #about, #reviews, #demonstrations, #licenses, #hero or empty
        setCurrentView('home');
        const targetId = hash.replace(/^#/, '');
        if (targetId && targetId !== 'home' && targetId !== 'hero') {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              const navOffset = 90;
              const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
              window.scrollTo({ top: pos, behavior: 'smooth' });
            }
          }, 80);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenLicense = (tierId?: string) => {
    const tier = tierId || '1m-personal';
    setSelectedTierId(tier);
    setActiveInvoiceId(undefined);
    setCurrentView('checkout');
    window.location.hash = '#checkout';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRefundPolicy = () => {
    setCurrentView('refund-policy');
    window.location.hash = '#refund-policy';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDevTeam = () => {
    setCurrentView('dev-team');
    window.location.hash = '#development-team';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSecurity = () => {
    setCurrentView('security');
    window.location.hash = '#security';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrivacyPolicy = () => {
    setCurrentView('privacy-policy');
    window.location.hash = '#privacy-policy';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (sectionId?: string) => {
    setCurrentView('home');
    setActiveInvoiceId(undefined);
    
    if (sectionId && sectionId !== 'hero') {
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 60);
    } else {
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5fd] text-[#1e1b33] flex flex-col font-sans selection:bg-violet-500/20 selection:text-violet-900 antialiased relative">
      {/* Abstract Blockchain Network Visual Overlay */}
      <BlockchainOverlay />

      {/* 1. Navigation (hidden on dedicated checkout for focused payment flow) */}
      {currentView !== 'checkout' && (
        <Navbar
          onOpenLicense={handleOpenLicense}
          onOpenSupport={() => setSupportModalOpen(true)}
          onOpenDocs={() => setDocsModalOpen(true)}
          onNavigateHome={currentView !== 'home' ? handleNavigateHome : undefined}
        />
      )}

      <main className="flex-1 relative z-10">
        {currentView === 'checkout' ? (
          <PaymentPage
            initialPlanId={selectedTierId}
            initialInvoiceId={activeInvoiceId}
            onNavigateHome={() => handleNavigateHome('hero')}
            onOpenPricing={() => handleNavigateHome('pricing')}
            onOpenSecurity={handleOpenSecurity}
            onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
            onOpenDevTeam={handleOpenDevTeam}
            onOpenRefundPolicy={handleOpenRefundPolicy}
            onOpenDocs={() => setDocsModalOpen(true)}
            onOpenSupport={() => setSupportModalOpen(true)}
          />
        ) : currentView === 'refund-policy' ? (
          <RefundPolicy
            onOpenSupport={() => setSupportModalOpen(true)}
            onNavigateHome={() => handleNavigateHome('hero')}
            onOpenLicense={handleOpenLicense}
          />
        ) : currentView === 'dev-team' ? (
          <DevelopmentTeam
            onOpenSupport={() => setSupportModalOpen(true)}
            onNavigateHome={() => handleNavigateHome('hero')}
            onOpenDocs={() => setDocsModalOpen(true)}
            onOpenSecurity={handleOpenSecurity}
          />
        ) : currentView === 'security' ? (
          <Security
            onOpenSupport={() => setSupportModalOpen(true)}
            onNavigateHome={() => handleNavigateHome('hero')}
            onOpenRefundPolicy={handleOpenRefundPolicy}
            onOpenDocs={() => setDocsModalOpen(true)}
            onOpenDevTeam={handleOpenDevTeam}
            onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
          />
        ) : currentView === 'privacy-policy' ? (
          <PrivacyPolicy
            onOpenSupport={() => setSupportModalOpen(true)}
            onNavigateHome={() => handleNavigateHome('hero')}
            onOpenRefundPolicy={handleOpenRefundPolicy}
            onOpenSecurity={handleOpenSecurity}
            onOpenDevTeam={handleOpenDevTeam}
            onOpenDocs={() => setDocsModalOpen(true)}
          />
        ) : (
          <>
            {/* 2 & 3. Hero & Hero Feature Strip */}
            <Hero
              onOpenLicense={() => handleNavigateHome('pricing')}
            />

            {/* 4. About FCB / Core Architecture */}
            <AboutSoftware />

            {/* 5. Video Demonstrations / See FCB in Action */}
            <VideoDemos />

            {/* 6. Pricing Section */}
            <Pricing
              onOpenLicense={handleOpenLicense}
              onOpenSupport={() => setSupportModalOpen(true)}
            />

            {/* 7. Operator Reviews & Animated Statistics */}
            <Reviews />

            {/* 8. Final CTA ("Ready to Explore FCB?") */}
            <FinalCta
              onOpenLicense={() => handleNavigateHome('pricing')}
              onOpenSupport={() => setSupportModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* 9. Shared Footer */}
      <Footer
        onOpenLicense={handleOpenLicense}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenReportProblem={() => setReportProblemModalOpen(true)}
        onOpenDocs={() => setDocsModalOpen(true)}
        onOpenRefundPolicy={handleOpenRefundPolicy}
        onOpenDevTeam={handleOpenDevTeam}
        onOpenSecurity={handleOpenSecurity}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        onNavigateHome={handleNavigateHome}
      />

      {/* Interactive Modals */}
      <LicenseModal
        isOpen={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
        initialTierId={selectedTierId}
        onProceedToCheckout={handleOpenLicense}
      />

      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      <ReportProblemModal
        isOpen={reportProblemModalOpen}
        onClose={() => setReportProblemModalOpen(false)}
      />

      <DocumentationModal
        isOpen={docsModalOpen}
        onClose={() => setDocsModalOpen(false)}
        onOpenRefundPolicy={handleOpenRefundPolicy}
        onOpenDevTeam={handleOpenDevTeam}
        onOpenSecurity={handleOpenSecurity}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />
    </div>
  );
}
