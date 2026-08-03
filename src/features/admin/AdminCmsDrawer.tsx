'use client';

import React, { useState } from 'react';
import { Settings, X, Save, RotateCcw, Check, Download, Upload, Sparkles, FileCode } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';

interface AdminCmsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCmsDrawer: React.FC<AdminCmsDrawerProps> = ({ isOpen, onClose }) => {
  const { state, updateCandidate, resetToFactoryDefaults, exportJSON, importJSON } = useCMS();
  const { candidate } = state;

  const [form, setForm] = useState(candidate);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync form when drawer opens or candidate changes externally
  React.useEffect(() => {
    if (isOpen) setForm(candidate);
  }, [isOpen, candidate]);
  const [importText, setImportText] = useState('');
  const [importMsg, setImportMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    updateCandidate(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExport = () => {
    const jsonStr = exportJSON();
    navigator.clipboard.writeText(jsonStr);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleImport = () => {
    const ok = importJSON(importText);
    if (ok) {
      setImportMsg('Successfully imported portfolio data!');
      setTimeout(() => {
        setImportMsg('');
        onClose();
      }, 1500);
    } else {
      setImportMsg('Invalid JSON format. Please check syntax.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-cyber-surface border-l border-cyber-border h-full p-6 space-y-6 shadow-2xl overflow-y-auto font-sans">
        <div className="flex items-center justify-between border-b border-cyber-border pb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyber-indigo" />
            <h3 className="font-bold text-white text-base font-display">Master Dynamic CMS Drawer</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-3 text-xs font-mono">
          <div>
            <label className="text-slate-300">Full Name:</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>

          <div>
            <label className="text-slate-300">VTU USN:</label>
            <input
              type="text"
              value={form.usn}
              onChange={(e) => setForm({ ...form, usn: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>

          <div>
            <label className="text-slate-300">LinkedIn Profile Link:</label>
            <input
              type="text"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>

          <div>
            <label className="text-slate-300">GitHub Profile Link:</label>
            <input
              type="text"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>

          <div>
            <label className="text-slate-300">Contact Email:</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>

          <div>
            <label className="text-slate-300">Contact Phone:</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>

          <div>
            <label className="text-slate-300">Status Badge Text:</label>
            <input
              type="text"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
          </div>
        </div>

        {/* Export & Import JSON section */}
        <div className="pt-4 border-t border-cyber-border space-y-3 font-mono text-xs">
          <h4 className="font-bold text-white uppercase text-[11px]">JSON Data Export & Backup</h4>
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-cyber-dark border border-cyber-cyan text-cyber-cyan font-bold hover:bg-cyber-cyan/10"
          >
            <Download className="w-4 h-4" /> Copy Entire Portfolio JSON State
          </button>

          <div className="space-y-1 pt-2">
            <label className="text-slate-400">Import Portfolio JSON:</label>
            <textarea
              rows={3}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste exported portfolio JSON structure here..."
              className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white focus:outline-none focus:border-cyber-indigo"
            />
            <button
              onClick={handleImport}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-cyber-surface border border-cyber-border text-slate-200 hover:text-white font-bold"
            >
              <Upload className="w-4 h-4" /> Import Portfolio JSON
            </button>
            {importMsg && <div className="text-[11px] text-cyber-emerald text-center">{importMsg}</div>}
          </div>
        </div>

        {/* CMS Actions */}
        <div className="pt-4 border-t border-cyber-border space-y-2.5 font-mono">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-cyber-indigo text-white font-bold text-xs shadow-neon-indigo hover:opacity-90"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-cyber-emerald" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved to LocalStorage!' : 'Save CMS Updates'}</span>
          </button>

          <button
            onClick={() => {
              resetToFactoryDefaults();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-cyber-dark border border-cyber-border text-slate-400 hover:text-white text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
