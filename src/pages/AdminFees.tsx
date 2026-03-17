import React, { useState } from 'react';
import { CreditCard, TrendingUp, AlertCircle, CheckCircle2, Clock, Filter, IndianRupee, CalendarDays, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const getTermFees = (className: string) => {
  const classNum = parseInt(className.replace('Class ', '')) || 1;
  const baseAmount = 10000 + (classNum * 2000);
  return [
    { term: 'Term 1 (Apr - Jul)', amount: baseAmount, dueDate: '2026-04-15', status: 'active' },
    { term: 'Term 2 (Aug - Nov)', amount: baseAmount, dueDate: '2026-08-15', status: 'upcoming' },
    { term: 'Term 3 (Dec - Mar)', amount: baseAmount, dueDate: '2026-12-15', status: 'upcoming' },
  ];
};

export function AdminFees() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const classes = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
  
  const currentFees = getTermFees(selectedClass);
  const totalYearlyFee = currentFees.reduce((sum, term) => sum + term.amount, 0);

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
              <CreditCard className="h-4 w-4 text-teal-300" />
              <span className="text-teal-50">Financial Overview</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Fee Structure
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100/80 max-w-xl text-lg"
            >
              Manage and view term-wise fee details across all classes.
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
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Yearly Fee</h3>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-teal-600 shadow-inner border border-teal-100/50">
                <IndianRupee className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-display font-bold text-gray-900">₹{totalYearlyFee.toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-teal-500" />
              For {selectedClass}
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }} 
          className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Terms per Year</h3>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 shadow-inner border border-blue-100/50">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <p className="text-4xl font-display font-bold text-gray-900">{currentFees.length}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              Trimester system
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Next Due Date</h3>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-amber-600 shadow-inner border border-amber-100/50">
                <CalendarDays className="w-6 h-6" />
              </div>
            </div>
            <p className="text-4xl font-display font-bold text-gray-900">
              {new Date(currentFees[0].dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-amber-500" />
              Term 1 Deadline
            </p>
          </div>
        </motion.div>
      </div>

      {/* Term Breakdown Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900">Term-wise Breakdown</h3>
              <p className="text-sm text-gray-500">Detailed fee schedule for {selectedClass}</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="py-5 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term Details</th>
                <th className="py-5 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                <th className="py-5 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="py-5 px-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentFees.map((fee, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.05) }}
                  key={i} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${fee.status === 'active' ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
                      <span className="font-medium text-gray-900">{fee.term}</span>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className="font-mono font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                      ₹{fee.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      {new Date(fee.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                      fee.status === 'active' 
                        ? 'bg-teal-50 text-teal-700 border-teal-200/50' 
                        : 'bg-gray-50 text-gray-600 border-gray-200/50'
                    }`}>
                      {fee.status === 'active' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active Collection
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          Upcoming
                        </>
                      )}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
