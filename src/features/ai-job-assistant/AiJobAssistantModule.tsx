'use client';

import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, Download, Copy, Check } from 'lucide-react';
import { CandidateService } from '@/services/CandidateService';

export const AiJobAssistantModule: React.FC = () => {
  const profile = CandidateService.getProfile();
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);

  const handleGenerateCoverLetter = () => {
    if (!companyName || !jobTitle) return;

    const letter = `Dear Hiring Manager at ${companyName},

I am writing to express my enthusiastic interest in the ${jobTitle} position at ${companyName}. As a Computer Science & Engineering graduate from Government Engineering College Bidar (VTU, 7.0 CGPA) and an offline Java Full-Stack trainee at KodNest Technologies Bengaluru, my background in Python Machine Learning, FastAPI, Enterprise Java 17+, and React aligns directly with your engineering requirements.

In my recent project, CyberGuard, I developed a real-time malicious URL detection system using FastAPI and Scikit-Learn that achieved 98.4% accuracy with sub-45ms latency. Additionally, my work on DormX demonstrates my ability to design normalized PostgreSQL schemas and responsive React front-ends.

I hold verified certifications in Microsoft Azure AI Fundamentals, Azure AI Foundry Generative AI, and Cisco Endpoint Security. I welcome the opportunity to discuss how my technical skills can drive value for ${companyName}.

Sincerely,
Sundar Raj Kempe
sundarkempe86@gmail.com | +91 8618860789
github.com/sundarkempe86-jpg`;

    setGeneratedDraft(letter);
    setUserConfirmed(false);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-job-assistant" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI JOB ASSISTANT (USER-REVIEWED ONLY)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Tailored Cover Letter Generator
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Generates custom application drafts based on target role requirements. Strictly requires explicit user review before copying or submitting.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-6 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Target Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google, Microsoft, OpenAI"
                className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-emerald font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Target Job Title:</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. AI / ML Engineer, Java Software Engineer"
                className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-emerald font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateCoverLetter}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-emerald to-cyber-cyan text-cyber-dark font-bold text-xs font-mono shadow-neon-emerald hover:opacity-95"
          >
            Generate Tailored Cover Letter Draft
          </button>

          {/* Generated Output */}
          {generatedDraft && (
            <div className="space-y-4 pt-4 border-t border-cyber-border">
              {/* Security Review Warning Alert */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Explicit Safety Rule: Please review the generated text below carefully before copying or sending.</span>
              </div>

              <textarea
                value={generatedDraft}
                onChange={(e) => setGeneratedDraft(e.target.value)}
                className="w-full h-64 p-4 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-slate-200 focus:outline-none font-mono leading-relaxed"
              />

              {/* User Confirmation Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="userConfirm"
                  checked={userConfirmed}
                  onChange={(e) => setUserConfirmed(e.target.checked)}
                  className="rounded border-slate-700 text-cyber-emerald focus:ring-cyber-emerald bg-cyber-dark"
                />
                <label htmlFor="userConfirm" className="text-xs font-mono text-slate-300">
                  I have reviewed and approved this cover letter content.
                </label>
              </div>

              <button
                disabled={!userConfirmed}
                onClick={handleCopyDraft}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs font-mono transition-all ${userConfirmed
                    ? 'bg-cyber-cyan text-cyber-dark shadow-neon-cyan'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
              >
                {copied ? <Check className="w-4 h-4 text-cyber-emerald" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Reviewed Draft'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
