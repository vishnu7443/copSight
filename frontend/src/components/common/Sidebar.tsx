import React from 'react';
import { LayoutDashboard, Cpu, Map, FileText, BarChart3, ShieldCheck, Radio, Pin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'command-center', label: 'Control Room Mode', icon: Radio, badge: 'DEMO' },
    { id: 'ai-agent', label: 'AI Agent Console', icon: Cpu },
    { id: 'workspace', label: 'My Workspace', icon: Pin },
    { id: 'ai-map', label: 'GIS Crime Map', icon: Map },
    { id: 'incidents', label: 'FIR Case Files', icon: FileText },
    { id: 'analytics', label: 'Crime Analytics', icon: BarChart3 },
  ];

  if (user?.role === 'SUPERINTENDENT' || user?.role === 'ADMIN') {
    navItems.push({ id: 'audit', label: 'Audit Trail', icon: ShieldCheck });
  }

  return (
    <aside className="w-64 glass-panel border-r border-slate-800 bg-slate-950/80 backdrop-blur-md p-4 flex flex-col justify-between hidden md:flex font-roboto">
      <div className="space-y-6">
        <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest font-poppins">
          Command Operations
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 font-poppins'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
        <span className="text-[10px] font-bold text-amber-400 uppercase font-poppins">KSP AI Ops Engine</span>
        <p className="text-[11px] text-slate-400 font-mono">v1.0.0 Enterprise</p>
      </div>
    </aside>
  );
};
