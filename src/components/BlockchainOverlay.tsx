import React from 'react';

export const BlockchainOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* =========================================================
          LAYER 2 — LARGE SOFT ATMOSPHERIC LIGHT BLOBS (Hardware Accelerated)
         ========================================================= */}
      {/* Top Center Hero Light Blob */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] max-w-[140vw] h-[650px] bg-gradient-to-b from-violet-400/25 via-purple-300/15 to-transparent blur-[120px] rounded-full animate-pulse-subtle will-change-transform"
      />

      {/* Right Atmosphere Bloom */}
      <div
        className="absolute top-[20%] -right-48 w-[750px] max-w-[120vw] h-[750px] bg-gradient-to-bl from-indigo-300/20 via-violet-200/15 to-transparent blur-[110px] rounded-full animate-float-slow will-change-transform"
      />

      {/* Left Center Atmosphere Bloom */}
      <div
        className="absolute top-[50%] -left-48 w-[800px] max-w-[120vw] h-[800px] bg-gradient-to-tr from-purple-300/20 via-lavender-200/15 to-transparent blur-[120px] rounded-full animate-float-reverse will-change-transform"
      />

      {/* Bottom Glow */}
      <div
        className="absolute top-[80%] left-1/3 w-[850px] max-w-[130vw] h-[650px] bg-gradient-to-t from-violet-400/15 via-indigo-200/10 to-transparent blur-[130px] rounded-full will-change-transform"
      />

      {/* =========================================================
          LAYER 4 — DIGITAL TECHNICAL GRID
         ========================================================= */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 85%)'
        }}
      />

      {/* =========================================================
          LAYER 3 — BLOCKCHAIN DISTRIBUTED NETWORK OVERLAY
         ========================================================= */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50 text-violet-600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="blockchain-hex-network"
            width="240"
            height="208"
            patternUnits="userSpaceOnUse"
          >
            {/* Hexagonal Topology Lines */}
            <path
              d="M 60 0 L 180 0 L 240 104 L 180 208 L 60 208 L 0 104 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 8"
              opacity="0.25"
            />
            
            {/* Cross-chain interconnection lines */}
            <line x1="60" y1="0" x2="180" y2="208" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
            <line x1="180" y1="0" x2="60" y2="208" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
            <line x1="0" y1="104" x2="240" y2="104" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />

            {/* Static Nodes */}
            <circle cx="60" cy="0" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="180" cy="0" r="2" fill="currentColor" opacity="0.3" />
            <circle cx="240" cy="104" r="3" fill="currentColor" opacity="0.4" />
            <circle cx="180" cy="208" r="2.5" fill="currentColor" opacity="0.35" />
            <circle cx="60" cy="208" r="2" fill="currentColor" opacity="0.3" />
            <circle cx="0" cy="104" r="3" fill="currentColor" opacity="0.4" />
            <circle cx="120" cy="104" r="3.5" fill="currentColor" opacity="0.5" />
          </pattern>

          {/* Linear gradient for pulse path */}
          <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#blockchain-hex-network)" />

        {/* Dynamic Sparse Node Pulses (Few subtle key points) */}
        <g className="opacity-75">
          {/* Node Pulse 1 */}
          <circle cx="15%" cy="22%" r="4" fill="#7c3aed" className="animate-node-1" />
          <circle cx="15%" cy="22%" r="9" fill="none" stroke="#a78bfa" strokeWidth="1" className="animate-node-1" opacity="0.5" />

          {/* Node Pulse 2 */}
          <circle cx="85%" cy="38%" r="4.5" fill="#6d28d9" className="animate-node-2" />
          <circle cx="85%" cy="38%" r="10" fill="none" stroke="#c4b5fd" strokeWidth="1" className="animate-node-2" opacity="0.5" />

          {/* Node Pulse 3 */}
          <circle cx="28%" cy="68%" r="3.5" fill="#8b5cf6" className="animate-node-3" />
          <circle cx="28%" cy="68%" r="8" fill="none" stroke="#ddd6fe" strokeWidth="1" className="animate-node-3" opacity="0.6" />

          {/* Node Pulse 4 */}
          <circle cx="75%" cy="82%" r="4" fill="#7c3aed" className="animate-node-1" />
          <circle cx="75%" cy="82%" r="11" fill="none" stroke="#a78bfa" strokeWidth="1" className="animate-node-1" opacity="0.4" />

          {/* Sparse Animated Trace Line */}
          <path
            d="M 100 250 L 340 380 L 520 280 L 800 420"
            fill="none"
            stroke="url(#pulse-grad)"
            strokeWidth="1.5"
            className="animate-trace hidden md:block"
          />
        </g>
      </svg>

      {/* =========================================================
          LAYER 5 — FLOATING ABSTRACT 3D ISOMETRIC BLOCKCHAIN FORMS
         ========================================================= */}
      {/* Abstract Translucent Isometric Cube 1 (Top Left) */}
      <div
        className="absolute top-36 left-8 sm:left-24 w-32 h-32 opacity-35 pointer-events-none hidden lg:block animate-float-slow will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-violet-500">
          {/* Top Face */}
          <polygon points="50,15 85,35 50,55 15,35" fill="rgba(255, 255, 255, 0.45)" stroke="currentColor" strokeWidth="0.8" />
          {/* Left Face */}
          <polygon points="15,35 50,55 50,90 15,70" fill="rgba(237, 233, 254, 0.35)" stroke="currentColor" strokeWidth="0.8" />
          {/* Right Face */}
          <polygon points="50,55 85,35 85,70 50,90" fill="rgba(221, 214, 254, 0.25)" stroke="currentColor" strokeWidth="0.8" />
          {/* Inner Node */}
          <circle cx="50" cy="55" r="2.5" fill="#7c3aed" />
        </svg>
      </div>

      {/* Abstract Hexagonal Ring (Center Right) */}
      <div
        className="absolute top-[42%] -right-10 sm:right-16 w-44 h-44 opacity-30 pointer-events-none hidden md:block animate-float-reverse will-change-transform"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full text-indigo-500">
          <polygon
            points="60,10 105,35 105,85 60,110 15,85 15,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="6 4"
          />
          <polygon
            points="60,25 90,42 90,78 60,95 30,78 30,42"
            fill="rgba(255, 255, 255, 0.3)"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <circle cx="60" cy="10" r="3" fill="#6d28d9" />
          <circle cx="105" cy="85" r="3" fill="#6d28d9" />
          <circle cx="15" cy="85" r="3" fill="#6d28d9" />
        </svg>
      </div>

      {/* Abstract Layered Glass Cube 2 (Bottom Left) */}
      <div
        className="absolute top-[75%] left-12 w-36 h-36 opacity-30 pointer-events-none hidden lg:block animate-float-slow will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-violet-600">
          <polygon points="50,15 85,35 50,55 15,35" fill="rgba(255, 255, 255, 0.5)" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="15,35 50,55 50,90 15,70" fill="rgba(216, 180, 254, 0.35)" stroke="currentColor" strokeWidth="0.8" />
          <polygon points="50,55 85,35 85,70 50,90" fill="rgba(196, 181, 253, 0.25)" stroke="currentColor" strokeWidth="0.8" />
          <line x1="50" y1="15" x2="50" y2="55" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        </svg>
      </div>
    </div>
  );
};
