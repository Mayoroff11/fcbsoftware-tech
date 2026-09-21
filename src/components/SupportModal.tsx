import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Deployment Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white/95 border border-violet-200/80 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl my-8 backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-violet-50 border border-violet-100 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Technical Support &amp; Desk Inquiries</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Contact FCB Software Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our engineering desk for node RPC integration, custom script requirements, or licensing assistance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="support-email" className="text-xs font-medium text-slate-700">
                  Your Workstation / Organization Email *
                </label>
                <input
                  id="support-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@desk.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="support-subject" className="text-xs font-medium text-slate-700">
                  Inquiry Topic
                </label>
                <select
                  id="support-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs text-slate-900 focus:outline-none focus:border-violet-500 cursor-pointer shadow-xs"
                >
                  <option value="Deployment Inquiry">Deployment &amp; Installation Inquiry</option>
                  <option value="Node RPC Configuration">Node RPC / Tor Connectivity</option>
                  <option value="Air-Gap Signature Workflow">Air-Gap PSBT Signing Questions</option>
                  <option value="Enterprise Custom Integration">Enterprise Custom Integration</option>
                  <option value="Other Technical Question">Other Technical Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="support-message" className="text-xs font-medium text-slate-700">
                  Message / Technical Details *
                </label>
                <textarea
                  id="support-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your operational environment, node setup, or licensing query..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-none shadow-xs"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-violet-500/25"
                >
                  <span>Transmit Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Inquiry Successfully Logged
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your communication has been dispatched to our engineering desk. A specialist will reply to <strong className="text-slate-900">{email}</strong> within standard support windows.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-colors cursor-pointer shadow-md shadow-violet-500/25"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
