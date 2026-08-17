import React from 'react';

export interface StudioLayoutProps {
  children: React.ReactNode;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#F8FAFC]">
      {/* Studio Top Toolbar */}
      <header className="h-14 border-b border-[#E2E8F0] bg-white px-6 flex items-center justify-between">
        <div className="font-bold text-sm text-[#0F172A]">Resume Studio Workspace</div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#64748B]">Auto-saved to Cloud</span>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">{children}</main>
    </div>
  );
};
