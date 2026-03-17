import React, { useState } from 'react';
import { mockUsers, mockScores, User } from '../db';
import { Search, ChevronRight, Save, ArrowLeft, Award, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function TeacherClassResults() {
  const navigate = useNavigate();
  const teacherClasses = [
    { id: '10-A', label: 'Class 10-A (Class Teacher)', role: 'class_teacher', class: '10', section: 'A' },
    { id: '9-B', label: 'Class 9-B (Mathematics)', role: 'subject_teacher', class: '9', section: 'B' },
    { id: '6-A', label: 'Class 6-A (Mathematics)', role: 'subject_teacher', class: '6', section: 'A' }
  ];

  const [selectedClassId, setSelectedClassId] = useState(teacherClasses[0].id);
  const activeClass = teacherClasses.find(c => c.id === selectedClassId)!;
  const teacherSubject = 'Mathematics';

  const students = mockUsers.filter(u => u.role === 'student' && u.class === activeClass.class && u.section === activeClass.section);
  
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(students[0]?.id || null);
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // Mock subjects based on role
  const subjects = activeClass.role === 'class_teacher' 
    ? ['Mathematics', 'Science', 'English', 'History', 'Hindi', 'Computer Science']
    : [teacherSubject];

  const handleSave = () => {
    alert('Results saved successfully!');
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="page-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <button onClick={() => navigate('/teacher/my-class')} className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-2 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to My Class
          </button>
          <h1>Results Management</h1>
          <p>Update and review student performance.</p>
        </div>
        <div className="w-full sm:w-auto">
          <select 
            className="input-field bg-card font-medium min-w-[250px]"
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              const newStudents = mockUsers.filter(u => u.role === 'student' && u.class === teacherClasses.find(c => c.id === e.target.value)?.class);
              setSelectedStudentId(newStudents[0]?.id || null);
            }}
          >
            {teacherClasses.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Left Sidebar: Student List */}
        <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 py-2 text-sm w-full"
            />
          </div>
          
          <div className="card-elevated flex-1 overflow-y-auto p-2 space-y-1">
            {filteredStudents.map(student => (
              <button
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                  selectedStudentId === student.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    selectedStudentId === student.id ? 'bg-white/20' : 'bg-primary/10 text-primary'
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{student.name}</div>
                    <div className={`text-xs ${selectedStudentId === student.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      Roll No: {student.rollNo || '-'}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${selectedStudentId === student.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
            {filteredStudents.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No students found.
              </div>
            )}
          </div>
        </div>

        {/* Right Content: Grading Interface */}
        <div className="flex-1 card-elevated flex flex-col min-h-0 overflow-hidden">
          {selectedStudent ? (
            <>
              <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                    <p className="text-sm text-muted-foreground">Roll No: {selectedStudent.rollNo || '-'} | Class {activeClass.class}-{activeClass.section}</p>
                  </div>
                </div>
                
                <div className="flex bg-secondary p-1 rounded-lg">
                  {['Term 1', 'Term 2', 'Term 3'].map(term => (
                    <button
                      key={term}
                      onClick={() => setSelectedTerm(term)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        selectedTerm === term ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {activeClass.role === 'class_teacher' ? <Award className="w-5 h-5 text-primary" /> : <BookOpen className="w-5 h-5 text-info" />}
                      {selectedTerm} Marks Entry
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {activeClass.role === 'class_teacher' ? 'All Subjects' : teacherSubject + ' Only'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {subjects.map(subject => {
                      const existingScore = mockScores.find(s => s.subject === subject && s.term === selectedTerm);
                      return (
                        <div key={subject} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors gap-4">
                          <div className="font-medium">{subject}</div>
                          <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              min="0" 
                              max="100" 
                              defaultValue={existingScore ? existingScore.marks : ''}
                              placeholder="0"
                              className="input-field w-24 text-center font-mono text-lg"
                            />
                            <span className="text-muted-foreground font-medium">/ 100</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-secondary/10 shrink-0 flex justify-end">
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Results
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a student to view and update results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
