import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Mail,
  Activity,
  Server,
  Layers,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  FileText,
  FileCheck,
  Clock,
  Coins,
  Globe,
  Zap,
  Trash2,
  EyeOff,
  Cpu,
  RefreshCw,
  HardDrive
} from 'lucide-react';

interface PrivacyPolicyProps {
  onOpenSupport: () => void;
  onNavigateHome: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenSecurity?: () => void;
  onOpenDevTeam?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  onOpenSupport,
  onNavigateHome,
  onOpenRefundPolicy,
  onOpenSecurity,
  onOpenDevTeam
}) => {
  const [activeNav, setActiveNav] = useState<string>('intro');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const sections = [
        'intro',
        'info-we-collect',
        'required-info',
        'technical-info',
        'payment-info',
        'how-we-use',
        'data-retention',
        'policy-updates',
        'contact-privacy'
      ];
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

  const technicalDataItems = [
    {
      title: 'License activity and access logs',
      desc: 'Operational state checks to verify active workstation entitlements and prevent duplicate session conflicts.',
      icon: Activity
    },
    {
      title: 'Login timestamps',
      desc: 'Chronological connection records for diagnostic troubleshooting and service continuity monitoring.',
      icon: Clock
    },
    {
      title: 'Device or environment identifiers (non-personal)',
      desc: 'Non-identifying system hardware parameters to bind workstation software licenses securely.',
      icon: HardDrive
    }
  ];

  const cryptoPaymentReasons = [
    {
      number: '01',
      title: 'User Privacy & Anonymity',
      description: 'Cryptocurrency payments help protect user privacy. Traditional banking or card payments often require the disclosure of personal identity and financial details, which is not ideal in a crypto-focused environment. Accepting crypto allows customers to maintain a higher level of anonymity.',
      icon: EyeOff,
      badge: 'Privacy Protection'
    },
    {
      number: '02',
      title: 'Security',
      description: 'Crypto transactions reduce exposure to chargebacks, payment fraud, and unauthorized reversals, helping protect both the customer and the platform.',
      icon: ShieldCheck,
      badge: 'Fraud Shield'
    },
    {
      number: '03',
      title: 'Global Accessibility',
      description: 'Cryptocurrency allows users from different regions to access our software without limitations imposed by banks, card networks, or regional payment restrictions.',
      icon: Globe,
      badge: 'Border-Free'
    },
    {
      number: '04',
      title: 'Faster Settlement',
      description: 'Crypto payments are typically processed more quickly than traditional banking systems, enabling faster license activation and service delivery.',
      icon: Zap,
      badge: 'Rapid Delivery'
    },
    {
      number: '05',
      title: 'Platform Alignment',
      description: 'Since our software and services are built around blockchain technology, accepting crypto ensures operational alignment and reduces dependency on systems that are not designed for this space.',
      icon: Layers,
      badge: 'Ecosystem Fit'
    }
  ];

  const transactionRecordUses = [
    'Purchase verification',
    'License activation',
    'Refund or dispute review (where applicable)',
    'Compliance with internal policies and legal obligations'
  ];

  const howWeUseInfo = [
    {
      number: '01',
      title: 'Issue, manage, and protect software licenses',
      desc: 'Enabling deterministic activation, workstation license validation, and update distribution.',
      icon: FileCheck
    },
    {
      number: '02',
      title: 'Prevent abuse, unauthorized access, or license misuse',
      desc: 'Detecting concurrent session anomalies and preserving system integrity against illegitimate access.',
      icon: ShieldAlert
    },
    {
      number: '03',
      title: 'Provide essential support and respond to user requests',
      desc: 'Assisting operators with technical inquiries, license troubleshooting, and configuration help.',
      icon: MessageSquare
    },
    {
      number: '04',
      title: 'Maintain system security, stability, and performance',
      desc: 'Monitoring infrastructure health, optimizing latency, and ensuring continuous platform resilience.',
      icon: Cpu
    }
  ];

  const retentionPurposes = [
    'Maintain active licenses',
    'Enforce platform policies',
    'Meet legal or regulatory requirements'
  ];

  const tableOfContents = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'info-we-collect', label: '2. Information We Collect' },
    { id: 'required-info', label: '3. Required Information' },
    { id: 'technical-info', label: '4. Technical & System Info' },
    { id: 'payment-info', label: '5. Payment Information' },
    { id: 'how-we-use', label: '6. How We Use Information' },
    { id: 'data-retention', label: '7. Data Retention & Lifecycle' },
    { id: 'policy-updates', label: '8. Policy Updates & Acceptance' },
    { id: 'contact-privacy', label: '9. Contact & Support' }
  ];

  return (
    <div className="pt-28 pb-20 md:pt-32 md:pb-24">
      {/* =========================================================
          1. PRIVACY POLICY HERO
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
            <span className="text-xs text-slate-500 font-medium">Customer Privacy Policy</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto space-y-3.5"
          >
            {/* Eyebrow Floating Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
              <Lock className="w-3.5 h-3.5 text-violet-600" />
              <span>FCB CUSTOMER PRIVACY POLICY</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.035em] text-slate-900 font-display leading-[1.15]">
              PRIVACY POLICY
            </h1>

            {/* Main Supporting Message */}
            <p className="text-base sm:text-[17px] text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
              Privacy, security, and discretion are fundamental principles of the FCB platform.
            </p>

            {/* Metadata Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11.5px] text-slate-500">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <EyeOff className="w-3.5 h-3.5 text-violet-600" />
                <span>Zero KYC &amp; Identity Demands</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Strict Data Minimization</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          2. MAIN CONTENT LAYOUT (Desktop Sticky TOC + Content)
         ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* STICKY DESKTOP TABLE OF CONTENTS */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <div className="p-4 rounded-2xl bg-white/80 border border-violet-200/80 backdrop-blur-xl shadow-2xs space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display">
                Policy Sections
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

              <div className="pt-3 border-t border-violet-100 space-y-2">
                <a
                  href="mailto:support@fcbsoftware.tech"
                  className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer no-underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT COLUMN */}
          <main className="lg:col-span-9 max-w-[840px] mx-auto w-full space-y-12">
            
            {/* =========================================================
                SECTION 2: INTRODUCTION
               ========================================================= */}
            <motion.section
              id="intro"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/85 border border-violet-200/80 backdrop-blur-xl shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  INTRODUCTION
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-[15.5px] text-slate-700 leading-relaxed">
                <p>
                  At FCB, privacy, security, and discretion are fundamental principles of our platform. We are committed to minimizing data collection and ensuring that any information we do collect is handled securely and responsibly.
                </p>
                <p className="text-slate-600">
                  This Privacy Policy explains how limited information is collected, used, and protected when you access or use the FCB platform and its software.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 3: INFORMATION WE COLLECT
               ========================================================= */}
            <motion.section
              id="info-we-collect"
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
                    INFORMATION WE COLLECT
                  </h2>
                </div>
              </div>

              {/* Minimal Data Collection Principle Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200/80 text-violet-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-100/70 text-violet-900 border border-violet-200/60 font-display">
                    MINIMAL DATA COLLECTION
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    Privacy by Architecture
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-medium">
                    FCB is designed to operate with minimal personal data. We do not require unnecessary personal or identifying information.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 4: REQUIRED INFORMATION
               ========================================================= */}
            <motion.section
              id="required-info"
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
                    REQUIRED INFORMATION
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  The primary personal information we collect is:
                </p>
              </div>

              {/* Email Address Card */}
              <div className="p-6 rounded-2xl bg-white/90 border border-violet-200/80 shadow-xs flex flex-col sm:flex-row sm:items-start gap-4 hover:border-violet-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-violet-100/70 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-violet-600">01</span>
                    <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-wide">
                      EMAIL ADDRESS
                    </h3>
                  </div>
                  <p className="text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                    Used solely to associate and manage your software license, deliver updates, and provide support when requested.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 5: TECHNICAL & SYSTEM INFORMATION
               ========================================================= */}
            <motion.section
              id="technical-info"
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
                    TECHNICAL &amp; SYSTEM INFORMATION
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  To maintain platform security and functionality, we may collect limited technical data, including:
                </p>
              </div>

              {/* Technical Data Items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {technicalDataItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/90 border border-violet-200/80 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200/70 text-violet-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 font-display">
                          {item.title}
                        </h4>
                        <p className="text-[11.5px] text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Single Clarification Callout (Cleaned up, no duplication) */}
              <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 text-slate-800 text-xs sm:text-[13px] leading-relaxed flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  This information is collected automatically and is not used to personally identify users.
                </span>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 6: PAYMENT INFORMATION & ACCEPTED METHODS (Consolidated Once)
               ========================================================= */}
            <motion.section
              id="payment-info"
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
                    PAYMENT INFORMATION &amp; ACCEPTED METHODS
                  </h2>
                </div>
              </div>

              {/* Opening Declarations */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-4 text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                <p className="font-medium text-slate-900">
                  FCB accepts cryptocurrency payments only. This decision is intentional and aligned with the nature of our platform and the services we provide.
                </p>
                <p className="text-slate-600">
                  Because FCB is a crypto-focused platform and our software operates within blockchain-based systems, accepting cryptocurrency allows us to maintain consistency, efficiency, and security across our operations.
                </p>
                <div className="pt-2 border-t border-violet-100 text-xs sm:text-sm font-semibold text-violet-900">
                  We choose to accept crypto payments for the following reasons:
                </div>
              </div>

              {/* 5 Reasons Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cryptoPaymentReasons.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.number}
                      className={`p-5 rounded-2xl bg-white/90 border border-violet-200/80 shadow-xs flex flex-col justify-between space-y-3 ${
                        idx === 4 ? 'md:col-span-2' : ''
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-xl bg-violet-50/90 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-800 border border-violet-200/60">
                            {item.badge}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-violet-600 font-mono">{item.number}</span>
                          <h3 className="text-base font-bold text-slate-900 font-display mt-0.5">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Processing Safeguards & Record Uses */}
              <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200/80 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">
                    All payment processing is handled by third-party cryptocurrency payment providers.
                  </p>
                  <p>
                    FCB does not store payment card details, banking information, or sensitive financial data.
                  </p>
                </div>

                <div className="pt-3 border-t border-violet-200/60 space-y-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                    Transaction records are used only for:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {transactionRecordUses.map((use, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 7: HOW WE USE INFORMATION
               ========================================================= */}
            <motion.section
              id="how-we-use"
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
                    HOW WE USE INFORMATION
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  Collected information is used strictly to:
                </p>
              </div>

              {/* 4 Usage Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {howWeUseInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.number}
                      className="p-5 rounded-2xl bg-white/90 border border-violet-200/80 shadow-xs flex flex-col justify-between space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-violet-600">{item.number}</span>
                        <div className="w-7 h-7 rounded-lg bg-violet-100/60 border border-violet-200 text-violet-700 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h3 className="text-xs sm:text-[13.5px] font-bold text-slate-900 font-display leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Emphasized Anti-Resale / Anti-Profiling Statement */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm flex items-center gap-3.5">
                <ShieldCheck className="w-6 h-6 text-emerald-300 shrink-0" />
                <p className="font-bold text-sm sm:text-base font-display">
                  We do not use personal data for advertising, profiling, or resale.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 8: DATA RETENTION
               ========================================================= */}
            <motion.section
              id="data-retention"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  DATA RETENTION
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-sm sm:text-[14.5px] text-slate-700 font-medium leading-relaxed">
                  We retain only the minimum information necessary to:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {retentionPurposes.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-200/70 text-xs text-slate-800 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>When data is no longer required, it is securely deleted or anonymized.</span>
              </div>

              {/* Decorative Subtle Data Lifecycle Flow Visual */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display mb-2 text-center">
                  Data Handling Lifecycle
                </div>
                <div className="p-3.5 rounded-xl bg-violet-50/40 border border-violet-200/60 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-semibold text-slate-600">
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200">LIMITED DATA</span>
                  <span className="text-violet-400">→</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200">LICENSE / SUPPORT / SECURITY</span>
                  <span className="text-violet-400">→</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200">MINIMAL RETENTION</span>
                  <span className="text-violet-400">→</span>
                  <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-violet-900">DELETE OR ANONYMIZE</span>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 9: POLICY UPDATES & ACCEPTANCE
               ========================================================= */}
            <motion.section
              id="policy-updates"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  POLICY UPDATES &amp; ACCEPTANCE
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                <p>
                  This Privacy Policy may be updated periodically. Changes will be published on this page, and continued use of the platform constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Acknowledgement Callout */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-[13.5px] leading-relaxed flex items-start gap-3 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  By using the FCB platform or purchasing software from FCB, you acknowledge that you have read and agree to this Privacy Policy.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 10: CONTACT FOR PRIVACY QUESTIONS
               ========================================================= */}
            <motion.section
              id="contact-privacy"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-white/20 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-violet-200" />
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight font-display text-white">
                        CONTACT FOR PRIVACY QUESTIONS
                      </h3>
                    </div>
                    <p className="text-xs sm:text-[13.5px] text-violet-100 leading-relaxed">
                      For privacy-related questions or requests, please contact us through the support button on the FCB platform.
                    </p>
                  </div>

                  <a
                    id="privacy-contact-support-btn"
                    href="mailto:support@fcbsoftware.tech"
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-violet-950 bg-white hover:bg-violet-50 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto no-underline"
                  >
                    <MessageSquare className="w-4 h-4 text-violet-700" />
                    <span>CONTACT SUPPORT</span>
                  </a>
                </div>
              </div>

              {/* Bottom Navigation Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-900 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Homepage</span>
                </button>

                <div className="flex items-center gap-3">
                  {onOpenSecurity && (
                    <button
                      onClick={onOpenSecurity}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Security Specification</span>
                    </button>
                  )}
                  {onOpenRefundPolicy && (
                    <button
                      onClick={onOpenRefundPolicy}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <span>Refund Policy</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
};
