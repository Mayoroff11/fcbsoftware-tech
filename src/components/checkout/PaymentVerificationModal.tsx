import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Upload,
  Loader2,
  ExternalLink,
  FileText,
  Copy,
  Check,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react';
import type { Invoice, PaymentStatus } from '../../types/payment.ts';
import { NETWORKS } from '../../config/cryptoConfig.ts';
import { PaymentVerificationService } from '../../services/PaymentVerificationService.ts';

interface PaymentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  onVerificationComplete: (updatedInvoice: Invoice) => void;
}

export const PaymentVerificationModal: React.FC<PaymentVerificationModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onVerificationComplete,
}) => {
  const [txHash, setTxHash] = useState('');
  const [email, setEmail] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Status & error states
  const [errors, setErrors] = useState<{ txHash?: string; email?: string; receipt?: string; global?: string }>({});
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    status: PaymentStatus;
    message: string;
    invoice?: Invoice;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const txInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const netConfig = NETWORKS[invoice.network] || NETWORKS.bitcoin;

  // Initialize/reset form when opening modal
  useEffect(() => {
    if (isOpen) {
      setTxHash(invoice.transactionHash || '');
      setEmail(invoice.customerEmail || '');
      setReceiptFile(null);
      setReceiptPreview(null);
      setErrors({});
      setVerificationResult(null);
      setIsSubmitting(false);

      const timer = setTimeout(() => {
        txInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, invoice]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key support
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(invoice.receivingAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setErrors((prev) => ({ ...prev, receipt: 'Please upload an image (PNG, JPG, WEBP) or PDF.' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, receipt: 'Receipt file size must be less than 5MB.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, receipt: undefined }));
    setReceiptFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
    }
  };

  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { txHash?: string; email?: string; receipt?: string; global?: string } = {};

    const trimmedTx = txHash.trim();
    if (!trimmedTx) {
      newErrors.txHash = 'Please enter your transaction hash (TXID).';
    } else if (trimmedTx.length < 16) {
      newErrors.txHash = 'Transaction hash is too short.';
    }

    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email for license delivery.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setVerificationResult(null);

    try {
      let receiptDataUrl: string | undefined = undefined;
      if (receiptFile) {
        receiptDataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(receiptFile);
        });
      }

      const res = await PaymentVerificationService.verifyPayment({
        invoiceId: invoice.id,
        txHash: txHash.trim(),
        customerEmail: email.trim(),
        receiptFileName: receiptFile?.name,
        receiptDataUrl,
      });

      setVerificationResult(res);

      if (res.invoice) {
        onVerificationComplete(res.invoice);
      }

      if (!res.success && res.error) {
        setErrors({ global: res.error });
      }
    } catch (err: any) {
      setErrors({
        global: err?.message || "We couldn't verify this transaction right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConfirmedSuccess =
    verificationResult?.success &&
    (verificationResult.status === 'confirmed' || verificationResult.status === 'confirming');

  const isOverpaidReview = verificationResult?.status === 'overpaid_manual_review' || verificationResult?.status === 'manual_review';

  return (
    <div
      id="payment-verification-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-verification-title"
    >
      <div
        ref={modalRef}
        id="payment-verification-modal-container"
        className="relative w-full max-w-xl bg-white border border-violet-200/90 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl my-auto backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-violet-50 transition-all cursor-pointer focus:outline-none disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Verification Success State */}
        {isConfirmedSuccess && verificationResult?.invoice ? (
          <div className="space-y-6 text-center py-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Payment Verified
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
                Payment Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your payment has been verified successfully. Your license request has been submitted. We'll contact you at:
              </p>
              <div className="font-semibold text-violet-700 bg-violet-50 py-1 px-3 rounded-lg inline-block text-xs sm:text-sm border border-violet-200">
                {email}
              </div>
            </div>

            {/* Transaction Hash Ref */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1 font-mono">
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Verified Transaction Hash</div>
              <div className="break-all text-slate-700">{txHash}</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer shadow-md shadow-violet-500/25"
              >
                View Confirmation
              </button>
            </div>
          </div>
        ) : isOverpaidReview ? (
          /* Overpaid Manual Review State */
          <div className="space-y-6 text-center py-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Manual Review Required
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
                Payment Recorded
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your transaction details have been verified and recorded. Because the payment exceeds the automated threshold, our compliance team is conducting a manual review before license delivery to:
              </p>
              <div className="font-semibold text-violet-700 bg-violet-50 py-1 px-3 rounded-lg inline-block text-xs sm:text-sm border border-violet-200">
                {email}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Normal Submission Form */
          <div className="space-y-5">
            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                <span>Payment Verification</span>
              </div>
              <h2 id="payment-verification-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                Payment Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Already sent your payment? Submit your transaction details below so we can match the payment to your checkout.
              </p>
            </div>

            {/* Current Invoice Summary Card */}
            <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 text-xs grid grid-cols-2 gap-2.5">
              <div>
                <span className="text-slate-500 block text-[11px]">Invoice Ref:</span>
                <span className="font-mono font-bold text-slate-900">{invoice.id}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Selected Plan:</span>
                <span className="font-semibold text-slate-900">{invoice.planName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Expected Payment:</span>
                <span className="font-bold text-violet-700 font-mono">
                  {invoice.cryptoAmountFormatted} {invoice.asset}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Network:</span>
                <span className="font-semibold text-slate-900">{netConfig.name}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-violet-100/80">
                <span className="text-slate-500 block text-[11px]">Assigned Receiving Address ({invoice.walletId.toUpperCase()}):</span>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="font-mono text-[11px] text-slate-700 truncate select-all">{invoice.receivingAddress}</span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-1 rounded text-violet-600 hover:bg-violet-100/60 transition-colors shrink-0"
                    title="Copy address"
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Global Error Banner */}
            {errors.global && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-relaxed">{errors.global}</span>
              </div>
            )}

            {/* Specific Status Messages */}
            {verificationResult?.status === 'transaction_already_used' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Transaction Already Used</span>
                </div>
                <p className="leading-relaxed">
                  This transaction has already been associated with another payment session. Please contact support if you believe this is an error.
                </p>
              </div>
            )}

            {verificationResult?.status === 'payment_not_yet_detected' && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Payment Not Yet Detected</span>
                </div>
                <p className="leading-relaxed">
                  We couldn't verify this transaction yet. If you recently sent the payment, it may still be processing on the network. Please check the transaction hash and try again shortly.
                </p>
              </div>
            )}

            {verificationResult?.status === 'underpaid' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Payment Shortfall Detected</span>
                </div>
                <p className="leading-relaxed">
                  {verificationResult.message}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* 1. Transaction Hash / TXID (Required) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="verify-tx-hash-input" className="text-xs font-bold text-slate-700">
                    Transaction Hash / TXID <span className="text-violet-600">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {netConfig.addressType === 'evm' ? '0x...' : netConfig.name}
                  </span>
                </div>
                <input
                  ref={txInputRef}
                  id="verify-tx-hash-input"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={txHash}
                  onChange={(e) => {
                    setTxHash(e.target.value);
                    if (errors.txHash) setErrors((prev) => ({ ...prev, txHash: undefined }));
                  }}
                  placeholder={`Paste your ${netConfig.name} transaction hash (TXID)`}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm font-mono text-slate-900 placeholder-slate-400 transition-all focus:outline-none shadow-2xs ${
                    errors.txHash
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30'
                      : 'border-violet-200/90 hover:border-violet-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20'
                  }`}
                />
                {errors.txHash && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.txHash}</span>
                  </div>
                )}
              </div>

              {/* 2. Email for Your FCB License (Required) */}
              <div className="space-y-1.5">
                <label htmlFor="verify-email-input" className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>
                    Email for Your FCB License <span className="text-violet-600">*</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">License Delivery</span>
                </label>
                <input
                  id="verify-email-input"
                  type="email"
                  inputMode="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="Enter the email address for your license"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none shadow-2xs ${
                    errors.email
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30'
                      : 'border-violet-200/90 hover:border-violet-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20'
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* 3. Payment Receipt / Screenshot (Optional Supporting Evidence) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Payment Receipt / Screenshot <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Max 5MB (PNG, JPG, PDF)</span>
                </div>

                {!receiptFile ? (
                  <label
                    htmlFor="receipt-file-upload"
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-violet-200 hover:border-violet-400 rounded-xl bg-violet-50/30 hover:bg-violet-50/60 cursor-pointer transition-all text-center"
                  >
                    <Upload className="w-5 h-5 text-violet-500 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">Click to upload transfer screenshot</span>
                    <span className="text-[11px] text-slate-500">Supporting evidence for expedited review</span>
                    <input
                      ref={fileInputRef}
                      id="receipt-file-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      {receiptPreview ? (
                        <img src={receiptPreview} alt="Receipt preview" className="w-8 h-8 rounded object-cover border border-slate-200" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-violet-600 shrink-0" />
                      )}
                      <span className="font-medium text-slate-800 truncate">{receiptFile.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveReceipt}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {errors.receipt && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.receipt}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-center disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  id="btn-verify-submit-payment"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 active:scale-98 ${
                    isSubmitting
                      ? 'bg-violet-400 cursor-not-allowed opacity-90'
                      : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/30'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying On-Chain...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Submit Payment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
