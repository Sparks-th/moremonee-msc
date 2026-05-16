export default function LimitedTimeBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-300 shadow-sm shadow-amber-500/10 ${className}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
      Limited Time Offer
    </span>
  );
}
