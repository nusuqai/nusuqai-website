'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { ChatModal } from "./Demo/ChatModal"; // Import the ChatModal component
import { ArrowRight } from "lucide-react";

export default function PortfolioShowcase() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();
  const [isChatOpen, setIsChatOpen] = useState(false); // Add state for chat modal
  
  const projects = [
    {
      id: 1,
      image: "./demo.png",
      title: t("projects.ecommerce.title"),
      description: t("projects.ecommerce.description"),
      client: t("projects.ecommerce.client"),
      features: t("projects.ecommerce.features"),
      team: t("projects.ecommerce.team")
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const DURATION = 8000; 

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];
  const IsRTL = ["ar"].includes(locale);
  
  return (
    <>
      <section className="py-20 bg-gray-50 relative overflow-hidden" id="portfolio">
        <style jsx>{`
          @keyframes grow-progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">{t("title")}</h2>
            <p className="text-lg text-[#94A3B8]">
              {t("description")}
            </p>
          </motion.div>

          <div className="flex gap-2 mb-8">
            {projects.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer relative"
                onClick={() => setCurrentIndex(index)}
              >
                {index < currentIndex && (
                  <div className="h-full w-full bg-gradient-to-r from-[#00E0FF] to-[#00D4C2]" />
                )}
                {index === currentIndex && (
                  <div
                    className="h-full bg-gradient-to-r from-[#00E0FF] to-[#00D4C2]"
                    style={{
                      animation: `grow-progress ${DURATION}ms linear`,
                      animationPlayState: isPaused ? 'paused' : 'running' 
                    }}
                    onAnimationEnd={handleNext} 
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square lg:aspect-[4/3]"
                >
                  <div className="absolute inset-0 from-[#00E0FF]/20 to-[#00D4C2]/20 z-10" />
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl lg:text-3xl text-[#0F1E3D] mb-6 leading-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-[#94A3B8] leading-relaxed mb-8">
                    {currentProject.description}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                      <p className="text-sm text-[#94A3B8] mb-1">{t("stats.client")}</p>
                      <p className="text-[#0F1E3D] font-medium">{currentProject.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#94A3B8] mb-1">{t("stats.integrations")}</p>
                      <p className="text-[#0F1E3D] font-medium">{currentProject.features}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#94A3B8] mb-1">{t("stats.team")}</p>
                      <p className="text-[#0F1E3D] font-medium">{currentProject.team}</p>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#00E0FF] hover:bg-[#00E0FF]/10 transition-all group"
                    >
                      <svg
                        className="rtl:rotate-180 w-5 h-5 text-[#94A3B8] group-hover:text-[#00E0FF] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#00E0FF] hover:bg-[#00E0FF]/10 transition-all group"
                    >
                      <svg
                        className="rtl:rotate-180 w-5 h-5 text-[#94A3B8] group-hover:text-[#00E0FF] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Try Demo Link */}
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="ml-auto flex items-center gap-2 text-[#0F1E3D] hover:text-[#00E0FF] transition-colors group"
                    >
                      <span className="text-sm font-medium">Try demo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}