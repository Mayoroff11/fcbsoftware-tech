import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Check, ArrowRight, Sparkles, Building2, User2, ShieldCheck } from 'lucide-react';
import { DURATION_GROUPS } from '../data/websiteData.ts';

interface PricingProps {
  onOpenLicense: (tierId: string) => void;
  onOpenSupport?: () => void;
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

  const handleSelectDuration = (durationId: string) => {
    setActiveDurationId(durationId);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Atmospheric Background with Low-Opacity Technical Geometry */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Soft Lavender / White Gradient Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-100/30 via-transparent to-violet-100/40" />
        
        {/* Faint Technical Grid / Geometric Matrix */}
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
            Select your desired license duration below, then choose between a Personal or Business edition.
          </p>
        </motion.div>

        {/* Step 1: Select Duration — Segmented Control */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col items-center justify-center mb-10 space-y-3"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Step 1: Select Duration
          </div>
          <div className="p-1.5 rounded-2xl bg-white/80 border border-slate-200/90 backdrop-blur-md shadow-xs inline-flex items-center gap-1 max-w-full overflow-x-auto">
            {DURATION_GROUPS.map((group) => {
              const isActive = group.id === activeDurationId;
              return (
                <button
                  key={group.id}
                  onClick={() => handleSelectDuration(group.id)}
                  aria-pressed={isActive}
                  className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md font-semibold ring-2 ring-slate-900/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {group.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Step 2: License Type Header */}
        <div className="max-w-5xl mx-auto text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-800 text-[11px] font-bold uppercase tracking-widest border border-violet-200/70 mb-2">
            {selectedGroup.name} Licenses
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Choose your license type
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose the license type that fits your needs.
          </p>
        </div>

        {/* Step 3: Two Clearly Separated Responsive Plan Cards (Personal vs Business) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 items-stretch">
          
          {/* 1. PERSONAL LICENSE CARD */}
          <motion.div
            key={`${selectedGroup.id}-personal`}
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(79,46,150,0.06),0_1px_2px_rgba(0,0,0,0.03)] p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_30px_-4px_rgba(79,46,150,0.09)]"
          >
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  <User2 className="w-4 h-4 text-slate-500" />
                  <span>Personal License</span>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80">
                  Single User / 1 Device
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-5">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                  {selectedGroup.name} — Personal License
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {selectedGroup.personal.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="mt-6 pb-6 border-b border-slate-200/70">
                <div className="flex items-baseline gap-2">
                  <span className="font-price font-extrabold text-violet-800 text-3xl sm:text-4xl tracking-tight">
                    {selectedGroup.personal.price} USD
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1.5 font-normal">
                  Total license price · One-time payment · Local desktop execution
                </div>
              </div>

              {/* Included Capabilities List */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Included Specifications:
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

            {/* Unequivocal Action Button */}
            <div className="mt-8 pt-6 border-t border-slate-200/70 space-y-2">
              <button
                id={`buy-plan-${selectedGroup.personal.id}`}
                onClick={() => onOpenLicense(selectedGroup.personal.id)}
                className="w-full min-h-[44px] py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99]"
              >
                <span>Choose Personal</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Instant delivery upon cryptographic payment confirmation
              </p>
            </div>
          </motion.div>

          {/* 2. BUSINESS LICENSE CARD */}
          <motion.div
            key={`${selectedGroup.id}-business`}
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-violet-400/90 shadow-[0_8px_32px_-6px_rgba(109,40,217,0.14),0_1px_2px_rgba(0,0,0,0.03)] p-7 sm:p-8 flex flex-col justify-between relative ring-1 ring-violet-500/20 transition-all duration-200 hover:border-violet-500 hover:shadow-[0_12px_40px_-6px_rgba(109,40,217,0.2)]"
          >
            {/* Recommended Badge */}
            <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-violet-800 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-sm flex items-center gap-1 border border-violet-700">
              <Sparkles className="w-3 h-3 text-violet-200" />
              <span>Multi-User License</span>
            </div>

            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-violet-100">
                <div className="flex items-center gap-1.5 text-violet-900 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-violet-700" />
                  <span>Business License</span>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-violet-100 text-violet-900 border border-violet-200">
                  Team & Multi-Desk
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-5">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
                  {selectedGroup.name} — Business License
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {selectedGroup.business.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="mt-6 pb-6 border-b border-violet-100/80">
                <div className="flex items-baseline gap-2">
                  <span className="font-price font-extrabold text-violet-800 text-3xl sm:text-4xl tracking-tight">
                    {selectedGroup.business.price} USD
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1.5 font-normal">
                  Total license price · One-time payment · Multi-user allocation
                </div>
              </div>

              {/* Included Capabilities List */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  Complete Business Capabilities:
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

            {/* Unequivocal Action Button */}
            <div className="mt-8 pt-6 border-t border-violet-100/80 space-y-2">
              <button
                id={`buy-plan-${selectedGroup.business.id}`}
                onClick={() => onOpenLicense(selectedGroup.business.id)}
                className="w-full min-h-[44px] py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-violet-800 hover:bg-violet-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-900/20 hover:shadow-lg active:scale-[0.99]"
              >
                <span>Choose Business</span>
                <ArrowRight className="w-4 h-4 text-violet-200" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Includes multi-seat allocation & priority desk support
              </p>
            </div>
          </motion.div>
        </div>

        {/* ALL DURATION TIERS OVERVIEW — Actionable Direct Plan Selection */}
        <div className="mt-16 pt-12 border-t border-slate-200/70 max-w-5xl mx-auto">
          <div className="text-center mb-8 space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              All Duration Tiers Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Select a duration tier below to immediately view and acquire a Personal or Business edition.
            </p>
          </div>

          <div className="space-y-5">
            {/* 1. Duration Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
                    onClick={() => handleSelectDuration(group.id)}
                    className={`p-4 rounded-xl bg-white/80 backdrop-blur-md border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isCurrent 
                        ? 'border-violet-600 bg-white shadow-md ring-2 ring-violet-500/25' 
                        : 'border-slate-200/80 hover:border-violet-300 hover:bg-white'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs sm:text-sm font-bold font-display ${isCurrent ? 'text-violet-950' : 'text-slate-900'}`}>
                          {group.name}
                        </span>
                        {isCurrent ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-600 text-white shrink-0">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-medium shrink-0">
                            Select
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Personal:</span>
                          <span className="font-price font-bold text-slate-900">{group.personal.price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Business:</span>
                          <span className="font-price font-bold text-violet-700">{group.business.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inline mobile choice expansion inside the tapped card */}
                    {isCurrent && (
                      <div className="block sm:hidden pt-3 border-t border-violet-100 space-y-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenLicense(group.personal.id);
                          }}
                          className="w-full min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Choose Personal ({group.personal.price})</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenLicense(group.business.id);
                          }}
                          className="w-full min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-violet-700 hover:bg-violet-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Choose Business ({group.business.price})</span>
                          <ArrowRight className="w-3.5 h-3.5 text-violet-200" />
                        </button>
                      </div>
                    )}

                    {!isCurrent && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDuration(group.id);
                        }}
                        className="w-full min-h-[44px] py-2 px-2.5 rounded-lg text-[11px] font-semibold text-center text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center"
                      >
                        Select {group.name}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* 2. Expanded Actionable License Edition Panel for Selected Duration */}
            <motion.div
              key={`overview-action-panel-${selectedGroup.id}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-6 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-violet-500/80 shadow-lg shadow-violet-950/5 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-violet-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-900 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-violet-700" />
                    <span>{selectedGroup.name} License Options</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {selectedGroup.name} — Select Edition
                  </h4>
                </div>
                <p className="text-xs text-slate-500 max-w-sm">
                  Click either edition below to directly launch the checkout flow for {selectedGroup.name}.
                </p>
              </div>

              {/* Personal vs Business Choice Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Personal License Choice Box */}
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:bg-slate-100/60 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                        <User2 className="w-4 h-4 text-slate-500" />
                        <span>Personal License</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                        For One User
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="font-price font-extrabold text-2xl sm:text-3xl text-slate-900">
                        {selectedGroup.personal.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">USD</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedGroup.personal.description} Single user allocation for individual software execution.
                    </p>
                  </div>

                  <button
                    id={`overview-buy-${selectedGroup.personal.id}`}
                    type="button"
                    onClick={() => onOpenLicense(selectedGroup.personal.id)}
                    className="w-full min-h-[44px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99]"
                  >
                    <span>Choose Personal</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                {/* Business License Choice Box */}
                <div className="p-4 sm:p-5 rounded-xl bg-violet-50/80 border border-violet-200/90 flex flex-col justify-between space-y-4 hover:border-violet-300 hover:bg-violet-50 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 uppercase tracking-wider">
                        <Building2 className="w-4 h-4 text-violet-700" />
                        <span>Business License</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-violet-100 text-violet-900 border border-violet-200">
                        For Multiple Users
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="font-price font-extrabold text-2xl sm:text-3xl text-violet-900">
                        {selectedGroup.business.price}
                      </span>
                      <span className="text-xs text-violet-600 font-medium">USD</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedGroup.business.description} Multi-user allocation for team desks and multi-device deployment.
                    </p>
                  </div>

                  <button
                    id={`overview-buy-${selectedGroup.business.id}`}
                    type="button"
                    onClick={() => onOpenLicense(selectedGroup.business.id)}
                    className="w-full min-h-[44px] py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-violet-700 hover:bg-violet-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-800/20 hover:shadow-lg active:scale-[0.99]"
                  >
                    <span>Choose Business</span>
                    <ArrowRight className="w-4 h-4 text-violet-200" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
