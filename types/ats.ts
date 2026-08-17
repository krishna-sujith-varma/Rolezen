export interface ATSCategoryScore {
  name: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  suggestions: string[];
}

export interface KeywordMatch {
  keyword: string;
  found: boolean;
  frequency: number;
  importance: 'high' | 'medium' | 'low';
}

export interface ATSAnalysisResult {
  overallScore: number;
  formattingScore: number;
  skillsScore: number;
  keywordsScore: number;
  readabilityScore: number;
  matchedKeywords: KeywordMatch[];
  missingKeywords: KeywordMatch[];
  categoryBreakdown: ATSCategoryScore[];
  actionableInsights: string[];
}
