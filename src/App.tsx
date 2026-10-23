import { useState } from 'react';
import { CurriculumView } from './components/CurriculumView';
import { Dashboard } from './components/Dashboard';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { FlashcardsView } from './components/FlashcardsView';
import { Header } from './components/Header';
import { LessonView } from './components/LessonView';
import { ProgressView } from './components/ProgressView';
import { QuizView } from './components/QuizView';
import { useProgress } from './hooks/useProgress';
import type { DomainId } from './types';

type View = 'dashboard' | 'curriculum' | 'lesson' | 'quiz' | 'flashcards' | 'progress';
type QuizMode = 'topic' | 'domain' | 'practice-missed' | 'mock-exam';

function App() {
  const {
    state: progress,
    recordAttempts,
    markLessonViewed,
    markComprehensionCompleted,
    markFlashcardReviewed,
    recordFollowUpResult,
    recordSeenQuestions,
    resetProgress,
    storageWarning,
  } = useProgress();

  const [view, setView] = useState<View>('dashboard');
  const [previousView, setPreviousView] = useState<View>('dashboard');
  const [activeTopicId, setActiveTopicId] = useState<string>('cloud-models');
  const [activeDomainId, setActiveDomainId] = useState<DomainId>('cloud-concepts');
  const [quizMode, setQuizMode] = useState<QuizMode>('topic');
  const [missedQuestionIds, setMissedQuestionIds] = useState<string[]>([]);
  const [flashcardTopicId, setFlashcardTopicId] = useState<string | undefined>();

  function openLesson(topicId: string) {
    setPreviousView(view);
    setActiveTopicId(topicId);
    setView('lesson');
  }

  function startTopicQuiz(topicId: string) {
    setActiveTopicId(topicId);
    setQuizMode('topic');
    setPreviousView(view);
    setView('quiz');
  }

  function openCurriculum(domainId: DomainId) {
    setActiveDomainId(domainId);
    setView('curriculum');
  }

  function openFlashcards(topicId?: string) {
    setPreviousView(view);
    setFlashcardTopicId(topicId);
    setView('flashcards');
  }

  function studyWeakTopic(topicId: string) {
    setPreviousView(view);
    setActiveTopicId(topicId);
    setView('lesson');
  }

  function openDomainQuiz(domainId: DomainId) {
    setActiveDomainId(domainId);
    setQuizMode('domain');
    setPreviousView('curriculum');
    setView('quiz');
  }

  function practiseMissedQuestion(questionId: string) {
    setMissedQuestionIds([questionId]);
    setQuizMode('practice-missed');
    setPreviousView('progress');
    setView('quiz');
  }

  function startMockExam() {
    setQuizMode('mock-exam');
    setMissedQuestionIds([]);
    setPreviousView(view);
    setView('quiz');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onNavigateHome={() => setView('dashboard')} />
      <DisclaimerBanner />
      {storageWarning && (
        <div role="status" className="mx-auto mt-3 max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {storageWarning}
          </div>
        </div>
      )}
      <main>
        {view === 'dashboard' && (
          <Dashboard
            progress={progress}
            onStartLesson={openLesson}
            onStartQuiz={startTopicQuiz}
            onOpenFlashcards={openFlashcards}
            onOpenProgress={() => setView('progress')}
            onOpenCurriculum={openCurriculum}
            onStartMockExam={startMockExam}
          />
        )}

        {view === 'curriculum' && (
          <CurriculumView
            initialDomainId={activeDomainId}
            progress={progress}
            onBack={() => setView('dashboard')}
            onOpenLesson={openLesson}
            onStartDomainQuiz={openDomainQuiz}
          />
        )}

        {view === 'lesson' && (
          <LessonView
            topicId={activeTopicId}
            progress={progress}
            onBack={() => setView(previousView === 'lesson' ? 'dashboard' : previousView)}
            onStartQuiz={startTopicQuiz}
            onOpenFlashcards={openFlashcards}
            onLessonViewed={markLessonViewed}
            onComprehensionCompleted={markComprehensionCompleted}
          />
        )}

        {view === 'quiz' && (
          <QuizView
            key={`${quizMode}:${activeTopicId}:${activeDomainId}:${missedQuestionIds.join(',')}`}
            topicId={quizMode === 'topic' ? activeTopicId : undefined}
            domainId={quizMode === 'domain' ? activeDomainId : undefined}
            mode={quizMode}
            missedQuestionIds={quizMode === 'practice-missed' ? missedQuestionIds : undefined}
            onBack={() => setView(previousView)}
            onRecordAttempts={recordAttempts}
            onStudyWeakTopic={studyWeakTopic}
            onRecordFollowUpResult={recordFollowUpResult}
            seenQuestionIdsByScope={progress.seenQuestionIdsByScope}
            onRecordSeenQuestions={recordSeenQuestions}
          />
        )}

        {view === 'flashcards' && (
          <FlashcardsView
            initialTopicId={flashcardTopicId}
            progress={progress}
            onBack={() => setView(previousView === 'lesson' ? 'lesson' : 'dashboard')}
            onReviewed={markFlashcardReviewed}
          />
        )}

        {view === 'progress' && (
          <ProgressView
            progress={progress}
            onBack={() => setView('dashboard')}
            onStudyTopic={studyWeakTopic}
            onPracticeQuestion={practiseMissedQuestion}
            onRecordFollowUpResult={recordFollowUpResult}
            onResetProgress={resetProgress}
          />
        )}
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-2 text-center text-xs text-slate-400 sm:px-6">
        CloudWise AZ-900 Coach · Unofficial study tool, not affiliated with Microsoft. Practice questions are original and are not actual certification exam questions.
      </footer>
    </div>
  );
}

export default App;
