import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { Incident } from '../../types';
import { X, ShieldAlert, MapPin, Sparkles, Plus, Check } from 'lucide-react';

interface CreateIncidentModalProps {
  onClose: () => void;
  onSuccess: (newIncident: Incident) => void;
}

export const CreateIncidentModal: React.FC<CreateIncidentModalProps> = ({ onClose, onSuccess }) => {
  const [firNumber, setFirNumber] = useState<string>(`FIR/2026/BLR-IND/${Math.floor(1000 + Math.random() * 9000)}`);
  const [category, setCategory] = useState<string>('THEFT');
  const [locationName, setLocationName] = useState<string>('');
  const [lat, setLat] = useState<number>(12.9784);
  const [lng, setLng] = useState<number>(77.6408);
  const [complainantName, setComplainantName] = useState<string>('');
  const [accusedName, setAccusedName] = useState<string>('');
  const [rawText, setRawText] = useState<string>('');
  const [ipcSections, setIpcSections] = useState<string>('BNS 305, BNS 307');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ['THEFT', 'ROBBERY', 'BURGLARY', 'CYBERCRIME', 'ASSAULT', 'NARCOTICS', 'HOMICIDE'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !rawText || !complainantName) {
      setError('Please fill in all required FIR case details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: Partial<Incident> = {
        fir_number: firNumber,
        station_id: 'stn-blr-ind-01',
        incident_date: new Date().toISOString(),
        filed_date: new Date().toISOString(),
        ipc_sections: ipcSections.split(',').map((s) => s.trim()),
        category: category,
        status: 'OPEN',
        location_name: locationName,
        latitude: Number(lat),
        longitude: Number(lng),
        complainant_name: complainantName,
        accused_name: accusedName || 'Unidentified Suspect',
        investigating_officer: 'Inspector Suresh Patil',
        raw_fir_text: rawText
      };

      const created = await apiService.createIncident(payload);
      onSuccess(created);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to file FIR incident record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl glass-panel bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-100">File New FIR Incident Record</h3>
              <p className="text-xs text-slate-400">Official Police Dispatch & Incident Entry Form</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">FIR Number</label>
              <input
                type="text"
                value={firNumber}
                onChange={(e) => setFirNumber(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">Offense Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-bold"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">Incident Location Name</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. 100 Feet Road near Metro Station"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">BNS / IPC Sections (Comma separated)</label>
              <input
                type="text"
                value={ipcSections}
                onChange={(e) => setIpcSections(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">Complainant / Victim Name</label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="Full Complainant Name"
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">Accused / Suspect Description</label>
              <input
                type="text"
                value={accusedName}
                onChange={(e) => setAccusedName(e.target.value)}
                placeholder="Suspect description or names"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">GIS Latitude</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1">GIS Longitude</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(parseFloat(e.target.value))}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-bold uppercase mb-1">Raw FIR Narrative Text Statement</label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Enter full detailed FIR narrative statement..."
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 leading-relaxed font-mono"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-500 font-mono text-[11px]">Real-Time WebSocket Sync Active</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20"
              >
                {loading ? 'Filing FIR Record...' : 'Submit FIR Record'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
