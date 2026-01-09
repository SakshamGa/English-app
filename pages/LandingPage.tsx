
import React from 'react';
import { Rocket, Clock, Target, CheckCircle, MessageSquare, BookOpen, BarChart3, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 overflow-hidden max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-primary" />
              Master English in 1.5 Months
            </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-text-primary leading-tight mb-6">
              Your Personal <br />
              <span className="text-primary italic">English Tutor</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Practice daily with AI-powered conversations, learn 40 new words every day, and become fluent with personalized corrections.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30"
              >
                Start Learning Now
              </button>
              <button className="w-full sm:w-auto bg-white border-2 border-slate-200 text-text-primary px-10 py-4 rounded-full text-lg font-bold hover:border-primary/30 transition-colors">
                View Demo
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
              {[
                { icon: Rocket, label: '40 Words/Day', color: 'bg-orange-100 text-orange-500' },
                { icon: Clock, label: '1 Hour Daily', color: 'bg-teal-100 text-teal-500' },
                { icon: Target, label: '100% Personal', color: 'bg-indigo-100 text-indigo-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className={`${item.color} p-2 rounded-lg`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-text-primary">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex-1 relative"
          >
            <div className="relative z-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100">
               <img src="https://picsum.photos/600/500?grayscale" alt="Tutor Illustration" className="rounded-2xl w-full h-auto object-cover grayscale opacity-20" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="space-y-6 w-full px-12">
                   <div className="bg-primary/10 p-4 rounded-2xl border-l-4 border-primary ml-auto w-3/4">
                     <p className="text-sm font-medium text-primary">Tutor: Hello! How can I help you today?</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-slate-300 w-3/4">
                     <p className="text-sm font-medium text-slate-600">User: I want to practice business English.</p>
                   </div>
                   <div className="bg-orange-50 p-4 rounded-2xl border-l-4 border-orange-400 ml-auto w-3/4">
                     <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Correction</p>
                     <p className="text-sm font-medium text-slate-800">"I'd like to practice..." is more natural in corporate settings.</p>
                   </div>
                 </div>
               </div>
            </div>
            {/* Background shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Master Every Aspect</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Our AI-driven platform focuses on the four pillars of language mastery: Conversation, Vocabulary, Grammar, and Tracking.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageSquare, title: 'Daily Chat', desc: 'Real-time conversations with context-aware AI tutor.', color: 'bg-teal-500' },
              { icon: BookOpen, title: 'Smart Vocab', desc: 'Learn 40 curated words daily based on your goals.', color: 'bg-orange-500' },
              { icon: CheckCircle, title: 'Corrections', desc: 'Instant grammar feedback and better alternatives.', color: 'bg-indigo-500' },
              { icon: BarChart3, title: 'Analytics', desc: 'Detailed progress reports and streak tracking.', color: 'bg-primary' },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={`${f.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-black/5`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
