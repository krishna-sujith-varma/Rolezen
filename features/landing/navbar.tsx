'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  ArrowRight,
  ChevronDown,
  FileText,
  ShieldCheck,
  Bot,
  Mail,
  Mic,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { RolezenLogo } from '@/icons';
import { useScroll } from '@/hooks/use-scroll';
import { Button, Drawer } from '@/components/ui';
import { ThemeToggle } from '@/theme/theme-provider';
import { cn } from '@/utils/cn';

export interface NavbarProps {
  onOpenSoonModal?: (feature: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSoonModal }) => {
  const router = useRouter();
  const { scrolled } = useScroll(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const toolsList = [
    {
      label: 'AI Resume Builder',
      desc: 'Build A4 vector resumes',
      href: '/studio/builder',
      isLive: true,
      badge: 'Live',
      icon: FileText,
    },
    {
      label: 'Real-Time ATS Checker',
      desc: 'Instant 0–100 compliance score',
      href: '#ats-checker',
      isLive: true,
      badge: 'Live',
      icon: ShieldCheck,
    },
    {
      label: 'AI Resume Agent',
      desc: 'Conversational assistant',
      isLive: false,
      badge: 'Soon',
      icon: Bot,
    },
    {
      label: 'AI Cover Letter Generator',
      desc: 'Targeted letters in 30s',
      isLive: false,
      badge: 'Soon',
      icon: Mail,
    },
    {
      label: 'AI Mock Interview Prep',
      desc: 'Real-time vocal coach',
      isLive: false,
      badge: 'Soon',
      icon: Mic,
    },
    {
      label: 'Job Application Tracker',
      desc: 'Visual Kanban pipeline',
      isLive: false,
      badge: 'Soon',
      icon: Briefcase,
    },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none',
          scrolled
            ? 'bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 shadow-sm py-2.5'
            : 'bg-transparent py-4 md:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] min-h-[44px]"
              aria-label="Rolezen homepage"
            >
              <RolezenLogo size={32} className="transition-transform group-hover:scale-105" />
              <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">Rolezen</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {/* Product Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white py-2 px-1 cursor-pointer transition-colors"
                >
                  <span>Tools & Suite</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1 mt-1 z-50">
                    {toolsList.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <div
                          key={tool.label}
                          onClick={() => {
                            setToolsDropdownOpen(false);
                            if (tool.isLive) {
                              if (tool.href?.startsWith('/')) router.push(tool.href);
                              else window.location.hash = tool.href || '';
                            } else {
                              onOpenSoonModal?.(tool.label);
                            }
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'h-8 w-8 rounded-lg flex items-center justify-center',
                                tool.isLive
                                  ? 'bg-[#DCFCE7] dark:bg-emerald-950/80 text-[#16A34A] dark:text-[#22C55E]'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#0F172A] dark:text-white">{tool.label}</p>
                              <p className="text-[10px] text-[#64748B] dark:text-slate-400">{tool.desc}</p>
                            </div>
                          </div>
                          <span
                            className={cn(
                              'px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded',
                              tool.isLive
                                ? 'bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950 dark:text-[#22C55E]'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            )}
                          >
                            {tool.badge}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href="#templates"
                className="text-sm font-medium text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
              >
                Templates
              </a>

              <a
                href="#ats-checker"
                className="text-sm font-medium text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <span>ATS Checker</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] rounded-full">
                  Live
                </span>
              </a>

              <a
                href="#pricing"
                className="text-sm font-medium text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
              >
                Pricing
              </a>

              <a
                href="#faq"
                className="text-sm font-medium text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* Desktop Action Buttons & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="dark:text-slate-300 dark:hover:text-white text-xs"
                onClick={() => router.push('/login')}
                aria-label="Login to account"
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                onClick={() => router.push('/register')}
                className="text-xs font-semibold"
                aria-label="Get started free with Rolezen"
              >
                Get Started Free
              </Button>
            </div>

            {/* Mobile Menu & Theme Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Rolezen Navigation">
        <div className="flex flex-col gap-6 pt-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/studio/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#0F172A] dark:text-white hover:text-[#16A34A] py-2 px-2 rounded-xl flex items-center justify-between"
            >
              <span>Resume Studio Builder</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-[#DCFCE7] dark:bg-emerald-950 text-[#16A34A] dark:text-[#22C55E] rounded-full">
                Live
              </span>
            </Link>

            <a
              href="#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#0F172A] dark:text-white hover:text-[#16A34A] py-2 px-2 rounded-xl"
            >
              All Tools & Suites
            </a>

            <a
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#0F172A] dark:text-white hover:text-[#16A34A] py-2 px-2 rounded-xl"
            >
              Resume Templates
            </a>

            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#0F172A] dark:text-white hover:text-[#16A34A] py-2 px-2 rounded-xl flex items-center justify-between"
            >
              <span>Pricing</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#DCFCE7] dark:bg-emerald-950 text-[#16A34A] rounded-full">
                Save 35%
              </span>
            </a>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#0F172A] dark:text-white hover:text-[#16A34A] py-2 px-2 rounded-xl"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-6 border-t border-[#E2E8F0] dark:border-slate-800 flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full justify-center text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/login');
              }}
            >
              Login
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/register');
              }}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
