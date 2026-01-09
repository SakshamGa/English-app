
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChatSession from './pages/ChatSession';
import VocabSection from './pages/VocabSection';
import ProgressAnalytics from './pages/ProgressAnalytics';
import { View, UserStats, DailyTask, VocabularyWord } from './types';
import { INITIAL_TASKS, INITIAL_VOCAB } from './constants';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('landing');
  const [stats, setStats] = useState<UserStats>({
    streak: 5,
    wordsLearned: 128,
    practiceMinutes: 420,
    testsPassed: 12,
    accuracy: 88,
  });
  const [tasks, setTasks] = useState<DailyTask[]>(INITIAL_TASKS);
  const [vocab, setVocab] = useState<VocabularyWord[]>(INITIAL_VOCAB);

  // Sync state with localStorage for simple persistence in SPA
  useEffect(() => {
    const savedStats = localStorage.getItem('lovable_stats');
    if (savedStats) setStats(JSON.parse(savedStats));
    const savedTasks = localStorage.getItem('lovable_tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    const savedVocab = localStorage.getItem('lovable_vocab');
    if (savedVocab) setVocab(JSON.parse(savedVocab));
  }, []);

  const saveState = (s: UserStats, t: DailyTask[], v: VocabularyWord[]) => {
    localStorage.setItem('lovable_stats', JSON.stringify(s));
    localStorage.setItem('lovable_tasks', JSON.stringify(t));
    localStorage.setItem('lovable_vocab', JSON.stringify(v));
  };

  const handleStartTask = (task: DailyTask) => {
    if (task.type === 'chat') {
      setView('chat');
    } else if (task.type === 'vocab' || task.type === 'revision') {
      setView('vocabulary');
    }
  };

  const handleCompleteChat = () => {
    const newTasks = tasks.map(t => 
      t.title.includes('Chat') ? { ...t, completed: true } : t
    );
    const newStats = { ...stats, practiceMinutes: stats.practiceMinutes + 30 };
    setTasks(newTasks);
    setStats(newStats);
    saveState(newStats, newTasks, vocab);
    setView('dashboard');
  };

  const handleLearnWord = (id: string) => {
    const newVocab = vocab.map(v => v.id === id ? { ...v, isLearned: true } : v);
    const newStats = { ...stats, wordsLearned: stats.wordsLearned + 1 };
    setVocab(newVocab);
    setStats(newStats);
    saveState(newStats, tasks, newVocab);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header currentView={currentView} setView={setView} />
      
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage onStart={() => setView('dashboard')} />
        )}
        
        {currentView === 'dashboard' && (
          <Dashboard 
            stats={stats} 
            tasks={tasks} 
            onStartTask={handleStartTask} 
            setView={setView}
          />
        )}

        {currentView === 'chat' && (
          <ChatSession onComplete={handleCompleteChat} setView={setView} />
        )}

        {currentView === 'vocabulary' && (
          <VocabSection vocab={vocab} onLearn={handleLearnWord} />
        )}

        {currentView === 'progress' && (
          <ProgressAnalytics />
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <div className="w-5 h-5 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-heading font-bold text-text-primary">Lovable</span>
          </div>
          <p className="text-text-muted text-sm">© 2024 Lovable AI English Tutor. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
