import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Check, ArrowRight, Sparkles, Building2, User2, HelpCircle, ShieldCheck } from 'lucide-react';
import { DURATION_GROUPS } from '../data/websiteData.ts';

interface PricingProps {
  onOpenLicense: (tierId: string) => void;
  onOpenSupport: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenLicense, onOpenSupport }) => {
  const [activeDurationId, setActiveDurationId] = useState<string>('1-month');
  const shouldReduceMotion = useReducedMotion();

  const selectedGroup = DURATION_GROUPS.find((g) => g.id === activeDurationId) || DURATION_GROUPS[0];

  const sectionVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : custom * 0.08,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Atmospheric Background with Low-Opacity Technical Geometry */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Soft Lavender / White Gradient Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-100/30 via-transparent to-violet-100/40" />
        
        {/* Very Faint Technical Grid / Geometric Matrix */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Faint Center Radial Light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-200/20 rounded-full blur-3xl" />
      </div>

      <div id="licenses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="max-w-3xl mx-auto text-center mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-violet-100/70 border border-violet-200/80 text-violet-900 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-700" />
            <span>Cryptographic Software Licensing</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
            Choose Your License
          </h2>
          
          <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Choose the license duration and operational capacity matching your transaction volume and workstation setup.
          </p>
        </motion.div>

        {/* Duration Selector — Refined Segmented Control */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex justify-center mb-12"
        >
          <div className="p-1 rounded-xl bg-white/70 border border-slate-200/80 backdrop-blur-md shadow-xs inline-flex items-center gap-1 max-w-full overflow-x-auto">
            {DURATION_GROUPS.map((group) => {
              const isActive = group.id === activeDurationId;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveDurationId(group.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {group.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Pricing Cards — Restrained Enterprise Glassmorphic System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 items-stretch">
          
          {/* 1. PERSONAL PLAN */}
          <motion.div
            key={`${selectedGroup.id}-personal`}
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(79,46,150,0.06),0_1px_2px_rgba(0,0,0,0.03)] p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_30px_-4px_rgba(79,46,150,0.09)]"
          >
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2 pb-4">
                <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  <User2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Personal Edition</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                  Single Operator
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                {selectedGroup.name} License
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-normal">
                {selectedGroup.personal.description}
              </p>

              {/* Price Display */}
              <div className="mt-5 pb-5 border-b border-slate-200/70">
                <div className="flex items-baseline gap-2">
                  <span className="font-price font-extrabold text-violet-700 text-2xl sm:text-3xl tracking-tight">
                    {selectedGroup.personal.price} USD
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    / {selectedGroup.name.toLowerCase()} license
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-normal">
                  One-time license allocation · Local desktop execution
                </div>
              </div>

              {/* Included Capabilities List */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Included Capabilities:
                </div>
                <ul className="space-y-2.5">
                  {selectedGroup.personal.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200/70 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-slate-700 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Container */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 space-y-2">
              <button
                id={`buy-plan-${selectedGroup.personal.id}`}
                onClick={() => onOpenLicense(selectedGroup.personal.id)}
                className="w-full py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300/90 hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-sm"
              >
                <span>Acquire {selectedGroup.name} Personal License</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Instant delivery upon cryptographic confirmation
              </p>
            </div>
          </motion.div>

          {/* 2. BUSINESS / PROFESSIONAL PLAN */}
          <motion.div
            key={`${selectedGroup.id}-business`}
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl bg-white/90 backdrop-blur-xl border border-violet-300/90 shadow-[0_8px_32px_-6px_rgba(109,40,217,0.12),0_1px_2px_rgba(0,0,0,0.03)] p-7 sm:p-8 flex flex-col justify-between relative ring-1 ring-violet-500/20 transition-all duration-200 hover:border-violet-400 hover:shadow-[0_12px_40px_-6px_rgba(109,40,217,0.16)]"
          >
            {/* Subtle Recommended Badge */}
            <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-violet-800 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-xs flex items-center gap-1 border border-violet-700">
              <Sparkles className="w-3 h-3 text-violet-200" />
              <span>Recommended for Desks</span>
            </div>

            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2 pb-4">
                <div className="flex items-center gap-1.5 text-violet-900 text-xs font-semibold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5 text-violet-700" />
                  <span>Business / Professional</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-violet-100/90 text-violet-900 border border-violet-200/80">
                  Team & Multi-Desk
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                {selectedGroup.name} Pro License
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-normal">
                {selectedGroup.business.description}
              </p>

              {/* Price Display */}
              <div className="mt-5 pb-5 border-b border-violet-100/80">
                <div className="flex items-baseline gap-2">
                  <span className="font-price font-extrabold text-violet-700 text-2xl sm:text-3xl tracking-tight">
                    {selectedGroup.business.price} USD
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    / {selectedGroup.name.toLowerCase()} license
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-normal">
                  Multi-seat allocation · Priority transaction desk routing
                </div>
              </div>

              {/* Included Capabilities List */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Complete Professional Capabilities:
                </div>
                <ul className="space-y-2.5">
                  {selectedGroup.business.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                      <div className="w-4 h-4 rounded-full bg-violet-100 border border-violet-200/80 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-violet-800 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Container */}
            <div className="mt-8 pt-6 border-t border-violet-100/80 space-y-2">
              <button
                id={`buy-plan-${selectedGroup.business.id}`}
                onClick={() => onOpenLicense(selectedGroup.business.id)}
                className="w-full py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-violet-800 hover:bg-violet-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
              >
                <span>Acquire {selectedGroup.name} Business License</span>
                <ArrowRight className="w-4 h-4 text-violet-200" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Includes priority desk routing and air-gapped signature tools
              </p>
            </div>
          </motion.div>
        </div>

        {/* ALL DURATION OVERVIEW GRID — Compact Architectural Comparison */}
        <div className="mt-16 pt-12 border-t border-slate-200/70 max-w-5xl mx-auto">
          <div className="text-center mb-8 space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              All Duration Tiers Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Compare all available licensing terms from 1 month to Lifetime perpetual execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DURATION_GROUPS.map((group, idx) => {
              const isCurrent = group.id === activeDurationId;
              return (
                <motion.div
                  key={group.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className={`p-4 rounded-xl bg-white/70 backdrop-blur-md border transition-all flex flex-col justify-between space-y-4 ${
                    isCurrent 
                      ? 'border-violet-400 bg-white/90 shadow-sm ring-1 ring-violet-400/30' 
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 font-display">
                        {group.name}
                      </span>
                      <button
                        onClick={() => setActiveDurationId(group.id)}
                        className="text-[10px] text-violet-700 hover:text-violet-900 font-medium cursor-pointer"
                      >
                        Select
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Personal:</span>
                        <span className="font-price font-extrabold text-violet-700">{group.personal.price} USD</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Business:</span>
                        <span className="font-price font-extrabold text-violet-700">{group.business.price} USD</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenLicense(group.business.id)}
                    className="w-full py-2 px-2.5 rounded-lg text-[11px] font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-center transition-all cursor-pointer"
                  >
                    Acquire {group.name}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Enterprise Inquiry Banner */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2 font-display">
              <HelpCircle className="w-4 h-4 text-violet-700" />
              <span>Need Custom Enterprise Volume Licensing or Air-Gap Key Audits?</span>
            </h4>
            <p className="text-xs text-slate-500 max-w-xl">
              We provide tailored licensing architectures for high-throughput liquidity routers, multi-signature desks, and private clusters.
            </p>
          </div>

          <button
            onClick={onOpenSupport}
            className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
          >
            Contact Enterprise Desk
          </button>
        </motion.div>

      </div>
    </section>
  );
};
