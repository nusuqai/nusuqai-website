'use client';
import { Palette, Code, Smartphone, BarChart3, Zap, Globe } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";

const services = [
  {
    icon: Palette,
    title: "Product Design",
    description: "Creating intuitive and engaging user experiences that delight customers",
    color: "#00E0FF",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Building scalable and performant web applications with modern technologies",
    color: "#00D4C2",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions for iOS and Android",
    color: "#00E0FF",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform your data into actionable insights for business growth",
    color: "#00D4C2",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Leverage ChatGPT and AI to automate and enhance your applications",
    color: "#00E0FF",
  },
  {
    icon: Globe,
    title: "Cloud Solutions",
    description: "Secure and scalable cloud infrastructure for your digital products",
    color: "#00D4C2",
  },
];

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    if (isDragging) return;
    
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

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMoveScroll = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
            className="flex gap-6 justify-start overflow-x-auto pb-8  select-none scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
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
                onMouseMove={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => {
                  handleMouseLeave(index);
                  setHoveredCard(null);
                }}
                className="flex-shrink-0 w-[280px] relative"
                style={{
                  transition: "transform 0.1s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-md hover:shadow-md transition-shadow h-64 flex flex-col relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}15 0%, transparent 100%)`,
                      opacity: hoveredCard === index ? 0.5 : 0,
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                      style={{
                        backgroundColor: hoveredCard === index ? service.color : `${service.color}15`,
                      }}
                    >
                      <Icon
                        className="w-8 h-8 transition-colors duration-300"
                        style={{
                          color: hoveredCard === index ? "white" : service.color,
                        }}
                      />
                    </div>
                    <h3 className="text-[#0F1E3D] mb-3 text-xl">{service.title}</h3>
                    <p className="text-[#94A3B8] flex-1 leading-relaxed">{service.description}</p>
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
