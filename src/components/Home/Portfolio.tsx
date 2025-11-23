'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    title: "Document Management Application Helps Users Store, Organize, And Access Files Securely In One Place.",
    description: "We delivered a complete web solution through end-to-end development of AWJ Murasalah. The system was architected from the ground up to support secure document workflows, cloud storage, and dynamic approval routes.",
    client: "AWJ Holding Co.",
    features: "24 Custom Feature",
    team: "12+ Team Members"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    title: "E-Commerce Platform Revolutionizes Online Shopping Experience With AI-Powered Recommendations.",
    description: "Built a cutting-edge e-commerce platform featuring AI-driven product recommendations, real-time inventory management, and seamless payment integration.",
    client: "RetailTech Solutions",
    features: "18 Custom Feature",
    team: "8+ Team Members"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    title: "Healthcare Management System Streamlines Patient Care And Medical Records Across Multiple Facilities.",
    description: "Developed an integrated healthcare management system that connects hospitals, clinics, and pharmacies in a unified network.",
    client: "MediCare Network",
    features: "32 Custom Feature",
    team: "15+ Team Members"
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
    <section className="py-20 bg-white relative overflow-hidden">
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