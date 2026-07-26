import React, { useState } from 'react';
import { X, Printer, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface BriefingModalProps {
  data: any;
  onClose: () => void;
}

export const BriefingModal: React.FC<BriefingModalProps> = ({ data, onClose }) => {
  const report = data.report;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSpeechNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis API not supported in your browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = `${report.report_title}. ${report.summary_overview}. Key findings: ${report.key_findings.join('. ')}. Recommendations: ${report.action_items.join('. ')}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-3xl glass-panel bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              KSP
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-100">{report.report_title}</h3>
              <span className="text-[10px] font-bold text-amber-400 tracking-wider">
                {report.security_clearance_level}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-400 uppercase">Executive Briefing Overview</h4>
            <button
              onClick={handleSpeechNarration}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlaying
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950'
              }`}
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Stop Voice Narration' : 'Listen to Voice Briefing'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{report.summary_overview}</p>
        </div>

        {/* Key Operational Findings */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase">Key Operational Highlights</h4>
          <ul className="space-y-2 text-xs text-slate-200">
            {report.key_findings.map((f: string, i: number) => (
              <li key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tactical Actions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase">Patrol & Dispatch Recommendations</h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {report.action_items.map((act: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Report Agent Output ID: {Date.now()}</span>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Briefing</span>
            </button>
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
