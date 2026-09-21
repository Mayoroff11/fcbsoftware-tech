import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ShieldCheck, Eye, Layers, Lock, CheckCircle2, Shield } from 'lucide-react';

export const AboutSoftware: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: "easeOut"
      }
    }
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : custom * 0.08,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="about" className="py-16 md:py-22 border-b border-violet-200/50 relative">
      <div id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered + Scroll Reveal) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
            <span>Core Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.03em] text-slate-900 font-display">
            About FCB
          </h2>
          <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Professional Bitcoin transaction software engineered for transparency, security, and independent verification.
          </p>
        </motion.div>

        {/* Editorial Main Overview Card (Primary Glassmorphism) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 p-7 sm:p-9 rounded-2xl glass-primary space-y-6"
        >
          <div className="max-w-3xl space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
              Engineered for Transaction Clarity &amp; Control
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              FCB is a professional Bitcoin transaction software platform designed for users who need greater visibility, control, and flexibility when working with Bitcoin transactions.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              The platform combines transaction tracking, wallet compatibility, privacy-focused connectivity options, and support tools in one streamlined interface.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-violet-50/90 border border-violet-200/80 text-xs font-medium text-violet-800 shadow-xs">
            <Shield className="w-4 h-4 text-violet-600" />
            <span>Zero custodial intermediaries. Pure protocol execution.</span>
          </div>
        </motion.div>

        {/* The Four Architecture Cards (Primary Glass + Staggered Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 01 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="p-6 sm:p-7 rounded-2xl glass-primary space-y-4 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-violet-100/90 text-violet-700 border border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-xs">
                01
              </span>
              <Eye className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                On-Chain Transaction Visibility
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Monitor raw transaction outputs, broadcast status, and confirmation depths with comprehensive block inspection.
              </p>
            </div>
          </motion.div>

          {/* Card 02 */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="p-6 sm:p-7 rounded-2xl glass-primary space-y-4 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-violet-100/90 text-violet-700 border border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-xs">
                02
              </span>
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                Broad Wallet Compatibility
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Integrate seamlessly with standard Bitcoin address architectures, hardware signing schemes, and multi-wallet operations.
              </p>
            </div>
          </motion.div>

          {/* Card 03 */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="p-6 sm:p-7 rounded-2xl glass-primary space-y-4 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-violet-100/90 text-violet-700 border border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-xs">
                03
              </span>
              <Lock className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                Privacy &amp; Network Hardening
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Built-in routing options with VPN, Tor, and proxy support to preserve infrastructure confidentiality during transaction broadcast.
              </p>
            </div>
          </motion.div>

          {/* Card 04 */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="p-6 sm:p-7 rounded-2xl glass-primary space-y-4 group cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-violet-100/90 text-violet-700 border border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-xs">
                04
              </span>
              <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                Independent Public Verification
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every broadcast or inspected transaction is mapped to standard TXIDs verifiable on any independent public blockchain explorer.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Independent Ledger Verification Callout (Secondary Glass) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 p-6 sm:p-7 rounded-2xl glass-secondary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-1.5 max-w-2xl">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
              <span>Independent Ledger Verification</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Users can cross-verify software operations directly against native public Bitcoin nodes and independent explorers, ensuring complete operational transparency.
            </p>
          </div>

          <div className="shrink-0 px-4 py-2 rounded-xl bg-violet-100/90 border border-violet-200/80 text-[11px] font-mono text-violet-800 font-semibold shadow-xs">
            Independent Merkle Root Validation
          </div>
        </motion.div>
      </div>
    </section>
  );
};
