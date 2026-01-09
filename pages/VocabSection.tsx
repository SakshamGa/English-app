
import React from 'react';
import { Search, Volume2, Bookmark, Check, Layers, Briefcase, Users } from 'lucide-react';
import { VocabularyWord } from '../types';

interface VocabSectionProps {
  vocab: VocabularyWord[];
  onLearn: (id: string) => void;
}

const VocabSection: React.FC<VocabSectionProps> = ({ vocab, onLearn }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Daily Vocabulary 📚</h1>
          <p className="text-text-muted">Master 40 words today. 20 Conversational + 20 Corporate.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
          <input 
            type="text"
            placeholder="Search words..."
            className="w-full bg-white border border-slate-200 rounded-full py-3 px-12 focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 flex-shrink-0">
          <Layers className="w-4 h-4" /> All Words
        </button>
        <button className="bg-white text-text-primary border border-slate-200 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 flex-shrink-0 hover:border-primary transition-colors">
          <Users className="w-4 h-4 text-teal-500" /> Conversational
        </button>
        <button className="bg-white text-text-primary border border-slate-200 px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 flex-shrink-0 hover:border-primary transition-colors">
          <Briefcase className="w-4 h-4 text-orange-500" /> Corporate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vocab.map((word) => (
          <div 
            key={word.id} 
            className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`text-[10px] uppercase font-black tracking-[0.2em] px-3 py-1 rounded-full mb-3 inline-block ${
                  word.category === 'Corporate' ? 'bg-orange-100 text-orange-600' : 'bg-teal-100 text-teal-600'
                }`}>
                  {word.category}
                </span>
                <h3 className="text-3xl font-heading font-bold text-text-primary flex items-center gap-2">
                  {word.word}
                  <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Volume2 className="w-5 h-5 text-text-muted" />
                  </button>
                </h3>
              </div>
              <button className="p-2 text-text-muted hover:text-primary transition-colors">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">English Meaning</p>
                <p className="text-sm font-medium text-text-primary leading-relaxed">{word.meaningEn}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-slate-300">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Hindi Meaning</p>
                <p className="text-lg font-bold text-text-primary">{word.meaningHi}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Example Sentence</p>
                <p className="text-sm font-medium text-text-muted italic">"{word.example}"</p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-xs font-bold text-text-muted">{word.difficulty}</span>
              <button 
                onClick={() => onLearn(word.id)}
                disabled={word.isLearned}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  word.isLearned 
                  ? 'bg-green-100 text-green-600 cursor-default' 
                  : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95'
                }`}
              >
                {word.isLearned ? <><Check className="w-4 h-4" /> Learned</> : 'Mark as Learned'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabSection;
