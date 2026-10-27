import React, { useState } from 'react';
import { IPO, calculateIPOStats } from '../data/ipoData';
import { X, Calculator, ArrowRight, CheckCircle2, AlertCircle, Coins, ShieldCheck } from 'lucide-react';

interface CalculatorModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ ipo, onClose }) => {
  if (!ipo) return null;

  const [lotCount, setLotCount] = useState<number>(1);
  const stats = calculateIPOStats(ipo);

  const totalShares = lotCount * ipo.lotSize;
  const totalInvestment = lotCount * stats.lotInvestment;
  const totalExpectedGain = lotCount * stats.estProfitPerLot;
  const totalExpectedValue = totalInvestment + totalExpectedGain;

  const presetLots = [1, 2, 5, 10, 14];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-sky-100 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-sky-100 bg-sky-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-sm">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Lot Profit Estimator
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {ipo.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Quick Info & Recommendation */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-500 block">Issue Price / Lot:</span>
              <span className="font-bold text-slate-900">₹{ipo.issuePrice} / {ipo.lotSize} shares</span>
            </div>
            <div>
              <span className="text-slate-500 block">Current GMP:</span>
              <span className="font-bold text-sky-700">₹{ipo.gmp} ({stats.gmpRate}%)</span>
            </div>
            <div>
              <span className="text-slate-500 block">Recommendation:</span>
              <span className={`font-bold inline-flex items-center gap-1 ${stats.isRecommended ? 'text-emerald-700' : 'text-amber-700'}`}>
                {stats.isRecommended ? 'Must Purchase' : 'Not Recommended'}
              </span>
            </div>
          </div>

          {/* Number of Lots Controller */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Number of Lots
            </label>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="number"
                min="1"
                max="100"
                value={lotCount}
                onChange={(e) => setLotCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 text-center py-2 px-3 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
              />
              <span className="text-xs text-slate-500">
                = <strong className="text-slate-800">{totalShares} Shares</strong>
              </span>
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5">
              {presetLots.map(num => (
                <button
                  key={num}
                  onClick={() => setLotCount(num)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    lotCount === num
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {num} {num === 1 ? 'Lot (Retail)' : num >= 14 ? 'Lots (HNI)' : 'Lots'}
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Output Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/60 border border-sky-100/90 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Total Capital Investment:</span>
              <span className="font-bold text-slate-900 text-sm">
                ₹{totalInvestment.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Expected Listing Gains:</span>
              <span className={`font-bold text-base ${totalExpectedGain >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {totalExpectedGain >= 0 ? '+' : ''}₹{totalExpectedGain.toLocaleString('en-IN')}
                <span className="text-xs font-normal ml-1">({stats.gmpRate}%)</span>
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/60">
              <span className="text-slate-800 font-semibold">Projected Listing Portfolio Value:</span>
              <span className="font-extrabold text-slate-900 text-base">
                ₹{totalExpectedValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Rule Reminder */}
          <div className="text-[11px] text-slate-500 bg-sky-50/50 p-3 rounded-lg border border-sky-100 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong>Advisory Note:</strong> Based on the 30% GMP threshold rule, IPOs with premium ≥ 30% are classified as <strong>Must Purchase</strong>. Grey market premiums are subject to market volatility prior to actual listing.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-sky-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
