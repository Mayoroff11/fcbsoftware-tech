import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Users, Server, Activity, Globe } from 'lucide-react';

interface StatItem {
  id: string;
  targetValue: number;
  isCustomDisplay?: boolean;
  finalDisplay: string;
  format: (val: number) => string;
  title: string;
  icon: React.ElementType;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'global-users',
    targetValue: 16,
    finalDisplay: '16K+',
    format: (val: number) => `${Math.round(val)}K+`,
    title: 'Global Users',
    icon: Users
  },
  {
    id: 'availability',
    targetValue: 24,
    isCustomDisplay: true,
    finalDisplay: '24/7',
    format: () => '24/7',
    title: 'Service Availability',
    icon: Server
  },
  {
    id: 'active-users',
    targetValue: 5.3,
    finalDisplay: '5.3K+',
    format: (val: number) => `${val.toFixed(1)}K+`,
    title: 'Monthly Active Users',
    icon: Activity
  },
  {
    id: 'countries',
    targetValue: 221,
    finalDisplay: '221+',
    format: (val: number) => `${Math.round(val)}+`,
    title: 'Countries Supported',
    icon: Globe
  }
];

export const StatsCounter: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [counts, setCounts] = useState<{ [key: string]: string }>({
    'global-users': shouldReduceMotion ? '16K+' : '0K+',
    'availability': '24/7',
    'active-users': shouldReduceMotion ? '5.3K+' : '0.0K+',
    'countries': shouldReduceMotion ? '221+' : '0+'
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      setCounts({
        'global-users': '16K+',
        'availability': '24/7',
        'active-users': '5.3K+',
        'countries': '221+'
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // 1.8 seconds animation duration
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic easing
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              'global-users': `${Math.round(16 * easeOutProgress)}K+`,
              'availability': '24/7',
              'active-users': `${(5.3 * easeOutProgress).toFixed(1)}K+`,
              'countries': `${Math.round(221 * easeOutProgress)}+`
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Ensure exact final display values
              setCounts({
                'global-users': '16K+',
                'availability': '24/7',
                'active-users': '5.3K+',
                'countries': '221+'
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, shouldReduceMotion]);

  const containerVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="statistics" 
      className="py-16 md:py-20 border-b border-violet-200/50 relative overflow-hidden bg-gradient-to-b from-white/40 via-violet-50/20 to-white/60"
    >
      {/* Subtle Background Glow Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[260px] bg-violet-200/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="relative rounded-2xl glass-primary p-5 sm:p-7 flex flex-col items-center text-center justify-between space-y-4 border border-violet-200/70 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Top: Icon in soft rounded badge */}
                <div className="w-12 h-12 rounded-xl bg-violet-100/90 border border-violet-200 flex items-center justify-center text-violet-700 shadow-2xs group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Middle: Numerical Display */}
                <div className="space-y-1 w-full">
                  <div className="font-price font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-none group-hover:text-violet-900 transition-colors">
                    {counts[stat.id] || stat.finalDisplay}
                  </div>

                  {/* Bottom: Professional Label */}
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 tracking-wide pt-1">
                    {stat.title}
                  </div>
                </div>

                {/* Subtle bottom decorative accent */}
                <div className="w-8 h-1 rounded-full bg-violet-200/60 group-hover:w-12 group-hover:bg-violet-600 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
