import React from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{label}</label>
        )}
        <textarea
          rows={rows}
          className={cn(
            'flex w-full rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-900/80 px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-slate-500 transition-colors focus:border-[#16A34A] dark:focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-[#EF4444] font-medium">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
