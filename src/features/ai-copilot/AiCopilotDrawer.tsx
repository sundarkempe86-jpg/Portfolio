'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { CopilotIntentEngine } from '@/lib/ai/copilot/intentEngine';
import { AnalyticsService } from '@/services/AnalyticsService';

export const AiCopilotDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: "Hi! I am Sundar's AI Portfolio Copilot. Ask me anything about his projects, VTU degree, KodNest training, or certifications!",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    AnalyticsService.trackEvent('COPILOT_QUERY', query);

    const newMsgs = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMsgs);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const response = CopilotIntentEngine.query(query);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.answer }]);
    }, 300);
  };

  return (
    <>
      {/* Floating Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-indigo text-cyber-dark font-bold shadow-neon-cyan hover:scale-110 transition-all"
        title="AI Copilot Chat Drawer"
      >
        <Bot className="w-6 h-6 text-cyber-dark" />
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-full max-w-sm bg-cyber-surface border border-cyber-border rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col h-[480px]">
          {/* Header */}
          <div className="p-3.5 bg-cyber-dark border-b border-cyber-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyber-cyan" />
              <div>
                <div className="font-bold text-white text-xs">AI Portfolio Copilot</div>
                <div className="text-[10px] text-cyber-emerald font-mono">Client NLP Engine</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs font-sans">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-xl ${m.sender === 'user'
                      ? 'bg-cyber-cyan text-cyber-dark font-medium'
                      : 'bg-cyber-dark border border-cyber-border text-slate-200'
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2 bg-cyber-dark/80 border-t border-cyber-border flex gap-1.5 overflow-x-auto text-[10px] font-mono">
            {['Tell me about CyberGuard', 'VTU CGPA', 'KodNest training'].map((pill) => (
              <button
                key={pill}
                onClick={() => handleSend(pill)}
                className="px-2 py-1 rounded-lg bg-cyber-surface border border-slate-800 text-slate-300 hover:text-cyber-cyan whitespace-nowrap"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-cyber-dark border-t border-cyber-border flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-cyber-surface border border-cyber-border rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-cyber-cyan text-cyber-dark font-bold hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
