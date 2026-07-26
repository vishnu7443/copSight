import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Incident } from '../types';
import { StatBadge } from '../components/common/StatBadge';
import { CrimeMap } from '../components/gis/CrimeMap';
import { FIRSummaryDrawer } from '../components/ai/FIRSummaryDrawer';
import { BriefingModal } from '../components/ai/BriefingModal';
import { FileText, ShieldAlert, TrendingUp, MapPin, Sparkles, Radio, Activity, Download } from 'lucide-react';
import { useWebSocket } from '../context/WebSocketContext';

export const DashboardPage: React.FC = () => {
  const { liveIncidents } = useWebSocket();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showBriefingModal, setShowBriefingModal] = useState<boolean>(false);
  const [briefingData, setBriefingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incData, analData] = await Promise.all([
          apiService.getIncidents(),
          apiService.getDashboardAnalytics()
        ]);
        setIncidents(incData);
        setAnalytics(analData);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allIncidents = React.useMemo(() => {
    const ids = new Set(incidents.map((i) => i.id));
    const newFromWs = liveIncidents.filter((i) => !ids.has(i.id));
    return [...newFromWs, ...incidents];
  }, [incidents, liveIncidents]);

  const handleGenerateBriefing = async () => {
    try {
      const data = await apiService.getDailyBriefing();
      setBriefingData(data);
      setShowBriefingModal(true);
    } catch (err) {
      console.error("Failed to generate briefing:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Operational Briefing Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
            Karnataka Police Operational Command Center
          </h2>
          <p className="text-xs text-slate-400">
            Real-time multi-station crime monitoring, GIS spatial radar, and active FIR feed
          </p>
        </div>

        <button
          onClick={handleGenerateBriefing}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Shift Briefing Report</span>
        </button>
      </div>

      {/* Top Stat Badges Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBadge
          label="Total Filed FIRs"
          value={allIncidents.length || 10}
          subtext="Across 10 police station jurisdictions"
          icon={FileText}
          color="amber"
        />
        <StatBadge
          label="Active Investigations"
          value={analytics?.kpis?.under_investigation ?? 4}
          subtext="Assigned IO officers"
          icon={ShieldAlert}
          color="cyan"
        />
        <StatBadge
          label="Crime Surge Rate"
          value={`+${analytics?.kpis?.surge_rate_pct ?? 14.2}%`}
          subtext="30-day shift indicator"
          icon={TrendingUp}
          trend="HIGH ALERT"
          color="red"
        />
        <StatBadge
          label="Monitored Stations"
          value={analytics?.kpis?.total_stations ?? 10}
          subtext="Bengaluru, Mysuru, Hubballi, Mangaluru"
          icon={MapPin}
          color="emerald"
        />
      </div>

      {/* Split View: GIS Crime Map & Live Dispatch Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left GIS Spatial Hotspot Radar */}
        <div className="lg:col-span-7 h-[520px]">
          <CrimeMap
            incidents={allIncidents}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        </div>

        {/* Right Live FIR Dispatch Stream */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
              Live FIR Dispatch Feed
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
              REAL-TIME SYNC
            </span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[410px] pr-1">
            {allIncidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 transition-all cursor-pointer space-y-2 group hover:border-amber-500/40 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">{inc.fir_number}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">
                    {inc.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                  {inc.location_name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{inc.raw_fir_text}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/60 pt-1.5">
                  <span>IO: {inc.investigating_officer}</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                    <Sparkles className="w-3 h-3" /> Summarize
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <span className="text-[11px] text-slate-400 italic">Click any card to open FIR AI Summary drawer</span>
          </div>
        </div>
      </div>

      {/* FIR Summary Slide-Over Drawer */}
      <FIRSummaryDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />

      {/* Briefing Modal */}
      {showBriefingModal && briefingData && (
        <BriefingModal
          data={briefingData}
          onClose={() => setShowBriefingModal(false)}
        />
      )}
    </div>
  );
};
