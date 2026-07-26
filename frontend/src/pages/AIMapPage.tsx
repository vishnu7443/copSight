import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Incident } from '../types';
import { CrimeMap } from '../components/gis/CrimeMap';
import { FIRSummaryDrawer } from '../components/ai/FIRSummaryDrawer';
import { Map, Filter, Layers } from 'lucide-react';

export const AIMapPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await apiService.getIncidents();
        setIncidents(data);
      } catch (err) {
        console.error("GIS data fetch error:", err);
      }
    };
    fetchIncidents();
  }, []);

  const filteredIncidents = categoryFilter === 'ALL'
    ? incidents
    : incidents.filter((i) => i.category === categoryFilter);

  return (
    <div className="space-y-4 h-[calc(100vh-120px)] flex flex-col">
      {/* Top Map Control Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-bold text-slate-100">GIS Crime Hotspot & Layer Intelligence</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5">
          {['ALL', 'THEFT', 'ROBBERY', 'BURGLARY', 'CYBERCRIME', 'ASSAULT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map View Container */}
      <div className="flex-1 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
        <CrimeMap
          incidents={filteredIncidents}
          onSelectIncident={(inc) => setSelectedIncident(inc)}
        />
      </div>

      <FIRSummaryDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};
