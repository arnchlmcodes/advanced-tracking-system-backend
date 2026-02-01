/*type StatCardProps = {
  title: string;
  value: number | string;
  color?: "blue" | "green" | "yellow" | "red";
};

export default function StatCard({
  title,
  value,
  color = "blue",
}: StatCardProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-lg p-5 shadow-sm border bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
}*/
import React from 'react';

// 1. Updated Type Definition to include 'icon'
type StatCardProps = {
  title: string;
  value: number | string;
  icon?: string; // Made optional so your old code doesn't break
  color?: "blue" | "green" | "yellow" | "red";
};

export default function StatCard({
  title,
  value,
  icon = "📊", // Default icon if none provided
  color = "blue",
}: StatCardProps) {
  
  // 2. Enhanced Color Palette with subtle borders and "glow" shadows
  const colors = {
    blue: "text-blue-600 bg-blue-50/50 border-blue-100 shadow-blue-100/20",
    green: "text-emerald-600 bg-emerald-50/50 border-emerald-100 shadow-emerald-100/20",
    yellow: "text-amber-600 bg-amber-50/50 border-amber-100 shadow-amber-100/20",
    red: "text-rose-600 bg-rose-50/50 border-rose-100 shadow-rose-100/20",
  };

  return (
    <div className={`group relative p-6 rounded-[1.5rem] border bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${colors[color]}`}>
      {/* Visual Accent: Top Right Icon Decoration */}
      <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <div className="flex flex-col gap-1">
        {/* Title: Small, bold, and subtle */}
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          {title}
        </p>
        
        {/* Value: Large and prominent */}
        <p className="text-4xl font-black text-slate-900 mt-2">
          {value}
        </p>

        {/* Progress/Decorative Bar */}
        <div className="mt-4 h-1.5 w-12 rounded-full bg-current opacity-20" />
      </div>
    </div>
  );
}
