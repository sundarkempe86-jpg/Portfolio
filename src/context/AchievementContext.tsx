'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const defaultBadges: AchievementBadge[] = [
  { id: 'vtu-scholar', title: 'VTU Computer Science Scholar', description: '7.0 / 10.0 CGPA at GEC Bidar (VTU)', icon: '🎓', unlocked: true },
  { id: 'kodnest-master', title: 'KodNest Enterprise Java Trainee', description: 'Mastered Core Java, SQL & DSA at KodNest Bengaluru', icon: '⚡', unlocked: true },
  { id: 'azure-ai-certified', title: 'Azure AI Certified Specialist', description: 'Microsoft Azure AI Fundamentals & AI Foundry Credentials', icon: '🤖', unlocked: true },
  { id: 'cisco-security', title: 'Cisco Endpoint Security Defender', description: 'Cisco Networking Academy Endpoint Security Badge', icon: '🛡️', unlocked: true },
  { id: 'client-ai-pioneer', title: 'Browser-Based AI Assistant Explorer', description: 'Explored 100% Client-Side AI Features (TF-IDF, Intent NLP)', icon: '🚀', unlocked: false },
];

interface AchievementContextType {
  badges: AchievementBadge[];
  unlockBadge: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType>({
  badges: defaultBadges,
  unlockBadge: () => { },
});

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [badges, setBadges] = useState<AchievementBadge[]>(defaultBadges);

  const unlockBadge = (id: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === id && !b.unlocked) {
          // Trigger confetti explosion
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
          } catch {
            // fallback
          }
          return { ...b, unlocked: true };
        }
        return b;
      })
    );
  };

  return (
    <AchievementContext.Provider value={{ badges, unlockBadge }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);
