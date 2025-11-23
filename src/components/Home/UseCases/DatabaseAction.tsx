'use client';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Database, Zap, ArrowRight, LayoutDashboard } from "lucide-react";

export default function DatabaseActionAnim() {
  const PRIMARY_CYAN = "#00E0FF";
  const PRIMARY_NAVY = "#0F1E3D";

    const queries = [
    "UPDATE users SET plan='pro' WHERE id=12;",
    "INSERT INTO logs(action) VALUES('deploy');",
    "SELECT AVG(cpu) FROM metrics;",
    "DELETE FROM cache WHERE expired=1;",
    "COMMIT;"
    ];

  const [queryIndex, setQueryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueryIndex((i) => (i + 1) % queries.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 flex items-center justify-between px-16 bg-[#F8FAFF] rounded-xl overflow-hidden">
      
      {/* Background Flow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-1 bg-slate-200/50 rounded-full relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full w-1/3"
            style={{ background: `linear-gradient(90deg, transparent, ${PRIMARY_CYAN}, transparent)` }}
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Step 1: Database */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.div 
          className="w-16 h-16 bg-white border border-slate-200 rounded-xl shadow-md flex items-center justify-center"
          animate={{ borderColor: ["#e2e8f0", PRIMARY_CYAN, "#e2e8f0"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Database className="w-8 h-8 text-slate-600" />
        </motion.div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Postgres</span>
      </div>

      {/* Logic Layer */}
      <motion.div 
        className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: PRIMARY_NAVY }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ArrowRight className="w-6 h-6 text-white" />
      </motion.div>

      {/* Step 2: Action Trigger */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative">

          <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl shadow-md flex items-center justify-center">
            <LayoutDashboard className="w-8 h-8 text-slate-600" />
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dashboard</span>
      </div>

      {/* Floating Code Snippet */}
      <motion.div
        key={queryIndex}
        className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#0A1128] px-3 py-1.5 rounded text-[10px] font-mono shadow-xl border border-slate-700"
        style={{ color: PRIMARY_CYAN }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {queries[queryIndex]}
      </motion.div>

    </div>
  );
}
