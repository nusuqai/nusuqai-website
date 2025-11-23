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
  Layers,
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

const CENTER = { x: 50, y: 30 }; // AI Agent sits higher up now
const MCP_NODE = { x: 50, y: 55 }; // The MCP Bridge sits in the middle

export default function MCPArchitectureAnim() {
  const [isUnified, setIsUnified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUnified((prev) => !prev);
    }, 4000); // Toggle every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[28rem] bg-[#F8FAFF] rounded-xl overflow-hidden border border-slate-200 font-sans select-none">
      
      {/* --- SVG Layer for Connections --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* 1. CHAOS LINES (Agent to Sources directly) */}
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

        {/* 2. UNIFIED LINES (MCP Logic) */}
        <AnimatePresence>
          {isUnified && (
            <>
              {/* A. The Main Pipeline: Agent -> MCP */}
              <motion.line
                x1={`${CENTER.x}%`}
                y1={`${CENTER.y + 5}%`} // Start slightly below agent
                x2={`${MCP_NODE.x}%`}
                y2={`${MCP_NODE.y}%`}
                stroke={COLORS.accent}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />


            </>
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
          className="w-20 h-20 bg-[#0F1E3D] rounded-2xl flex items-center justify-center shadow-xl relative text-white"
          animate={{ 
            boxShadow: isUnified 
              ? `0 10px 40px -10px ${COLORS.accent}60` 
              : `0 5px 15px -5px rgba(0,0,0,0.1)`
          }}
        >
<span className="text-l font-bold">AI Bot</span>           
        </motion.div>
      </div>

      {/* 2. The MCP Gateway (Only appears in Unified Mode) */}
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
              <div className="w-16 h-16 bg-white border-2 border-[#00D4C2] rounded-full flex items-center justify-center shadow-lg z-10 relative">
                  <Server size={24} color="#00D4C2" />
                  
                  {/* Pulse Rings */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-[#00D4C2]"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
              </div>
              <span className="bg-[#00D4C2] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                MCP Protocol
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. The Data Sources (Moving Nodes) */}
      {SOURCES.map((node) => {
        // Determine position based on state
        const x = isUnified ? node.unifiedPos.x : node.chaosPos.x;
        const y = isUnified ? node.unifiedPos.y : node.chaosPos.y;

        return (
          <motion.div
            key={node.id}
            className="absolute z-20 flex flex-col items-center gap-2"
            initial={false} // Disables initial animation render, allows immediate layout
            animate={{ 
              left: `${x}%`, 
              top: `${y}%`,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 20,
              mass: 1.2
            }}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div 
              className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-sm transition-colors duration-500 ${
                isUnified ? 'bg-white border-[#00D4C2] text-[#00D4C2]' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <node.icon size={20} />
            </div>
            <span className="text-[10px] font-medium text-slate-500 bg-white/80 px-1 rounded">
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* --- Labels / Context --- */}
      <div className="absolute bottom-5 w-full text-center">
        <motion.div 
            key={isUnified ? "unified" : "chaos"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="inline-block"
        >
            <h3 className="text-m font-semibold text-[#0F1E3D]">
                {isUnified ? "Unified MCP Interface" : "Fragmented Integrations"}
            </h3>
            <p className="text-[0.7rem] text-slate-500 mt-1">
                {isUnified 
                    ? "One protocol connecting all knowledge sources." 
                    : "Multiple custom, brittle API connections."}
            </p>
        </motion.div>
      </div>

    </div>
  );
}