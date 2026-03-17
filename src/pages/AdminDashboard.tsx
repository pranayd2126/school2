import React, { useState } from 'react';
import { Users, GraduationCap, TrendingUp, AlertCircle, Bell, Plus, Trash2, BookOpen, Calendar, ArrowUpRight, Activity, Sparkles } from 'lucide-react';
import { adminStats, mockUsers, mockNotices } from '../db';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const teachers = mockUsers.filter(u => u.role === 'teacher').slice(0, 5);
  const [notices, setNotices] = useState(mockNotices.slice(0, 3));

  const addNotice = () => {
    const newNotice = {
      id: Date.now().toString(),
      title: 'New Important Update',
      content: 'This is a newly added system alert for all staff.',
      date: new Date().toISOString().split('T')[0],
      priority: 'high' as const
    };
    setNotices([newNotice, ...notices]);
  };

  const removeNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative p-8 sm:p-12 z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-foreground"
            >
              Welcome back, Admin
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed"
          >
            Here's what's happening at Oakridge International School today. You have <span className="text-primary font-bold">{notices.length} active alerts</span> requiring attention.
          </motion.p>
        </div>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Students</h3>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-inner">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <h3 className="text-4xl font-display font-bold text-foreground">{adminStats.totalStudents.toLocaleString()}</h3>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 4%
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Teaching Staff</h3>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shadow-inner">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <h3 className="text-4xl font-display font-bold text-foreground">{adminStats.totalTeachers}</h3>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 2
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg Attendance</h3>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-inner">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <h3 className="text-4xl font-display font-bold text-foreground">{adminStats.attendanceRate}%</h3>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 1.2%
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="group relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-[2rem] p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-white/80 uppercase tracking-wider">Active Courses</h3>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shadow-inner backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-4xl font-display font-bold text-white">42</h3>
          </div>
          <div className="relative z-10 mt-4">
            <div className="w-full bg-black/20 rounded-full h-1.5 mb-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-white h-full rounded-full"
              ></motion.div>
            </div>
            <p className="text-xs text-white/90 font-medium">85% syllabus completion</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alerts & Notices (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-card rounded-[2.5rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">Alerts & Notices</h3>
                <p className="text-sm text-muted-foreground font-medium mt-0.5">System-wide announcements and warnings.</p>
              </div>
            </div>
            <button 
              onClick={addNotice}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>New Alert</span>
            </button>
          </div>
          
          {/* High Priority Alert */}
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 to-red-500/5 border border-rose-500/20 flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-600 shrink-0 shadow-inner">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-rose-600 mb-1">Low Attendance Warning</h4>
              <p className="text-sm text-rose-600/80 font-medium leading-relaxed">
                12 students across Grade 9 have fallen below the 75% attendance threshold this month. Immediate parent notification required.
              </p>
            </div>
          </div>

          <div className="space-y-3 relative z-10">
            {notices.map((notice, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={notice.id} 
                className="group flex items-start justify-between gap-4 p-4 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-border/50 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                    notice.priority === 'high' ? 'bg-rose-500/10 text-rose-600' : 
                    notice.priority === 'medium' ? 'bg-amber-500/10 text-amber-600' : 
                    'bg-blue-500/10 text-blue-600'
                  }`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{notice.title}</h4>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{notice.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">{notice.content}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeNotice(notice.id)}
                  className="p-2.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove Alert"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
            {notices.length === 0 && (
              <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-dashed border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <Bell className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
                <p className="text-sm font-bold text-muted-foreground">No active alerts at this time.</p>
              </div>
            )}
          </div>
        </div>

        {/* Teaching Staff (1 Column) */}
        <div className="bg-card rounded-[2.5rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-600">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground m-0">Top Teachers</h3>
            </div>
            <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">View All</button>
          </div>
          
          <div className="space-y-3 flex-1 relative z-10">
            {teachers.map((teacher, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={teacher.id} 
                className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-border/50 hover:bg-secondary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-inner group-hover:scale-105 transition-transform">
                      {teacher.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{teacher.name}</p>
                    <p className="text-xs font-medium text-muted-foreground">{teacher.email}</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-secondary/50 text-secondary-foreground text-[10px] font-bold uppercase tracking-wider rounded-xl border border-border/50">
                  {teacher.subject}
                </span>
              </motion.div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3.5 bg-secondary/50 border border-border rounded-xl text-sm font-bold text-foreground hover:bg-secondary hover:shadow-sm transition-all duration-300 relative z-10">
            Manage Staff Directory
          </button>
        </div>

      </div>
    </div>
  );
}
