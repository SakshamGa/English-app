
import React from 'react';
import { Flame, BookCheck, Timer, Trophy, ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { UserStats, DailyTask, View } from '../types';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats: UserStats;
  tasks: DailyTask[];
  onStartTask: (task: DailyTask) => void;
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, tasks, onStartTask, setView }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary">Welcome back, Alex! 👋</h1>
          <p className="text-text-muted">You're doing great! Finish today's plan to maintain your streak.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
           <div className="bg-orange-500 p-2 rounded-lg">
             <Flame className="w-5 h-5 text-white" />
           </div>
           <div>
             <p className="text-xs font-bold text-orange-500 uppercase">Current Streak</p>
             <p className="text-lg font-bold text-text-primary leading-none">{stats.streak} Days</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard label="Words Learned" value={stats.wordsLearned} icon={BookCheck} color="bg-primary" />
        <StatsCard label="Practice Time" value={`${stats.practiceMinutes}m`} icon={Timer} color="bg-orange-400" />
        <StatsCard label="Accuracy Rate" value={`${stats.accuracy}%`} icon={Trophy} color="bg-indigo-500" />
        <StatsCard label="Tests Passed" value={stats.testsPassed} icon={CheckCircle2} color="bg-teal-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Learning Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-heading font-bold">Your Learning Plan</h2>
               <span className="text-primary font-bold text-sm bg-primary/10 px-4 py-1.5 rounded-full">
                 {progressPercent.toFixed(0)}% Complete
               </span>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full mb-10 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progressPercent}%` }}
                 className="h-full bg-primary"
               />
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${
                    task.completed ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${task.completed ? 'bg-green-100 text-green-500' : 'bg-primary/10 text-primary'}`}>
                      {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className={`font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-text-primary'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-text-muted">{task.description} • {task.duration}</p>
                    </div>
                  </div>
                  {!task.completed && (
                    <button 
                      onClick={() => onStartTask(task)}
                      className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Motivation Card */}
          <div className="bg-gradient-to-br from-accent to-orange-400 p-8 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-bold mb-2">Keep it up! 🚀</h3>
              <p className="text-white/80 mb-6">You're in the top 5% of learners today. Don't lose the momentum!</p>
              <div className="flex gap-2">
                 {[1,2,3,4,5,6,7].map((d) => (
                   <div key={d} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${d <= stats.streak ? 'bg-white text-accent border-white' : 'border-white/30 text-white/50'}`}>
                     {d}
                   </div>
                 ))}
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <Flame className="w-32 h-32 fill-white" />
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-6">Quick Stats</h3>
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-text-muted uppercase font-bold mb-1">Weekly Goal</p>
                    <p className="text-lg font-bold">280 Words</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary font-bold">75% Done</p>
                  </div>
               </div>
               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="w-3/4 h-full bg-primary" />
               </div>

               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Timer className="w-4 h-4 text-text-muted" />
                   <span className="text-sm font-medium text-text-muted">Next Test: Tomorrow</span>
                 </div>
                 <button 
                  onClick={() => setView('progress')}
                  className="text-xs font-bold text-primary hover:underline"
                 >
                   View All Stats
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
