export interface ChallengeResult {
  allow: boolean;
  reason?: string;
}

export type UserRoles = 'Guest' | 'Administrator';

export interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  avatar: string;
  roles: UserRoles;
  deactivatedAt: string | null;
  deactivatedBy: string;
  lastActiveAt: string | null;
  userIdentifier: string;
  externalUserId: string;
  username: string;
}
