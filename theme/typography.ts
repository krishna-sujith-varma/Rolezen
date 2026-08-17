export const typography = {
  fontFamily: {
    sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.01em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.01em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.011em' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
    '5xl': ['3rem', { lineHeight: '1.16', letterSpacing: '-0.035em' }],
    '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;
