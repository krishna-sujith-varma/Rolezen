'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, X, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { ProgressRing, ProgressBar, Badge, Button } from '@/components/ui';

export interface InspectorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'ats' | 'ai';
  atsScore: number;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  isOpen,
  onClose,
  mode,
  atsScore,
}) => {
  const [activeTab, setActiveTab] = useState<'ats' | 'ai'>(mode);

  React.useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  const aiSuggestions = [
    {
      id: '1',
      category: 'Metrics Impact',
      original: 'Responsible for leading frontend team and writing components.',
      recommended: 'Spearheaded 6-person frontend engineering squad, architecting 24 reusable React components.',
      impact: '+18% Score',
    },
    {
      id: '2',
      category: 'Action Verb Boost',
      original: 'Worked on web app speed optimization.',
      recommended: 'Optimized Next.js bundle sizes and image pipeline, reducing LCP page load time by 42%.',
      impact: '+24% Score',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 320 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 320 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-16 right-0 bottom-7 z-30 w-full sm:w-96 bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Inspector Header */}
          <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E2E8F0] rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('ats')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'ats' ? 'bg-[#0F172A] text-white' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>ATS Report ({atsScore})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'ai' ? 'bg-[#0F172A] text-white' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-[#22C55E]" />
                <span>AI Copilot</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors cursor-pointer"
              aria-label="Close inspector panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Inspector Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* MODE 1: ATS Inspector */}
            {activeTab === 'ats' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
                  <ProgressRing score={atsScore} size={90} strokeWidth={9} label="" />
                  <div>
                    <Badge status="success">Verified ATS Pass</Badge>
                    <p className="text-xs font-bold text-[#0F172A] mt-1">Workday & Taleo Ready</p>
                    <p className="text-[11px] text-[#64748B]">Zero structural parsing errors.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Metrics Breakdown</h4>
                  <ProgressBar label="Formatting Score" value={96} />
                  <ProgressBar label="Skills Alignment" value={94} />
                  <ProgressBar label="Keyword Match" value={88} />
                  <ProgressBar label="Readability Index" value={97} />
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Missing Role Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-1 text-xs bg-amber-50 text-amber-700 font-semibold border border-amber-200 rounded-lg">
                      + GraphQL (Recommended)
                    </span>
                    <span className="px-2 py-1 text-xs bg-amber-50 text-amber-700 font-semibold border border-amber-200 rounded-lg">
                      + Docker (Recommended)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: AI Copilot Inspector */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div className="p-4 bg-[#DCFCE7] border border-[#16A34A]/20 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#16A34A]">
                    <Sparkles className="h-4 w-4" />
                    <span>Copilot Smart Suggestions</span>
                  </div>
                  <p className="text-xs text-[#14532D]">
                    AI recommendations ready for review. Click Accept to apply to editor.
                  </p>
                </div>

                <div className="space-y-4">
                  {aiSuggestions.map((item) => (
                    <div key={item.id} className="p-4 bg-white border border-[#E2E8F0] rounded-2xl space-y-2.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F172A]">{item.category}</span>
                        <Badge status="primary">{item.impact}</Badge>
                      </div>
                      <p className="text-xs text-[#64748B] line-through">{item.original}</p>
                      <p className="text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                        ✨ {item.recommended}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <Button variant="primary" size="sm" className="flex-1 text-xs h-9" leftIcon={<Check className="h-3.5 w-3.5" />}>
                          Accept
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-9">
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
          <div className="p-3 border-t border-[#E2E8F0] bg-[#F8FAFC] text-[11px] text-[#64748B] text-center shrink-0">
            CareerFlow Studio Inspector Engine • v2.4
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
