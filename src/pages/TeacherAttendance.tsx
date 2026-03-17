import React, { useState } from 'react';
import { Check, X, Clock, Save, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockUsers } from '../db';
import { motion } from 'motion/react';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'unmarked';

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [saved, setSaved] = useState(false);
  
  // Nested map: { classDate -> { studentId -> status } }
  const [attendance, setAttendance] = useState<Record<string, Record<string, AttendanceStatus>>>({});

  const students = mockUsers.filter(u => u.role === 'student');
  const classes = [...new Set(students.map(s => `${s.class}-${s.section}`))].sort();
  const currentStudents = students.filter(s => `${s.class}-${s.section}` === selectedClass);

  const key = `${selectedClass}-${date}`;
  const currentAttendance = attendance[key] || {};

  const getStudentStatus = (studentId: string): AttendanceStatus => {
    return currentAttendance[studentId] || 'unmarked';
  };

  const setStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [studentId]: status
      }
    }));
    setSaved(false);
  };

  const markAll = (status: AttendanceStatus) => {
    const newStatus: Record<string, AttendanceStatus> = {};
    currentStudents.forEach(s => {
      newStatus[s.id] = status;
    });
    setAttendance(prev => ({
      ...prev,
      [key]: newStatus
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    // In production, this would save to backend
  };

  const presentCount = Object.values(currentAttendance).filter(s => s === 'present').length;
  const absentCount = Object.values(currentAttendance).filter(s => s === 'absent').length;
  const lateCount = Object.values(currentAttendance).filter(s => s === 'late').length;
  const totalMarked = presentCount + absentCount + lateCount;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1>Mark Attendance</h1>
        <p>Record daily attendance for your classes.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 flex-1">
          {classes.map(c => (
            <button
              key={c}
              onClick={() => { setSelectedClass(c); setSaved(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedClass === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
            >
              Class {c}
            </button>
          ))}
        </div>
        <div className="shrink-0">
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setSaved(false); }}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {currentStudents.length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Present</p>
          <p className="text-2xl font-bold text-success flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {presentCount}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Absent</p>
          <p className="text-2xl font-bold text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {absentCount}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Late</p>
          <p className="text-2xl font-bold text-warning flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {lateCount}
          </p>
        </div>
      </div>

      <div className="card-elevated p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button 
              onClick={() => markAll('present')}
              className="px-4 py-2 bg-success/10 text-success hover:bg-success hover:text-success-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Mark All Present
            </button>
            <button 
              onClick={() => markAll('absent')}
              className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Mark All Absent
            </button>
          </div>
          <button 
            onClick={handleSave}
            disabled={totalMarked === 0}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              saved 
                ? 'bg-success text-success-foreground' 
                : totalMarked === 0 
                  ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Attendance'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left border-collapse">
            <thead>
              <tr>
                <th className="table-head w-16 text-center">Roll #</th>
                <th className="table-head">Student</th>
                <th className="table-head text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, i) => {
                const status = getStudentStatus(student.id);
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    key={student.id} 
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="table-cell text-center font-medium text-muted-foreground">{student.rollNo}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          status === 'present' ? 'bg-success text-success-foreground' :
                          status === 'absent' ? 'bg-destructive text-destructive-foreground' :
                          status === 'late' ? 'bg-warning text-warning-foreground' :
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-right">
                      <div className="inline-flex gap-2">
                        <button 
                          onClick={() => setStudentStatus(student.id, 'present')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            status === 'present' 
                              ? 'bg-success text-success-foreground scale-110 shadow-sm' 
                              : 'bg-success/10 text-success hover:bg-success/20'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">Present</span>
                        </button>
                        <button 
                          onClick={() => setStudentStatus(student.id, 'absent')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            status === 'absent' 
                              ? 'bg-destructive text-destructive-foreground scale-110 shadow-sm' 
                              : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                          }`}
                        >
                          <X className="w-4 h-4" />
                          <span className="hidden sm:inline">Absent</span>
                        </button>
                        <button 
                          onClick={() => setStudentStatus(student.id, 'late')}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            status === 'late' 
                              ? 'bg-warning text-warning-foreground scale-110 shadow-sm' 
                              : 'bg-warning/10 text-warning hover:bg-warning/20'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          <span className="hidden sm:inline">Late</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
