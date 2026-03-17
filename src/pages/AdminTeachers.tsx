import React, { useState } from 'react';
import { Search, GraduationCap, Mail, Phone, Plus, Trash2, Edit, X, Users, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { mockUsers } from '../db';
import { motion, AnimatePresence } from 'motion/react';

export function AdminTeachers() {
  const [search, setSearch] = useState('');
  const [teachers, setTeachers] = useState(mockUsers.filter(u => u.role === 'teacher'));
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  
  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: ''
  });
  
  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingTeacher(null);
    setFormData({ name: '', email: '', subject: '' });
    setIsFormModalOpen(true);
  };

  const handleEdit = (teacher: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject || ''
    });
    setIsFormModalOpen(true);
  };

  const removeTeacher = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(teachers.map(t => 
        t.id === editingTeacher.id 
          ? { ...t, ...formData } 
          : t
      ));
    } else {
      const newTeacher = {
        id: `t${Date.now()}`,
        role: 'teacher' as const,
        ...formData
      };
      setTeachers([newTeacher, ...teachers]);
    }
    setIsFormModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-cyan-600 p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md border border-white/10"
            >
              <Users className="h-4 w-4 text-teal-300" />
              <span className="text-teal-50">Faculty Management</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Teachers Directory
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100/80 max-w-xl text-lg"
            >
              Manage teaching staff, view profiles, and handle assignments.
            </motion.p>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Teacher
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-teal-500/10 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
        <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <div className="pl-4 pr-2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search teachers by name, subject, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pr-4 bg-transparent border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </motion.div>

      {/* Teachers Grid */}
      {filteredTeachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.05) }}
              key={teacher.id} 
              className="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-teal-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-10">
                <button 
                  onClick={(e) => handleEdit(teacher, e)}
                  className="p-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl shadow-sm border border-gray-100 transition-colors"
                  title="Edit Teacher"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => removeTeacher(teacher.id, e)}
                  className="p-2 bg-white text-rose-600 hover:bg-rose-50 rounded-xl shadow-sm border border-gray-100 transition-colors"
                  title="Remove Teacher"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6 pr-16">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 flex items-center justify-center font-bold text-xl shadow-inner border border-indigo-100/50">
                    {teacher.name.charAt(0)}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200/50">
                    {teacher.subject}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-xl text-gray-900 mb-4">{teacher.name}</h3>
                
                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg">
                    <div className="p-1.5 bg-white rounded-md shadow-sm">
                      <Mail className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50/50 p-2 rounded-lg">
                    <div className="p-1.5 bg-white rounded-md shadow-sm">
                      <Phone className="w-4 h-4 text-teal-500" />
                    </div>
                    <span>+91 98765 43210</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedTeacher(teacher)}
                    className="flex-1 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-sm font-semibold transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-colors">
                    Schedule
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
        >
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-display font-bold text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-500 max-w-sm">We couldn't find any teachers matching your search criteria. Try adjusting your filters.</p>
        </motion.div>
      )}

      {/* Add/Edit Teacher Modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    {editingTeacher ? <Edit className="w-5 h-5 text-indigo-600" /> : <Plus className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <h2 className="text-xl font-display font-bold text-gray-900">
                    {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                  </h2>
                </div>
                <button 
                  onClick={() => setIsFormModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                    placeholder="e.g. Jane Smith"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                    placeholder="e.g. jane@school.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    Subject
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900"
                    placeholder="e.g. Mathematics"
                  />
                </div>
                <div className="pt-6 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.98]"
                  >
                    {editingTeacher ? 'Save Changes' : 'Add Teacher'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Profile Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="relative h-32 bg-gradient-to-br from-indigo-600 to-teal-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 text-white hover:bg-black/30 rounded-full backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="px-8 pb-8">
                <div className="relative flex justify-between items-end -mt-12 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-lg">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 flex items-center justify-center font-bold text-4xl border border-indigo-100/50">
                      {selectedTeacher.name.charAt(0)}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200/50 mb-2">
                    {selectedTeacher.subject} Teacher
                  </span>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-gray-900">{selectedTeacher.name}</h2>
                  <p className="text-gray-500">Faculty Member</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Mail className="w-4 h-4" />
                      <p className="text-xs font-semibold uppercase tracking-wider">Email ID</p>
                    </div>
                    <p className="font-medium text-gray-900 truncate">{selectedTeacher.email}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Phone className="w-4 h-4" />
                      <p className="text-xs font-semibold uppercase tracking-wider">Phone</p>
                    </div>
                    <p className="font-medium text-gray-900">+91 98765 43210</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <p className="text-xs font-semibold uppercase tracking-wider">Joined</p>
                    </div>
                    <p className="font-medium text-gray-900">12 Aug 2023</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Users className="w-4 h-4" />
                      <p className="text-xs font-semibold uppercase tracking-wider">Classes</p>
                    </div>
                    <p className="font-medium text-gray-900">Class 8, 9, 10</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => setSelectedTeacher(null)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
// Adding User import to fix the error
import { User } from 'lucide-react';
