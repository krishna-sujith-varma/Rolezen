import { RESUME_TEMPLATES } from '@/constants/templates';
import { ResumeTemplate } from '@/types/template';

export async function getTemplates(): Promise<ResumeTemplate[]> {
  return RESUME_TEMPLATES;
}
