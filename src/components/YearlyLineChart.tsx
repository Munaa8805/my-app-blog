import React from 'react';
import type { CountryGdp } from '../types';

export type YearlyPoint = { year: string; value: number };

export function normalizeCountryGdp(gdp: CountryGdp): YearlyPoint[] {
  if (Array.isArray(gdp)) {
    return gdp
      .map((p) => ({
        year: String(p.year),
        value: Number(p.value),
      }))
      .filter((p) => Number.isFinite(p.value))
      .sort((a, b) => {
        const ya = Number(a.year);
        const yb = Number(b.year);
        if (Number.isFinite(ya) && Number.isFinite(yb)) return ya - yb;
        return a.year.localeCompare(b.year);
      });
  }

  return Object.entries(gdp)
    .map(([year, value]) => ({ year, value: Number(value) }))
    .filter((p) => Number.isFinite(p.value))
    .sort((a, b) => {
      const ya = Number(a.year);
      const yb = Number(b.year);
      if (Number.isFinite(ya) && Number.isFinite(yb)) return ya - yb;
      return a.year.localeCompare(b.year);
    });
}

function formatCompactUsd(n: number): string {
  return new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
    style: 'currency',
    currency: 'USD',
  }).format(n);
}

function formatCompactNumber(n: number): string {
  return new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(n);
}

/** API values are millions of USD; show axis in billions (÷1000). */
function formatBillionsFromMillionsUsd(n: number): string {
  const billions = n / 1000;
  return (
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(billions) + ' B'
  );
}

function formatBillionsFromMillionsPlain(n: number): string {
  const billions = n / 1000;
  return (
    new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
    }).format(billions) + ' B'
  );
}

type YearlyLineChartProps = {
  data: YearlyPoint[];
  valueFormat?: 'usd' | 'number';
  /** Values are in millions USD; Y-axis shows billions (e.g. 31.06 B not 31.06 M). */
  axisMillionsUsdShowBillions?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function YearlyLineChart({
  data,
  valueFormat = 'number',
  axisMillionsUsdShowBillions = false,
  className = '',
  ariaLabel = 'Values by year line chart',
}: YearlyLineChartProps) {
  if (data.length === 0) return null;

  const formatValue = (v: number) => {
    if (axisMillionsUsdShowBillions) {
      return valueFormat === 'usd'
        ? formatBillionsFromMillionsUsd(v)
        : formatBillionsFromMillionsPlain(v);
    }
    return valueFormat === 'usd' ? formatCompactUsd(v) : formatCompactNumber(v);
  };

  const width = 560;
  const height = 220;
  const pad = { t: 20, r: 20, b: 36, l: 56 };
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;

  const values = data.map((d) => d.value);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const span = maxV - minV || 1;
  const yLo = minV - span * 0.06;
  const yHi = maxV + span * 0.06;
  const yRange = yHi - yLo || 1;

  const n = data.length;
  const xAt = (i: number) =>
    pad.l + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);

  const yAt = (v: number) => pad.t + innerH - ((v - yLo) / yRange) * innerH;

  const linePts = data.map((d, i) => `${xAt(i)},${yAt(d.value)}`).join(' ');
  const areaD = (() => {
    const baseY = pad.t + innerH;
    const firstX = xAt(0);
    const segments = data
      .map((d, i) => `L ${xAt(i)} ${yAt(d.value)}`)
      .join(' ');
    return `M ${firstX} ${baseY} ${segments} L ${xAt(n - 1)} ${baseY} Z`;
  })();

  const yTicks = 4;
  const tickLabels = Array.from({ length: yTicks + 1 }, (_, i) => {
    const t = i / yTicks;
    const v = yHi - t * (yHi - yLo);
    return { v, y: yAt(v), label: formatValue(v) };
  });

  const strokeClass =
    valueFormat === 'usd' ? 'stroke-blue-600' : 'stroke-violet-600';
  const fillClass =
    valueFormat === 'usd' ? 'fill-blue-500/10' : 'fill-violet-500/10';
  const dotStroke = valueFormat === 'usd' ? 'stroke-blue-600' : 'stroke-violet-600';

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-h-[280px]"
        role="img"
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>
        {tickLabels.slice(1).map((tick, idx) => (
          <line
            key={idx}
            x1={pad.l}
            x2={width - pad.r}
            y1={tick.y}
            y2={tick.y}
            className="stroke-gray-100"
            strokeWidth={1}
          />
        ))}
        {tickLabels.map((tick, idx) => (
          <text
            key={idx}
            x={pad.l - 8}
            y={tick.y}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-gray-400 text-[10px] font-medium"
          >
            {tick.label}
          </text>
        ))}
        <path d={areaD} className={fillClass} />
        <polyline
          fill="none"
          points={linePts}
          className={strokeClass}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => (
          <circle
            key={`${d.year}-${i}`}
            cx={xAt(i)}
            cy={yAt(d.value)}
            r={4}
            className={`fill-white ${dotStroke}`}
            strokeWidth={2}
          />
        ))}
        {data.map((d, i) => (
          <text
            key={`lbl-${d.year}-${i}`}
            x={xAt(i)}
            y={height - 8}
            textAnchor="middle"
            className="fill-gray-500 text-[10px] font-semibold"
          >
            {d.year}
          </text>
        ))}
      </svg>
    </div>
  );
}
