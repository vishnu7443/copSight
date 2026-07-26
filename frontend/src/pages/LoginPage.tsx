import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Eye, EyeOff, Sparkles, UserCheck, ShieldAlert, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, switchDemoRole } = useAuth();
  const [username, setUsername] = useState<string>('constable_kumar');
  const [password, setPassword] = useState<string>('Password123!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
    } catch (err: any) {
      setError('Invalid officer credentials. Please check badge or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-8 font-roboto">
      {/* Main Dual-Panel Floating Container */}
      <div className="w-full max-w-5xl rounded-[2.5rem] bg-white text-slate-900 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Form & Quick RBAC Sign In */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-extrabold shadow-md">
              <Shield className="w-5 h-5 fill-slate-950 text-amber-400" />
            </div>
            <span className="font-poppins font-extrabold text-lg text-slate-950 tracking-tight">
              KSP <span className="text-amber-500 font-black">.CopSight</span>
            </span>
          </div>

          {/* Welcome Header */}
          <div className="space-y-1.5">
            <h1 className="font-poppins font-extrabold text-3xl text-slate-950 tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Please enter your officer credentials or choose an RBAC profile below.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Officer Username / Badge ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username (e.g. inspector_patil)"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] font-semibold text-slate-500 hover:text-slate-900">
                  Forget password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-poppins font-bold text-sm shadow-xl shadow-slate-950/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign in'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold absolute">
              or select officer role
            </span>
          </div>

          {/* RBAC Quick Demo Profiles */}
          <div className="grid grid-cols-2 gap-2.5 text-xs font-roboto">
            <button
              type="button"
              onClick={() => switchDemoRole('CONSTABLE')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block font-bold text-xs">Constable Kumar</span>
                <span className="text-[10px] text-slate-500 font-mono">PC-4892</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                Constable
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchDemoRole('INSPECTOR')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block font-bold text-xs">Inspector Patil</span>
                <span className="text-[10px] text-slate-500 font-mono">PI-1042</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                Inspector
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchDemoRole('SUPERINTENDENT')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block font-bold text-xs">SP Ananya Gowda</span>
                <span className="text-[10px] text-slate-500 font-mono">IPS-088</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                SP / IPS
              </span>
            </button>

            <button
              type="button"
              onClick={() => switchDemoRole('ADMIN')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold text-left transition-all flex items-center justify-between group"
            >
              <div>
                <span className="block font-bold text-xs">System Admin</span>
                <span className="text-[10px] text-slate-500 font-mono">SYS-001</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                Admin
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: High-Tech Hexagon 3D Officer Showcase */}
        <div className="lg:col-span-6 bg-slate-950 p-8 lg:p-12 flex flex-col justify-between items-center text-center text-slate-100 relative overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 w-full flex justify-end">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest">
              KARNATAKA STATE POLICE
            </span>
          </div>

          {/* Hexagon 3D Frame Illustration */}
          <div className="relative z-10 my-auto py-8">
            <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
              {/* Outer Hexagon Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-pulse bg-gradient-to-tr from-amber-500/20 via-cyan-500/10 to-transparent blur-md"></div>

              {/* Hexagon Shape Container */}
              <div className="w-48 h-48 rounded-[2rem] bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center shadow-2xl relative">
                <Shield className="w-24 h-24 text-amber-400 fill-amber-400/10" />
                <Sparkles className="w-8 h-8 text-cyan-400 absolute top-4 right-4 animate-bounce" />
              </div>
            </div>

            {/* Showcase Headlines */}
            <div className="mt-8 space-y-2">
              <h2 className="font-poppins font-extrabold text-2xl tracking-tight text-white">
                Command Intelligence Anywhere
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Real-time spatial crime mapping, multi-agent AI extraction, and role-based governance for Karnataka State Police.
              </p>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            <span className="w-6 h-2 rounded-full bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
