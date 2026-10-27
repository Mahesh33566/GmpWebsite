import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Search, 
  ArrowUp, 
  Filter, 
  Download, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export const DashboardTemplate: React.FC = () => {
  const [range, setRange] = useState<'7D' | '30D' | '90D'>('30D');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Completed' | 'Pending' | 'Flagged'>('All');

  const transactions = [
    { id: 'TX-9021', customer: 'Stripe Global Inc', plan: 'Enterprise Pro', amount: '$4,250.00', date: 'Just now', status: 'Completed' },
    { id: 'TX-9020', customer: 'Linear Mobile Co', plan: 'Team Annual', amount: '$890.00', date: '14 mins ago', status: 'Completed' },
    { id: 'TX-9019', customer: 'Vercel Edge Labs', plan: 'Custom Node', amount: '$1,920.00', date: '1 hour ago', status: 'Pending' },
    { id: 'TX-9018', customer: 'Figma Community', plan: 'Starter Pack', amount: '$120.00', date: '3 hours ago', status: 'Completed' },
    { id: 'TX-9017', customer: 'Supabase Cloud', plan: 'Database Sync', amount: '$640.00', date: 'Yesterday', status: 'Flagged' },
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) || tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || tx.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-900 text-slate-100 min-h-full font-sans antialiased p-6">
      {/* Dashboard Topbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Executive Telemetry & Revenue</h1>
          <p className="text-xs text-slate-400">Live production metrics across 12 distributed regions.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700/60 text-xs">
            {(['7D', '30D', '90D'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  range === r ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Monthly Recurring (MRR)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1.5">$184,420</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <ArrowUp className="w-3 h-3" /> +14.2% from last cycle
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Tenants</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1.5">14,290</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <ArrowUp className="w-3 h-3" /> +8.6% organic onboarding
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Checkout Conversion</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1.5">4.82%</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <ArrowUp className="w-3 h-3" /> +0.9% optimization
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Avg API Roundtrip</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1.5">32.4 ms</div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            99.99% SLA compliant
          </div>
        </div>
      </div>

      {/* Visual Chart Bars Mockup */}
      <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Revenue Ingestion Velocity</h3>
            <p className="text-xs text-slate-400">Comparing current period against rolling 90-day baseline</p>
          </div>
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
            Live Stream
          </span>
        </div>

        {/* Visual Bar Graph */}
        <div className="h-28 flex items-end gap-2 pt-4">
          {[42, 65, 55, 80, 95, 74, 88, 100, 68, 85, 92, 110, 98, 120, 130].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div 
                style={{ height: `${(h / 130) * 100}%` }}
                className={`w-full rounded-t transition-all duration-300 ${
                  i === 13 ? 'bg-indigo-500 shadow-lg shadow-indigo-500/40' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
              <span className="text-[9px] text-slate-500 group-hover:text-slate-300">
                W{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tenant or ID..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 text-xs">
            {(['All', 'Completed', 'Pending', 'Flagged'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                  selectedStatus === s
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-700/60">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Tenant Account</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-300">{tx.id}</td>
                  <td className="py-3 px-4 font-semibold text-white">{tx.customer}</td>
                  <td className="py-3 px-4 text-slate-400">{tx.plan}</td>
                  <td className="py-3 px-4 font-bold text-white">{tx.amount}</td>
                  <td className="py-3 px-4">
                    {tx.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                    {tx.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                    {tx.status === 'Flagged' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                        <AlertCircle className="w-3 h-3" /> Flagged
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
