import { useCallback, useEffect, useState } from 'react';
import type {
  ProgressState,
  LearningGap,
  QuestionAttempt,
  TopicProgress,
} from '../types';

const STORAGE_KEY = 'cloudwise-progress-v1';

const emptyState: ProgressState = {
  attempts: [],
  topics: {},
  flashcardsReviewed: [],
  learningGaps: {},
  seenQuestionIdsByScope: {},
};

function loadState(): ProgressState {
  if (typeof window === 'undefined') return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed || !Array.isArray(parsed.attempts) || !parsed.topics) {
      return emptyState;
    }
    return {
      attempts: parsed.attempts,
      topics: parsed.topics,
      flashcardsReviewed: Array.isArray(parsed.flashcardsReviewed)
        ? parsed.flashcardsReviewed
        : [],
      learningGaps:
        parsed.learningGaps && typeof parsed.learningGaps === 'object'
          ? parsed.learningGaps
          : {},
      seenQuestionIdsByScope:
        parsed.seenQuestionIdsByScope && typeof parsed.seenQuestionIdsByScope === 'object'
          ? parsed.seenQuestionIdsByScope
          : {},
      lastVisitedTopicId: parsed.lastVisitedTopicId,
    };
  } catch {
    return emptyState;
  }
}

function saveState(state: ProgressState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => loadState());
  const [storageWarning, setStorageWarning] = useState<string | undefined>();

  useEffect(() => {
    setStorageWarning(
      saveState(state)
        ? undefined
        : 'Progress cannot be saved in this browser right now. You can keep studying, but it may not be restored after you leave.',
    );
  }, [state]);

  const recordAttempt = useCallback(
    (attempt: QuestionAttempt) => {
      setState((prev) => {
        const topicId = attempt.questionId.includes('-')
          ? deriveTopicIdFromQuestionId(attempt.questionId)
          : '';
        const topics = { ...prev.topics };
        if (topicId) {
          const existing = prev.topics[topicId] ?? {
            topicId,
            attempted: 0,
            correct: 0,
            comprehensionCompleted: false,
            lessonViewed: false,
          };
          topics[topicId] = {
            ...existing,
            attempted: existing.attempted + 1,
            correct: existing.correct + (attempt.correct ? 1 : 0),
          };
        }
        return {
          ...prev,
          attempts: [...prev.attempts, attempt],
          topics,
          learningGaps: recordQuestionOutcomes(prev.learningGaps, [attempt]),
        };
      });
    },
    [],
  );

  const recordAttempts = useCallback((newAttempts: QuestionAttempt[]) => {
    setState((prev) => {
      const topics = { ...prev.topics };
      for (const attempt of newAttempts) {
        const topicId = deriveTopicIdFromQuestionId(attempt.questionId);
        if (topicId) {
          const existing = prev.topics[topicId] ?? {
            topicId,
            attempted: 0,
            correct: 0,
            comprehensionCompleted: false,
            lessonViewed: false,
          };
          topics[topicId] = {
            ...existing,
            attempted: existing.attempted + 1,
            correct: existing.correct + (attempt.correct ? 1 : 0),
          };
        }
      }
      return {
        ...prev,
        attempts: [...prev.attempts, ...newAttempts],
        topics,
        learningGaps: recordQuestionOutcomes(prev.learningGaps, newAttempts),
      };
    });
  }, []);

  const recordFollowUpResult = useCallback(
    (misconceptionId: string, questionId: string, correct: boolean) => {
      setState((prev) => {
        const sourceQuestion = questionById[questionId];
        if (!sourceQuestion) return prev;
        const now = Date.now();
        const existing = prev.learningGaps[misconceptionId];
        const gap: LearningGap = {
          misconceptionId,
          questionId,
          topicId: sourceQuestion.topicId,
          status: correct ? 'corrected' : 'needs-review',
          firstMissedAt: existing?.firstMissedAt ?? now,
          lastMissedAt: existing?.lastMissedAt ?? now,
          followUpAttempts: (existing?.followUpAttempts ?? 0) + 1,
          successfulCorrections:
            (existing?.successfulCorrections ?? 0) + (correct ? 1 : 0),
          lastFollowUpAt: now,
        };
        return {
          ...prev,
          learningGaps: { ...prev.learningGaps, [misconceptionId]: gap },
        };
      });
    },
    [],
  );

  const markLessonViewed = useCallback((topicId: string) => {
    setState((prev) => ({
      ...prev,
      lastVisitedTopicId: topicId,
      topics: {
        ...prev.topics,
        [topicId]: ensureTopicFromPrev(prev, topicId, { lessonViewed: true }),
      },
    }));
  }, []);

  const markComprehensionCompleted = useCallback((topicId: string) => {
    setState((prev) => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicId]: ensureTopicFromPrev(prev, topicId, {
          comprehensionCompleted: true,
        }),
      },
    }));
  }, []);

  const markFlashcardReviewed = useCallback((topicId: string) => {
    setState((prev) => {
      if (prev.flashcardsReviewed.includes(topicId)) return prev;
      return {
        ...prev,
        flashcardsReviewed: [...prev.flashcardsReviewed, topicId],
      };
    });
  }, []);

  const setLastVisitedTopic = useCallback((topicId: string) => {
    setState((prev) => ({ ...prev, lastVisitedTopicId: topicId }));
  }, []);

  const recordSeenQuestions = useCallback((scope: string, questionIds: string[]) => {
    setState((prev) => {
      const current = prev.seenQuestionIdsByScope[scope] ?? [];
      const next = [...new Set([...current, ...questionIds])];
      if (next.length === current.length) return prev;
      return {
        ...prev,
        seenQuestionIdsByScope: { ...prev.seenQuestionIdsByScope, [scope]: next },
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(emptyState);
  }, []);

  return {
    state,
    recordAttempt,
    recordAttempts,
    markLessonViewed,
    markComprehensionCompleted,
    markFlashcardReviewed,
    setLastVisitedTopic,
    resetProgress,
    recordSeenQuestions,
    recordFollowUpResult,
    storageWarning,
  };
}

function ensureTopicFromPrev(
  prev: ProgressState,
  topicId: string,
  partial: Partial<TopicProgress>,
): TopicProgress {
  const existing = prev.topics[topicId];
  return {
    topicId,
    attempted: existing?.attempted ?? 0,
    correct: existing?.correct ?? 0,
    comprehensionCompleted: existing?.comprehensionCompleted ?? false,
    lessonViewed: existing?.lessonViewed ?? false,
    ...partial,
  };
}

// Map a question id like "q-cc-01" or "q-mg-20" back to its topic id.
// We keep this in a small lookup built from the questions data.
import { questions } from '../data/questions';

const questionIdToTopic: Record<string, string> = Object.fromEntries(
  questions.map((q) => [q.id, q.topicId]),
);

const questionById = Object.fromEntries(questions.map((q) => [q.id, q]));

function recordQuestionOutcomes(
  current: ProgressState['learningGaps'],
  attempts: QuestionAttempt[],
): ProgressState['learningGaps'] {
  const learningGaps = { ...current };
  for (const attempt of attempts) {
    const question = questionById[attempt.questionId];
    if (!question) continue;
    const misconceptionId = question.misconceptionId ?? `question:${question.id}`;
    const now = attempt.timestamp || Date.now();
    const existing = learningGaps[misconceptionId];
    if (attempt.correct) {
      if (existing) {
        learningGaps[misconceptionId] = {
          ...existing,
          status: 'corrected',
          followUpAttempts: existing.followUpAttempts + 1,
          successfulCorrections: existing.successfulCorrections + 1,
          lastFollowUpAt: now,
        };
      }
      continue;
    }
    learningGaps[misconceptionId] = {
      misconceptionId,
      questionId: question.id,
      topicId: question.topicId,
      status: 'needs-review',
      firstMissedAt: existing?.firstMissedAt ?? now,
      lastMissedAt: now,
      followUpAttempts: existing?.followUpAttempts ?? 0,
      successfulCorrections: existing?.successfulCorrections ?? 0,
      lastFollowUpAt: existing?.lastFollowUpAt,
    };
  }
  return learningGaps;
}

function deriveTopicIdFromQuestionId(questionId: string): string {
  return questionIdToTopic[questionId] ?? '';
}
