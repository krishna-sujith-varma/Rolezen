import React from 'react';
import { Navbar } from '@/features/landing/navbar';
import { Footer } from '@/features/landing/footer';

export interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A] selection:bg-[#DCFCE7] selection:text-[#16A34A] antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
