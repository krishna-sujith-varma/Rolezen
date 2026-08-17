import { ATSAnalysisResult } from '@/types/ats';

export async function analyzeATSScore(): Promise<ATSAnalysisResult> {
  // Simulated asynchronous API payload representing real-time ATS analysis backend response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        overallScore: 91,
        formattingScore: 96,
        skillsScore: 94,
        keywordsScore: 88,
        readabilityScore: 97,
        matchedKeywords: [
          { keyword: 'React', found: true, frequency: 6, importance: 'high' },
          { keyword: 'TypeScript', found: true, frequency: 4, importance: 'high' },
          { keyword: 'Next.js', found: true, frequency: 3, importance: 'high' },
          { keyword: 'Tailwind CSS', found: true, frequency: 3, importance: 'medium' },
          { keyword: 'System Architecture', found: true, frequency: 2, importance: 'high' },
        ],
        missingKeywords: [
          { keyword: 'GraphQL', found: false, frequency: 0, importance: 'medium' },
          { keyword: 'Docker', found: false, frequency: 0, importance: 'low' },
        ],
        categoryBreakdown: [
          {
            name: 'Contact Information',
            score: 100,
            maxScore: 100,
            status: 'excellent',
            suggestions: ['Email, phone, LinkedIn and location properly formatted.'],
          },
          {
            name: 'Hard Skills Match',
            score: 94,
            maxScore: 100,
            status: 'excellent',
            suggestions: ['High alignment with senior frontend job specs.'],
          },
          {
            name: 'Formatting & Layout',
            score: 96,
            maxScore: 100,
            status: 'excellent',
            suggestions: ['Clean standard margins with zero unparseable graphics.'],
          },
        ],
        actionableInsights: [
          'Add 2 additional cloud infrastructure keywords (e.g. AWS, Docker) to reach 95%+ match.',
          'Quantify 1 more bullet point in the Work Experience section with percentage impact.',
        ],
      });
    }, 400);
  });
}
