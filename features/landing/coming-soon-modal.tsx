'use client';

import React, { useState } from 'react';
import { Modal, Button, Input } from '@/components/ui';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  featureName,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Early Access Beta">
      {isSubmitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-[#DCFCE7] dark:bg-emerald-950 text-[#16A34A] dark:text-[#22C55E] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">You&apos;re on the VIP Waitlist!</h3>
          <p className="text-xs text-[#64748B] dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            We added <strong className="text-[#0F172A] dark:text-white">{email}</strong>. You will receive an exclusive early invite and a free lifetime bonus when <strong>{featureName}</strong> launches in v2.6.
          </p>
          <Button variant="primary" size="sm" onClick={handleReset} className="mt-2 text-xs font-semibold px-6">
            Got it, thanks!
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 font-semibold">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>{featureName}</strong> is scheduled for release in the upcoming Rolezen v2.6 update!
            </span>
          </div>

          <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
            Be the first to test this tool. Enter your email below to receive private beta access and unlock 3 months of Pro features free.
          </p>

          <Input
            label="Your Work or Personal Email"
            type="email"
            placeholder="alex.vance@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={handleReset} className="text-xs">
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isLoading}
              className="text-xs font-semibold"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Get Early Invite
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
