import { Trophy } from 'lucide-react';
import { LEADERBOARD_ENTRIES } from '../constants/mockData';

const PODIUM_ORDER = [1, 0, 2] as const;
const RANK_LABELS = ['1st', '2nd', '3rd'] as const;
const RANK_COLORS = [
  'border-amber-400/60 bg-amber-500/10 text-amber-500',
  'border-slate-300/60 bg-slate-200/50 text-slate-600 dark:border-slate-600/60 dark:bg-slate-800/60 dark:text-slate-300',
  'border-orange-400/40 bg-orange-500/10 text-orange-500',
];

export default function Leaderboard() {
  const podium = LEADERBOARD_ENTRIES.slice(0, 3);
  const roster = LEADERBOARD_ENTRIES.slice(3, 10);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-amber-500" strokeWidth={2} />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Campus Ambassador Podium
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Top performers this month
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-center md:gap-4">
        {PODIUM_ORDER.map((index, displayIdx) => {
          const entry = podium[index];
          const isFirst = index === 0;
          return (
            <div
              key={entry.rank}
              className={`panel-card flex w-full flex-row items-center gap-4 p-4 md:flex-col md:items-center md:text-center ${
                isFirst ? 'md:-mt-2 md:pb-6 md:pt-6' : ''
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black md:h-14 md:w-14 md:text-base ${RANK_COLORS[index]}`}
              >
                {entry.avatar}
              </span>
              <div className="min-w-0 flex-1 md:flex-none">
                <span
                  className={`mb-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${RANK_COLORS[index]}`}
                >
                  {RANK_LABELS[displayIdx]}
                </span>
                <p className="truncate font-bold text-slate-900 dark:text-slate-100">
                  {entry.name}
                </p>
                <p className="mt-0.5 truncate text-[10px] font-medium uppercase text-blue-600 dark:text-blue-400">
                  {entry.university}
                </p>
                <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                  {entry.referrals}
                  <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    referrals
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel-card overflow-hidden">
        <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Full Roster
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ranks 4–10
          </p>
        </div>

        <ul className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
          {roster.map((entry) => (
            <li
              key={entry.rank}
              className="flex items-center gap-3 px-4 py-3.5"
            >
              <span className="w-6 shrink-0 text-center text-sm font-bold text-slate-400">
                {entry.rank}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100 text-xs font-bold text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400">
                {entry.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {entry.name}
                </p>
                <p className="truncate text-[10px] font-medium uppercase text-slate-500 dark:text-slate-400">
                  {entry.university}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {entry.referrals}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  referrals
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
