import { BookOpenCheck, CheckCircle2, Lightbulb, RotateCcw, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import type { LearningGap, Question } from '../types';

interface RemediationCardProps {
  question: Question;
  gap?: LearningGap;
  onRecordResult?: (misconceptionId: string, questionId: string, correct: boolean) => void;
  onStudyTopic?: (topicId: string) => void;
}

export function RemediationCard({
  question,
  gap,
  onRecordResult,
  onStudyTopic,
}: RemediationCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [followUpIndex, setFollowUpIndex] = useState(() => gap?.followUpAttempts ?? 0);
  const lesson = question.remedialLesson;
  const followUps = question.followUpQuestions?.length
    ? question.followUpQuestions
    : question.followUpQuestion
      ? [question.followUpQuestion]
      : [];
  const misconceptionId = question.misconceptionId;

  if (!lesson || followUps.length === 0 || !misconceptionId) return null;

  const activeMisconceptionId = misconceptionId;
  const activeFollowUp = followUps[followUpIndex % followUps.length];
  const isCorrect = selected === activeFollowUp.correctIndex;

  function submitFollowUp() {
    if (selected === null || submitted) return;
    setSubmitted(true);
    onRecordResult?.(activeMisconceptionId, question.id, selected === activeFollowUp.correctIndex);
  }

  function retryFollowUp() {
    setSelected(null);
    setSubmitted(false);
    setFollowUpIndex((current) => (current + 1) % followUps.length);
  }

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
          <Lightbulb size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-amber-950">Repair this idea: {lesson.title}</h3>
            {gap?.status === 'corrected' && (
              <span className="chip bg-teal-100 text-teal-800">
                <CheckCircle2 size={12} /> Corrected on follow-up
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-amber-950">{lesson.explanation}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white/80 p-3 text-sm leading-relaxed text-slate-700">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Practical example</div>
          {lesson.example}
        </div>
        <div className="rounded-xl bg-white/80 p-3 text-sm leading-relaxed text-slate-700">
          <div className="mb-1 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-500">
            <BookOpenCheck size={13} /> Exam tip
          </div>
          {lesson.examTip}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-white p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          New scenario · same concept · {followUpIndex % followUps.length + 1} of {followUps.length}
        </div>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-900">{activeFollowUp.prompt}</p>
        <div className="mt-3 space-y-2">
          {activeFollowUp.options.map((option, index) => (
            <button
              key={option}
              type="button"
              disabled={submitted}
              onClick={() => setSelected(index)}
              className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                selected === index
                  ? 'border-brand-400 bg-brand-50 text-brand-950'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                } ${submitted && index === activeFollowUp.correctIndex ? 'border-teal-300 bg-teal-50 text-teal-900' : ''} ${submitted && selected === index && !isCorrect ? 'border-rose-300 bg-rose-50 text-rose-900' : ''}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>

        {!submitted ? (
          <button type="button" className="btn-primary mt-3" onClick={submitFollowUp} disabled={selected === null}>
            Check this retest
          </button>
        ) : (
          <div className={`mt-3 rounded-lg p-3 text-sm leading-relaxed ${isCorrect ? 'bg-teal-50 text-teal-900' : 'bg-rose-50 text-rose-900'}`}>
            <div className="flex items-center gap-2 font-semibold">
              {isCorrect ? <CheckCircle2 size={16} /> : <TriangleAlert size={16} />}
              {isCorrect ? 'You corrected this misunderstanding on the new scenario.' : 'Not yet — review the explanation and try again.'}
            </div>
            <p className="mt-1">{activeFollowUp.explanation}</p>
            <p className="mt-2 text-xs opacity-80">This records one corrected attempt; it does not mark the whole topic as mastered.</p>
            <button type="button" onClick={retryFollowUp} className="btn-secondary mt-3 bg-white">
              <RotateCcw size={14} /> Practise this concept again
            </button>
          </div>
        )}
      </div>

      {onStudyTopic && (
        <button type="button" onClick={() => onStudyTopic(question.topicId)} className="mt-3 text-sm font-semibold text-amber-900 underline underline-offset-2">
          Revisit the {question.topicId.replace(/-/g, ' ')} lesson
        </button>
      )}
    </section>
  );
}
