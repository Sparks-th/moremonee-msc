import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

type AuthCtaVariant = 'primary' | 'header' | 'footer';

interface AuthCtaProps {
  variant?: AuthCtaVariant;
  onVisitDashboard?: () => void;
  className?: string;
}

export default function AuthCta({
  variant = 'primary',
  onVisitDashboard,
  className = '',
}: AuthCtaProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <button
        type="button"
        onClick={onVisitDashboard}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#0A1931] font-semibold text-white transition-colors hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 ${ctaSizeClass(variant)} ${className}`}
      >
        <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
        Visit Dashboard
      </button>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Link
          to="/login"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-[#0A1931] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
        >
          Join Community
        </Link>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <Link
        to="/register"
        className={`inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-[#0A1931] px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-900/20 transition-colors hover:bg-blue-900 sm:w-auto ${className}`}
      >
        Join Community
        <ArrowRight className="h-5 w-5" strokeWidth={2} />
      </Link>
    );
  }

  return (
    <Link
      to="/register"
      className={`inline-flex items-center gap-2 rounded-full bg-amber-400 font-bold text-slate-900 shadow-lg shadow-amber-500/25 transition-colors hover:bg-amber-300 ${ctaSizeClass(variant)} ${className}`}
    >
      Join Now
      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
    </Link>
  );
}

function ctaSizeClass(variant: AuthCtaVariant): string {
  switch (variant) {
    case 'footer':
      return 'px-8 py-4 text-base';
    case 'header':
      return 'px-4 py-2 text-sm';
    default:
      return 'px-6 py-3 text-sm';
  }
}
