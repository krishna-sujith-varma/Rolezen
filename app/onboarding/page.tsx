'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  Target,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { RolezenLogo } from '@/icons';
import { Button, Input, Badge } from '@/components/ui';
import { cn } from '@/utils/cn';

export default function OnboardingIntentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Intent State
  const [primaryGoal, setPrimaryGoal] = useState<string>('scratch');
  const [targetRole, setTargetRole] = useState<string>('Senior Staff Frontend Architect');
  const [experienceLevel, setExperienceLevel] = useState<string>('senior');
  const [primaryChallenge, setPrimaryChallenge] = useState<string>('ats');
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Always redirect directly to the Dashboard page after completing onboarding questions
        router.push('/dashboard');
      }, 700);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#DCFCE7] selection:text-[#16A34A] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden select-none">
      {/* Background Decorative Gradient Glows & Blur Layer */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0F172A]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphic Backdrop Overlay behind Card */}
      <div className="fixed inset-0 bg-white/40 backdrop-blur-xl pointer-events-none z-0" />

      {/* Top Header */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-[#E2E8F0]/80">
        <div className="flex items-center gap-2.5">
          <RolezenLogo size={32} />
          <span className="text-xl font-bold tracking-tight text-[#0F172A]">Rolezen</span>
          <Badge status="primary" className="text-xs font-bold ml-2">Setup Assistant</Badge>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#64748B]">Step {step} of {totalSteps}</span>
          <div className="w-24 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#16A34A] transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Form Card Container with Glassmorphism Blur */}
      <main className="relative z-10 max-w-xl mx-auto w-full my-auto py-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white/90 backdrop-blur-2xl border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-2xl shadow-slate-900/10 space-y-8"
        >
          {/* STEP 1: Primary Goal */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge status="primary" className="text-xs">Rezi Intent Matching</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">What is your primary goal today?</h1>
                <p className="text-xs text-[#64748B]">We will customize your AI Copilot prompts and layout engine</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'scratch',
                    title: 'Create a New Resume from Scratch',
                    desc: 'Build a recruiter-approved A4 resume with AI guidance',
                    icon: FileText,
                  },
                  {
                    id: 'import',
                    title: 'Import & Optimize Existing PDF',
                    desc: 'Upload your current resume to fix ATS keyword gaps',
                    icon: Upload,
                  },
                  {
                    id: 'target',
                    title: 'Target Existing Resume for a Job Description',
                    desc: 'Match hard skills against a specific company posting',
                    icon: Target,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = primaryGoal === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPrimaryGoal(item.id)}
                      className={cn(
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4',
                        isSelected
                          ? 'border-[#16A34A] bg-[#DCFCE7]/30 shadow-xs'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white/80'
                      )}
                    >
                      <div className={cn('p-2.5 rounded-xl text-white shrink-0', isSelected ? 'bg-[#16A34A]' : 'bg-[#0F172A]')}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Target Career Role */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge status="primary" className="text-xs">Career Alignment</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">What is your target job title?</h1>
                <p className="text-xs text-[#64748B]">This tunes the AI Bullet Generator for your industry keywords</p>
              </div>

              <div className="space-y-4">
                <Input
                  label="Target Job Title"
                  placeholder="e.g. Senior Staff Frontend Architect"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="h-12 text-sm font-semibold bg-white/90"
                />

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider">Popular Roles</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Software Engineer',
                      'Product Manager',
                      'Data Scientist',
                      'Cloud Architect',
                      'Business Analyst',
                      'DevOps Engineer',
                    ].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setTargetRole(role)}
                        className={cn(
                          'px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                          targetRole === role
                            ? 'bg-[#16A34A] text-white border-[#16A34A]'
                            : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                        )}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Experience Level */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge status="primary" className="text-xs">Experience Level</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">What is your experience level?</h1>
                <p className="text-xs text-[#64748B]">Ensures appropriate page length & layout density</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'student',
                    title: 'Student / Entry Level (0-2 Yrs)',
                    desc: 'Highlights coursework, academic projects, and internship achievements',
                    icon: GraduationCap,
                  },
                  {
                    id: 'mid',
                    title: 'Mid-Level Professional (3-5 Yrs)',
                    desc: 'Highlights core technical skills, metrics impact, and career growth',
                    icon: Briefcase,
                  },
                  {
                    id: 'senior',
                    title: 'Senior / Staff / Executive (6+ Yrs)',
                    desc: 'Focuses on strategic architecture, team leadership, and high ROI',
                    icon: Award,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = experienceLevel === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setExperienceLevel(item.id)}
                      className={cn(
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4',
                        isSelected
                          ? 'border-[#16A34A] bg-[#DCFCE7]/30 shadow-xs'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white/80'
                      )}
                    >
                      <div className={cn('p-2.5 rounded-xl text-white shrink-0', isSelected ? 'bg-[#16A34A]' : 'bg-[#0F172A]')}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Primary Challenge & Launch */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge status="primary" className="text-xs">Final Tuning</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">What is your primary challenge?</h1>
                <p className="text-xs text-[#64748B]">Your workspace will launch tuned to solve this bottleneck</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'ats',
                    title: 'Beating ATS Filters (Workday, Taleo)',
                    desc: 'Real-time keyword diff matcher & structural compliance scanner',
                    icon: ShieldCheck,
                  },
                  {
                    id: 'bullets',
                    title: 'Writing Impactful Bullet Points',
                    desc: 'AI Action Verb & Google XYZ Formula Generator',
                    icon: Sparkles,
                  },
                  {
                    id: 'formatting',
                    title: 'Single-Page A4 Formatting & Spacing',
                    desc: 'Vector canvas typography engine with zero margin overflow',
                    icon: FileText,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = primaryChallenge === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setPrimaryChallenge(item.id)}
                      className={cn(
                        'p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4',
                        isSelected
                          ? 'border-[#16A34A] bg-[#DCFCE7]/30 shadow-xs'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white/80'
                      )}
                    >
                      <div className={cn('p-2.5 rounded-xl text-white shrink-0', isSelected ? 'bg-[#16A34A]' : 'bg-[#0F172A]')}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
            {step > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                onClick={handleBack}
                className="text-xs font-semibold"
              >
                Back
              </Button>
            ) : <div />}

            <Button
              variant="primary"
              size="md"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={handleNext}
              className="text-xs font-bold px-6 h-11"
            >
              {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-[#64748B] py-4">
        © {new Date().getFullYear()} Rolezen Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
}
