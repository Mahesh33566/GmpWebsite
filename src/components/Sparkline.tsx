import React, { useState } from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  isPositive?: boolean;
  unitPrefix?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 84,
  height = 24,
  isPositive = true,
  unitPrefix = '₹',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Calculate points with padding
  const paddingX = 4;
  const paddingY = 4;
  const effectiveWidth = width - paddingX * 2;
  const effectiveHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * effectiveWidth;
    const y = height - paddingY - ((val - min) / range) * effectiveHeight;
    return { x, y, val, day: `Day ${idx + 1}` };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '');

  // Fill area under line
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  const isUpTrend = data[data.length - 1] >= data[0];
  const strokeColor = isPositive 
    ? (isUpTrend ? '#10b981' : '#059669') 
    : (isUpTrend ? '#0284c7' : '#f59e0b');
  const gradientId = `spark-grad-${Math.random().toString(36).substring(2, 9)}`;

  const currentHoverPoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div 
      className="relative inline-flex items-center group cursor-pointer"
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relativeX = e.clientX - rect.left - paddingX;
          const ratio = Math.max(0, Math.min(1, relativeX / effectiveWidth));
          const idx = Math.round(ratio * (data.length - 1));
          setHoverIndex(idx);
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Shaded Area */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Trend Polyline */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start dot */}
        <circle
          cx={points[0].x}
          cy={points[0].y}
          r="1.5"
          fill={strokeColor}
          opacity="0.6"
        />

        {/* Latest day dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2.5"
          fill={strokeColor}
          className="animate-pulse"
        />

        {/* Hover inspection dot */}
        {currentHoverPoint && (
          <circle
            cx={currentHoverPoint.x}
            cy={currentHoverPoint.y}
            r="3.5"
            fill="#ffffff"
            stroke={strokeColor}
            strokeWidth="2"
          />
        )}
      </svg>

      {/* Floating Tooltip */}
      {currentHoverPoint ? (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-40 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap border border-slate-700 animate-in fade-in duration-150">
          <div className="font-semibold text-sky-300">
            {unitPrefix}{currentHoverPoint.val}
          </div>
          <div className="text-[9px] text-slate-400">
            {currentHoverPoint.day === 'Day 7' ? 'Latest (Today)' : `7D Trend · ${currentHoverPoint.day}`}
          </div>
        </div>
      ) : (
        <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30 bg-slate-900/90 text-white text-[9px] py-0.5 px-1.5 rounded shadow pointer-events-none whitespace-nowrap">
          7-Day GMP: {unitPrefix}{data[0]} → {unitPrefix}{data[data.length - 1]}
        </div>
      )}
    </div>
  );
};
