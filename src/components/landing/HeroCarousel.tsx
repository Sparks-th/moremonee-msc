import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AuthCta from '../common/AuthCta';
import LimitedTimeBadge from '../common/LimitedTimeBadge';
import HeroVisual, { type HeroVisualVariant } from './HeroVisual';

const AUTO_INTERVAL_MS = 6000;

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  visual: HeroVisualVariant;
  limitedOffer?: boolean;
}

const SLIDES: HeroSlide[] = [
  {
    id: 'community',
    eyebrow: 'MoreMonee Student Community',
    title: 'Join the Student Community',
    highlight: '& Earn ₦500',
    description:
      'Connect with verified students nationwide. Share experiences, grow your network, and get rewarded instantly.',
    visual: 'student',
    limitedOffer: true,
  },
  {
    id: 'trivia',
    eyebrow: 'MSC Trivia Quiz',
    title: 'Climb the Leaderboard',
    highlight: '& Win Prizes',
    description:
      'Answer campus trivia, compete with students nationwide, and get your chance to win exciting rewards as a top performer.',
    visual: 'trivia',
  },
  {
    id: 'referrals',
    eyebrow: 'Refer & Earn',
    title: 'Invite Friends',
    highlight: '& Get Rewarded',
    description:
      'Earn instant bonuses and referral rewards when friends join. Share your link and grow the community on campus.',
    visual: 'promo-tilted',
    limitedOffer: true,
  },
];

interface HeroCarouselProps {
  onVisitDashboard?: () => void;
}

export default function HeroCarousel({ onVisitDashboard }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(next, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, next]);

  const slide = SLIDES[activeIndex];

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1931] via-[#0d2242] to-[#0A0F1E] shadow-2xl shadow-blue-900/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) < 40) return;
        if (delta < 0) next();
        else prev();
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative grid min-h-[340px] grid-cols-1 items-center gap-8 p-6 sm:min-h-[380px] sm:p-8 lg:min-h-[400px] lg:grid-cols-12 lg:gap-10 lg:p-10">
        <div className="z-10 space-y-5 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            {slide.limitedOffer && <LimitedTimeBadge />}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300/90">
              {slide.eyebrow}
            </p>
          </div>

          <div className="relative min-h-[128px] sm:min-h-[148px]">
            {SLIDES.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-500 ease-out ${
                  index === activeIndex
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                }`}
                aria-hidden={index !== activeIndex}
              >
                <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {item.title}
                  <span className="mt-1 block text-amber-400">{item.highlight}</span>
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <AuthCta onVisitDashboard={onVisitDashboard} />
        </div>

        <div className="relative z-10 flex justify-center lg:col-span-5">
          <div className="relative h-[220px] w-full max-w-[280px] sm:h-[260px] lg:h-[280px]">
            {SLIDES.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  index === activeIndex
                    ? 'scale-100 opacity-100'
                    : 'pointer-events-none scale-95 opacity-0'
                }`}
              >
                <HeroVisual
                  variant={item.visual}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="relative z-20 flex items-center justify-center gap-2 pb-5 pt-2">
        {SLIDES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-amber-400'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
