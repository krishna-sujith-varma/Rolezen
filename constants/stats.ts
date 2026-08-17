export interface StatMetric {
  label: string;
  value: string;
  description: string;
}

export const PLATFORM_STATS: StatMetric[] = [
  {
    label: 'ATS Pass Rate',
    value: '98.4%',
    description: 'Average score improvement across top HR parsers',
  },
  {
    label: 'Resumes Built',
    value: '250,000+',
    description: 'Created by job seekers worldwide',
  },
  {
    label: 'Interview Rate',
    value: '3.4x',
    description: 'Higher response rate compared to static PDFs',
  },
  {
    label: 'User Rating',
    value: '4.9/5',
    description: 'Based on 12,000+ verified professional reviews',
  },
];
