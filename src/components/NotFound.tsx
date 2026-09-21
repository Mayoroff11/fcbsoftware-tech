import React from 'react';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';

interface NotFoundProps {
  onNavigateHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white/80 backdrop-blur-xl border border-violet-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-purple-900/5">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-violet-600">
            Error 404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Page not found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The requested page or section could not be located. Please check the URL or return to the main platform.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 text-white font-semibold text-sm shadow-md hover:bg-violet-700 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
