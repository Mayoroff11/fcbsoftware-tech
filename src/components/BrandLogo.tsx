import React from 'react';

export const FCB_LOGO_IMAGE_URL = 'https://res.cloudinary.com/ni2voxla/image/upload/f_auto,q_auto/fcb-logo-320x280';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  isHovered?: boolean;
  variant?: 'dark' | 'light' | 'auto';
}

/**
 * FCB Logo Mark Component
 * Loads and displays the approved FCB logo image asset directly from the direct Cloudinary URL.
 */
export const BrandLogoMark: React.FC<{ 
  className?: string; 
  size?: number;
}> = ({ 
  className = "",
  size = 36
}) => {
  return (
    <div 
      className={`shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={FCB_LOGO_IMAGE_URL}
        alt="FCB - Bitcoin Transaction Software"
        width={size}
        height={size}
        className="w-full h-full object-contain select-none"
        loading="eager"
        draggable={false}
      />
    </div>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const markSize = size === 'sm' ? 30 : size === 'lg' ? 44 : 36;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Approved FCB Logo */}
      <BrandLogoMark size={markSize} />
      
      {/* Brand Identity Wordmark Lockup */}
      <div className="flex flex-col justify-center">
        {/* Primary Wordmark: FCB */}
        <div className="flex items-center">
          <span className="text-[17px] sm:text-[18px] font-black tracking-[-0.03em] text-slate-900 font-display leading-none">
            FCB
          </span>
        </div>
        
        {/* Subtitle: Bitcoin Transaction Software */}
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-tight leading-tight mt-1">
            Bitcoin Transaction Software
          </span>
        )}
      </div>
    </div>
  );
};
