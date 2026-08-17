'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Sparkles,
  Bot,
  Search,
  PenTool,
  AlignLeft,
  Mail,
  Mic,
  Briefcase,
  LogOut,
  GraduationCap,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

export interface ToolsSuiteProps {
  onOpenSoonModal: (featureName: string) => void;
}

export const ToolsSuite: React.FC<ToolsSuiteProps> = ({ onOpenSoonModal }) => {
  const router = useRouter();

  const resumeTools = [
    {
      id: 'builder',
      name: 'AI Resume Builder',
      desc: 'Build recruiter-approved A4 resumes with zero page overflow.',
      status: 'active',
      badge: 'Live',
      icon: FileText,
      action: () => router.push('/studio/builder'),
    },
    {
      id: 'ats-checker',
      name: 'Real-Time ATS Checker',
      desc: 'Synchronous 0-100 ATS scoring with Workday & Taleo compliance check.',
      status: 'active',
      badge: 'Live',
      icon: ShieldCheck,
      action: () => router.push('/studio/builder'),
    },
    {
      id: 'ai-agent',
      name: 'AI Resume Agent',
      desc: 'Conversational AI agent to rewrite, tailor, and critique your resume.',
      status: 'soon',
      badge: 'Soon',
      icon: Bot,
      action: () => onOpenSoonModal('AI Resume Agent'),
    },
    {
      id: 'keyword-scanner',
      name: 'Job Description Keyword Scanner',
      desc: 'Diff scanner that highlights missing hard skills against any job description.',
      status: 'soon',
      badge: 'Soon',
      icon: Search,
      action: () => onOpenSoonModal('Job Keyword Scanner'),
    },
    {
      id: 'bullet-writer',
      name: 'Google XYZ Bullet Point Writer',
      desc: 'Generates quantified bullets with high-impact power action verbs.',
      status: 'soon',
      badge: 'Soon',
      icon: PenTool,
      action: () => onOpenSoonModal('XYZ Bullet Point Writer'),
    },
    {
      id: 'summary-generator',
      name: 'Professional Summary Generator',
      desc: 'Creates concise 3-sentence career summaries tailored to your target role.',
      status: 'soon',
      badge: 'Soon',
      icon: AlignLeft,
      action: () => onOpenSoonModal('Resume Summary Generator'),
    },
  ];

  const careerTools = [
    {
      id: 'cover-letter',
      name: 'AI Cover Letter Generator',
      desc: 'Generates customized cover letters matched to company tone in 30 seconds.',
      status: 'soon',
      badge: 'Soon',
      icon: Mail,
      action: () => onOpenSoonModal('AI Cover Letter Generator'),
    },
    {
      id: 'interview-prep',
      name: 'AI Mock Interview Simulator',
      desc: 'Real-time video/voice interview practice with STAR framework feedback.',
      status: 'soon',
      badge: 'Soon',
      icon: Mic,
      action: () => onOpenSoonModal('AI Interview Simulator'),
    },
    {
      id: 'job-tracker',
      name: 'Job Search & Application Kanban',
      desc: 'Visual board to track stages, interview dates, and attached resume versions.',
      status: 'soon',
      badge: 'Soon',
      icon: Briefcase,
      action: () => onOpenSoonModal('Job Application Tracker'),
    },
    {
      id: 'resignation-letter',
      name: 'Resignation Letter Generator',
      desc: 'Professional, polite resignation templates for seamless career transitions.',
      status: 'soon',
      badge: 'Soon',
      icon: LogOut,
      action: () => onOpenSoonModal('Resignation Letter Generator'),
    },
    {
      id: 'enterprise-workspace',
      name: 'University & Team Workspace',
      desc: 'Bulk seats, SSO, and centralized resume review portal for organizations.',
      status: 'soon',
      badge: 'Soon',
      icon: GraduationCap,
      action: () => onOpenSoonModal('University & Team Workspace'),
    },
  ];

  return (
    <section id="tools" className="py-24 bg-white dark:bg-[#0B0F19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary" className="text-xs font-bold uppercase tracking-wider">
            All-in-One Career Intelligence Suite
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            Complete Toolkit for Job Search Success
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed">
            From smart resume crafting and live ATS scoring to AI interview simulations. Everything you need to get hired.
          </p>
        </div>

        {/* Group 1: Resume Creation & Optimization Suite */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#16A34A] dark:text-[#22C55E]" />
              <span>Resume Building & ATS Optimization</span>
            </h3>
            <span className="text-xs text-[#64748B] dark:text-slate-400 font-semibold">6 Modules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTools.map((tool, idx) => {
              const Icon = tool.icon;
              const isLive = tool.status === 'active';
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                >
                  <Card
                    variant="hoverable"
                    padding="md"
                    onClick={tool.action}
                    className={cn(
                      'h-full flex flex-col justify-between rounded-2xl border transition-all cursor-pointer group p-6 space-y-4',
                      isLive
                        ? 'border-[#16A34A]/40 dark:border-[#16A34A]/40 bg-white dark:bg-[#0F172A] hover:border-[#16A34A]'
                        : 'border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC]/60 dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-700'
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            'h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105',
                            isLive
                              ? 'bg-[#DCFCE7] dark:bg-emerald-950/80 text-[#16A34A] dark:text-[#22C55E]'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider',
                            isLive
                              ? 'bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950 dark:text-[#22C55E]'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40'
                          )}
                        >
                          {tool.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#16A34A] dark:group-hover:text-[#22C55E] transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                      <span className={isLive ? 'text-[#16A34A] dark:text-[#22C55E]' : 'text-[#64748B] dark:text-slate-400'}>
                        {isLive ? 'Open Studio Tool' : 'Join Waitlist'}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Group 2: Career Acceleration & Tools Suite */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Career Acceleration & Applications Suite</span>
            </h3>
            <span className="text-xs text-[#64748B] dark:text-slate-400 font-semibold">5 Modules (Soon)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                >
                  <Card
                    variant="hoverable"
                    padding="md"
                    onClick={tool.action}
                    className="h-full flex flex-col justify-between rounded-2xl border border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC]/60 dark:bg-slate-900/40 hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all cursor-pointer group p-6 space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-11 w-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-105">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40">
                          {tool.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#64748B] dark:text-slate-400">
                      <span>Get VIP Early Access</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
