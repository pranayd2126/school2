import React, { useState } from 'react';
import { Search, Users, Eye, X, Mail, Phone, TrendingUp } from 'lucide-react';
import { mockUsers, mockScores, mockAttendance } from '../db';
import { motion, AnimatePresence } from 'motion/react';

export function TeacherStudents() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
  const students = mockUsers.filter(u => u.role === 'student');
  const classes = [...new Set(students.map(s => `${s.class}-${s.section}`))].sort();
  
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === 'all' || `${s.class}-${s.section}` === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Mock computed stats for prototype
  const attendancePct = 85;
  const avgScore = 88;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1>My Students</h1>
        <p>View and manage your students' academic profiles.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Classes</p>
          <p className="text-2xl font-bold">{classes.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Avg Attendance</p>
          <p className="text-2xl font-bold text-success">{attendancePct}%</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Avg Score</p>
          <p className="text-2xl font-bold text-primary">{avgScore}%</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedClass('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedClass === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            All
          </button>
          {classes.map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedClass === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 card-elevated overflow-x-auto">
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead>
              <tr>
                <th className="table-head">Student</th>
                <th className="table-head">Class</th>
                <th className="table-head hidden sm:table-cell">Roll No</th>
                <th className="table-head hidden md:table-cell">Contact</th>
                <th className="table-head text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  key={student.id} 
                  className={`transition-colors ${selectedStudent?.id === student.id ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-info/10 text-info flex items-center justify-center font-bold text-xs shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="badge-pill bg-secondary text-secondary-foreground border border-border">
                      {student.class}-{student.section}
                    </span>
                  </td>
                  <td className="table-cell hidden sm:table-cell text-muted-foreground">{student.rollNo}</td>
                  <td className="table-cell hidden md:table-cell text-muted-foreground text-xs">{student.email}</td>
                  <td className="table-cell text-right">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {selectedStudent && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="w-full lg:w-80 shrink-0"
            >
              <div className="card-elevated p-6 sticky top-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{selectedStudent.name}</h3>
                      <p className="text-sm text-muted-foreground">Class {selectedStudent.class}-{selectedStudent.section} • Roll {selectedStudent.rollNo}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-secondary/50 p-3 rounded-xl text-center">
                    <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                    <p className="font-bold text-success">{attendancePct}%</p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-xl text-center">
                    <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
                    <p className="font-bold text-primary">{avgScore}%</p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-xl text-center">
                    <p className="text-xs text-muted-foreground mb-1">Grade</p>
                    <p className="font-bold text-info">A</p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-xl text-center">
                    <p className="text-xs text-muted-foreground mb-1">Pending</p>
                    <p className="font-bold text-warning">2</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>+91 98765 11111</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Message Student
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
