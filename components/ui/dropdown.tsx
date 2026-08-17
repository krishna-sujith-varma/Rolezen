'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select option...',
  className,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn('relative w-full space-y-1.5', className)}>
      {label && <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        className="flex h-11 min-h-[44px] w-full items-center justify-between rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2 text-sm text-[#0F172A] dark:text-white focus:border-[#16A34A] dark:focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer select-none"
      >
        <span className={selected ? 'text-[#0F172A] dark:text-white font-medium' : 'text-[#64748B] dark:text-slate-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={cn('h-4 w-4 text-[#64748B] dark:text-slate-400 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute z-50 mt-1 w-full rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-[#0F172A] p-1 shadow-lg overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-left transition-colors cursor-pointer min-h-[44px]',
                  option.value === value
                    ? 'bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] font-bold'
                    : 'text-[#0F172A] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-slate-800'
                )}
              >
                <span>{option.label}</span>
                {option.value === value && <Check className="h-4 w-4 text-[#16A34A] dark:text-[#22C55E]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
