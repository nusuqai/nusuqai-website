'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    title: "Intelligent E-Commerce Assistant Leverages MCP To Connect Salla APIs For Real-Time Store Management And Conversational Shopping.",
    description: "Revolutionizing the merchant and shopper experience by integrating Large Language Models directly with the Salla ecosystem. Using the Model Context Protocol (MCP), this intelligent agent bypasses traditional UI, allowing users to query inventory, process orders, and fetch real-time analytics using natural language.",
    client: "Internal Prototype",
    features: "MCP Integration",
    team: "Demo"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    title: "Dynamic Voucher Management System Enables Businesses To Generate Secure Coupons And Automate Redemption For Seamless Loyalty Campaigns",
    description: "We delivered a robust promotional infrastructure that manages the entire lifecycle of digital coupons. The system handles high-volume code generation with complex validation logic to prevent fraud, ensuring that vouchers are redeemed securely and only within their specific validity parameters.",
    client: "Internal Prototype",
    features: "MCP Integration",
    team: "Demo"
  }
];

export default function PortfolioShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const DURATION = 8000; // 8 seconds per project

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="py-20  bg-gray-50 relative overflow-hidden " id="portfolio">
      {/* Injecting a dynamic style tag for the keyframe. 
        Alternatively, add this to your global CSS or Tailwind config.
      */}
      <style jsx>{`
        @keyframes grow-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">Our Work</h2>
          <p className="text-lg text-[#94A3B8]">
            Explore Demos and Case Studies of Our Recent Projects
          </p>
        </motion.div>

        {/* Progress Bars */}
        <div className="flex gap-2 mb-8">
          {projects.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer relative"
              onClick={() => setCurrentIndex(index)}
            >
              {/* LOGIC: 
                 1. If index < currentIndex: Show full bar (Completed)
                 2. If index === currentIndex: Render the animating bar
                 3. If index > currentIndex: Show empty (handled by container bg)
              */}
              
              {/* Completed Bars */}
              {index < currentIndex && (
                <div className="h-full w-full bg-gradient-to-r from-[#00E0FF] to-[#00D4C2]" />
              )}

              {/* Active Bar with CSS Animation */}
              {index === currentIndex && (
                <div
                  className="h-full bg-gradient-to-r from-[#00E0FF] to-[#00D4C2]"
                  style={{
                    // Simply animate width from 0 to 100
                    animation: `grow-progress ${DURATION}ms linear`,
                    // Native CSS pause functionality
                    animationPlayState: isPaused ? 'paused' : 'running' 
                  }}
                  // When CSS animation ends, React triggers this event
                  onAnimationEnd={handleNext} 
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
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
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 from-[#00E0FF]/20 to-[#00D4C2]/20 z-10" />
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-[500px] object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right - Content */}
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

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-[#94A3B8] mb-1">Client</p>
                    <p className="text-[#0F1E3D] font-medium">{currentProject.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8] mb-1">Integrations</p>
                    <p className="text-[#0F1E3D] font-medium">{currentProject.features}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8] mb-1">Team</p>
                    <p className="text-[#0F1E3D] font-medium">{currentProject.team}</p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#00E0FF] hover:bg-[#00E0FF]/10 transition-all group"
                  >
                    <svg
                      className="w-5 h-5 text-[#94A3B8] group-hover:text-[#00E0FF] transition-colors"
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
                      className="w-5 h-5 text-[#94A3B8] group-hover:text-[#00E0FF] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}