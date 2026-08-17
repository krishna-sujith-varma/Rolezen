'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Search, FileText, ArrowUpRight } from 'lucide-react';
import { Badge, Card, ProgressRing } from '@/components/ui';

export const StudioMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'ats' | 'ai'>('editor');

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Outer Glow Backdrop */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#16A34A]/20 via-emerald-400/10 to-[#0F172A]/20 blur-xl opacity-70" />

      {/* Main Studio Frame */}
      <Card className="relative bg-white border border-[#E2E8F0] shadow-xl overflow-hidden p-0 rounded-2xl">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-semibold text-[#0F172A]">CareerFlow Studio — Resume_v2.pdf</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'editor' ? 'bg-[#0F172A] text-white' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Resume Editor
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'ats' ? 'bg-[#0F172A] text-white' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              ATS Report (91)
            </button>
          </div>
        </div>

        {/* Studio Workspace Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          {/* Left Panel: Resume Mini View */}
          <div className="md:col-span-7 p-6 border-r border-[#E2E8F0] space-y-4 bg-white">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">Alex Vance</h3>
              <p className="text-xs font-medium text-[#16A34A]">Senior Staff Frontend Architect</p>
              <p className="text-[11px] text-[#64748B] mt-1">San Francisco, CA • alex.vance@example.com • github.com/alexvance</p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider mb-1">Work Experience</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <span>Staff Frontend Engineer — Vercel</span>
                      <span className="text-[#64748B] text-[10px]">2022 — Present</span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-[#475569] space-y-1 mt-1 leading-relaxed">
                      <li>Architected core dashboard using Next.js App Router, boosting LCP by <span className="font-semibold text-[#16A34A] bg-emerald-50 px-1 rounded">42%</span>.</li>
                      <li>Built reusable design system component library adopted by 14 product teams.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                      <span>Senior UI Engineer — Stripe</span>
                      <span className="text-[#64748B] text-[10px]">2019 — 2022</span>
                    </div>
                    <p className="text-[11px] text-[#475569] mt-0.5">Engineered high-converting checkout flows processing $1.2B+ volume.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider mb-1">Core Competencies</h4>
                <div className="flex flex-wrap gap-1">
                  {['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'System Architecture'].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-[10px] font-medium bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Live AI Suggestions & ATS Breakdown */}
          <div className="md:col-span-5 p-5 bg-[#F8FAFC] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">AI Live Assistant</span>
                <Badge status="primary">Active</Badge>
              </div>

              {/* AI Suggestion Card 1 */}
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Metric Impact Boost</span>
                </div>
                <p className="text-[11px] text-[#475569] leading-tight">
                  Suggested bullet point enhancement increases impact score by <span className="font-semibold text-[#0F172A]">+18%</span>.
                </p>
                <div className="pt-1 text-[10px] text-[#16A34A] font-semibold flex items-center gap-1 cursor-pointer">
                  <span>Apply XYZ Enhancement</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>

              {/* Keyword Match Card */}
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0F172A]">Job Keyword Match</span>
                  <span className="font-bold text-[#16A34A]">88%</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="px-1.5 py-0.5 text-[9px] bg-emerald-50 text-emerald-700 font-semibold rounded">✓ Next.js</span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-emerald-50 text-emerald-700 font-semibold rounded">✓ TypeScript</span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-amber-50 text-amber-700 font-semibold rounded">+ GraphQL</span>
                </div>
              </div>
            </div>

            {/* Bottom ATS Ring Summary */}
            <div className="flex items-center gap-3 p-3 bg-white border border-[#E2E8F0] rounded-xl">
              <ProgressRing score={91} size={54} strokeWidth={6} label="" />
              <div>
                <p className="text-xs font-bold text-[#0F172A]">ATS Pass Verified</p>
                <p className="text-[10px] text-[#64748B]">Workday & Taleo Ready</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Floating Animated Badge 1 */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-5 hidden sm:flex items-center gap-2.5 bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-lg z-20"
      >
        <div className="h-8 w-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#0F172A]">91/100 ATS Score</p>
          <p className="text-[10px] text-[#64748B]">Top 2% Candidate Match</p>
        </div>
      </motion.div>

      {/* Floating Animated Badge 2 */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2.5 bg-[#0F172A] text-white p-3 rounded-xl shadow-xl z-20"
      >
        <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-[#22C55E]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold">AI Resume Studio</p>
          <p className="text-[10px] text-[#94A3B8]">Auto-tailored in 60s</p>
        </div>
      </motion.div>
    </div>
  );
};
