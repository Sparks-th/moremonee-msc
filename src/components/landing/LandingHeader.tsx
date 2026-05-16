import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import AuthCta from '../common/AuthCta';
import BrandMark from '../common/BrandMark';

const NAV_LINKS = [
  { label: 'Feed', href: '#feed' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Referrals', href: '#referrals' },
  { label: 'Trivia', href: '#trivia' },
] as const;

interface LandingHeaderProps {
  onProtectedNav?: () => void;
  onVisitDashboard?: () => void;
}

export default function LandingHeader({
  onProtectedNav,
  onVisitDashboard,
}: LandingHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0A0F1E]/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="/" className="shrink-0">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href === '#feed' ? '#feed' : undefined}
              onClick={(e) => {
                if (link.href !== '#feed' && onProtectedNav) {
                  e.preventDefault();
                  onProtectedNav();
                }
              }}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <AuthCta variant="header" onVisitDashboard={onVisitDashboard} />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-200"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200/80 px-4 py-4 md:hidden dark:border-slate-800/80">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href === '#feed' ? '#feed' : undefined}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (link.href !== '#feed' && onProtectedNav) {
                    e.preventDefault();
                    onProtectedNav();
                  }
                }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4">
            {isAuthenticated ? (
              <AuthCta
                variant="header"
                className="w-full"
                onVisitDashboard={() => {
                  setMobileOpen(false);
                  onVisitDashboard?.();
                }}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <AuthCta variant="header" onVisitDashboard={onVisitDashboard} />
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
