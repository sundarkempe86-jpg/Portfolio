'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, Download, Printer, CheckCircle2, Sparkles, User, Edit3, Save, X } from 'lucide-react';
import { ResumeService, ResumeRoleProfile } from '@/services/ResumeService';
import { AnalyticsService } from '@/services/AnalyticsService';
import { useCMS } from '@/context/CmsContext';

interface ResumeEditorForm {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  resumeTitle: string;
  resumeSummary: string;
  resumeSkillsText: string;
}

export const ResumeModule: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<ResumeRoleProfile>('FULLSTACK');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ResumeEditorForm>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    resumeTitle: '',
    resumeSummary: '',
    resumeSkillsText: '',
  });
  const { state, editMode, updateCandidate } = useCMS();
  const tailoredResume = ResumeService.getTailoredResume(selectedRole, {
    candidate: state.candidate,
    projects: state.projects,
    education: state.education,
    experience: state.experience,
    certifications: state.certifications,
  });

  useEffect(() => {
    if (!isEditing) return;
    setForm({
      fullName: state.candidate.fullName,
      title: state.candidate.title,
      email: state.candidate.email,
      phone: state.candidate.phone,
      resumeTitle: state.candidate.resumeTitle || tailoredResume.profileTitle,
      resumeSummary: state.candidate.resumeSummary || tailoredResume.summary,
      resumeSkillsText: (state.candidate.resumeSkills && state.candidate.resumeSkills.length > 0
        ? state.candidate.resumeSkills
        : tailoredResume.topSkills).join(', '),
    });
  }, [isEditing, state.candidate, tailoredResume.profileTitle, tailoredResume.summary, tailoredResume.topSkills]);

  const handlePrint = () => {
    AnalyticsService.trackEvent('DOWNLOAD_RESUME', `Print/Download ${selectedRole}`);
    window.print();
  };

  const handleOpenEditor = () => {
    setForm({
      fullName: state.candidate.fullName,
      title: state.candidate.title,
      email: state.candidate.email,
      phone: state.candidate.phone,
      resumeTitle: state.candidate.resumeTitle || tailoredResume.profileTitle,
      resumeSummary: state.candidate.resumeSummary || tailoredResume.summary,
      resumeSkillsText: (state.candidate.resumeSkills && state.candidate.resumeSkills.length > 0
        ? state.candidate.resumeSkills
        : tailoredResume.topSkills).join(', '),
    });
    setIsEditing(true);
  };

  const handleSaveResume = () => {
    updateCandidate({
      fullName: form.fullName,
      title: form.title,
      email: form.email,
      phone: form.phone,
      resumeTitle: form.resumeTitle,
      resumeSummary: form.resumeSummary,
      resumeSkills: form.resumeSkillsText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
    setIsEditing(false);
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>DYNAMIC ATS RESUME BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Interactive ATS Resume Viewer
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Dynamically tailor Sundar&apos;s resume profile for specific target roles before printing or downloading as PDF.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 print:hidden">
          {(
            [
              { id: 'FULLSTACK', label: 'Full-Stack Developer' },
              { id: 'AIML', label: 'AI / ML Engineer' },
              { id: 'JAVA', label: 'Java Backend Engineer' },
              { id: 'CYBERSECURITY', label: 'Cybersecurity Analyst' },
            ] as { id: ResumeRoleProfile; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${selectedRole === tab.id
                  ? 'bg-cyber-emerald text-cyber-dark font-bold shadow-neon-emerald'
                  : 'bg-cyber-surface border border-cyber-border text-slate-300 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
          {editMode && (
            <button
              onClick={handleOpenEditor}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan text-xs font-mono font-bold hover:bg-cyber-cyan/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Resume</span>
            </button>
          )}
        </div>

        {/* Resume Preview Paper Document */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 border border-cyber-border space-y-8 shadow-2xl text-slate-200 print:bg-white print:text-black print:p-0 print:shadow-none font-sans">
          {editMode && isEditing && (
            <div className="rounded-2xl border border-cyber-cyan/40 bg-cyber-dark/70 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyber-cyan" /> Inline Resume Editor
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-slate-400">Full Name</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Professional Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400">Resume Header Title</label>
                  <input
                    value={form.resumeTitle}
                    onChange={(e) => setForm({ ...form, resumeTitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400">Resume Summary</label>
                  <textarea
                    rows={4}
                    value={form.resumeSummary}
                    onChange={(e) => setForm({ ...form, resumeSummary: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400">Top Skills (comma separated)</label>
                  <input
                    value={form.resumeSkillsText}
                    onChange={(e) => setForm({ ...form, resumeSkillsText: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button onClick={handleSaveResume} className="px-4 py-2 rounded-xl bg-cyber-cyan text-cyber-dark font-bold flex items-center gap-1.5 shadow-neon-cyan">
                  <Save className="w-4 h-4" /> Save Resume Updates
                </button>
              </div>
            </div>
          )}

          {/* Header Bar */}
          <div className="border-b border-slate-700 pb-6 print:border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display text-white print:text-black">
                {state.candidate.fullName}
              </h1>
              <p className="text-cyber-cyan font-mono text-sm font-bold print:text-blue-700">
                {tailoredResume.profileTitle}
              </p>
              <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
                Bidar / Bengaluru, KA, India • {state.candidate.email} • {state.candidate.phone}
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-emerald text-cyber-dark font-bold text-xs font-mono shadow-neon-emerald hover:opacity-95 print:hidden"
            >
              <Printer className="w-4 h-4" />
              <span>Download PDF / Print</span>
            </button>
          </div>

          {/* Profile Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-cyan print:text-black">
              Executive Summary
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
              {tailoredResume.summary}
            </p>
          </div>

          {/* Key Skill Highlights */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-cyan print:text-black">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {tailoredResume.topSkills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-cyber-emerald border border-slate-700 print:bg-gray-100 print:text-black print:border-gray-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-cyan print:text-black">
              Key Engineering Projects
            </h3>
            {tailoredResume.keyProjects.map((p) => (
              <div key={p.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-white print:text-black">
                  <span>{p.title}</span>
                  <span className="font-mono text-slate-400 print:text-gray-600">{p.year}</span>
                </div>
                <p className="text-slate-300 print:text-gray-700">{p.summary}</p>
                <div className="text-[11px] font-mono text-slate-400 print:text-gray-500">
                  Tech Stack: {p.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Education & Training */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-cyan print:text-black">
              Education & Professional Training
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-white print:text-black">
                <span>B.E. Computer Science & Engineering completed at GEC Bidar (VTU Belagavi) in 2026</span>
                <span className="font-mono text-cyber-emerald print:text-black">CGPA: 7.46 / 10.0</span>
              </div>
              <div className="flex justify-between text-slate-300 print:text-gray-700">
                <span>Offline Java Full Stack Trainee - KodNest Technologies Bengaluru</span>
                <span className="font-mono">Completed in 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
