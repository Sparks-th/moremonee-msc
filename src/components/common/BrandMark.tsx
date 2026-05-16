import appLogo from '../../assets/m-logo.png';

interface BrandMarkProps {
  className?: string;
  showStudentsLabel?: boolean;
}

export default function BrandMark({
  className = '',
  showStudentsLabel = true,
}: BrandMarkProps) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      <img
        src={appLogo}
        alt="MoreMonee"
        className="h-9 w-9 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-700"
        width={36}
        height={36}
      />
      {showStudentsLabel && (
        <span className="truncate text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Students
        </span>
      )}
    </span>
  );
}
