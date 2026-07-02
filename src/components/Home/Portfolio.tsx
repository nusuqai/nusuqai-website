'use client';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { ChatModal } from "./Demo/ChatModal";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { sendChatMessage } from "@/app/actions/chat";
import { sendShopifyChatMessage } from "@/app/actions/shopifyChat";
import { sallaChatConfig, shopifyChatConfig } from "@/config/chatConfigs";
import { useSallaAuth } from "@/lib/useSallaAuth";

// Clockwise direction mapping for each grid position:
// Position layout:
//   [0: wide-left]  [1: narrow-right]
//   [2: narrow-left] [3: wide-right]
//
// "Clockwise" means: 0→1→3→2→0
// When going NEXT (clockwise), new items enter from the clockwise direction
// When going PREV (counter-clockwise), new items enter from the counter-clockwise direction

const positionAnimations = {
  // Position 0 (top-left): enters from left, exits to bottom
  0: {
    next: { enter: { x: -80, y: 0, opacity: 0 }, exit: { x: 0, y: 80, opacity: 0 } },
    prev: { enter: { x: 0, y: 80, opacity: 0 }, exit: { x: -80, y: 0, opacity: 0 } },
  },
  // Position 1 (top-right): enters from top, exits to right
  1: {
    next: { enter: { x: 0, y: -80, opacity: 0 }, exit: { x: 80, y: 0, opacity: 0 } },
    prev: { enter: { x: 80, y: 0, opacity: 0 }, exit: { x: 0, y: -80, opacity: 0 } },
  },
  // Position 2 (bottom-left): enters from bottom, exits to left
  2: {
    next: { enter: { x: 0, y: 80, opacity: 0 }, exit: { x: -80, y: 0, opacity: 0 } },
    prev: { enter: { x: -80, y: 0, opacity: 0 }, exit: { x: 0, y: 80, opacity: 0 } },
  },
  // Position 3 (bottom-right): enters from right, exits to top
  3: {
    next: { enter: { x: 80, y: 0, opacity: 0 }, exit: { x: 0, y: -80, opacity: 0 } },
    prev: { enter: { x: 0, y: -80, opacity: 0 }, exit: { x: 80, y: 0, opacity: 0 } },
  },
};

export default function PortfolioShowcase() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeDemoType, setActiveDemoType] = useState<'salla' | 'shopify' | 'clinica'>('salla');
  const sallaAuth = useSallaAuth();
  const [rotationIndex, setRotationIndex] = useState(0);
  const directionRef = useRef<'next' | 'prev'>('next');

  const allProjects = [
    {
      id: 1,
      image: "./demo.png",
      title: t("projects.ecommerce.title"),
      description: t("projects.ecommerce.description"),
      features: t("projects.ecommerce.features"),
      demoType: 'salla' as const,
      actionType: 'demo' as const,
    },
    {
      id: 2,
      image: "./demo2.png",
      title: t("projects.shopify.title"),
      description: t("projects.shopify.description"),
      features: t("projects.shopify.features"),
      demoType: 'shopify' as const,
      actionType: 'demo' as const,
    },
    {
      id: 3,
      image: "./demo3.png",
      title: t("projects.clinica.title"),
      description: t("projects.clinica.description"),
      features: t("projects.clinica.features"),
      demoType: 'clinica' as const,
      actionType: 'link' as const,
      url: 'https://clinica.nusuqai.com/',
    },
    {
      id: 4,
      image: "./demo4.png",
      title: t("projects.elmentor.title"),
      description: t("projects.elmentor.description"),
      features: t("projects.elmentor.features"),
      demoType: 'salla' as const,
      actionType: 'link' as const,
      url: 'https://elmentor.nusuqai.com/en',
    },
    {
      id: 5,
      image: "./demo5.png",
      title: t("projects.realestate.title"),
      description: t("projects.realestate.description"),
      features: t("projects.realestate.features"),
      demoType: 'salla' as const,
      actionType: 'link' as const,
      url: 'https://realestate.nusuqai.com/en',
    },
  ];

  // Get 4 visible projects based on rotation index (circular)
  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(allProjects[(rotationIndex + i) % allProjects.length]);
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();
  const direction = directionRef.current;

  const handleNext = () => {
    directionRef.current = 'next';
    setRotationIndex((prev) => (prev + 1) % allProjects.length);
  };

  const handlePrev = () => {
    directionRef.current = 'prev';
    setRotationIndex((prev) => (prev - 1 + allProjects.length) % allProjects.length);
  };

  const handleProjectClick = (project: typeof allProjects[0]) => {
    if (project.actionType === 'link' && 'url' in project) {
      window.open(project.url, '_blank');
      return;
    }
    setActiveDemoType(project.demoType);
    setIsChatOpen(true);
  };

  const chatConfig = activeDemoType === 'shopify' ? shopifyChatConfig : sallaChatConfig;
  const chatAction = activeDemoType === 'shopify' ? sendShopifyChatMessage : sendChatMessage;

  const renderCard = (project: typeof allProjects[0], posIndex: number, isWide: boolean) => {
    const anim = positionAnimations[posIndex as keyof typeof positionAnimations];
    const dir = anim[direction];

    return (
      <AnimatePresence mode="wait" key={`pos-${posIndex}`}>
        <motion.div
          key={`pos${posIndex}-${project.id}`}
          initial={dir.enter}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={dir.exit}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className={`${isWide ? 'lg:col-span-3' : 'lg:col-span-2'} group cursor-pointer`}
          onClick={() => handleProjectClick(project)}
        >
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className={`relative overflow-hidden ${isWide ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#94A3B8] mb-1">{project.features}</p>
                <h3 className={`${isWide ? 'text-lg' : 'text-base'} font-semibold text-[#0F1E3D] mb-1 line-clamp-2`}>{project.title}</h3>
                <p className={`text-sm text-[#94A3B8] ${isWide ? 'line-clamp-2' : 'line-clamp-3'}`}>{project.description}</p>
              </div>
              <span className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#00D4C2] transition-colors">
                <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00D4C2] transition-colors rtl:rotate-180" />
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

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

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Row 1: Wide left (3/5) + Narrow right (2/5) */}
            {renderCard(visibleProjects[0], 0, true)}
            {renderCard(visibleProjects[1], 1, false)}

            {/* Row 2: Narrow left (2/5) + Wide right (3/5) */}
            {renderCard(visibleProjects[2], 2, false)}
            {renderCard(visibleProjects[3], 3, true)}
          </div>

          {/* Arrow Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#00D4C2] hover:bg-[#00D4C2]/5 transition-all duration-200 focus:outline-none"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5 text-[#94A3B8] hover:text-[#00D4C2] transition-colors" />
            </button>
            <span className="text-sm text-[#94A3B8] font-medium tabular-nums min-w-[3ch] text-center">
              {rotationIndex + 1}/{allProjects.length}
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#00D4C2] hover:bg-[#00D4C2]/5 transition-all duration-200 focus:outline-none"
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5 text-[#94A3B8] hover:text-[#00D4C2] transition-colors" />
            </button>
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