'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Database, 
  Github, 
  Slack, 
  HardDrive, 
  FileJson, 
  Globe, 
  Server
} from "lucide-react";

// --- Configuration ---
const COLORS = {
  navy: "#0F1E3D",
  accent: "#00D4C2", 
  chaos: "#64748B",  
  bg: "#F8FAFF",
  white: "#FFFFFF"
};

// --- Knowledge Sources / Integrations ---
const SOURCES = [
  { id: 'gh', label: 'GitHub', icon: Github, chaosPos: { x: 15, y: 20 }, unifiedPos: { x: 20, y: 75 } },
  { id: 'db', label: 'Postgres', icon: Database, chaosPos: { x: 85, y: 15 }, unifiedPos: { x: 32, y: 75 } },
  { id: 'slack', label: 'Slack', icon: Slack, chaosPos: { x: 10, y: 50 }, unifiedPos: { x: 44, y: 75 } },
  { id: 'drive', label: 'Drive', icon: HardDrive, chaosPos: { x: 90, y: 60 }, unifiedPos: { x: 56, y: 75 } },
  { id: 'api', label: 'REST API', icon: Globe, chaosPos: { x: 25, y: 80 }, unifiedPos: { x: 68, y: 75 } },
  { id: 'json', label: 'Local Data', icon: FileJson, chaosPos: { x: 75, y: 85 }, unifiedPos: { x: 80, y: 75 } },
];

const CENTER = { x: 50, y: 30 };
const MCP_NODE = { x: 50, y: 55 };

export default function KnowledgeGraphAnim() {
  const [isUnified, setIsUnified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUnified((prev) => !prev);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[22rem] md:h-[28rem] bg-[#F8FAFF] rounded-xl overflow-hidden border border-slate-200 font-sans select-none">
      
      {/* --- SVG Layer for Connections --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* 1. CHAOS LINES */}
        {!isUnified && SOURCES.map((source) => (
          <motion.line
            key={`chaos-${source.id}`}
            x1={`${source.chaosPos.x}%`}
            y1={`${source.chaosPos.y}%`}
            x2={`${CENTER.x}%`}
            y2={`${CENTER.y}%`}
            stroke={COLORS.chaos}
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            exit={{ opacity: 0 }}
          />
        ))}

        {/* 2. UNIFIED LINES */}
        <AnimatePresence>
          {isUnified && (
            <motion.line
              x1={`${CENTER.x}%`}
              y1={`${CENTER.y + 5}%`}
              x2={`${MCP_NODE.x}%`}
              y2={`${MCP_NODE.y}%`}
              stroke={COLORS.accent}
              className="stroke-[3px] md:stroke-[4px]"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* --- NODES --- */}

      {/* 1. The Central AI Agent */}
      <div 
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
      >
        <motion.div 
          className="w-14 h-14 md:w-20 md:h-20 bg-[#0F1E3D] rounded-2xl flex items-center justify-center shadow-xl relative text-white"
          animate={{ 
            boxShadow: isUnified 
              ? `0 10px 40px -10px ${COLORS.accent}60` 
              : `0 5px 15px -5px rgba(0,0,0,0.1)`
          }}
        >
          <span className="text-xs md:text-lg font-bold">AI Bot</span>          
        </motion.div>
      </div>

      {/* 2. The MCP Gateway */}
      <AnimatePresence>
        {isUnified && (
          <motion.div
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${MCP_NODE.x}%`, top: `${MCP_NODE.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-[#00D4C2] rounded-full flex items-center justify-center shadow-lg z-10 relative">
                  <Server className="w-4 h-4 md:w-6 md:h-6" color="#00D4C2" />
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-[#00D4C2]"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
              </div>
              <span className="bg-[#00D4C2] text-white text-[8px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                Unified Interface
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {SOURCES.map((node) => {
        const x = isUnified ? node.unifiedPos.x : node.chaosPos.x;
        const y = isUnified ? node.unifiedPos.y : node.chaosPos.y;

        return (
          <motion.div
            key={node.id}
            className="absolute z-20 flex flex-col items-center gap-1 md:gap-2"
            initial={false}
            animate={{ left: `${x}%`, top: `${y}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1.2 }}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div 
              className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center shadow-sm transition-colors duration-500 ${
                isUnified ? 'bg-white border-[#00D4C2] text-[#00D4C2]' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <node.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-[8px] md:text-[10px] font-medium text-slate-500 bg-white/80 px-1 rounded whitespace-nowrap">
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* --- Labels / Context --- */}
      <div className="absolute bottom-4 md:bottom-6 w-full text-center px-4">
        <motion.div 
            key={isUnified ? "unified" : "chaos"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="inline-block"
        >
{/* <h3 className="text-[0.55rem] sm:text-[0.65rem] md:text-sm font-semibold text-[#0F1E3D]">
  {isUnified ? "Unified Interface" : "Fragmented Integrations"}
</h3> */}

<p className="text-[0.45rem] sm:text-[0.55rem] md:text-[0.65rem] text-slate-500 mt-0.5 md:mt-1">
  {isUnified 
    ? "Connect all your knowledge sources." 
    : "Multiple custom, brittle API connections."}
</p>

        </motion.div>
      </div>
    </div>
  );
}