'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, FileText, Globe } from 'lucide-react';

export interface StatusBarProps {
  wordCount?: number;
  charCount?: number;
  atsScore?: number;
  version?: string;
  targetJob?: string;
}

export const StudioStatusBar: React.FC<StatusBarProps> = ({
  wordCount = 482,
  charCount = 3120,
  atsScore = 91,
  version = 'v2.4',
  targetJob = 'Senior Staff Frontend Architect',
}) => {
  return (
    <footer className="h-7 bg-[#0F172A] text-[#94A3B8] px-4 flex items-center justify-between text-[11px] font-mono select-none z-30 shrink-0 border-t border-white/10">
      {/* Left: Document Metrics & Auto-save */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-[#22C55E]">
          <CheckCircle2 className="h-3 w-3" />
          <span>Auto-Saved</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>{wordCount} Words</span>
          <span className="text-[#64748B]">•</span>
          <span>{charCount} Characters</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="h-3 w-3" />
          <span>ATS Score: {atsScore}/100</span>
        </div>
      </div>

      {/* Right: Target Role & Version */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-1.5 text-[#CBD5E1]">
          <FileText className="h-3 w-3 text-[#16A34A]" />
          <span>Target: {targetJob}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.2 bg-white/10 text-white rounded text-[10px]">{version}</span>
          <div className="flex items-center gap-1 text-[#22C55E]">
            <Globe className="h-3 w-3" />
            <span className="hidden sm:inline">Sync Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
