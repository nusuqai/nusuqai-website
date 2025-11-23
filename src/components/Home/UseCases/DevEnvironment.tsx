'use client';
import { motion } from "motion/react";
import { Terminal, FileCode, Cpu } from "lucide-react";

export default function DevEnvironmentAnim() {
  const PRIMARY_CYAN = "#00E0FF";
  const PRIMARY_NAVY = "#0F1E3D";

  return (
    <div className="relative w-full h-80 flex items-center justify-center bg-[#F8FAFF] rounded-xl overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(${PRIMARY_NAVY} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M100 200 L 300 160 L 500 200"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Left Node: Local Files */}
      <motion.div
        className="absolute left-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg shadow-md flex items-center justify-center">
          <FileCode className="w-6 h-6 text-slate-600" />
        </div>
        <span className="text-[10px] font-bold tracking-wide uppercase text-slate-400">Local Dir</span>
      </motion.div>

      {/* Right Node: Terminal */}
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="w-12 h-12 bg-[#0F1E3D] border border-slate-800 rounded-lg shadow-md flex items-center justify-center">
          <Terminal className="w-6 h-6 text-[#00E0FF]" />
        </div>
        <span className="text-[10px] font-bold tracking-wide uppercase text-slate-400">Terminal</span>
      </motion.div>

      {/* Center Node: MCP Host */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-4 rounded-full blur-xl opacity-20"
            style={{ backgroundColor: PRIMARY_CYAN }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="w-20 h-20 bg-white border-2 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden"
               style={{ borderColor: PRIMARY_CYAN }}>
            <Cpu className="w-10 h-10" style={{ color: PRIMARY_NAVY }} />
            
            {/* Scanning Effect */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 opacity-50"
              style={{ backgroundColor: PRIMARY_CYAN }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
        <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 text-[10px] font-bold uppercase tracking-wider" style={{ color: PRIMARY_NAVY }}>
          MCP Server
        </div>
      </motion.div>

      {/* Data Packets flowing */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ backgroundColor: PRIMARY_CYAN }}
        initial={{ offsetDistance: "0%" }}
        animate={{ 
          left: ["13%", "50%", "87%"],
          top: ["50%", "45%", "50%"],
          scale: [1, 0.8, 1],
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}