'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Code, BookOpen, User, Briefcase, Award, Sparkles } from 'lucide-react';
import { ProjectService } from '@/services/ProjectService';
import { CandidateService } from '@/services/CandidateService';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projects = ProjectService.getAllProjects();
  const skills = CandidateService.getSkills();

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const sections = [
    { title: 'Hero Landing', href: '#hero', icon: User },
    { title: 'About Sundar', href: '#about', icon: User },
    { title: 'Skills Matrix', href: '#skills', icon: Code },
    { title: 'Experience & Education', href: '#experience', icon: Briefcase },
    { title: 'Projects Showcase', href: '#projects', icon: Code },
    { title: 'System Design Flows', href: '#system-design', icon: Sparkles },
    { title: 'Certifications', href: '#certifications', icon: Award },
    { title: 'Blog Reader', href: '#blog', icon: BookOpen },
    { title: 'ATS Resume Builder', href: '#resume', icon: Briefcase },
    { title: 'Recruiter Dashboard', href: '#recruiter', icon: Briefcase },
  ];

  const filteredSections = sections.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-cyber-surface border border-cyber-border rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Search Header */}
        <div className="p-4 border-b border-cyber-border flex items-center gap-3">
          <Search className="w-5 h-5 text-cyber-cyan" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search sections, skills, projects (e.g. 'CyberGuard', 'FastAPI', 'Java')..."
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Section Navigation */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Site Navigation
            </h4>
            <div className="space-y-1">
              {filteredSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <a
                    key={sec.href}
                    href={sec.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-cyber-cyan transition-colors text-xs"
                  >
                    <Icon className="w-4 h-4 text-cyber-cyan" />
                    <span>{sec.title}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Matching Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Projects
              </h4>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <a
                    key={p.id}
                    href="#projects"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-cyber-emerald transition-colors text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{p.title}</div>
                      <div className="text-[10px] text-slate-400">{p.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-dark text-cyber-emerald border border-cyber-emerald/30">
                      {p.year}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-cyber-dark border-t border-cyber-border text-right text-[10px] font-mono text-slate-500">
          Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};
