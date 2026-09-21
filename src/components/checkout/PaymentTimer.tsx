import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface PaymentTimerProps {
  expiresAt: number;
  onExpire: () => void;
}

export const PaymentTimer: React.FC<PaymentTimerProps> = ({ expiresAt, onExpire }) => {
  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => Math.max(0, expiresAt - Date.now()));

  useEffect(() => {
    const update = () => {
      const remaining = Math.max(0, expiresAt - Date.now());
      setTimeLeftMs(remaining);

      if (remaining <= 0) {
        onExpire();
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const totalDuration = 15 * 60 * 1000;
  const progressPercent = Math.min(100, Math.max(0, (timeLeftMs / totalDuration) * 100));

  const minutes = Math.floor(timeLeftMs / 60000);
  const seconds = Math.floor((timeLeftMs % 60000) / 1000);
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isLow = minutes < 3;

  return (
    <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
      isLow
        ? 'bg-rose-50 border-rose-300 text-rose-950 ring-1 ring-rose-300/50'
        : 'bg-violet-50/80 border-violet-200 text-violet-950'
    }`}>
      <div className="flex items-center gap-2">
        <Clock className={`w-4 h-4 ${isLow ? 'text-rose-600 animate-pulse' : 'text-violet-600'}`} />
        <div className="text-xs">
          <span className="font-semibold text-slate-800">Payment Window: </span>
          <span className="text-[11px] text-slate-500">Rate locked for 15 mins</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Visual Pill with Timer */}
        <div className={`px-3 py-1 rounded-lg font-mono font-bold text-xs ${
          isLow ? 'bg-rose-600 text-white' : 'bg-violet-600 text-white shadow-xs'
        }`}>
          {formatted} remaining
        </div>
      </div>
    </div>
  );
};
