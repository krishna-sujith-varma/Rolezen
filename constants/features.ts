export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'builder' | 'optimizer' | 'ats';
  highlights: string[];
  badge?: string;
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'builder',
    title: 'Resume Builder',
    subtitle: 'Pixel-perfect precision formatting',
    description: 'Design executive-ready resumes with instant dynamic layout engine, real-time live preview, and intelligent content suggestions.',
    iconName: 'builder',
    highlights: ['Multi-column templates', 'Real-time auto save', 'Custom typography rules'],
    badge: 'Core Engine',
  },
  {
    id: 'optimizer',
    title: 'Resume Optimizer',
    subtitle: 'AI Content Generation & Enhancement',
    description: 'Transform weak bullet points into high-impact metric achievement statements using industry-specific XYZ accomplishments.',
    iconName: 'optimizer',
    highlights: ['Action verb transformer', 'Metric enhancer', 'Grammar & tone check'],
    badge: 'GPT-4o Powered',
  },
  {
    id: 'ats',
    title: 'ATS Analyzer',
    subtitle: 'Beat the Applicant Tracking Systems',
    description: 'Scan your resume against job descriptions to discover missing hard skills, formatting flags, and keyword match scores.',
    iconName: 'ats',
    highlights: ['Hard skill extraction', 'Parsing score predictor', 'Role keyword diff'],
    badge: 'Live Scoring',
  },
];
