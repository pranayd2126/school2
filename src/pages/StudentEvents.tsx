import React, { useState } from 'react';
import { mockEvents } from '../db';
import { Calendar, MapPin, Clock, Users, Filter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StudentEvents() {
  const [filter, setFilter] = useState<'all' | 'academic' | 'sports' | 'cultural' | 'holiday'>('all');

  const filteredEvents = mockEvents.filter(e => {
    if (filter === 'all') return true;
    return e.type === filter;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'academic': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'sports': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'cultural': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'holiday': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  const getTypeGradient = (type: string) => {
    switch(type) {
      case 'academic': return 'from-blue-500 to-cyan-500';
      case 'sports': return 'from-emerald-400 to-teal-500';
      case 'cultural': return 'from-purple-500 to-indigo-500';
      case 'holiday': return 'from-rose-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                <Calendar className="w-6 h-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">School Events</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Stay updated with upcoming activities, holidays, and important academic dates.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-[2rem] border border-border shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
          {['all', 'academic', 'sports', 'cultural', 'holiday'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all duration-300 ${
                filter === f 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-blue-500/25 scale-105' 
                  : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:scale-105'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-secondary/50 text-secondary-foreground hover:bg-secondary font-bold text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 shrink-0">
          <Filter className="w-4 h-4" />
          Filter by Month
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              key={event.id} 
              className="group relative bg-card rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Gradient Top Bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${getTypeGradient(event.type)}`}></div>
              
              <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <div className="text-right bg-secondary/30 rounded-2xl p-3 border border-border/50 group-hover:bg-secondary/50 transition-colors">
                    <p className="text-3xl font-display font-bold text-foreground leading-none mb-1">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </p>
                  </div>
                </div>
                
                <h3 className="font-display font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-8 line-clamp-2 leading-relaxed">{event.description}</p>
                
                <div className="mt-auto space-y-4 bg-secondary/20 p-4 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    {event.time || 'All Day'}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    School Campus
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    School Administration
                  </div>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-[2.5rem] border border-border shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent pointer-events-none"></div>
          <div className="w-24 h-24 rounded-[2rem] bg-secondary/80 flex items-center justify-center mb-6 shadow-inner relative z-10 border border-border/50">
            <Calendar className="w-10 h-10 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-3 relative z-10">No Events Found</h3>
          <p className="text-muted-foreground font-medium max-w-md relative z-10">
            There are no events matching the selected filter. Try selecting a different category.
          </p>
        </motion.div>
      )}
    </div>
  );
}
