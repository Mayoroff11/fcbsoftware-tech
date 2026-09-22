import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Play, ExternalLink, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { DEMO_VIDEOS, DemoVideo } from '../data/websiteData.ts';

interface VideoCardProps {
  video: DemoVideo;
  index: number;
  variants: Variants;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index, variants }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Lazy / Viewport-aware loading with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // If card scrolls out of view while playing, pause playback to save bandwidth & CPU
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { rootMargin: '80px 0px', threshold: 0.15 }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  const handlePlayClick = () => {
    if (!isInView) {
      setIsInView(true);
    }
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback initiation prevented or delayed:', err);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="rounded-2xl glass-primary overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-violet-200/60"
    >
      {/* 1. Actual Hosted MP4 Video Container with 16:9 Aspect Ratio */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-violet-100">
        {/* Real HTML5 Video Element */}
        {isInView ? (
          <video
            ref={videoRef}
            src={`${video.videoUrl}#t=0.001`}
            preload="metadata"
            playsInline
            controls={isPlaying}
            onLoadedData={() => setIsLoading(false)}
            onLoadedMetadata={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className="w-full h-full object-cover bg-slate-950"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
          </div>
        )}

        {/* Loading Skeleton / Indicator over video before first frame decodes */}
        {isLoading && !hasError && isInView && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-10 transition-opacity duration-300 pointer-events-none">
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin mb-2" />
            <span className="text-[11px] font-medium text-slate-300 tracking-wide">
              Loading demonstration footage…
            </span>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-center z-10 space-y-2">
            <AlertCircle className="w-7 h-7 text-amber-400" />
            <p className="text-xs text-slate-300 font-medium">Video preview unavailable</p>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Premium Tasteful Play Button Overlay (visible when not playing and no error) */}
        {!isPlaying && !hasError && (
          <div
            onClick={handlePlayClick}
            className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/25 hover:bg-slate-950/15 transition-all duration-300 cursor-pointer group/overlay"
            role="button"
            tabIndex={0}
            aria-label={`Play demonstration video for ${video.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePlayClick();
              }
            }}
          >
            {/* Centered Glassmorphic Play Button */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900/70 hover:bg-violet-600 backdrop-blur-md border border-white/30 hover:border-violet-300 shadow-2xl flex items-center justify-center text-white transition-all duration-300 transform group-hover/overlay:scale-110 group-hover/overlay:shadow-violet-600/40 group-active/overlay:scale-95">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white ml-1" />
            </div>

            {/* Subtle verification badge in the corner */}
            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[10px] font-mono text-slate-200 border border-white/10 flex items-center gap-1 shadow-sm pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Broadcast Demo</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content: Title, Description, and One Verify Transaction Button */}
      <div className="p-4 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Video Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-900 transition-colors">
            {video.title}
          </h3>

          {/* Video Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* One "Verify Transaction" Button */}
        <div className="pt-3 border-t border-violet-100/80">
          <a
            href={video.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-semibold text-violet-800 bg-violet-50/90 hover:bg-violet-600 hover:text-white border border-violet-200/90 hover:border-violet-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99]"
          >
            <span>Verify Transaction</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

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
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              variants={cardVariants}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
