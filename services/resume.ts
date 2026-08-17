import { ResumeData } from '@/types/resume';

export async function fetchSampleResume(): Promise<ResumeData> {
  return {
    id: 'res_sample_01',
    title: 'Senior Frontend Engineer Resume',
    personalDetails: {
      fullName: 'Alex Vance',
      jobTitle: 'Senior Staff Frontend Architect',
      email: 'alex.vance@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexvance',
      github: 'github.com/alexvance',
      summary: 'Senior Frontend Architect with 8+ years building enterprise React & Next.js applications serving millions of active users. Expert in high-performance design systems, web performance, and state management.',
    },
    experience: [
      {
        id: 'exp_1',
        company: 'Vercel',
        position: 'Staff Frontend Engineer',
        location: 'San Francisco, CA',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        bulletPoints: [
          'Architected core dashboard infrastructure using Next.js App Router, reducing initial page load LCP by 42%.',
          'Engineered reusable design system component library adopted across 14 internal product teams.',
          'Mentored 6 senior engineers and led accessibility (WCAG AA) compliance initiatives across all marketing surfaces.',
        ],
      },
      {
        id: 'exp_2',
        company: 'Stripe',
        position: 'Senior UI Engineer',
        location: 'San Francisco, CA',
        startDate: '2019',
        endDate: '2022',
        current: false,
        bulletPoints: [
          'Built high-converting checkout surfaces processing $1.2B+ in annual transaction volume.',
          'Optimized Framer Motion micro-animations reducing animation frame drop rate to under 0.1%.',
        ],
      },
    ],
    education: [
      {
        id: 'edu_1',
        institution: 'Stanford University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        location: 'Stanford, CA',
        startDate: '2015',
        endDate: '2019',
        gpa: '3.9',
      },
    ],
    skills: [
      {
        category: 'Frontend & Frameworks',
        skills: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      },
      {
        category: 'Architecture & Tooling',
        skills: ['Design Systems', 'Web Performance (Core Web Vitals)', 'WCAG AA Accessibility', 'REST & GraphQL'],
      },
    ],
    projects: [
      {
        id: 'proj_1',
        name: 'Design Token Compiler',
        description: 'Open-source CLI compiling design tokens across Web, iOS, and Android targets.',
        technologies: ['TypeScript', 'Node.js', 'AST Parser'],
        link: 'https://github.com/alexvance/token-compiler',
      },
    ],
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-08-01T14:30:00Z',
    atsScore: 91,
  };
}
