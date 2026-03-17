import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Settings, User, Bell, Shield, Save, Key, Smartphone, Mail, Briefcase } from 'lucide-react';

export function AdminSettings() {
  const { user } = useAuth();
  
  const [notifications, setNotifications] = useState({
    emailAdmissions: true,
    smsFees: true,
    dailyAttendance: false,
    eventReminders: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
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
              <Settings className="h-4 w-4 text-teal-300" />
              <span className="text-teal-50">System Configuration</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight"
            >
              Settings
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-100/80 max-w-xl text-lg"
            >
              Manage your account preferences, notifications, and security settings.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile & Security */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-500">Update your personal details and contact info.</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      defaultValue={user?.name} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      defaultValue={user?.email} 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      defaultValue="+91 98765 43210" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      Role
                    </label>
                    <input 
                      type="text" 
                      disabled 
                      defaultValue={user?.role.replace('_', ' ')} 
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 capitalize cursor-not-allowed" 
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="button" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-[0.98]">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900">Security</h3>
                  <p className="text-sm text-gray-500">Manage your password and account security.</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Key className="w-4 h-4 text-gray-400" />
                    Current Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Key className="w-4 h-4 text-gray-400" />
                    New Password
                  </label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900" 
                  />
                </div>
                <div className="pt-4">
                  <button type="button" className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Notifications */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="rounded-[2rem] bg-white border border-gray-100 shadow-sm overflow-hidden sticky top-6"
          >
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Bell className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500">Choose what you want to be notified about.</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {[
                { id: 'emailAdmissions', label: 'New Admissions', desc: 'Email when a student registers.' },
                { id: 'smsFees', label: 'Fee Defaults', desc: 'SMS alerts for overdue payments.' },
                { id: 'dailyAttendance', label: 'Daily Attendance', desc: 'Summary report of attendance.' },
                { id: 'eventReminders', label: 'Event Reminders', desc: 'Alerts 24h before events.' },
              ].map((item, index) => (
                <div key={item.id} className={`flex items-start justify-between gap-4 ${index !== 0 ? 'pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleNotification(item.id as keyof typeof notifications)}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      notifications[item.id as keyof typeof notifications] ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span 
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notifications[item.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
