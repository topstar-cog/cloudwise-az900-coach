import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { getDomainForTopic, getTopic } from '../data/selectors';
import { topics } from '../data/curriculum';
import type { ProgressState } from '../types';
import { domainColor } from './colors';

interface FlashcardsViewProps {
  initialTopicId?: string;
  progress: ProgressState;
  onBack: () => void;
  onReviewed: (topicId: string) => void;
}

interface Card {
  front: string;
  back: string;
  topicId: string;
  topicTitle: string;
}

function buildCards(topicId?: string): Card[] {
  const targetTopics = topicId ? [getTopic(topicId)].filter(Boolean) : topics;
  const cards: Card[] = [];
  for (const t of targetTopics) {
    if (!t) continue;
    for (const kt of t.lesson.keyTerms) {
      cards.push({
        front: kt.term,
        back: kt.meaning,
        topicId: t.id,
        topicTitle: t.title,
      });
    }
    // Add exam keyword recognition cards
    if (t.lesson.examKeywords.length > 0) {
      cards.push({
        front: `Exam keywords for: ${t.title}`,
        back: t.lesson.examKeywords.join(', '),
        topicId: t.id,
        topicTitle: t.title,
      });
    }
  }
  return cards;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsView({
  initialTopicId,
  progress,
  onBack,
  onReviewed,
}: FlashcardsViewProps) {
  const [scopeTopicId, setScopeTopicId] = useState<string | undefined>(initialTopicId);
  const [cards, setCards] = useState<Card[]>(() => buildCards(initialTopicId));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedTopicIds, setReviewedTopicIds] = useState<Set<string>>(new Set());

  const total = cards.length;
  const current = cards[Math.min(index, total - 1)];
  const topic = scopeTopicId ? getTopic(scopeTopicId) : undefined;
  const domain = topic ? domainColor(getDomainIdForTopic(topic.id)) : undefined;

  function reshuffle() {
    setCards(shuffle(buildCards(scopeTopicId)));
    setIndex(0);
    setFlipped(false);
  }

  function next() {
    if (current) {
      setReviewedTopicIds((prev) => new Set(prev).add(current.topicId));
      onReviewed(current.topicId);
    }
    setFlipped(false);
    setIndex((i) => (i + 1) % total);
  }

  function prev() {
    setFlipped(false);
    setIndex((i) => (i - 1 + total) % total);
  }

  function changeScope(tid: string | undefined) {
    setScopeTopicId(tid);
    setCards(buildCards(tid));
    setIndex(0);
    setFlipped(false);
  }

  if (total === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-slate-600">No flashcards available.</p>
        <button onClick={onBack} className="btn-secondary mt-4">Back</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Flashcards</h1>
          <p className="text-xs text-slate-500">
            Tap the card to flip. {total} cards &middot; {index + 1}/{total}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={scopeTopicId ?? ''}
            onChange={(e) => changeScope(e.target.value || undefined)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="">All topics</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <button className="btn-secondary" onClick={reshuffle}>
            <Shuffle size={14} /> Shuffle
          </button>
        </div>
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative block w-full select-none"
        aria-label="Flip flashcard"
      >
        <div
          className={`relative h-64 w-full rounded-2xl border shadow-card transition-all duration-300 ${
            flipped ? 'bg-gradient-to-br from-teal-600 to-brand-600 text-white' : 'bg-white text-slate-900'
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className={`text-xs font-semibold uppercase tracking-wide ${flipped ? 'text-white/70' : 'text-slate-400'}`}>
              {flipped ? 'Answer' : 'Term'}
            </div>
            <div className="mt-2 text-lg font-bold leading-snug sm:text-xl">
              {flipped ? current.back : current.front}
            </div>
            {!flipped && (
              <div className="mt-4 text-xs text-slate-400">Tap to reveal</div>
            )}
            {flipped && (
              <div className="mt-4 text-xs text-white/70">Topic: {current.topicTitle}</div>
            )}
          </div>
        </div>
      </button>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-between">
        <button className="btn-secondary" onClick={prev}>
          <ChevronLeft size={15} /> Previous
        </button>
        <div className="flex gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFlipped(false);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
        <button className="btn-primary" onClick={next}>
          Next <ChevronRight size={15} />
        </button>
      </div>

      {/* Reviewed topics */}
      <div className="mt-6 card p-4">
        <div className="text-xs font-semibold text-slate-500">Reviewed in this session</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reviewedTopicIds.size === 0 ? (
            <span className="text-xs text-slate-400">No cards reviewed yet.</span>
          ) : (
            [...reviewedTopicIds].map((tid) => (
              <span key={tid} className="chip bg-teal-50 text-teal-700">
                {getTopic(tid)?.title}
              </span>
            ))
          )}
        </div>
        {progress.flashcardsReviewed.length > 0 && (
          <div className="mt-3 text-xs text-slate-500">
            Total topics reviewed (all time): {progress.flashcardsReviewed.length}
          </div>
        )}
        {domain && (
          <div className="mt-3 text-xs text-slate-400">
            <RotateCcw size={11} className="inline" /> Switch topics any time using the dropdown above.
          </div>
        )}
      </div>
    </div>
  );
}

function getDomainIdForTopic(topicId: string) {
  const d = getDomainForTopic(topicId);
  return d?.id ?? 'brand';
}
