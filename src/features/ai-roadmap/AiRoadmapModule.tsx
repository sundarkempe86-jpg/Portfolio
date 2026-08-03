'use client';

import React from 'react';
import { Target, CheckCircle2, Clock, Award, Sparkles, MapPin } from 'lucide-react';
import { CandidateService } from '@/services/CandidateService';

export const AiRoadmapModule: React.FC = () => {
  const roadmap = CandidateService.getRoadmap();

  return (
    <section id="ai-roadmap" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-indigo/20 border border-cyber-indigo/40 text-cyber-cyan font-mono text-xs">
            <Target className="w-3.5 h-3.5" />
            <span>CAREER ROADMAP & GROWTH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Competency Progress & Learning Roadmap
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Strategic tracking toward strong product engineering roles and continuous growth in AI, software architecture, and full-stack delivery.
          </p>
        </div>

        {/* Target Milestone Banner */}
        <div className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyber-cyan font-bold uppercase">Target Milestone</div>
            <div className="text-xl font-bold text-white font-display mt-0.5">{roadmap.targetMilestone}</div>
          </div>

          <div className="text-right space-y-1 font-mono">
            <div className="text-xs text-slate-400">Estimated Readiness</div>
            <div className="text-3xl font-bold text-cyber-emerald">{roadmap.readinessScore}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Acquired Skills */}
          <div className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-4 backdrop-blur-md">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <CheckCircle2 className="w-5 h-5 text-cyber-emerald" />
              <span>Acquired Competencies</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {roadmap.skillsAcquired.map((skill) => (
                <div key={skill} className="p-2.5 rounded-xl bg-cyber-dark border border-slate-800 text-slate-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress & Upcoming */}
          <div className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-4 backdrop-blur-md">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Clock className="w-5 h-5 text-cyber-cyan" />
              <span>In-Progress Growth Areas</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {roadmap.inProgress.map((item) => (
                <div key={item} className="p-2.5 rounded-xl bg-cyber-dark border border-slate-800 text-cyber-cyan flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
