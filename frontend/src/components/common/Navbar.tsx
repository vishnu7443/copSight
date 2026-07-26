import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from './RoleBadge';
import { PitchModal } from './PitchModal';
import { UserRole } from '../../types';
import { Shield, LogOut, ChevronDown, Activity, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenPitchModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPitchModal }) => {
  const { user, logout, switchDemoRole } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localPitchModalOpen, setLocalPitchModalOpen] = useState(false);

  const handleOpenPitch = () => {
    if (onOpenPitchModal) {
      onOpenPitchModal();
    } else {
      setLocalPitchModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between font-poppins">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
            <Shield className="w-6 h-6 fill-slate-950 text-amber-400" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
              KSP-CopSight <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">AI OPS MANAGER</span>
            </h1>
            <p className="text-xs text-slate-400 font-roboto">Karnataka State Police Intelligence Command</p>
          </div>
        </div>

        {/* Center Pitch Modal Trigger & Live Audit Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleOpenPitch}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-xs font-extrabold text-amber-400 transition-all hover:scale-105 shadow-md shadow-amber-500/10"
          >
            <HelpCircle className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>How CopSight Works</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-roboto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>AUDIT LOGGING ACTIVE</span>
          </div>
        </div>

        {/* Right User Profile & Role Switcher */}
        {user && (
          <div className="flex items-center gap-4">
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-sm"
              >
                <span className="text-slate-400">Role:</span>
                <RoleBadge role={user.role} />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl glass-panel border border-slate-800 bg-slate-900 shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-poppins">
                    Switch Active Role
                  </div>
                  {(['CONSTABLE', 'INSPECTOR', 'SUPERINTENDENT', 'ADMIN'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchDemoRole(r);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors font-roboto ${user.role === r ? 'bg-slate-800/80 text-amber-400 font-bold' : 'text-slate-300'}`}
                    >
                      <span>{r}</span>
                      <RoleBadge role={r} showIcon={false} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Badge Info */}
            <div className="hidden sm:flex flex-col text-right font-roboto">
              <span className="text-xs font-bold text-slate-200">{user.full_name}</span>
              <span className="text-[11px] text-slate-400 font-mono">{user.badge_number}</span>
            </div>

            <button
              onClick={logout}
              className="p-2.5 rounded-2xl bg-slate-900 hover:bg-red-500/10 hover:text-red-400 border border-slate-800 text-slate-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Standalone Pitch Modal */}
      {localPitchModalOpen && <PitchModal onClose={() => setLocalPitchModalOpen(false)} />}
    </>
  );
};
