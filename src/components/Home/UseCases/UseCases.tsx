'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, Database, Bot } from "lucide-react";
import { useTranslations } from "next-intl";

import KnowledgeGraphAnim from "./KnowledgeGraph";
import DatabaseActionAnim from "./DatabaseAction";
import SupportAutomationAnim from "./CustomerSupport";

export default function IntegrationsShowcaseHorizontal() {
  const t = useTranslations("UseCases");
  
  const useCases = [
    {
      id: "knowledge",
      icon: Share2,
      title: t("cases.knowledge.title"),
      subtitle: t("cases.knowledge.subtitle"),
      color: "#00D4C2",
      description: t("cases.knowledge.description"),
      component: KnowledgeGraphAnim
    },
    {
      id: "actions",
      icon: Database,
      title: t("cases.actions.title"),
      subtitle: t("cases.actions.subtitle"),
      color: "#00E0FF", 
      description: t("cases.actions.description"),
      component: DatabaseActionAnim
    },
    {
      id: "support",
      icon: Bot,
      title: t("cases.support.title"),
      subtitle: t("cases.support.subtitle"),
      color: "#00D4C2",
      description: t("cases.support.description"),
      component: SupportAutomationAnim
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="usecases" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl text-[#0F1E3D] mb-4 tracking-tight font-poppins">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-500 font-inter">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => {
              const isActive = activeTab === index;
              const Icon = useCase.icon;
              
              return (
                <button
                  key={useCase.id}
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 border ${
                    isActive 
                      ? "bg-white border-transparent shadow-lg shadow-[#0F1E3D]/5" 
                      : "bg-transparent border-slate-100 hover:bg-[#F8FAFF] hover:border-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                      style={{ backgroundColor: useCase.color }}
                    />
                  )}

                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 mb-4`}
                    style={{ 
                      backgroundColor: isActive ? useCase.color : "#F1F5F9",
                      color: isActive ? "#FFFFFF" : "#94A3B8"
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className={`font-semibold text-lg mb-1 transition-colors font-poppins ${
                      isActive ? "text-[#0F1E3D]" : "text-slate-600"
                    }`}>
                      {useCase.title}
                    </h3>
                    <p className="text-sm font-medium font-inter transition-colors"
                         style={{ color: isActive ? useCase.color : "#94A3B8" }}>
                      {useCase.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-[20px] border border-slate-100 p-8 shadow-sm min-h-[450px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid lg:grid-cols-2 gap-12 h-full items-center"
              >
                
                <div className="w-full h-[350px] lg:h-[400px] bg-slate-50/50 rounded-xl flex items-center justify-center border border-slate-100/50">
                  {(() => {
                    const ActiveComponent = useCases[activeTab].component;
                    return <ActiveComponent />;
                  })()}
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F8FAFF]"
                      style={{ color: useCases[activeTab].color }}
                    >
                      {t("mcpProtocol")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold font-poppins text-[#0F1E3D] mb-4">
                      {useCases[activeTab].title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed font-inter">
                      {useCases[activeTab].description}
                    </p>
                  </div>


                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}