'use client';

import React, { useState } from 'react';
import { Layers, Database, ArrowRight, Server, Shield, Cpu, Sparkles } from 'lucide-react';

export const SystemDesignModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cyberguard' | 'dormx' | 'expense'>('cyberguard');

  return (
    <section id="system-design" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-indigo/20 border border-cyber-indigo/40 text-cyber-cyan font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURE & FLOW DIAGRAMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            System Design & Data Pipeline Visualizers
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Interactive system architecture, database ER diagrams, and microservice sequence flows representing enterprise product engineering patterns.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setActiveTab('cyberguard')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'cyberguard'
                ? 'bg-cyber-cyan text-cyber-dark shadow-neon-cyan'
                : 'bg-cyber-surface border border-cyber-border text-slate-400 hover:text-white'
            }`}
          >
            CyberGuard AI Flow
          </button>
          <button
            onClick={() => setActiveTab('dormx')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'dormx'
                ? 'bg-cyber-emerald text-cyber-dark shadow-neon-emerald'
                : 'bg-cyber-surface border border-cyber-border text-slate-400 hover:text-white'
            }`}
          >
            DormX PostgreSQL ER Diagram
          </button>
          <button
            onClick={() => setActiveTab('expense')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === 'expense'
                ? 'bg-cyber-indigo text-white shadow-neon-indigo'
                : 'bg-cyber-surface border border-cyber-border text-slate-400 hover:text-white'
            }`}
          >
            Expense Tracker SQL Pipeline
          </button>
        </div>

        {/* Diagram Canvas Panel */}
        <div className="p-6 sm:p-10 rounded-2xl bg-cyber-surface/70 border border-cyber-border backdrop-blur-md space-y-6">
          {activeTab === 'cyberguard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display">
                  CyberGuard: Real-Time FastAPI & Machine Learning Inference Flow
                </h3>
                <span className="text-xs font-mono text-cyber-cyan font-bold">Latency Target: &lt;45ms</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center font-mono text-xs">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-cyan/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyber-cyan/20 text-cyber-cyan mx-auto flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="font-bold text-white">Client UI (React 19)</div>
                  <p className="text-[10px] text-slate-400">Sends target URL string via HTTP POST</p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-emerald/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyber-emerald/20 text-cyber-emerald mx-auto flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="font-bold text-white">FastAPI Async Gateway</div>
                  <p className="text-[10px] text-slate-400">Pydantic validation & feature vector extraction</p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-indigo/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyber-indigo/20 text-cyber-indigo mx-auto flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="font-bold text-white">Scikit-Learn Model</div>
                  <p className="text-[10px] text-slate-400">Random Forest & TF-IDF probability score</p>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-emerald/40 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyber-emerald/20 text-cyber-emerald mx-auto flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="font-bold text-white">Security Verdict</div>
                  <p className="text-[10px] text-slate-400">Returns 98.4% malicious threat response</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dormx' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display">
                  DormX: PostgreSQL Relational Database Schema & Spatial Indexing
                </h3>
                <span className="text-xs font-mono text-cyber-emerald font-bold">VTU Student Housing</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-2">
                  <div className="font-bold text-cyber-cyan border-b border-slate-800 pb-1">
                    Table: Users (Students / Owners)
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div>id: UUID (PK)</div>
                    <div>vtu_usn: VARCHAR(10) UNIQUE</div>
                    <div>email: VARCHAR(255)</div>
                    <div>role: ENUM(&apos;STUDENT&apos;, &apos;OWNER&apos;)</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-2">
                  <div className="font-bold text-cyber-emerald border-b border-slate-800 pb-1">
                    Table: Listings (PG Accommodations)
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div>id: UUID (PK)</div>
                    <div>owner_id: UUID (FK Users)</div>
                    <div>monthly_rent: DECIMAL</div>
                    <div>distance_to_vtu_km: FLOAT</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-2">
                  <div className="font-bold text-cyber-indigo border-b border-slate-800 pb-1">
                    Table: Bookings (Transactions)
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div>id: UUID (PK)</div>
                    <div>student_id: UUID (FK)</div>
                    <div>listing_id: UUID (FK)</div>
                    <div>status: ENUM(&apos;PENDING&apos;, &apos;CONFIRMED&apos;)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expense' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white font-display">
                  Automated Personal Expense Tracker: Python ETL Data Pipeline
                </h3>
                <span className="text-xs font-mono text-cyber-indigo font-bold">SQL Categorization</span>
              </div>

              <p className="text-xs text-slate-300">
                Data pipeline ingests CSV transaction dumps, executes regex merchant string matching, computes SQL aggregation views, and renders monthly budget dashboards in sub-5ms latency.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
