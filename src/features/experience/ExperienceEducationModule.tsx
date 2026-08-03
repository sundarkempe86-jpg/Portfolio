'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { CandidateService } from '@/services/CandidateService';

export const ExperienceEducationModule: React.FC = () => {
  const experience = CandidateService.getExperience();
  const certs = CandidateService.getCertifications();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>TIMELINE & INDUSTRY TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Professional Training & Key Credentials
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Hands-on offline full-stack development experience and industry verified credentials.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-4 backdrop-blur-md hover:border-cyber-emerald/50 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-emerald/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-cyber-border pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{exp.role}</h3>
                  <div className="text-sm font-bold text-cyber-cyan">{exp.organization}</div>
                </div>

                <div className="space-y-1 text-right font-mono text-xs">
                  <div className="px-3 py-1 rounded-full bg-cyber-dark text-cyber-emerald border border-cyber-emerald/30 inline-block font-bold">
                    {exp.duration}
                  </div>
                  <div className="text-slate-400 flex items-center justify-end gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-400" /> {exp.location}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Skills & Concepts Mastered:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skillsLearned.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-cyber-dark text-xs font-mono text-cyber-emerald border border-cyber-emerald/20 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
