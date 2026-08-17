'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, FileText, Globe } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatusBarProps {
  wordCount?: number;
  charCount?: number;
  atsScore?: number;
  version?: string;
  targetJob?: string;
  isSaving?: boolean;
}

export const StudioStatusBar: React.FC<StatusBarProps> = ({
  wordCount = 0,
  charCount = 0,
  atsScore = 90,
  version = 'v2.4',
  targetJob = 'Senior Staff Frontend Architect',
  isSaving = false,
}) => {
  // Score color threshold
  const scoreColor =
    atsScore >= 90
      ? 'text-[#22C55E]'
      : atsScore >= 75
      ? 'text-amber-400'
      : 'text-rose-400';

  return (
    <footer className="h-7 bg-[#0F172A] dark:bg-[#090D16] text-[#94A3B8] px-3 sm:px-5 flex items-center justify-between text-[11px] font-mono select-none z-30 shrink-0 border-t border-white/10 dark:border-slate-800 transition-colors">
      {/* Left: Document Metrics & Live Auto-save */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-1.5 text-[#22C55E]">
          {isSaving ? (
            <>
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400">Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3 w-3" />
              <span>Auto-Saved</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <span>
            <strong className="text-white font-semibold">{wordCount}</strong> Words
          </span>
          <span className="text-[#64748B]">•</span>
          <span>
            <strong className="text-white font-semibold">{charCount}</strong> Characters
          </span>
        </div>

        <div className={cn('hidden md:flex items-center gap-1.5 font-bold', scoreColor)}>
          <ShieldCheck className="h-3 w-3" />
          <span>ATS Score: {atsScore}/100</span>
        </div>
      </div>

      {/* Right: Target Role, Version & Sync Status */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden lg:flex items-center gap-1.5 text-[#CBD5E1] truncate max-w-[240px]">
          <FileText className="h-3 w-3 text-[#16A34A] shrink-0" />
          <span className="truncate">Target: {targetJob || 'Not set'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.2 bg-white/10 text-white rounded text-[10px] hidden xs:inline-block">
            {version}
          </span>
          <div className="flex items-center gap-1 text-[#22C55E]">
            <Globe className="h-3 w-3" />
            <span className="hidden sm:inline">Sync Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
