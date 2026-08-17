import { UserProfile } from '@/types/user';

export async function getCurrentUser(): Promise<UserProfile | null> {
  return {
    id: 'usr_mock_01',
    email: 'user@careerflow.ai',
    name: 'Alex Vance',
    plan: 'pro',
    createdAt: '2026-01-01T00:00:00Z',
  };
}
