'use client';

import { Check } from "lucide-react";

/**
 * Chatbot widget mockup — shows the AI resolving a customer question.
 * Rendered in full colour; the parent card desaturates it when collapsed.
 */
export default function SupportVisual() {
  return (
    <div className="w-full rounded-2xl bg-white ring-1 ring-slate-100 shadow-xl shadow-[#0F1E3D]/10 overflow-hidden font-inter">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
      </div>

      {/* Chat */}
      <div className="p-4 space-y-2.5 bg-[#FBFCFE]">
        <div className="ml-auto w-fit max-w-[75%] bg-slate-100 text-[#0F1E3D] text-[12px] rounded-2xl rounded-br-sm px-3 py-2">
          Where&apos;s my order #4021?
        </div>
        <div className="w-fit max-w-[82%] bg-[#0F1E3D] text-white text-[12px] leading-relaxed rounded-2xl rounded-bl-sm px-3 py-2">
          Shipped today, arriving Tuesday. Tracking link sent to your email.
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="w-4 h-4 rounded-full bg-[#00D4C2] flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            Resolved in 3 seconds
          </span>
        </div>
      </div>
    </div>
  );
}
