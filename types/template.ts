export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'Executive' | 'Engineering' | 'Minimal' | 'Creative' | 'Modern' | 'Academic';
  description: string;
  isPopular?: boolean;
  accentColor: string;
  badge?: string;
}
