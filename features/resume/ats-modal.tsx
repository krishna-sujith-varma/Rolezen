'use client';

import React from 'react';
import { Modal, ProgressRing, ProgressBar, Badge } from '@/components/ui';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface ATSModalProps {
  isOpen: boolean;
  onClose: () => void;
  atsScore: number;
}

export const ATSModal: React.FC<ATSModalProps> = ({ isOpen, onClose, atsScore }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ATS Diagnostic Scan Results">
      <div className="space-y-6 pt-2">
        <div className="flex items-center gap-6 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
          <ProgressRing score={atsScore} size={90} strokeWidth={8} label="" />
          <div>
            <Badge status="success">Verified ATS Pass (91/100)</Badge>
            <p className="text-xs font-bold text-[#0F172A] mt-1">Workday & Taleo Parser Ready</p>
            <p className="text-[11px] text-[#64748B]">Zero layout violations or unparseable graphics detected.</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Metrics Breakdown</h4>
          <ProgressBar label="Formatting Score" value={96} />
          <ProgressBar label="Skills Match" value={94} />
          <ProgressBar label="Keyword Rate" value={88} />
          <ProgressBar label="Readability Index" value={97} />
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#0F172A] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
          <span>Resume structure satisfies 100% of standard applicant tracking filters.</span>
        </div>
      </div>
    </Modal>
  );
};
