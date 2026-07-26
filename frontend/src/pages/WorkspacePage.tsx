import React, { useState } from 'react';
import { Pin, Shield, FileText, Car, User, Trash2, FolderCheck } from 'lucide-react';

export const WorkspacePage: React.FC = () => {
  const [pinnedItems, setPinnedItems] = useState([
    { id: '1', type: 'FIR', title: 'FIR/2026/BLR-IND/0142', subtitle: 'Indiranagar Chain Snatching (BNS 305)', pinned_at: '10 mins ago' },
    { id: '2', type: 'VEHICLE', title: 'Bajaj Pulsar Black (No Plate)', subtitle: 'Suspect Getaway Vehicle', pinned_at: '25 mins ago' },
    { id: '3', type: 'SUSPECT', title: 'Ramesh alias Chotta', subtitle: 'Habitual Offender #402', pinned_at: '1 hour ago' },
    { id: '4', type: 'REPORT', title: 'Indiranagar Night Briefing Report', subtitle: 'Tactical Patrol Recommendation', pinned_at: '2 hours ago' },
  ]);

  const handleUnpin = (id: string) => {
    setPinnedItems(pinnedItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <Pin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
              My Investigation Workspace
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                OFFICER CASE PINNER
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Personal investigative dashboard to pin active FIRs, suspects, getaway vehicles, and briefing reports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
          <FolderCheck className="w-4 h-4" />
          <span>{pinnedItems.length} Active Pins</span>
        </div>
      </div>

      {/* Pinned Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pinnedItems.map((item) => {
          const Icon = item.type === 'FIR' ? FileText : item.type === 'VEHICLE' ? Car : item.type === 'SUSPECT' ? User : Shield;
          return (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-800">
                    {item.type}
                  </span>
                  <button
                    onClick={() => handleUnpin(item.id)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400">{item.subtitle}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Pinned {item.pinned_at}</span>
                <span className="text-amber-400 font-bold">Active Case</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
