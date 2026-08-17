import { PersonalDetails, WorkExperience, Education, SkillCategory } from '@/types/resume';
import { ATSAnalysisResult, KeywordMatch } from '@/types/ats';

const STRONG_ACTION_VERBS = [
  'spearheaded',
  'architected',
  'engineered',
  'optimized',
  'designed',
  'developed',
  'built',
  'led',
  'implemented',
  'streamlined',
  'reduced',
  'accelerated',
  'delivered',
  'deployed',
  'automated',
  'scaled',
  'transformed',
  'orchestrated',
  'pioneered',
  'launched',
  'integrated',
  'modernized',
  'increased',
  'decreased',
  'mentored',
  'authored',
  'managed',
];

const COMMON_TECH_KEYWORDS: Record<string, string[]> = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'System Architecture', 'GraphQL', 'Redux', 'REST APIs', 'Performance Optimization', 'CI/CD', 'Jest', 'Webpack', 'Vite'],
  backend: ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes', 'Microservices', 'Redis', 'AWS', 'gRPC', 'SQL', 'System Design'],
  manager: ['Team Leadership', 'Agile / Scrum', 'Roadmap Planning', 'Cross-Functional Collaboration', 'Sprint Delivery', 'Hiring & Mentorship', 'Budget Management'],
  general: ['Problem Solving', 'Data Structures', 'Algorithms', 'Clean Architecture', 'Git', 'Unit Testing', 'Code Review'],
};

export interface ResumeMetrics {
  totalWords: number;
  totalCharacters: number;
  atsScore: number;
  formattingScore: number;
  skillsScore: number;
  keywordsScore: number;
  readabilityScore: number;
  actionVerbCount: number;
  quantifiedBulletCount: number;
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  actionableInsights: string[];
}

export function calculateRealtimeATS(
  personalDetails: PersonalDetails,
  experiences: WorkExperience[],
  education: Education[],
  skills: SkillCategory[]
): ResumeMetrics {
  let totalWords = 0;
  let totalCharacters = 0;

  const countText = (str?: string) => {
    if (!str) return;
    const trimmed = str.trim();
    if (!trimmed) return;
    const words = trimmed.split(/\s+/).filter(Boolean);
    totalWords += words.length;
    totalCharacters += trimmed.length;
  };

  // 1. Count personal details
  countText(personalDetails.fullName);
  countText(personalDetails.jobTitle);
  countText(personalDetails.email);
  countText(personalDetails.phone);
  countText(personalDetails.location);
  countText(personalDetails.linkedin);
  countText(personalDetails.github);
  countText(personalDetails.summary);

  // 2. Count experience
  let totalBullets = 0;
  let actionVerbMatches = 0;
  let quantifiedBullets = 0;

  experiences.forEach((exp) => {
    countText(exp.company);
    countText(exp.position);
    countText(exp.location);
    countText(exp.startDate);
    countText(exp.endDate);

    exp.bulletPoints.forEach((bullet) => {
      countText(bullet);
      totalBullets++;

      const lowerBullet = bullet.toLowerCase();
      // Check for action verbs
      const hasActionVerb = STRONG_ACTION_VERBS.some((verb) => lowerBullet.includes(verb));
      if (hasActionVerb) actionVerbMatches++;

      // Check for numbers, percentages, dollar amounts
      const hasMetrics = /([0-9]+%|\$[0-9]+|[0-9]+x|[0-9]+\+?)/i.test(bullet);
      if (hasMetrics) quantifiedBullets++;
    });
  });

  // 3. Count education
  education.forEach((edu) => {
    countText(edu.institution);
    countText(edu.degree);
    countText(edu.fieldOfStudy);
    countText(edu.location);
    countText(edu.startDate);
    countText(edu.endDate);
  });

  // 4. Count skills
  const extractedSkills: string[] = [];
  skills.forEach((sg) => {
    countText(sg.category);
    sg.skills.forEach((s) => {
      countText(s);
      extractedSkills.push(s);
    });
  });

  // --- Scoring Component Breakdown ---
  // A. Contact Information (Max 15 pts)
  let contactPoints = 0;
  if ((personalDetails.fullName?.trim().length ?? 0) > 2) contactPoints += 3;
  if ((personalDetails.jobTitle?.trim().length ?? 0) > 2) contactPoints += 3;
  if (personalDetails.email?.includes('@')) contactPoints += 3;
  if ((personalDetails.phone?.trim().length ?? 0) > 5) contactPoints += 2;
  if ((personalDetails.location?.trim().length ?? 0) > 2) contactPoints += 2;
  if ((personalDetails.linkedin?.trim().length ?? 0) > 3 || (personalDetails.github?.trim().length ?? 0) > 3) contactPoints += 2;


  // B. Summary (Max 10 pts)
  let summaryPoints = 0;
  const summaryWords = personalDetails.summary ? personalDetails.summary.trim().split(/\s+/).length : 0;
  if (summaryWords >= 15 && summaryWords <= 80) summaryPoints = 10;
  else if (summaryWords > 0) summaryPoints = 5;

  // C. Work Experience & Action Verbs (Max 30 pts)
  let expPoints = 0;
  if (experiences.length >= 1) expPoints += 10;
  if (experiences.length >= 2) expPoints += 5;
  if (totalBullets >= 3) expPoints += 5;
  if (actionVerbMatches >= 2) expPoints += 5;
  if (actionVerbMatches >= 4) expPoints += 5;

  // D. Quantified Metrics (Max 20 pts)
  let metricPoints = 0;
  if (quantifiedBullets >= 1) metricPoints += 8;
  if (quantifiedBullets >= 2) metricPoints += 7;
  if (quantifiedBullets >= 3) metricPoints += 5;

  // E. Skills & Keywords (Max 20 pts)
  let skillPoints = 0;
  if (extractedSkills.length >= 4) skillPoints += 8;
  if (extractedSkills.length >= 8) skillPoints += 7;
  if (extractedSkills.length >= 12) skillPoints += 5;

  // F. Education (Max 5 pts)
  let eduPoints = 0;
  if (education.length >= 1 && education[0].institution?.trim()) eduPoints = 5;

  const totalScore = Math.min(100, Math.max(20, contactPoints + summaryPoints + expPoints + metricPoints + skillPoints + eduPoints));

  // Determine sub-scores
  const formattingScore = Math.min(100, 92 + (totalScore > 80 ? 6 : totalScore > 60 ? 3 : 0));
  const skillsScore = Math.min(100, Math.round((skillPoints / 20) * 40 + 60));
  const keywordsScore = Math.min(100, Math.round((metricPoints / 20) * 30 + (actionVerbMatches > 0 ? 65 : 45)));
  const readabilityScore = Math.min(100, summaryWords > 10 && totalWords > 150 ? 96 : 85);

  // Keyword Matching
  const targetRoleLower = (personalDetails.jobTitle || 'software engineer').toLowerCase();
  let pool = COMMON_TECH_KEYWORDS.general;
  if (targetRoleLower.includes('front') || targetRoleLower.includes('ui') || targetRoleLower.includes('web')) {
    pool = [...COMMON_TECH_KEYWORDS.frontend, ...COMMON_TECH_KEYWORDS.general];
  } else if (targetRoleLower.includes('back') || targetRoleLower.includes('cloud') || targetRoleLower.includes('devops')) {
    pool = [...COMMON_TECH_KEYWORDS.backend, ...COMMON_TECH_KEYWORDS.general];
  } else if (targetRoleLower.includes('manag') || targetRoleLower.includes('lead') || targetRoleLower.includes('head')) {
    pool = [...COMMON_TECH_KEYWORDS.manager, ...COMMON_TECH_KEYWORDS.frontend];
  }

  const allResumeText = `${personalDetails.jobTitle} ${personalDetails.summary} ${experiences.map((e) => `${e.position} ${e.company} ${e.bulletPoints.join(' ')}`).join(' ')} ${extractedSkills.join(' ')}`.toLowerCase();

  const matchedKeywords: KeywordMatch[] = [];
  const missingKeywords: KeywordMatch[] = [];

  pool.forEach((kw) => {
    const isFound = allResumeText.includes(kw.toLowerCase());
    if (isFound) {
      matchedKeywords.push({ keyword: kw, found: true, frequency: 2, importance: 'high' });
    } else if (missingKeywords.length < 3) {
      missingKeywords.push({ keyword: kw, found: false, frequency: 0, importance: 'high' });
    }
  });

  // Actionable Insights
  const actionableInsights: string[] = [];
  if (actionVerbMatches < 3) {
    actionableInsights.push('Begin more bullet points with strong power action verbs (e.g. Spearheaded, Engineered, Architected).');
  }
  if (quantifiedBullets < 2) {
    actionableInsights.push('Quantify your achievements with measurable results (e.g., increased revenue by 24%, reduced latency by 40%).');
  }
  if (missingKeywords.length > 0) {
    actionableInsights.push(`Incorporate target role keywords like ${missingKeywords.map((k) => k.keyword).join(', ')} to maximize ATS match.`);
  }
  if (!personalDetails.summary || summaryWords < 20) {
    actionableInsights.push('Expand your professional summary to 2-3 concise, high-impact sentences highlighting your core specialization.');
  }

  return {
    totalWords,
    totalCharacters,
    atsScore: totalScore,
    formattingScore,
    skillsScore,
    keywordsScore,
    readabilityScore,
    actionVerbCount: actionVerbMatches,
    quantifiedBulletCount: quantifiedBullets,
    matchedKeywords,
    missingKeywords,
    actionableInsights,
  };
}
