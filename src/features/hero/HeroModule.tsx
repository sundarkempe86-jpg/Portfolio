'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Download, Briefcase, ChevronRight, Award, Code2, GraduationCap, Edit3, X, Save, Check } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';
import { useI18n } from '@/context/I18nContext';
import { AnalyticsService } from '@/services/AnalyticsService';

export const HeroModule: React.FC = () => {
  const { state, updateCandidate, editMode } = useCMS();
  const { candidate } = state;
  const { t } = useI18n();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(candidate);

  const roles = [
    'AI / Machine Learning Engineer',
    'Java Full-Stack Software Developer',
    'FastAPI & React Specialist',
    'Cybersecurity & Web Defense Enthusiast',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 70);
    }

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleSaveHero = () => {
    updateCandidate(form);
    setIsEditing(false);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-8 relative">
        {/* Inline Section Edit Trigger */}
        {editMode && (
          <div className="absolute top-0 right-0 z-20">
            <button
              onClick={() => {
                setForm(candidate);
                setIsEditing(!isEditing);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-indigo/20 border border-cyber-indigo text-cyber-cyan text-xs font-mono font-bold hover:bg-cyber-indigo/40 transition-all shadow-neon-indigo"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Hero Section</span>
            </button>
          </div>
        )}

        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-surface/90 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs shadow-neon-cyan backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-emerald animate-ping" />
          <span>{candidate.status}</span>
        </div>

        {/* Hero Main Heading & Dynamic Typewriter */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-none">
            {candidate.fullName}
          </h1>
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <span className="text-xl sm:text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-indigo">
              {displayText}
              <span className="animate-pulse text-cyber-cyan">|</span>
            </span>
          </div>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            {candidate.bio}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-cyber-surface/60 border border-cyber-border backdrop-blur-md space-y-1 hover:border-cyber-cyan/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-cyber-cyan font-display font-extrabold text-2xl">
              <GraduationCap className="w-5 h-5" /> {candidate.vtuCgpa}
            </div>
            <div className="text-[11px] font-mono text-slate-400">VTU BE CS CGPA</div>
          </div>

          <div className="p-4 rounded-2xl bg-cyber-surface/60 border border-cyber-border backdrop-blur-md space-y-1 hover:border-cyber-emerald/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-cyber-emerald font-display font-extrabold text-2xl">
              <Award className="w-5 h-5" /> 4+
            </div>
            <div className="text-[11px] font-mono text-slate-400">Verified Certifications</div>
          </div>

          <div className="p-4 rounded-2xl bg-cyber-surface/60 border border-cyber-border backdrop-blur-md space-y-1 hover:border-cyber-indigo/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-cyber-indigo font-display font-extrabold text-2xl">
              <Code2 className="w-5 h-5" /> 7+
            </div>
            <div className="text-[11px] font-mono text-slate-400">Live GitHub Repos</div>
          </div>

          <div className="p-4 rounded-2xl bg-cyber-surface/60 border border-cyber-border backdrop-blur-md space-y-1 hover:border-cyber-cyan/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-cyber-cyan font-display font-extrabold text-2xl">
              {candidate.usn || '3DG22CS049'}
            </div>
            <div className="text-[11px] font-mono text-slate-400">VTU USN</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-emerald text-cyber-dark font-bold text-sm shadow-neon-cyan hover:opacity-95 transition-all transform hover:-translate-y-0.5"
          >
            <span>{t('exploreProjects')}</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#recruiter"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyber-surface border border-cyber-cyan/40 text-cyber-cyan font-bold text-sm hover:bg-cyber-cyan/10 transition-all transform hover:-translate-y-0.5"
          >
            <Briefcase className="w-4 h-4" />
            <span>{t('recruiterDashboard')}</span>
          </a>

          <a
            href="#resume"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyber-surface border border-cyber-border text-slate-300 font-bold text-sm hover:text-white hover:border-slate-500 transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-cyber-emerald" />
            <span>{t('downloadResume')}</span>
          </a>
        </div>
      </div>

      {/* Hero Live Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-cyber-surface border border-cyber-border rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <h3 className="font-bold text-white text-sm font-display flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyber-cyan" /> Edit Hero Section Content
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400">Full Name:</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">VTU USN:</label>
                <input
                  type="text"
                  value={form.usn}
                  onChange={(e) => setForm({ ...form, usn: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">Status Badge Text:</label>
                <input
                  type="text"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">Bio Narrative:</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">VTU BE CS CGPA:</label>
                <input
                  type="text"
                  value={form.vtuCgpa}
                  onChange={(e) => setForm({ ...form, vtuCgpa: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-cyber-border flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHero}
                className="px-4 py-2 rounded-xl bg-cyber-cyan text-cyber-dark font-bold flex items-center gap-1.5 shadow-neon-cyan"
              >
                <Save className="w-4 h-4" /> Save Live Hero Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
