interface ProgressBarProps {
  value: number; // 0..100
  className?: string;
  barClassName?: string;
  label?: string;
}

export function ProgressBar({ value, className = '', barClassName = '', label }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>{label}</span>
          <span className="font-semibold text-slate-700">{Math.round(v)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-brand-500 transition-all duration-500 ${barClassName}`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
