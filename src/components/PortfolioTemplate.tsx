import React, { useState } from 'react';
import { SAMPLE_PROJECTS, ProjectItem } from '../data/templates';
import { Briefcase, ArrowUpRight, Send, CheckCircle2, Award, Terminal, Sparkles, X } from 'lucide-react';

export const PortfolioTemplate: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Web App' | 'Branding' | 'Design System'>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryBudget, setInquiryBudget] = useState('$10k - $25k');
  const [inquirySent, setInquirySent] = useState(false);

  const filteredProjects = selectedFilter === 'All'
    ? SAMPLE_PROJECTS
    : SAMPLE_PROJECTS.filter(p => p.category === selectedFilter);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
    }, 3500);
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-full font-mono antialiased">
      {/* Top micro status bar */}
      <div className="border-b border-neutral-800 px-6 py-2.5 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-sans text-[11px] font-semibold">AVAILABLE FOR Q1/Q2 PROJECTS</span>
        </div>
        <div className="hidden sm:block text-neutral-500 text-[11px]">
          BASED IN SAN FRANCISCO & TOKYO
        </div>
      </div>

      {/* Hero section */}
      <header className="px-6 py-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
            STAFF PRODUCT DESIGNER & CREATIVE TECHNOLOGIST
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white mb-6 leading-tight">
          Crafting tactile digital systems, spatial interfaces, and venture-backed brand identities.
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl leading-relaxed mb-8">
          Over 9 years collaborating with early-stage YC founders and public technology companies. Bridging Figma designs with production-grade React code.
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-sans">
          <a
            href="#inquiry"
            className="px-5 py-2.5 bg-neutral-100 hover:bg-white text-neutral-950 font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            Start a Collaboration <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#work"
            className="px-5 py-2.5 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-lg transition-colors"
          >
            Selected Works (2024-2026)
          </a>
        </div>
      </header>

      {/* Selected Works Grid */}
      <section id="work" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-lg font-sans font-bold text-white">Selected Case Studies</h2>
            <p className="text-xs text-neutral-500 font-sans">High-impact engineering and interaction prototypes</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-sans">
            {(['All', 'Web App', 'Branding', 'Design System'] as const).map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedFilter === f
                    ? 'bg-neutral-800 text-white font-medium border border-neutral-700'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="group cursor-pointer rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="h-44 bg-neutral-950 overflow-hidden relative">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 bg-neutral-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-neutral-300 font-sans">
                  {proj.category}
                </span>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                    <span>{proj.client}</span>
                    <span>{proj.year}</span>
                  </div>
                  <h3 className="font-sans font-bold text-sm text-neutral-100 group-hover:text-white mb-2 flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 line-clamp-2 mb-3">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 text-[11px] text-emerald-400 font-sans font-semibold">
                  {proj.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="px-6 py-14 max-w-3xl mx-auto border-t border-neutral-800/80 font-sans">
        <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
          <div className="max-w-md mb-6">
            <h2 className="text-xl font-bold text-white mb-1">Have a project in mind?</h2>
            <p className="text-xs text-neutral-400">Tell me about your goals, target launch timeline, and scope.</p>
          </div>

          {inquirySent ? (
            <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold mb-0.5">Inquiry received!</div>
                <div>I typically review specifications and respond with an architectural proposal within 24 hours.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1.5">Work Email</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1.5">Estimated Budget Scope</label>
                <div className="flex flex-wrap gap-2">
                  {['<$10k', '$10k - $25k', '$25k - $50k', '$50k+'].map(b => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setInquiryBudget(b)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                        inquiryBudget === b
                          ? 'border-neutral-400 bg-neutral-800 text-white font-medium'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-neutral-100 hover:bg-white text-neutral-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-3.5 h-3.5" /> Submit Project Brief
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/60 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 bg-neutral-950 relative">
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span>{activeProject.client} · {activeProject.year}</span>
                <span className="text-emerald-400 font-semibold">{activeProject.metric}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{activeProject.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                {activeProject.description} Designed with end-to-end fluid physics, accessibility compliance (WCAG AAA), and custom WebGL shaders.
              </p>
              <button
                onClick={() => setActiveProject(null)}
                className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
