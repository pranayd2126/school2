import React, { useState } from 'react';
import { FileText, Download, Users, GraduationCap, TrendingUp, CreditCard, Filter, ArrowRight, BarChart3, PieChart } from 'lucide-react';
import { adminStats } from '../db';
import { motion } from 'motion/react';

const getReports = (className: string) => {
  return [
    { id: 1, title: `${className} Performance Report`, type: 'Academic', desc: `Comprehensive academic performance for ${className}.`, date: '2026-03-01' },
    { id: 2, title: `${className} Attendance Summary`, type: 'Attendance', desc: `Monthly attendance statistics for ${className}.`, date: '2026-03-01' },
    { id: 4, title: `${className} Exam Results`, type: 'Academic', desc: `Recent test results analysis for ${className}.`, date: '2026-02-10' },
  ];
};

export function AdminReports() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const classes = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
  const currentReports = getReports(selectedClass);

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
              <BarChart3 className="h-4 w-4 text-teal-300" />
              <span className="text-teal-50">Data & Analytics</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Reports & Analytics
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100/80 max-w-xl text-lg"
            >
              Generate, view, and download comprehensive class-specific reports.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/10"
          >
            <div className="bg-white/20 p-3 rounded-xl">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-white border-none focus:ring-0 text-lg font-medium pr-8 cursor-pointer appearance-none outline-none"
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              {classes.map(c => (
                <option key={c} value={c} className="text-gray-900">{c}</option>
              ))}
            </select>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Students</h3>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-indigo-600 shadow-inner border border-indigo-100/50">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-4xl font-display font-bold text-gray-900">{adminStats.totalStudents}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-indigo-500" />
              Across all classes
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }} 
          className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Teachers</h3>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100/50">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>
            <p className="text-4xl font-display font-bold text-gray-900">{adminStats.totalTeachers}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-emerald-500" />
              Active faculty
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Avg. Attendance</h3>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 shadow-inner border border-blue-100/50">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-4xl font-display font-bold text-gray-900">{adminStats.attendanceRate}%</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              School-wide average
            </p>
          </div>
        </motion.div>
      </div>

      {/* Reports List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
              <PieChart className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900">Available Reports</h3>
              <p className="text-sm text-gray-500">Downloadable reports for {selectedClass}</p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {currentReports.map((report, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.05) }}
              key={report.id} 
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner border border-indigo-100/50 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{report.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      report.type === 'Academic' ? 'bg-indigo-50 text-indigo-700 border-indigo-200/50' :
                      report.type === 'Attendance' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' :
                      report.type === 'Financial' ? 'bg-amber-50 text-amber-700 border-amber-200/50' :
                      report.type === 'HR' ? 'bg-blue-50 text-blue-700 border-blue-200/50' :
                      'bg-gray-50 text-gray-700 border-gray-200/50'
                    }`}>
                      {report.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.desc}</p>
                  <p className="text-xs font-medium text-gray-400">Generated: {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 shrink-0">
                <Download className="w-4 h-4 text-indigo-500" />
                Download PDF
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
