import React, { useState } from 'react';
import { Calendar, MapPin, User, BookOpen, Clock, Sparkles } from 'lucide-react';
import { mockTimetable } from '../db';
import { motion } from 'motion/react';

export function StudentTimetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const initialDay = days.includes(today) ? today : 'Monday';
  
  const [selectedDay, setSelectedDay] = useState(initialDay);
  
  const schedule = mockTimetable.find(s => s.day === selectedDay)?.periods || [];
  
  const totalClasses = schedule.filter(p => p.type === 'lecture' || p.type === 'lab').length;
  const labCount = schedule.filter(p => p.type === 'lab').length;

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Mathematics': 'bg-primary/10 text-primary border-primary/20',
      'Science': 'bg-success/10 text-success border-success/20',
      'English': 'bg-info/10 text-info border-info/20',
      'Hindi': 'bg-warning/10 text-warning border-warning/20',
      'History': 'bg-destructive/10 text-destructive border-destructive/20',
      'Geography': 'bg-accent/10 text-accent border-accent/20',
      'Computer Science': 'bg-primary/10 text-primary border-primary/20',
      'Physical Education': 'bg-success/10 text-success border-success/20',
    };
    return colors[subject] || 'bg-secondary text-foreground border-border';
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="page-header">
        <h1>Timetable</h1>
        <p>Your weekly class schedule.</p>
      </div>

      {/* Day Selector - Premium Pill Design */}
      <div className="flex gap-3 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${
              selectedDay === day 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-blue-500/25 scale-105' 
                : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card group flex-row items-center gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 relative z-10">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Classes Today</p>
            <p className="text-3xl font-display font-bold text-foreground">{totalClasses}</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card group flex-row items-center gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-info/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="w-14 h-14 rounded-2xl bg-info/10 flex items-center justify-center text-info shrink-0 relative z-10">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Lab Sessions</p>
            <p className="text-3xl font-display font-bold text-foreground">{labCount}</p>
          </div>
        </motion.div>
      </div>

      {/* Schedule Timeline */}
      <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm">
        <div className="space-y-6 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[2.25rem] sm:left-[5.5rem] top-4 bottom-4 w-px bg-border hidden sm:block"></div>
          
          {schedule.map((period, i) => {
            if (period.type === 'break' || period.type === 'lunch') {
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="relative flex items-center justify-center py-6"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-border/50" />
                  </div>
                  <div className="relative bg-card px-6 py-2 rounded-full border border-border shadow-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold text-muted-foreground uppercase tracking-widest text-xs">
                      {period.subject} • {period.time}
                    </span>
                  </div>
                </motion.div>
              );
            }

            if (period.type === 'free') {
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="relative z-10 bg-secondary/30 rounded-2xl p-6 border border-dashed border-border/50 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 ml-0 sm:ml-6"
                >
                  <div className="w-24 shrink-0 font-bold text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {period.time.split(' - ')[0]}
                  </div>
                  <div className="flex-1 text-muted-foreground italic font-medium">Free Period</div>
                </motion.div>
              );
            }

            return (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className={`relative z-10 bg-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 ml-0 sm:ml-6 group overflow-hidden`}
              >
                {/* Subject Color Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${getSubjectColor(period.subject).split(' ')[0]}`}></div>
                
                <div className="w-24 shrink-0 text-foreground pl-4">
                  <p className="font-display font-bold text-xl">{period.time.split(' - ')[0]}</p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">{period.time.split(' - ')[1]}</p>
                </div>
                
                <div className="hidden sm:block w-px h-16 bg-border"></div>
                
                <div className="flex-1 pl-4 sm:pl-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors">{period.subject}</h3>
                    {period.type === 'lab' && (
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest">LAB</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg">
                      <User className="w-4 h-4 text-primary" />
                      {period.teacher}
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg">
                      <MapPin className="w-4 h-4 text-primary" />
                      {period.room}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
