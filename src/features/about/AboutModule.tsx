'use client';

import React from 'react';
import { User, BookOpen, GraduationCap, MapPin, Globe, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { CandidateService } from '@/services/CandidateService';

export const AboutModule: React.FC = () => {
  const profile = CandidateService.getProfile();
  const education = CandidateService.getEducation();

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Engineering Story & Educational Journey
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            From Government Engineering College Bidar (VTU) to hands-on Java Full-Stack training in Bengaluru and a strong focus on building industry-ready software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Story Narrative */}
          <div className="lg:col-span-2 space-y-6 bg-cyber-surface/70 border border-cyber-border rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyber-cyan" />
              <span>Personal Vision & Mission</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              I am Sundar Raj Kempe, a Computer Science & Engineering graduate from Government Engineering College, Bidar (affiliated with Visvesvaraya Technological University - VTU Belagavi). I bring a strong foundation in Artificial Intelligence, Machine Learning, and Enterprise Java Software Engineering.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              To bridge theoretical computer science with enterprise product engineering standards, I completed intensive offline Java Full-Stack training at <strong>KodNest Technologies, BTM Layout, Bengaluru</strong>. There, I built scalable backends, designed normalized relational schemas, and refined algorithmic problem-solving.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              My mission is to contribute to high-impact product engineering teams at global software leaders like <strong>Google, Microsoft, OpenAI, Meta, Amazon, and Apple</strong>, while building reliable, user-focused solutions with strong engineering discipline.
            </p>

            {/* Spoken Languages Bar */}
            <div className="pt-4 border-t border-cyber-border space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-emerald flex items-center gap-2">
                <Globe className="w-4 h-4" /> Spoken Languages
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {profile.languages.map((lang) => (
                  <div key={lang.name} className="p-3 rounded-xl bg-cyber-dark border border-cyber-border text-center">
                    <div className="font-bold text-white text-sm">{lang.name}</div>
                    <div className="text-[10px] font-mono text-cyber-cyan">{lang.fluency}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Breakdown Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
              <GraduationCap className="w-5 h-5 text-cyber-emerald" />
              <span>Academic Credentials</span>
            </h3>

            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl bg-cyber-surface/60 border border-cyber-border space-y-2 hover:border-cyber-emerald/50 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyber-emerald">
                  <span>{edu.duration}</span>
                  <span className="px-2 py-0.5 rounded bg-cyber-dark border border-cyber-emerald/30 font-bold">
                    {edu.grade}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                <div className="text-xs text-slate-300 font-medium">{edu.institution}</div>
                {edu.affiliation && <div className="text-[11px] text-slate-400">{edu.affiliation}</div>}
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {edu.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
