import React, { useState } from 'react';
import { Search, Users, Eye, Plus, Edit, Trash2, X, GraduationCap } from 'lucide-react';
import { mockUsers } from '../db';
import { motion, AnimatePresence } from 'motion/react';

export function AdminStudents() {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [students, setStudents] = useState(mockUsers.filter(u => u.role === 'student'));
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: '10',
    section: 'A',
    rollNo: ''
  });
  
  const classes = [...new Set(students.map(s => `${s.class}-${s.section}`))].sort();
  
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === 'all' || `${s.class}-${s.section}` === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ name: '', email: '', class: '10', section: 'A', rollNo: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      class: student.class || '10',
      section: student.section || 'A',
      rollNo: student.rollNo || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { ...s, ...formData } 
          : s
      ));
    } else {
      const newStudent = {
        id: `s${Date.now()}`,
        role: 'student' as const,
        ...formData
      };
      setStudents([newStudent, ...students]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 sm:p-8 rounded-[2.5rem] border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground m-0">Students Directory</h1>
          </div>
          <p className="text-muted-foreground font-medium ml-14">Manage student records and academic profiles.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="relative z-10 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/30 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 sm:p-6 rounded-[2rem] border border-border shadow-sm">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-blue-600 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-secondary/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <button
            onClick={() => setSelectedClass('all')}
            className={`px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              selectedClass === 'all' 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50'
            }`}
          >
            All Classes
          </button>
          {classes.map(c => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={`px-5 py-3.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                selectedClass === c 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50'
              }`}
            >
              Class {c}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      {filteredStudents.length > 0 ? (
        <div className="bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/20">
                  <th className="py-5 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="py-5 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Class</th>
                  <th className="py-5 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Roll No</th>
                  <th className="py-5 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Email</th>
                  <th className="py-5 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Phone</th>
                  <th className="py-5 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredStudents.map((student, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    key={student.id} 
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                            {student.name.charAt(0)}
                          </div>
                        </div>
                        <span className="font-bold text-foreground group-hover:text-blue-600 transition-colors">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <span className="px-3 py-1.5 bg-secondary/50 text-secondary-foreground text-xs font-bold rounded-xl border border-border/50">
                        {student.class}-{student.section}
                      </span>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell text-sm font-medium text-muted-foreground">{student.rollNo}</td>
                    <td className="py-4 px-6 hidden lg:table-cell text-sm font-medium text-muted-foreground">{student.email}</td>
                    <td className="py-4 px-6 hidden lg:table-cell text-sm font-medium text-muted-foreground">+91 98765 11111</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(student)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-blue-600 hover:bg-blue-500/10 transition-colors"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-[2.5rem] border border-border shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6 shadow-inner">
            <Users className="w-10 h-10 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-xl font-display font-bold text-foreground mb-2">No students found</h3>
          <p className="text-muted-foreground font-medium max-w-md">Try adjusting your search or class filter to find what you're looking for.</p>
        </div>
      )}

      {/* Add/Edit Student Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-md rounded-[2.5rem] shadow-2xl border border-border overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 pointer-events-none"></div>
              
              <div className="p-6 sm:p-8 border-b border-border/50 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600">
                    {editingStudent ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                  <h2 className="text-xl font-display font-bold">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                    placeholder="e.g. john@school.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Class</label>
                    <input 
                      type="text" 
                      required
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value})}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Section</label>
                    <input 
                      type="text" 
                      required
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                      placeholder="e.g. A"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Roll Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                    placeholder="e.g. 101"
                  />
                </div>
                <div className="pt-6 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 bg-secondary/50 text-foreground rounded-2xl text-sm font-bold hover:bg-secondary transition-colors border border-border/50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {editingStudent ? 'Save Changes' : 'Add Student'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
