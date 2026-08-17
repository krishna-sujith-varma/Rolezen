'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, ArrowRight } from 'lucide-react';
import { RolezenLogo } from '@/icons';
import { NAV_ITEMS } from '@/constants/navigation';
import { useScroll } from '@/hooks/use-scroll';
import { Button, Drawer } from '@/components/ui';
import { cn } from '@/utils/cn';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { scrolled } = useScroll(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm py-2.5'
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
              <span className="text-xl font-bold tracking-tight text-[#0F172A]">Rolezen</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors py-2 px-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-lg min-h-[44px] inline-flex items-center"
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-[#DCFCE7] text-[#16A34A] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
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
                aria-label="Get started free with Rolezen"
              >
                Get Started Free
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Rolezen Navigation">
        <div className="flex flex-col gap-6 pt-4">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#0F172A] hover:text-[#16A34A] transition-colors py-3 px-2 rounded-xl hover:bg-[#F8FAFC] min-h-[44px] flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>
          <div className="pt-6 border-t border-[#E2E8F0] flex flex-col gap-3">
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
