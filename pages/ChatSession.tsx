
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, RefreshCcw, Sparkles, CheckCircle, Info } from 'lucide-react';
import { ChatMessage, View } from '../types';
import { getTutorResponse, CorrectionResponse } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSessionProps {
  onComplete: () => void;
  setView: (view: View) => void;
}

const ChatSession: React.FC<ChatSessionProps> = ({ onComplete, setView }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setIsLoading(true);

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const tutorData: CorrectionResponse = await getTutorResponse(
        userMessage, 
        messages.map(m => ({ role: m.role, content: m.content }))
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: tutorData.reply,
        correction: tutorData.improved ? {
          improved: tutorData.improved,
          explanation: tutorData.explanation || '',
          score: tutorData.score
        } : undefined
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('dashboard')}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-heading font-bold flex items-center gap-2">
              Practice Session <Sparkles className="w-5 h-5 text-primary" />
            </h2>
            <p className="text-xs text-text-muted font-medium">Topic: Daily Routines</p>
          </div>
        </div>
        <button 
          onClick={onComplete}
          className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          End Session
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="bg-primary/10 p-6 rounded-full">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Ready to practice?</h3>
            <p className="text-text-muted max-w-sm">Type anything to start. I'll help you with grammar and vocabulary as we chat.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 shadow-sm rounded-tl-none'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
            </div>

            {msg.role === 'assistant' && msg.correction && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 w-full max-w-[85%] bg-orange-50 border border-orange-100 p-5 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Correction & Score</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full text-xs font-bold text-orange-500 shadow-sm">
                    {msg.correction.score}/100
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-800 mb-2 italic">
                  "{msg.correction.improved}"
                </p>
                <div className="flex items-start gap-2 bg-white/50 p-3 rounded-xl">
                  <Info className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600 leading-relaxed">{msg.correction.explanation}</p>
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-primary text-sm font-bold animate-pulse">
            <RefreshCcw className="w-4 h-4 animate-spin" />
            Lovable is thinking...
          </div>
        )}
      </div>

      <div className="mt-8 relative">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message in English..."
          className="w-full bg-white border-2 border-slate-100 rounded-full py-5 px-8 pr-16 focus:outline-none focus:border-primary transition-colors shadow-lg shadow-slate-100"
        />
        <button 
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:scale-110 active:scale-95 transition-all disabled:bg-slate-300 disabled:scale-100"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatSession;
