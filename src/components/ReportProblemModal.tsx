import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, CheckCircle2, Send, Loader2, MessageSquareWarning } from 'lucide-react';

export interface ReportProblemData {
  email: string;
  subject?: string;
  message: string;
}

export interface ReportProblemResponse {
  success: boolean;
  message: string;
}

/**
 * Isolated contact problem submission service.
 * Structured so that backend SMTP / API endpoint credentials
 * can be hooked in without redesigning the UI.
 */
export async function submitProblemReport(
  data: ReportProblemData
): Promise<ReportProblemResponse> {
  // Simulating async client validation & preparation
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Note: Local front-end preparation state.
  // Backend / SMTP service integration can be attached here in the future.
  return {
    success: true,
    message: 'Your message has been prepared successfully. Email delivery will be connected when the support mail service is configured.'
  };
}

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreparedSuccess, setIsPreparedSuccess] = useState(false);

  // Refs for accessibility & focus trapping
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const MAX_MESSAGE_LENGTH = 2000;

  // Reset form when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
      setIsSubmitting(false);
      setIsPreparedSuccess(false);

      // Focus first input after animation
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
        onClose();
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
  }, [isOpen, onClose]);

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
    // RFC 5322 simplified email standard validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(val.trim());
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; message?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitProblemReport({
        email: email.trim(),
        subject: subject.trim() || undefined,
        message: message.trim()
      });

      if (response.success) {
        setIsPreparedSuccess(true);
      }
    } catch {
      setErrors({
        message: 'An unexpected issue occurred while preparing your message. Please try again.'
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
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-violet-50/80 border border-transparent hover:border-violet-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/30"
        >
          <X className="w-5 h-5" />
        </button>

        {!isPreparedSuccess ? (
          <div className="space-y-6">
            {/* Header & Supporting Text */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider">
                <MessageSquareWarning className="w-3.5 h-3.5 text-violet-600" />
                <span>Support &amp; Issue Triage</span>
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
                Tell us what went wrong and we'll review your message.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
              
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

              {/* Subject (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="report-subject-input"
                  className="text-xs font-bold text-slate-700 flex items-center justify-between"
                >
                  <span>Subject</span>
                  <span className="text-[11px] font-normal text-slate-400">Optional</span>
                </label>
                <input
                  id="report-subject-input"
                  type="text"
                  maxLength={120}
                  disabled={isSubmitting}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What can we help you with?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200/90 hover:border-violet-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 shadow-2xs"
                />
              </div>

              {/* Message (Required) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="report-message-input"
                    className="text-xs font-bold text-slate-700"
                  >
                    Message <span className="text-violet-600">*</span>
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
                  placeholder="Describe your problem or message..."
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

              {/* Submission CTA */}
              <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  id="btn-send-report-message"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 active:scale-98 ${
                    isSubmitting
                      ? 'bg-violet-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/30'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* =========================================================
             CLEAN CONFIRMATION / TEMPORARY PREPARED STATE
             Replaces form contents with:
             ✓
             Message Ready
             "Thank you. Your message has been prepared successfully."
             [ Close ]
             ========================================================= */
          <div className="text-center py-6 sm:py-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-sm mx-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Message Ready
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-display">
                Thank You
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you. Your message has been prepared successfully.
              </p>
              <p className="text-[11px] text-slate-500 pt-1 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                Email delivery will be connected when the support mail service is configured.
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
