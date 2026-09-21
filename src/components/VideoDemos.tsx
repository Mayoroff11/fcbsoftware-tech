import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Play, ExternalLink } from 'lucide-react';
import { DEMO_VIDEOS, DemoVideo } from '../data/websiteData.ts';

export const VideoDemos: React.FC = () => {
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
    <section id="demonstrations" className="py-16 md:py-22 border-b border-violet-200/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered + Scroll Reveal) */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
            <Play className="w-3.5 h-3.5 text-violet-600" />
            <span>Technical Demonstrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.03em] text-slate-900 font-display">
            See FCB in Action
          </h2>
          <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Watch live transaction demonstrations showing real broadcasts and verify the results directly on-chain.
          </p>
        </motion.div>

        {/* 6 Video Cards Grid (3 cols on desktop, 2 cols on tablet, 1 col on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_VIDEOS.map((video: DemoVideo, index: number) => (
            <motion.div
              key={video.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl glass-primary overflow-hidden flex flex-col justify-between group"
            >
              {/* 1. Actual Hosted MP4 Video Player */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-violet-100">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Card Content: Title, Description, and One Verify Transaction Button */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* 2. Video Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
                    {video.title}
                  </h3>

                  {/* 3. Video Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* 4. One "Verify Transaction" Button */}
                <div className="pt-3 border-t border-violet-100/80">
                  <a
                    href={video.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-violet-800 bg-violet-50/90 hover:bg-violet-600 hover:text-white border border-violet-200/90 hover:border-violet-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span>Verify Transaction</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
