import React from 'react';
import { X, BookOpen, Navigation, Code, ShieldCheck, Sparkles, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface PitchModalProps {
  onClose: () => void;
}

export const PitchModal: React.FC<PitchModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900/95 border border-slate-800 rounded-[2.5rem] p-6 sm:p-10 space-y-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] my-auto font-poppins relative">
        
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black shrink-0">
            <Sparkles className="w-7 h-7 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-black tracking-tight text-white">How CopSight Works</h2>
              <span className="text-[10px] px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
                SMART RESEARCH ASSISTANT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-roboto mt-1">
              Transforming scattered police records into instant spatial intelligence — keeping every operational decision under human officer control.
            </p>
          </div>
        </div>

        {/* 1-Line Elevator Pitch Callout */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-slate-950 border border-amber-500/30 shadow-inner">
          <p className="text-sm font-extrabold text-amber-300 leading-relaxed text-center font-poppins">
            “CopSight is like Google Search + Google Maps + GitHub Copilot for police records — helping officers find, understand, and visualize information faster, while keeping every operational decision under human control.”
          </p>
        </div>

        {/* 3 Core Apple-Grade Analogy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-roboto">
          {/* Card 1: Smart Librarian */}
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-white font-poppins">1. The Smart Librarian 📚</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Police data lives in hundreds of scattered books (FIRs, station records, vehicle details, CCTV logs). CopSight acts as a smart librarian — opening the correct pages, highlighting key entities, and showing everything on a spatial map in seconds.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-bold text-amber-400 font-poppins flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Never accuses • Only researches
            </div>
          </div>

          {/* Card 2: Google Maps */}
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-white font-poppins">2. Like Google Maps 🗺️</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google Maps never drives your car — it suggests routes, traffic alerts, and arrival times. CopSight works the same way: it displays crime trends, hotspot heatmaps, and confidence scores, while the officer makes every operational choice.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-bold text-cyan-400 font-poppins flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Suggests routes • Driver decides
            </div>
          </div>

          {/* Card 3: GitHub Copilot */}
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] shadow-lg group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-slate-950 transition-all">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-white font-poppins">3. Like GitHub Copilot 💻</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Developers review and edit code written by Copilot. CopSight suggests relevant FIRs, similar cases, and extracted Modus Operandi with full audit traceability — ensuring every insight is reviewable and grounded.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-bold text-purple-400 font-poppins flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Traceable • Reviewable • Explainable
            </div>
          </div>
        </div>

        {/* Data Pipeline Stepper */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center font-poppins">
            System Operational Flow: From Data to Officer Decision
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-roboto">
            <span className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-bold">
              Raw FIR Records & GPS
            </span>
            <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Multi-Agent AI Pipeline
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-500 shrink-0" />
            <span className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
              Validation & Safety Layer
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold flex items-center gap-2 font-poppins">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Human Officer Decision
            </span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-roboto">
          <span className="text-xs text-slate-500 font-mono">KSP Intelligence Infrastructure</span>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/20 font-poppins transition-all hover:scale-[1.02]"
          >
            Explore Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
