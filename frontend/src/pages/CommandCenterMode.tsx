import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { CrimeMap } from '../components/gis/CrimeMap';
import { Radio, ShieldAlert, Activity, FileText, Maximize2, Minimize2, MapPin, Zap } from 'lucide-react';
import { useWebSocket } from '../context/WebSocketContext';

export const CommandCenterMode: React.FC = () => {
  const { isConnected, liveIncidents } = useWebSocket();
  const [incidents, setIncidents] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await apiService.getIncidents();
        setIncidents(data);
      } catch (err) {
        console.error("Command Center fetch error:", err);
      }
    };
    fetchIncidents();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="space-y-6 bg-slate-950 p-2 min-h-screen text-slate-100 font-sans">
      {/* Top Control Room Header Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              KSP CONTROL ROOM • COMMAND CENTER DEMO MODE
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-mono font-bold animate-pulse">
                LIVE RADAR ACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">High-Density Operational Radar & Dispatch Telemetry</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`}></span>
            <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
              {isConnected ? 'WS SYNC ONLINE' : 'DISCONNECTED'}
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-2 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Demo'}</span>
          </button>
        </div>
      </div>

      {/* Control Room Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Huge Map Radar */}
        <div className="lg:col-span-8 h-[600px]">
          <CrimeMap incidents={incidents} />
        </div>

        {/* Right High-Density Stream */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
              High-Frequency Dispatch Stream
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">{incidents.length} FILED CASES</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[500px] pr-1 font-mono text-xs">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">{inc.fir_number}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                    {inc.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">{inc.location_name}</p>
                <div className="text-[10px] text-slate-500 flex items-center justify-between border-t border-slate-800/60 pt-1">
                  <span>IO: {inc.investigating_officer}</span>
                  <span className="text-emerald-400 font-bold">STATUS: {inc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
