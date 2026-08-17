import React from 'react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-[#E2E8F0] bg-white p-4 hidden md:block">
        <div className="font-bold text-lg text-[#0F172A] mb-8">CareerFlow</div>
        <nav className="space-y-2 text-sm font-medium text-[#64748B]">
          <div className="p-2 bg-[#F8FAFC] text-[#16A34A] rounded-lg">Dashboard</div>
          <div className="p-2 hover:bg-[#F8FAFC] rounded-lg">Resumes</div>
          <div className="p-2 hover:bg-[#F8FAFC] rounded-lg">ATS Analyzer</div>
          <div className="p-2 hover:bg-[#F8FAFC] rounded-lg">Settings</div>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};
