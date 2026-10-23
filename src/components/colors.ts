import type { DomainId } from '../types';

const colorMap: Record<string, { bg: string; text: string; ring: string; bar: string; soft: string }> = {
  brand: {
    bg: 'bg-brand-600',
    text: 'text-brand-700',
    ring: 'ring-brand-200',
    bar: 'bg-brand-500',
    soft: 'bg-brand-50 text-brand-700',
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-700',
    ring: 'ring-teal-200',
    bar: 'bg-teal-500',
    soft: 'bg-teal-50 text-teal-700',
  },
  amber: {
    bg: 'bg-amber-600',
    text: 'text-amber-700',
    ring: 'ring-amber-200',
    bar: 'bg-amber-500',
    soft: 'bg-amber-50 text-amber-700',
  },
};

export function domainColor(id: DomainId | string) {
  return colorMap[id] ?? colorMap.brand;
}

export function difficultyChip(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-emerald-50 text-emerald-700';
    case 'intermediate':
      return 'bg-amber-50 text-amber-700';
    case 'advanced':
      return 'bg-rose-50 text-rose-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}
