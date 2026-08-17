'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, TrendingUp, Users, ShieldCheck } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const companies = [
    { name: 'Google', symbol: 'G' },
    { name: 'Apple', symbol: '' },
    { name: 'Microsoft', symbol: 'MS' },
    { name: 'Meta', symbol: '∞' },
    { name: 'Amazon', symbol: 'amzn' },
    { name: 'Spotify', symbol: '♪' },
    { name: 'Tesla', symbol: 'T' },
    { name: 'Netflix', symbol: 'N' },
  ];

  const stats = [
    { value: '300,000+', label: 'Resumes Built & Optimized', icon: Users },
    { value: '98.4%', label: 'ATS Parsing Accuracy', icon: ShieldCheck },
    { value: '3.4x', label: 'More Interview Invites', icon: TrendingUp },
    { value: '4.9/5', label: 'Average User Rating', icon: Star },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
        {/* Rating Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-1 text-[#F59E0B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="text-xs font-semibold text-[#0F172A]">
            Rated 4.9/5 by 10,000+ candidates hired at top tech & Fortune 500 companies
          </p>
        </div>

        {/* Company Logos Row (Rezi Style) */}
        <div className="space-y-4 text-center">
          <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">
            Rolezen Candidates Get Hired At
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
            {companies.map((c) => (
              <span key={c.name} className="text-base sm:text-lg font-extrabold text-[#0F172A] tracking-tight">
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-[#E2E8F0] p-6 rounded-2xl text-center space-y-2 shadow-xs hover:border-[#16A34A] transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{stat.value}</div>
                <p className="text-xs text-[#64748B] font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
