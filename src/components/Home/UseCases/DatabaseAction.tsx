'use client';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Database, ArrowRight, LayoutDashboard } from "lucide-react";

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
    <div className="relative w-full h-64 md:h-80 flex items-center justify-between px-4 md:px-16 bg-[#F8FAFF] rounded-xl overflow-hidden border border-slate-200">
      
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
      <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
        <motion.div 
          className="w-12 h-12 md:w-16 md:h-16 bg-white border border-slate-200 rounded-xl shadow-md flex items-center justify-center"
          animate={{ borderColor: ["#e2e8f0", PRIMARY_CYAN, "#e2e8f0"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Database className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
        </motion.div>
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-slate-500">Postgres</span>
      </div>

      {/* Logic Layer */}
      <motion.div 
        className="relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: PRIMARY_NAVY }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </motion.div>

      {/* Step 2: Action Trigger */}
      <div className="relative z-10 flex flex-col items-center gap-2 md:gap-3">
        <div className="relative">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-slate-200 rounded-xl shadow-md flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
          </div>
        </div>
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-slate-500">Dashboard</span>
      </div>

      {/* Floating Code Snippet */}
      <motion.div
        key={queryIndex}
        className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 bg-[#0A1128] px-2 md:px-3 py-1 md:py-1.5 rounded text-[8px] md:text-[10px] font-mono shadow-xl border border-slate-700 whitespace-nowrap z-20"
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