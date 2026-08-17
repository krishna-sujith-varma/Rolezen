'use client';

import React, { useState } from 'react';
import { Navbar } from '@/features/landing/navbar';
import { Hero } from '@/features/landing/hero';
import { ProductBrowser } from '@/features/landing/product-browser';
import { SocialProof } from '@/features/landing/social-proof';
import { ToolsSuite } from '@/features/landing/tools-suite';
import { ATSDemo } from '@/features/landing/ats-demo';
import { TemplateShowcase } from '@/features/landing/template-showcase';
import { PricingSection } from '@/features/landing/pricing-section';
import { ComparisonTable } from '@/features/landing/comparison-table';
import { Testimonials } from '@/features/landing/testimonials';
import { FAQAccordion } from '@/features/landing/faq-accordion';
import { CTABanner } from '@/features/landing/cta-banner';
import { Footer } from '@/features/landing/footer';
import { ComingSoonModal } from '@/features/landing/coming-soon-modal';

export default function LandingPage() {
  const [soonModalOpen, setSoonModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('AI Cover Letter Generator');

  const handleOpenSoonModal = (featureName: string) => {
    setSelectedFeature(featureName);
    setSoonModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-[#DCFCE7] selection:text-[#16A34A] antialiased transition-colors">
      {/* 1. Navigation Bar with Dropdown */}
      <Navbar onOpenSoonModal={handleOpenSoonModal} />

      {/* Main Content */}
      <main className="space-y-16 md:space-y-24">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Interactive Product Browser (Rezi-Style Auto-Cycling Live Tabs) */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 -mt-8 sm:-mt-14 relative z-20">
          <ProductBrowser onOpenSoonModal={handleOpenSoonModal} />
        </section>

        {/* 4. Social Proof & Company Trust Wall */}
        <SocialProof />

        {/* 5. Complete Tools Suite (With Active & Soon Badges) */}
        <ToolsSuite onOpenSoonModal={handleOpenSoonModal} />

        {/* 6. Live Interactive ATS Scanner */}
        <ATSDemo />

        {/* 7. Recruiter-Approved Template Showcase */}
        <TemplateShowcase />

        {/* 8. Transparent Pricing (Lower than Rezi) */}
        <PricingSection />

        {/* 9. Comparison Table (Rolezen vs Legacy vs ChatGPT) */}
        <ComparisonTable />

        {/* 10. Verified Feedback & Testimonials */}
        <Testimonials />

        {/* 11. FAQ Accordion */}
        <FAQAccordion />

        {/* 12. Final CTA Banner */}
        <CTABanner />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* 14. Coming Soon Early Access VIP Modal */}
      <ComingSoonModal
        isOpen={soonModalOpen}
        onClose={() => setSoonModalOpen(false)}
        featureName={selectedFeature}
      />
    </div>
  );
}
