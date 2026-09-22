import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(Math.max(scrollPx / totalHeight, 0), 1);
        setProgress(currentProgress);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 shadow-[0_0_10px_rgba(139,92,246,0.6)] origin-left will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          opacity: progress > 0.005 ? 1 : 0
        }}
      />
    </div>
  );
};
