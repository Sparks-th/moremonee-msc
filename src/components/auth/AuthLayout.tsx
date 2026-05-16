import { Link } from 'react-router-dom';
import authBg from '../../assets/auth.png';
import BrandMark from '../common/BrandMark';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <img
        src={authBg}
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-[#0A0F1E]/75 backdrop-blur-[2px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col px-4 py-8 sm:px-6">
        <header className="mb-6 flex items-center justify-between">
          <Link to="/">
            <BrandMark />
          </Link>
          <Link
            to="/"
            className="text-xs font-medium text-slate-300 transition-colors hover:text-white"
          >
            Go to home page
          </Link>
        </header>

        <div className="panel-card flex-1 border-slate-200/90 bg-white/95 p-6 shadow-xl backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/95 sm:p-8">
          <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
