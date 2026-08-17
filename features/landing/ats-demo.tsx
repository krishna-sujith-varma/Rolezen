'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button, Badge, ProgressRing } from '@/components/ui';
import { useRouter } from 'next/navigation';

export const ATSDemo: React.FC = () => {
  const router = useRouter();
  const [atsScore, setAtsScore] = useState(74);
  const [injectedSkills, setInjectedSkills] = useState<string[]>([]);

  const targetKeywords = [
    { name: 'GraphQL & System Design', impact: +8 },
    { name: 'React 19 Server Components', impact: +7 },
    { name: 'Tailwind CSS & Design Tokens', impact: +5 },
  ];

  const handleInject = (kw: { name: string; impact: number }) => {
    if (injectedSkills.includes(kw.name)) return;
    setInjectedSkills([...injectedSkills, kw.name]);
    setAtsScore((prev) => Math.min(98, prev + kw.impact));
  };

  return (
    <section id="ats-checker" className="py-20 bg-[#F8FAFC] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary" className="text-xs font-bold uppercase tracking-wider">
            Rezi-Style Real-Time ATS Targeter
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            See how Rolezen beats Applicant Tracking Systems
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Legacy ATS systems filter out 75% of qualified resumes. Test our live keyword targeting engine below:
          </p>
        </div>

        {/* Interactive Demo Card */}
        <div className="max-w-4xl mx-auto bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#0F172A]">Target Role: Senior Staff Frontend Architect</h3>
              <p className="text-xs text-[#64748B]">Target Job Description: Stripe Senior Architect Role</p>
            </div>
            <div className="flex items-center gap-4 bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
              <ProgressRing score={atsScore} size={64} strokeWidth={6} label="" />
              <div>
                <div className="text-xs font-bold text-[#64748B]">ATS Score</div>
                <div className="text-lg font-black text-[#16A34A]">{atsScore}/100</div>
              </div>
            </div>
          </div>

          {/* Keywords Matcher Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: Matched Hard Keywords */}
            <div className="space-y-3 bg-[#DCFCE7]/40 border border-[#16A34A]/20 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Matched Keywords (9)
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {['TypeScript', 'Next.js 15', 'Framer Motion', 'REST APIs', 'CI/CD Pipelines', 'WCAG Accessibility', ...injectedSkills].map((skill) => (
                  <span key={skill} className="px-2.5 py-1 bg-white text-[#16A34A] border border-[#16A34A]/30 rounded-lg text-xs font-bold shadow-xs">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Missing Target Keywords (Injectable) */}
            <div className="space-y-3 bg-[#FFFBEB] border border-[#F59E0B]/30 p-5 rounded-2xl">
              <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Recommended Keyword Fixes
              </h4>
              <div className="space-y-2">
                {targetKeywords.map((kw) => {
                  const isAdded = injectedSkills.includes(kw.name);
                  return (
                    <div key={kw.name} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E2E8F0] text-xs">
                      <span className="font-bold text-[#0F172A]">{kw.name}</span>
                      <Button
                        variant={isAdded ? 'ghost' : 'outline'}
                        size="sm"
                        disabled={isAdded}
                        onClick={() => handleInject(kw)}
                        className="text-[11px] h-7 px-2"
                      >
                        {isAdded ? 'Injected ✓' : `+ Add (${kw.impact} pts)`}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => router.push('/register')}
              className="text-sm font-semibold h-12 px-8"
            >
              Optimize Your Resume Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
