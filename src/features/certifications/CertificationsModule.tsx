'use client';

import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, Edit3, Plus, Trash2, X, Save } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';
import { Certification } from '@/types';

export const CertificationsModule: React.FC = () => {
  const { state, editMode, updateCertifications } = useCMS();
  const { certifications } = state;

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const emptyCert: Certification = {
    id: `cert-${Date.now()}`,
    title: 'New Certification Title',
    issuer: 'Issuing Organization',
    issueDate: '2026',
    credentialId: 'VERIFIED-ID-123',
    badgeUrl: '',
    skills: ['Skill 1', 'Skill 2'],
    verified: true,
  };

  const handleSaveCert = () => {
    if (editingCert) {
      if (isAdding) {
        updateCertifications([editingCert, ...certifications]);
      } else {
        const updated = certifications.map((c) => (c.id === editingCert.id ? editingCert : c));
        updateCertifications(updated);
      }
      setEditingCert(null);
      setIsAdding(false);
    }
  };

  const handleDeleteCert = (id: string) => {
    updateCertifications(certifications.filter((c) => c.id !== id));
  };

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 relative">
          {editMode && (
            <div className="absolute right-0 top-0">
              <button
                onClick={() => {
                  setEditingCert(emptyCert);
                  setIsAdding(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-emerald/20 border border-cyber-emerald text-cyber-emerald text-xs font-mono font-bold hover:bg-cyber-emerald/40 transition-all shadow-neon-emerald"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certificate</span>
              </button>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED INDUSTRY & UNIVERSITY CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Certifications & Badges
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            VTU Belagavi Elite GOLD (React & Python Internship), KGTTI Kalaburagi Cyber Security, Cisco Endpoint Security, and Azure AI Foundry SDK.
          </p>
        </div>

        {/* Certifications Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-4 backdrop-blur-md hover:border-cyber-emerald/50 transition-all flex flex-col justify-between group relative"
            >
              {editMode && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingCert(cert);
                      setIsAdding(false);
                    }}
                    className="p-1.5 rounded-lg bg-cyber-indigo/30 border border-cyber-indigo text-cyber-cyan hover:bg-cyber-indigo text-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCert(cert.id)}
                    className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-400 hover:bg-rose-500/40 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyber-dark border border-cyber-emerald/40 flex items-center justify-center text-cyber-emerald font-bold font-display shadow-neon-emerald">
                  <Award className="w-6 h-6 text-cyber-emerald" />
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyber-emerald transition-colors font-display">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono text-cyber-cyan mt-1">{cert.issuer}</div>
                </div>

                <div className="text-[11px] font-mono text-slate-400">Issued: {cert.issueDate}</div>

                {/* Verified Tag */}
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-[10px] font-mono font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Verified Credential
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-cyber-dark text-[10px] font-mono text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-cyber-border text-[10px] font-mono text-slate-500">
                ID: {cert.credentialId}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Dynamic Editor Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-cyber-surface border border-cyber-border rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <h3 className="font-bold text-white text-sm font-display flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyber-emerald" />
                {isAdding ? 'Add New Certificate' : `Edit "${editingCert.title}"`}
              </h3>
              <button onClick={() => setEditingCert(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400">Title:</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-emerald"
                />
              </div>

              <div>
                <label className="text-slate-400">Issuer:</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-emerald"
                />
              </div>

              <div>
                <label className="text-slate-400">Issue Date:</label>
                <input
                  type="text"
                  value={editingCert.issueDate}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-emerald"
                />
              </div>

              <div>
                <label className="text-slate-400">Credential ID / Number:</label>
                <input
                  type="text"
                  value={editingCert.credentialId}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-emerald"
                />
              </div>

              <div>
                <label className="text-slate-400">Skills Covered (comma separated):</label>
                <input
                  type="text"
                  value={editingCert.skills.join(', ')}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      skills: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="w-full p-2 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-emerald"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-cyber-border flex justify-end gap-3">
              <button
                onClick={() => setEditingCert(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCert}
                className="px-4 py-2 rounded-xl bg-cyber-emerald text-cyber-dark font-bold flex items-center gap-1 shadow-neon-emerald"
              >
                <Save className="w-4 h-4" /> Save Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
