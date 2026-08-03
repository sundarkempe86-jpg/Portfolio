'use client';

import React from 'react';

export const AuroraBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-cyber-dark text-slate-100 overflow-x-hidden selection:bg-cyber-cyan selection:text-black">
      {/* Dynamic Aurora Glow Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyber-cyan/15 via-cyber-indigo/20 to-transparent blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-cyber-emerald/15 via-cyber-indigo/20 to-transparent blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-cyber-cyan/10 via-cyber-emerald/15 to-transparent blur-[130px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
        
        {/* Subtle Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
