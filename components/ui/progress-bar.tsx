'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValue?: boolean;
  colorClass?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = true,
  colorClass = 'bg-[#16A34A]',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-medium text-[#0F172A]">
          {label && <span>{label}</span>}
          {showValue && <span className="font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
        <motion.div
          className={cn('h-full rounded-full', colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};
