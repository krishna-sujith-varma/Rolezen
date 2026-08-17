'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Mail,
  Mic,
  Briefcase,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowUp,
  ArrowDown,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Badge, Button, ProgressRing } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

interface TabItem {
  id: string;
  label: string;
  badge?: string;
  isSoon?: boolean;
  icon: React.ElementType;
}

export const ProductBrowser: React.FC<{ onOpenSoonModal?: (feature: string) => void }> = ({
  onOpenSoonModal,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('resume');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const tabs: TabItem[] = [
    { id: 'resume', label: 'Create Resumes', icon: FileText },
    { id: 'cover-letter', label: 'Cover Letters', badge: 'Soon', isSoon: true, icon: Mail },
    { id: 'interview', label: 'AI Interview Prep', badge: 'Soon', isSoon: true, icon: Mic },
    { id: 'job-tracker', label: 'Job Search & Tracker', badge: 'Soon', isSoon: true, icon: Briefcase },
  ];

  const duration = 7000; // 7 seconds per slide

  // Auto-cycle tabs
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const currentIndex = tabs.findIndex((t) => t.id === activeTab);
          const nextIndex = (currentIndex + 1) % tabs.length;
          setActiveTab(tabs[nextIndex].id);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeTab, isPaused, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setProgress(0);
    setIsPaused(true);
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto rounded-3xl border border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#070A10] shadow-2xl overflow-hidden select-none transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Browser Bar (Tabs with Auto-cycling Progress) */}
      <div className="bg-[#F1F5F9] dark:bg-[#0B0F19] border-b border-[#E2E8F0] dark:border-slate-800 px-4 sm:px-6 pt-3 flex items-center justify-between gap-4 overflow-x-auto">
        {/* macOS Style Window Controls */}
        <div className="hidden sm:flex items-center gap-2 pr-4 shrink-0">
          <div className="h-3 w-3 rounded-full bg-rose-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-start sm:justify-center overflow-x-auto py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  'relative flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0',
                  isActive
                    ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white shadow-xs border-t border-x border-[#E2E8F0] dark:border-slate-800'
                    : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#16A34A] dark:text-[#22C55E]' : '')} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-md border border-amber-300/40">
                    {tab.badge}
                  </span>
                )}

                {/* Active Tab Progress Indicator Underline */}
                {isActive && !isPaused && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E2E8F0] dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-[#16A34A] dark:bg-[#22C55E] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Badge status="primary" className="text-[10px] font-bold py-0.5">
            Rolezen Studio
          </Badge>
        </div>
      </div>

      {/* Main Tab Content Canvas */}
      <div className="p-4 sm:p-8 md:p-10 bg-white dark:bg-[#0F172A] min-h-[460px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* TAB 1: Real-Time Resume Studio */}
          {activeTab === 'resume' && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            >
              {/* Left Column: Interactive Map & ATS Score */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between bg-[#F8FAFC] dark:bg-slate-900/80 p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <ProgressRing score={94} size={64} strokeWidth={6} label="" />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] dark:text-[#22C55E]">
                        <ShieldCheck className="h-4 w-4" />
                        <span>ATS Verified (94/100)</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] dark:text-slate-400">Workday & Taleo Compliant</p>
                    </div>
                  </div>
                  <Badge status="success" className="text-[10px]">98% Pass Rate</Badge>
                </div>

                {/* Section Appearance Cards with Reorder Arrows & Locked Personal Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-slate-800 text-xs font-bold text-[#0F172A] dark:text-white">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span>Personal Info (Locked Top)</span>
                    </div>
                    <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-normal">Contact Header</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-[#16A34A]/40 dark:border-[#16A34A]/40 text-xs font-bold text-[#0F172A] dark:text-white shadow-xs">
                    <span>Work Experience</span>
                    <div className="flex items-center gap-1 text-[#64748B] dark:text-slate-400">
                      <ArrowUp className="h-3.5 w-3.5 hover:text-[#16A34A]" />
                      <ArrowDown className="h-3.5 w-3.5 hover:text-[#16A34A]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold text-[#0F172A] dark:text-white">
                    <span>Education & Degrees</span>
                    <div className="flex items-center gap-1 text-[#64748B] dark:text-slate-400">
                      <ArrowUp className="h-3.5 w-3.5 hover:text-[#16A34A]" />
                      <ArrowDown className="h-3.5 w-3.5 hover:text-[#16A34A]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold text-[#0F172A] dark:text-white">
                    <span>Skills & Technologies</span>
                    <div className="flex items-center gap-1 text-[#64748B] dark:text-slate-400">
                      <ArrowUp className="h-3.5 w-3.5 hover:text-[#16A34A]" />
                      <ArrowDown className="h-3.5 w-3.5 hover:text-[#16A34A]" />
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-xs h-10 font-bold"
                  onClick={() => router.push('/studio/builder')}
                >
                  Launch Live Studio Builder →
                </Button>
              </div>

              {/* Right Column: Live A4 Canvas Preview */}
              <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-inner">
                <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white">Alex Vance</h3>
                    <p className="text-xs text-[#16A34A] dark:text-[#22C55E] font-semibold">Senior Staff Frontend Architect</p>
                  </div>
                  <Badge status="primary" className="text-[10px]">A4 Format</Badge>
                </div>

                <div className="space-y-3 text-xs text-[#475569] dark:text-slate-300">
                  <div className="space-y-1">
                    <p className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[10px]">
                      Professional Experience
                    </p>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-500/20 space-y-1 shadow-xs">
                      <div className="flex justify-between font-bold text-[#0F172A] dark:text-white">
                        <span>Staff Engineer • Stripe</span>
                        <span className="text-[11px] text-[#64748B] dark:text-slate-400">2022 — Present</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#475569] dark:text-slate-300">
                        • Spearheaded checkout dashboard redesign, optimizing Next.js server components to reduce latency by 42%.
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#475569] dark:text-slate-300">
                        • Architected scalable TypeScript design system powering 18 micro-frontends with 99.9% uptime.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['TypeScript', 'Next.js 15', 'React 19', 'GraphQL', 'Tailwind CSS', 'CI/CD'].map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] rounded text-[10px] font-bold border border-emerald-200 dark:border-emerald-800"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: AI Cover Letter Generator (Soon) */}
          {activeTab === 'cover-letter' && (
            <motion.div
              key="cover-letter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300/40">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Coming Soon in v2.6</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                  Targeted AI Cover Letters in 30 Seconds
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Generate tailored, compelling cover letters that match the job description&apos;s tone, requirements, and hiring manager keywords.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                    <span>Auto-extracts company name & job role from URL</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                    <span>Synchronizes with your active Rolezen resume achievements</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  className="text-xs h-10 font-bold border-[#16A34A] text-[#16A34A] dark:text-[#22C55E]"
                  onClick={() => onOpenSoonModal?.('AI Cover Letter Generator')}
                >
                  Join Early Access Waitlist
                </Button>
              </div>

              <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-[#E2E8F0] dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">Drafting for: Google • Senior Frontend Role</span>
                  <Badge status="warning">AI Synthesized</Badge>
                </div>
                <div className="space-y-2.5 text-xs text-[#475569] dark:text-slate-300 italic leading-relaxed bg-white dark:bg-slate-800 p-4 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                  <p>&ldquo;Dear Hiring Team at Google,</p>
                  <p>
                    I am excited to apply for the Senior Frontend Engineer role. With over 8 years architecting enterprise React & Next.js applications, I specialize in building sub-50ms web interfaces that serve millions of active users...&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: AI Interview Practice (Soon) */}
          {activeTab === 'interview' && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300/40">
                  <Mic className="h-3.5 w-3.5" />
                  <span>Coming Soon in v2.6</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                  Real-time AI Mock Interview Practice
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Practice behavioral & technical questions tailored to your target company with instantaneous scorecards and confidence feedback.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                    <span>STAR Method answer structuring coach</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                    <span>Speech pace, filler word & clarity analysis</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  className="text-xs h-10 font-bold border-[#16A34A] text-[#16A34A] dark:text-[#22C55E]"
                  onClick={() => onOpenSoonModal?.('AI Interview Practice')}
                >
                  Get Invited to Beta
                </Button>
              </div>

              <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] dark:text-white">
                    <div className="h-2 w-2 rounded-full bg-[#16A34A] animate-ping" />
                    <span>Simulation: System Architecture Q3</span>
                  </div>
                  <Badge status="success">Confidence: 91%</Badge>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700 space-y-3">
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white">
                    AI Question: &ldquo;Tell me about a time you optimized a slow web application under high traffic?&rdquo;
                  </p>
                  <div className="p-3 bg-[#DCFCE7]/40 dark:bg-emerald-950/40 rounded-lg text-[11px] text-[#14532D] dark:text-emerald-300 font-semibold space-y-1">
                    <p className="font-bold text-[#16A34A] dark:text-[#22C55E]">✨ AI Coach Feedback:</p>
                    <p>Great STAR framework structure! Mentioning the 42% latency metric demonstrated clear measurable impact.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Job Search & Application Tracker (Soon) */}
          {activeTab === 'job-tracker' && (
            <motion.div
              key="job-tracker"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300/40">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>Coming Soon in v2.6</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                  Built-in Job Search & Pipeline Kanban
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Track all your active job applications in one visual pipeline with automated resume version matching.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                    <span>Single-click 1-to-1 resume version attachment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                    <span>Interview date reminders & follow-up scheduler</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  className="text-xs h-10 font-bold border-[#16A34A] text-[#16A34A] dark:text-[#22C55E]"
                  onClick={() => onOpenSoonModal?.('Job Application Tracker')}
                >
                  Request Early Access
                </Button>
              </div>

              <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-sm">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 space-y-2">
                    <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-400 uppercase">Applied (4)</span>
                    <div className="p-2 bg-[#F8FAFC] dark:bg-slate-900 rounded-lg text-left text-xs font-bold text-[#0F172A] dark:text-white shadow-xs">
                      Stripe • Staff SWE
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-[#16A34A]/40 dark:border-[#16A34A]/40 space-y-2">
                    <span className="text-[11px] font-bold text-[#16A34A] dark:text-[#22C55E] uppercase">Interview (2)</span>
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg text-left text-xs font-bold text-[#16A34A] dark:text-[#22C55E] shadow-xs">
                      Linear • Lead SWE
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 space-y-2">
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Offer (1)</span>
                    <div className="p-2 bg-amber-50 dark:bg-amber-950/60 rounded-lg text-left text-xs font-bold text-amber-700 dark:text-amber-300 shadow-xs">
                      Vercel • Staff Arch
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
