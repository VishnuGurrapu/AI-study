export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  hint?: string;
  tag?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CoreConcept {
  term: string;
  definition: string;
}

export interface StudySummaryData {
  overview: string;
  keyTakeaways: string[];
  coreConcepts: CoreConcept[];
  suggestedNextTopics?: string[];
}

export interface StudyKit {
  id: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string;
  summary: StudySummaryData;
  flashcards: FlashcardItem[];
  quiz: QuizQuestion[];
}

export type StudyTabType = 'flashcards' | 'quiz' | 'quiz-summary' | 'summary';

export type AppStatus = 'idle' | 'loading' | 'error' | 'ready';
