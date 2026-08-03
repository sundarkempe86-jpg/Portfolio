'use client';

import React, { useState } from 'react';
import { Code, ExternalLink, Github, Sparkles, X, ChevronRight, Layers, Cpu, ShieldCheck, CheckCircle2, Edit3, Plus, Trash2, Save } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';
import { Project } from '@/types';
import { AnalyticsService } from '@/services/AnalyticsService';

export const ProjectsModule: React.FC = () => {
  const { state, editMode, updateProjectItem, addProjectItem, deleteProjectItem } = useCMS();
  const { projects } = state;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Editing modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const emptyProject: Project = {
    id: `project-${Date.now()}`,
    title: 'New Project Title',
    subtitle: 'Subtitle / Core Description',
    year: '2026',
    category: 'AI/ML & Web',
    summary: 'Detailed summary of the new software engineering project.',
    techStack: ['React', 'Node.js', 'Python'],
    githubUrl: 'https://github.com/sundarkempe86-jpg',
    liveUrl: '#',
    featured: true,
    metrics: { accuracy: '95%', latency: '< 50ms' },
    caseStudy: {
      problem: 'Problem statement description.',
      research: 'Research approach.',
      architecture: 'System architecture design.',
      challenges: 'Key technical challenge.',
      solutions: 'Engineered solution.',
      performance: 'Performance metric.',
      lessonsLearned: 'Key lesson learned.',
    },
  };

  const handleOpenCaseStudy = (proj: Project) => {
    setSelectedProject(proj);
    AnalyticsService.trackEvent('PROJECT_VIEW', proj.title);
  };

  const handleSaveProject = () => {
    if (editingProject) {
      if (isAdding) {
        addProjectItem(editingProject);
      } else {
        updateProjectItem(editingProject.id, editingProject);
      }
      setEditingProject(null);
      setIsAdding(false);
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Edit Mode Button */}
        <div className="text-center space-y-3 relative">
          {editMode && (
            <div className="absolute right-0 top-0 flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingProject(emptyProject);
                  setIsAdding(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-emerald/20 border border-cyber-emerald text-cyber-emerald text-xs font-mono font-bold hover:bg-cyber-emerald/40 transition-all shadow-neon-emerald"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs">
            <Code className="w-3.5 h-3.5" />
            <span>REAL GITHUB REPOSITORIES & SOFTWARE PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Engineering Projects & Case Studies
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Deep technical case studies covering CyberGuard, ExpenseIQ, NexusHR-AI, CashFlow-IQ, and Reactive-Resume.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-5 backdrop-blur-md hover:border-cyber-cyan/50 transition-all flex flex-col justify-between group relative"
            >
              {/* Per-card edit buttons when Edit Mode is active */}
              {editMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingProject(proj);
                      setIsAdding(false);
                    }}
                    className="p-1.5 rounded-lg bg-cyber-indigo/30 border border-cyber-indigo text-cyber-cyan hover:bg-cyber-indigo text-xs"
                    title="Edit this project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteProjectItem(proj.id)}
                    className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-400 hover:bg-rose-500/40 text-xs"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyber-dark text-cyber-cyan text-[11px] font-mono border border-cyber-cyan/30 font-bold">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{proj.year}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors font-display">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-cyber-emerald font-mono mt-0.5">{proj.subtitle}</p>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{proj.summary}</p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-cyber-dark/90 text-[10px] font-mono text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-cyber-border flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenCaseStudy(proj)}
                  className="flex items-center gap-1 text-[11px] font-bold text-cyber-cyan hover:underline font-mono"
                >
                  <span>Architectural Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {proj.liveUrl && proj.liveUrl !== '#' && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => AnalyticsService.trackEvent('LIVE_DEMO_CLICK', proj.title)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyber-emerald/20 border border-cyber-emerald text-cyber-emerald text-[10px] font-mono font-bold hover:bg-cyber-emerald/40 transition-all"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => AnalyticsService.trackEvent('GITHUB_CLICK', proj.title)}
                    className="p-1.5 rounded-lg bg-cyber-dark border border-cyber-border text-slate-400 hover:text-white hover:border-cyber-cyan transition-all"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-cyber-surface border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-cyber-border pb-4">
              <div>
                <span className="text-xs font-mono text-cyber-cyan font-bold uppercase">
                  {selectedProject.category} • {selectedProject.year}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-cyber-emerald font-mono mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-cyber-dark border border-cyber-border text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Performance Metrics Row */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-cyber-dark border border-cyber-border font-mono text-xs">
              {Object.entries(selectedProject.metrics).map(([key, val]) => (
                <div key={key} className="space-y-0.5 text-center">
                  <div className="text-slate-400 capitalize text-[10px]">{key}</div>
                  <div className="font-bold text-cyber-emerald text-sm sm:text-base">{val}</div>
                </div>
              ))}
            </div>

            {/* Case Study Detailed Breakdown */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="space-y-1">
                <h4 className="font-bold text-white flex items-center gap-2 font-display text-sm">
                  <Layers className="w-4 h-4 text-cyber-cyan" /> 1. Problem Statement & Research
                </h4>
                <p className="text-slate-300">{selectedProject.caseStudy.problem}</p>
                <p className="text-slate-400">{selectedProject.caseStudy.research}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-white flex items-center gap-2 font-display text-sm">
                  <Cpu className="w-4 h-4 text-cyber-emerald" /> 2. System Architecture
                </h4>
                <p className="text-slate-300">{selectedProject.caseStudy.architecture}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-white flex items-center gap-2 font-display text-sm">
                  <ShieldCheck className="w-4 h-4 text-cyber-indigo" /> 3. Challenges & Solutions
                </h4>
                <p><strong className="text-slate-200">Challenge:</strong> {selectedProject.caseStudy.challenges}</p>
                <p><strong className="text-slate-200">Solution:</strong> {selectedProject.caseStudy.solutions}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-white flex items-center gap-2 font-display text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyber-cyan" /> 4. Performance & Lessons
                </h4>
                <p className="text-slate-300">{selectedProject.caseStudy.performance}</p>
                <p className="text-slate-400 italic">{selectedProject.caseStudy.lessonsLearned}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-cyber-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-dark border border-cyber-cyan text-cyber-cyan text-xs font-mono font-bold hover:bg-cyber-cyan/10"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => AnalyticsService.trackEvent('LIVE_DEMO_CLICK', selectedProject.title)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-emerald/20 border border-cyber-emerald text-cyber-emerald text-xs font-mono font-bold hover:bg-cyber-emerald/40 transition-all shadow-neon-emerald"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>🚀 Try Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-cyber-surface border border-cyber-border text-slate-300 text-xs font-mono hover:text-white"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-cyber-surface border border-cyber-border rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs text-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <h3 className="font-bold text-white text-sm font-display flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyber-cyan" />
                {isAdding ? 'Add New Project Entry' : `Edit "${editingProject.title}"`}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400">Project Title:</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">Subtitle:</label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">Category:</label>
                <input
                  type="text"
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-slate-400">Year:</label>
                <input
                  type="text"
                  value={editingProject.year}
                  onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400">GitHub Repository URL:</label>
              <input
                type="text"
                value={editingProject.githubUrl}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div>
              <label className="text-slate-400">Summary:</label>
              <textarea
                rows={2}
                value={editingProject.summary}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div>
              <label className="text-slate-400">Tech Stack (comma separated):</label>
              <input
                type="text"
                value={editingProject.techStack.join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    techStack: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div className="pt-3 border-t border-cyber-border flex justify-end gap-3">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 rounded-xl bg-cyber-emerald text-cyber-dark font-bold flex items-center gap-1 shadow-neon-emerald"
              >
                <Save className="w-4 h-4" /> Save Project Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
