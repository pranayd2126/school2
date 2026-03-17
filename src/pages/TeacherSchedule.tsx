import React, { useState } from 'react';
import { Calendar, MapPin, Users, BookOpen } from 'lucide-react';
import { mockTeacherSchedule } from '../db';
import { motion } from 'motion/react';

export function TeacherSchedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const initialDay = days.includes(today) ? today : 'Monday';
  
  const [selectedDay, setSelectedDay] = useState(initialDay);
  
  const schedule = mockTeacherSchedule.find(s => s.day === selectedDay)?.periods || [];
  
  const totalClasses = schedule.filter(p => p.type === 'lecture' || p.type === 'lab').length;
  const freeCount = schedule.filter(p => p.type === 'free').length;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1>My Schedule</h1>
        <p>View your weekly timetable and class assignments.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 bg-card p-4 rounded-2xl border border-border shadow-sm">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedDay === day ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="stat-card flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Classes Today</p>
            <p className="text-2xl font-bold">{totalClasses}</p>
          </div>
        </div>
        <div className="stat-card flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Free Periods</p>
            <p className="text-2xl font-bold">{freeCount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((period, i) => {
          if (period.type === 'break' || period.type === 'lunch') {
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="relative flex items-center justify-center py-4"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-border" />
                </div>
                <div className="relative bg-background px-4">
                  <span className="badge-pill bg-secondary text-secondary-foreground uppercase tracking-wider text-[10px]">
                    {period.subject} • {period.time}
                  </span>
                </div>
              </motion.div>
            );
          }

          if (period.type === 'free') {
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="card-elevated p-4 border-dashed bg-secondary/10 flex items-center gap-6"
              >
                <div className="w-32 shrink-0 font-medium text-muted-foreground">{period.time}</div>
                <div className="flex-1 text-muted-foreground italic">Free Period</div>
              </motion.div>
            );
          }

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i} 
              className="card-elevated p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-l-4 border-l-primary"
            >
              <div className="w-32 shrink-0">
                <p className="font-bold text-foreground">{period.time.split(' - ')[0]}</p>
                <p className="text-xs text-muted-foreground">{period.time.split(' - ')[1]}</p>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{period.subject}</h3>
                  {period.type === 'lab' && (
                    <span className="badge-pill bg-info/10 text-info text-[10px]">LAB</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Class {period.class}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {period.room}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
