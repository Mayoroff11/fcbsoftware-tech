import React from 'react';
import { Clock, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { Invoice } from '../../types/payment.ts';

interface ExpiredInvoiceCardProps {
  invoice: Invoice;
  onGenerateNewInvoice: () => void;
  onNavigateHome: () => void;
  isGeneratingNew?: boolean;
}

export const ExpiredInvoiceCard: React.FC<ExpiredInvoiceCardProps> = ({
  invoice,
  onGenerateNewInvoice,
  onNavigateHome,
  isGeneratingNew = false
}) => {
  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md text-center space-y-6">
      
      <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto text-slate-500">
        <Clock className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Payment Window Closed
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          Invoice Expired ({invoice.id})
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          Cryptocurrency exchange rate quotes are locked for 15 minutes to guarantee exact settlement. This payment quote has timed out. To proceed with your purchase of <strong className="text-slate-900">{invoice.planName}</strong> (${invoice.usdAmount} USD), please generate a fresh invoice.
        </p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 text-left max-w-sm mx-auto">
        <div className="flex justify-between">
          <span>Expired Quote:</span>
          <span className="font-mono text-slate-900">{invoice.cryptoAmountFormatted} {invoice.asset}</span>
        </div>
        <div className="flex justify-between">
          <span>License Price:</span>
          <span className="font-bold text-slate-900">${invoice.usdAmount} USD</span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
        >
          Return to Pricing
        </button>

        <button
          type="button"
          onClick={onGenerateNewInvoice}
          disabled={isGeneratingNew}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer shadow-md shadow-violet-500/25 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingNew ? 'animate-spin' : ''}`} />
          <span>Generate New Invoice</span>
        </button>
      </div>

    </div>
  );
};
