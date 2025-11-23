'use client';
import { 
  Palette, Code, Smartphone, BarChart3, Zap, Globe, Bot, 
  Cable, BotMessageSquare, ArrowUpRight 
} from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building scalable and performant web applications with modern technologies",
    color: "#00D4C2",
  },
  {
    icon: BotMessageSquare,
    title: "RAG Systems",
    description: "Retrieval-Augmented Generation systems to enhance LLM responses with real-time data",
    color: "#00E0FF",
  },
  {
    icon: Cable,
    title: "MCP Integration",
    description: "Integrate the Model Context Protocol into your applications for seamless data access",
    color: "#00D4C2",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Design and develop user-friendly mobile applications for iOS and Android",
    color: "#00E0FF",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Leverage ChatGPT and AI to automate and enhance your applications",
    color: "#00D4C2",
  },
  {
    icon: Bot,
    title: "Chatbots",
    description: "Develop intelligent chatbots to improve customer engagement and support",
    color: "#00E0FF",
  },
];

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use Refs for drag logic to prevent re-renders during rapid mouse movement
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Card Effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    // If we are dragging the carousel, don't do the 3D tilt
    if (isDragging || isDown.current) return;
    
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  // Drag Scroll Logic
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMoveScroll = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    if (Math.abs(x - startX.current) > 5) {
      setIsDragging(true);
    }
    
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="services">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#00E0FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4C2]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">
              Explore What We Offer
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveScroll}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-6 justify-start overflow-x-auto overflow-y-hidden pb-8 select-none scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === index;

            return (
              <motion.div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseMove={(e: MouseEvent<HTMLDivElement>) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                  setHoveredCard(null);
                }}
                onClick={handleCardClick}
                className="flex-shrink-0 w-[280px] relative cursor-pointer group"
                style={{
                  transition: "transform 0.1s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 h-72 relative overflow-hidden">
                  
                  {/* Solid Background Fill Transition */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                    style={{
                      backgroundColor: service.color,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Content Wrapper */}
                  <div className="relative z-10 h-full p-6 flex flex-col">
                    
                    {/* Icon - Moves up and out */}
                    <div 
                      className={`mb-4 transition-all duration-300 transform ${
                        isHovered ? "-translate-y-16 opacity-0" : "translate-y-0 opacity-100"
                      }`}
                    >
                        <div 
                          className="w-14 h-14 rounded-lg flex items-center justify-center transition-colors duration-300"
                          style={{ backgroundColor: `${service.color}15` }}
                        >
                          <Icon
                            className="w-7 h-7 transition-colors duration-300"
                            style={{ color: service.color }}
                          />
                        </div>
                    </div>

                    {/* Text Content - Moves up to fill space */}
                    <div 
                      className={`flex-1 transition-all duration-300 transform ${
                        isHovered ? "-translate-y-8" : "translate-y-0"
                      }`}
                    >
                        <h3 
                          className={`mb-3 text-xl transition-all duration-300 ${
                            isHovered ? "text-white font-bold" : "text-[#0F1E3D] font-semibold"
                          }`}
                        >
                          {service.title}
                        </h3>
                        
                        <p 
                          className={`leading-relaxed transition-all duration-300 ${
                            isHovered ? "text-white/90 font-medium" : "text-[#94A3B8] font-normal"
                          }`}
                        >
                          {service.description}
                        </p>
                    </div>

                    {/* Arrow - Appears bottom right */}
                    <ArrowUpRight 
                      className={`absolute bottom-5 right-5 w-6 h-6 text-white transition-all duration-300 ${
                        isHovered 
                          ? "opacity-100 translate-y-0 scale-100" 
                          : "opacity-0 translate-y-4 scale-75"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-[#00E0FF]/30 transition-all"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}