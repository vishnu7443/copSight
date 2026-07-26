import React from 'react';
import { CheckCircle2, Clock, Shield, Search, UserCheck, FileCheck } from 'lucide-react';

interface IncidentTimelineProps {
  firNumber: string;
  incidentDate: string;
  status: string;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({
  firNumber,
  incidentDate,
  status
}) => {
  const formattedDate = new Date(incidentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const steps = [
    { title: 'Complaint Registered', time: `${formattedDate}`, desc: 'FIR logged in KSP database', icon: Clock, completed: true },
    { title: 'Evidence Uploaded', time: '1 hr later', desc: 'CCTV footage & forensic report attached', icon: Search, completed: true },
    { title: 'Vehicle Identified', time: '3 hrs later', desc: 'License plate matched via ANPR radar', icon: Shield, completed: status !== 'OPEN' },
    { title: 'Suspect Interrogated', time: '6 hrs later', desc: 'Statement recorded under BNS guidelines', icon: UserCheck, completed: status === 'CHARGESHEET_FILED' || status === 'CLOSED' },
    { title: 'Case Closed / Chargesheet', time: 'Final Step', desc: 'Submitted to judicial magistrate', icon: FileCheck, completed: status === 'CHARGESHEET_FILED' || status === 'CLOSED' },
  ];

  return (
    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          Visual Case Progression Stepper
        </h4>
        <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
          {firNumber}
        </span>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative flex items-start gap-3 group">
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                  step.completed
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {step.completed ? '✓' : idx + 1}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${step.completed ? 'text-slate-100' : 'text-slate-500'}`}>
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">({step.time})</span>
                </div>
                <p className="text-[11px] text-slate-400">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
