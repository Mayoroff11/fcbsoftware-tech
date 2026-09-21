import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,
  Cpu,
  Layers,
  Network,
  Terminal,
  Activity,
  Sparkles,
  Wrench,
  RefreshCw,
  Zap,
  Boxes,
  Users,
  Eye,
  FileCheck,
  MessageSquare,
  ArrowLeft,
  Check,
  Info,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface DevelopmentTeamProps {
  onOpenSupport: () => void;
  onNavigateHome: () => void;
  onOpenDocs?: () => void;
  onOpenSecurity?: () => void;
}

export const DevelopmentTeam: React.FC<DevelopmentTeamProps> = ({
  onOpenSupport,
  onNavigateHome,
  onOpenDocs,
  onOpenSecurity
}) => {
  const [activeNav, setActiveNav] = useState<string>('who-we-are');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const sections = [
        'who-we-are',
        'our-commitment',
        'team-structure',
        'our-experts',
        'tech-practices',
        'security-integrity',
        'update-process',
        'testing-qa',
        'transparency-disclosures',
        'feedback-support',
        'contact-info'
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

  const commitments = [
    {
      id: 'commitment-1',
      title: 'Secure and Reliable',
      icon: ShieldCheck,
      iconColor: 'text-violet-600 bg-violet-50/90 border-violet-200/80',
      badge: 'Core Principle',
      badgeClass: 'bg-violet-100/80 text-violet-900 border-violet-200/70',
      description: 'Prioritizing architectural resilience, strict local cryptographic boundaries, and deterministic execution across all operations.'
    },
    {
      id: 'commitment-2',
      title: 'Stable and Performance-Focused',
      icon: Activity,
      iconColor: 'text-indigo-600 bg-indigo-50/90 border-indigo-200/80',
      badge: 'Operational Metric',
      badgeClass: 'bg-indigo-100/80 text-indigo-900 border-indigo-200/70',
      description: 'Engineering low-latency transaction assembly, efficient memory management, and smooth responsiveness under high throughput.'
    },
    {
      id: 'commitment-3',
      title: 'Continuous Improvement',
      icon: RefreshCw,
      iconColor: 'text-purple-600 bg-purple-50/90 border-purple-200/80',
      badge: 'Ongoing Iteration',
      badgeClass: 'bg-purple-100/80 text-purple-900 border-purple-200/70',
      description: 'Regularly evaluating system capabilities, applying proactive optimizations, and refining protocols in response to real-world demands.'
    }
  ];

  const teamStructure = [
    {
      number: '01',
      title: 'Core Systems Development',
      description: 'Responsible for backend architecture, system logic, scalability, and overall platform performance.',
      icon: Cpu,
      color: 'text-violet-600 bg-violet-50/80 border-violet-200/80'
    },
    {
      number: '02',
      title: 'Platform & Interface Development',
      description: 'Focuses on user-facing features, interface functionality, and usability across supported devices and environments.',
      icon: Sliders,
      color: 'text-indigo-600 bg-indigo-50/80 border-indigo-200/80'
    },
    {
      number: '03',
      title: 'Security & Infrastructure',
      description: 'Manages system security, infrastructure stability, license integrity, monitoring, and abuse prevention.',
      icon: Shield,
      color: 'text-purple-600 bg-purple-50/80 border-purple-200/80'
    },
    {
      number: '04',
      title: 'Quality Assurance & Testing',
      description: 'Conducts internal testing, validation, and performance reviews prior to the release of updates or changes.',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50/80 border-emerald-200/80'
    },
    {
      number: '05',
      title: 'Maintenance & Continuous Improvement',
      description: 'Handles system updates, optimizations, and issue resolution to maintain operational continuity.',
      icon: Wrench,
      color: 'text-blue-600 bg-blue-50/80 border-blue-200/80'
    }
  ];

  const expertCapabilities = [
    {
      title: 'Cryptography',
      description: 'Creating digital locks and signatures that keep crypto assets safe and prove ownership.',
      icon: KeyRound,
      badge: 'Security Foundation'
    },
    {
      title: 'Distributed Systems',
      description: 'Designing networks of computers that share and agree on transaction records reliably.',
      icon: Network,
      badge: 'Consensus & Sync'
    },
    {
      title: 'Protocol Engineering',
      description: 'Defining and enforcing the rules for validating and recording transactions across the blockchain.',
      icon: Terminal,
      badge: 'Rules & Logic'
    },
    {
      title: 'Network Infrastructure',
      description: 'Building and maintaining the "roads" that let transactions move quickly and securely between nodes.',
      icon: Boxes,
      badge: 'Node Mesh'
    },
    {
      title: 'Blockchain Engineering',
      description: 'Developing and maintaining blockchain systems, including wallets, nodes, and protocols, to ensure smooth, secure operations.',
      icon: Layers,
      badge: 'Protocol Stack'
    },
    {
      title: 'Advanced System Analysis',
      description: 'Monitoring transaction pools and blockchain nodes to prevent errors, improve efficiency, and maintain protocol integrity.',
      icon: Eye,
      badge: 'Mempool & Telemetry'
    }
  ];

  const securityPractices = [
    {
      title: 'Enforce license usage policies',
      desc: 'Ensuring software usage strictly aligns with licensed parameters and workstation boundaries.',
      icon: FileCheck
    },
    {
      title: 'Monitor for unauthorized access or misuse',
      desc: 'Active system surveillance to detect abnormal access patterns or integrity violations.',
      icon: ShieldAlert
    },
    {
      title: 'Perform regular system reviews and integrity checks',
      desc: 'Scheduled internal evaluations of cryptographic modules and state execution flows.',
      icon: CheckCircle2
    },
    {
      title: 'Address identified risks and vulnerabilities in a timely manner',
      desc: 'Swift mitigation workflows deployed in controlled internal environments.',
      icon: Zap
    }
  ];

  const updateStages = [
    {
      step: '01',
      title: 'Feature enhancements',
      icon: Sparkles,
      color: 'text-violet-600 bg-violet-100/60 border-violet-200'
    },
    {
      step: '02',
      title: 'Performance improvements',
      icon: Activity,
      color: 'text-indigo-600 bg-indigo-100/60 border-indigo-200'
    },
    {
      step: '03',
      title: 'Bug fixes',
      icon: Wrench,
      color: 'text-blue-600 bg-blue-100/60 border-blue-200'
    },
    {
      step: '04',
      title: 'Security-related updates',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-100/60 border-emerald-200'
    }
  ];

  const tableOfContents = [
    { id: 'who-we-are', label: '1. Who We Are' },
    { id: 'our-commitment', label: '2. Our Commitment' },
    { id: 'team-structure', label: '3. Team Structure & Roles' },
    { id: 'our-experts', label: '4. Team Expertise' },
    { id: 'tech-practices', label: '5. Technology Practices' },
    { id: 'security-integrity', label: '6. Security & Stability' },
    { id: 'update-process', label: '7. Update Process & QA' },
    { id: 'transparency-disclosures', label: '8. Privacy & Disclosures' },
    { id: 'contact-info', label: '9. Support & Contact' }
  ];

  return (
    <div className="pt-28 pb-20 md:pt-32 md:pb-24">
      {/* =========================================================
          1. PAGE HERO
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
            <span className="text-xs text-slate-500 font-medium">Technical Transparency</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto space-y-3.5"
          >
            {/* Eyebrow Floating Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
              <Code2 className="w-3.5 h-3.5 text-violet-600" />
              <span>ENGINEERING &amp; DEVELOPMENT</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.035em] text-slate-900 font-display leading-[1.12]">
              DEVELOPMENT TEAM
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-[17px] text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Learn about the team behind the FCB platform.
            </p>

            {/* Metadata Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11.5px] text-slate-500">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                <span>Structured Engineering Governance</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/70 border border-slate-200/80 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-KYC &amp; Privacy Safeguarded</span>
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

          {/* MAIN DOCUMENTATION CONTENT COLUMN (Comfortable reading width) */}
          <main className="lg:col-span-9 max-w-[840px] mx-auto w-full space-y-12">
            
            {/* =========================================================
                SECTION 2: WHO WE ARE
               ========================================================= */}
            <motion.section
              id="who-we-are"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/85 border border-violet-200/80 backdrop-blur-xl shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  WHO WE ARE
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-[15.5px] text-slate-700 leading-relaxed">
                <p>
                  The FCB Development Team is responsible for designing, building, operating, and maintaining the technology that powers the FCB platform. Our role is to ensure that the platform functions reliably, remains secure, and continues to evolve in line with operational standards and user needs.
                </p>
              </div>

              {/* Transparency Callout */}
              <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-200/80 text-slate-800 text-sm leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <p className="font-medium text-slate-700">
                  This page is provided to offer transparency into how our platform is developed and maintained.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 3: OUR COMMITMENT
               ========================================================= */}
            <motion.section
              id="our-commitment"
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
                    OUR COMMITMENT
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  Three foundational principles guiding our engineering culture and continuous software delivery.
                </p>
              </div>

              {/* 3 Principles Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {commitments.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="p-5 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeClass}`}>
                            {item.badge}
                          </span>
                        </div>

                        <div>
                          <div className="text-[11px] font-bold text-slate-400 font-mono">0{idx + 1}</div>
                          <h3 className="text-base font-bold text-slate-900 font-display mt-0.5">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 4: TEAM STRUCTURE & RESPONSIBILITIES
               ========================================================= */}
            <motion.section
              id="team-structure"
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
                    TEAM STRUCTURE &amp; RESPONSIBILITIES
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  The Development Team operates within a structured framework, with responsibilities distributed across specialized functions to ensure accountability and quality at every stage.
                </p>
              </div>

              {/* 5 Specialized Engineering Functions */}
              <div className="grid grid-cols-1 gap-3.5">
                {teamStructure.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-violet-600 tracking-wider font-mono mr-2">
                              {item.number}
                            </span>
                            <h3 className="inline text-base sm:text-[16.5px] font-bold text-slate-900 font-display">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="pl-0 sm:pl-11 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed">
                        {item.description}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 5: OUR TEAM EXPERTS
               ========================================================= */}
            <motion.section
              id="our-experts"
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
                    OUR TEAM EXPERTS
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  The FCB platform is supported by a team of experts who ensure that complex systems work safely and efficiently. Our team specializes in:
                </p>
              </div>

              {/* 6 Technical Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expertCapabilities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="p-5 rounded-2xl bg-white/90 border border-violet-200/80 hover:border-violet-300 backdrop-blur-xl shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-xl bg-violet-50/90 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-800 border border-violet-200/60">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 font-display">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* SECTION 6: SECURITY / RESEARCH NOTE CALLOUT */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-violet-50/95 via-purple-50/95 to-indigo-50/95 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-2 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />
                <div className="flex items-center gap-2 text-violet-900 font-bold text-xs uppercase tracking-wider font-display">
                  <ShieldCheck className="w-4 h-4 text-violet-600" />
                  <span>SECURITY &amp; CONTROLLED RESEARCH NOTICE</span>
                </div>
                <p className="text-xs sm:text-[13.5px] text-slate-800 leading-relaxed pl-6">
                  <strong>Note:</strong> All testing or research into system vulnerabilities is conducted internally and in controlled environments to strengthen platform security. FCB does not engage in unauthorized manipulation of external networks.
                </p>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 7: TECHNOLOGY & DEVELOPMENT PRACTICES
               ========================================================= */}
            <motion.section
              id="tech-practices"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-6"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <div className="w-2 h-2 rounded-full bg-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  TECHNOLOGY &amp; DEVELOPMENT PRACTICES
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: Text */}
                <div className="md:col-span-7 space-y-4 text-[14.5px] sm:text-[15px] text-slate-700 leading-relaxed">
                  <p>
                    FCB utilizes modern development tools and industry-standard technologies to support reliability, scalability, and long-term performance.
                  </p>
                  <p className="text-slate-600">
                    To protect system integrity and security, specific technical implementations, internal processes, and architectural details are not publicly disclosed.
                  </p>
                </div>

                {/* Right: Restrained Abstract Technical Glass Visual */}
                <div className="md:col-span-5 p-4 rounded-xl bg-violet-50/60 border border-violet-200/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-violet-900 font-mono border-b border-violet-200/60 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-violet-600" />
                      NON-DISCLOSURE BOUNDARY
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-violet-200/70 text-[10px] text-violet-800">ENFORCED</span>
                  </div>

                  <div className="space-y-1.5 text-slate-600 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span>• Architecture Isolation:</span>
                      <span className="text-emerald-700 font-semibold">Protected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Local State Cryptography:</span>
                      <span className="text-emerald-700 font-semibold">Air-Gapped</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Proprietary Logic:</span>
                      <span className="text-emerald-700 font-semibold">Restricted</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 8: SECURITY, STABILITY & INTEGRITY
               ========================================================= */}
            <motion.section
              id="security-integrity"
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
                    SECURITY, STABILITY &amp; INTEGRITY
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  Security is a core priority within our development process. The Development Team works continuously to:
                </p>
              </div>

              {/* 4 Security Practices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {securityPractices.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/90 border border-violet-200/80 shadow-xs flex items-start gap-3 hover:border-violet-300 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-100/70 border border-violet-200/80 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-900 font-display">
                          {item.title}
                        </h4>
                        <p className="text-[12px] text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Periodic Review Statement */}
              <div className="p-3.5 rounded-xl bg-violet-50/50 border border-violet-200/60 text-xs text-slate-600 font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Our practices are reviewed periodically and updated as necessary.</span>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 9: DEVELOPMENT & UPDATE PROCESS
               ========================================================= */}
            <motion.section
              id="update-process"
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
                    DEVELOPMENT &amp; UPDATE PROCESS
                  </h2>
                </div>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  The FCB platform is subject to ongoing development and improvement. Updates may include, but are not limited to:
                </p>
              </div>

              {/* 4 Connected Process Stages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {updateStages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.step}
                      className="p-4 rounded-xl bg-white/90 border border-violet-200/80 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-violet-600">
                          {stage.step}
                        </span>
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${stage.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 font-display">
                        {stage.title}
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Update Planning Note */}
              <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 text-slate-200 text-xs sm:text-[13px] leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Internal Release Note: </span>
                  Updates are planned, tested, and deployed through a structured internal process. Timing and availability of updates may vary and are determined at FCB’s discretion, unless otherwise required by law.
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 10: TESTING & QUALITY ASSURANCE
               ========================================================= */}
            <motion.section
              id="testing-qa"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-7 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display">
                  TESTING &amp; QUALITY ASSURANCE
                </h2>
              </div>

              <p className="text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                All updates undergo internal testing and quality review prior to deployment. While reasonable efforts are made to ensure platform stability and reliability, FCB does not guarantee that updates will be free from errors or service interruptions.
              </p>
            </motion.section>

            {/* =========================================================
                SECTION 11: TRANSPARENCY & DISCLOSURES
               ========================================================= */}
            <motion.section
              id="transparency-disclosures"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                <Lock className="w-5 h-5 text-violet-600" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  TRANSPARENCY &amp; DISCLOSURES
                </h2>
              </div>

              <div className="p-5 rounded-xl bg-violet-50/70 border border-violet-200/80 text-slate-800 text-sm sm:text-[14.5px] leading-relaxed space-y-3">
                <p>
                  To protect the privacy and security of our users and team, we do not collect or require any personal information. The only detail requested is an email address, which does not need to be linked to your real identity and is used solely for reference purposes, such as linking your software license and granting access to the platform.
                </p>
                <div className="pt-2 border-t border-violet-200/60 flex items-center gap-2 font-semibold text-violet-950 text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>We do not request, store, or associate any information related to identity verification or KYC.</span>
                </div>
              </div>
            </motion.section>

            {/* =========================================================
                SECTION 12 & 13: USER FEEDBACK, SUPPORT & CONTACT INFO CTA
               ========================================================= */}
            <motion.section
              id="feedback-support"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-violet-200/90 backdrop-blur-xl shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                  <Users className="w-5 h-5 text-violet-600" />
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                    USER FEEDBACK &amp; SUPPORT
                  </h2>
                </div>

                <p className="text-sm sm:text-[14.5px] text-slate-700 leading-relaxed">
                  We value user feedback and use it to guide future improvements. Users may submit technical issues, feedback, or inquiries through the official support channels provided on the FCB platform. All submissions are reviewed in accordance with applicable support and refund policies.
                </p>
              </div>

              {/* FINAL CONTACT INFORMATION CTA PANEL */}
              <div
                id="contact-info"
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-white/20 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight font-display text-white">
                      CONTACT INFORMATION
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-violet-100 leading-relaxed">
                      For technical assistance, feedback, or policy-related questions, please use the Contact support page available on the FCB platform.
                    </p>
                  </div>

                  <button
                    id="devteam-contact-support-btn"
                    onClick={onOpenSupport}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-violet-950 bg-white hover:bg-violet-50 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
                  >
                    <MessageSquare className="w-4 h-4 text-violet-700" />
                    <span>CONTACT SUPPORT</span>
                  </button>
                </div>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-900 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Homepage</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {onOpenSecurity && (
                    <button
                      onClick={onOpenSecurity}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Security &amp; Protection</span>
                    </button>
                  )}
                  {onOpenDocs && (
                    <button
                      onClick={onOpenDocs}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>System Documentation</span>
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
