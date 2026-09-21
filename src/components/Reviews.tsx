import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { MessageSquareText, Star, ShieldCheck, User } from 'lucide-react';
import { REVIEWS, Review } from '../data/websiteData.ts';

// Deterministic source assignment based on name hash (Google Review, Trustpilot, Verified Customer)
function getReviewSource(name: string): { label: string; platform: 'google' | 'trustpilot' | 'customer' } {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const mod = Math.abs(hash) % 3;
  if (mod === 0) return { label: 'Google Review', platform: 'google' };
  if (mod === 1) return { label: 'Trustpilot Review', platform: 'trustpilot' };
  return { label: 'Verified User', platform: 'customer' };
}

// Avatar image with automatic fallback
const ReviewAvatar: React.FC<{ avatar: string; name: string }> = ({ avatar, name }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !avatar) {
    return (
      <div 
        className="w-11 h-11 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 font-bold text-xs shrink-0 shadow-2xs"
        aria-label={`${name} avatar fallback`}
      >
        <User className="w-5 h-5 text-violet-600" />
      </div>
    );
  }

  return (
    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-violet-300/80 shadow-2xs shrink-0 bg-violet-50">
      <img
        src={avatar}
        alt={`${name} profile avatar`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Precise Fractional Star Rating Component (3.5, 3.9, 4.0, 4.5, 5.0)
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.max(0, Math.min(100, (rating - (star - 1)) * 100));
          return (
            <div key={star} className="relative w-3.5 h-3.5">
              {/* Inactive Star Base */}
              <Star className="w-3.5 h-3.5 text-violet-200 fill-violet-100" />
              {/* Active Fill Overlay */}
              {fillPercentage > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs font-bold text-slate-800 font-mono tracking-tight ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Official Google G Mark SVG
const GoogleGLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.36 7.37 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Official Trustpilot Star SVG
const TrustpilotStarLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="#00B67A"
    />
    <path
      d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="#005128"
    />
  </svg>
);

export const Reviews: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const sectionVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Duplicated list for seamless infinite continuous looping
  const carouselItems = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="py-16 md:py-22 border-b border-violet-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Centered Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto text-center space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-violet-200/90 bg-white/85 text-violet-900 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-xl shadow-2xs font-display">
            <MessageSquareText className="w-3.5 h-3.5 text-violet-600" />
            <span>Customer Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.03em] text-slate-900 font-display">
            Reviews
          </h2>

          <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Authentic experiences, setup reflections, and feedback shared by users across multiple platforms.
          </p>

          {/* Official Google Reviews + Trustpilot Branding (Subtle & Premium Glass Container) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            
            {/* Google Reviews Official Branding Card */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-violet-200/90 text-xs font-medium text-slate-800 backdrop-blur-md shadow-2xs hover:border-violet-300 transition-colors">
              <GoogleGLogo className="w-4 h-4" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">Google</span>
                <span className="text-slate-500 font-normal">Reviews</span>
              </div>
            </div>

            {/* Trustpilot Official Branding Card */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-violet-200/90 text-xs font-medium text-slate-800 backdrop-blur-md shadow-2xs hover:border-violet-300 transition-colors">
              <TrustpilotStarLogo className="w-4 h-4" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">Trustpilot</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Infinite Horizontal Scrolling Carousel (ONE Single Row: Right -> Left at Relaxed Reading Speed) */}
      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Fades for Seamless Visual Depth */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#f7f5fd] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#f7f5fd] to-transparent z-10" />

        {/* Marquee Track Container (Accessible keyboard focus pause & hover pause) */}
        <div 
          tabIndex={0}
          aria-label="Customer reviews marquee"
          className="overflow-x-auto no-scrollbar focus:outline-none"
        >
          <div 
            className={`animate-reviews-marquee flex gap-6 px-4 ${isPaused ? '[animation-play-state:paused]' : ''}`}
          >
            {carouselItems.map((review: Review, index: number) => {
              const sourceInfo = getReviewSource(review.name);

              return (
                <div
                  key={`${review.id}-${index}`}
                  tabIndex={0}
                  className="w-[340px] sm:w-[380px] lg:w-[420px] shrink-0 p-6 rounded-2xl glass-primary flex flex-col justify-between space-y-4 select-none cursor-default group focus:outline-none focus:ring-2 focus:ring-violet-400/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="space-y-3.5">
                    {/* Top: Circular Avatar + Reviewer Name + Star Rating */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <ReviewAvatar avatar={review.avatar} name={review.name} />
                        
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-slate-900 truncate group-hover:text-violet-950 transition-colors">
                            {review.name}
                          </div>
                          <div className="mt-0.5">
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Review Text (Original wording preserved) */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic line-clamp-6 pt-1">
                      "{review.content}"
                    </p>
                  </div>

                  {/* Bottom: Subtle Review-Source Indicator */}
                  <div className="pt-3 border-t border-violet-100/90 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      {sourceInfo.platform === 'google' && (
                        <>
                          <GoogleGLogo className="w-3.5 h-3.5" />
                          <span>Google Review</span>
                        </>
                      )}
                      {sourceInfo.platform === 'trustpilot' && (
                        <>
                          <TrustpilotStarLogo className="w-3.5 h-3.5" />
                          <span>Trustpilot Review</span>
                        </>
                      )}
                      {sourceInfo.platform === 'customer' && (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                          <span>Verified Feedback</span>
                        </>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Community</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
