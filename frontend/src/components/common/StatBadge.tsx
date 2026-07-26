import React from 'react';

interface StatBadgeProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: any;
  trend?: string;
  color?: 'amber' | 'blue' | 'emerald' | 'red' | 'cyan';
}

export const StatBadge: React.FC<StatBadgeProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  color = 'amber'
}) => {
  const colorMap = {
    amber: 'from-amber-500/10 to-amber-600/5 text-amber-400 border-amber-500/30',
    blue: 'from-blue-500/10 to-blue-600/5 text-blue-400 border-blue-500/30',
    emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
    red: 'from-red-500/10 to-red-600/5 text-red-400 border-red-500/30',
    cyan: 'from-cyan-500/10 to-cyan-600/5 text-cyan-400 border-cyan-500/30'
  };

  return (
    <div className={`p-4 rounded-xl border bg-gradient-to-br ${colorMap[color]} backdrop-blur-md glass-panel flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        {Icon && <Icon className="w-5 h-5 opacity-80" />}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-extrabold tracking-tight text-slate-100">{value}</span>
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
            {trend}
          </span>
        )}
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
    </div>
  );
};
