'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Clock, Tag, X, Copy, Check, Sparkles } from 'lucide-react';
import { BlogService } from '@/services/BlogService';
import { BlogPost } from '@/types';

export const BlogModule: React.FC = () => {
  const posts = BlogService.getAllPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-indigo/20 border border-cyber-indigo/40 text-cyber-cyan font-mono text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>TECHNICAL INSIGHTS & ARTICLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Engineering Blog & Research Notes
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Articles on Client-Side RAG, FastAPI Security Pipelines, and Enterprise Java DSA Strategies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-cyber-cyan absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by keyword or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border space-y-4 backdrop-blur-md hover:border-cyber-cyan/50 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-cyber-dark text-cyber-cyan border border-cyber-cyan/30 font-bold">
                    {post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg group-hover:text-cyber-cyan transition-colors font-display">
                  {post.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{post.summary}</p>
              </div>

              <div className="pt-3 border-t border-cyber-border flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{post.date}</span>
                <span className="text-cyber-emerald font-bold group-hover:underline">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-cyber-surface border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-cyber-border pb-4">
              <div>
                <span className="text-xs font-mono text-cyber-cyan font-bold">
                  {selectedPost.category} • {selectedPost.readTime}
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-1">
                  {selectedPost.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-lg bg-cyber-dark border border-cyber-border text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Reader */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm space-y-4 font-sans leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </div>

            {/* Copy Code Bar */}
            <div className="p-3 rounded-xl bg-cyber-dark border border-cyber-border flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Sample Snippet & Technical References Available</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-cyber-cyan font-bold hover:underline"
              >
                {copied ? <Check className="w-4 h-4 text-cyber-emerald" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-cyber-border text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-cyber-surface border border-cyber-border text-slate-300 text-xs font-mono hover:text-white"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
