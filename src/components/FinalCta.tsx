import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { MessageSquare, ArrowRight, Check, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenLicense: () => void;
  onOpenSupport: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenLicense, onOpenSupport }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToPricing = () => {
    const pricingElement = document.getElementById('pricing') || document.getElementById('licenses');
    if (pricingElement) {
      const navOffset = 80;
      const elementPosition = pricingElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      onOpenLicense();
    }
  };

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

  return (
    <section className="py-16 md:py-22 border-b border-violet-200/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="p-8 sm:p-12 md:p-16 rounded-3xl glass-primary text-center space-y-8 shadow-xl shadow-violet-950/5 relative"
        >
          {/* Top highlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Get Started</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-slate-900 font-display">
              Ready to Explore FCB?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              Choose the license that fits your needs and get started with FCB.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-view-licenses-btn"
              onClick={handleScrollToPricing}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>View Licenses</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="final-cta-support-btn"
              onClick={onOpenSupport}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium text-slate-800 bg-white/80 hover:bg-white border border-white/90 hover:border-violet-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xl shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-violet-600" />
              <span>Contact Support</span>
            </button>
          </div>

          {/* Bottom micro-guarantees */}
          <div className="pt-6 border-t border-violet-100/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cryptographically Signed Binaries</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>No Telemetry / Offline Execution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant License Provisioning</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
