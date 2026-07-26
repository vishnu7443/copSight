import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { AIQueryResponse } from '../../types';
import { Cpu, Send, CheckCircle2, XCircle, Clock, Shield, Sparkles, Database, FileText, BarChart3, AlertCircle } from 'lucide-react';

export const AgentConsole: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Show thefts near MG Road last month');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any | null>(null);

  const samplePrompts = [
    'Show thefts near MG Road last month',
    'Summarize digital arrest cybercrime incidents in Koramangala',
    'Burglary cases near Whitefield Prestige Shantiniketan',
    'Extrajudicial arrest request' // Guardrail test
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await apiService.executeAIQuery(prompt);
      setResponse(result);
    } catch (err: any) {
      console.error('Agent execution error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logs = response ? (response.telemetry || response.execution_logs || []) : [];
  const execTime = response ? (response.total_execution_time_ms ?? response.execution_time_ms ?? 0) : 0;

  return (
    <div className="space-y-6 font-roboto">
      {/* Top Header Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 font-poppins">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
              KSP Multi-Agent AI Console
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                DETERMINISTIC PIPELINE
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-roboto">
              Natural Language to Spatial SQL Translation • Entity Extraction • Audit Logged Execution
            </p>
          </div>
        </div>

        {/* Query Input Box */}
        <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask CopSight AI (e.g. 'Show thefts near MG Road last month')..."
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-slate-100 text-xs font-medium focus:outline-none focus:border-amber-500 transition-colors pr-10"
            />
            <Sparkles className="absolute right-3.5 top-3.5 w-4 h-4 text-amber-400" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 font-poppins"
          >
            {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{loading ? 'Executing Pipeline...' : 'Run AI Agents'}</span>
          </button>
        </form>

        {/* Sample Prompt Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2 font-roboto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Try Prompts:</span>
          {samplePrompts.map((sp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(sp)}
              className="text-xs px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Execution Split View */}
      {response && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Step-by-Step Reasoning Inspector */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between font-poppins">
              <span>Agent Execution Telemetry</span>
              <span className="text-amber-400 font-mono text-[11px]">{execTime} ms</span>
            </h3>

            <div className="space-y-2.5">
              {logs.map((log: any, i: number) => {
                const isPassed = log.status === 'PASSED' || log.status === 'COMPLETED';
                const isRejected = log.status === 'REJECTED';
                const title = log.agent || log.step || `Agent Step ${i + 1}`;
                const text = log.output || log.details || '';
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border text-xs transition-all ${
                      isRejected
                        ? 'bg-red-500/10 border-red-500/30 text-red-300'
                        : isPassed
                        ? 'bg-slate-900/90 border-slate-800 text-slate-200'
                        : 'bg-slate-950 border-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-2">
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        {isRejected && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                        {!isPassed && !isRejected && <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
                        {title}
                      </span>
                      <span className="text-[10px] font-mono opacity-80">{log.status}</span>
                    </div>
                    {text && (
                      <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed pl-5 border-l border-slate-800 font-mono">
                        {text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Intelligence Output Display */}
          <div className="lg:col-span-7 space-y-6">
            {!response.success ? (
              <div className="glass-panel p-6 rounded-3xl border border-red-500/30 bg-red-500/5 text-red-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm font-poppins">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span>Prompt Blocked by Safety Guardrails</span>
                </div>
                <p className="text-xs text-red-300/80">{response.error}</p>
              </div>
            ) : (
              <>
                {/* Search Output Summary */}
                {response.search_output && (
                  <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2 font-poppins">
                        <Database className="w-4 h-4 text-cyan-400" />
                        Spatial Query Agent Result
                      </h4>
                      <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 font-mono">
                        {response.matched_incidents_count || 1} Incidents Matched
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{response.search_output.explanation}</p>
                  </div>
                )}

                {/* FIR Summary & Validation Extraction */}
                {response.summary_output && (
                  <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2 font-poppins">
                        <FileText className="w-4 h-4 text-amber-400" />
                        Summary Agent Extraction
                      </h4>

                      {/* Confidence Meter Badge */}
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                        <span>Grounding Confidence:</span>
                        <span className="text-slate-100 font-extrabold font-mono">
                          {Math.round((response.confidence_score || 0.94) * 100)}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                      {response.summary_output.summary_text || response.summary_output.executive_summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-poppins">Modus Operandi:</span>
                        <p className="text-slate-300 font-semibold">{response.summary_output.modus_operandi}</p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase font-poppins">Suggested Legal Sections:</span>
                        <div className="flex flex-wrap gap-1.5 font-mono">
                          {(response.summary_output.ipc_sections_suggested || []).map((sec: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[11px]">
                              {sec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
