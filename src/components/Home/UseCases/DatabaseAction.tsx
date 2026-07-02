'use client';

import { Zap, Check } from "lucide-react";

const steps = [
  "Inventory updated",
  "Confirmation sent",
  "Team notified",
];

/**
 * Automation panel mockup — a trigger fires and the AI runs each task itself.
 * Rendered in full colour; the parent card desaturates it when collapsed.
 */
export default function ActionsVisual() {
  return (
    <div className="w-full rounded-2xl bg-white ring-1 ring-slate-100 shadow-xl shadow-[#0F1E3D]/10 overflow-hidden font-inter">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
      </div>

      <div className="p-4 bg-[#FBFCFE]">
        {/* Trigger */}
        <div className="flex items-center gap-2.5 rounded-xl bg-[#0F1E3D] px-3 py-2.5">
          <span className="w-6 h-6 rounded-lg bg-[#00D4C2] flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 text-white" fill="currentColor" />
          </span>
          <span className="text-[12px] font-semibold text-white">
            New order received
          </span>
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-[#00D4C2]">
            Auto
          </span>
        </div>

        {/* Steps */}
        <div className="mt-2.5 space-y-2 pl-3 border-l-2 border-dashed border-[#00D4C2]/30 ml-3">
          {steps.map((step) => (
            <div
              key={step}
              className="flex items-center gap-2.5 rounded-lg bg-white ring-1 ring-slate-100 px-3 py-2"
            >
              <span className="w-5 h-5 rounded-full bg-[#00D4C2] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <span className="text-[12px] font-medium text-slate-600">
                {step}
              </span>
              <span className="ml-auto text-[10px] font-medium text-emerald-500">
                Done
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
