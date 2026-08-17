'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';

export const ComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Real-Time ATS Keyword Targeter',
      careerflow: true,
      traditional: false,
      chatgpt: false,
      word: false,
    },
    {
      feature: 'AI Action Verb & Metric Formulas',
      careerflow: true,
      traditional: false,
      chatgpt: 'Partial',
      word: false,
    },
    {
      feature: 'Vector A4 Single-Page Formatting Engine',
      careerflow: true,
      traditional: false,
      chatgpt: false,
      word: false,
    },
    {
      feature: 'Non-Destructive AI Copilot (Accept / Dismiss)',
      careerflow: true,
      traditional: false,
      chatgpt: false,
      word: false,
    },
    {
      feature: 'Workday & Taleo 100% Parsing Guarantee',
      careerflow: true,
      traditional: false,
      chatgpt: false,
      word: false,
    },
    {
      feature: 'Multiple Targeted Project Versions',
      careerflow: true,
      traditional: false,
      chatgpt: false,
      word: false,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary" className="text-xs font-bold uppercase tracking-wider">
            Why Rolezen Beats Old Tools
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Built for modern candidates, not 1998 Word documents
          </h2>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="py-4 px-4 text-sm font-bold text-[#0F172A] w-1/3">Feature Capabilities</th>
                <th className="py-4 px-4 text-center bg-[#DCFCE7]/50 border-x border-[#16A34A]/30 rounded-t-2xl">
                  <div className="text-base font-extrabold text-[#16A34A] flex items-center justify-center gap-1">
                    <Sparkles className="h-4 w-4" /> Rolezen
                  </div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold text-[#64748B]">Legacy Builders</th>
                <th className="py-4 px-4 text-center text-xs font-bold text-[#64748B]">ChatGPT</th>
                <th className="py-4 px-4 text-center text-xs font-bold text-[#64748B]">MS Word / Docs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {comparisonData.map((row) => (
                <tr key={row.feature} className="hover:bg-[#F8FAFC]">
                  <td className="py-4 px-4 font-semibold text-[#0F172A]">{row.feature}</td>

                  {/* CareerFlow */}
                  <td className="py-4 px-4 text-center bg-[#DCFCE7]/30 border-x border-[#16A34A]/20">
                    <div className="h-6 w-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center mx-auto">
                      <Check className="h-4 w-4" />
                    </div>
                  </td>

                  {/* Legacy */}
                  <td className="py-4 px-4 text-center text-[#94A3B8]">
                    <X className="h-4 w-4 mx-auto text-[#CBD5E1]" />
                  </td>

                  {/* ChatGPT */}
                  <td className="py-4 px-4 text-center text-[#64748B] font-medium">
                    {row.chatgpt === 'Partial' ? (
                      <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded-md font-bold text-[10px]">
                        Partial
                      </span>
                    ) : (
                      <X className="h-4 w-4 mx-auto text-[#CBD5E1]" />
                    )}
                  </td>

                  {/* MS Word */}
                  <td className="py-4 px-4 text-center text-[#94A3B8]">
                    <X className="h-4 w-4 mx-auto text-[#CBD5E1]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
