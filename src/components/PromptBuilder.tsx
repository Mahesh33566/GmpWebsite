import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Wand2 } from 'lucide-react';

interface PromptBuilderProps {
  onSelectArchetype?: (id: string) => void;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = () => {
  const [websiteType, setWebsiteType] = useState('Personal Portfolio & Agency');
  const [themeStyle, setThemeStyle] = useState('Dark Minimalist Luxe');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Interactive Contact Form',
    'Case Studies Filter',
    'Responsive Mobile First',
  ]);
  const [customGoal, setCustomGoal] = useState('');
  const [copied, setCopied] = useState(false);

  const websiteTypes = [
    'Personal Portfolio & Agency',
    'SaaS Product Landing Page',
    'E-Commerce Boutique Store',
    'Restaurant, Cafe & Dining',
    'Real Estate & Property Showcase',
    'Fitness Studio & Gym Portal',
    'Healthcare & Dental Clinic',
    'Event / Conference Portal',
  ];

  const themes = [
    'Dark Minimalist Luxe',
    'Clean Neo-Corporate',
    'Warm Organic & Earthy',
    'Futuristic Cyber & Glassmorphism',
    'Vibrant & Playful Editorial',
  ];

  const availableFeatures = [
    'Interactive Contact Form',
    'Case Studies Filter',
    'Product Catalog & Cart',
    'Appointment Booking System',
    'Dark & Light Mode Toggle',
    'Customer Review Carousel',
    'Pricing Tier Switcher',
    'Responsive Mobile First',
    'Search & Tag Filtering',
    'Animated UI Micro-interactions',
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const generatedPrompt = `Build a complete, production-ready website for "${customGoal || websiteType}".
- Type: ${websiteType}
- Visual aesthetic: ${themeStyle}
- Key capabilities: ${selectedFeatures.join(', ')}
- Ensure rich interactive state, clean typography hierarchy, mobile-responsive layout, and high-fidelity components with zero placeholders.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <Wand2 className="w-4 h-4" />
        Interactive Website Prompt Generator
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Ready to build your specific website?
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Customize your desired website specifications below, then copy the prompt and send it to me right in this chat to build it immediately!
      </p>

      <div className="space-y-6">
        {/* Step 1: Website Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            1. Select Website Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {websiteTypes.map(t => (
              <button
                key={t}
                onClick={() => setWebsiteType(t)}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  websiteType === t
                    ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Theme / Aesthetic */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            2. Choose Visual Style & Aesthetic
          </label>
          <div className="flex flex-wrap gap-2">
            {themes.map(th => (
              <button
                key={th}
                onClick={() => setThemeStyle(th)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  themeStyle === th
                    ? 'border-purple-500 bg-purple-600/20 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {th}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Features */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            3. Select Interactive Features & Capabilities
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFeatures.map(feat => {
              const active = selectedFeatures.includes(feat);
              return (
                <button
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
                    active
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-medium'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  {feat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Custom Details (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            4. Business Name or Custom Vision (Optional)
          </label>
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="e.g., Artisan Bakery called 'Crust & Crumb' or modern AI dev tool called 'Quark'"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Live Output Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Generated Brief for AI Studio
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Brief
                </>
              )}
            </button>
          </div>
          <div className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-all bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
            {generatedPrompt}
          </div>
        </div>
      </div>
    </div>
  );
};
