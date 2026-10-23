import {
  BookOpen,
  Brain,
  ChevronRight,
  Layers,
  LineChart,
  PlayCircle,
  RefreshCw,
  Sparkles,
  Target,
  Timer,
} from 'lucide-react';
import { domains, modules, topics } from '../data/curriculum';
import { getAllQuestions } from '../data/selectors';
import type { DomainId, ProgressState } from '../types';
import { domainColor } from './colors';
import { ProgressBar } from './ProgressBar';

interface DashboardProps {
  progress: ProgressState;
  onStartLesson: (topicId: string) => void;
  onStartQuiz: (topicId: string) => void;
  onOpenFlashcards: (topicId?: string) => void;
  onOpenProgress: () => void;
  onOpenCurriculum: (domainId: DomainId) => void;
  onStartMockExam: () => void;
}

export function Dashboard({
  progress,
  onStartLesson,
  onStartQuiz,
  onOpenFlashcards,
  onOpenProgress,
  onOpenCurriculum,
  onStartMockExam,
}: DashboardProps) {
  const totalQuestions = getAllQuestions().length;
  const totalAttempts = progress.attempts.length;
  const correctAttempts = progress.attempts.filter((a) => a.correct).length;
  const overallAccuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

  // Recommend the weakest topic based on accuracy with at least 2 attempts.
  const topicStats = topics
    .map((t) => {
      const tp = progress.topics[t.id];
      const attempted = tp?.attempted ?? 0;
      const correct = tp?.correct ?? 0;
      const accuracy = attempted > 0 ? correct / attempted : 0;
      return { topic: t, attempted, correct, accuracy };
    })
    .filter((s) => s.attempted >= 2)
    .sort((a, b) => a.accuracy - b.accuracy);

  const weakest = topicStats[0]?.topic;
  const recommendedTopic =
    weakest ??
    topics.find((t) => !progress.topics[t.id]?.lessonViewed) ??
    topics[0];

  const lessonsViewed = topics.filter((t) => progress.topics[t.id]?.lessonViewed).length;
  const overallProgressPct = (lessonsViewed / topics.length) * 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Hero */}
      <section className="card overflow-hidden">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <span className="chip bg-brand-50 text-brand-700">
              <Sparkles size={13} /> Azure Fundamentals (AZ-900)
            </span>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              Master Azure fundamentals, one topic at a time.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              Study beginner-friendly lessons, check your understanding, practise original exam-style
              questions, and get detailed feedback that explains every answer.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                className="btn-primary"
                onClick={() => onStartLesson(recommendedTopic.id)}
              >
                <PlayCircle size={16} /> Continue learning
              </button>
              <button className="btn-secondary" onClick={onOpenProgress}>
                <LineChart size={16} /> View progress
              </button>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-teal-600 p-5 text-white shadow-card">
              <div className="text-xs font-medium uppercase tracking-wide text-white/80">
                Your progress
              </div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold">{Math.round(overallProgressPct)}%</span>
                <span className="mb-1 text-xs text-white/80">lessons viewed</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${overallProgressPct}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <Stat label="Questions" value={totalAttempts} />
                <Stat label="Accuracy" value={`${Math.round(overallAccuracy)}%`} />
                <Stat label="Topics" value={`${lessonsViewed}/${topics.length}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          icon={<BookOpen size={18} />}
          title="Browse curriculum"
          subtitle="Explore 3 domains and 20+ lessons"
          onClick={() => onOpenCurriculum('cloud-concepts')}
          accent="brand"
        />
        <QuickAction
          icon={<Brain size={18} />}
          title="Flashcards"
          subtitle="Drill key terms and concepts"
          onClick={() => onOpenFlashcards(undefined)}
          accent="teal"
        />
        <QuickAction
          icon={<Timer size={18} />}
          title="Timed mock exam"
          subtitle="20 mixed questions · 20 minutes"
          onClick={onStartMockExam}
          accent="amber"
        />
        <QuickAction
          icon={<Target size={18} />}
          title="Recommended next"
          subtitle={
            weakest
              ? `Revise: ${weakest.title}`
              : `Start: ${recommendedTopic.title}`
          }
          onClick={() => onStartLesson(recommendedTopic.id)}
          accent="amber"
        />
      </section>

      {/* Domains */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">AZ-900 domains</h2>
          <span className="text-xs text-slate-500">{topics.length} topics &middot; {totalQuestions} questions</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {domains.map((domain) => {
            const c = domainColor(domain.id);
            const domainTopics = topics.filter((t) =>
              modules.some((m) => m.id === t.moduleId && m.domainId === domain.id),
            );
            const viewed = domainTopics.filter((t) => progress.topics[t.id]?.lessonViewed).length;
            const pct = (viewed / domainTopics.length) * 100;
            // Compute domain accuracy from attempts via question lookup
            const domainQuestionIds = new Set(
              getAllQuestions()
                .filter((q) => q.domainId === domain.id)
                .map((q) => q.id),
            );
            const domTotal = progress.attempts.filter((a) => domainQuestionIds.has(a.questionId)).length;
            const domCorrect = progress.attempts.filter(
              (a) => domainQuestionIds.has(a.questionId) && a.correct,
            ).length;
            const domAcc = domTotal > 0 ? (domCorrect / domTotal) * 100 : 0;
            return (
              <button
                key={domain.id}
                onClick={() => onOpenCurriculum(domain.id)}
                className="card group p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className={`mb-3 inline-flex rounded-xl p-2.5 ${c.soft}`}>
                  <Layers size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{domain.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{domain.description}</p>
                <div className="mt-4">
                  <ProgressBar
                    value={pct}
                    barClassName={c.bar}
                    label={`${viewed}/${domainTopics.length} lessons viewed`}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{domainTopics.length} topics</span>
                  <span className="font-semibold text-slate-700">
                    {domTotal > 0 ? `${Math.round(domAcc)}% accuracy` : 'Not started'}
                  </span>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ChevronRight size={14} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Continue / Recommended topic card */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-slate-900">Pick up where you left off</h2>
        <div className="card p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <BookOpen size={18} />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {weakest ? 'Weakest topic' : 'Recommended topic'}
                </div>
                <div className="text-base font-bold text-slate-900">{recommendedTopic.title}</div>
                <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-500">
                  {recommendedTopic.lesson.summary}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="btn-secondary" onClick={() => onStartLesson(recommendedTopic.id)}>
                <BookOpen size={15} /> Study
              </button>
              <button className="btn-primary" onClick={() => onStartQuiz(recommendedTopic.id)}>
                <RefreshCw size={15} /> Practise
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/15 py-2">
      <div className="text-base font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-white/70">{label}</div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
  onClick,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  accent: 'brand' | 'teal' | 'amber';
}) {
  const c = domainColor(accent);
  return (
    <button
      onClick={onClick}
      className="card flex items-center gap-3 p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft"
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.soft}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-slate-900">{title}</div>
        <div className="truncate text-xs text-slate-500">{subtitle}</div>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </button>
  );
}
