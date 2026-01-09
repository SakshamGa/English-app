
import { DailyTask, VocabularyWord } from './types';

export const INITIAL_TASKS: DailyTask[] = [
  { id: '1', title: 'Morning Chat Session', description: 'Practice greetings and daily routines', duration: '30 min', type: 'chat', completed: false },
  { id: '2', title: 'Learn 20 Conversational Words', description: 'Master common social expressions', duration: '15 min', type: 'vocab', completed: false },
  { id: '3', title: 'Evening Chat Session', description: 'Practice workplace communication', duration: '30 min', type: 'chat', completed: false },
  { id: '4', title: 'Learn 20 Corporate Words', description: 'Business vocabulary for meetings', duration: '15 min', type: 'vocab', completed: false },
  { id: '5', title: 'Daily Revision', description: 'Review words from yesterday', duration: '10 min', type: 'revision', completed: false },
];

export const INITIAL_VOCAB: VocabularyWord[] = [
  { id: 'v1', word: 'Amiable', meaningEn: 'Friendly and pleasant', meaningHi: 'मिलनसार', example: 'She had an amiable personality that made everyone feel at home.', category: 'Conversational', difficulty: 'Intermediate', isLearned: false },
  { id: 'v2', word: 'Leverage', meaningEn: 'Use something to maximum advantage', meaningHi: 'लाभ उठाना', example: 'We should leverage our strengths to win the contract.', category: 'Corporate', difficulty: 'Advanced', isLearned: false },
  { id: 'v3', word: 'Paradigm', meaningEn: 'A typical example or pattern of something', meaningHi: 'मिसाल', example: 'There has been a paradigm shift in how we work.', category: 'Corporate', difficulty: 'Advanced', isLearned: false },
  { id: 'v4', word: 'Inquisitive', meaningEn: 'Curious or inquiring', meaningHi: 'जिज्ञासु', example: 'The inquisitive student asked many deep questions.', category: 'Conversational', difficulty: 'Intermediate', isLearned: false },
];
