'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

export const CTABanner: React.FC = () => {
  const router = useRouter();

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-[#0F172A] dark:bg-slate-900 text-white p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-2xl border border-white/10 dark:border-slate-800"
        >
          {/* Glow Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#16A34A]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#22C55E] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Instant Setup — Takes under 2 minutes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              Ready to Build Your Dream Resume?
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Join 250,000+ candidates landing interviews at top companies. Start building for free today.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto h-13 px-8 text-base bg-[#16A34A] hover:bg-[#15803D]"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              onClick={() => router.push('/register')}
            >
              Start Free Trial
            </Button>
          </div>

          <p className="relative z-10 text-xs text-[#64748B] dark:text-slate-400">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};
