import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRight, ChevronRight, Network, ShieldCheck, Search, Lock, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenLicense: () => void;
  onScrollToFeatures?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLicense, onScrollToFeatures }) => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToFeatures = () => {
    if (onScrollToFeatures) {
      onScrollToFeatures();
      return;
    }
    const element = document.getElementById('about');
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
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
        delay: shouldReduceMotion ? 0 : 0.4 + custom * 0.08,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-violet-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Centered Hero Block */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          {/* Eyebrow Floating Glass Pill */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-violet-200/80 text-violet-900 text-[11px] font-semibold tracking-wider uppercase shadow-2xs backdrop-blur-xl font-display">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Independent Bitcoin Protocol Infrastructure</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.12] sm:leading-[1.08] font-display max-w-3xl mx-auto break-words"
          >
            Take Control of Your<br />
            <span className="bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent drop-shadow-xs">
              Bitcoin Transactions
            </span>
          </motion.h1>

          {/* Supporting Headline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl font-medium text-slate-700 leading-snug max-w-2xl mx-auto font-display"
          >
            Track, manage, and verify Bitcoin transactions with powerful tools designed for individuals and businesses.
          </motion.p>

          {/* Supporting Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            FCB is professional software engineered to help operators, businesses, and individuals independently manage and monitor Bitcoin transactions. All transaction data connects directly to public blockchain verification points, ensuring verifiable on-chain transparency without reliance on third-party assertions.
          </motion.p>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <button
              id="hero-primary-cta"
              onClick={onOpenLicense}
              className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-white/20 active:scale-[0.99]"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={scrollToFeatures}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 text-sm font-medium text-slate-800 bg-white/80 hover:bg-white border border-white/90 hover:border-violet-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:shadow-violet-950/5 backdrop-blur-xl hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <span>Explore Features</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </motion.div>

          {/* Small Trust Statement */}
          <motion.div variants={itemVariants} className="pt-2">
            <p className="text-xs text-slate-500 font-normal">
              Enterprise-grade transaction software. Not an investment product or trading scheme.
            </p>
          </motion.div>
        </motion.div>

        {/* SECTION 3 — HERO FEATURE STRIP (Four Primary Glass capability cards with Stagger) */}
        <div className="mt-16 pt-12 border-t border-violet-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Direct Node Broadcast */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-6 rounded-2xl glass-primary space-y-3 flex flex-col justify-between group cursor-default"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100/90 border border-violet-200/80 flex items-center justify-center text-violet-700 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                Direct Node Broadcast
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Broadcasts raw transactions directly across peer Bitcoin nodes without custodial intermediary servers.
              </p>
            </div>
          </motion.div>

          {/* Card 2: BIP-174 / PSBT Signing */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-6 rounded-2xl glass-primary space-y-3 flex flex-col justify-between group cursor-default"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100/90 border border-violet-200/80 flex items-center justify-center text-violet-700 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                BIP-174 / PSBT Signing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full compatibility with standard offline hardware signers, air-gapped devices, and multi-sig key workflows.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Independent Verification */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-6 rounded-2xl glass-primary space-y-3 flex flex-col justify-between group cursor-default"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100/90 border border-violet-200/80 flex items-center justify-center text-violet-700 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                Independent Verification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All outputs correlate to standard public TXIDs cross-verifiable on any independent blockchain explorer.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Confidential Routing */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="p-6 rounded-2xl glass-primary space-y-3 flex flex-col justify-between group cursor-default"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100/90 border border-violet-200/80 flex items-center justify-center text-violet-700 group-hover:bg-violet-600 group-hover:text-white group-hover:scale-105 transition-all shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                Confidential Routing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated support for Tor onion-routing gateways, encrypted socks proxies, and custom RPC node endpoints.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
