import React from 'react';
import { useWebSocket } from '../../context/WebSocketContext';
import { Radio, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const HeaderTicker: React.FC = () => {
  const { isConnected, latestEvent } = useWebSocket();

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 px-6 py-1.5 flex items-center justify-between text-xs overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-extrabold text-amber-400 text-[11px] uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
          <Zap className="w-3 h-3 animate-pulse" />
          KSP Radar Alert
        </span>
        <span className="text-slate-300 font-medium text-[11px] truncate">
          {latestEvent?.event === 'INCIDENT_CREATED'
            ? `NEW FIR FILED: ${latestEvent.data?.fir_number} at ${latestEvent.data?.location_name} (${latestEvent.data?.category})`
            : "High vigilance active across Indiranagar, MG Road, & Koramangala sectors. Crime surge monitoring online."}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[11px] font-mono">
        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`}></span>
        <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
          {isConnected ? 'WS SYNC ONLINE' : 'RECONNECTING WS...'}
        </span>
      </div>
    </div>
  );
};
