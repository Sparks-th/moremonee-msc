import React from 'react';

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ className = '', children }) => (
  <div
    className={`bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-xl shadow-lg ${className}`}
  >
    {children}
  </div>
);
