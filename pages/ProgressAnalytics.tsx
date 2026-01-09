
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Target, TrendingUp, Calendar, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', words: 35, practice: 45 },
  { name: 'Tue', words: 42, practice: 50 },
  { name: 'Wed', words: 38, practice: 40 },
  { name: 'Thu', words: 55, practice: 65 },
  { name: 'Fri', words: 40, practice: 45 },
  { name: 'Sat', words: 45, practice: 55 },
  { name: 'Sun', words: 50, practice: 60 },
];

const ProgressAnalytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Progress Analytics 📊</h1>
        <p className="text-text-muted">Deep dive into your learning journey and performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Weekly Overview Line Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Learning Activity
            </h3>
            <div className="flex items-center gap-4 text-xs font-bold">
               <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-primary rounded-full" /> Words</div>
               <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-accent rounded-full" /> Practice (min)</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#2EC4B6', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="words" stroke="#2EC4B6" strokeWidth={4} dot={{ r: 4, fill: '#2EC4B6', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="practice" stroke="#FF9F68" strokeWidth={4} dot={{ r: 4, fill: '#FF9F68', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Scores Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" /> Speaking Confidence
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   cursor={{ fill: '#f1f5f9' }}
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="words" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#2EC4B6' : '#94a3b8'} fillOpacity={index === 3 ? 1 : 0.2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Zap, label: 'Fastest Progress', value: 'Business English', color: 'bg-orange-500' },
          { icon: Calendar, label: 'Days Active', value: '24 / 30 Days', color: 'bg-primary' },
          { icon: Target, label: 'Weakest Area', value: 'Prepositions', color: 'bg-indigo-500' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className={`${item.color} p-4 rounded-2xl`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{item.label}</p>
              <p className="text-xl font-bold text-text-primary">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressAnalytics;
