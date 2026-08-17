'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ type = 'success', message, className }) => {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />,
    error: <AlertCircle className="h-5 w-5 text-[#EF4444]" />,
    info: <Info className="h-5 w-5 text-[#3B82F6]" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        'inline-flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-lg text-sm font-medium text-[#0F172A]',
        className
      )}
    >
      {icons[type]}
      <span>{message}</span>
    </motion.div>
  );
};
