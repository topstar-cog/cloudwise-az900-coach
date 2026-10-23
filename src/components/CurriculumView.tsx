import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, Circle, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { domains, modules, topics } from '../data/curriculum';
import type { DomainId, ProgressState } from '../types';
import { domainColor } from './colors';

interface CurriculumViewProps {
  initialDomainId: DomainId;
  progress: ProgressState;
  onBack: () => void;
  onOpenLesson: (topicId: string) => void;
  onStartDomainQuiz: (domainId: DomainId) => void;
}

export function CurriculumView({
  initialDomainId,
  progress,
  onBack,
  onOpenLesson,
  onStartDomainQuiz,
}: CurriculumViewProps) {
  const [activeDomain, setActiveDomain] = useState<DomainId>(initialDomainId);
  const activeModules = modules.filter((m) => m.domainId === activeDomain);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to dashboard
      </button>

      <h1 className="text-2xl font-bold text-slate-900">Curriculum</h1>
      <p className="mt-1 text-sm text-slate-500">
        Choose a domain, then a module and topic to start a lesson.
      </p>

      <button className="btn-primary mt-4" onClick={() => onStartDomainQuiz(activeDomain)}>
        <PlayCircle size={16} /> Take {domains.find((domain) => domain.id === activeDomain)?.shortTitle} quiz
      </button>

      {/* Domain tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {domains.map((d) => {
          const c = domainColor(d.id);
          const active = d.id === activeDomain;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDomain(d.id)}
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? `${c.bg} text-white shadow-soft`
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Modules */}
      <div className="mt-6 space-y-5">
        {activeModules.map((mod) => {
          const modTopics = topics.filter((t) => t.moduleId === mod.id);
          return (
            <div key={mod.id} className="card overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-3">
                <h2 className="text-sm font-bold text-slate-900">{mod.title}</h2>
                <p className="text-xs text-slate-500">{mod.description}</p>
              </div>
              <ul className="divide-y divide-slate-100">
                {modTopics.map((t) => {
                  const tp = progress.topics[t.id];
                  const viewed = tp?.lessonViewed;
                  const attempted = tp?.attempted ?? 0;
                  const accuracy =
                    attempted > 0 ? Math.round((tp!.correct / attempted) * 100) : null;
                  return (
                    <li key={t.id}>
                      <button
                        onClick={() => onOpenLesson(t.id)}
                        className="group flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className="shrink-0">
                          {viewed ? (
                            <CheckCircle2 size={20} className="text-teal-500" />
                          ) : (
                            <Circle size={20} className="text-slate-300" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-slate-900">
                            {t.title}
                          </div>
                          <div className="truncate text-xs text-slate-500">{t.description}</div>
                        </div>
                        <div className="hidden shrink-0 items-center gap-2 sm:flex">
                          {attempted > 0 && (
                            <span className="chip bg-slate-100 text-slate-600">
                              {attempted} attempts &middot; {accuracy}%
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                            <BookOpen size={13} /> Study
                          </span>
                        </div>
                        <ChevronRight size={18} className="shrink-0 text-slate-300" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
