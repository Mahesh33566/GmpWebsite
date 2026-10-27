import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  Layers, 
  BarChart3, 
  Lock 
} from 'lucide-react';

export const SaaSTemplate: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const faqs = [
    {
      q: 'Can I connect a custom domain and SSL certificate?',
      a: 'Yes, absolutely. Cloud Run and AI Studio allow custom domain mapping with automated HTTPS certificate provisioning at zero extra cost.'
    },
    {
      q: 'Can this include databases, authentication, and backend APIs?',
      a: 'Yes! You can run full Express/Node.js servers, connect to Firebase Firestore or PostgreSQL, and implement OAuth or custom auth with zero restrictions.'
    },
    {
      q: 'How fast do code changes reflect?',
      a: 'Instantaneous compilation and preview in the side-by-side browser pane let you iterate and review changes in real time.'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-full font-sans antialiased">
      {/* SaaS Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400 font-bold">
            <Zap className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          </div>
          <span className="font-semibold text-base tracking-tight text-white">Veloce<span className="text-indigo-400">AI</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-xs text-slate-300 hover:text-white font-medium px-3 py-1.5 transition-colors">
            Sign In
          </button>
          <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3.5 py-1.5 rounded-lg shadow-sm shadow-indigo-600/30 transition-all flex items-center gap-1.5">
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 text-center max-w-4xl mx-auto overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          Next-Generation Autonomous Workflow Engine
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
          Build software at the speed of <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">pure imagination</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Unify your team’s API pipelines, distributed telemetry, and autonomous agents in a single ultra-responsive dashboard. Deploys anywhere in seconds.
        </p>

        {/* Lead Capture Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter work email for early beta..."
            required
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-indigo-600/40 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            Request Access
          </button>
        </form>

        {subscribed && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl max-w-md mx-auto flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Invite reserved! We've sent priority credentials to your inbox.
          </div>
        )}

        {/* Social Proof */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-xs uppercase tracking-wider font-semibold">
          <span>Trusted by innovators at</span>
          <span className="text-slate-400">HyperScale</span>
          <span className="text-slate-400">Veritas.ai</span>
          <span className="text-slate-400">NexusLogic</span>
          <span className="text-slate-400">AetherData</span>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="px-6 py-14 bg-slate-900/40 border-y border-slate-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Designed for high-throughput engineering teams</h2>
            <p className="text-xs sm:text-sm text-slate-400">Everything needed to move from ideation to distributed production.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Multi-Tenant Routing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically isolate traffic, compute, and encrypted storage buckets per customer workspace with microsecond latency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Real-Time Telemetry</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stream trace logs, token consumption analytics, and error budgets straight into your observability cluster.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Zero-Trust Guardrails</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Role-based access policies (RBAC), end-to-end envelope encryption, and compliance audit log exports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Transparent, scalable pricing</h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">Choose the plan that fits your growth velocity.</p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Starter Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="font-semibold text-white text-base mb-1">Starter</div>
              <p className="text-slate-400 text-xs mb-4">For solo builders and prototypes.</p>
              <div className="text-3xl font-bold text-white mb-6">
                ${billingCycle === 'annual' ? '19' : '24'}
                <span className="text-xs font-normal text-slate-400">/mo</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Up to 3 active projects</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 10,000 monthly API calls</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Community support</li>
              </ul>
            </div>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition-colors">
              Start Free Trial
            </button>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/60 via-slate-900/90 to-slate-900 border-2 border-indigo-500/60 flex flex-col justify-between relative shadow-xl shadow-indigo-950/50">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
              Most Popular
            </div>
            <div>
              <div className="font-semibold text-white text-base mb-1">Scale Pro</div>
              <p className="text-slate-400 text-xs mb-4">For growing products & agencies.</p>
              <div className="text-3xl font-bold text-white mb-6">
                ${billingCycle === 'annual' ? '69' : '85'}
                <span className="text-xs font-normal text-slate-400">/mo</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Unlimited active projects</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 500,000 monthly API calls</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Custom domains + SSL</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Priority 24/7 technical desk</li>
              </ul>
            </div>
            <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 transition-all">
              Launch Scale Pro
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="font-semibold text-white text-base mb-1">Enterprise</div>
              <p className="text-slate-400 text-xs mb-4">Dedicated SLA & custom infrastructure.</p>
              <div className="text-3xl font-bold text-white mb-6">
                Custom
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Isolated dedicated clusters</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Custom SOC2 & HIPAA BAA</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Dedicated Solutions Architect</li>
              </ul>
            </div>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Accordion FAQ */}
      <section id="faq" className="px-6 py-14 max-w-3xl mx-auto border-t border-slate-800/80">
        <h2 className="text-lg sm:text-xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-white hover:bg-slate-800/40 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed bg-slate-900/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
