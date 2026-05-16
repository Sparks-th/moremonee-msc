import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';
import type { AuthUser, LoginSuccessResponse } from '../types/auth';
import {
  clearSession,
  establishDevSession,
  establishSession,
  getSession,
  isAuthenticated,
  type MmscSession,
} from './session';

interface AuthContextValue {
  isAuthenticated: boolean;
  session: MmscSession | null;
  user: AuthUser | null;
  setAuthFromLogin: (response: LoginSuccessResponse) => void;
  logout: () => void;
  devLogin: () => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener('mmsc-auth-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('mmsc-auth-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getAuthSnapshot() {
  return isAuthenticated();
}

function emitAuthChange() {
  window.dispatchEvent(new Event('mmsc-auth-change'));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authed = useSyncExternalStore(subscribe, getAuthSnapshot, () => false);
  const session = authed ? getSession() : null;

  const setAuthFromLogin = useCallback((response: LoginSuccessResponse) => {
    establishSession(response.token, response.token_type, response.user);
    emitAuthChange();
  }, []);

  const logout = useCallback(() => {
    clearSession();
    emitAuthChange();
  }, []);

  const devLogin = useCallback(() => {
    const ok = establishDevSession();
    if (ok) emitAuthChange();
    return ok;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: authed,
      session,
      user: session?.user ?? null,
      setAuthFromLogin,
      logout,
      devLogin,
    }),
    [authed, session, setAuthFromLogin, logout, devLogin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
