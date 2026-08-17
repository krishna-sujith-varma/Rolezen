export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'ats-compatibility',
    question: 'How does CareerFlow guarantee 90%+ ATS compatibility?',
    answer: 'CareerFlow strips out tables, complex non-standard graphics, and nested text boxes that break legacy parsing algorithms (Workday, Taleo, Greenhouse). Our templates output clean structural markup that ATS systems read with 100% fidelity.',
  },
  {
    id: 'ai-accuracy',
    question: 'Is the AI content customized to my industry?',
    answer: 'Yes. CareerFlow utilizes fine-tuned AI engines trained on thousands of accepted candidates across FAANG, Fortune 500, and top venture-backed startups. Bullet points are auto-tailored using quantitative metric patterns.',
  },
  {
    id: 'pdf-export',
    question: 'Can I export vector PDFs and raw JSON data?',
    answer: 'Absolutely. CareerFlow supports crisp single-page PDF exports with embedded selectable text, as well as open-standard JSON Resume schema format for full data portability.',
  },
  {
    id: 'privacy-security',
    question: 'Is my personal data confidential and secure?',
    answer: 'We enforce enterprise SOC2 Type II compliance standards. Your resume content is never sold or utilized for public model training. You own your data 100%.',
  },
  {
    id: 'free-trial',
    question: 'What is included in the free tier?',
    answer: 'You can create 1 full resume, access 3 premium templates, and run 5 complete ATS scans for free without entering a credit card.',
  },
];
