import { Link } from 'react-router-dom';
import { ArrowRight, Lock, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../auth/AuthContext';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface AuthRequiredModalProps {
  open: boolean;
  onClose: () => void;
  onVisitDashboard?: () => void;
}

export default function AuthRequiredModal({
  open,
  onClose,
  onVisitDashboard,
}: AuthRequiredModalProps) {
  const { isAuthenticated } = useAuth();
  useBodyScrollLock(open);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
          <Lock className="h-6 w-6" strokeWidth={2} />
        </div>

        <h2
          id="auth-modal-title"
          className="text-lg font-bold text-slate-900 dark:text-slate-100"
        >
          Authentication required
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Sign in or join the community to access full features — like, comment,
          share, and earn referral rewards.
        </p>

        {isAuthenticated ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                onVisitDashboard?.();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1931] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Visit Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              onClick={onClose}
              className="flex flex-1 items-center justify-center rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0A1931] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Join Community
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
