'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Copy, Check, Calculator, Sparkles, UserCheck, ChevronRight } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';
import { TFIDFMatcher } from '@/lib/ai/jd-matcher/tfidfMatcher';
import { MatchResult } from '@/lib/ai/interfaces';
import { InterviewSimulatorEngine } from '@/lib/ai/interview/simulatorEngine';
import { InterviewQuestion } from '@/types';

export const RecruiterDashboardModule: React.FC = () => {
  const { state } = useCMS();
  const profile = state.candidate;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  // Tab control
  const [activeTab, setActiveTab] = useState<'jd' | 'interview'>('jd');

  // JD Matcher State
  const [sampleJd, setSampleJd] = useState('');
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  // Interview Simulator State
  const [selectedRole, setSelectedRole] = useState('AI / ML Engineer');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    const qList = InterviewSimulatorEngine.getQuestionsForRole(selectedRole);
    setQuestions(qList);
    setCurrentQIndex(0);
    setUserAnswer('');
    setEvaluation(null);
  }, [selectedRole]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCalculateMatch = () => {
    const result = TFIDFMatcher.calculateMatch(sampleJd, state.skills);
    setMatchResult(result);
  };

  return (
    <section id="recruiter" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>RECRUITER ENGINE & SNAPSHOT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            1-Click Candidate Recruiter Dashboard
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Instant candidate snapshot, dynamic role skill-match calculator, contact copy, and hiring metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Candidate Snapshot & Contact */}
          <div className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-6 backdrop-blur-md h-fit">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyber-cyan to-cyber-emerald p-[2px] shadow-neon-cyan">
                <div className="w-full h-full bg-cyber-dark rounded-[10px] flex items-center justify-center font-bold text-cyber-cyan font-display">
                  SR
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg font-display">{profile.fullName}</h3>
                <div className="text-[11px] font-mono text-cyber-emerald">{profile.status}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-cyber-dark border border-cyber-border space-y-1">
                <div className="text-slate-400">VTU B.E. CS Degree (2022–2026)</div>
                <div className="font-bold text-cyber-cyan">CGPA: {profile.vtuCgpa}</div>
              </div>

              <div className="p-3 rounded-xl bg-cyber-dark border border-cyber-border space-y-1">
                <div className="text-slate-400">KodNest Offline Training</div>
                <div className="font-bold text-cyber-emerald">Java Full Stack & DSA</div>
              </div>
            </div>

            {/* Copy Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-cyber-dark border border-cyber-border text-xs font-mono hover:border-cyber-cyan text-slate-200 transition-all"
              >
                <span>{profile.email}</span>
                {copiedEmail ? <Check className="w-4 h-4 text-cyber-emerald" /> : <Copy className="w-4 h-4 text-cyber-cyan" />}
              </button>

              <button
                onClick={handleCopyPhone}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-cyber-dark border border-cyber-border text-xs font-mono hover:border-cyber-cyan text-slate-200 transition-all"
              >
                <span>{profile.phone}</span>
                {copiedPhone ? <Check className="w-4 h-4 text-cyber-emerald" /> : <Copy className="w-4 h-4 text-cyber-cyan" />}
              </button>
            </div>
          </div>

          {/* Column 2 & 3: Interactive Selector Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-6 backdrop-blur-md">
            
            {/* Tab navigation */}
            <div className="flex border-b border-cyber-border text-xs font-mono gap-1">
              <button
                onClick={() => setActiveTab('jd')}
                className={`px-4 py-2.5 rounded-t-xl transition-all border-t border-l border-r ${
                  activeTab === 'jd'
                    ? 'bg-cyber-dark border-cyber-border text-cyber-cyan font-bold font-display'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                1-Click JD Scorer
              </button>
              <button
                onClick={() => setActiveTab('interview')}
                className={`px-4 py-2.5 rounded-t-xl transition-all border-t border-l border-r ${
                  activeTab === 'interview'
                    ? 'bg-cyber-dark border-cyber-border text-cyber-emerald font-bold font-display'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                AI Mock Interview Simulator
              </button>
            </div>

            {/* TAB CONTENT: JD Matcher */}
            {activeTab === 'jd' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                    <Calculator className="w-4 h-4 text-cyber-cyan" />
                    <span>Dynamic Candidate Skill-Match Scorer</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyber-emerald">100% Client TF-IDF Vector Algorithm</span>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono text-slate-300">
                    Paste your Job Description (JD) text below to calculate exact dynamic percentage match:
                  </label>
                  <textarea
                    value={sampleJd}
                    onChange={(e) => setSampleJd(e.target.value)}
                    placeholder="Paste Job Description here (e.g. 'Looking for a Java developer with Python, FastAPI, React, SQL, and Machine Learning background...')"
                    className="w-full h-32 p-3 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                  />
                  <button
                    onClick={handleCalculateMatch}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-emerald text-cyber-dark font-bold text-xs font-mono shadow-neon-cyan hover:opacity-95"
                  >
                    Calculate Role Match Score
                  </button>
                </div>

                {/* Match Results Display */}
                {matchResult && (
                  <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Candidate Match Score:</span>
                      <span className="text-2xl font-bold text-cyber-emerald">{matchResult.score}%</span>
                    </div>

                    <div>
                      <div className="text-slate-400 font-bold mb-1">Matching Technical Skills:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.matchingSkills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-cyber-emerald/20 text-cyber-emerald border border-cyber-emerald/30">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-slate-400 font-bold">Recommendations:</div>
                      {matchResult.recommendations.map((r, i) => (
                        <div key={i} className="text-slate-300 text-[11px]">• {r}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: AI Mock Interview Simulator */}
            {activeTab === 'interview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                    <Sparkles className="w-4 h-4 text-cyber-emerald" />
                    <span>AI Technical Mock Interview Simulator</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyber-cyan">NLP Matching Engine</span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <label className="text-xs font-mono text-slate-300">Choose Mock Interview Role Focus:</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-white focus:outline-none focus:border-cyber-emerald font-mono"
                    >
                      {InterviewSimulatorEngine.getRoles().map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {questions.length > 0 && (
                    <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-mono text-cyber-cyan font-bold uppercase">
                          Question {currentQIndex + 1} of {questions.length}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Local evaluation engine</span>
                      </div>

                      <p className="text-sm font-bold text-white leading-relaxed font-display">
                        {questions[currentQIndex]?.question}
                      </p>

                      <textarea
                        rows={4}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your technical response here... (Try to include key technologies, libraries, and design patterns)"
                        className="w-full p-3 rounded-xl bg-cyber-surface border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-emerald font-mono leading-relaxed"
                      />

                      <div className="flex items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => {
                            const res = InterviewSimulatorEngine.evaluateAnswer(
                              questions[currentQIndex].id,
                              userAnswer
                            );
                            setEvaluation(res);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-cyber-emerald text-cyber-dark font-bold text-xs font-mono shadow-neon-emerald hover:opacity-95"
                        >
                          Submit Answer for AI Evaluation
                        </button>

                        {currentQIndex < questions.length - 1 && (
                          <button
                            onClick={() => {
                              setCurrentQIndex(currentQIndex + 1);
                              setUserAnswer('');
                              setEvaluation(null);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border text-slate-300 text-xs font-mono hover:text-white flex items-center gap-1"
                          >
                            <span>Skip</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interview evaluation display */}
                  {evaluation && (
                    <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-4 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Answer Score:</span>
                        <span className="text-2xl font-bold text-cyber-emerald">{evaluation.score}%</span>
                      </div>

                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-white">AI Feedback:</strong> {evaluation.feedback}
                      </p>

                      {evaluation.matchedKeywords.length > 0 && (
                        <div>
                          <div className="text-slate-400 font-bold mb-1 text-[11px]">Keywords Matched:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {evaluation.matchedKeywords.map((kw: string) => (
                              <span key={kw} className="px-2 py-0.5 rounded bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-[10px]">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {evaluation.missingKeywords.length > 0 && (
                        <div>
                          <div className="text-slate-400 font-bold mb-1 text-[11px]">Suggested Keywords to Cover:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {evaluation.missingKeywords.map((kw: string) => (
                              <span key={kw} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px]">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
                        <span>Check Sample Ideal Answer</span>
                        <button
                          onClick={() => alert(`Sample Ideal Response:\n\n${questions[currentQIndex].sampleAnswer}`)}
                          className="text-cyber-cyan hover:underline font-bold"
                        >
                          View Ideal Sample Answer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
