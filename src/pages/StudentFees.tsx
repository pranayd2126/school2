import React from 'react';
import { CreditCard, TrendingUp, Clock, Download, CheckCircle, AlertCircle, Receipt, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

const getTermFees = (className: string) => {
  const classNum = parseInt(className.replace('Class ', '')) || 1;
  const baseAmount = 10000 + (classNum * 2000);
  return [
    { term: 'Term 1 (Apr - Jul)', amount: baseAmount, dueDate: '2026-04-15', status: 'paid', invoiceId: 'INV-2026-001' },
    { term: 'Term 2 (Aug - Nov)', amount: baseAmount, dueDate: '2026-08-15', status: 'pending', invoiceId: 'INV-2026-002' },
    { term: 'Term 3 (Dec - Mar)', amount: baseAmount, dueDate: '2026-12-15', status: 'upcoming', invoiceId: 'INV-2026-003' },
  ];
};

export function StudentFees() {
  const studentClass = 'Class 10';
  const currentFees = getTermFees(studentClass);
  
  const totalYearlyFee = currentFees.reduce((sum, term) => sum + term.amount, 0);
  const paidFees = currentFees.filter(f => f.status === 'paid').reduce((sum, term) => sum + term.amount, 0);
  const pendingFees = currentFees.filter(f => f.status === 'pending' || f.status === 'upcoming').reduce((sum, term) => sum + term.amount, 0);

  return (
    <div className="space-y-8 pb-8">
      <div className="page-header">
        <h1>Fee Records</h1>
        <p>View your fee payment history and pending dues for {studentClass}.</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Yearly Fee</h3>
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <p className="text-5xl font-display font-bold text-primary relative z-10">₹{totalYearlyFee.toLocaleString()}</p>
          <p className="text-sm font-medium text-muted-foreground mt-2 relative z-10">For {studentClass}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/20 p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Paid</h3>
            <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center text-success shadow-inner">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-5xl font-display font-bold text-success relative z-10">₹{paidFees.toLocaleString()}</p>
          <p className="text-sm font-medium text-muted-foreground mt-2 relative z-10">Till Date</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card group relative overflow-hidden bg-gradient-to-br from-warning/10 via-warning/5 to-transparent border-warning/20 p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Pending Dues</h3>
            <div className="w-12 h-12 rounded-2xl bg-warning/20 flex items-center justify-center text-warning shadow-inner">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-5xl font-display font-bold text-warning relative z-10">₹{pendingFees.toLocaleString()}</p>
          <p className="text-sm font-medium text-muted-foreground mt-2 relative z-10">Upcoming & Overdue</p>
        </motion.div>
      </div>

      {/* Detailed Fees Table */}
      <div className="bg-card rounded-[2rem] p-6 sm:p-8 border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Receipt className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground m-0">Term-wise Breakdown</h3>
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border/50">
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Invoice ID</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Term Details</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">Due Date</th>
                <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {currentFees.map((fee, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={fee.invoiceId} 
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
                >
                  <td className="p-4 font-bold text-sm text-foreground group-hover:text-primary transition-colors">{fee.invoiceId}</td>
                  <td className="p-4 font-medium text-foreground">{fee.term}</td>
                  <td className="p-4 text-sm font-medium text-muted-foreground">
                    {new Date(fee.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4 text-right font-display font-bold text-lg text-foreground">
                    {fee.amount.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
