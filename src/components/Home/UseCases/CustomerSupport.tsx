'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Changed to framer-motion as 'motion/react' isn't standard
import { User, BookOpen, FileText, CheckCircle, RefreshCcw, ShieldCheck } from "lucide-react";

// --- Configuration ---
const PRIMARY_NAVY = "#0F1E3D";
const ACCENT_COLOR = "#00D4C2"; // Single color for all lines/pulses
const DEEP_NAVY = "#0A1128";
const BACKGROUND_GREY = "#E2E8F0";

// --- Unified Coordinate System (Percentages) ---
const CENTER = { x: 50, y: 50 };

// --- Redefined Symmetrical Node Coordinates (Square Layout) ---
const NODES = {
  ticket: { 
    id: "ticket", 
    x: 50, y: 15, // Top Center
    label: "Incoming Ticket", 
    Icon: FileText 
  },
  user: { 
    id: "user", 
    x: 15, y: 50, // Left Center (Equal Spacing)
    label: "Customer DB", 
    Icon: User 
  },
  kb: { 
    id: "kb", 
    x: 85, y: 50, // Right Center (Equal Spacing)
    label: "Knowledge Base", 
    Icon: BookOpen 
  },
  // Adding a fourth node for a full square/symmetrical layout
  result: {
    id: "result",
    x: 50, y: 85, // Bottom Center
    label: "Resolution Output",
    Icon: CheckCircle
  }
};

// --- Simplified Scenarios for Single Color Sequential Flow ---
const SCENARIOS = [
  {
    id: "analyze",
    label: "Analyzing Request",
    centerIcon: FileText,
    activeNodeId: "ticket",
  },
  {
    id: "verify",
    label: "Accessing Customer DB",
    centerIcon: User,
    activeNodeId: "user",
  },
  {
    id: "policy",
    label: "Querying Knowledge Base",
    centerIcon: BookOpen,
    activeNodeId: "kb",
  },
  {
    id: "resolve",
    label: "Generating Resolution",
    centerIcon: ShieldCheck,
    activeNodeId: "result",
  }
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
    <div className="relative w-full h-[28rem] bg-[#F8FAFF] rounded-xl overflow-hidden border border-slate-200">
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
    {Object.values(NODES).map((node) => {
        const isActive = node.id === currentScenario.activeNodeId;

        return (
        <g key={node.id}>
            {/* Grey dashed base line */}
            <line
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${CENTER.x}%`}
            y2={`${CENTER.y}%`}
            stroke={BACKGROUND_GREY}
            strokeWidth="2"
            strokeDasharray="6 6"
            />

            {/* Active colored beam */}
            <AnimatePresence>
            {isActive && (
                <motion.line
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${CENTER.x}%`}
                y2={`${CENTER.y}%`}
                stroke={ACCENT_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                />
            )}
            </AnimatePresence>

            {/* Perfectly aligned icon */}
            <foreignObject
            x={`${node.x - 3.5}%`}
            y={`${node.y - 6}%`}
            width="50"
            height="50"
            style={{ overflow: "visible" }}
            >
            <motion.div
                className="w-12 h-12 bg-white border rounded-xl flex items-center justify-center shadow-sm"
                style={{ borderColor: isActive ? ACCENT_COLOR : BACKGROUND_GREY }}
                animate={{ scale: isActive ? 1.1 : 1 }}
            >
                <node.Icon size={20} color={DEEP_NAVY} />
            </motion.div>
            </foreignObject>
        </g>
        );
    })}
    </svg>


      {/* --- 3. Central Agent --- */}
      <div 
        className="absolute z-30"
        style={{ 
            left: `${CENTER.x}%`, 
            top: `${CENTER.y}%`, 
            transform: 'translate(-50%, -50%)' 
        }}
      >
        {/* Main Shield/Icon */}
        <motion.div 
          className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl relative z-20 text-white"
          style={{ backgroundColor: PRIMARY_NAVY }}
          animate={{ 
            boxShadow: `0 0 30px -5px ${ACCENT_COLOR}40` // glow effect uses the single color
          }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                  key={currentScenario.id}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                    <currentScenario.centerIcon size={32} />
                </motion.div>
            </AnimatePresence>
        </motion.div>

        {/* Pulse Effect */}
        {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-full h-full rounded-full border z-10"
              style={{ borderColor: ACCENT_COLOR }} // Pulse uses the single color
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
        ))}
      </div>

      {/* --- 4. Status Bar (Bottom) --- */}
      <div className="absolute bottom-2 w-full flex justify-center z-40">
        <motion.div 
            key={stepIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="backdrop-blur px-4 py-2 flex items-center gap-2"
        >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: ACCENT_COLOR }} />
            <span className="text-xs font-semibold text-slate-700">
                {currentScenario.label}
            </span>
        </motion.div>
      </div>

    </div>
  );
}