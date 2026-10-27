import React from 'react';
import { IPO, calculateIPOStats } from '../data/ipoData';
import { 
  X, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Flame, 
  Building2, 
  ShieldCheck, 
  ExternalLink,
  Coins,
  BarChart2
} from 'lucide-react';
import { Sparkline } from './Sparkline';

interface IpoDetailModalProps {
  ipo: IPO | null;
  onClose: () => void;
  onOpenCalculator: (ipo: IPO) => void;
}

export const IpoDetailModal: React.FC<IpoDetailModalProps> = ({ ipo, onClose, onOpenCalculator }) => {
  if (!ipo) return null;

  const stats = calculateIPOStats(ipo);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-sky-100 shadow-2xl overflow-hidden my-8 relative">
        {/* Header */}
        <div className="p-6 border-b border-sky-100 bg-gradient-to-r from-sky-50/80 via-white to-sky-50/40 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              ipo.category === 'Mainboard' 
                ? 'bg-sky-100 text-sky-800 border border-sky-200' 
                : 'bg-purple-100 text-purple-800 border border-purple-200'
            }`}>
              {ipo.category} IPO
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {ipo.exchange}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs ml-auto mr-8">
              {Array.from({ length: ipo.fireRating }).map((_, i) => (
                <Flame key={i} className="w-3.5 h-3.5 fill-amber-500" />
              ))}
              <span className="text-[11px] font-semibold text-slate-500 ml-1">Rating</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            {ipo.name}
          </h2>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {ipo.sector} {ipo.symbol && `· Symbol: ${ipo.symbol}`}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Recommendation Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
            stats.isRecommended 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-3">
              {stats.isRecommended ? (
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                  <AlertCircle className="w-6 h-6" />
                </div>
              )}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Advisory Verdict (Rule: GMP ≥ 30%)
                </div>
                <div className="text-lg font-bold">
                  {stats.recommendationLabel}
                  <span className="text-xs font-normal ml-2 opacity-80">
                    ({stats.gmpRate > 0 ? `+${stats.gmpRate}%` : `${stats.gmpRate}%`} Premium)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCalculator(ipo);
              }}
              className="px-3.5 py-2 bg-white text-slate-800 hover:text-sky-600 border border-slate-200 text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Coins className="w-3.5 h-3.5 text-sky-600" />
              Calculate Profit
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">Issue Price Band</span>
              <span className="text-sm font-bold text-slate-900">{ipo.priceBand}</span>
            </div>

            <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-100">
              <span className="text-[11px] text-sky-700 font-medium block mb-1">Live GMP (₹)</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-sky-900">₹{ipo.gmp}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  ipo.gmpTrend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  {ipo.gmpTrend === 'up' ? '▲' : '▼'} {stats.gmpRate}%
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium block mb-1">Est. Listing Price</span>
              <span className="text-sm font-bold text-emerald-700">₹{stats.estListingPrice}</span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-[11px] text-emerald-800 font-medium block mb-1">Gain / 1 Lot</span>
              <span className="text-sm font-bold text-emerald-700">+₹{stats.estProfitPerLot.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* 7-Day GMP Trend Chart */}
          <div className="p-4 rounded-xl bg-white border border-sky-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                7-Day Grey Market Premium (GMP) Trend
              </div>
              <p className="text-[11px] text-slate-500">
                Tracking daily grey market price movement leading up to allotment and listing.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-sky-50/60 p-2.5 rounded-xl border border-sky-100 self-start sm:self-auto">
              <Sparkline
                data={ipo.gmpHistory}
                width={120}
                height={32}
                isPositive={stats.gmpRate >= 30}
              />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">7D Range</span>
                <span className="text-xs font-bold font-mono text-slate-800">
                  ₹{Math.min(...ipo.gmpHistory)} → ₹{Math.max(...ipo.gmpHistory)}
                </span>
              </div>
            </div>
          </div>

          {/* Investment Details */}
          <div className="p-4 rounded-xl bg-sky-50/40 border border-sky-100/80">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-sky-600" />
              Investment & Allotment Scope
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Minimum Lot Size:</span>
                <span className="font-semibold text-slate-800">{ipo.lotSize} Shares</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Min Retail Investment:</span>
                <span className="font-semibold text-slate-800">₹{stats.lotInvestment.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Total Issue Size:</span>
                <span className="font-semibold text-slate-800">₹{ipo.issueSizeCr.toLocaleString('en-IN')} Cr</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Subscription Rate:</span>
                <span className="font-semibold text-sky-700">{ipo.subscription.overall > 0 ? `${ipo.subscription.overall}x Overall` : 'Bidding Upcoming'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Registrar:</span>
                <span className="font-semibold text-slate-800">{ipo.registrar}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">GMP Updated:</span>
                <span className="font-medium text-slate-600">{ipo.gmpUpdatedDate}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              Key Schedule & Dates
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Bidding Opens</span>
                <span className="font-semibold text-slate-800">{ipo.openDate}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Bidding Closes</span>
                <span className="font-semibold text-slate-800">{ipo.closeDate}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Basis of Allotment</span>
                <span className="font-semibold text-slate-800">{ipo.allotmentDate}</span>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">Tentative Listing</span>
                <span className="font-semibold text-emerald-800">{ipo.listingDate}</span>
              </div>
            </div>
          </div>

          {/* Company Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              About the Company
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {ipo.about}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-sky-100 flex items-center justify-between">
          <a
            href="https://www.investorgain.com/report/ipo-gmp-live/331/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
          >
            Verify on InvestorGain.com <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
