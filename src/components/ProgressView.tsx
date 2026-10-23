import { ArrowLeft, CheckCircle2, Download, RotateCcw, Target, Trash2 } from 'lucide-react';
import { domains, modules, topics } from '../data/curriculum';
import { getAllQuestions, getQuestion } from '../data/selectors';
import type { ProgressState } from '../types';
import { RemediationCard } from './RemediationCard';

interface ProgressViewProps {
  progress: ProgressState;
  onBack: () => void;
  onStudyTopic: (topicId: string) => void;
  onPracticeQuestion: (questionId: string) => void;
  onRecordFollowUpResult: (misconceptionId: string, questionId: string, correct: boolean) => void;
  onResetProgress: () => void;
}

export function ProgressView({
  progress,
  onBack,
  onStudyTopic,
  onPracticeQuestion,
  onRecordFollowUpResult,
  onResetProgress,
}: ProgressViewProps) {
  const attempts = progress.attempts.length;
  const correct = progress.attempts.filter((attempt) => attempt.correct).length;
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const gaps = Object.values(progress.learningGaps).sort((a, b) => b.lastMissedAt - a.lastMissedAt);

  function exportProgress() {
    const contents = JSON.stringify({
      app: 'CloudWise AZ-900 Coach',
      exportedAt: new Date().toISOString(),
      progress,
    }, null, 2);
    const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `cloudwise-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function resetSavedProgress() {
    if (window.confirm('Reset all CloudWise progress saved in this browser? This removes your attempts, learning gaps, and seen-question history.')) {
      onResetProgress();
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft size={16} /> Back to dashboard
      </button>
      <h1 className="text-2xl font-bold text-slate-900">Your progress</h1>
      <p className="mt-1 text-sm text-slate-500">Saved in this browser. Your learning history stays on this device.</p>

      <section className="mt-4 card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Manage your progress</h2>
          <p className="mt-1 text-xs text-slate-500">Download a copy or clear saved history from this browser.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={exportProgress}><Download size={15} /> Export progress</button>
          <button type="button" className="btn-secondary border-rose-200 text-rose-700 hover:bg-rose-50" onClick={resetSavedProgress}><Trash2 size={15} /> Reset progress</button>
        </div>
      </section>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Questions attempted" value={attempts} />
        <StatCard label="Overall accuracy" value={`${accuracy}%`} />
        <StatCard label="Learning gaps" value={gaps.length} />
      </div>

      <section className="mt-7">
        <h2 className="mb-3 text-lg font-bold text-slate-900">Accuracy by AZ-900 domain</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {domains.map((domain) => {
            const domainTopicIds = topics
              .filter((topic) => modules.some((module) => module.id === topic.moduleId && module.domainId === domain.id))
              .map((topic) => topic.id);
            const questionIds = new Set(getAllQuestions().filter((question) => question.domainId === domain.id).map((question) => question.id));
            const domainAttempts = progress.attempts.filter((attempt) => questionIds.has(attempt.questionId));
            const domainCorrect = domainAttempts.filter((attempt) => attempt.correct).length;
            const domainAccuracy = domainAttempts.length ? Math.round((domainCorrect / domainAttempts.length) * 100) : null;
            const lessonsViewed = domainTopicIds.filter((topicId) => progress.topics[topicId]?.lessonViewed).length;
            return (
              <div key={domain.id} className="card p-4">
                <h3 className="font-semibold text-slate-900">{domain.shortTitle}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {domainAttempts.length ? `${domainCorrect}/${domainAttempts.length} correct · ${domainAccuracy}% accuracy` : 'No quiz attempts yet'}
                </p>
                <p className="mt-1 text-xs text-slate-500">{lessonsViewed}/{domainTopicIds.length} lessons viewed</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8" aria-labelledby="learning-gaps-title">
        <div className="mb-3 flex items-start gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><Target size={18} /></span>
          <div>
            <h2 id="learning-gaps-title" className="text-lg font-bold text-slate-900">My Learning Gaps</h2>
            <p className="text-sm text-slate-500">Concepts you missed, plus a fresh scenario to practise each one again.</p>
          </div>
        </div>
        {gaps.length === 0 ? (
          <div className="card p-5 text-sm text-slate-600">
            No gaps recorded yet. Missed questions will appear here so you can review and practise them again.
          </div>
        ) : (
          <div className="space-y-4">
            {gaps.map((gap) => {
              const question = getQuestion(gap.questionId);
              if (!question) return null;
              return (
                <div key={gap.misconceptionId} className="card p-4 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{question.concept ?? question.topicId}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-800">
                        {gap.status === 'corrected' ? 'Corrected on a follow-up scenario' : 'Needs another review'}
                      </div>
                    </div>
                    <span className={`chip ${gap.status === 'corrected' ? 'bg-teal-50 text-teal-800' : 'bg-amber-50 text-amber-800'}`}>
                      {gap.status === 'corrected' ? <><CheckCircle2 size={12} /> Corrected {gap.successfulCorrections}×</> : 'Ready to practise'}
                    </span>
                  </div>
                  <RemediationCard
                    question={question}
                    gap={gap}
                    onRecordResult={onRecordFollowUpResult}
                    onStudyTopic={onStudyTopic}
                  />
                      {(!question.remedialLesson || (!question.followUpQuestion && !question.followUpQuestions?.length)) && (
                        <div className="mt-3 rounded-xl bg-slate-50 p-4">
                          <p className="text-sm font-semibold text-slate-800">Review the idea</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">{question.explanation}</p>
                          <button
                            type="button"
                            onClick={() => onPracticeQuestion(question.id)}
                            className="btn-secondary mt-3"
                          >
                            <RotateCcw size={14} /> Practise this question again
                          </button>
                        </div>
                      )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return <div className="card p-4"><div className="text-2xl font-bold text-slate-900">{value}</div><div className="text-xs text-slate-500">{label}</div></div>;
}
