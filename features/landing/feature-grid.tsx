'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/constants/features';
import { ResumeIcon, ATSIcon, AIIcon } from '@/icons';
import { Card, Badge } from '@/components/ui';
import { Check } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'builder':
        return <ResumeIcon className="h-6 w-6 text-[#16A34A]" />;
      case 'optimizer':
        return <AIIcon className="h-6 w-6 text-[#16A34A]" />;
      case 'ats':
        return <ATSIcon className="h-6 w-6 text-[#16A34A]" />;
      default:
        return <ResumeIcon className="h-6 w-6 text-[#16A34A]" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary">3 Core Modules</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
            Everything you need for a job-winning resume.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Stop guessing what recruiters want. CareerFlow gives you an end-to-end studio to build, optimize, and verify your application.
          </p>
        </div>

        {/* 3 Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card
                variant="hoverable"
                padding="lg"
                className="h-full flex flex-col justify-between border border-[#E2E8F0] hover:border-[#16A34A] transition-all group p-6 sm:p-8"
              >
                <div className="space-y-5">
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(feature.iconName)}
                    </div>
                    {feature.badge && <Badge status="neutral">{feature.badge}</Badge>}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0F172A]">{feature.title}</h3>
                    <p className="text-xs font-semibold text-[#16A34A]">{feature.subtitle}</p>
                    <p className="text-sm text-[#64748B] leading-relaxed pt-1">{feature.description}</p>
                  </div>
                </div>

                {/* Highlights Checklist */}
                <div className="pt-6 border-t border-[#E2E8F0] mt-6 space-y-2">
                  {feature.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                      <div className="h-4 w-4 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
