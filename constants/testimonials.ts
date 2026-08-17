export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  highlight: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Staff Software Engineer',
    company: 'Stripe',
    avatar: 'SJ',
    content: 'CareerFlow flagged 12 missing keywords and invalid margins on my old resume. After using the AI Optimizer, I received interview calls from Meta and Apple within 5 days.',
    rating: 5,
    highlight: 'Received interviews at Meta & Apple',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    role: 'Director of Product',
    company: 'Linear',
    avatar: 'MV',
    content: 'The level of polish in CareerFlow is unmatched. It feels like Figma for resumes. The live ATS panel gave me full confidence before applying.',
    rating: 5,
    highlight: 'Feels like Figma for resumes',
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'Head of People & Talent',
    company: 'Vercel',
    avatar: 'ER',
    content: 'As a recruiter who reviews 500+ resumes a week, I can immediately spot a CareerFlow resume. They are exceptionally clean, well-formatted, and easy to parse.',
    rating: 5,
    highlight: 'Recruiter-approved quality',
  },
];
