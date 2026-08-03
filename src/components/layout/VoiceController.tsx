'use client';

import React, { useState } from 'react';
import { Mic, MicOff, X, Volume2, Sparkles } from 'lucide-react';
import { VoiceSpeechEngine } from '@/lib/ai/voice/speechEngine';

interface VoiceControllerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceController: React.FC<VoiceControllerProps> = ({ isOpen, onClose }) => {
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [statusMessage, setStatusMessage] = useState('Click start to speak voice commands...');

  if (!isOpen) return null;

  const handleStart = () => {
    if (!VoiceSpeechEngine.isSupported()) {
      setStatusMessage('Web Speech API is not supported in this browser.');
      return;
    }

    setListening(true);
    setStatusMessage('Listening... Speak a command like "go to projects", "show skills", or "open recruiter"');

    VoiceSpeechEngine.startListening(
      (cmd: string) => {
        setListening(false);
        setLastCommand(cmd);
        processCommand(cmd);
      },
      (err: any) => {
        setListening(false);
        setStatusMessage('Voice recognition error. Please try again.');
      }
    );
  };

  const processCommand = (cmd: string) => {
    if (cmd.includes('project') || cmd.includes('work')) {
      window.location.hash = '#projects';
      setStatusMessage('Navigating to Projects Showcase...');
    } else if (cmd.includes('skill')) {
      window.location.hash = '#skills';
      setStatusMessage('Navigating to Skills Matrix...');
    } else if (cmd.includes('recruiter') || cmd.includes('dashboard')) {
      window.location.hash = '#recruiter';
      setStatusMessage('Navigating to Recruiter Dashboard...');
    } else if (cmd.includes('resume')) {
      window.location.hash = '#resume';
      setStatusMessage('Navigating to ATS Resume Builder...');
    } else if (cmd.includes('contact') || cmd.includes('email')) {
      window.location.hash = '#contact';
      setStatusMessage('Navigating to Contact Form...');
    } else {
      setStatusMessage(`Command "${cmd}" received. Try "go to projects", "skills", "recruiter", or "resume".`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-cyber-surface border border-cyber-border rounded-2xl p-6 shadow-2xl space-y-5 text-center font-sans">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyber-emerald font-mono font-bold text-xs">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>Web Speech API Voice Navigation</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Microphone Pulse Animation */}
        <div className="py-4 flex justify-center">
          <button
            onClick={handleStart}
            disabled={listening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              listening
                ? 'bg-cyber-emerald text-cyber-dark ring-8 ring-cyber-emerald/30 animate-pulse'
                : 'bg-cyber-dark border-2 border-cyber-cyan text-cyber-cyan hover:scale-105 shadow-neon-cyan'
            }`}
          >
            {listening ? <Mic className="w-8 h-8 animate-spin" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

        <p className="text-xs text-slate-300 font-mono min-h-[40px] px-2">{statusMessage}</p>

        {lastCommand && (
          <div className="p-2.5 rounded-xl bg-cyber-dark border border-cyber-border text-xs text-cyber-cyan font-mono">
            Recognized: &quot;{lastCommand}&quot;
          </div>
        )}

        <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-cyber-border">
          Supported voice triggers: &quot;projects&quot;, &quot;skills&quot;, &quot;recruiter&quot;, &quot;resume&quot;, &quot;contact&quot;
        </div>
      </div>
    </div>
  );
};
