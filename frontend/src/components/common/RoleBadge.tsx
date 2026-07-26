import React from 'react';
import { UserRole } from '../../types';
import { Shield, ShieldAlert, ShieldCheck, UserCheck } from 'lucide-react';

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, showIcon = true }) => {
  const roleStyles: Record<UserRole, { bg: string; text: string; border: string; icon: any }> = {
    CONSTABLE: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      icon: Shield
    },
    INSPECTOR: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      icon: ShieldCheck
    },
    SUPERINTENDENT: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      icon: UserCheck
    },
    ADMIN: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      icon: ShieldAlert
    }
  };

  const current = roleStyles[role] || roleStyles.CONSTABLE;
  const IconComponent = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${current.border}`}>
      {showIcon && <IconComponent className="w-3.5 h-3.5" />}
      {role}
    </span>
  );
};
