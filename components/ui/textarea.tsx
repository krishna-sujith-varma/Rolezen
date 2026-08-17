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
          <label className="block text-xs font-medium text-[#0F172A]">{label}</label>
        )}
        <textarea
          rows={rows}
          className={cn(
            'flex w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#64748B] transition-colors focus:border-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
