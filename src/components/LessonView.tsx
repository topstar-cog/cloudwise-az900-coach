import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardList,
  Lightbulb,
  PlayCircle,
  RefreshCw,
  TriangleAlert,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getDomainForTopic, getModule, getQuestionsForTopic, getTopic } from '../data/selectors';
import type { ComprehensionQuestion, ProgressState } from '../types';
import { domainColor } from './colors';

interface LessonViewProps {
  topicId: string;
  progress: ProgressState;
  onBack: () => void;
  onStartQuiz: (topicId: string) => void;
  onOpenFlashcards: (topicId: string) => void;
  onLessonViewed: (topicId: string) => void;
  onComprehensionCompleted: (topicId: string) => void;
}

export function LessonView({
  topicId,
  progress,
  onBack,
  onStartQuiz,
  onOpenFlashcards,
  onLessonViewed,
  onComprehensionCompleted,
}: LessonViewProps) {
  const topic = getTopic(topicId);
  const domain = getDomainForTopic(topicId);
  const module = topic ? getModule(topic.moduleId) : undefined;
  const questionsForTopic = getQuestionsForTopic(topicId);

  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<string, number | null>>(
    () => Object.fromEntries((topic?.lesson.comprehension ?? []).map((q) => [q.id, null])),
  );
  const [submitted, setSubmitted] = useState(false);

  const allComprehensionAnswered = useMemo(
    () => (topic?.lesson.comprehension ?? []).every((q) => comprehensionAnswers[q.id] !== null),
    [topic, comprehensionAnswers],
  );

  const allCorrect = useMemo(
    () =>
      (topic?.lesson.comprehension ?? []).every(
        (q) => comprehensionAnswers[q.id] === q.correctIndex,
      ),
    [topic, comprehensionAnswers],
  );

  // Mark a valid lesson as viewed once, without placing a hook after the
  // not-found early return below.
  useMemoOnce(() => {
    if (topic && domain) onLessonViewed(topicId);
  });

  if (!topic || !domain) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-slate-600">Lesson not found.</p>
        <button onClick={onBack} className="btn-secondary mt-4">
          Back
        </button>
      </div>
    );
  }

  const c = domainColor(domain.id);
  const lesson = topic.lesson;
  const tp = progress.topics[topicId];

  function handleSelect(qid: string, idx: number) {
    if (submitted) return;
    setComprehensionAnswers((prev) => ({ ...prev, [qid]: idx }));
  }

  function handleSubmit() {
    if (!allComprehensionAnswered) return;
    setSubmitted(true);
    if (allCorrect) onComprehensionCompleted(topicId);
  }

  function handleReset() {
    setComprehensionAnswers(
      Object.fromEntries(lesson.comprehension.map((q) => [q.id, null])),
    );
    setSubmitted(false);
  }

  const correctCount = lesson.comprehension.filter(
    (q) => comprehensionAnswers[q.id] === q.correctIndex,
  ).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to curriculum
      </button>

      {/* Breadcrumb */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <span className={`chip ${c.soft}`}>{domain.shortTitle}</span>
        {module && <span>&rsaquo; {module.title}</span>}
      </div>

      <h1 className="text-2xl font-bold text-slate-900">{lesson.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{lesson.summary}</p>

      {/* Lesson body */}
      <section className="card mt-6 p-5 sm:p-6">
        <SectionTitle icon={<BookOpen size={16} />} title="Plain-English explanation" />
        <p className="mt-3 text-sm leading-relaxed text-slate-700">{lesson.explanation}</p>

        <Divider />

        <SectionTitle icon={<ClipboardList size={16} />} title="Key terms" />
        <dl className="mt-3 space-y-3">
          {lesson.keyTerms.map((kt) => (
            <div key={kt.term} className="rounded-xl bg-slate-50 p-3">
              <dt className="text-sm font-semibold text-slate-900">{kt.term}</dt>
              <dd className="mt-0.5 text-sm text-slate-600">{kt.meaning}</dd>
            </div>
          ))}
        </dl>

        <Divider />

        <SectionTitle icon={<Lightbulb size={16} />} title="Real-life example" />
        <p className="mt-3 rounded-xl border border-teal-100 bg-teal-50/60 p-4 text-sm leading-relaxed text-slate-700">
          {lesson.example}
        </p>

        <Divider />

        <SectionTitle icon={<TriangleAlert size={16} />} title="Easily confused concepts" />
        <ul className="mt-3 space-y-2">
          {lesson.comparison.map((cmp) => (
            <li key={cmp.with} className="rounded-xl border border-slate-100 p-3">
              <div className="text-sm font-semibold text-slate-900">{cmp.with}</div>
              <div className="mt-0.5 text-sm text-slate-600">{cmp.detail}</div>
            </li>
          ))}
        </ul>

        <Divider />

        <SectionTitle icon={<PlayCircle size={16} />} title="AZ-900 exam tip" />
        <p className="mt-3 text-sm leading-relaxed text-slate-700">{lesson.examTip}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {lesson.examKeywords.map((k) => (
            <span key={k} className="chip bg-brand-50 text-brand-700">
              {k}
            </span>
          ))}
        </div>

        <Divider />

        <SectionTitle icon={<TriangleAlert size={16} />} title="Common mistakes & misconceptions" />
        <ul className="mt-3 space-y-2">
          {lesson.misconceptions.map((m, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Comprehension check */}
      <section className="card mt-6 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <SectionTitle icon={<CheckCircle2 size={16} />} title="Comprehension check" />
          {tp?.comprehensionCompleted && (
            <span className="chip bg-teal-50 text-teal-700">
              <CheckCircle2 size={12} /> Completed
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Answer all questions to check your understanding. This is not the full quiz.
        </p>

        <div className="mt-4 space-y-5">
          {lesson.comprehension.map((q: ComprehensionQuestion, idx) => (
            <ComprehensionItem
              key={q.id}
              q={q}
              index={idx}
              selected={comprehensionAnswers[q.id]}
              submitted={submitted}
              onSelect={(i) => handleSelect(q.id, i)}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {!submitted ? (
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={!allComprehensionAnswered}
            >
              Check answers
            </button>
          ) : (
            <>
              <div className="text-sm font-semibold text-slate-900">
                Score: {correctCount}/{lesson.comprehension.length}
                {allCorrect && <span className="ml-2 text-teal-600">Perfect!</span>}
              </div>
              <button className="btn-secondary" onClick={handleReset}>
                <RefreshCw size={14} /> Try again
              </button>
            </>
          )}
        </div>
      </section>

      {/* Next actions */}
      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          className="card flex items-center justify-between p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft"
          onClick={() => onOpenFlashcards(topicId)}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Lightbulb size={16} className="text-amber-500" /> Review flashcards for this topic
          </span>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
        <button
          className="card flex items-center justify-between p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft"
          onClick={() => onStartQuiz(topicId)}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <PlayCircle size={16} className="text-brand-600" /> Start the topic quiz
            <span className="chip bg-slate-100 text-slate-600">{questionsForTopic.length} Q</span>
          </span>
          <ChevronRight size={16} className="text-slate-300" />
        </button>
      </section>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
      <span className="text-brand-600">{icon}</span>
      {title}
    </h2>
  );
}

function Divider() {
  return <div className="my-5 h-px bg-slate-100" />;
}

function ComprehensionItem({
  q,
  index,
  selected,
  submitted,
  onSelect,
}: {
  q: ComprehensionQuestion;
  index: number;
  selected: number | null;
  submitted: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="text-sm font-semibold text-slate-900">
        <span className="mr-1 text-slate-400">{index + 1}.</span>
        {q.prompt}
      </div>
      <div className="mt-3 space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correctIndex;
          let cls = 'border-slate-200 bg-white hover:border-slate-300';
          if (submitted) {
            if (isCorrect) cls = 'border-teal-300 bg-teal-50 text-teal-900';
            else if (isSelected) cls = 'border-rose-300 bg-rose-50 text-rose-900';
            else cls = 'border-slate-100 bg-white text-slate-500';
          } else if (isSelected) {
            cls = 'border-brand-400 bg-brand-50 text-brand-900';
          }
          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => onSelect(i)}
              className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${cls}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {submitted && isCorrect && <CheckCircle2 size={15} className="text-teal-600" />}
              {submitted && isSelected && !isCorrect && (
                <Circle size={15} className="text-rose-500" />
              )}
            </button>
          );
        })}
      </div>
      {submitted && (
        <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
          <span className="font-semibold text-slate-900">Explanation: </span>
          {q.explanation}
        </p>
      )}
    </div>
  );
}

// Helper hook that runs a side-effect once on mount.
function useMemoOnce(fn: () => void) {
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
