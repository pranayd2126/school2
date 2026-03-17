import React, { useState } from 'react';
import { mockAssignments } from '../db';
import { FileText, Clock, CheckCircle, AlertCircle, Eye, MessageSquare, Star, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StudentAssignments() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [feedbackModal, setFeedbackModal] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  
  const filteredAssignments = mockAssignments.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'submitted': return 'bg-info/10 text-info border-info/20';
      case 'graded': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'submitted': return <CheckCircle className="w-5 h-5" />;
      case 'graded': return <Star className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const handleSubmitFeedback = () => {
    // In a real app, this would send data to the backend
    console.log('Feedback submitted:', { assignmentId: feedbackModal.id, rating, feedbackText });
    setFeedbackModal(null);
    setRating(0);
    setFeedbackText('');
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="page-header">
        <h1>Assignments</h1>
        <p>View your class assignments and provide feedback.</p>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide">
        <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm uppercase tracking-wider shrink-0">
          <Filter className="w-4 h-4" />
          Filter:
        </div>
        <div className="flex gap-3">
          {['all', 'pending', 'submitted', 'graded'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all duration-300 shadow-sm ${
                filter === f 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-blue-500/25 scale-105' 
                  : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAssignments.map((assignment, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={assignment.id} 
              className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
            >
              {/* Decorative Background Element */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110 opacity-50 ${getStatusColor(assignment.status).split(' ')[0]}`}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${getStatusColor(assignment.status)}`}>
                  {getStatusIcon(assignment.status)}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm border ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>
              
              <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors relative z-10">{assignment.title}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-6 relative z-10">{assignment.subject} • {assignment.teacherName}</p>
              
              <div className="mt-auto space-y-6 relative z-10">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                  <div className="p-2 bg-background rounded-xl shadow-sm">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Due Date</p>
                    <p className="font-bold text-foreground">{new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                
                {assignment.status === 'graded' && (
                  <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-2xl border border-success/20 flex justify-between items-center shadow-inner">
                    <span className="text-sm font-bold text-success uppercase tracking-wider">Grade Received</span>
                    <span className="text-2xl font-display font-bold text-success">A</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button className="px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-bold text-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button 
                    onClick={() => setFeedbackModal(assignment)}
                    className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold text-sm shadow-sm shadow-primary/25 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Feedback
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredAssignments.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-card rounded-[2rem] border border-border border-dashed"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">No Assignments Found</h3>
            <p className="text-muted-foreground max-w-md">There are no assignments matching the selected filter. Try changing the filter to see more results.</p>
          </motion.div>
        )}
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {feedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card w-full max-w-md rounded-[2rem] shadow-2xl border border-border overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
              
              <div className="p-6 sm:p-8 border-b border-border flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">Provide Feedback</h2>
                <button 
                  onClick={() => setFeedbackModal(null)}
                  className="p-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 space-y-8">
                <div className="p-4 bg-secondary/50 rounded-2xl border border-border/50">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Assignment</p>
                  <p className="font-bold text-lg">{feedbackModal.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-4 uppercase tracking-wider text-muted-foreground">Rate this assignment</label>
                  <div className="flex gap-2 justify-center p-6 bg-secondary/30 rounded-2xl border border-border/50">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-2 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star 
                          className={`w-10 h-10 transition-colors duration-300 ${
                            star <= (hoveredRating || rating) 
                              ? 'fill-warning text-warning drop-shadow-md' 
                              : 'text-muted-foreground/30'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">Additional Comments</label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="What did you think about this assignment? Was it too hard, too easy, or just right?"
                    className="w-full bg-background border border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] resize-y shadow-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setFeedbackModal(null)}
                    className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitFeedback}
                    disabled={rating === 0}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-bold shadow-md shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Feedback
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
