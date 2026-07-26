import React, { useState } from 'react';
import { AgentConsole } from '../components/ai/AgentConsole';
import { Cpu, Sparkles, ShieldCheck, Database, FileText, CheckCircle2, History } from 'lucide-react';

export const AIAgentConsolePage: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Show thefts near MG Road last month",
    "Summarize digital arrest cybercrime incidents in Koramangala",
    "Burglary cases near Whitefield Prestige Shantiniketan"
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shadow-lg shadow-amber-500/10">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
              KSP Multi-Agent AI Ops Laboratory
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                GROUNDED REASONING ENGINE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic Multi-Agent Reasoning Pipeline • Natural Language to Spatial SQL • Entity & MO Extraction
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-semibold">Guardrails Active</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-semibold">SQL Translation</span>
          </div>
        </div>
      </div>

      {/* Main Interactive AI Console Component */}
      <AgentConsole />
    </div>
  );
};
