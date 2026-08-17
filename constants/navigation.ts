import { NavItem } from '@/types/navigation';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'ATS Analyzer', href: '#ats-demo', badge: 'AI Power' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'FAQ', href: '#faq' },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: 'Resume Builder', href: '#features' },
  { label: 'Resume Optimizer', href: '#features' },
  { label: 'ATS Checker', href: '#ats-demo' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'Contact', href: '/contact' },
];
