import { establishDevSession } from './auth/session';

/** Dev console only — `window.__MMSC_DEV_LOGIN__()` */
export function registerDevAuthTools(): void {
  if (!import.meta.env.DEV) return;
  (
    window as Window & { __MMSC_DEV_LOGIN__?: () => void }
  ).__MMSC_DEV_LOGIN__ = () => {
    if (establishDevSession()) {
      window.dispatchEvent(new Event('mmsc-auth-change'));
    }
  };
}
