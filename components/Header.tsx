
import React from 'react';
import { BookOpen, User, Menu } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-primary/10 shadow-sm px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('landing')}
      >
        <div className="bg-primary p-2 rounded-xl group-hover:rotate-6 transition-transform">
          <BookOpen className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-heading font-bold text-text-primary tracking-tight">Lovable</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {[
          { label: 'Dashboard', value: 'dashboard' as View },
          { label: 'Vocabulary', value: 'vocabulary' as View },
          { label: 'Progress', value: 'progress' as View },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setView(item.value)}
            className={`text-sm font-medium transition-colors ${
              currentView === item.value ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-primary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('dashboard')}
          className="hidden sm:block text-sm font-semibold text-text-primary hover:text-primary transition-colors"
        >
          Sign In
        </button>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Get Started
        </button>
        <button className="md:hidden p-2 text-text-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
