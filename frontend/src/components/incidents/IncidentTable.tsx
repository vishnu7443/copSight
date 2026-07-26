import React, { useState } from 'react';
import { Incident } from '../../types';
import { FileText, Search, Sparkles, Filter, Eye, ChevronRight } from 'lucide-react';

interface IncidentTableProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ incidents, onSelectIncident }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'THEFT', 'ROBBERY', 'BURGLARY', 'CYBERCRIME', 'ASSAULT', 'NARCOTICS'];

  const filteredIncidents = incidents.filter((inc) => {
    const matchesCategory = selectedCategory === 'ALL' || inc.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      inc.fir_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.raw_fir_text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        {/* Search Box */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter FIRs by number, location, text..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">FIR Number</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Sections</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Filed Date</th>
              <th className="py-3 px-3 text-right">AI Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-semibold">
                  No FIR case records found matching filters.
                </td>
              </tr>
            ) : (
              filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-900/60 transition-colors group">
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">{inc.fir_number}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-bold">
                      {inc.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-200">{inc.location_name}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      {inc.ipc_sections.slice(0, 2).map((sec, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inc.status === 'OPEN' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                      inc.status === 'UNDER_INVESTIGATION' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{new Date(inc.filed_date).toLocaleDateString()}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectIncident(inc)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Summarize</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
