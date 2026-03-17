import React from 'react';
import { Calendar, Plus, Edit2, Trash2, CalendarDays, Clock, MapPin, Users, Tag } from 'lucide-react';
import { mockEvents } from '../db';
import { motion } from 'motion/react';

export function AdminEvents() {
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
              <CalendarDays className="h-4 w-4 text-teal-300" />
              <span className="text-teal-50">Calendar & Events</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Events Management
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100/80 max-w-xl text-lg"
            >
              Manage school events, holidays, examinations, and important dates.
            </motion.p>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </motion.button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event, i) => {
          const eventDate = new Date(event.date);
          const month = eventDate.toLocaleString('default', { month: 'short' });
          const day = eventDate.getDate();
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.05) }}
              key={event.id} 
              className="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-teal-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 shadow-inner">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider leading-none">{month}</span>
                    <span className="text-xl font-display font-bold text-blue-600 leading-none mt-1">{day}</span>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${
                    event.type === 'exam' ? 'bg-rose-50 text-rose-700 border-rose-200/50' :
                    event.type === 'holiday' ? 'bg-amber-50 text-amber-700 border-amber-200/50' :
                    event.type === 'cultural' ? 'bg-purple-50 text-purple-700 border-purple-200/50' :
                    event.type === 'sports' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' :
                    'bg-blue-50 text-blue-700 border-blue-200/50'
                  }`}>
                    <Tag className="w-3 h-3" />
                    {event.type}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3">{event.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50/50 p-2.5 rounded-xl">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm">
                      <Clock className="w-4 h-4 text-indigo-500" />
                    </div>
                    <span className="font-medium">{event.time !== '-' ? event.time : 'All Day Event'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Users className="w-4 h-4 text-gray-400" />
                    All Classes
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl shadow-sm border border-gray-100 transition-colors" title="Edit Event">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white text-rose-600 hover:bg-rose-50 rounded-xl shadow-sm border border-gray-100 transition-colors" title="Delete Event">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
