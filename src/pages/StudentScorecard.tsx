import React, { useState } from 'react';
import { mockScores } from '../db';
import { Award, TrendingUp, Download, BookOpen, FileText, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function StudentScorecard() {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const terms = ['Term 1', 'Term 2', 'Term 3'];
  
  const currentScores = mockScores.filter(s => s.term === selectedTerm);
  
  const totalMarks = currentScores.reduce((acc, curr) => acc + curr.marks, 0);
  const maxMarks = currentScores.reduce((acc, curr) => acc + curr.total, 0);
  const percentage = maxMarks > 0 ? Math.round((totalMarks / maxMarks) * 100) : 0;
  
  const getGrade = (pct: number) => {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B';
    if (pct >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="page-header mb-0">
          <h1>Scorecard</h1>
          <p>Your academic performance across subjects.</p>
        </div>
        <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-foreground border border-border backdrop-blur-md transition-all duration-300 flex items-center gap-2 font-bold shadow-sm hover:shadow-md">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Term Selector - Premium Pill Design */}
      <div className="flex gap-3 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
        {terms.map(term => (
          <button
            key={term}
            onClick={() => setSelectedTerm(term)}
            className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${
              selectedTerm === term 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-blue-500/25 scale-105' 
                : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border'
            }`}
          >
            {term}
          </button>
        ))}
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 flex flex-col items-center justify-center text-center p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 relative z-10 shadow-inner">
            <TrendingUp className="w-10 h-10" />
          </div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 relative z-10">Overall Percentage</p>
          <p className="text-5xl font-display font-bold text-primary relative z-10">{percentage}%</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/20 flex flex-col items-center justify-center text-center p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="w-20 h-20 rounded-2xl bg-success/20 flex items-center justify-center text-success mb-6 relative z-10 shadow-inner">
            <Award className="w-10 h-10" />
          </div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 relative z-10">Overall Grade</p>
          <p className="text-5xl font-display font-bold text-success relative z-10">{getGrade(percentage)}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-info/10 via-info/5 to-transparent border-info/20 flex flex-col items-center justify-center text-center p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-info/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="w-20 h-20 rounded-2xl bg-info/20 flex items-center justify-center text-info mb-6 relative z-10 shadow-inner">
            <Star className="w-10 h-10" />
          </div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 relative z-10">Total Marks</p>
          <p className="text-5xl font-display font-bold text-info relative z-10">{totalMarks} <span className="text-2xl text-info/50">/ {maxMarks}</span></p>
        </motion.div>
      </div>

      {/* Detailed Scores Table */}
      <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground m-0">Subject-wise Breakdown</h3>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-bold border border-border shadow-sm">{selectedTerm}</span>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border/50">
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Subject</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Exam Type</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs text-right">Marks Obtained</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs text-right">Total Marks</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {currentScores.map((score, i) => {
                const pct = (score.marks / score.total) * 100;
                return (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={score.subject} 
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="p-4 font-bold text-foreground group-hover:text-primary transition-colors">{score.subject}</td>
                    <td className="p-4 text-sm font-medium text-muted-foreground capitalize">{score.exam}</td>
                    <td className="p-4 text-right font-display font-bold text-lg text-foreground">{score.marks}</td>
                    <td className="p-4 text-right font-medium text-muted-foreground">{score.total}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-lg font-bold text-sm shadow-sm border ${
                        pct >= 90 ? 'bg-success/10 text-success border-success/20' :
                        pct >= 75 ? 'bg-info/10 text-info border-info/20' :
                        pct >= 60 ? 'bg-warning/10 text-warning border-warning/20' :
                        'bg-destructive/10 text-destructive border-destructive/20'
                      }`}>
                        {getGrade(pct)}
                      </span>
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
