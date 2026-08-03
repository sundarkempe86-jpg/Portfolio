'use client';

import React, { useState } from 'react';
import { Code2, Brain, Coffee, Database, Layout, ShieldCheck, Cpu, GitBranch, Sparkles } from 'lucide-react';
import { CandidateService } from '@/services/CandidateService';

export const SkillsModule: React.FC = () => {
  const categories = CandidateService.getSkills();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filterCategories = ['All', ...categories.map((c) => c.category)];

  const displayedCategories =
    activeCategory === 'All'
      ? categories
      : categories.filter((c) => c.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-indigo/20 border border-cyber-indigo/40 text-cyber-cyan font-mono text-xs">
            <Code2 className="w-3.5 h-3.5" />
            <span>CORE COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Technical Skills & Proficiency Matrix
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Comprehensive breakdown across AI/ML & GenAI, Enterprise Java, Web Full-Stack, Relational SQL Databases, and Cybersecurity.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${activeCategory === cat
                  ? 'bg-gradient-to-r from-cyber-cyan to-cyber-indigo text-cyber-dark font-bold shadow-neon-cyan'
                  : 'bg-cyber-surface/80 border border-cyber-border text-slate-300 hover:text-white hover:border-slate-500'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-5 backdrop-blur-md hover:border-cyber-cyan/40 transition-all"
            >
              <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-cyber-border pb-3 font-display">
                <span>{cat.category}</span>
                <Sparkles className="w-4 h-4 text-cyber-cyan" />
              </h3>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{skill.name}</span>
                      <span className="font-mono text-cyber-emerald font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-cyber-dark overflow-hidden p-[1px] border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-indigo transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-cyber-dark/80 text-[10px] font-mono text-slate-400 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
