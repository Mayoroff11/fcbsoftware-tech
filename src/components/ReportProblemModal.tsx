import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, CheckCircle2, Send, Loader2, MessageSquareWarning } from 'lucide-react';

export interface ReportProblemData {
  email: string;
  subject: string;
  message: string;
}

export interface ReportProblemResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Sends problem report to the serverless API endpoint.
 * The server handles real Zoho SMTP email delivery securely.
 */
export async function submitProblemReport(
  data: ReportProblemData
): Promise<ReportProblemResponse> {
  const response = await fetch('/api/report-problem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    }),
  });

  let result: ReportProblemResponse;
  try {
    result = await response.json();
  } catch {
    throw new Error("We couldn't send your report right now. Please try again or contact support directly at support@fcbsoftware.tech.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || "We couldn't send your report right now. Please try again or contact support directly at support@fcbsoftware.tech.");
  }

  return result;
}

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Validation & status state
  const [errors, setErrors] = useState<{ email?: string; subject?: string; message?: string; global?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Refs for accessibility & focus trapping
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const MAX_MESSAGE_LENGTH = 5000;
  const MAX_SUBJECT_LENGTH = 200;

  // Reset form when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
      setSuccessMessage('');

      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape key and Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (!isSubmitting) {
          onClose();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  // Lock background scroll when open
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

  if (!isOpen) return null;

  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(val.trim());
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; subject?: string; message?: string; global?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const trimmedSubject = subject.trim();
    if (!trimmedSubject) {
      newErrors.subject = 'Please enter a subject.';
    } else if (trimmedSubject.length > MAX_SUBJECT_LENGTH) {
      newErrors.subject = `Subject cannot exceed ${MAX_SUBJECT_LENGTH} characters.`;
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Please describe the problem you'd like us to review.";
    } else if (trimmedMessage.length < 8) {
      newErrors.message = 'Please provide more details (minimum 8 characters).';
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await submitProblemReport({
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (response.success) {
        setIsSuccess(true);
        setSuccessMessage(
          response.message ||
          'Your report has been sent successfully. Our support team will review it and respond to you by email.'
        );
      } else {
        setErrors({
          global: response.error || "We couldn't send your report right now. Please try again or contact support directly at support@fcbsoftware.tech."
        });
      }
    } catch (err: any) {
      setErrors({
        global: err?.message || "We couldn't send your report right now. Please try again or contact support directly at support@fcbsoftware.tech."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      id="report-problem-modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-problem-title"
      aria-describedby="report-problem-desc"
    >
      <div
        ref={modalRef}
        id="report-problem-modal-container"
        className="relative w-full max-w-lg bg-white/95 border border-violet-200/80 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl my-auto backdrop-blur-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          id="btn-close-report-modal"
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-violet-50/80 border border-transparent hover:border-violet-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="space-y-6">
            {/* Header & Supporting Text */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider">
                <MessageSquareWarning className="w-3.5 h-3.5 text-violet-600" />
                <span>Customer Support</span>
              </div>
              <h2
                id="report-problem-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display"
              >
                Report a Problem
              </h2>
              <p
                id="report-problem-desc"
                className="text-xs sm:text-sm text-slate-600 leading-relaxed"
              >
                Describe the issue you are experiencing and our technical support team will assist you.
              </p>
            </div>

            {/* Global Error Banner */}
            {errors.global && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-relaxed">{errors.global}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Email Address (Required) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="report-email-input"
                  className="text-xs font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>
                    Email Address <span className="text-violet-600">*</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">Required</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="report-email-input"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder="Enter your email address"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none shadow-2xs ${
                    errors.email
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30'
                      : 'border-violet-200/90 hover:border-violet-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error-msg' : undefined}
                />
                {errors.email && (
                  <div
                    id="email-error-msg"
                    className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5 animate-in fade-in duration-150"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Subject (Required) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="report-subject-input"
                  className="text-xs font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>
                    Subject <span className="text-violet-600">*</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">Required</span>
                </label>
                <input
                  id="report-subject-input"
                  type="text"
                  required
                  maxLength={MAX_SUBJECT_LENGTH}
                  disabled={isSubmitting}
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) {
                      setErrors((prev) => ({ ...prev, subject: undefined }));
                    }
                  }}
                  placeholder="What is the issue regarding?"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none shadow-2xs ${
                    errors.subject
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30'
                      : 'border-violet-200/90 hover:border-violet-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20'
                  }`}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error-msg' : undefined}
                />
                {errors.subject && (
                  <div
                    id="subject-error-msg"
                    className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5 animate-in fade-in duration-150"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.subject}</span>
                  </div>
                )}
              </div>

              {/* Problem / Message (Required) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="report-message-input"
                    className="text-xs font-bold text-slate-700"
                  >
                    Problem / Message <span className="text-violet-600">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <textarea
                  id="report-message-input"
                  required
                  rows={4}
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isSubmitting}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  placeholder="Describe your problem or message in detail..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-xs sm:text-sm text-slate-900 placeholder-slate-400 resize-none transition-all focus:outline-none shadow-2xs min-h-[100px] sm:min-h-[120px] ${
                    errors.message
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30'
                      : 'border-violet-200/90 hover:border-violet-300 focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20'
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error-msg' : undefined}
                />
                {errors.message && (
                  <div
                    id="message-error-msg"
                    className="flex items-center gap-1.5 text-xs text-rose-600 pt-0.5 animate-in fade-in duration-150"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submission Buttons */}
              <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-center disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  id="btn-send-report-message"
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
                      <span>Sending Report...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Report</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* =========================================================
             CONFIRMATION / SUCCESS STATE
             Only rendered once server confirms email accepted by Zoho
             ========================================================= */
          <div className="text-center py-6 sm:py-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-sm mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Report Submitted
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
                Report Sent
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {successMessage || 'Your report has been sent successfully. Our support team will review it and respond to you by email.'}
              </p>
            </div>

            <div className="pt-3">
              <button
                id="btn-close-report-success"
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer shadow-md shadow-violet-500/25"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
