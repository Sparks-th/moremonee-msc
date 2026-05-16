import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  MessageSquare,
  Moon,
  ShieldCheck,
  Sun,
  Trophy,
  Users,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import type { DashboardTab } from '../types/community';
import { NETWORK_STATS } from '../constants/mockData';
import BrandMark from './common/BrandMark';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

type NavItem = { id: DashboardTab; label: string; icon: typeof MessageSquare };

const navItems: NavItem[] = [
  { id: 'feed', label: 'Conversations', icon: MessageSquare },
  { id: 'referrals', label: 'Referral Hub', icon: Users },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
];

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('mmsc-theme');
  if (stored === 'light') return false;
  if (stored === 'dark') return true;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function MainLayout({
  children,
  activeTab,
  setActiveTab,
}: MainLayoutProps) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [copied, setCopied] = useState(false);

  const handleDisconnect = useCallback(() => {
    logout();
    navigate('/', { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('mmsc-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const copyReferral = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(NETWORK_STATS.referralCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-[#0A0F1E] dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <BrandMark />

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-slate-600 transition-colors duration-200 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {isDark ? (
                <Sun className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Moon className="h-4 w-4" strokeWidth={2} />
              )}
            </button>

            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                Secure Node
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white py-1 pl-1 pr-2.5 dark:border-slate-800/80 dark:bg-slate-900/60">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[10px] font-bold text-white">
                DM
              </span>
              <span className="hidden text-xs font-semibold text-slate-700 dark:text-slate-200 sm:inline">
                Dev M.
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 p-3 md:gap-6 md:p-4 lg:p-6">
        {isAuthenticated && (
        <aside className="panel-card sticky top-[4.5rem] hidden h-[calc(100vh-6rem)] w-60 shrink-0 flex-col justify-between p-4 md:flex lg:w-64">
          <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-slate-50 p-3 dark:border-slate-800/60 dark:bg-slate-800/40">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
                DM
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                  Dev Malvryx
                </p>
                <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                  FUTA Node
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors duration-200 ${
                      isActive
                        ? 'border-l-2 border-blue-500 bg-blue-500/10 text-slate-900 dark:text-slate-100'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-500' : ''}`}
                      strokeWidth={2}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            onClick={handleDisconnect}
            className="mt-4 flex w-full items-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-xs font-medium text-red-500 transition-colors duration-200 hover:border-red-500/20 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            Disconnect
          </button>
        </aside>
        )}

        <main className={`min-w-0 flex-1 ${isAuthenticated ? 'pb-20 md:pb-0' : ''}`}>
          <div className="mx-auto w-full max-w-2xl">{children}</div>
        </main>

        <aside className="hidden w-72 shrink-0 flex-col gap-4 lg:flex">
          <div className="panel-card p-4">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Network Stats
            </h3>
            <dl className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2 dark:border-slate-800/80">
                <dt className="text-slate-500 dark:text-slate-400">Integrity</dt>
                <dd className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {NETWORK_STATS.integrity}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2 dark:border-slate-800/80">
                <dt className="text-slate-500 dark:text-slate-400">Active Ambassadors</dt>
                <dd className="font-semibold text-slate-900 dark:text-slate-100">
                  {NETWORK_STATS.activeAmbassadors.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-slate-500 dark:text-slate-400">Referral Link</dt>
                <dd className="flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-1.5 text-[11px] font-mono font-semibold text-blue-600 dark:border-slate-800/80 dark:bg-slate-800/60 dark:text-blue-400">
                    {NETWORK_STATS.referralCode}
                  </code>
                  <button
                    type="button"
                    onClick={copyReferral}
                    className="shrink-0 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {isAuthenticated && (
      <nav className="panel-card fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className="flex flex-1 flex-col items-center gap-0.5 py-1"
            >
              <Icon
                className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}
                strokeWidth={2}
              />
              <span
                className={`text-[9px] font-medium ${
                  isActive
                    ? 'font-semibold text-slate-900 dark:text-slate-100'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
      )}
    </div>
  );
}