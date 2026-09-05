"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const ChartBlock = ({ data }: { data: any }) => {
  const {
    type = "bar",
    data: chartData = [],
    keys = [],
    xKey = "name",
    title,
    subtitle,
    footer,
  } = data;

  const colors = data.colors || ["#FF3131", "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap gap-4 mb-6">
        {payload.map((entry: any, index: number) => (
          <li
            key={`item-${index}`}
            className="flex items-center gap-2 text-[14px] font-medium text-[var(--ink-dim)] font-sans"
          >
            <span className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: entry.color }} />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--card-bg)] border border-[var(--line)] p-3 shadow-md min-w-[120px] font-sans">
          {label && <p className="font-bold text-[14px] text-[var(--ink)] mb-2">{label}</p>}
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-[13px] text-[var(--ink-dim)] mt-1"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-none" style={{ backgroundColor: entry.color }} />
                <span className="font-medium">{entry.name}</span>
              </div>
              <span className="font-bold text-[var(--ink)]">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonMargin = {
      top: 5,
      right: 5,
      left: data.yAxisLabel ? 10 : -10,
      bottom: data.xAxisLabel ? 20 : 0,
    };
    const gridStyle = { strokeDasharray: "3 3", className: "stroke-[var(--line)]", vertical: false };
    const tickStyle = { fontSize: 12, className: "fill-[var(--ink-faint)]" };

    if (type === "line") {
      return (
        <LineChart data={chartData} margin={commonMargin}>
          <CartesianGrid {...gridStyle} />
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={tickStyle} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={tickStyle} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} verticalAlign="top" align="left" />
          {keys.map((k: string, i: number) => (
            <Line
              key={k}
              type="monotone"
              dataKey={k}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      );
    }

    if (type === "pie") {
      const pieDataKey = keys[0] || "value";
      return (
        <PieChart margin={commonMargin}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={110}
            dataKey={pieDataKey}
            nameKey={xKey}
            label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} verticalAlign="bottom" align="center" />
        </PieChart>
      );
    }

    // Default bar chart
    return (
      <BarChart data={chartData} margin={commonMargin}>
        <CartesianGrid {...gridStyle} />
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={tickStyle} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={tickStyle} />
        <RechartsTooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} verticalAlign="top" align="left" />
        {keys.map((k: string, i: number) => (
          <Bar key={k} dataKey={k} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} barSize={32} />
        ))}
      </BarChart>
    );
  };

  return (
    <div className="not-prose my-6 p-4 border border-[var(--line)] bg-[var(--card-bg)] font-sans w-full">
      <div className="mb-2">
        {subtitle && (
          <div className="text-[12px] uppercase font-bold text-[var(--brand)] tracking-wider mb-1 font-mono">
            {subtitle}
          </div>
        )}
        {title && (
          <h3 className="font-heading text-lg font-bold text-[var(--ink)] tracking-wide">
            {title}
          </h3>
        )}
      </div>
      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {footer && (
        <div className="mt-4 text-[13px] text-[var(--ink-dim)] leading-relaxed border-t border-[var(--line)] pt-3">
          {footer}
        </div>
      )}
    </div>
  );
};
