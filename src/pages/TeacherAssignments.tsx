import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, Clock, CheckSquare } from 'lucide-react';
import { mockAssignments } from '../db';
import { motion } from 'motion/react';

export function TeacherAssignments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  
  const filteredAssignments = filter === 'all' 
    ? mockAssignments 
    : mockAssignments.filter(a => a.status === filter);

  const total = mockAssignments.length;
  const pending = mockAssignments.filter(a => a.status === 'pending').length;
  const submitted = mockAssignments.filter(a => a.status === 'submitted').length;
  const graded = mockAssignments.filter(a => a.status === 'graded').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Assignments</h1>
          <p className="text-sm text-muted-foreground">Manage and grade student assignments.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Assignment
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-warning">{pending}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Submitted</p>
          <p className="text-2xl font-bold text-info">{submitted}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Graded</p>
          <p className="text-2xl font-bold text-success">{graded}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 bg-card p-4 rounded-2xl border border-border shadow-sm">
        {['all', 'pending', 'submitted', 'graded'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors capitalize ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={assignment.id} 
            className="card-elevated p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`badge-pill ${
                assignment.status === 'pending' ? 'bg-warning/10 text-warning' :
                assignment.status === 'submitted' ? 'bg-info/10 text-info' :
                'bg-success/10 text-success'
              }`}>
                {assignment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                {assignment.status === 'submitted' && <CheckSquare className="w-3 h-3 mr-1" />}
                {assignment.status === 'graded' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                {assignment.status}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{assignment.description}</p>
            
            <div className="flex items-center justify-between mb-6 text-sm">
              <span className="font-medium text-foreground">{assignment.subject}</span>
              <span className="text-muted-foreground">Class {assignment.class}-{assignment.section}</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Submissions</span>
                <span className="font-medium">{assignment.submittedCount}/{assignment.totalStudents}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${((assignment.submittedCount || 0) / (assignment.totalStudents || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-auto pt-4 border-t border-border/50">
              <button className="flex-1 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
              {assignment.status === 'submitted' && (
                <button className="flex-1 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors">
                  Grade Now
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
