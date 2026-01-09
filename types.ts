
export interface UserStats {
  streak: number;
  wordsLearned: number;
  practiceMinutes: number;
  testsPassed: number;
  accuracy: number;
}

export interface VocabularyWord {
  id: string;
  word: string;
  meaningEn: string;
  meaningHi: string;
  example: string;
  category: 'Conversational' | 'Corporate';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isLearned: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  correction?: {
    improved: string;
    explanation: string;
    score: number;
  };
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'chat' | 'vocab' | 'revision';
  completed: boolean;
}

export type View = 'landing' | 'dashboard' | 'chat' | 'vocabulary' | 'progress';
