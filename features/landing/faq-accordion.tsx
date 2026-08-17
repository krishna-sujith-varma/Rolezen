'use client';

import React from 'react';
import { FAQS } from '@/constants/faq';
import { Accordion, Badge } from '@/components/ui';

export const FAQAccordion: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <Badge status="neutral">Got Questions?</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            Everything you need to know about CareerFlow ATS scoring, AI optimization, and PDF exports.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-xs">
          <Accordion items={FAQS} defaultOpenId="ats-compatibility" />
        </div>
      </div>
    </section>
  );
};
