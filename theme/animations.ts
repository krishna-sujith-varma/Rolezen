export const animations = {
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: { type: 'spring', stiffness: 400, damping: 30 },
    gentleSpring: { type: 'spring', stiffness: 260, damping: 20 },
  },
  framerVariants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    hoverCard: {
      initial: { y: 0, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' },
      whileHover: { y: -4, boxShadow: '0 12px 24px -10px rgb(0 0 0 / 0.15)' },
    },
  },
} as const;
