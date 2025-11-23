'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Share2, 
  Database, 
  ChevronRight, 
  Bot 
} from "lucide-react";

import KnowledgeGraphAnim from "./KnowledgeGraph";
import DatabaseActionAnim from "./DatabaseAction";
import SupportAutomationAnim from "./CustomerSupport";

const useCases = [

  {
    id: "knowledge",
    icon: Share2,
    title: "Unified MCP Interface",
    subtitle: "Connect all your data",
    color: "#00D4C2",
    description: "Instead of building separate connectors for each AI model, the Model Context Protocol (MCP) provides a unified interface to connect your knowledge sources. This allows any LLM to securely access your databases, file systems, and APIs through a standard protocol, which makes it more efficient to integrate and scale.",
    component: KnowledgeGraphAnim
  },
  {
    id: "actions",
    icon: Database,
    title: "Read/Write Pipelines",
    subtitle: "From query to action",
    color: "#00E0FF", 
    description: "Move beyond passive chat. Setup MCP servers that can listen to database streams and trigger API actions safely, turning your LLM into an active participant in your infrastructure.",
    component: DatabaseActionAnim
  },

  {
    id: "support",
    icon: Bot,
    title: "AI Customer Support",
    subtitle: "Service Automation",
    color: "#00D4C2",
    description: "Instead of generic answers, the bot pulls actual customer history from the CRM and solutions from the Knowledge Base to resolve tickets and trigger workflows automatically.",
    component: SupportAutomationAnim
  }
];

export default function IntegrationsShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className=" bg-white">
      <div className="max-w-7xl mt-10 mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mt-5 mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl text-[#0F1E3D] mb-4 tracking-tight font-poppins">
            Built on the Model Context Protocol
          </h2>
          <p className="text-lg text-slate-500 font-inter">
            We don't just build chatbots. We build interoperable systems that securely connect your AI models to your actual data and tools using standard MCP interfaces.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {useCases.map((useCase, index) => {
              const isActive = activeTab === index;
              const Icon = useCase.icon;
              
              return (
                <button
                  key={useCase.id}
                  onClick={() => setActiveTab(index)}
                  className={`group relative text-left p-5 rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isActive 
                      ? "bg-white border-transparent shadow-xl shadow-[#0F1E3D]/5" 
                      : "bg-transparent border-slate-100 hover:bg-[#F8FAFF] hover:border-slate-200"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                      style={{ backgroundColor: useCase.color }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300`}
                      style={{ 
                        backgroundColor: isActive ? useCase.color : "#F1F5F9",
                        color: isActive ? "#FFFFFF" : "#94A3B8"
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg mb-0.5 transition-colors font-poppins ${
                        isActive ? "text-[#0F1E3D]" : "text-slate-600"
                      }`}>
                        {useCase.title}
                      </h3>
                      <p className="text-sm font-medium font-inter transition-colors"
                         style={{ color: isActive ? useCase.color : "#94A3B8" }}>
                        {useCase.subtitle}
                      </p>
                    </div>

                    <ChevronRight className={`w-5 h-5 mt-1 transition-all duration-300 ${
                      isActive 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 -translate-x-2"
                    }`} style={{ color: useCase.color }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Display Area */}
          <div className="lg:col-span-7 p-2 relative lg:sticky lg:top-8">
            <div className="bg-white rounded-[20px] p-8 h-full shadow-sm min-h-[500px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  {/* The Dynamic Animation Component */}  
                  <div className="mb-8 flex-1 flex items-center justify-center">
                    {(() => {
                      const ActiveComponent = useCases[activeTab].component;
                      return <ActiveComponent />;
                    })()}
                  </div>

                  {/* Contextual Description */}
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFF] text-[#94A3B8]"
                      >
                        MCP Use Case
                      </span>
                      <h3 className="text-xl font-bold font-poppins text-[#0F1E3D]">
                        {useCases[activeTab].title}
                      </h3>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-base font-inter">
                      {useCases[activeTab].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}