/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { UserRole } from '../types/university';
import { X, Lock, Mail, ShieldAlert, CheckCircle, Eye, EyeOff, Sparkles, UserPlus, LogIn, ArrowRight } from 'lucide-react';

export function LoginModal() {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    loginModalPreselectedRole, 
    setLoginModalPreselectedRole,
    allUsers,
    loginAs,
    registerUser,
    syncWithSupabase
  } = usePortal();

  // Mode state: 'signin' or 'signup'
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // Sign In inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up inputs
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserRole>('student');
  const [signUpPassword, setSignUpPassword] = useState('kmu123');

  // UI state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize preselected role without auto-filling credentials
  useEffect(() => {
    if (isLoginModalOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setIsShaking(false);
      setEmail('');
      setPassword('');
      setSignUpName('');
      setSignUpEmail('');
      setSignUpRole('student');
      setSignUpPassword('kmu123');
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  // Trigger shake animation helper
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 400); // match animation duration
  };

  const handleDemoFill = (role: UserRole) => {
    setEmail(`${role}@kmu.edu.in`);
    setPassword('kmu123');
    setErrorMsg(null);
    setActiveTab('signin');
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setErrorMsg('Please enter your university email address.');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    if (!cleanPassword) {
      setErrorMsg('Please enter your secure access password.');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    // Default simulation pass checks for simplicity
    if (cleanPassword !== 'kmu123') {
      setErrorMsg('Invalid password token. Code mismatch. (Tip: Use standard pass "kmu123" to unlock profiles)');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    // Match existing list
    const matched = allUsers.find(u => u.email.trim().toLowerCase() === cleanEmail);
    
    if (matched) {
      loginAs(matched.role, matched.email);
      setSuccessMsg(`Access granted. Welcome back, ${matched.name}!`);
      
      // Auto trigger sync with Supabase to make sure cloud session matches
      await syncWithSupabase();

      setTimeout(() => {
        setIsLoginModalOpen(false);
        setSuccessMsg(null);
        setIsSubmitting(false);
      }, 1000);
    } else {
      // Reject unknown emails strictly to maintain that registration is only done by admin
      setErrorMsg(`Credential registry not found. Only pre-registered student/faculty profiles can sign in. Contact the Office of the Registrar.`);
      triggerShake();
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    const cleanName = signUpName.trim();
    const cleanEmail = signUpEmail.trim().toLowerCase();
    const cleanPassword = signUpPassword.trim();

    if (!cleanName) {
      setErrorMsg('Please enter your full authentic name.');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    if (!cleanEmail) {
      setErrorMsg('Please specify an academic email.');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    if (!cleanEmail.endsWith('@kmu.edu.in') && !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid format email (e.g. name@kmu.edu.in).');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    if (!cleanPassword) {
      setErrorMsg('Please define a secure password.');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    // Verify if email is already taken
    const exists = allUsers.some(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      setErrorMsg('An account with this university email already exists! Try logging in.');
      triggerShake();
      setIsSubmitting(false);
      return;
    }

    try {
      // Register user into localized and synced backend storage
      const newlyRegistered = registerUser(cleanName, cleanEmail, signUpRole);
      
      // Auto login
      loginAs(signUpRole, newlyRegistered.email);
      setSuccessMsg(`Registration success! Synced profile for ${cleanName} on Cloud Database.`);
      
      // Explicitly push update to Supabase Storage instance
      await syncWithSupabase();

      setTimeout(() => {
        setIsLoginModalOpen(false);
        setSuccessMsg(null);
        setIsSubmitting(false);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred during cloud account registration.');
      triggerShake();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div 
        id="kmu-login-card"
        className={`${isShaking ? 'animate-shake' : ''} relative w-full max-w-md bg-[#051121] border border-[#C5A059]/40 rounded shadow-2xl overflow-hidden text-slate-200 transition-transform duration-200`}
      >
        {/* Elite university themed brand strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#C5A059] via-[#ecd599] to-[#C5A059]"></div>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-[#C5A059] hover:bg-slate-900 p-1.5 rounded transition-colors z-10"
          aria-label="Close authentication panel"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <span className="inline-flex items-center gap-1 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="h-3 w-3" /> Secure Credential Entry
            </span>
            <h3 className="text-xl font-serif font-black tracking-tight text-white mt-1">KMU Central Sign-In</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Access academic registry system, digital libraries, and centralized cloud portals.
            </p>
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            
            {/* Common Notification Displays */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-red-300 text-xs flex gap-2 items-start animate-fade-in shrink-0">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-300 text-xs flex gap-2 items-start animate-fade-in shrink-0">
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400 animate-pulse" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* --- SIGN IN MODE --- */}
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                  University Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@kmu.edu.in"
                    className="w-full bg-[#08172b] border border-slate-700 focus:border-[#C5A059] rounded px-3 py-2 pl-9 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider gallery-title">
                  Portal Security Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#08172b] border border-slate-700 focus:border-[#C5A059] rounded px-3 py-2 pl-9 pr-9 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit Action */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[#C5A059] hover:bg-[#b08c48] disabled:opacity-50 text-[#051121] py-2 px-4 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-black/30 border border-[#ecd599]/20 flex items-center justify-center gap-1.5"
              >
                Verify Credentials <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">AUTHENTICATION</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
