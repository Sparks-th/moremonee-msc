import { REFERRAL_RECORDS } from '../constants/mockData';
import type { ReferralRecord } from '../types/community';

const STATUS_STYLES: Record<ReferralRecord['accountStatus'], string> = {
  Active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
  Inactive: 'bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400',
};

export default function ReferralHub() {
  const totalReferrals = REFERRAL_RECORDS.length;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="panel-card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Rewards Earned
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            ₦0.00
          </p>
        </div>
        <div className="panel-card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total Referrals
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            {totalReferrals}
          </p>
        </div>
      </div>

      <div className="panel-card overflow-hidden">
        <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Referral History
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ledger of students you have referred
          </p>
        </div>

        <div className="hidden md:block">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800/80 dark:bg-slate-800/40 dark:text-slate-400">
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Date Joined</th>
                <th className="px-4 py-3">Activity Log</th>
                <th className="px-4 py-3">Account Status</th>
              </tr>
            </thead>
            <tbody>
              {REFERRAL_RECORDS.map((record) => (
                <tr
                  key={record.studentName}
                  className="border-b border-slate-200/60 last:border-0 dark:border-slate-800/60"
                >
                  <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-slate-100">
                    {record.studentName}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
                    {record.dateJoined}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                    {record.activityLog}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[record.accountStatus]}`}
                    >
                      {record.accountStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {REFERRAL_RECORDS.map((record) => (
            <div
              key={record.studentName}
              className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-800/40"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {record.studentName}
                </p>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[record.accountStatus]}`}
                >
                  {record.accountStatus}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  Date Joined:{' '}
                </span>
                {record.dateJoined}
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  Activity:{' '}
                </span>
                {record.activityLog}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
