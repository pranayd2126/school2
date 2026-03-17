import React, { useState } from 'react';
import { mockAttendance } from '../db';
import { Calendar, CheckCircle, XCircle, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

export function StudentAttendance() {
  const [month, setMonth] = useState('March 2026');
  
  const presentDays = mockAttendance.filter(a => a.status === 'present').length;
  const absentDays = mockAttendance.filter(a => a.status === 'absent').length;
  const lateDays = mockAttendance.filter(a => a.status === 'late').length;
  const totalDays = mockAttendance.length;
  const attendancePct = Math.round((presentDays / totalDays) * 100);

  return (
    <div className="space-y-8 pb-8">
      <div className="page-header">
        <h1>Attendance Records</h1>
        <p>Track your daily attendance and overall percentage.</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall</h3>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-primary relative z-10">{attendancePct}%</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Present</h3>
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center text-success shadow-inner">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-success relative z-10">{presentDays}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent border-destructive/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Absent</h3>
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center text-destructive shadow-inner">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-destructive relative z-10">{absentDays}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-warning/10 via-warning/5 to-transparent border-warning/20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Late</h3>
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center text-warning shadow-inner">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-display font-bold text-warning relative z-10">{lateDays}</p>
        </motion.div>
      </div>

      {/* Detailed Attendance Table */}
      <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 relative z-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <CalendarDays className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground m-0">Monthly View</h3>
          </div>
          
          <div className="relative">
            <select 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="appearance-none bg-secondary/50 border border-border text-foreground text-sm font-bold rounded-full px-6 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm"
            >
              <option>March 2026</option>
              <option>February 2026</option>
              <option>January 2026</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border/50">
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Date</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Status</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {mockAttendance.map((record, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={record.date} 
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
                >
                  <td className="p-4 font-bold text-foreground group-hover:text-primary transition-colors">
                    {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg font-bold text-sm shadow-sm border capitalize ${
                      record.status === 'present' ? 'bg-success/10 text-success border-success/20' :
                      record.status === 'absent' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-muted-foreground">
                    {record.status === 'absent' ? 'Medical Leave' : record.status === 'late' ? 'Traffic delay' : '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
