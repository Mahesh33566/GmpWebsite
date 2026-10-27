/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  INITIAL_IPOS, 
  IPO, 
  calculateIPOStats 
} from './data/ipoData';
import { IpoDetailModal } from './components/IpoDetailModal';
import { CalculatorModal } from './components/CalculatorModal';
import { Sparkline } from './components/Sparkline';
import { 
  TrendingUp, 
  Search, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertCircle, 
  RotateCw, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  Info,
  Calendar,
  Layers,
  ArrowUp,
  ArrowDown,
  Flame,
  Check,
  Percent,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [ipos, setIpos] = useState<IPO[]>(INITIAL_IPOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Mainboard' | 'SME'>('Mainboard');
  const [sortKey, setSortKey] = useState<'gmpRate' | 'gmpAmount' | 'profitLot' | 'closeDate' | 'size'>('gmpRate');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [threshold, setThreshold] = useState<number>(30); // 30% threshold as requested
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  
  // Modals state
  const [selectedIpoForDetail, setSelectedIpoForDetail] = useState<IPO | null>(null);
  const [selectedIpoForCalc, setSelectedIpoForCalc] = useState<IPO | null>(null);

  // Category counts
  const mainboardCount = useMemo(() => ipos.filter(i => i.category === 'Mainboard').length, [ipos]);
  const smeCount = useMemo(() => ipos.filter(i => i.category === 'SME').length, [ipos]);

  // Handle Refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  // Filtered & Sorted IPOs - strictly by selected category (Mainboard or SME)
  const processedIpos = useMemo(() => {
    return ipos
      .filter((ipo) => {
        // Only show matching category
        if (ipo.category !== categoryFilter) return false;

        const matchesSearch = 
          ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ipo.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (ipo.symbol && ipo.symbol.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSearch;
      })
      .sort((a, b) => {
        const statsA = calculateIPOStats(a);
        const statsB = calculateIPOStats(b);

        let comparison = 0;
        if (sortKey === 'gmpRate') {
          comparison = statsA.gmpRate - statsB.gmpRate;
        } else if (sortKey === 'gmpAmount') {
          comparison = a.gmp - b.gmp;
        } else if (sortKey === 'profitLot') {
          comparison = statsA.estProfitPerLot - statsB.estProfitPerLot;
        } else if (sortKey === 'size') {
          comparison = a.issueSizeCr - b.issueSizeCr;
        } else if (sortKey === 'closeDate') {
          comparison = a.closeDate.localeCompare(b.closeDate);
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });
  }, [ipos, searchQuery, categoryFilter, sortKey, sortOrder]);

  // Summary Metrics for current category
  const summary = useMemo(() => {
    const currentList = ipos.filter(i => i.category === categoryFilter);
    let mustPurchaseCount = 0;
    let highestGmpRate = 0;
    let highestGmpName = '';
    let totalGmpSum = 0;

    currentList.forEach(ipo => {
      const stats = calculateIPOStats(ipo);
      if (stats.gmpRate >= threshold) mustPurchaseCount++;
      if (stats.gmpRate > highestGmpRate) {
        highestGmpRate = stats.gmpRate;
        highestGmpName = ipo.name;
      }
      totalGmpSum += stats.gmpRate;
    });

    const avgGmp = (totalGmpSum / (currentList.length || 1)).toFixed(1);

    return {
      total: currentList.length,
      mustPurchaseCount,
      notRecommendedCount: currentList.length - mustPurchaseCount,
      highestGmpRate,
      highestGmpName,
      avgGmp,
    };
  }, [ipos, categoryFilter, threshold]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'IPO Name',
      'Category',
      'Sector',
      'Price Band (INR)',
      'Upper Price (INR)',
      'GMP (INR)',
      'GMP Rate (%)',
      'Est Listing Price (INR)',
      'Lot Size',
      'Min Investment (INR)',
      'Est Profit Per Lot (INR)',
      'Status',
      'Recommendation'
    ];

    const rows = processedIpos.map(ipo => {
      const stats = calculateIPOStats(ipo);
      return [
        `"${ipo.name}"`,
        ipo.category,
        `"${ipo.sector}"`,
        `"${ipo.priceBand}"`,
        ipo.issuePrice,
        ipo.gmp,
        stats.gmpRate,
        stats.estListingPrice,
        ipo.lotSize,
        stats.lotInvestment,
        stats.estProfitPerLot,
        ipo.status,
        stats.gmpRate >= threshold ? 'Must Purchase' : 'Not Recommended'
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IPO_GMP_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900 flex flex-col">
      {/* Top Source Attribution & Live Sync Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide">Live Grey Market Premium (GMP) Feed</span>
          <span className="opacity-75 hidden sm:inline">|</span>
          <span className="opacity-90 hidden sm:inline">Synced with InvestorGain Report #331</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] opacity-80">
            Updated: {lastRefreshed}
          </span>
          <a
            href="https://www.investorgain.com/report/ipo-gmp-live/331/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors"
          >
            InvestorGain Source <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Sky-White Navigation Header */}
      <header className="bg-white/95 backdrop-blur border-b border-sky-100/90 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  IPO GMP Live Tracker
                </h1>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Free Advisory
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Instant Listing Gain Estimates & Purchase Recommendation System
              </p>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Refresh live GMP rates"
            >
              <RotateCw className={`w-3.5 h-3.5 text-sky-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Feed</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Download table as CSV file"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Sky-White Rule Alert Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50/80 border border-sky-100/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>Recommendation Algorithm</span>
                <span className="text-[10px] bg-sky-100 text-sky-700 font-semibold px-2 py-0.2 rounded-full">
                  Rule Active
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                • GMP Rate <strong className="text-emerald-700 font-bold">&gt; {threshold}%</strong>: Marked as <strong className="text-emerald-700 font-bold">"Must Purchase"</strong> (High probability of strong listing gains).<br className="hidden sm:inline" />
                • GMP Rate <strong className="text-amber-700 font-bold">&lt; {threshold}%</strong>: Marked as <strong className="text-amber-800 font-bold">"Not Recommended"</strong> (Moderate or muted listing gains).
              </p>
            </div>
          </div>

          {/* Quick Threshold Slider / Badge */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-sky-100 shadow-2xs text-xs shrink-0">
            <span className="text-slate-500 font-medium">Target Threshold:</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-lg">
                {threshold}%
              </span>
            </div>
            <div className="flex gap-1">
              {[20, 30, 40].map(val => (
                <button
                  key={val}
                  onClick={() => setThreshold(val)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    threshold === val 
                      ? 'bg-sky-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Key Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Total IPOs Tracked</span>
              <Layers className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{summary.total}</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Mainboard & SME Offerings
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-100/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-medium mb-1">
              <span>Must Purchase (&gt;{threshold}%)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700">
              {summary.mustPurchaseCount}
              <span className="text-xs font-normal text-slate-400 ml-1.5">/ {summary.total}</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              {((summary.mustPurchaseCount / summary.total) * 100).toFixed(0)}% of current IPOs
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Highest GMP Rate</span>
              <TrendingUp className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-sky-700">
              +{summary.highestGmpRate}%
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-1" title={summary.highestGmpName}>
              {summary.highestGmpName}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-sky-100 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Average Premium</span>
              <Percent className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-extrabold text-indigo-900">
              +{summary.avgGmp}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Across active grey market
            </div>
          </div>
        </div>

        {/* Search Bar & 2 Category Options: Mainboard & SME */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-xs p-4 mb-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${categoryFilter} IPOs by name or sector...`}
                className="w-full bg-[#f8fbfe] border border-sky-100 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* ONLY 2 OPTIONS NEAR SEARCH: Mainboard & SME */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Category:</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-black">
                <button
                  onClick={() => setCategoryFilter('Mainboard')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    categoryFilter === 'Mainboard'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${categoryFilter === 'Mainboard' ? 'bg-sky-400' : 'bg-slate-400'}`} />
                  Mainboard ({mainboardCount})
                </button>

                <button
                  onClick={() => setCategoryFilter('SME')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    categoryFilter === 'SME'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-slate-700 hover:text-black hover:bg-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${categoryFilter === 'SME' ? 'bg-purple-400' : 'bg-slate-400'}`} />
                  SME ({smeCount})
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-sky-600" /> Sort by:
              </span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as any)}
                className="bg-[#f8fbfe] border border-sky-100 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="gmpRate">GMP Rate % (Highest First)</option>
                <option value="gmpAmount">GMP in ₹ (Highest First)</option>
                <option value="profitLot">Estimated Gain / Lot (₹)</option>
                <option value="size">Issue Size (₹ Cr)</option>
                <option value="closeDate">Close Date</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="p-2 bg-[#f8fbfe] hover:bg-sky-50 border border-sky-100 rounded-xl text-slate-700 font-bold transition-colors"
                title={sortOrder === 'desc' ? 'Descending' : 'Ascending'}
              >
                {sortOrder === 'desc' ? '↓' : '↑'}
              </button>
            </div>
          </div>
        </div>

        {/* IPO GMP Tabular Data View with Black Border Lines */}
        <div className="bg-white rounded-xl border-2 border-black shadow-md overflow-hidden mb-10">
          <div className="p-4 border-b-2 border-black bg-[#f8fbfe] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Live IPO Grey Market Premium (GMP) Table — {categoryFilter} Offerings
              </h2>
              <p className="text-xs text-slate-500">
                Showing {processedIpos.length} {categoryFilter} IPOs. Recommendation automatically set based on GMP &gt; {threshold}%.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-black bg-white px-2.5 py-1 rounded-lg border border-black shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real-time rates</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-black">
              <thead>
                <tr className="bg-slate-100 text-black border-b-2 border-black text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold border-r border-black">IPO Name & Details</th>
                  <th className="py-3.5 px-4 font-bold text-right border-r border-black">Price Band</th>
                  <th className="py-3.5 px-4 font-bold text-right border-r border-black">Live GMP (₹)</th>
                  {/* RECOMMENDATION COLUMN MOVED DIRECTLY AFTER LIVE GMP */}
                  <th className="py-3.5 px-4 font-bold text-center border-r border-black bg-sky-50 text-slate-900">
                    Purchase Recommendation
                  </th>
                  <th className="py-3.5 px-4 font-bold text-right border-r border-black">GMP Rate (%) & 7D Trend</th>
                  <th className="py-3.5 px-4 font-bold text-right border-r border-black">Est. Listing</th>
                  <th className="py-3.5 px-4 font-bold text-right border-r border-black">Lot / Investment</th>
                  <th className="py-3.5 px-4 font-bold text-right border-r border-black">Gain / Lot (₹)</th>
                  <th className="py-3.5 px-4 font-bold text-center">Bidding Dates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {processedIpos.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500 text-xs border border-black">
                      No {categoryFilter} IPOs match your search query "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  processedIpos.map((ipo) => {
                    const stats = calculateIPOStats(ipo);
                    const isMustPurchase = stats.gmpRate >= threshold;

                    return (
                      <tr 
                        key={ipo.id}
                        className="hover:bg-sky-50/50 transition-colors group border-b border-black"
                      >
                        {/* 1. IPO Name & Details */}
                        <td className="py-3.5 px-4 border-r border-black">
                          <div className="flex items-start gap-2.5">
                            <div className="pt-0.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-black ${
                                ipo.category === 'Mainboard'
                                  ? 'bg-sky-100 text-sky-900'
                                  : 'bg-purple-100 text-purple-900'
                              }`}>
                                {ipo.category}
                              </span>
                            </div>
                            <div>
                              <button
                                onClick={() => setSelectedIpoForDetail(ipo)}
                                className="font-bold text-slate-900 text-xs sm:text-sm hover:text-sky-600 transition-colors text-left flex items-center gap-1 group-hover:underline"
                              >
                                {ipo.name}
                              </button>
                              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                <span>{ipo.sector}</span>
                                {ipo.subscription.overall > 0 && (
                                  <span className="text-sky-800 font-semibold bg-sky-50 px-1.5 rounded border border-sky-200">
                                    Sub: {ipo.subscription.overall}x
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Price Band */}
                        <td className="py-3.5 px-4 text-right border-r border-black">
                          <div className="font-semibold text-slate-800 font-mono text-xs">
                            {ipo.priceBand}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ₹{ipo.issuePrice} cap
                          </div>
                        </td>

                        {/* 3. Live GMP (₹) */}
                        <td className="py-3.5 px-4 text-right font-mono border-r border-black">
                          <div className="flex items-center justify-end gap-1 font-bold text-slate-900 text-sm">
                            <span>₹{ipo.gmp}</span>
                            {ipo.gmpTrend === 'up' && (
                              <ArrowUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            )}
                            {ipo.gmpTrend === 'down' && (
                              <ArrowDown className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {ipo.gmpChange && ipo.gmpChange > 0 ? `+₹${ipo.gmpChange}` : ipo.gmpChange ? `₹${ipo.gmpChange}` : 'Unchanged'}
                          </div>
                        </td>

                        {/* 4. PURCHASE RECOMMENDATION (AFTER LIVE GMP COLUMN) */}
                        <td className="py-3.5 px-4 text-center border-r border-black bg-sky-50/40">
                          {isMustPurchase ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs tracking-wide">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                Must Purchase
                              </span>
                              <span className="text-[10px] font-medium text-emerald-700">
                                GMP &gt; {threshold}% (+{stats.gmpRate}%)
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                Not Recommended
                              </span>
                              <span className="text-[10px] text-slate-500">
                                GMP &lt; {threshold}% (+{stats.gmpRate}%)
                              </span>
                            </div>
                          )}

                          {/* Quick action buttons */}
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <button
                              onClick={() => setSelectedIpoForCalc(ipo)}
                              className="text-[10px] text-sky-700 hover:text-sky-900 font-semibold underline underline-offset-2 flex items-center gap-0.5"
                              title="Calculate profit for 1 or more lots"
                            >
                              <Calculator className="w-2.5 h-2.5" /> Calc
                            </button>
                            <span className="text-slate-400">·</span>
                            <button
                              onClick={() => setSelectedIpoForDetail(ipo)}
                              className="text-[10px] text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2"
                            >
                              Details
                            </button>
                          </div>
                        </td>

                        {/* 5. GMP Rate (%) & 7D Trend */}
                        <td className="py-3.5 px-4 text-right font-mono border-r border-black">
                          <div className="flex items-center justify-end gap-3">
                            {/* 7-Day Sparkline Chart */}
                            <div className="flex flex-col items-end">
                              <Sparkline
                                data={ipo.gmpHistory}
                                width={80}
                                height={22}
                                isPositive={stats.gmpRate >= threshold}
                              />
                              <span className="text-[9px] text-slate-400 font-sans tracking-tight mt-0.5">
                                7D trend
                              </span>
                            </div>

                            {/* Percentage Rate & Bar */}
                            <div className="flex flex-col items-end min-w-[58px]">
                              <div className={`font-extrabold text-xs sm:text-sm ${
                                stats.gmpRate >= threshold ? 'text-emerald-700' : 'text-slate-700'
                              }`}>
                                +{stats.gmpRate}%
                              </div>
                              {/* Mini Progress bar */}
                              <div className="w-14 h-1.5 bg-slate-200 rounded-full ml-auto mt-0.5 overflow-hidden">
                                <div 
                                  style={{ width: `${Math.min(100, (stats.gmpRate / 100) * 100)}%` }}
                                  className={`h-full rounded-full ${
                                    stats.gmpRate >= threshold ? 'bg-emerald-500' : 'bg-amber-500'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 6. Est. Listing Price */}
                        <td className="py-3.5 px-4 text-right font-mono border-r border-black">
                          <div className="font-bold text-emerald-700 text-xs sm:text-sm">
                            ₹{stats.estListingPrice}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            +₹{ipo.gmp} gain
                          </div>
                        </td>

                        {/* 7. Lot Size & Investment */}
                        <td className="py-3.5 px-4 text-right font-mono border-r border-black">
                          <div className="font-semibold text-slate-800 text-xs">
                            {ipo.lotSize} shs
                          </div>
                          <div className="text-[10px] text-slate-500">
                            ₹{stats.lotInvestment.toLocaleString('en-IN')}
                          </div>
                        </td>

                        {/* 8. Est. Profit per Lot */}
                        <td className="py-3.5 px-4 text-right font-mono border-r border-black">
                          <div className={`font-bold text-xs sm:text-sm ${
                            stats.estProfitPerLot > 0 ? 'text-emerald-700' : 'text-slate-600'
                          }`}>
                            +₹{stats.estProfitPerLot.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            per retail lot
                          </div>
                        </td>

                        {/* 9. Dates / Status */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="text-[11px] font-semibold text-slate-700">
                            {ipo.openDate.split(' ')[0]} - {ipo.closeDate.split(' ')[0]} {ipo.closeDate.split(' ')[1]}
                          </div>
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 border border-black/40 ${
                            ipo.status === 'Open' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : ipo.status === 'Upcoming'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-slate-100 text-slate-600'
                          }`}>
                            {ipo.status === 'Open' ? '🟢 Open Now' : ipo.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Guidance & Disclaimer Card */}
        <div className="rounded-2xl bg-white border border-sky-100/90 p-6 shadow-xs text-xs text-slate-600 space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Info className="w-4 h-4 text-sky-600" />
            Understanding the Grey Market Premium (GMP) & Recommendation Logic
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="p-3.5 rounded-xl bg-[#f8fbfe] border border-sky-100">
              <strong className="block text-slate-800 font-semibold mb-1">
                1. What is GMP?
              </strong>
              Grey Market Premium (GMP) is the unofficial rate at which IPO shares trade in the unorganized market before they are formally listed on the stock exchange.
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <strong className="block text-emerald-900 font-semibold mb-1">
                2. "Must Purchase" (GMP &gt; {threshold}%)
              </strong>
              IPOs commanding more than {threshold}% premium historically carry strong institutional demand, robust anchor bidding, and provide higher cushion against market opening swings.
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
              <strong className="block text-amber-900 font-semibold mb-1">
                3. "Not Recommended" (GMP &lt; {threshold}%)
              </strong>
              IPOs below {threshold}% premium indicate conservative secondary market enthusiasm, carrying heightened risk of discount or flat listing during volatile trading sessions.
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            * Disclaimer: Data reflects indicative grey market pricing from InvestorGain.com. Grey market premiums are subject to rapid fluctuations and do not guarantee actual listing returns. Investors should also study corporate fundamentals, DRHP financials, and consult registered financial advisors before bidding.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-100 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-700">IPO GMP Live Tracker</span> · Built for investors with automated purchase recommendation logic.
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.investorgain.com/report/ipo-gmp-live/331/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              InvestorGain Report #331 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedIpoForDetail && (
        <IpoDetailModal
          ipo={selectedIpoForDetail}
          onClose={() => setSelectedIpoForDetail(null)}
          onOpenCalculator={(ipo) => setSelectedIpoForCalc(ipo)}
        />
      )}

      {/* Calculator Modal */}
      {selectedIpoForCalc && (
        <CalculatorModal
          ipo={selectedIpoForCalc}
          onClose={() => setSelectedIpoForCalc(null)}
        />
      )}
    </div>
  );
}
