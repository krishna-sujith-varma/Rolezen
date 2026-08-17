'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'hoverable' | 'glass' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-200';

    const variants = {
      default: '',
      hoverable: 'hover:border-[#CBD5E1] hover:shadow-md hover:-translate-y-1',
      glass: 'bg-white/80 backdrop-blur-md border-white/40 shadow-glass',
      bordered: 'border-2 border-[#E2E8F0]',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
