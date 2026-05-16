import type {
  LoginResponse,
  LoginSuccessResponse,
  RegisterPayload,
} from '../types/auth';
import { apiRequest, extractErrorMessage } from './http';

export async function loginAmbassador(
  username: string,
  password: string,
): Promise<LoginSuccessResponse> {
  const data = await apiRequest<LoginResponse>(
    '/api/v1/student-community/login-ambassador/',
    {
      method: 'POST',
      body: JSON.stringify({ username: username.trim(), password }),
    },
  );

  if (!data || typeof data !== 'object' || !('success' in data)) {
    throw new Error('Unexpected login response');
  }

  if (data.success === false) {
    throw new Error(extractErrorMessage(data) ?? 'Invalid credentials.');
  }

  if (!data.token || !data.user) {
    throw new Error('Login succeeded but session data was incomplete.');
  }

  return data;
}

export async function registerAmbassador(
  payload: RegisterPayload,
): Promise<LoginSuccessResponse> {
  const body: Record<string, string> = {
    username: payload.username.trim(),
    password: payload.password,
    university: payload.university,
    department: payload.department.trim(),
    level: payload.level.trim(),
    matric_number: payload.matric_number.trim(),
    future_aspirations: payload.future_aspirations.trim(),
  };

  if (payload.signup_referral_code?.trim()) {
    body.signup_referral_code = payload.signup_referral_code.trim();
  }

  const data = await apiRequest<LoginResponse>(
    '/api/v1/student-community/register-ambassador/',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
  );

  if (data && typeof data === 'object' && 'success' in data && data.success === false) {
    throw new Error(extractErrorMessage(data) ?? 'Registration failed.');
  }

  if (data && 'token' in data && data.token && 'user' in data && data.user) {
    return data as LoginSuccessResponse;
  }

  if (data && typeof data === 'object' && 'success' in data && data.success === true) {
    return data as LoginSuccessResponse;
  }

  throw new Error('Registration completed but response format was unexpected.');
}
