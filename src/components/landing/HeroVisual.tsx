import studentPhoto from '../../assets/landing-student.png';
import promoDuo from '../../assets/landing-promo-duo.png';
import heroCard from '../../assets/hero.png';
import LimitedTimeBadge from '../common/LimitedTimeBadge';

export type HeroVisualVariant = 'student' | 'trivia' | 'promo-tilted';

interface HeroVisualProps {
  variant: HeroVisualVariant;
  priority?: boolean;
}

const STUDENT_FRAME =
  'relative mx-auto w-full overflow-hidden rounded-2xl bg-slate-900/40 shadow-2xl ring-1 ring-white/15';

export default function HeroVisual({ variant, priority = false }: HeroVisualProps) {
  if (variant === 'student') {
    return (
      <div className={`${STUDENT_FRAME} aspect-[4/5] max-w-[200px] sm:max-w-[240px] lg:max-w-[260px]`}>
        <img
          src={studentPhoto}
          alt="Student holding a laptop on campus"
          className="h-full w-full object-cover object-[center_20%]"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    );
  }

  if (variant === 'trivia') {
    return (
      <div className="relative mx-auto flex w-full max-w-[240px] items-center justify-center sm:max-w-[260px] lg:max-w-[280px]">
        <img
          src={heroCard}
          alt="MoreMonee MSC card"
          className="w-full max-w-[200px] rotate-[-8deg] drop-shadow-2xl transition-transform duration-300 sm:max-w-[220px] lg:max-w-[240px] lg:rotate-[-6deg]"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-xl border border-white/10 bg-slate-900/75 px-4 py-3 text-center shadow-lg backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              MSC Trivia
            </p>
            <p className="mt-1 text-sm font-black leading-tight text-white">
              Play · Rank · Win
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-slate-300">
              Climb the leaderboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[280px] flex-col items-center justify-center gap-3 px-2 sm:max-w-[300px] lg:max-w-[320px]">
      <LimitedTimeBadge />
      <img
        src={promoDuo}
        alt="Referral and instant bonus rewards"
        className="w-full rotate-[6deg] object-contain drop-shadow-2xl transition-transform duration-300 sm:max-w-[260px] lg:max-w-[280px] lg:rotate-[8deg]"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
