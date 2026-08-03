'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mic, Settings, Briefcase, Menu, X, Edit3, Lock, LogOut } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenVoice: () => void;
  onOpenAdminCms: () => void;
}

const OWNER_EMAIL = 'sundarkempe86@gmail.com';
const OWNER_PASS = 'SundarRaj@861';

function OwnerLoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = () => {
    if (email.trim().toLowerCase() === OWNER_EMAIL && pass === OWNER_PASS) {
      onSuccess();
    } else {
      setErr('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-sm bg-cyber-surface border border-cyber-border rounded-2xl p-6 space-y-4 shadow-2xl font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyber-indigo">
            <Lock className="w-4 h-4" />
            <span className="font-bold text-white text-sm">Owner Login</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white text-xs focus:outline-none focus:border-cyber-indigo"
        />
        <input
          type="password"
          placeholder="Passcode"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="w-full p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-white text-xs focus:outline-none focus:border-cyber-indigo"
        />
        {err && <p className="text-red-400 text-[11px]">{err}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-2.5 rounded-xl bg-cyber-indigo text-white font-bold text-xs hover:opacity-90"
        >
          Unlock Edit Mode
        </button>
      </div>
    </div>
  );
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenVoice,
  onOpenAdminCms,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { editMode, setEditMode, state } = useCMS();

  const handleEditClick = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      setLoginModalOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'System Design', href: '#system-design' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Blog', href: '#blog' },
    { name: 'Resume', href: '#resume' },
    { name: 'Recruiter', href: '#recruiter' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {loginModalOpen && (
        <OwnerLoginModal
          onClose={() => setLoginModalOpen(false)}
          onSuccess={() => { setEditMode(true); setLoginModalOpen(false); }}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-cyber-dark/85 backdrop-blur-md border-b border-cyber-border py-3 shadow-glass' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-cyan via-cyber-indigo to-cyber-emerald p-[2px] shadow-neon-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-cyber-dark rounded-[10px] flex items-center justify-center font-display font-bold text-cyber-cyan text-lg">
                SR
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyber-cyan">
                {state.candidate.fullName}
              </span>
              <span className="block text-[10px] text-cyber-emerald font-mono tracking-wider">
                USN: {state.candidate.usn || '3DG22CS049'}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-slate-300">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-cyber-cyan transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Edit Mode Toggle */}
            <button
              onClick={handleEditClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                editMode
                  ? 'bg-cyber-indigo/20 border-cyber-indigo text-cyber-cyan shadow-neon-indigo'
                  : 'bg-cyber-surface border-cyber-border text-slate-400 hover:text-white'
              }`}
              title="Toggle Owner Edit Mode"
            >
              {editMode ? <LogOut className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{editMode ? 'Exit Edit' : 'Owner Login'}</span>
            </button>

            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-surface/80 border border-cyber-border text-slate-400 hover:text-white hover:border-cyber-cyan transition-all text-xs font-mono"
              title="Search Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyber-cyan" />
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">Ctrl+K</kbd>
            </button>

            <button
              onClick={onOpenVoice}
              className="p-2 rounded-lg bg-cyber-surface/80 border border-cyber-border text-slate-400 hover:text-cyber-emerald hover:border-cyber-emerald transition-all"
              title="Voice Commands"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* CMS Drawer — only visible when owner is logged in */}
            {editMode && (
              <button
                onClick={onOpenAdminCms}
                className="p-2 rounded-lg bg-cyber-indigo/20 border border-cyber-indigo text-cyber-indigo hover:opacity-80 transition-all"
                title="Master CMS Drawer"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            <a
              href="#recruiter"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-emerald text-cyber-dark font-bold text-xs shadow-neon-cyan hover:opacity-95 transition-opacity"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Recruiter</span>
            </a>
          </div>

          {/* Mobile */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={handleEditClick}
              className={`p-2 rounded-lg border text-xs ${
                editMode ? 'bg-cyber-indigo/20 border-cyber-indigo text-cyber-cyan' : 'bg-cyber-surface border-cyber-border text-slate-400'
              }`}
            >
              {editMode ? <LogOut className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-cyber-surface border border-cyber-border text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-cyber-dark/95 backdrop-blur-xl border-b border-cyber-border px-4 pt-4 pb-6 space-y-3 font-medium">
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pb-3 border-b border-cyber-border">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-slate-800 hover:text-cyber-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-around pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenVoice(); }}
                className="flex items-center gap-1 text-xs text-cyber-emerald"
              >
                <Mic className="w-4 h-4" /> Voice
              </button>
              {editMode && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdminCms(); }}
                  className="flex items-center gap-1 text-xs text-cyber-indigo"
                >
                  <Settings className="w-4 h-4" /> CMS
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
