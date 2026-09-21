import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

const TAWK_PROPERTY_ID = '6ab185e485238834458febea';
const TAWK_WIDGET_ID = '1k32n61bl';
const WHATSAPP_URL = 'https://wa.me/447735300809?text=Hello%2C%20I%20need%20assistance%20with%20FCB.';

export const SupportChatLauncher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTawkLoaded, setIsTawkLoaded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize official Tawk.to widget once asynchronously
  useEffect(() => {
    // Check if script already inserted to prevent duplicate script tags
    if (document.getElementById('tawk-script-loader')) {
      if (window.Tawk_API) {
        setIsTawkLoaded(true);
      }
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Configure Tawk.to callbacks to hide the default floating bubble so FCB's custom launcher is the single entry point
    window.Tawk_API.onLoad = function () {
      setIsTawkLoaded(true);
      try {
        if (typeof window.Tawk_API?.hideWidget === 'function') {
          window.Tawk_API.hideWidget();
        }
      } catch (err) {
        console.warn('[FCB Support] Tawk hideWidget notice:', err);
      }
    };

    window.Tawk_API.onChatMinimized = function () {
      try {
        if (typeof window.Tawk_API?.hideWidget === 'function') {
          window.Tawk_API.hideWidget();
        }
      } catch (err) {
        console.warn('[FCB Support] Tawk hide on minimize notice:', err);
      }
    };

    const script = document.createElement('script');
    script.id = 'tawk-script-loader';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    script.onerror = () => {
      console.warn('[FCB Support] Tawk.to failed to load or was blocked by client.');
    };

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }, []);

  // Close panel on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherButtonRef.current?.focus();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close panel on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        launcherButtonRef.current &&
        !launcherButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Action: Launch real Tawk.to live chat widget
  const handleStartLiveChat = () => {
    setIsOpen(false);

    if (window.Tawk_API) {
      try {
        if (typeof window.Tawk_API.showWidget === 'function') {
          window.Tawk_API.showWidget();
        }
        if (typeof window.Tawk_API.maximize === 'function') {
          window.Tawk_API.maximize();
        } else if (typeof window.Tawk_API.toggle === 'function') {
          window.Tawk_API.toggle();
        }
      } catch (err) {
        console.warn('[FCB Support] Error invoking Tawk API:', err);
      }
    } else {
      // If Tawk is still initializing, retry briefly
      setTimeout(() => {
        if (window.Tawk_API) {
          try {
            if (typeof window.Tawk_API.showWidget === 'function') {
              window.Tawk_API.showWidget();
            }
            if (typeof window.Tawk_API.maximize === 'function') {
              window.Tawk_API.maximize();
            }
          } catch {
            // Fallback
          }
        }
      }, 500);
    }
  };

  return (
    <aside aria-label="Customer Support Launcher" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* 1. Support Options Popover Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="fcb-support-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="fcb-support-panel-title"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-violet-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200 backdrop-blur-xl"
        >
          {/* Panel Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-violet-200 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>FCB Client Support</span>
              </div>
              <h3 id="fcb-support-panel-title" className="text-base font-bold font-display text-white tracking-tight">
                How can we help?
              </h3>
            </div>
            <button
              type="button"
              id="btn-close-support-panel"
              onClick={() => setIsOpen(false)}
              aria-label="Close support menu"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Options Body */}
          <div className="p-4 space-y-3 bg-[#faf9fe]">
            {/* OPTION 1: Real Tawk.to Live Chat */}
            <div className="p-4 rounded-xl bg-white border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all group">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200/80 flex items-center justify-center text-violet-700 shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-colors shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      Live Chat
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Direct
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Chat with FCB support directly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      id="btn-start-live-chat"
                      onClick={handleStartLiveChat}
                      className="w-full py-2 px-3.5 rounded-lg text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    >
                      <span>Start Live Chat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* OPTION 2: Official WhatsApp Support */}
            <div className="p-4 rounded-xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all group">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.77.464 3.498 1.345 5.027L2 22l5.084-1.334a10.02 10.02 0 004.947 1.365h.004c5.536 0 10.031-4.495 10.031-10.031 0-2.68-1.043-5.199-2.937-7.093A9.967 9.967 0 0012.031 2zm5.864 14.237c-.244.685-1.424 1.309-1.96 1.393-.509.08-1.17.114-1.892-.117a12.87 12.87 0 01-4.704-2.898 13.06 13.06 0 01-2.905-4.717c-.234-.725-.198-1.385-.117-1.892.083-.536.708-1.716 1.393-1.96.223-.08.455-.12.682-.12.164 0 .324.02.476.06.353.093.593.557.777.923.19.38.397.887.432.96.035.073.057.16.012.247-.046.086-.068.14-.136.22-.068.08-.144.178-.205.244-.069.073-.14.152-.06.29.08.138.355.586.762.949.524.467.966.612 1.104.681.138.069.22.057.301-.035.08-.093.346-.402.438-.54.093-.138.184-.115.308-.069.124.046.787.371.923.44.136.069.228.103.262.16.034.057.034.333-.21 1.018z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      WhatsApp
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      +44 7735 300809
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Message FCB support directly on WhatsApp.
                  </p>
                  <div className="pt-2">
                    <a
                      id="link-whatsapp-support"
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40 no-underline"
                    >
                      <span>Chat on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Footer Note */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Email: <span className="text-slate-700 font-medium">support@fcbsoftware.tech</span></span>
            <span className="text-violet-600 font-medium">FCB Helpdesk</span>
          </div>
        </div>
      )}

      {/* 2. Floating Launcher Button */}
      <button
        ref={launcherButtonRef}
        id="fcb-floating-support-launcher"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="fcb-support-panel"
        aria-label={isOpen ? 'Close support options' : 'Open live support chat options'}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-violet-500/30 active:scale-95 ${
          isOpen
            ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/30'
            : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-600/35 hover:shadow-violet-600/50 hover:-translate-y-0.5'
        }`}
      >
        {/* Pulsing online status indicator dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>

        {isOpen ? (
          <>
            <X className="w-4 h-4 text-white shrink-0" />
            <span className="hidden sm:inline font-medium">Close</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4 text-white shrink-0" />
            <span className="font-semibold">Support</span>
          </>
        )}
      </button>
    </aside>
  );
};
