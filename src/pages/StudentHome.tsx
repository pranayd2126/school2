import React from 'react';
import { BookOpen, CalendarCheck, Trophy, Star, Award, Calendar, Phone, Mail, Sparkles, Target, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockParent, mockAchievements, mockNotices, mockEvents, mockScores, mockAttendance } from '../db';
import { motion } from 'motion/react';

export function StudentHome() {
  const { user } = useAuth();
  
  const presentDays = mockAttendance.filter(a => a.status === 'present').length;
  const attendancePercentage = Math.round((presentDays / mockAttendance.length) * 100);
  const avgScore = Math.round(mockScores.reduce((acc, curr) => acc + curr.marks, 0) / mockScores.length);

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Banner - Highly Attractive River Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-8 sm:p-12 text-white shadow-2xl shadow-blue-500/20"
      >
        {/* Decorative background elements */}
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
              <span>Level 12 Scholar</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl font-display font-bold mb-2 tracking-tight"
            >
              Welcome back, {user?.name.split(' ')[0]}!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/90 text-lg font-medium"
            >
              Ready to conquer today's challenges? You're doing great!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6"
            >
              <span className="px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium shadow-sm">Class {user?.class}</span>
              <span className="px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium shadow-sm">Section {user?.section}</span>
              <span className="px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-sm font-medium shadow-sm">Roll No: {user?.rollNo}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Stats & Progress) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Gamified Stats Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-card rounded-[2rem] p-6 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Target className="w-6 h-6" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">{avgScore}%</p>
              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-card rounded-[2rem] p-6 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">{attendancePercentage}%</p>
              <p className="text-sm font-medium text-muted-foreground">Attendance</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-card rounded-[2rem] p-6 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-warning/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-warning mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">{mockAchievements.length}</p>
              <p className="text-sm font-medium text-muted-foreground">Achievements</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-card rounded-[2rem] p-6 border border-border shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-info/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center text-info mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">{mockScores.length}</p>
              <p className="text-sm font-medium text-muted-foreground">Subjects</p>
            </motion.div>
          </div>

          {/* Achievements Showcase */}
          <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-warning fill-warning" />
                Recent Trophies
              </h3>
              <button className="text-sm font-medium text-primary hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockAchievements.slice(0, 3).map((achievement, i) => (
                <motion.div 
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="p-5 rounded-2xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors flex flex-col items-center text-center"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner ${
                    achievement.icon === 'trophy' ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 dark:from-yellow-900/40 dark:to-yellow-800/40 dark:text-yellow-500' :
                    achievement.icon === 'star' ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-500' :
                    'bg-gradient-to-br from-green-100 to-green-200 text-green-600 dark:from-green-900/40 dark:to-green-800/40 dark:text-green-500'
                  }`}>
                    {achievement.icon === 'trophy' && <Trophy className="w-8 h-8" />}
                    {achievement.icon === 'star' && <Star className="w-8 h-8" />}
                    {achievement.icon === 'award' && <Award className="w-8 h-8" />}
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Timeline */}
          <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              What's Coming Up
            </h3>
            <div className="space-y-6">
              {mockEvents.slice(0, 3).map((event, i) => (
                <div key={event.id} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-6 top-14 bottom-[-1.5rem] w-px bg-border"></div>}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 ${
                    event.type === 'exam' ? 'bg-destructive/10 text-destructive' :
                    event.type === 'holiday' ? 'bg-warning/10 text-warning' :
                    event.type === 'sports' ? 'bg-success/10 text-success' :
                    'bg-primary/10 text-primary'
                  }`}>
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 bg-secondary/20 rounded-2xl p-4 border border-border hover:bg-secondary/40 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-foreground">{event.title}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
                        event.type === 'exam' ? 'bg-destructive/10 text-destructive' :
                        event.type === 'holiday' ? 'bg-warning/10 text-warning' :
                        event.type === 'sports' ? 'bg-success/10 text-success' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      {event.time !== '-' && ` • ${event.time}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          
          {/* Parent Info Card - Elegant Ivory/Dark style */}
          <div className="bg-sidebar-bg text-sidebar-fg rounded-[2rem] p-8 border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sidebar-primary/5 rounded-bl-[4rem] -mr-8 -mt-8"></div>
            <h3 className="text-xs font-bold text-sidebar-primary mb-6 uppercase tracking-widest flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Emergency Contact
            </h3>
            
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-accent flex items-center justify-center text-sidebar-bg font-display font-bold text-3xl shadow-lg mb-4">
                {mockParent.name.charAt(0)}
              </div>
              <p className="font-display font-bold text-xl text-sidebar-primary">{mockParent.name}</p>
              <p className="text-sm text-sidebar-fg/80 font-medium bg-sidebar-accent/20 px-3 py-1 rounded-full mt-2">{mockParent.relation}</p>
            </div>
            
            <div className="space-y-3 bg-sidebar-accent/10 p-4 rounded-2xl border border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sidebar-primary/10 flex items-center justify-center text-sidebar-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{mockParent.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sidebar-primary/10 flex items-center justify-center text-sidebar-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{mockParent.email}</span>
              </div>
            </div>
          </div>

          {/* Notices - Clean & Readable */}
          <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm">
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              School Notices
            </h3>
            <div className="space-y-4">
              {mockNotices.map((notice, i) => (
                <motion.div 
                  key={notice.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="group relative pl-4 border-l-2 hover:border-l-4 transition-all duration-300"
                  style={{ borderColor: notice.priority === 'high' ? 'var(--destructive)' : notice.priority === 'medium' ? 'var(--warning)' : 'var(--muted-foreground)' }}
                >
                  <h4 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{notice.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{notice.content}</p>
                  <span className="text-[10px] font-medium text-muted-foreground mt-2 block">
                    {new Date(notice.date).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
