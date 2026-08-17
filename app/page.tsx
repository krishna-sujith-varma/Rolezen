'use client';

import React from 'react';
import { Navbar } from '@/features/landing/navbar';
import { Hero } from '@/features/landing/hero';
import { SocialProof } from '@/features/landing/social-proof';
import { FeatureGrid } from '@/features/landing/feature-grid';
import { ATSDemo } from '@/features/landing/ats-demo';
import { TemplateShowcase } from '@/features/landing/template-showcase';
import { ComparisonTable } from '@/features/landing/comparison-table';
import { Testimonials } from '@/features/landing/testimonials';
import { FAQAccordion } from '@/features/landing/faq-accordion';
import { CTABanner } from '@/features/landing/cta-banner';
import { Footer } from '@/features/landing/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-[#DCFCE7] selection:text-[#16A34A] antialiased transition-colors">
      {/* Navbar */}
      <Navbar />


      {/* Main Content */}
      <main>
        <Hero />
        <SocialProof />
        <FeatureGrid />
        <ATSDemo />
        <TemplateShowcase />
        <ComparisonTable />
        <Testimonials />
        <FAQAccordion />
        <CTABanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
