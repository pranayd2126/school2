import React, { useState } from 'react';
import { mockUsers, mockScores, User } from '../db';
import { Search, X, Bell, ClipboardCheck, Award, BookOpen, Edit, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function TeacherMyClass() {
  const navigate = useNavigate();
  // Mock teacher's assigned classes
  const teacherClasses = [
    { id: '10-A', label: 'Class 10-A (Class Teacher)', role: 'class_teacher', class: '10', section: 'A' },
    { id: '9-B', label: 'Class 9-B (Mathematics)', role: 'subject_teacher', class: '9', section: 'B' },
    { id: '6-A', label: 'Class 6-A (Mathematics)', role: 'subject_teacher', class: '6', section: 'A' }
  ];

  const [selectedClassId, setSelectedClassId] = useState(teacherClasses[0].id);
  const activeClass = teacherClasses.find(c => c.id === selectedClassId)!;
  const teacherSubject = 'Mathematics'; // Mocked subject for the teacher

  const [students, setStudents] = useState<User[]>(
    mockUsers.filter(u => u.role === 'student' && u.class === activeClass.class && u.section === activeClass.section)
  );
  
  // Update students when class changes
  React.useEffect(() => {
    setStudents(mockUsers.filter(u => u.role === 'student' && u.class === activeClass.class && u.section === activeClass.section));
  }, [activeClass.class, activeClass.section]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<'none' | 'event' | 'attendance' | 'addStudent' | 'editStudent' | 'deleteStudent'>('none');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', rollNo: '' });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => {
    setActiveModal('none');
    setSelectedStudent(null);
    setFormData({ name: '', email: '', rollNo: '' });
  };

  const handleGenericSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Action saved successfully!');
    closeModal();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: User = {
      id: `STU${Math.floor(Math.random() * 10000)}`,
      name: formData.name,
      email: formData.email,
      role: 'student',
      class: activeClass.class,
      section: activeClass.section,
      rollNo: formData.rollNo,
    };
    setStudents([...students, newStudent]);
    closeModal();
  };

  const handleEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, ...formData } : s));
    closeModal();
  };

  const handleDeleteStudent = () => {
    if (!selectedStudent) return;
    setStudents(students.filter(s => s.id !== selectedStudent.id));
    closeModal();
  };

  const openEditModal = (student: User) => {
    setSelectedStudent(student);
    setFormData({ name: student.name, email: student.email, rollNo: student.rollNo || '' });
    setActiveModal('editStudent');
  };

  const openDeleteModal = (student: User) => {
    setSelectedStudent(student);
    setActiveModal('deleteStudent');
  };

  const toggleExpand = (studentId: string) => {
    setExpandedStudentId(expandedStudentId === studentId ? null : studentId);
  };

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1>Class Management</h1>
          <p>Manage your assigned classes and update results.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Select Class</label>
            <select 
              className="input-field bg-card font-medium min-w-[250px]"
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setSearchQuery('');
                setExpandedStudentId(null);
              }}
            >
              {teacherClasses.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          {activeClass.role === 'class_teacher' && (
            <button onClick={() => setActiveModal('addStudent')} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4" /> Add Student
            </button>
          )}
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeClass.role === 'class_teacher' ? (
          <>
            <motion.button 
              whileHover={{ y: -2 }}
              onClick={() => setActiveModal('event')}
              className="card-elevated p-4 flex items-center gap-4 text-left hover:border-warning/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center text-warning shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Post Event/Alert</h3>
                <p className="text-xs text-muted-foreground">Notify class {activeClass.id}</p>
              </div>
            </motion.button>

            <motion.button 
              whileHover={{ y: -2 }}
              onClick={() => setActiveModal('attendance')}
              className="card-elevated p-4 flex items-center gap-4 text-left hover:border-success/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Log Attendance</h3>
                <p className="text-xs text-muted-foreground">Daily register for {activeClass.id}</p>
              </div>
            </motion.button>

            <motion.button 
              whileHover={{ y: -2 }}
              onClick={() => navigate('/teacher/my-class/results')}
              className="card-elevated p-4 flex items-center gap-4 text-left hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Results Dashboard</h3>
                <p className="text-xs text-muted-foreground">Manage all subject marks</p>
              </div>
            </motion.button>
          </>
        ) : (
          <motion.button 
            whileHover={{ y: -2 }}
            onClick={() => navigate('/teacher/my-class/results')}
            className="card-elevated p-4 flex items-center gap-4 text-left hover:border-info/50 transition-colors md:col-span-3 lg:col-span-1"
          >
            <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center text-info shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Update {teacherSubject} Marks</h3>
              <p className="text-xs text-muted-foreground">Manage marks for {activeClass.id}</p>
            </div>
          </motion.button>
        )}
      </div>

      <div className="card-elevated p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="section-title mb-0">Students ({students.length})</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 py-2 text-sm w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 w-10"></th>
                <th className="p-4 font-medium text-muted-foreground">Roll No</th>
                <th className="p-4 font-medium text-muted-foreground">Name</th>
                <th className="p-4 font-medium text-muted-foreground">Email</th>
                <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => (
                <React.Fragment key={student.id}>
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${expandedStudentId === student.id ? 'bg-secondary/10' : ''}`}
                  >
                    <td className="p-4">
                      <button onClick={() => toggleExpand(student.id)} className="p-1 hover:bg-secondary rounded-md text-muted-foreground">
                        {expandedStudentId === student.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4 font-medium">{student.rollNo || '-'}</td>
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        {student.name}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{student.email}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {activeClass.role === 'class_teacher' && (
                          <>
                            <button onClick={() => openEditModal(student)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit Student">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => openDeleteModal(student)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Remove Student">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => navigate('/teacher/my-class/results')}
                          className="btn-secondary py-1 px-3 text-xs flex items-center gap-1 ml-2"
                        >
                          <Award className="w-3 h-3" />
                          Results
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                  {expandedStudentId === student.id && (
                    <tr className="bg-secondary/5 border-b border-border/50">
                      <td colSpan={5} className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-bold text-sm flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Recent Results Summary
                          </h4>
                          <button onClick={() => navigate('/teacher/my-class/results')} className="text-primary text-xs hover:underline font-medium">
                            View Full Results &rarr;
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {['Mathematics', 'Science', 'English', 'History'].map((sub, idx) => {
                            const score = mockScores.find(s => s.subject === sub && s.term === 'Term 1');
                            return (
                              <div key={idx} className="bg-card border border-border rounded-xl p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground mb-1">{sub}</span>
                                <span className="text-lg font-bold font-mono">{score ? score.marks : '--'}/100</span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No students found in this class.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-lg rounded-2xl shadow-xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold">
                  {activeModal === 'event' && 'Post Event / Alert'}
                  {activeModal === 'attendance' && 'Log Daily Attendance'}
                  {activeModal === 'addStudent' && 'Add New Student'}
                  {activeModal === 'editStudent' && 'Edit Student Details'}
                  {activeModal === 'deleteStudent' && 'Remove Student'}
                </h2>
                <button type="button" onClick={closeModal} className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                {activeModal === 'deleteStudent' ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-destructive/10 text-destructive rounded-xl flex items-start gap-3">
                      <Trash2 className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold">Confirm Removal</h4>
                        <p className="text-sm mt-1">Are you sure you want to remove <strong>{selectedStudent?.name}</strong> from Class {activeClass.id}? This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form id="modal-form" onSubmit={
                    activeModal === 'addStudent' ? handleAddStudent : 
                    activeModal === 'editStudent' ? handleEditStudent : 
                    handleGenericSubmit
                  } className="space-y-4">
                    
                    {/* Event/Alert Form */}
                    {activeModal === 'event' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Type</label>
                          <select className="input-field" required>
                            <option value="alert">Alert (High Priority)</option>
                            <option value="event">Event</option>
                            <option value="notice">General Notice</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <input type="text" className="input-field" required placeholder="e.g., Tomorrow is a holiday" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Date</label>
                          <input type="date" className="input-field" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea className="input-field min-h-[100px]" required placeholder="Provide more details..."></textarea>
                        </div>
                      </>
                    )}

                    {/* Attendance Form */}
                    {activeModal === 'attendance' && (
                      <>
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">Date</label>
                          <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} required />
                        </div>
                        <div className="space-y-2">
                          {students.map(s => (
                            <div key={s.id} className="flex justify-between items-center p-3 border border-border rounded-xl bg-secondary/20">
                              <span className="font-medium text-sm">{s.rollNo} - {s.name}</span>
                              <select className="input-field py-1 text-sm w-32 bg-background">
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Add/Edit Student Form */}
                    {(activeModal === 'addStudent' || activeModal === 'editStudent') && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name</label>
                          <input 
                            type="text" 
                            className="input-field" 
                            required 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g., John Doe" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email Address</label>
                          <input 
                            type="email" 
                            className="input-field" 
                            required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="student@school.com" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Roll Number</label>
                          <input 
                            type="text" 
                            className="input-field" 
                            required 
                            value={formData.rollNo}
                            onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                            placeholder="e.g., 42" 
                          />
                        </div>
                      </>
                    )}
                  </form>
                )}
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 shrink-0 bg-secondary/10">
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
                {activeModal === 'deleteStudent' ? (
                  <button type="button" onClick={handleDeleteStudent} className="btn-primary bg-destructive hover:bg-destructive/90 text-destructive-foreground border-transparent">
                    Remove Student
                  </button>
                ) : (
                  <button type="submit" form="modal-form" className="btn-primary">
                    {activeModal === 'addStudent' ? 'Add Student' : 'Save Changes'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
