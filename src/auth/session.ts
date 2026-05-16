import type { AuthUser } from '../types/auth';

const SESSION_KEY = 'mmsc_session_v1';
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // align with long-lived JWT from API

export interface MmscSession {
  token: string;
  tokenType: string;
  user: AuthUser;
  issuedAt: number;
  verified: true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseUser(value: unknown): AuthUser | null {
  if (!isRecord(value)) return null;
  if (typeof value.userid !== 'number') return null;
  if (typeof value.username !== 'string') return null;
  if (typeof value.email !== 'string') return null;
  if (typeof value.firstname !== 'string') return null;
  if (typeof value.lastname !== 'string') return null;
  if (typeof value.referral_code !== 'string') return null;
  return {
    userid: value.userid,
    username: value.username,
    email: value.email,
    firstname: value.firstname,
    lastname: value.lastname,
    referral_code: String(value.referral_code),
    signup_referral_code: String(value.signup_referral_code ?? ''),
    is_admin: Number(value.is_admin ?? 0),
  };
}

function parseSession(raw: string | null): MmscSession | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return null;
    if (typeof data.token !== 'string' || data.token.length < 20) return null;
    if (typeof data.issuedAt !== 'number' || !Number.isFinite(data.issuedAt)) return null;
    if (data.verified !== true) return null;
    const user = parseUser(data.user);
    if (!user) return null;
    if (Date.now() - data.issuedAt > MAX_AGE_MS) return null;
    return {
      token: data.token,
      tokenType: typeof data.tokenType === 'string' ? data.tokenType : 'bearer',
      user,
      issuedAt: data.issuedAt,
      verified: true,
    };
  } catch {
    return null;
  }
}

export function getSession(): MmscSession | null {
  if (typeof window === 'undefined') return null;
  return parseSession(sessionStorage.getItem(SESSION_KEY));
}

export function getAuthToken(): string | null {
  return getSession()?.token ?? null;
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function establishSession(
  token: string,
  tokenType: string,
  user: AuthUser,
): void {
  if (!token || token.length < 20) return;
  const session: MmscSession = {
    token,
    tokenType,
    user,
    issuedAt: Date.now(),
    verified: true,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

/** Dev-only — blocked in production */
export function establishDevSession(): boolean {
  if (!import.meta.env.DEV) return false;
  establishSession('dev-token-not-for-production', 'bearer', {
    userid: 0,
    username: 'dev-user',
    email: 'dev@moremonee.local',
    firstname: 'Dev',
    lastname: 'User',
    referral_code: 'DEV-CODE',
    signup_referral_code: '',
    is_admin: 0,
  });
  return true;
}
