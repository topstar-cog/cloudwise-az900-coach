import { Cloud } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
}

export function Header({ onNavigateHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 rounded-xl px-1.5 py-1 text-left transition-colors hover:bg-slate-50"
          aria-label="Go to dashboard"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white shadow-soft">
            <Cloud size={20} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-slate-900 sm:text-base">CloudWise</span>
            <span className="text-[11px] font-medium text-slate-500">AZ-900 Coach</span>
          </span>
        </button>
        <div className="hidden text-right text-[11px] text-slate-400 sm:block">
          Unofficial study tool &middot; Not affiliated with Microsoft
        </div>
      </div>
    </header>
  );
}
