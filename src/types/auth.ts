export interface AuthUser {
  userid: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  referral_code: string;
  signup_referral_code: string;
  is_admin: number;
}

export interface LoginSuccessResponse {
  success: true;
  token: string;
  token_type: string;
  user: AuthUser;
}

export interface LoginErrorResponse {
  success: false;
  errors: Record<string, string[]>;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export interface RegisterPayload {
  username: string;
  password: string;
  university: string;
  department: string;
  level: string;
  matric_number: string;
  future_aspirations: string;
  signup_referral_code?: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  state: string;
  priority: number;
}

export interface PaginatedUniversities {
  links: { next: string | null; previous: string | null };
  total: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  results: University[];
}
