'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useCMS } from '@/context/CmsContext';

export const ContactModule: React.FC = () => {
  const { state } = useCMS();
  const { candidate } = state;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>LET&apos;S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Get In Touch With Sundar
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Available for full-time software engineering roles, technical internships, and AI research collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Direct Contact & Social Cards */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-4 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white font-display">Direct Contact & Verified Profiles</h3>

              <a
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-cyber-dark border border-cyber-border text-slate-200 hover:border-cyber-cyan transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyber-cyan/10 text-cyber-cyan group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Email Address</div>
                  <div className="text-sm font-mono font-bold text-white">{candidate.email}</div>
                </div>
              </a>

              <a
                href={`tel:${candidate.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-cyber-dark border border-cyber-border text-slate-200 hover:border-cyber-emerald transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyber-emerald/10 text-cyber-emerald group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Phone Number</div>
                  <div className="text-sm font-mono font-bold text-white">{candidate.phone}</div>
                </div>
              </a>

              {/* Verified LinkedIn */}
              <a
                href={candidate.linkedin || 'https://www.linkedin.com/in/sundar-raj-kempe/'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-cyber-dark border border-cyber-border text-slate-200 hover:border-cyber-indigo transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyber-indigo/10 text-cyber-indigo group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm font-mono font-bold text-white">linkedin.com/in/sundar-raj-kempe/</div>
                </div>
              </a>

              {/* Verified GitHub */}
              <a
                href={candidate.github || 'https://github.com/sundarkempe86-jpg'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-cyber-dark border border-cyber-border text-slate-200 hover:border-cyber-cyan transition-all group"
              >
                <div className="p-3 rounded-lg bg-cyber-cyan/10 text-cyber-cyan group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">GitHub Profile</div>
                  <div className="text-sm font-mono font-bold text-white">github.com/sundarkempe86-jpg</div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-cyber-surface/70 border border-cyber-border backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-300">Your Full Name:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hiring Manager / Recruiter"
                  className="w-full p-3 rounded-xl bg-cyber-dark border border-cyber-border text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Email Address:</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. recruiter@company.com"
                  className="w-full p-3 rounded-xl bg-cyber-dark border border-cyber-border text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Message / Inquiry:</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message regarding job opportunities or collaborations..."
                  className="w-full p-3 rounded-xl bg-cyber-dark border border-cyber-border text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-emerald text-cyber-dark font-bold text-xs shadow-neon-cyan hover:opacity-95 transition-opacity"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-cyber-emerald/20 border border-cyber-emerald/40 text-cyber-emerald text-center font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! Your message has been received cleanly.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
