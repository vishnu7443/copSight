import React, { useState } from 'react';
import { Network, Car, User, FileText, Building, Shield, MapPin, ArrowRight } from 'lucide-react';

export const RelationshipExplorer: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('vehicle');

  const entityDetails: Record<string, any> = {
    vehicle: {
      title: 'TVS Jupiter Scooter (Grey)',
      type: 'VEHICLE',
      reg_no: 'KA-01-EQ-9842',
      owner: 'Ramesh alias Chotta (Suspect)',
      linked_firs: ['FIR/2026/BLR-HSR/0188', 'FIR/2026/BLR-CEN/0089'],
      station: 'Indiranagar & HSR Layout PS',
      weapon: 'Iron Blade / Cutter',
      location: '100 Feet Road & HSR 27th Main'
    },
    suspect: {
      title: 'Ramesh alias Chotta',
      type: 'SUSPECT',
      badge_no: 'Habitual Offender #402',
      owner: 'Primary Suspect',
      linked_firs: ['FIR/2026/BLR-CEN/0089'],
      station: 'Cubbon Park PS',
      weapon: 'Sharp Iron Blade',
      location: 'MG Road Metro Station'
    },
    fir: {
      title: 'FIR/2026/BLR-IND/0142',
      type: 'CASE_FILE',
      reg_no: 'BNS 305 / 307',
      owner: 'Complainant: Vikram Sethi',
      linked_firs: ['FIR/2026/BLR-IND/0142'],
      station: 'Indiranagar Police Station',
      weapon: 'Bajaj Pulsar Snatching',
      location: '100 Feet Road near Toit'
    }
  };

  const curr = entityDetails[selectedEntity];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100">Entity Relationship Explorer</h3>
            <p className="text-xs text-slate-400">Visual link graph (Vehicle → Owner → FIR → Station → Officer → Weapon)</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          PROVENANCE GRAPH
        </span>
      </div>

      {/* Visual Connection Nodes Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <button
          onClick={() => setSelectedEntity('vehicle')}
          className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 text-left ${
            selectedEntity === 'vehicle'
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/10'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Car className="w-5 h-5 shrink-0" />
          <div>
            <span className="block font-bold">Vehicle</span>
            <span className="text-[10px] opacity-75 font-mono">KA-01-EQ-9842</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedEntity('suspect')}
          className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 text-left ${
            selectedEntity === 'suspect'
              ? 'bg-red-500/10 border-red-500/40 text-red-400 shadow-lg shadow-red-500/10'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5 shrink-0" />
          <div>
            <span className="block font-bold">Suspect / Owner</span>
            <span className="text-[10px] opacity-75">Ramesh Chotta</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedEntity('fir')}
          className={`p-3 rounded-2xl border transition-all flex items-center gap-2.5 text-left ${
            selectedEntity === 'fir'
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div>
            <span className="block font-bold">Linked FIR</span>
            <span className="text-[10px] opacity-75 font-mono">FIR/2026/BLR/0142</span>
          </div>
        </button>

        <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950 text-slate-400 flex items-center gap-2.5">
          <Building className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="block font-bold text-slate-200">Police Station</span>
            <span className="text-[10px]">Indiranagar PS</span>
          </div>
        </div>
      </div>

      {/* Traversed Graph Connections Box */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Active Traverse Chain: <span className="text-amber-400">{curr.title}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Registered Owner / Suspect</span>
            <p className="font-bold text-slate-200">{curr.owner}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Weapon / Tactics MO</span>
            <p className="font-bold text-slate-200">{curr.weapon}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Incident Location</span>
            <p className="font-bold text-slate-200">{curr.location}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Station Jurisdiction</span>
            <p className="font-bold text-slate-200">{curr.station}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
