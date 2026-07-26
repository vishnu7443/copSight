import React from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Database, Cpu, ArrowRight } from 'lucide-react';

interface AIProvenanceModalProps {
  query: string;
  telemetry: any[];
  sources: string[];
  confidenceScore: number;
  confidenceBadge: string;
  onClose: () => void;
}

export const AIProvenanceModal: React.FC<AIProvenanceModalProps> = ({
  query,
  telemetry,
  sources,
  confidenceScore,
  confidenceBadge,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-3xl glass-panel bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                How Did AI Reach This Conclusion?
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  confidenceBadge === 'HIGH'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {confidenceBadge === 'HIGH' ? '🟢 High Confidence' : '🟡 Medium Confidence'} ({Math.round(confidenceScore * 100)}%)
                </span>
              </h3>
              <p className="text-xs text-slate-400">Explainable AI Provenance & Multi-Agent Audit Tracer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Query Callout */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Input Query Prompt</span>
          <p className="text-xs font-semibold text-amber-300 font-mono">“{query}”</p>
        </div>

        {/* Step-by-Step Reasoning Pipeline */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Agent Reasoning & Telemetry Log
          </h4>
          <div className="space-y-2">
            {telemetry.map((log: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                    ✓
                  </span>
                  <div>
                    <span className="font-bold text-slate-200">{log.agent}</span>
                    <p className="text-[11px] text-slate-400 font-mono">{log.output}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{log.time_ms}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grounding Provenance Sources */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" /> Grounding Provenance Sources
          </h4>
          <ul className="space-y-1 text-xs text-slate-300">
            {sources.map((src: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span className="font-mono text-[11px]">{src}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Close Provenance Trace
          </button>
        </div>
      </div>
    </div>
  );
};
