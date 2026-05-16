import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PublicFeedPost } from '../types/feed';
import { useAuth } from '../auth/AuthContext';
import AuthRequiredModal from './landing/AuthRequiredModal';
import HeroCarousel from './landing/HeroCarousel';
import LandingFeed from './landing/LandingFeed';
import LandingHeader from './landing/LandingHeader';
import AuthCta from './common/AuthCta';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handlePostClick = (_post: PublicFeedPost) => {
    setAuthModalOpen(true);
  };

  const visitDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0A0F1E] dark:text-slate-100">
      <LandingHeader
        onProtectedNav={() => setAuthModalOpen(true)}
        onVisitDashboard={visitDashboard}
      />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:pt-10">
        <HeroCarousel onVisitDashboard={visitDashboard} />

        <div className="mt-10 lg:mt-14">
          <LandingFeed onPostClick={handlePostClick} />
        </div>

        <section className="mt-12 flex justify-center sm:mt-16">
          <AuthCta variant="footer" onVisitDashboard={visitDashboard} />
        </section>
      </main>

      <footer className="border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
        <p>© {new Date().getFullYear()} MoreMonee Student Community · The Gen Z Bank</p>
      </footer>

      <AuthRequiredModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onVisitDashboard={visitDashboard}
      />
    </div>
  );
}
