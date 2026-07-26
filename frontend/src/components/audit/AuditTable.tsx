import React, { useState } from 'react';
import { AuditLog } from '../../types';
import { RoleBadge } from '../common/RoleBadge';
import { ShieldCheck, Download, Search, Activity } from 'lucide-react';

interface AuditTableProps {
  logs: AuditLog[];
}

export const AuditTable: React.FC<AuditTableProps> = ({ logs }) => {
  const [filterAction, setFilterAction] = useState<string>('ALL');

  const actions = ['ALL', 'LOGIN_SUCCESS', 'SEARCH_INCIDENTS', 'AI_AGENT_QUERY', 'AI_SUMMARIZE_FIR', 'VIEW_ANALYTICS_DASHBOARD'];

  const filteredLogs = logs.filter((l) => filterAction === 'ALL' || l.action === filterAction);

  const exportCSV = () => {
    const headers = 'ID,Username,Role,Action,ResourceTarget,IPAddress,Timestamp\n';
    const rows = filteredLogs.map((l) => `"${l.id}","${l.username}","${l.user_role}","${l.action}","${l.resource_target}","${l.ip_address}","${l.timestamp}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KSP-Audit-Trail-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      {/* Header & Export */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Immutable Audit Trail Log
          </h3>
          <p className="text-xs text-slate-400">Chain-of-custody recording of all AI queries, logins, and FIR access</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Action Filter */}
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            {actions.map((act) => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>

          <button
            onClick={exportCSV}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Export CSV Log
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Timestamp</th>
              <th className="py-3 px-3">Officer Username</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Action Type</th>
              <th className="py-3 px-3">Resource Target</th>
              <th className="py-3 px-3">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-semibold font-sans">
                  No audit logs available for selected action filter.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-3 font-bold text-slate-200">{log.username}</td>
                  <td className="py-3 px-3 font-sans">
                    <RoleBadge role={log.user_role as any} />
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans">{log.resource_target}</td>
                  <td className="py-3 px-3 text-slate-400">{log.ip_address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
