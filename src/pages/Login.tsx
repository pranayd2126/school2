import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      const storedUser = localStorage.getItem('sms_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'super_admin' || user.role === 'school_admin') navigate('/admin');
        else if (user.role === 'teacher') navigate('/teacher');
        else navigate('/student');
      }
    } else {
      setError('Invalid credentials. Try using one of the demo accounts.');
    }
  };

  const loadDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" 
          alt="University Campus" 
          className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 backdrop-blur-[2px]" />
      </div>

      {/* Login Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        {/* Glassmorphism Card */}
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white relative overflow-hidden">
          
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-inner relative group"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-white/30 transition-colors" />
              <GraduationCap className="w-8 h-8 text-white relative z-10" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Sample
            </h1>
            <p className="text-white/60 font-medium text-sm tracking-wide uppercase">
              Student Portal
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-red-500/10 text-red-200 text-sm flex items-start gap-3 border border-red-500/20 backdrop-blur-md"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="font-medium leading-relaxed">{error}</p>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 focus:bg-white/10 bg-white/5 text-white placeholder:text-white/20 transition-all font-medium"
                placeholder="name@school.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-xs font-semibold text-white/50 hover:text-white transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 focus:bg-white/10 bg-white/5 text-white placeholder:text-white/20 transition-all font-medium pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center text-white gap-2 py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] text-sm font-bold text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all active:scale-[0.98] mt-6 group"
            >
              Sign in to Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-[10px] text-white/40 font-bold mb-4 uppercase tracking-widest">
              Quick Access Demo
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => loadDemo('admin@school.com')} 
                className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all active:scale-95"
              >
                Admin
              </button>
              <button 
                onClick={() => loadDemo('arun@school.com')} 
                className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all active:scale-95"
              >
                Teacher
              </button>
              <button 
                onClick={() => loadDemo('arjun@school.com')} 
                className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all active:scale-95"
              >
                Student
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer text */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Sample School.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
