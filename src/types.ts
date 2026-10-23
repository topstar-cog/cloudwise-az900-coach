// Core types for the CloudWise AZ-900 Coach app.

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType = 'single' | 'multiple'; // single = one correct option, multiple = multiple correct

export interface ComprehensionQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number; // single correct for comprehension checks
  explanation: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  summary: string;
  // Plain-English beginner explanation
  explanation: string;
  keyTerms: { term: string; meaning: string }[];
  // Practical everyday example (African/Kenyan context where appropriate)
  example: string;
  // Comparison with easily confused Azure concepts
  comparison: { with: string; detail: string }[];
  // AZ-900 exam tip — recognition keywords
  examTip: string;
  examKeywords: string[];
  // Common mistakes and misconceptions
  misconceptions: string[];
  comprehension: ComprehensionQuestion[];
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  lesson: Lesson;
}

export interface Module {
  id: string;
  domainId: DomainId;
  title: string;
  description: string;
  topicIds: string[];
}

export type DomainId = 'cloud-concepts' | 'azure-architecture' | 'azure-management';

export interface Domain {
  id: DomainId;
  title: string;
  shortTitle: string;
  description: string;
  color: 'brand' | 'teal' | 'amber';
  moduleIds: string[];
}

export interface Question {
  id: string;
  domainId: DomainId;
  topicId: string;
  prompt: string;
  options: string[];
  // indices of correct options
  correct: number[];
  type: QuestionType;
  difficulty: Difficulty;
  explanation: string;
  // explanation of why each distractor is wrong (keyed by option index)
  distractorAnalysis: { index: number; reason: string }[];
  scenario?: string;
  // Curated repair content for commonly confused concepts. Existing fields above
  // already provide the topic, correct answer indices, and distractor feedback.
  concept?: string;
  misconceptionId?: string;
  remedialLesson?: {
    title: string;
    explanation: string;
    example: string;
    examTip: string;
  };
  followUpQuestion?: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  followUpQuestions?: FollowUpQuestion[];
}

export interface FollowUpQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ---- Progress tracking ----

export interface QuestionAttempt {
  questionId: string;
  selected: number[];
  correct: boolean;
  timestamp: number;
}

export interface TopicProgress {
  topicId: string;
  attempted: number;
  correct: number;
  comprehensionCompleted: boolean;
  lessonViewed: boolean;
}

export interface LearningGap {
  misconceptionId: string;
  questionId: string;
  topicId: string;
  status: 'needs-review' | 'corrected';
  firstMissedAt: number;
  lastMissedAt: number;
  followUpAttempts: number;
  successfulCorrections: number;
  lastFollowUpAt?: number;
}

export interface ProgressState {
  attempts: QuestionAttempt[];
  topics: Record<string, TopicProgress>;
  flashcardsReviewed: string[];
  learningGaps: Record<string, LearningGap>;
  seenQuestionIdsByScope: Record<string, string[]>;
  lastVisitedTopicId?: string;
}
