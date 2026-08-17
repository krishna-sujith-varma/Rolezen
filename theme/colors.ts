export const colors = {
  primary: {
    DEFAULT: '#16A34A', // Emerald 600
    hover: '#15803D',   // Emerald 700
    light: '#DCFCE7',   // Emerald 100
    dark: '#14532D',    // Emerald 900
    accent: '#22C55E',  // Emerald 500
  },
  secondary: {
    DEFAULT: '#0F172A', // Slate 900
    hover: '#1E293B',   // Slate 800
    surface: '#334155', // Slate 700
    muted: '#475569',   // Slate 600
  },
  background: {
    DEFAULT: '#FFFFFF',
    alt: '#F8FAFC',     // Slate 50
    dark: '#020617',
  },
  surface: {
    DEFAULT: '#F8FAFC',
    hover: '#F1F5F9',
    card: '#FFFFFF',
    border: '#E2E8F0',
  },
  border: {
    DEFAULT: '#E2E8F0', // Slate 200
    subtle: '#F1F5F9',  // Slate 100
    focus: '#16A34A',
    dark: '#1E293B',
  },
  text: {
    primary: '#0F172A',   // Slate 900
    secondary: '#475569', // Slate 600
    muted: '#64748B',     // Slate 500
    light: '#94A3B8',     // Slate 400
    inverse: '#FFFFFF',
  },
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

export type ThemeColors = typeof colors;
