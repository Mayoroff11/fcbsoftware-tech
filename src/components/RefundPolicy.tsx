import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Clock, 
  Layers, 
  Users, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  MessageSquare, 
  Info, 
  ArrowLeft, 
  Check, 
  ShieldCheck,
  Calendar,
  Lock,
  Mail,
  KeyRound,
  FileCheck2
} from 'lucide-react';

interface RefundPolicyProps {
  onOpenSupport: () => void;
  onNavigateHome: () => void;
  onOpenLicense?: (tierId?: string) => void;
}

export const RefundPolicy: React.FC<RefundPolicyProps> = ({
  onOpenSupport,
  onNavigateHome,
}) => {
  const [activeNav, setActiveNav] = useState<string>('introduction');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const sections = ['introduction', 'exclusions', 'how-to-request', 'note', 'agreement'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const exclusions = [
    {
      id: 1,
      title: 'Late Return Requests',
      icon: Clock,
      iconColor: 'text-amber-600 bg-amber-50/80 border-amber-200/80',
      badge: 'Time Limit',
      badgeClass: 'bg-amber-100/80 text-amber-900 border-amber-200/70',
      content: (
        <span>
          Requests for returns or refunds will not be accepted if they are submitted more than{' '}
          <strong className="text-slate-900 font-semibold underline decoration-violet-300 decoration-2 underline-offset-2">
            7 days
          </strong>{' '}
          after the date of purchase.
        </span>
      )
    },
    {
      id: 2,
      title: 'Excessive Software Usage',
      icon: Layers,
      iconColor: 'text-violet-600 bg-violet-50/80 border-violet-200/80',
      badge: 'Execution Limit',
      badgeClass: 'bg-violet-100/80 text-violet-900 border-violet-200/70',
      content: (
        <span>
          If the software or license has been used more than{' '}
          <strong className="text-slate-900 font-semibold underline decoration-violet-300 decoration-2 underline-offset-2">
            three (3) times
          </strong>
          , the purchase becomes non-refundable.
        </span>
      )
    },
    {
      id: 3,
      title: 'Business License User Access Limits',
      icon: Users,
      iconColor: 'text-indigo-600 bg-indigo-50/80 border-indigo-200/80',
      badge: 'Seats & Workstations',
      badgeClass: 'bg-indigo-100/80 text-indigo-900 border-indigo-200/70',
      content: (
        <span>
          For Business License users, if the license has been logged into by{' '}
          <strong className="text-slate-900 font-semibold">
            more than two (2) users
          </strong>
          , or if{' '}
          <strong className="text-slate-900 font-semibold underline decoration-violet-300 decoration-2 underline-offset-2">
            three (3) or more individuals
          </strong>{' '}
          have accessed or used the license, the purchase will no longer be eligible for a return or refund.
        </span>
      )
    },
    {
      id: 4,
      title: 'Abuse of the Refund System',
      icon: ShieldAlert,
      iconColor: 'text-rose-600 bg-rose-50/80 border-rose-200/80',
      badge: 'Integrity Check',
      badgeClass: 'bg-rose-100/80 text-rose-900 border-rose-200/70',
      content: (
        <span>
          Refunds will not be issued where we identify patterns of abuse, including repeated purchases and refund requests made primarily to gain temporary access to the software without intent to retain a valid license.
        </span>
      )
    },
    {
      id: 5,
      title: 'Other Reasons Not Listed',
      icon: HelpCircle,
      iconColor: 'text-slate-600 bg-slate-100/80 border-slate-200/80',
      badge: 'Case Review',
      badgeClass: 'bg-slate-100/80 text-slate-800 border-slate-200/70',
      content: (
        <span>
          If your reason for requesting a return or refund is not listed above, please contact our support team with a detailed explanation. We will review your request fairly and carefully and notify you of our decision.
        </span>
      )
    }
  ];

  const checklistItems = [
    {
      label: 'A detailed explanation of your reason for requesting a refund',
      icon: MessageSquare
    },
    {
      label: 'The email address associated with your license',
      icon: Mail
    },
    {
      label: 'The license key or license details',
      icon: KeyRound
    },
    {
      label: 'Your order number provided at the time of purchase',
      icon: FileCheck2
    }
  ];

  const tableOfContents = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'exclusions', label: '2. Non-Refundable Exclusions' },
    { id: 'how-to-request', label: '3. How to Request a Refund' },
    { id: 'note', label: '4. Operational Note' },
    { id: 'agreement', label: '5. Policy Agreement' }
  ];

  return (
    <div className="pt-28 pb-20 md:pt-32 md:pb-24">
      {/* =========================================================
          1. POLICY HERO
         ========================================================= */}
      <section className="relative pb-10 sm:pb-12 border-b border-violet-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6 flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors py-1 px-2.5 rounded-lg bg-violet-100/60 hover:bg-violet-100 border border-violet-200/80 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300 text-xs">/</span>
            <span className="text-xs text-slate-500 font-medium">Official Documentation</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto space-y-3.5"
          >
            {/* Eyebrow Floating Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
              <FileText className="w-3.5 h-3.5 text-violet-600" />
              <span>Legal &amp; Customer Protection</span>
            </div>

            {/* Main Policy Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.035em] text-slate-900 font-display leading-[1.12]">
              RETURNS AND REFUNDS POLICY
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-[17px] text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Clear guidelines for returns, refunds, eligibility, and support.
            </p>

            {/* Policy Metadata Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11.5px] text-slate-500">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-violet-500" />
                <span>Standard Policy Version 2.4</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Applies to all FCB Software Licenses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          2. POLICY CONTENT CONTAINER (with sticky desktop TOC)
         ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* STICKY DESKTOP TABLE OF CONTENTS */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <div className="p-4 rounded-2xl bg-white/80 border border-violet-200/80 backdrop-blur-xl shadow-2xs space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display">
                On this page
              </div>
              <nav className="space-y-1 text-xs">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToId(item.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg transition-all font-medium flex items-center justify-between cursor-pointer ${
                      activeNav === item.id
                        ? 'bg-violet-100/90 text-violet-900 font-bold border border-violet-200/80 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeNav === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-violet-100">
                <button
                  onClick={onOpenSupport}
                  className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT COLUMN (760-900px comfortable width) */}
          <main className="lg:col-span-9 max-w-[840px] mx-auto w-full space-y-12">
            
            {/* =========================================================
                3. INTRODUCTION
               ========================================================= */}
            <motion.section
              id="introduction"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/85 border border-violet-200/80 backdrop-blur-xl shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  Introduction
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-[15.5px] text-slate-700 leading-relaxed">
                <p>
                  At FCB, we are committed to ensuring a positive experience whenever you purchase our software. While we strive to deliver products that meet your expectations, we understand that there may be circumstances where you wish to request a return or refund.
                </p>
                <p>
                  This Return and Refund Policy outlines the terms and conditions under which returns and refunds may be accepted for software and licenses purchased through the FCB platform. It also explains the circumstances in which returns or refunds will not be granted.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                4. NON-REFUNDABLE & RETURN EXCLUSIONS
               ========================================================= */}
            <motion.section
              id="exclusions"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-600" />
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                    Non-Refundable &amp; Return Exclusions
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  To ensure fairness and prevent misuse of our software and licensing system, returns or refunds will not be granted under the following circumstances:
                </p>
              </div>

              {/* Exclusion Cards */}
              <div className="grid grid-cols-1 gap-4">
                {exclusions.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: item.id * 0.05 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.iconColor}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h3 className="text-base sm:text-[17px] font-bold text-slate-900 font-display">
                            {item.id}. {item.title}
                          </h3>
                        </div>
                        <span className={`self-start sm:self-auto text-[10.5px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="pl-0 sm:pl-11 text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                        {item.content}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                6. HOW TO REQUEST A REFUND & SUPPORT CTA
               ========================================================= */}
            <motion.section
              id="how-to-request"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-violet-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-600" />
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                      How to Request a Refund
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Step-by-step submission requirements for license review.
                  </p>
                </div>

                {/* 7. CONTACT SUPPORT PRIMARY CTA */}
                <button
                  id="refund-contact-support-btn"
                  onClick={onOpenSupport}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/35 transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20 self-start sm:self-auto shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CONTACT SUPPORT</span>
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  To request a refund, please click the <strong className="text-violet-900 font-semibold">"CONTACT SUPPORT"</strong> button above and submit a request that includes the following information:
                </p>

                {/* Checklist Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {checklistItems.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 flex items-start gap-3 hover:bg-violet-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-violet-200/80 text-violet-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 8. RESPONSE-TIME INFORMATION CALLOUT */}
              <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 text-slate-200 text-xs sm:text-[13px] leading-relaxed flex items-start gap-3">
                <Clock className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Standard Support Window: </span>
                  Our support team typically responds within{' '}
                  <strong className="text-amber-400 font-bold">60 minutes</strong>, although response times may vary slightly depending on your country or region.
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                9. NOTE CALLOUT
               ========================================================= */}
            <motion.section
              id="note"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-violet-50/95 via-purple-50/95 to-indigo-50/95 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-2.5 relative overflow-hidden"
            >
              {/* Subtle top edge accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />

              <div className="flex items-center gap-2 text-violet-900 font-bold text-xs uppercase tracking-wider font-display">
                <Info className="w-4 h-4 text-violet-600" />
                <span>NOTE</span>
              </div>

              <p className="text-sm sm:text-[14.5px] text-slate-800 leading-relaxed pl-6">
                Refunds are considered where the software has been used successfully but ultimately does not meet users expectations, operational requirements, or where there is another valid reason for discontinuation aside the ones listed above.
              </p>
            </motion.section>

            {/* =========================================================
                10. POLICY AGREEMENT
               ========================================================= */}
            <motion.section
              id="agreement"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  Policy Agreement
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-200/70 text-slate-800 text-sm sm:text-[14.5px] leading-relaxed flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <p>
                  By completing a purchase on the FCB platform, you acknowledge that you have read, understood, and agree to be bound by this Return and Refund Policy.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-900 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Homepage</span>
                </button>

                <button
                  onClick={onOpenSupport}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Have questions? Contact Support</span>
                </button>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
};
