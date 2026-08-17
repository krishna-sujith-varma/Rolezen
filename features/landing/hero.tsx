'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Upload, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui';
import { StudioMockup } from './studio-mockup';

export const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#16A34A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Rezi-style Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border border-[#16A34A]/30 text-xs font-bold text-[#16A34A]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>AI Resume Studio & Real-Time ATS Analyzer</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.12]"
            >
              The AI Resume Builder That Gets You <span className="text-[#16A34A] underline decoration-[#16A34A]/30 underline-offset-8">Hired</span>.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-xl font-normal"
            >
              Reinvent your resume with AI bullet point generation, real-time ATS keyword matching, and recruiter-tested templates in minutes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 pt-2"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  onClick={() => router.push('/register')}
                  className="text-sm font-semibold h-12 px-6"
                  aria-label="Create my resume free"
                >
                  Create My Resume Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Upload className="h-4 w-4 text-[#16A34A]" />}
                  onClick={() => router.push('/login')}
                  className="text-sm font-semibold h-12 px-6"
                  aria-label="Upload existing PDF resume"
                >
                  Upload Existing PDF
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-[#64748B] pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" />
                  <span>Free Forever Tier</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#16A34A] shrink-0" />
                  <span>Workday & Taleo Compliant</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Studio UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 w-full overflow-hidden sm:overflow-visible"
          >
            <StudioMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
