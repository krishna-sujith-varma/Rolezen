'use client';

import React from 'react';
import Link from 'next/link';
import { RolezenLogo } from '@/icons';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/theme/theme-provider';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-[#DCFCE7] selection:text-[#16A34A] antialiased p-4 sm:p-6 lg:p-8 relative overflow-hidden select-none transition-colors">
      {/* Background Subtle Emerald Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#16A34A]/5 dark:bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Brand Logo & Theme Toggle */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-xl p-1"
        >
          <RolezenLogo size={32} className="transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Rolezen</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="text-xs font-semibold text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors p-2 rounded-lg"
          >
            ← Back to Website
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-slate-950/50 space-y-6"
        >
          {(title || subtitle) && (
            <div className="text-center space-y-1.5 border-b border-[#E2E8F0] dark:border-slate-800 pb-5">
              {title && (
                <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">{title}</h1>
              )}
              {subtitle && (
                <p className="text-xs text-[#64748B] dark:text-slate-400 leading-relaxed">{subtitle}</p>
              )}
            </div>
          )}

          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-[#64748B] dark:text-slate-500 py-4">
        © {new Date().getFullYear()} Rolezen Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
