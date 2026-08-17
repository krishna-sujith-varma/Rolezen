import React from 'react';
import Link from 'next/link';
import { RolezenLogo } from '@/icons';
import { FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS } from '@/constants/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] dark:bg-[#070A10] text-white border-t border-[#1E293B] dark:border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Description Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <RolezenLogo size={32} />
              <span className="text-xl font-bold tracking-tight text-white">Rolezen</span>
            </Link>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              The AI-powered Resume Studio that combines Resume Building, Live ATS Analysis, and AI Content Optimization into one unified workspace.
            </p>
            <div className="text-xs text-[#64748B] pt-2">
              © {new Date().getFullYear()} Rolezen Technologies Inc. All rights reserved.
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Platform Links</h4>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#CBD5E1] hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Security Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Legal & Compliance</h4>
            <ul className="space-y-2">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#CBD5E1] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-[#1E293B] dark:border-slate-800 text-xs text-[#64748B]">
              SOC2 Type II Certified • 256-Bit SSL Encrypted Data
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
