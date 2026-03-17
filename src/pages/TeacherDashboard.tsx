import React from 'react';
import { BookOpen, Users, FileText, Clock, TrendingUp, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { teacherStats, mockUsers, mockAssignments, mockEvents } from '../db';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const lastName = user?.name.split(' ').pop() || 'Teacher';
  const myStudents = mockUsers.filter(u => u.role === 'student').slice(0, 5);
  const recentAssignments = mockAssignments.slice(0, 4);
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-sm cursor-pointer group"
        onClick={() => navigate('/teacher/my-class')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
        
        <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Welcome back, {lastName}!
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed mt-2">
              Here's what's happening in your classes today.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-background/50 backdrop-blur-md p-4 rounded-2xl border border-border/50 shadow-sm group-hover:bg-background/80 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">My Class Dashboard</h3>
              <p className="text-xs font-medium text-muted-foreground">Manage Class 10-A</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center ml-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">My Classes</h3>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-foreground relative z-10">{teacherStats.totalClasses}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">My Students</h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-foreground relative z-10">{teacherStats.totalStudents}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pending Assignments</h3>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shadow-inner">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-foreground relative z-10">{teacherStats.pendingAssignments}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Upcoming Tests</h3>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shadow-inner">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-foreground relative z-10">{teacherStats.upcomingTests}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground m-0">Recent Assignments</h3>
          </div>
          <div className="space-y-3 relative z-10">
            {recentAssignments.map(assignment => (
              <div key={assignment.id} className="flex flex-col p-4 rounded-2xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{assignment.title}</h4>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    assignment.status === 'pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                    assignment.status === 'submitted' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                    'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {assignment.subject} • Class {assignment.class}-{assignment.section}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Students */}
        <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground m-0">Top Performing Students</h3>
          </div>
          <div className="space-y-3 relative z-10">
            {myStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-border/50 hover:bg-secondary/30 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-display font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{student.name}</p>
                    <p className="text-xs font-medium text-muted-foreground">Class {student.class}-{student.section}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Good
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-2 bg-purple-500/10 rounded-xl text-purple-600">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold text-foreground m-0">Upcoming Events</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {upcomingEvents.map(event => (
            <div key={event.id} className="p-5 rounded-2xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors group">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-4 inline-block ${
                event.type === 'exam' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                event.type === 'holiday' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                event.type === 'sports' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                event.type === 'meeting' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                'bg-purple-500/10 text-purple-600 border-purple-500/20'
              }`}>
                {event.type}
              </span>
              <h4 className="font-bold text-sm mb-2 text-foreground group-hover:text-primary transition-colors">{event.title}</h4>
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
