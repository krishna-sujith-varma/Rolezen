'use client';

import React from 'react';
import { FAQS } from '@/constants/faq';
import { Accordion, Badge } from '@/components/ui';

export const FAQAccordion: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A] border-y border-[#E2E8F0] dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <Badge status="neutral">Got Questions?</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-400 leading-relaxed">
            Everything you need to know about Rolezen ATS scoring, AI optimization, and PDF exports.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-white dark:bg-[#0B0F19] border border-[#E2E8F0] dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xs">
          <Accordion items={FAQS} defaultOpenId="ats-compatibility" />
        </div>
      </div>
    </section>
  );
};
