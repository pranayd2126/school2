import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockParent, mockAchievements, mockScores, mockAttendance } from '../db';
import { Trophy, Star, Award, Phone, Mail, BookOpen, CalendarCheck, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function StudentProfile() {
  const { user } = useAuth();
  
  const presentDays = mockAttendance.filter(a => a.status === 'present').length;
  const attendancePct = Math.round((presentDays / mockAttendance.length) * 100);
  const avgScore = Math.round(mockScores.reduce((acc, curr) => acc + curr.marks, 0) / mockScores.length);
  const topSubject = mockScores.reduce((best, s) => s.marks > best.marks ? s : best);

  return (
    <div className="space-y-8 pb-8">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View your academic details and performance metrics.</p>
      </div>

      {/* Profile Card - River Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-8 sm:p-12 text-white shadow-2xl shadow-blue-500/20"
      >
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center text-5xl font-bold shadow-xl shrink-0"
          >
            {user?.name.charAt(0)}
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-4 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Student Profile</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">{user?.name}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
              <span className="px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium shadow-sm">Class {user?.class}</span>
              <span className="px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium shadow-sm">Section {user?.section}</span>
              <span className="px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium shadow-sm">Roll No: {user?.rollNo}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/90 font-medium">
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <Mail className="w-4 h-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <Phone className="w-4 h-4" />
                +91 98765 11111
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4-Column Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Attendance</h3>
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-3xl font-display font-bold text-success relative z-10">{attendancePct}%</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Score</h3>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-display font-bold text-primary relative z-10">{avgScore}%</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-warning/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Top Subject</h3>
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-display font-bold truncate relative z-10">{topSubject.subject}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-info/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground">Subjects</h3>
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-3xl font-display font-bold relative z-10">{mockScores.length}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parent Info */}
        <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm">
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Parent / Guardian
          </h3>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-display font-bold text-2xl shadow-inner">
              {mockParent.name.charAt(0)}
            </div>
            <div>
              <p className="font-display font-bold text-xl">{mockParent.name}</p>
              <p className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full inline-block mt-2">{mockParent.relation}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Phone Number</p>
                <p className="font-bold text-foreground">{mockParent.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Email Address</p>
                <p className="font-bold text-foreground">{mockParent.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm">
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warning" />
            Achievements
          </h3>
          <div className="space-y-4">
            {mockAchievements.map(achievement => (
              <div key={achievement.id} className="flex gap-4 p-4 rounded-2xl border border-border hover:bg-secondary/30 transition-colors group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform ${
                  achievement.icon === 'trophy' ? 'bg-warning/10 text-warning' :
                  achievement.icon === 'star' ? 'bg-info/10 text-info' :
                  'bg-success/10 text-success'
                }`}>
                  {achievement.icon === 'trophy' && <Trophy className="w-6 h-6" />}
                  {achievement.icon === 'star' && <Star className="w-6 h-6" />}
                  {achievement.icon === 'award' && <Award className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-2 bg-secondary/50 px-2 py-1 rounded-md inline-block">
                    {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm">
        <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Subject Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {mockScores.map((score, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-end mb-3">
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">{score.subject}</span>
                <span className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">{score.marks}/{score.total}</span>
              </div>
              <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(score.marks / score.total) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    score.marks >= 90 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                    score.marks >= 75 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                    score.marks >= 60 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
