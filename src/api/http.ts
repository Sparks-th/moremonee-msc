import { apiPath } from '../config/env';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

function defaultHeaders(): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    origin: 'https://students.moremonee.com',
    referer: 'https://students.moremonee.com/',
  };
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers: customHeaders, ...rest } = options;
  const headers = new Headers(defaultHeaders());
  if (customHeaders) {
    new Headers(customHeaders).forEach((value, key) => headers.set(key, value));
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(apiPath(path), {
    ...rest,
    headers,
  });

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      extractErrorMessage(data) ?? `Request failed (${response.status})`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export function extractErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;

  if (record.success === false && record.errors) {
    const errors = record.errors;
    if (typeof errors === 'object' && errors !== null) {
      const parts: string[] = [];
      for (const value of Object.values(errors as Record<string, unknown>)) {
        if (Array.isArray(value)) {
          parts.push(...value.map(String));
        } else if (value) {
          parts.push(String(value));
        }
      }
      if (parts.length) return parts.join(' ');
    }
  }

  if (typeof record.detail === 'string') return record.detail;
  if (typeof record.message === 'string') return record.message;
  return null;
}
