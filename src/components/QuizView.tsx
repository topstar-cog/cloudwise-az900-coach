import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getAllQuestions, getDomain, getDomainForTopic, getQuestion, getQuestionsForDomain, getQuestionsForTopic, getTopic } from '../data/selectors';
import type { DomainId, Question, QuestionAttempt } from '../types';
import { difficultyChip, domainColor } from './colors';
import { RemediationCard } from './RemediationCard';

type QuizMode = 'topic' | 'domain' | 'practice-missed' | 'mock-exam';
const MOCK_EXAM_SECONDS = 20 * 60;

interface QuizViewProps {
  topicId?: string;
  domainId?: DomainId;
  mode: QuizMode;
  missedQuestionIds?: string[];
  onBack: () => void;
  onRecordAttempts: (attempts: QuestionAttempt[]) => void;
  onStudyWeakTopic: (topicId: string) => void;
  onRecordFollowUpResult: (misconceptionId: string, questionId: string, correct: boolean) => void;
  seenQuestionIdsByScope: Record<string, string[]>;
  onRecordSeenQuestions: (scope: string, questionIds: string[]) => void;
}

interface AnswerState {
  selected: number[];
}

function arraysEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function chooseSet(pool: Question[], mode: QuizMode, alreadySeen = new Set<string>()): Question[] {
  const targetSize = mode === 'practice-missed'
    ? Math.min(1, pool.length)
    : mode === 'mock-exam'
      ? Math.min(20, pool.length)
      : mode === 'domain'
      ? Math.min(10, pool.length)
      : Math.min(1, pool.length);
  const unseen = pool.filter((question) => !alreadySeen.has(question.id));
  const candidates = unseen.length >= targetSize
    ? unseen
    : [...unseen, ...shuffled(pool.filter((question) => alreadySeen.has(question.id))).slice(0, targetSize - unseen.length)];
  return shuffled(candidates).slice(0, targetSize);
}

function setKey(items: Question[]) {
  return items.map((question) => question.id).sort().join('|');
}

export function QuizView({
  topicId,
  domainId,
  mode,
  missedQuestionIds,
  onBack,
  onRecordAttempts,
  onStudyWeakTopic,
  onRecordFollowUpResult,
  seenQuestionIdsByScope,
  onRecordSeenQuestions,
}: QuizViewProps) {
  const questionPool = useMemo(() => {
    if (mode === 'practice-missed' && missedQuestionIds) {
      return missedQuestionIds
        .map((id) => getQuestion(id))
        .filter((q): q is Question => Boolean(q));
    }
    if (mode === 'domain' && domainId) {
      return getQuestionsForDomain(domainId);
    }
    if (mode === 'mock-exam') return getAllQuestions();
    if (topicId) return getQuestionsForTopic(topicId);
    return [];
  }, [mode, missedQuestionIds, domainId, topicId]);

  const seenScope = mode === 'mock-exam'
    ? 'mock-exam'
    : mode === 'domain'
      ? `domain:${domainId ?? ''}`
      : mode === 'practice-missed'
        ? `topic:${questionPool[0]?.topicId ?? ''}`
        : `topic:${topicId ?? ''}`;
  const persistedSeen = seenQuestionIdsByScope[seenScope] ?? [];

  const retryPool = useMemo(() => {
    if (mode !== 'practice-missed') return questionPool;
    const questionsById = new Map<string, Question>();
    questionPool.forEach((missedQuestion) => {
      getQuestionsForTopic(missedQuestion.topicId).forEach((question) => {
        questionsById.set(question.id, question);
      });
    });
    return [...questionsById.values()];
  }, [mode, questionPool]);

  const [quizQuestions, setQuizQuestions] = useState(() =>
    mode === 'practice-missed' ? questionPool : chooseSet(questionPool, mode, new Set(persistedSeen)),
  );
  const usedSets = useRef(new Set([setKey(quizQuestions)]));
  const usedQuestionIds = useRef(new Set(quizQuestions.map((question) => question.id)));

  const topic = topicId ? getTopic(topicId) : undefined;
  const domain = topicId
    ? getDomainForTopic(topicId)
    : domainId
      ? getDomain(domainId)
      : undefined;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>(() =>
    Object.fromEntries(quizQuestions.map((q) => [q.id, { selected: [] as number[] }])),
  );
  const [submitted, setSubmitted] = useState(false);
  const [optionOrders, setOptionOrders] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(quizQuestions.map((question) => [question.id, shuffled(question.options.map((_, index) => index))])),
  );
  const [secondsRemaining, setSecondsRemaining] = useState(MOCK_EXAM_SECONDS);
  const [noFreshQuestions, setNoFreshQuestions] = useState(false);
  const submitRef = useRef<() => void>(() => {});
  submitRef.current = submit;

  useEffect(() => {
    onRecordSeenQuestions(seenScope, quizQuestions.map((question) => question.id));
  }, [seenScope, quizQuestions, onRecordSeenQuestions]);

  useEffect(() => {
    if (mode !== 'mock-exam' || submitted) return;
    if (secondsRemaining <= 0) {
      submitRef.current();
      return;
    }
    const timer = window.setTimeout(() => setSecondsRemaining((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [mode, secondsRemaining, submitted]);

  if (quizQuestions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-slate-600">No questions available for this quiz.</p>
        <button onClick={onBack} className="btn-secondary mt-4">
          Back
        </button>
      </div>
    );
  }

  const q = quizQuestions[current];
  const total = quizQuestions.length;
  const answeredCount = Object.values(answers).filter((a) => a.selected.length > 0).length;

  function toggleOption(idx: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const cur = prev[q.id].selected;
      let next: number[];
      if (q.type === 'multiple') {
        next = cur.includes(idx) ? cur.filter((i) => i !== idx) : [...cur, idx];
      } else {
        next = cur.includes(idx) ? [] : [idx];
      }
      return { ...prev, [q.id]: { selected: next } };
    });
  }

  function submit() {
    setSubmitted(true);
    const attempts: QuestionAttempt[] = quizQuestions.map((question) => {
      const sel = answers[question.id].selected;
      const correct = arraysEqual(sel, question.correct);
      return {
        questionId: question.id,
        selected: sel,
        correct,
        timestamp: Date.now(),
      };
    });
    onRecordAttempts(attempts);
    if (mode === 'practice-missed' && missedQuestionIds?.length === 1) {
      const originalQuestion = getQuestion(missedQuestionIds[0]);
      if (originalQuestion && attempts.some((attempt) => attempt.questionId !== originalQuestion.id)) {
        onRecordFollowUpResult(
          originalQuestion.misconceptionId ?? `question:${originalQuestion.id}`,
          originalQuestion.id,
          attempts.every((attempt) => attempt.correct),
        );
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function retry() {
    const previouslySeen = new Set([...persistedSeen, ...usedQuestionIds.current]);
    const unseenPool = retryPool.filter((question) => !previouslySeen.has(question.id));
    if (unseenPool.length === 0) {
      setNoFreshQuestions(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    let next = chooseSet(retryPool, mode, previouslySeen);
    for (let tries = 0; tries < 25 && usedSets.current.has(setKey(next)); tries += 1) {
      next = chooseSet(retryPool, mode, previouslySeen);
    }
    usedSets.current.add(setKey(next));
    next.forEach((question) => usedQuestionIds.current.add(question.id));
    setNoFreshQuestions(false);
    setQuizQuestions(next);
    setOptionOrders(Object.fromEntries(next.map((question) => [question.id, shuffled(question.options.map((_, index) => index))])));
    setAnswers(Object.fromEntries(next.map((qq) => [qq.id, { selected: [] as number[] }])));
    setSubmitted(false);
    setCurrent(0);
    setSecondsRemaining(MOCK_EXAM_SECONDS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (submitted) {
    return (
      <ResultsView
        questions={quizQuestions}
        answers={answers}
        onBack={onBack}
        onRetry={retry}
        retryLabel={mode === 'practice-missed' ? 'Try another question' : 'New attempt'}
        onStudyWeakTopic={onStudyWeakTopic}
        onRecordFollowUpResult={onRecordFollowUpResult}
        isMockExam={mode === 'mock-exam'}
        timeUsedSeconds={MOCK_EXAM_SECONDS - secondsRemaining}
        noFreshQuestions={noFreshQuestions}
      />
    );
  }

  const c = domain && domainColor(domain.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Exit quiz
      </button>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            {mode === 'practice-missed' ? 'Practice: missed questions' : mode === 'mock-exam' ? 'Timed mock exam' : topic ? topic.title : 'Domain quiz'}
          </h1>
          <p className="text-xs text-slate-500">
            Question {current + 1} of {total} &middot; {answeredCount} answered
          </p>
        </div>
        {mode === 'mock-exam' && (
          <span role="timer" aria-live="off" className={`rounded-xl px-3 py-2 text-sm font-bold tabular-nums ${secondsRemaining <= 60 ? 'bg-rose-100 text-rose-800' : 'bg-brand-50 text-brand-800'}`}>
            {Math.floor(secondsRemaining / 60).toString().padStart(2, '0')}:{(secondsRemaining % 60).toString().padStart(2, '0')}
          </span>
        )}
        {c && (
          <span className={`chip ${c.soft}`}>
            {q.type === 'multiple' ? 'Select all that apply' : 'Single answer'}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`chip ${difficultyChip(q.difficulty)}`}>{q.difficulty}</span>
          <span className="chip bg-slate-100 text-slate-600">
            {q.type === 'multiple' ? 'Multiple-select' : 'Multiple-choice'}
          </span>
        </div>
        <p className="text-base font-semibold leading-relaxed text-slate-900">{q.prompt}</p>

        <div className="mt-4 space-y-2">
          {(optionOrders[q.id] ?? q.options.map((_, index) => index)).map((optionIndex, displayIndex) => {
            const opt = q.options[optionIndex];
            const isSelected = answers[q.id].selected.includes(optionIndex);
            return (
              <button
                key={optionIndex}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleOption(optionIndex)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  isSelected
                    ? 'border-brand-400 bg-brand-50 text-brand-900 ring-1 ring-brand-200'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border text-xs font-bold ${
                    q.type === 'multiple' ? 'rounded' : 'rounded-full'
                  } ${
                    isSelected
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-slate-300 text-slate-500'
                  }`}
                >
                  {String.fromCharCode(65 + displayIndex)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between">
        <button
          className="btn-secondary"
          onClick={() => setCurrent((c2) => Math.max(0, c2 - 1))}
          disabled={current === 0}
        >
          <ArrowLeft size={15} /> Previous
        </button>
        <div className="flex flex-wrap gap-1.5">
          {quizQuestions.map((qq, i) => {
            const answered = answers[qq.id].selected.length > 0;
            return (
              <button
                key={qq.id}
                onClick={() => setCurrent(i)}
                className={`h-7 w-7 rounded-md text-xs font-semibold transition-colors ${
                  i === current
                    ? 'bg-brand-600 text-white'
                    : answered
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                aria-label={`Go to question ${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        {current < total - 1 ? (
          <button className="btn-primary" onClick={() => setCurrent((c2) => c2 + 1)}>
            Next <ArrowRight size={15} />
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={submit}
            disabled={mode !== 'mock-exam' && answeredCount < total}
          >
            <ClipboardCheck size={15} /> Submit
          </button>
        )}
      </div>
      {answeredCount < total && current === total - 1 && mode !== 'mock-exam' && (
        <p className="mt-3 text-right text-xs text-slate-500" role="status">
          Answer all {total} questions to submit your results.
        </p>
      )}
    </div>
  );
}

function ResultsView({
  questions,
  answers,
  onBack,
  onRetry,
  retryLabel,
  onStudyWeakTopic,
  onRecordFollowUpResult,
  isMockExam,
  timeUsedSeconds,
  noFreshQuestions,
}: {
  questions: Question[];
  answers: Record<string, AnswerState>;
  onBack: () => void;
  onRetry: () => void;
  retryLabel: string;
  onStudyWeakTopic: (topicId: string) => void;
  onRecordFollowUpResult: (misconceptionId: string, questionId: string, correct: boolean) => void;
  isMockExam: boolean;
  timeUsedSeconds: number;
  noFreshQuestions: boolean;
}) {
  const results = questions.map((q) => {
    const sel = answers[q.id].selected;
    const correct = arraysEqual(sel, q.correct);
    return { q, selected: sel, correct };
  });
  const correctCount = results.filter((r) => r.correct).length;
  const total = questions.length;
  const pct = Math.round((correctCount / total) * 100);

  // Topic breakdown
  const byTopic = new Map<string, { correct: number; total: number }>();
  for (const r of results) {
    const entry = byTopic.get(r.q.topicId) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (r.correct) entry.correct += 1;
    byTopic.set(r.q.topicId, entry);
  }
  const topicStats = [...byTopic.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const weakestTopic = topicStats
    .map(([tid, s]) => ({ tid, acc: s.correct / s.total, ...s }))
    .sort((a, b) => a.acc - b.acc)[0];

  const missed = results.filter((r) => !r.correct);

  const grade =
    pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good progress' : pct >= 40 ? 'Keep practising' : 'Needs revision';

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to dashboard
      </button>

      {/* Score header */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-brand-600 to-teal-600 p-6 text-white">
          <div className="flex items-center gap-2 text-sm font-medium text-white/80">
            <Trophy size={16} /> {isMockExam ? 'Mock exam result' : 'Your result'}
          </div>
          <div className="mt-2 flex items-end gap-3">
            <span className="text-4xl font-bold">{pct}%</span>
            <span className="mb-1 text-sm text-white/90">
              {correctCount} of {total} correct
            </span>
          </div>
          <div className="mt-1 text-sm font-medium text-white/90">{grade}</div>
        </div>
        <div className="p-5">
            {isMockExam && <p className="mb-3 text-xs text-slate-500">Time used: {Math.floor(timeUsedSeconds / 60)}m {timeUsedSeconds % 60}s</p>}
            <h3 className="text-sm font-bold text-slate-900">Topic breakdown</h3>
          <div className="mt-3 space-y-2">
            {topicStats.map(([tid, s]) => {
              const topic = getTopic(tid);
              const acc = Math.round((s.correct / s.total) * 100);
              return (
                <div key={tid} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-700">
                      {topic?.title ?? tid}
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${acc >= 70 ? 'bg-teal-500' : acc >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                  </div>
                  <div className="shrink-0 text-xs font-semibold text-slate-600">
                    {s.correct}/{s.total}
                  </div>
                </div>
              );
            })}
          </div>

          {weakestTopic && weakestTopic.acc < 0.7 && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="text-sm font-semibold text-amber-900">
                Recommended revision
              </div>
              <p className="mt-1 text-xs text-amber-800">
                Revisit the lesson for{' '}
                <span className="font-semibold">{getTopic(weakestTopic.tid)?.title}</span>{' '}
                to strengthen your weakest area.
              </p>
              <button
                className="btn-secondary mt-3 border-amber-300 bg-white text-amber-800 hover:bg-amber-100"
                onClick={() => onStudyWeakTopic(weakestTopic.tid)}
              >
                Study this topic again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Missed questions review */}
      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-slate-900">
          Review {missed.length > 0 ? `missed questions (${missed.length})` : 'all questions'}
        </h2>
        {missed.length === 0 ? (
          <div className="card p-6 text-center">
            <CheckCircle2 size={28} className="mx-auto text-teal-500" />
            <p className="mt-2 text-sm font-semibold text-slate-900">
              You answered every question correctly.
            </p>
            <p className="text-xs text-slate-500">Try a harder domain quiz next.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {missed.map((r, i) => (
              <MissedQuestionCard
                key={r.q.id}
                question={r.q}
                selected={r.selected}
                index={i}
                onRecordFollowUpResult={onRecordFollowUpResult}
                onStudyTopic={onStudyWeakTopic}
              />
            ))}
          </div>
        )}
      </section>

      {results.some((result) => result.correct) && (
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-slate-900">What you got right</h2>
          <div className="space-y-4">
            {results.filter((result) => result.correct).map(({ q, selected }) => (
              <CorrectQuestionCard key={q.id} question={q} selected={selected} />
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        {noFreshQuestions ? (
          <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">
              You've practised every question in this topic.
            </p>
            <p className="mt-1 text-xs text-amber-800">
              Try a broader domain quiz or pick another topic from the curriculum to keep practising.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-secondary border-amber-300 bg-white text-amber-800 hover:bg-amber-100" onClick={onBack}>
                Back to dashboard
              </button>
            </div>
          </div>
        ) : (
          <button className="btn-primary" onClick={onRetry}>
            <RotateCcw size={15} /> {retryLabel}
          </button>
        )}
        <button className="btn-secondary" onClick={onBack}>
          Back to dashboard
        </button>
      </div>
    </div>
  );
}

function MissedQuestionCard({
  question,
  selected,
  index,
  onRecordFollowUpResult,
  onStudyTopic,
}: {
  question: Question;
  selected: number[];
  index: number;
  onRecordFollowUpResult: (misconceptionId: string, questionId: string, correct: boolean) => void;
  onStudyTopic: (topicId: string) => void;
}) {
  const topic = getTopic(question.topicId);
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip bg-rose-50 text-rose-700">
          <XCircle size={12} /> Missed
        </span>
        <span className={`chip ${difficultyChip(question.difficulty)}`}>{question.difficulty}</span>
        {topic && <span className="chip bg-slate-100 text-slate-600">{topic.title}</span>}
      </div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-900">
        <span className="mr-1 text-slate-400">{index + 1}.</span>
        {question.prompt}
      </p>

      <div className="mt-3 space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = question.correct.includes(i);
          const wasSelected = selected.includes(i);
          let cls = 'border-slate-100 bg-white text-slate-500';
          if (isCorrect) cls = 'border-teal-300 bg-teal-50 text-teal-900';
          else if (wasSelected) cls = 'border-rose-300 bg-rose-50 text-rose-900';
          return (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${cls}`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {isCorrect && <CheckCircle2 size={15} className="text-teal-600" />}
              {wasSelected && !isCorrect && <XCircle size={15} className="text-rose-500" />}
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg bg-teal-50 p-3 text-xs leading-relaxed text-teal-900">
          <span className="font-semibold">Why the correct answer is correct: </span>
          {question.explanation}
        </div>
        {question.distractorAnalysis.map((d) => {
          const wasSelected = selected.includes(d.index);
          const label = wasSelected
            ? `Why your choice (${String.fromCharCode(65 + d.index)}) is wrong`
            : `Why ${String.fromCharCode(65 + d.index)} doesn't fit this scenario`;
          return (
            <div
              key={d.index}
              className={`rounded-lg p-3 text-xs leading-relaxed ${
                wasSelected
                  ? 'bg-rose-50 text-rose-900'
                  : 'bg-slate-50 text-slate-600'
              }`}
            >
              <span className="font-semibold">{label}: </span>
              {d.reason}
            </div>
          );
        })}
      </div>

      {question.remedialLesson && question.followUpQuestion && (
        <div className="mt-4">
          <RemediationCard
            question={question}
            onRecordResult={onRecordFollowUpResult}
            onStudyTopic={onStudyTopic}
          />
        </div>
      )}
    </div>
  );
}

function CorrectQuestionCard({
  question,
  selected,
}: {
  question: Question;
  selected: number[];
}) {
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip bg-teal-50 text-teal-700">
          <CheckCircle2 size={12} /> Correct
        </span>
        <span className={`chip ${difficultyChip(question.difficulty)}`}>{question.difficulty}</span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-900">{question.prompt}</p>

      <div className="mt-3 space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = question.correct.includes(i);
          const wasSelected = selected.includes(i);
          let cls = 'border-slate-100 bg-white text-slate-500';
          if (isCorrect) cls = 'border-teal-300 bg-teal-50 text-teal-900';
          else if (wasSelected) cls = 'border-rose-300 bg-rose-50 text-rose-900';
          return (
            <div key={i} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${cls}`}>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {isCorrect && <CheckCircle2 size={15} className="text-teal-600" />}
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg bg-teal-50 p-3 text-xs leading-relaxed text-teal-900">
          <span className="font-semibold">Why your answer is correct: </span>
          {question.explanation}
        </div>
        {question.distractorAnalysis.map((d) => (
          <div
            key={d.index}
            className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600"
          >
            <span className="font-semibold">
              Why {String.fromCharCode(65 + d.index)} doesn't fit this scenario:{' '}
            </span>
            {d.reason}
          </div>
        ))}
      </div>
    </div>
  );
}