const DEFAULT_API_BASE = 'https://studentcommunityapi.moremonee.com';

function normalizeBase(url: string): string {
  return url.replace(/\/$/, '');
}

/**
 * In dev, if VITE_API_BASE_URL is unset, requests use `/api` (Vite proxy).
 * In production, defaults to the live API host when env is missing.
 */
export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (fromEnv?.trim()) return normalizeBase(fromEnv.trim());
  if (import.meta.env.DEV) return '';
  return DEFAULT_API_BASE;
}

export function apiPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const base = getApiBaseUrl();
  if (!base) return normalized.startsWith('/api') ? normalized : `/api${normalized}`;
  return `${base}${normalized}`;
}

export const EXTERNAL_URLS = {
  moremoneeApp:
    (import.meta.env.VITE_MOREMONEE_APP_URL as string | undefined)?.trim() ||
    'https://moremonee.com',
  forgotPassword:
    (import.meta.env.VITE_FORGOT_PASSWORD_URL as string | undefined)?.trim() ||
    'https://students.moremonee.com/forgot-password',
} as const;
