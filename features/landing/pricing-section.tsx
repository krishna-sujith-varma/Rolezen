'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

export const PricingSection: React.FC = () => {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const plans = [
    {
      id: 'free',
      name: 'Free Forever',
      badge: 'Starter',
      price: '$0',
      period: 'forever',
      desc: 'Essential ATS-proof resume creation for active job seekers.',
      features: [
        '1 Active Resume Project',
        'Real-Time Live ATS Score (0–100)',
        'Section Reordering & Appearance Map',
        '3 Vector PDF Downloads / month',
        'Workday & Taleo Parsing Compliance',
        'Standard Recruiter Templates',
      ],
      ctaText: 'Start Building Free',
      ctaVariant: 'outline' as const,
      popular: false,
    },
    {
      id: 'pro',
      name: 'Rolezen Pro',
      badge: 'Most Popular',
      price: isAnnual ? '$8' : '$12',
      period: 'per month',
      subtext: isAnnual ? 'Billed annually ($96/yr) — Save 35%' : 'Billed monthly',
      desc: 'Everything you need to beat ATS filters and land multiple offers.',
      features: [
        'Unlimited Resume Projects & Versions',
        'Real-Time ATS Keyword Targeter & Diff',
        'Unlimited Vector A4 PDF Downloads',
        'All 6 Recruiter-Approved Templates',
        'AI Action Verb & Metric Formula Optimizer',
        'Missing Keyword One-Click Inserter',
        'Priority ATS Parser & Cloud Sync',
        'Free Access to Upcoming AI Cover Letters',
      ],
      ctaText: 'Get Rolezen Pro',
      ctaVariant: 'primary' as const,
      popular: true,
    },
    {
      id: 'lifetime',
      name: 'Lifetime Founder Pass',
      badge: 'Best Value',
      price: '$69',
      period: 'one-time payment',
      subtext: 'Pay once, own forever • No recurring fees',
      desc: 'Lifetime access to all current Pro features plus all upcoming v2.6 AI tools.',
      features: [
        'Lifetime Unlimited Access to Pro',
        'All Future AI Modules Included (Cover Letter, Agent, Interview Prep)',
        'Unlimited Resumes & PDF Exports Forever',
        'VIP Early Beta Access to All New Tools',
        'Direct Founder Support Channel',
        '30-Day 100% Money-Back Guarantee',
      ],
      ctaText: 'Claim Lifetime Pass',
      ctaVariant: 'primary' as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC] dark:bg-[#070A10] border-y border-[#E2E8F0] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary" className="text-xs font-bold uppercase tracking-wider">
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            More Powerful Than Rezi. At a Fraction of the Cost.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed">
            Stop paying $29/month for legacy resume builders. Choose a transparent plan and start landing interviews today.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span
              className={cn(
                'text-xs sm:text-sm font-bold transition-colors cursor-pointer',
                !isAnnual ? 'text-[#0F172A] dark:text-white' : 'text-[#64748B] dark:text-slate-400'
              )}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-[#0F172A] dark:bg-[#16A34A] p-1 relative transition-colors cursor-pointer"
              aria-label="Toggle annual or monthly pricing"
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full bg-white transition-transform',
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>

            <span
              className={cn(
                'text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5',
                isAnnual ? 'text-[#16A34A] dark:text-[#22C55E]' : 'text-[#64748B] dark:text-slate-400'
              )}
              onClick={() => setIsAnnual(true)}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#DCFCE7] dark:bg-emerald-950 text-[#16A34A] dark:text-[#22C55E] rounded-full">
                Save 35%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex"
            >
              <Card
                variant="hoverable"
                padding="lg"
                className={cn(
                  'w-full flex flex-col justify-between rounded-3xl transition-all relative p-6 sm:p-8 space-y-6',
                  plan.popular
                    ? 'border-2 border-[#16A34A] dark:border-[#22C55E] bg-white dark:bg-[#0F172A] shadow-xl shadow-emerald-500/10'
                    : 'border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#0B0F19]'
                )}
              >
                {/* Popular Highlight Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#16A34A] text-white text-xs font-bold shadow-md">
                    ⭐ Recommended Pick
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">{plan.name}</h3>
                    <Badge status={plan.popular ? 'primary' : 'neutral'}>{plan.badge}</Badge>
                  </div>

                  <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-[#0F172A] dark:text-white tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400">/{plan.period}</span>
                    </div>
                    {plan.subtext && (
                      <p className="text-[11px] font-semibold text-[#16A34A] dark:text-[#22C55E] mt-1">{plan.subtext}</p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4">
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      Included in Plan:
                    </p>
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-xs text-[#475569] dark:text-slate-300">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#16A34A] dark:text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full justify-center text-xs h-11 font-bold"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    onClick={() => router.push('/register')}
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enterprise & Team Custom Plan Callout */}
        <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <Zap className="h-3.5 w-3.5" />
              <span>Enterprise & Universities (Soon)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
              Rolezen for Bootcamps & Universities
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed">
              Equip 100+ students or team members with bulk seats, centralized ATS scoring analytics, and custom university branding at just $49/month.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            className="text-xs h-11 font-semibold px-6 border-[#16A34A] text-[#16A34A] dark:text-[#22C55E] shrink-0"
            onClick={() => router.push('/register')}
          >
            Inquire for Enterprise Beta
          </Button>
        </div>
      </div>
    </section>
  );
};
