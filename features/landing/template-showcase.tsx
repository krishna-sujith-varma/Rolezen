'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_TEMPLATES } from '@/constants/templates';
import { Card, Badge, Button } from '@/components/ui';
import { Eye, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const TemplateShowcase: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Executive', 'Engineering', 'Minimal', 'Creative', 'Modern'];

  const filteredTemplates = selectedCategory === 'All'
    ? RESUME_TEMPLATES
    : RESUME_TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <section id="templates" className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A] border-y border-[#E2E8F0] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="primary">6 Recruiter-Approved Layouts</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            Premium Resume Templates
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-slate-400 leading-relaxed">
            Designed in collaboration with Fortune 500 hiring managers. Crisp, minimal, and 100% ATS readable.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] dark:bg-[#16A34A] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-[#64748B] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates 6 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card
                variant="hoverable"
                padding="none"
                className="group relative overflow-hidden bg-white dark:bg-[#0B0F19] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl transition-all duration-300 hover:shadow-xl"
              >
                {/* Miniature Vector Preview Canvas */}
                <div className="relative aspect-[3/4] bg-[#F8FAFC] dark:bg-slate-900/60 p-6 border-b border-[#E2E8F0] dark:border-slate-800 overflow-hidden flex flex-col justify-between">
                  {/* Fake Vector Resume Layout Lines */}
                  <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-[#E2E8F0] dark:border-slate-800 h-full flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="h-3.5 w-28 bg-[#0F172A] dark:bg-slate-200 rounded" />
                        <div className="h-2 w-12 bg-emerald-500 rounded" />
                      </div>
                      <div className="h-2 w-36 bg-[#64748B]/30 dark:bg-slate-700 rounded" />
                      <div className="h-1.5 w-full bg-[#E2E8F0] dark:bg-slate-800 rounded my-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-2.5 w-20 bg-[#0F172A]/80 dark:bg-slate-300 rounded" />
                      <div className="h-1.5 w-full bg-[#E2E8F0] dark:bg-slate-800 rounded" />
                      <div className="h-1.5 w-5/6 bg-[#E2E8F0] dark:bg-slate-800 rounded" />
                      <div className="h-1.5 w-4/6 bg-[#E2E8F0] dark:bg-slate-800 rounded" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-2.5 w-16 bg-[#0F172A]/80 dark:bg-slate-300 rounded" />
                      <div className="flex gap-1">
                        <div className="h-3 w-10 bg-[#DCFCE7] dark:bg-emerald-950 rounded" />
                        <div className="h-3 w-12 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded" />
                        <div className="h-3 w-8 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      onClick={() => router.push('/studio/builder')}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>

                {/* Template Info Footer */}
                <div className="p-5 space-y-2 bg-white dark:bg-[#0B0F19]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-white">{template.name}</h3>
                    {template.badge && <Badge status="primary">{template.badge}</Badge>}
                  </div>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">{template.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
