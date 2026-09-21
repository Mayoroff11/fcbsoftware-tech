import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,
  FileCheck,
  Activity,
  Server,
  Layers,
  Network,
  Terminal,
  Cpu,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  FileText,
  Boxes,
  Zap,
  RefreshCw,
  Clock,
  Radio
} from 'lucide-react';

interface SecurityProps {
  onOpenSupport: () => void;
  onNavigateHome: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenDevTeam?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Security: React.FC<SecurityProps> = ({
  onOpenSupport,
  onNavigateHome,
  onOpenRefundPolicy,
  onOpenDevTeam,
  onOpenPrivacyPolicy
}) => {
  const [activeNav, setActiveNav] = useState<string>('intro');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const sections = [
        'intro',
        'core-principles',
        'license-coin-protection',
        'blockchain-protocol',
        'security-operations',
        'user-responsibilities',
        'incident-response',
        'contact-security'
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

  const corePrinciples = [
    {
      id: 'principle-1',
      number: '01',
      title: 'Confidentiality',
      description: 'Personal and license data are stored securely and only accessible to authorized systems.',
      icon: Lock,
      color: 'text-violet-600 bg-violet-50/90 border-violet-200/80',
      badge: 'Data Privacy'
    },
    {
      id: 'principle-2',
      number: '02',
      title: 'Integrity',
      description: 'Transactions and coins are tracked and validated to prevent tampering or unauthorized use.',
      icon: ShieldCheck,
      color: 'text-indigo-600 bg-indigo-50/90 border-indigo-200/80',
      badge: 'Validation & Truth'
    },
    {
      id: 'principle-3',
      number: '03',
      title: 'Availability',
      description: 'The platform is designed to remain operational and resilient against disruptions.',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50/90 border-purple-200/80',
      badge: 'Resilience'
    },
    {
      id: 'principle-4',
      number: '04',
      title: 'Compliance',
      description: 'All systems follow industry best practices, blockchain standards, and internal policies.',
      icon: FileCheck,
      color: 'text-emerald-600 bg-emerald-50/90 border-emerald-200/80',
      badge: 'Standards'
    }
  ];

  const licenseCoinProtection = [
    {
      number: '01',
      title: 'License Access Control',
      description: 'Business and personal licenses are monitored to prevent misuse, including excessive user logins or multiple unauthorized accesses.',
      icon: KeyRound,
      tag: 'Access Governance'
    },
    {
      number: '02',
      title: 'Coin Monitoring',
      description: 'Coin is tracked to ensure it follows platform rules and prevents exploitation.',
      icon: Eye,
      tag: 'State Tracking'
    },
    {
      number: '03',
      title: 'Transaction Validation',
      description: 'All coins are verified against internal rules before being credited or transferred.',
      icon: CheckCircle2,
      tag: 'Rule Verification'
    },
    {
      number: '04',
      title: 'Abuse Detection',
      description: 'Automated systems flag suspicious activity, such as repeated purchases or unusual wallet distributions.',
      icon: ShieldAlert,
      tag: 'Automated Shield'
    }
  ];

  const blockchainSecurity = [
    {
      number: '01',
      title: 'Cryptography',
      description: 'Digital signatures and encryption protect transactions and prove ownership of coins.',
      icon: KeyRound,
      highlight: 'Cryptographic Proofs'
    },
    {
      number: '02',
      title: 'Distributed Ledger Integrity',
      description: 'Our backend ensures all transactions are recorded securely and accurately across the ledger.',
      icon: Layers,
      highlight: 'Ledger Precision'
    },
    {
      number: '03',
      title: 'Protocol Enforcement',
      description: 'Strict validation rules maintain the integrity of every transaction within the platform.',
      icon: Terminal,
      highlight: 'Deterministic Rules'
    },
    {
      number: '04',
      title: 'Network Infrastructure',
      description: 'Fast, secure communication channels between nodes ensure reliable processing of blockchain operations.',
      icon: Network,
      highlight: 'Node Communications'
    }
  ];

  const securityOperations = [
    {
      step: '01',
      phase: 'ASSESS',
      title: 'Vulnerability Research',
      desc: 'All vulnerability research is conducted internally in controlled environments.',
      icon: Eye,
      color: 'text-violet-600 bg-violet-50 border-violet-200'
    },
    {
      step: '02',
      phase: 'EVALUATE',
      title: 'Audits & Assessments',
      desc: 'Security audits and risk assessments are performed regularly.',
      icon: FileCheck,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
    },
    {
      step: '03',
      phase: 'PATCH',
      title: 'Tested Updates',
      desc: 'Updates and patches are tested and deployed promptly to address potential threats.',
      icon: RefreshCw,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      step: '04',
      phase: 'CONTROL',
      title: 'Access Limitation',
      desc: 'Access to sensitive systems is strictly limited based on team responsibilities.',
      icon: Lock,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    }
  ];

  const userResponsibilities = [
    {
      number: '01',
      title: 'Keep your license keys and passwords secure',
      desc: 'Store your license credentials in secure, encrypted password managers and never expose keys in public repositories or chats.',
      icon: KeyRound
    },
    {
      number: '02',
      title: 'Do not share access to your account or license',
      desc: 'Licenses are provisioned strictly for designated workstations. Sharing credentials triggers automatic access anomalies.',
      icon: ShieldAlert
    },
    {
      number: '03',
      title: 'Report suspicious activity or potential vulnerabilities immediately via Contact Us',
      desc: 'Prompt reporting helps our engineering team maintain system integrity and isolate irregular behavior quickly.',
      icon: MessageSquare
    }
  ];

  const tableOfContents = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'core-principles', label: '2. Core Security Principles' },
    { id: 'license-coin-protection', label: '3. License & Coin Protection' },
    { id: 'blockchain-protocol', label: '4. Blockchain & Protocol Security' },
    { id: 'security-operations', label: '5. Security Operations' },
    { id: 'user-responsibilities', label: '6. User Responsibilities' },
    { id: 'incident-response', label: '7. Incident Response & Policies' },
    { id: 'contact-security', label: '8. Contact for Security Concerns' }
  ];

  return (
    <div className="pt-28 pb-20 md:pt-32 md:pb-24">
      {/* =========================================================
          1. SECURITY HERO
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
            <span className="text-xs text-slate-500 font-medium">Security &amp; Protection</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto space-y-3.5"
          >
            {/* Eyebrow Floating Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
              <Shield className="w-3.5 h-3.5 text-violet-600" />
              <span>SECURITY SPECIFICATION</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.035em] text-slate-900 font-display leading-[1.12]">
              FCB SECURITY
            </h1>

            {/* Supporting Heading */}
            <p className="text-sm sm:text-base font-bold tracking-wide text-violet-700 font-display uppercase">
              BLOCKCHAIN AND LICENSE PROTECTION
            </p>

            {/* Metadata Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11.5px] text-slate-500">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                <span>Multi-Layered Safeguards</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic Validation</span>
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

              <div className="pt-3 border-t border-violet-100 space-y-2">
                <button
                  onClick={onOpenSupport}
                  className="w-full py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Security</span>
                </button>
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
                  At FCB, the security of your software, licenses, and assets is our top priority. Our platform is designed to protect every transaction, coin, and license while maintaining transparency, reliability, and integrity across all systems.
                </p>
              </div>

              {/* Visually separated callout */}
              <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 text-slate-800 text-sm leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <p className="font-medium text-slate-700">
                  This page outlines how we safeguard your digital assets and ensure a secure experience.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 3 & 4: CORE SECURITY PRINCIPLES & VISUAL
               ========================================================= */}
            <motion.section
              id="core-principles"
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
                    CORE SECURITY PRINCIPLES
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  Our approach to crypto and software security is based on four pillars:
                </p>
              </div>

              {/* 4 Pillars Interconnected Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {corePrinciples.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-800 border border-violet-200/60">
                            {item.badge}
                          </span>
                        </div>

                        <div>
                          <div className="text-[11px] font-bold text-violet-600 font-mono">{item.number}</div>
                          <h3 className="text-base font-bold text-slate-900 font-display mt-0.5">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interconnected Principles Visual Strip */}
              <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-200/70 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700">
                  <span className="px-3 py-1 rounded-lg bg-white border border-violet-200/80 shadow-2xs">Confidentiality</span>
                  <span className="text-violet-400">↔</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-violet-200/80 shadow-2xs">Integrity</span>
                  <span className="text-violet-400">↔</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-violet-200/80 shadow-2xs">Availability</span>
                  <span className="text-violet-400">↔</span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-violet-200/80 shadow-2xs">Compliance</span>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 5: LICENSE & COIN PROTECTION
               ========================================================= */}
            <motion.section
              id="license-coin-protection"
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
                    LICENSE &amp; COIN PROTECTION
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  Our system includes multiple layers of safeguards to ensure fair and secure use:
                </p>
              </div>

              {/* 4 Safeguard Modules in a 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {licenseCoinProtection.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-xl bg-violet-50/90 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-800 border border-violet-200/60">
                            {item.tag}
                          </span>
                        </div>

                        <div>
                          <div className="text-[11px] font-bold text-violet-600 font-mono">{item.number}</div>
                          <h3 className="text-base font-bold text-slate-900 font-display mt-0.5">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 6: BLOCKCHAIN & PROTOCOL SECURITY
               ========================================================= */}
            <motion.section
              id="blockchain-protocol"
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
                    BLOCKCHAIN &amp; PROTOCOL SECURITY
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  Advanced cryptographic mechanisms and distributed system checks engineered into every layer of our platform:
                </p>
              </div>

              {/* 4 Technical Protocol Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blockchainSecurity.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-xl bg-violet-100/70 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {item.highlight}
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
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 7: SECURITY OPERATIONS
               ========================================================= */}
            <motion.section
              id="security-operations"
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
                    SECURITY OPERATIONS
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  Our ongoing internal security operational practices and safeguard lifecycle:
                </p>
              </div>

              {/* 4 Lifecycle Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {securityOperations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="p-5 rounded-2xl bg-white/90 border border-violet-200/80 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-violet-600">{item.step}</span>
                          <span className="text-[10.5px] font-bold text-slate-400 font-mono uppercase tracking-wider">{item.phase}</span>
                        </div>
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${item.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-900 font-display">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 8: USER RESPONSIBILITIES
               ========================================================= */}
            <motion.section
              id="user-responsibilities"
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
                    USER RESPONSIBILITIES
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  While we provide robust protection, users should also follow best practices:
                </p>
              </div>

              {/* 3 User Actions Security Checklist */}
              <div className="space-y-3.5">
                {userResponsibilities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.number}
                      className="p-5 rounded-2xl bg-white/90 border border-violet-200/80 shadow-xs flex items-start gap-4 hover:border-violet-300 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-violet-50/90 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-violet-600">{item.number}</span>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 9: INCIDENT RESPONSE & POLICY ALIGNMENT
               ========================================================= */}
            <motion.section
              id="incident-response"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  INCIDENT RESPONSE &amp; POLICY ALIGNMENT
                </h2>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 font-display">
                  If a potential security issue arises:
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-violet-600 bg-white px-2 py-0.5 rounded border border-violet-200 shrink-0">01</span>
                    <p className="text-xs sm:text-[13.5px] text-slate-700 font-medium leading-relaxed">
                      Our security team investigates and contains the issue.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-violet-600 bg-white px-2 py-0.5 rounded border border-violet-200 shrink-0">02</span>
                    <p className="text-xs sm:text-[13.5px] text-slate-700 font-medium leading-relaxed">
                      Corrective measures are implemented immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Alignment Subsection */}
              <div className="pt-4 border-t border-violet-100 space-y-3">
                <div className="text-xs sm:text-[13.5px] font-bold text-slate-700 uppercase tracking-wider font-display">
                  Security practices are aligned with our:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-violet-200/80 shadow-2xs flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                    <FileText className="w-4 h-4 text-violet-600 shrink-0" />
                    <span>Terms of Service</span>
                  </div>

                  {onOpenRefundPolicy ? (
                    <button
                      onClick={onOpenRefundPolicy}
                      className="p-3.5 rounded-xl bg-white hover:bg-violet-50/80 border border-violet-200/80 hover:border-violet-300 shadow-2xs flex items-center justify-between gap-2.5 text-xs text-violet-700 font-semibold cursor-pointer transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-4 h-4 text-violet-600 shrink-0" />
                        <span>Return &amp; Refund Policy</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-white border border-violet-200/80 shadow-2xs flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                      <FileCheck className="w-4 h-4 text-violet-600 shrink-0" />
                      <span>Return &amp; Refund Policy</span>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-white border border-violet-200/80 shadow-2xs flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                    <Shield className="w-4 h-4 text-violet-600 shrink-0" />
                    <span>Internal Operational Policies</span>
                  </div>
                </div>
              </div>

              {/* Concluding Acknowledgement Callout */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-[13.5px] leading-relaxed flex items-start gap-3 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  By using FCB software and licenses, you acknowledge that you understand and accept these security practices.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 10: CONTACT FOR SECURITY CONCERNS
               ========================================================= */}
            <motion.section
              id="contact-security"
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
                        CONTACT FOR SECURITY CONCERNS
                      </h3>
                    </div>
                    <p className="text-xs sm:text-[13.5px] text-violet-100 leading-relaxed">
                      For reporting security issues, questions, or vulnerabilities, please use the Contact Us page. Our team reviews all submissions and responds promptly based on the severity and location of the concern.
                    </p>
                  </div>

                  <button
                    id="security-contact-us-btn"
                    onClick={onOpenSupport}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-violet-950 bg-white hover:bg-violet-50 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
                  >
                    <MessageSquare className="w-4 h-4 text-violet-700" />
                    <span>CONTACT US</span>
                  </button>
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
                  {onOpenPrivacyPolicy && (
                    <button
                      onClick={onOpenPrivacyPolicy}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-all cursor-pointer"
                    >
                      <span>Privacy Policy</span>
                    </button>
                  )}
                  {onOpenDevTeam && (
                    <button
                      onClick={onOpenDevTeam}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <span>Development Team</span>
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
