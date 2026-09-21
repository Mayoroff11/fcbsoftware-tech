import React, { useState } from 'react';
import { Invoice } from '../../types/payment.ts';
import { BlockchainMonitorService } from '../../services/BlockchainMonitorService.ts';
import { InvoiceService } from '../../services/InvoiceService.ts';
import { MAX_AUTO_CONFIRM_OVERPAYMENT_USD } from '../../config/cryptoConfig.ts';
import { Play, CheckCircle2, AlertCircle, RefreshCw, ChevronDown, ChevronUp, FastForward, Clock, Wrench, ShieldAlert, PlusCircle } from 'lucide-react';

interface PaymentTestingSimulatorProps {
  invoice: Invoice;
  onInvoiceUpdated: (updated: Invoice) => void;
}

export const PaymentTestingSimulator: React.FC<PaymentTestingSimulatorProps> = ({
  invoice,
  onInvoiceUpdated
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDetect = () => {
    const updated = BlockchainMonitorService.simulatePaymentDetected(invoice.id);
    if (updated) onInvoiceUpdated(updated);
  };

  const handleOverpaymentAcceptable = () => {
    // $50 USD equivalent overpayment (well within $200 threshold)
    const excessCrypto = 50 / invoice.exchangeRate;
    const amount = invoice.cryptoAmount + excessCrypto;
    const updated = BlockchainMonitorService.simulatePaymentDetected(invoice.id, amount);
    if (updated) onInvoiceUpdated(updated);
  };

  const handleOverpaymentManualReview = () => {
    // $350 USD equivalent overpayment (exceeds $200 threshold)
    const excessCrypto = 350 / invoice.exchangeRate;
    const amount = invoice.cryptoAmount + excessCrypto;
    const updated = BlockchainMonitorService.simulatePaymentDetected(invoice.id, amount);
    if (updated) onInvoiceUpdated(updated);
  };

  const handleAdvance = () => {
    const updated = BlockchainMonitorService.simulateAdvanceConfirmation(invoice.id);
    if (updated) onInvoiceUpdated(updated);
  };

  const handleInstantConfirm = () => {
    const updated = BlockchainMonitorService.simulateInstantConfirm(invoice.id);
    if (updated) onInvoiceUpdated(updated);
  };

  const handleUnderpayment = () => {
    const underpaidAmount = invoice.cryptoAmount * 0.6; // 60% of required
    const updated = BlockchainMonitorService.simulatePaymentDetected(invoice.id, underpaidAmount);
    if (updated) onInvoiceUpdated(updated);
  };

  const handleSimulateExpiry = () => {
    const updated = InvoiceService.updateStatus(invoice.id, 'expired');
    if (updated) onInvoiceUpdated(updated);
  };

  const handleReset = () => {
    const updated = BlockchainMonitorService.resetToAwaiting(invoice.id);
    if (updated) onInvoiceUpdated(updated);
  };

  return (
    <div className="rounded-xl border border-dashed border-violet-300 bg-violet-50/50 p-3 sm:p-4 text-xs text-slate-700 space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-bold text-violet-800 hover:text-violet-950 cursor-pointer"
        >
          <Wrench className="w-4 h-4 text-violet-600" />
          <span>Payment Lifecycle Sandbox & Verification Controls</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <span className="text-[10px] px-2 py-0.5 rounded bg-violet-100 font-mono text-violet-700 font-semibold">
          Current State: {invoice.status}
        </span>
      </div>

      {isExpanded && (
        <div className="pt-2 border-t border-violet-200/80 space-y-2">
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Test on-chain state transitions without broadcasting real blockchain transactions. Locked quote pricing and the ${MAX_AUTO_CONFIRM_OVERPAYMENT_USD} overpayment threshold are actively enforced.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleDetect}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>1. Detect Payment (Exact)</span>
            </button>

            <button
              type="button"
              onClick={handleOverpaymentAcceptable}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Test overpayment +$50 USD (under $200 threshold)"
            >
              <PlusCircle className="w-3 h-3" />
              <span>Overpayment (+ $50 Auto-OK)</span>
            </button>

            <button
              type="button"
              onClick={handleOverpaymentManualReview}
              className="px-3 py-1.5 rounded-lg bg-orange-700 hover:bg-orange-800 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Test overpayment +$350 USD (over $200 threshold)"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Overpayment (+ $350 Manual Review)</span>
            </button>

            <button
              type="button"
              onClick={handleAdvance}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FastForward className="w-3 h-3" />
              <span>Advance Confirmation (+1)</span>
            </button>

            <button
              type="button"
              onClick={handleInstantConfirm}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Confirm Instant</span>
            </button>

            <button
              type="button"
              onClick={handleUnderpayment}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertCircle className="w-3 h-3" />
              <span>Test Underpayment (60%)</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateExpiry}
              className="px-3 py-1.5 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Clock className="w-3 h-3" />
              <span>Simulate Expiry</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-slate-500" />
              <span>Reset State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

