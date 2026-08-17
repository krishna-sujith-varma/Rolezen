'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Sparkles, ShieldCheck, Download, ArrowRight } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

const STEPS = [
  {
    step: '01',
    title: 'Create or Upload Resume',
    subtitle: 'Import existing PDF/DOCX or start from scratch',
    description: 'Parse your historical work history in seconds or build using our guided modular section editor.',
    icon: FileUp,
    details: 'Auto-extracts contact details, work experiences, skills, and degree records into structured JSON format.',
  },
  {
    step: '02',
    title: 'AI Optimizes Resume',
    subtitle: 'Enhance bullet points with metric metrics',
    description: 'Our fine-tuned AI transforms weak tasks into quantified accomplishment statements using top industry verbs.',
    icon: Sparkles,
    details: 'Applies Google-approved XYZ formula: "Accomplished X, as measured by Y, by doing Z".',
  },
  {
    step: '03',
    title: 'Improve ATS Score',
    subtitle: 'Real-time keyword diff & parser verification',
    description: 'Scan against target job postings to identify missing hard skills and formatting flags before applying.',
    icon: ShieldCheck,
    details: 'Verifies parsing against Workday, Taleo, Greenhouse, and Lever algorithms.',
  },
  {
    step: '04',
    title: 'Download & Apply',
    subtitle: 'Export single-page vector PDFs',
    description: 'Download pixel-perfect ATS-compliant PDFs ready to submit to recruiters and job portals.',
    icon: Download,
    details: 'Supports selectable text, clean line heights, and zero unparseable graphics.',
  },
];

export const WorkflowTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-20 md:py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary">4-Step Process</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
            How CareerFlow Works
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            From draft to interview call in four simple steps.
          </p>
        </div>

        {/* Stepper Selection Grid (Responsive 2-col on Tablet, 4-col on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                aria-pressed={isActive}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer min-h-[90px] select-none ${
                  isActive
                    ? 'bg-white border-[#16A34A] shadow-md ring-2 ring-[#16A34A]/20'
                    : 'bg-white/70 border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] sm:text-xs font-bold ${isActive ? 'text-[#16A34A]' : 'text-[#64748B]'}`}>
                    STEP {item.step}
                  </span>
                  <div className={`p-1.5 sm:p-2 rounded-xl ${isActive ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#F8FAFC] text-[#64748B]'}`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] line-clamp-1">{item.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Step Detail Card */}
        <Card className="p-6 sm:p-8 bg-white border border-[#E2E8F0] shadow-md rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full text-xs font-bold">
                  <span>Step {STEPS[activeStep].step} of 04</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A]">{STEPS[activeStep].title}</h3>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">{STEPS[activeStep].description}</p>
                <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] font-medium leading-relaxed">
                  💡 <span className="font-bold text-[#16A34A]">Key Output:</span> {STEPS[activeStep].details}
                </div>
              </div>

              {/* Progress Summary Card */}
              <div className="lg:col-span-5 bg-[#0F172A] text-white p-6 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Module Action Status</span>
                  <span className="text-[#22C55E] font-semibold">Active State</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#16A34A] transition-all duration-500" style={{ width: `${(activeStep + 1) * 25}%` }} />
                  </div>
                  <p className="text-xs text-[#94A3B8] text-right font-medium">{(activeStep + 1) * 25}% Process Complete</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Next Action:</span>
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                    className="flex items-center gap-1 text-[#22C55E] font-bold hover:underline cursor-pointer min-h-[36px]"
                  >
                    <span>{STEPS[(activeStep + 1) % STEPS.length].title}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
};
