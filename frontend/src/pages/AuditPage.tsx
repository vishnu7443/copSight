import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { AuditLog } from '../types';
import { AuditTable } from '../components/audit/AuditTable';
import { ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuditPage: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [forbidden, setForbidden] = useState<boolean>(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await apiService.getAuditLogs();
        setLogs(data);
      } catch (err: any) {
        if (err.response && err.response.status === 403) {
          setForbidden(true);
        } else {
          console.error("Failed to load audit logs:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (forbidden) {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-red-500/30 bg-red-500/5 text-center space-y-4 max-w-lg mx-auto mt-12">
        <Lock className="w-10 h-10 text-red-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-100">Restricted RBAC Resource</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Your current role (<span className="text-red-400 font-bold">{user?.role}</span>) does not have authorization to view raw system audit trail logs. Audit inspection requires Superintendent or Admin privileges.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Karnataka State Police Security & Audit Log Inspection
        </h2>
        <p className="text-xs text-slate-400">
          Enforced audit trail logging for all officer activity, AI query telemetry, and FIR data access
        </p>
      </div>

      <AuditTable logs={logs} />
    </div>
  );
};
