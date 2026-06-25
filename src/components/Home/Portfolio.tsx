'use client';
import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { ChatModal } from "./Demo/ChatModal";
import { ArrowRight } from "lucide-react";
import { sendChatMessage } from "@/app/actions/chat";
import { sendShopifyChatMessage } from "@/app/actions/shopifyChat";
import { sallaChatConfig, shopifyChatConfig } from "@/config/chatConfigs";
import { useSallaAuth } from "@/lib/useSallaAuth";

export default function PortfolioShowcase() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeDemoType, setActiveDemoType] = useState<'salla' | 'shopify' | 'clinica'>('salla');
  const sallaAuth = useSallaAuth();
  
  const projects = [
    {
      id: 1,
      image: "./demo.png",
      title: t("projects.ecommerce.title"),
      description: t("projects.ecommerce.description"),
      client: t("projects.ecommerce.client"),
      features: t("projects.ecommerce.features"),
      team: t("projects.ecommerce.team"),
      demoType: 'salla' as const,
    },
    {
      id: 2,
      image: "./demo2.png",
      title: t("projects.shopify.title"),
      description: t("projects.shopify.description"),
      client: t("projects.shopify.client"),
      features: t("projects.shopify.features"),
      team: t("projects.shopify.team"),
      demoType: 'shopify' as const,
    },
    {
      id: 3,
      image: "./demo3.png",
      title: t("projects.clinica.title"),
      description: t("projects.clinica.description"),
      client: t("projects.clinica.client"),
      features: t("projects.clinica.features"),
      team: t("projects.clinica.team"),
      demoType: 'clinica' as const,
    },
  ];

  const IsRTL = ["ar"].includes(locale);

  const handleTryDemo = (project: typeof projects[0]) => {
    if (project.demoType === 'clinica') {
      window.open('https://clinica.nusuqai.com/', '_blank');
      return;
    }
    setActiveDemoType(project.demoType);
    setIsChatOpen(true);
  };

  const chatConfig = activeDemoType === 'shopify' ? shopifyChatConfig : sallaChatConfig;
  const chatAction = activeDemoType === 'shopify' ? sendShopifyChatMessage : sendChatMessage;

  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden" id="portfolio">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#00D4C2] font-medium flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                {t("stats.client")}
              </span>
            </div>
            <div className="lg:text-right">
              <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-2">{t("title")}</h2>
              <p className="text-lg text-[#94A3B8]">{t("description")}</p>
            </div>
          </motion.div>

          {/* Bento Grid - all projects visible */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Row 1: Wide left (3/5) + Narrow right (2/5) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 group cursor-pointer"
              onClick={() => handleTryDemo(projects[0])}
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#94A3B8] mb-1">{projects[0].features}</p>
                    <h3 className="text-lg font-semibold text-[#0F1E3D] mb-1 line-clamp-2">{projects[0].title}</h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-2">{projects[0].description}</p>
                  </div>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#00D4C2] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D4C2] transition-colors rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 group cursor-pointer"
              onClick={() => handleTryDemo(projects[1])}
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={projects[1].image}
                    alt={projects[1].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#94A3B8] mb-1">{projects[1].features}</p>
                    <h3 className="text-base font-semibold text-[#0F1E3D] mb-1 line-clamp-2">{projects[1].title}</h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-3">{projects[1].description}</p>
                  </div>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#00D4C2] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D4C2] transition-colors rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Row 2: Narrow left (2/5) + Wide right (3/5) - flipped for asymmetry */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="lg:col-span-2 group cursor-pointer"
              onClick={() => handleTryDemo(projects[2])}
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={projects[2].image}
                    alt={projects[2].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#94A3B8] mb-1">{projects[2].features}</p>
                    <h3 className="text-base font-semibold text-[#0F1E3D] mb-1 line-clamp-2">{projects[2].title}</h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-3">{projects[2].description}</p>
                  </div>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#00D4C2] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D4C2] transition-colors rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Third project as wide card on right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-3 group cursor-pointer"
              onClick={() => handleTryDemo(projects[0])}
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#94A3B8] mb-1">{projects[0].features}</p>
                    <h3 className="text-lg font-semibold text-[#0F1E3D] mb-1 line-clamp-2">{projects[0].title}</h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-2">{projects[0].description}</p>
                  </div>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#00D4C2] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D4C2] transition-colors rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        sendChatMessage={chatAction}
        config={chatConfig}
        enableFileUpload={activeDemoType === 'salla'}
        requiresAuth={activeDemoType === 'salla'}
        isAuthenticated={activeDemoType === 'salla' ? sallaAuth.isAuthenticated : true}
        isAuthLoading={activeDemoType === 'salla' ? sallaAuth.isLoading : false}
        onLogin={sallaAuth.login}
        onLogout={sallaAuth.logout}
      />
    </>
  );
}