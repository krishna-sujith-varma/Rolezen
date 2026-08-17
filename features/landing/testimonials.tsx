'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/constants/testimonials';
import { Card, Avatar, Badge } from '@/components/ui';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge status="neutral">Verified Candidate Feedback</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
            Loved by candidates at top tech companies.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            See how CareerFlow helped job seekers land offers at Stripe, Linear, Vercel, and Apple.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
            >
              <Card
                variant="hoverable"
                padding="lg"
                className="h-full flex flex-col justify-between border border-[#E2E8F0] bg-white rounded-2xl p-6"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Outcome Highlight */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                      {item.highlight}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm text-[#0F172A] leading-relaxed font-normal italic">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Author User Info */}
                <div className="pt-6 border-t border-[#E2E8F0] mt-6 flex items-center gap-3">
                  <Avatar name={item.name} size="md" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">{item.name}</h4>
                    <p className="text-xs text-[#64748B]">
                      {item.role} @ <span className="font-semibold text-[#0F172A]">{item.company}</span>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
