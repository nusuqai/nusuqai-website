'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen, FileText, CheckCircle, ShieldCheck } from "lucide-react";

// --- Configuration ---
const PRIMARY_NAVY = "#0F1E3D";
const ACCENT_COLOR = "#00D4C2"; 
const DEEP_NAVY = "#0A1128";
const BACKGROUND_GREY = "#E2E8F0";

const CENTER = { x: 50, y: 50 };

// --- Nodes with Responsive Sizing Hints ---
const NODES = {
  ticket: { id: "ticket", x: 50, y: 15, label: "Ticket", Icon: FileText },
  user: { id: "user", x: 15, y: 50, label: "User DB", Icon: User },
  kb: { id: "kb", x: 85, y: 50, label: "Knowledge", Icon: BookOpen },
  result: { id: "result", x: 50, y: 85, label: "Result", Icon: CheckCircle }
};

const SCENARIOS = [
  { id: "analyze", label: "Analyzing Request", centerIcon: FileText, activeNodeId: "ticket" },
  { id: "verify", label: "Accessing Database", centerIcon: User, activeNodeId: "user" },
  { id: "policy", label: "Querying Knowledge Base", centerIcon: BookOpen, activeNodeId: "kb" },
  { id: "resolve", label: "Resolving", centerIcon: ShieldCheck, activeNodeId: "result" }
];

export default function SupportAutomationAnim() {
  const [stepIndex, setStepIndex] = useState(0);
  const currentScenario = SCENARIOS[stepIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[22rem] md:h-[28rem] bg-[#F8FAFF] rounded-xl overflow-hidden border border-slate-200 select-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {Object.values(NODES).map((node) => {
          const isActive = node.id === currentScenario.activeNodeId;

          return (
            <g key={node.id}>
              {/* Dashed Base Line */}
              <line
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${CENTER.x}%`}
                y2={`${CENTER.y}%`}
                stroke={BACKGROUND_GREY}
                strokeWidth="2"
                strokeDasharray="6 6"
              />

              {/* Active Beam */}
              <AnimatePresence>
                {isActive && (
                  <motion.line
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${CENTER.x}%`}
                    y2={`${CENTER.y}%`}
                    stroke={ACCENT_COLOR}
                    className="stroke-[3px] md:stroke-[4px]"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>

              {/* Node Icon */}
              <foreignObject
                x={`${node.x - 6}%`} // Adjusted for mobile percentage centering
                y={`${node.y - 8}%`} 
                width="12%" 
                height="16%"
                style={{ overflow: "visible" }}
              >
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <motion.div
                    className="w-10 h-10 md:w-12 md:h-12 bg-white border rounded-xl flex items-center justify-center shadow-sm"
                    style={{ borderColor: isActive ? ACCENT_COLOR : BACKGROUND_GREY }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    >
                        <node.Icon className="w-5 h-5 md:w-6 md:h-6" color={DEEP_NAVY} />
                    </motion.div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>


      {/* --- Central Agent --- */}
      <div 
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
      >
        <motion.div 
          className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl relative z-20 text-white"
          style={{ backgroundColor: PRIMARY_NAVY }}
          animate={{ boxShadow: `0 0 30px -5px ${ACCENT_COLOR}40` }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                  key={currentScenario.id}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                    <currentScenario.centerIcon className="w-6 h-6 md:w-10 md:h-10" />
                </motion.div>
            </AnimatePresence>
        </motion.div>

        {/* Pulse Effect */}
        {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-full h-full rounded-full border z-10"
              style={{ borderColor: ACCENT_COLOR }} 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
        ))}
      </div>

      {/* --- Status Bar --- */}
      <div className="absolute bottom-1 w-full flex justify-center z-40">
        <motion.div 
            key={stepIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2"
        >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse" style={{ backgroundColor: ACCENT_COLOR }} />
            <span className="text-[10px] md:text-xs font-semibold text-slate-700 whitespace-nowrap">
                {currentScenario.label}
            </span>
        </motion.div>
      </div>

    </div>
  );
}