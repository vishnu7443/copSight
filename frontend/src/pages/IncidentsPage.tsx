import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { Incident } from '../types';
import { IncidentTable } from '../components/incidents/IncidentTable';
import { FIRSummaryDrawer } from '../components/ai/FIRSummaryDrawer';
import { CreateIncidentModal } from '../components/incidents/CreateIncidentModal';
import { FileText, Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';

export const IncidentsPage: React.FC = () => {
  const { user } = useAuth();
  const { liveIncidents } = useWebSocket();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await apiService.getIncidents();
        setIncidents(data);
      } catch (err) {
        console.error("Failed to load incidents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  // Merge WebSocket real-time new incidents
  const allIncidents = React.useMemo(() => {
    const ids = new Set(incidents.map((i) => i.id));
    const newFromWs = liveIncidents.filter((i) => !ids.has(i.id));
    return [...newFromWs, ...incidents];
  }, [incidents, liveIncidents]);

  return (
    <div className="space-y-6">
      {/* Header & New FIR Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Karnataka State Police Case Files & FIR Database
          </h2>
          <p className="text-xs text-slate-400">
            Browse, search, and file official FIR documents with real-time state synchronization
          </p>
        </div>

        {user?.role !== 'CONSTABLE' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>File New FIR Record</span>
          </button>
        )}
      </div>

      {/* Incident Table */}
      <IncidentTable
        incidents={allIncidents}
        onSelectIncident={(inc) => setSelectedIncident(inc)}
      />

      {/* Slide Over Drawer */}
      <FIRSummaryDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />

      {/* New FIR Modal */}
      {showCreateModal && (
        <CreateIncidentModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newInc) => {
            setIncidents((prev) => [newInc, ...prev]);
          }}
        />
      )}
    </div>
  );
};
