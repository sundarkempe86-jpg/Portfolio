'use client';

import React from 'react';
import { Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAchievements } from '@/context/AchievementContext';

export const AchievementsModule: React.FC = () => {
  const { badges, unlockBadge } = useAchievements();

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>GAMIFIED ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Unlocked Milestone Badges
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Click locked badges to explore & trigger instant confetti unlock animations!
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => unlockBadge(badge.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 backdrop-blur-md ${
                badge.unlocked
                  ? 'bg-cyber-surface/80 border-cyber-emerald/50 shadow-neon-emerald'
                  : 'bg-cyber-dark/60 border-cyber-border opacity-70 hover:opacity-100 hover:border-cyber-cyan'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{badge.icon}</span>
                {badge.unlocked ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyber-emerald/20 text-cyber-emerald text-[10px] font-mono font-bold flex items-center gap-1 border border-cyber-emerald/40">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked (Click)
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-white text-base font-display">{badge.title}</h3>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
