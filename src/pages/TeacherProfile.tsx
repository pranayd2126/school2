import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, mockAssignments, teacherStats, mockTeacherSchedule } from '../db';
import { BookOpen, Users, FileText, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function TeacherProfile() {
  const { user } = useAuth();
  
  const myAssignments = mockAssignments.filter(a => a.teacherName === user?.name);
  const schedule = mockTeacherSchedule[0].periods.filter(p => p.type === 'lecture' || p.type === 'lab');
  const totalClassesWeek = mockTeacherSchedule.reduce((acc, curr) => acc + curr.periods.filter(p => p.type === 'lecture' || p.type === 'lab').length, 0);

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and teaching schedule.</p>
      </div>

      {/* Profile Card */}
      <div className="card-elevated p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold shadow-lg shadow-primary/30">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">{user?.name}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
              <span className="badge-pill bg-success/10 text-success border border-success/20">{user?.subject} Teacher</span>
              <span className="badge-pill bg-secondary text-secondary-foreground border border-border">Senior Faculty</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">My Classes</h3>
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold">{teacherStats.totalClasses}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Students</h3>
            <Users className="w-4 h-4 text-info" />
          </div>
          <p className="text-2xl font-display font-bold">{teacherStats.totalStudents}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Assignments</h3>
            <FileText className="w-4 h-4 text-warning" />
          </div>
          <p className="text-2xl font-display font-bold">{myAssignments.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Weekly Classes</h3>
            <Calendar className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-display font-bold">{totalClassesWeek}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classes Assigned */}
        <div className="card-elevated p-6">
          <h3 className="section-title">Classes Assigned</h3>
          <div className="space-y-3">
            {['10-A', '10-B', '9-A', '9-B'].map((cls, i) => (
              <div key={cls} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {cls.split('-')[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Class {cls}</p>
                    <p className="text-xs text-muted-foreground">{user?.subject}</p>
                  </div>
                </div>
                <span className="badge-pill bg-secondary text-secondary-foreground">
                  {30 + i * 2} Students
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* My Assignments */}
        <div className="card-elevated p-6">
          <h3 className="section-title">Recent Assignments</h3>
          <div className="space-y-4">
            {myAssignments.slice(0, 4).map(assignment => (
              <div key={assignment.id} className="flex flex-col p-3 rounded-xl border border-border hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{assignment.title}</h4>
                  <span className={`badge-pill text-[10px] ${
                    assignment.status === 'pending' ? 'bg-warning/10 text-warning' :
                    assignment.status === 'submitted' ? 'bg-info/10 text-info' :
                    'bg-success/10 text-success'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Class {assignment.class}-{assignment.section}</span>
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="card-elevated p-6">
        <h3 className="section-title">Today's Schedule</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {schedule.map((period, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-secondary/20 border-l-4 border-l-primary">
              <p className="font-bold text-sm mb-1">{period.time}</p>
              <h4 className="font-medium text-foreground mb-2">{period.subject}</h4>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Class {period.class}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {period.room}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
