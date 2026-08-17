'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { RolezenLogo } from '@/icons';
import { Button, Badge, Dropdown, Avatar } from '@/components/ui';
import { ThemeToggle } from '@/theme/theme-provider';

export interface StudioToolbarProps {
  template: string;
  onTemplateChange: (t: string) => void;
  onOpenInspector: (mode: 'ats' | 'ai') => void;
  onExportPDF: () => void;
  atsScore: number;
  zoom: number;
  onZoomChange: (z: number) => void;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  template,
  onTemplateChange,
  onOpenInspector,
  onExportPDF,
  atsScore,
  zoom,
  onZoomChange,
}) => {
  const templateOptions = [
    { value: 'executive', label: 'The Executive' },
    { value: 'tech-lead', label: 'Tech Lead' },
    { value: 'modern-minimal', label: 'Modern Minimalist' },
  ];

  return (
    <header className="h-14 bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between shadow-xs z-30 shrink-0 select-none transition-colors">
      {/* Left: Back Link & Resume Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <div className="h-4 w-[1px] bg-[#E2E8F0] dark:bg-slate-800 hidden sm:block" />
        <div className="flex items-center gap-2">
          <RolezenLogo size={22} />
          <span className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white truncate max-w-[140px] sm:max-w-[220px]">
            Resume Studio
          </span>
          <Badge status="primary" className="hidden lg:inline-flex text-[10px] py-0.5">
            Live
          </Badge>
        </div>
      </div>

      {/* Center: Template Selector, Undo/Redo & Zoom */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="w-40">
          <Dropdown
            options={templateOptions}
            value={template}
            onChange={onTemplateChange}
            placeholder="Template"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-1">
          <button
            type="button"
            className="p-1 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Undo"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="p-1 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Redo"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Zoom Scale Controls */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 rounded-xl px-2 py-1 text-xs text-[#0F172A] dark:text-white font-semibold">
          <button
            type="button"
            onClick={() => onZoomChange(Math.max(0.75, zoom - 0.15))}
            className="text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => onZoomChange(Math.min(1.25, zoom + 0.15))}
            className="text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Theme Toggle, Live ATS Inspector Trigger & Export */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <Button
          variant="outline"
          size="sm"
          leftIcon={<ShieldCheck className="h-4 w-4 text-[#16A34A] dark:text-[#22C55E]" />}
          onClick={() => onOpenInspector('ats')}
          className="text-xs px-2.5 sm:px-3 h-9 border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white"
        >
          <span>
            ATS: <strong className="text-[#16A34A] dark:text-[#22C55E]">{atsScore}</strong>
          </span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Sparkles className="h-4 w-4 text-[#22C55E]" />}
          onClick={() => onOpenInspector('ai')}
          className="text-xs px-2.5 sm:px-3 h-9"
        >
          <span className="hidden sm:inline">AI Copilot</span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}
          onClick={onExportPDF}
          className="text-xs px-3 sm:px-4 h-9 font-semibold"
        >
          <span>Export PDF</span>
        </Button>

        <Avatar name="Alex Vance" size="sm" className="hidden sm:inline-flex" />
      </div>
    </header>
  );
};
