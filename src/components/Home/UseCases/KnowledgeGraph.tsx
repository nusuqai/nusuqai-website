'use client';

import { Search, Sparkles, FileText, ShoppingBag, HelpCircle } from "lucide-react";

/**
 * Help-center mockup — one question, one instant answer pulled from every source.
 * Rendered in full colour; the parent card desaturates it when collapsed.
 */
export default function KnowledgeVisual() {
  return (
    <div className="w-full rounded-2xl bg-white ring-1 ring-slate-100 shadow-xl shadow-[#0F1E3D]/10 overflow-hidden font-inter">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
      </div>

      <div className="p-4 bg-[#FBFCFE]">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2.5">
          <Search className="w-4 h-4 text-[#00D4C2]" />
          <span className="text-[12px] text-slate-600">
            How do I return an item?
          </span>
        </div>

        {/* Answer */}
        <div className="mt-3 rounded-xl bg-[#0F1E3D] px-3 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00D4C2]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00D4C2]">
              Instant answer
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-white/25 w-full" />
            <div className="h-2 rounded-full bg-white/25 w-4/5" />
            <div className="h-2 rounded-full bg-white/15 w-3/5" />
          </div>
        </div>

        {/* Sources */}
        <div className="flex items-center gap-2 mt-3">
          {[
            { label: "Docs", Icon: FileText },
            { label: "Orders", Icon: ShoppingBag },
            { label: "FAQ", Icon: HelpCircle },
          ].map(({ label, Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              <Icon className="w-3 h-3 text-[#00D4C2]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
