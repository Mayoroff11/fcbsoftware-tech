import React, { useState } from 'react';
import { Invoice } from '../../types/payment.ts';
import { NETWORKS, MAX_AUTO_CONFIRM_OVERPAYMENT_USD } from '../../config/cryptoConfig.ts';
import { CryptoNetworkIcon } from '../crypto/CryptoNetworkIcon.tsx';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  AlertCircle,
  FileText,
  RefreshCw,
  Loader2,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface PaymentStatusCardProps {
  invoice: Invoice;
  onGenerateNewInvoice: () => void;
  isGeneratingNew?: boolean;
}

export const PaymentStatusCard: React.FC<PaymentStatusCardProps> = ({
  invoice,
  onGenerateNewInvoice,
  isGeneratingNew = false
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const netConfig = NETWORKS[invoice.network] || NETWORKS.bitcoin;

  const getStatusBadge = () => {
    switch (invoice.status) {
      case 'confirmed':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Payment Confirmed</span>
          </div>
        );
      case 'confirming':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold">
            <Loader2 className="w-3.5 h-3.5 text-sky-600 animate-spin" />
            <span>Confirming ({invoice.confirmations}/{invoice.requiredConfirmations})</span>
          </div>
        );
      case 'payment_detected':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold">
            <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Payment Detected</span>
          </div>
        );
      case 'underpaid':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Underpaid / Payment Shortfall</span>
          </div>
        );
      case 'overpaid_manual_review':
      case 'overpaid':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Overpayment — Manual Review</span>
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Invoice Expired</span>
          </div>
        );
      case 'awaiting_payment':
      default:
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 border border-violet-200 text-violet-800 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
            <span>Awaiting Payment</span>
          </div>
        );
    }
  };

  const getStatusMessage = () => {
    switch (invoice.status) {
      case 'confirmed':
        return "Payment confirmed. Your software license and activation credentials are ready.";
      case 'confirming':
        return `Payment received on ${netConfig.name}. Waiting for required blockchain block confirmations (${invoice.confirmations}/${invoice.requiredConfirmations}).`;
      case 'payment_detected':
        if (invoice.overpaidAmount && invoice.overpaidAmount > 0) {
          return `Payment detected on the network with acceptable overpayment. Block confirmations in progress (${invoice.confirmations}/${invoice.requiredConfirmations}).`;
        }
        return "Payment detected on the network. We're independently verifying transaction parameters.";
      case 'underpaid':
        return `A payment was detected, but the amount received (${invoice.receivedAmount} ${invoice.asset}) is below the required invoice total of ${invoice.cryptoAmountFormatted} ${invoice.asset}.`;
      case 'overpaid_manual_review':
      case 'overpaid':
        return `A payment of ${invoice.receivedAmount} ${invoice.asset} was received. Because the amount sent exceeds the invoice total by over $${MAX_AUTO_CONFIRM_OVERPAYMENT_USD} USD, automatic provisioning is held for manual review.`;
      case 'expired':
        return "This invoice has expired. Generate a new invoice to receive a current payment quote.";
      case 'awaiting_payment':
      default:
        return "Waiting for your transaction. Send the required crypto amount to the receiving address.";
    }
  };

  const isDetectedOrBeyond =
    invoice.status === 'payment_detected' ||
    invoice.status === 'confirming' ||
    invoice.status === 'confirmed' ||
    invoice.status === 'underpaid' ||
    invoice.status === 'overpaid_manual_review' ||
    invoice.status === 'overpaid';

  const getStep3Desc = () => {
    if (invoice.status === 'underpaid') {
      return 'Shortfall detected • Waiting for full payment';
    }
    if (invoice.status === 'overpaid_manual_review' || invoice.status === 'overpaid') {
      return 'Manual compliance & operator review in progress';
    }
    return `${invoice.confirmations} of ${invoice.requiredConfirmations} on ${netConfig.name}`;
  };

  const steps = [
    {
      id: 1,
      title: 'Invoice Created',
      desc: 'Quote locked for 15 mins',
      completed: true,
      current: false
    },
    {
      id: 2,
      title: 'Transaction Broadcast',
      desc: isDetectedOrBeyond ? 'Payment detected on-chain' : 'Awaiting network mempool detection',
      completed: isDetectedOrBeyond,
      current: invoice.status === 'awaiting_payment'
    },
    {
      id: 3,
      title: 'Block Confirmations & Review',
      desc: getStep3Desc(),
      completed: invoice.status === 'confirmed',
      current:
        invoice.status === 'confirming' ||
        invoice.status === 'payment_detected' ||
        invoice.status === 'overpaid_manual_review' ||
        invoice.status === 'overpaid'
    },
    {
      id: 4,
      title: 'License Delivery',
      desc: 'Instant cryptographic token activation',
      completed: invoice.status === 'confirmed',
      current: false
    }
  ];

  const handleGenerateClick = () => {
    if (invoice.status === 'awaiting_payment') {
      setShowConfirmDialog(true);
    } else {
      onGenerateNewInvoice();
    }
  };

  const handleConfirmNewInvoice = () => {
    setShowConfirmDialog(false);
    onGenerateNewInvoice();
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-violet-100 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          <FileText className="w-3.5 h-3.5 text-violet-600" />
          <span>Payment Status</span>
        </div>
        {getStatusBadge()}
      </div>

      {/* Description message */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
        {getStatusMessage()}
      </div>

      {/* Dedicated Underpaid / Shortfall Warning Callout */}
      {invoice.status === 'underpaid' && (
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Payment Shortfall Detected</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-rose-200/80">
            <div>
              <span className="text-slate-500 block">Required Amount:</span>
              <span className="font-mono font-bold text-slate-900">
                {invoice.cryptoAmountFormatted} {invoice.asset}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Received Amount:</span>
              <span className="font-mono font-bold text-rose-600">
                {invoice.receivedAmount} {invoice.asset}
              </span>
            </div>
            {invoice.underpaidAmount && (
              <div className="col-span-2 pt-1.5 border-t border-rose-100">
                <span className="text-slate-500 block">Remaining Shortfall:</span>
                <span className="font-mono font-bold text-rose-700">
                  {invoice.underpaidAmount.toFixed(6)} {invoice.asset}
                </span>
              </div>
            )}
          </div>
          <p className="text-[11px] text-rose-800 leading-relaxed">
            The full required payment has not yet been received. Automatic license activation will proceed once the remaining shortfall is detected.
          </p>
        </div>
      )}

      {/* Dedicated Overpayment Manual Review Callout */}
      {(invoice.status === 'overpaid_manual_review' || invoice.status === 'overpaid') && (
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Manual Review Required</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-amber-200/80">
            <div>
              <span className="text-slate-500 block">Invoice Required:</span>
              <span className="font-mono font-bold text-slate-900">
                {invoice.cryptoAmountFormatted} {invoice.asset}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Amount Received:</span>
              <span className="font-mono font-bold text-amber-700">
                {invoice.receivedAmount} {invoice.asset}
              </span>
            </div>
            {invoice.overpaidUsdAmount !== undefined && (
              <div className="col-span-2 pt-1.5 border-t border-amber-100">
                <span className="text-slate-500 block">Excess Amount:</span>
                <span className="font-mono font-bold text-amber-800">
                  +${invoice.overpaidUsdAmount.toFixed(2)} USD (exceeds $200 threshold)
                </span>
              </div>
            )}
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Your transaction has been securely confirmed on the blockchain. Because the payment exceeds the automated fulfillment limit by more than $200 USD, our support team is conducting a manual review before license provisioning.
          </p>
        </div>
      )}

      {/* Verification Timeline Steps */}
      <div className="space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Settlement Timeline
        </div>

        <div className="space-y-2.5 relative">
          <div className="absolute top-3 left-3 bottom-3 w-0.5 bg-slate-200 -z-0" />

          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 relative z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                step.completed
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : step.current
                  ? 'bg-violet-600 text-white ring-4 ring-violet-100'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {step.completed ? '✓' : step.id}
              </div>

              <div className="text-xs">
                <div className={`font-semibold ${step.completed || step.current ? 'text-slate-900' : 'text-slate-500'}`}>
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-500">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Transaction Hash info */}
      {invoice.transactionHash && (
        <div className="p-3 rounded-xl bg-violet-50/70 border border-violet-200 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800">Detected Transaction Hash</span>
            {invoice.explorerUrl && (
              <a
                href={invoice.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-700 hover:text-violet-900 flex items-center gap-1 font-medium hover:underline text-[11px]"
              >
                <span>Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="font-mono text-[11px] text-slate-600 break-all select-all bg-white p-2 rounded border border-violet-100">
            {invoice.transactionHash}
          </div>
        </div>
      )}

      {/* Summary Specs */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
        <div className="flex justify-between items-center">
          <span>Invoice Ref:</span>
          <span className="font-mono font-bold text-slate-900">{invoice.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>License Plan:</span>
          <span className="font-semibold text-slate-900">{invoice.planName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>License Type:</span>
          <span className="capitalize text-slate-900">{invoice.planType}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Fixed USD Price:</span>
          <span className="font-bold text-slate-900">${invoice.usdAmount.toLocaleString('en-US')} USD</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Settlement Asset:</span>
          <div className="flex items-center gap-1.5 font-semibold text-slate-900">
            <CryptoNetworkIcon
              asset={invoice.asset}
              network={invoice.network}
              size="xs"
              showNetworkBadge={true}
            />
            <span>{invoice.asset} ({netConfig.name})</span>
          </div>
        </div>
      </div>

      {/* Explicit Generate New Invoice CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleGenerateClick}
          disabled={isGeneratingNew}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-violet-50 hover:text-violet-900 border border-slate-200 hover:border-violet-300 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isGeneratingNew ? 'animate-spin' : ''}`} />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Modal Confirmation for Generating New Invoice if Active */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Generate a New Invoice?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your current payment quote ({invoice.id}) will no longer be the active checkout. The system will advance to the next rotation slot and fetch a fresh crypto quote.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmNewInvoice}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors cursor-pointer shadow-sm"
              >
                Confirm & Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

