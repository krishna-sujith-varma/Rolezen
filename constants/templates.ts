import { ResumeTemplate } from '@/types/template';

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'executive',
    name: 'The Executive',
    category: 'Executive',
    description: 'Clean serif accents designed for senior leaders, VPs, and C-suite directors.',
    isPopular: true,
    accentColor: '#0F172A',
    badge: 'Popular',
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead',
    category: 'Engineering',
    description: 'Structured layout emphasizing technical stack, open source, and scale metrics.',
    isPopular: true,
    accentColor: '#16A34A',
    badge: 'Engineers',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimalist',
    category: 'Minimal',
    description: 'High white-space ratio with subtle borders. Inspired by Apple design guidelines.',
    accentColor: '#475569',
  },
  {
    id: 'creative-director',
    name: 'Creative Director',
    category: 'Creative',
    description: 'Asymmetric grid layout tailored for design leads, product managers, and agency founders.',
    accentColor: '#2563EB',
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'Engineering',
    description: 'Compact density optimized for publication links, patents, and technical toolsets.',
    accentColor: '#0D9488',
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    category: 'Modern',
    description: 'Highlights venture outcomes, revenue velocity, and cross-functional execution.',
    accentColor: '#7C3AED',
  },
];
