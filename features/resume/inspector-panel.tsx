'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, X, Check, ArrowRight, AlertTriangle, Plus, CheckCircle2, Zap } from 'lucide-react';
import { ProgressRing, ProgressBar, Badge, Button } from '@/components/ui';
import { ResumeMetrics } from '@/lib/ats-calculator';
import { cn } from '@/utils/cn';

export interface InspectorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'ats' | 'ai';
  metrics: ResumeMetrics;
  onAddSkillKeyword?: (keyword: string) => void;
  onApplyAISuggestion?: (suggestion: string) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  isOpen,
  onClose,
  mode,
  metrics,
  onAddSkillKeyword,
  onApplyAISuggestion,
}) => {
  const [activeTab, setActiveTab] = useState<'ats' | 'ai'>(mode);

  React.useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  const aiSuggestions = [
    {
      id: '1',
      category: 'Metrics Impact Boost',
      original: 'Responsible for leading frontend team and writing components.',
      recommended: 'Spearheaded 6-person frontend engineering squad, architecting 24 reusable React components.',
      impact: '+18% Score',
    },
    {
      id: '2',
      category: 'Power Action Verb',
      original: 'Worked on web app speed optimization.',
      recommended: 'Optimized Next.js bundle sizes and image pipeline, reducing LCP page load time by 42%.',
      impact: '+24% Score',
    },
    {
      id: '3',
      category: 'ATS Keyword Alignment',
      original: 'Built APIs and databases for backend services.',
      recommended: 'Engineered high-throughput TypeScript REST microservices backed by PostgreSQL with sub-50ms latency.',
      impact: '+15% Score',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 340 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 340 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-14 right-0 bottom-7 z-30 w-full sm:w-96 bg-white dark:bg-[#0F172A] border-l border-[#E2E8F0] dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors"
        >
          {/* Inspector Header */}
          <div className="p-3.5 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('ats')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'ats'
                    ? 'bg-[#0F172A] dark:bg-[#16A34A] text-white'
                    : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>ATS Live ({metrics.atsScore})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'ai'
                    ? 'bg-[#0F172A] dark:bg-[#16A34A] text-white'
                    : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#22C55E]" />
                <span>AI Copilot</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close inspector panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Inspector Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white dark:bg-[#0F172A]">
            {/* MODE 1: ATS Live Inspector */}
            {activeTab === 'ats' && (
              <div className="space-y-6">
                {/* Top Score Banner */}
                <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-slate-800 rounded-2xl">
                  <ProgressRing score={metrics.atsScore} size={88} strokeWidth={9} label="" />
                  <div className="space-y-1">
                    <Badge
                      status={metrics.atsScore >= 85 ? 'success' : metrics.atsScore >= 70 ? 'warning' : 'neutral'}
                    >
                      {metrics.atsScore >= 85 ? 'Verified ATS Pass' : metrics.atsScore >= 70 ? 'Needs Keyword Boost' : 'Incomplete Draft'}
                    </Badge>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">Workday & Taleo Ready</p>
                    <p className="text-[11px] text-[#64748B] dark:text-slate-400">
                      {metrics.quantifiedBulletCount} quantified bullets • {metrics.actionVerbCount} action verbs
                    </p>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider">
                    Real-time Metrics Breakdown
                  </h4>
                  <ProgressBar label="Formatting Compliance" value={metrics.formattingScore} />
                  <ProgressBar label="Skills Alignment" value={metrics.skillsScore} />
                  <ProgressBar label="Keyword Match Rate" value={metrics.keywordsScore} />
                  <ProgressBar label="Readability & Tone" value={metrics.readabilityScore} />
                </div>

                {/* Missing & Recommended Keywords */}
                {metrics.missingKeywords.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
                    <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center justify-between">
                      <span>Missing Target Keywords</span>
                      <span className="text-[10px] text-[#16A34A] lowercase font-normal">click to add</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {metrics.missingKeywords.map((kw) => (
                        <button
                          key={kw.keyword}
                          type="button"
                          onClick={() => onAddSkillKeyword?.(kw.keyword)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800 rounded-lg hover:border-amber-400 transition-colors cursor-pointer"
                          title={`Add ${kw.keyword} to Skills`}
                        >
                          <Plus className="h-3 w-3" />
                          <span>{kw.keyword}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actionable Insights */}
                {metrics.actionableInsights.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
                    <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider">
                      Actionable Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {metrics.actionableInsights.map((insight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 p-2.5 bg-[#F8FAFC] dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-slate-800 rounded-xl text-xs text-[#475569] dark:text-slate-300 leading-relaxed"
                        >
                          <Zap className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* MODE 2: AI Copilot Inspector */}
            {activeTab === 'ai' && (
              <div className="space-y-5">
                <div className="p-4 bg-[#DCFCE7] dark:bg-emerald-950/40 border border-[#16A34A]/30 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#16A34A] dark:text-[#22C55E]">
                    <Sparkles className="h-4 w-4" />
                    <span>Copilot Bullet Optimizer</span>
                  </div>
                  <p className="text-xs text-[#14532D] dark:text-emerald-300">
                    Click Accept on any suggested enhancement to replace text directly.
                  </p>
                </div>

                <div className="space-y-4">
                  {aiSuggestions.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-slate-700 rounded-2xl space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">{item.category}</span>
                        <Badge status="primary">{item.impact}</Badge>
                      </div>
                      <p className="text-xs text-[#64748B] dark:text-slate-400 line-through">{item.original}</p>
                      <p className="text-xs font-semibold text-[#0F172A] dark:text-white bg-[#F8FAFC] dark:bg-slate-900 p-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                        ✨ {item.recommended}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 text-xs h-9"
                          leftIcon={<Check className="h-3.5 w-3.5" />}
                          onClick={() => onApplyAISuggestion?.(item.recommended)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-9 dark:text-slate-400 dark:hover:text-white"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Inspector Footer */}
          <div className="p-3 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19] text-[11px] text-[#64748B] dark:text-slate-400 text-center shrink-0">
            Rolezen Live ATS Tracker • v2.4
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
