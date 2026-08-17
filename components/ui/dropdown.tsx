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
      {label && <label className="block text-xs font-semibold text-[#0F172A]">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        className="flex h-11 min-h-[44px] w-full items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-sm text-[#0F172A] focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 cursor-pointer select-none"
      >
        <span className={selected ? 'text-[#0F172A] font-medium' : 'text-[#64748B]'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={cn('h-4 w-4 text-[#64748B] transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute z-50 mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-lg overflow-hidden max-h-60 overflow-y-auto"
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
                  option.value === value ? 'bg-[#DCFCE7] text-[#16A34A] font-bold' : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                )}
              >
                <span>{option.label}</span>
                {option.value === value && <Check className="h-4 w-4 text-[#16A34A]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
