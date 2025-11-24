'use client';
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Container } from "../ui/Container";
import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1761570255027-6c251f8fbc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMHNreXNjcmFwZXJzJTIwbmlnaHR8ZW58MXx8fHwxNzYzODEwMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1710797213431-c89129979ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMGJsdWV8ZW58MXx8fHwxNzYzODEwMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1685210461560-080329a34d2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzc2MDYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Handle Scroll for Parallax (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Carousel Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-screen bg-[#F8FAFF] pt-20 overflow-hidden">
      
      {/* MOBILE-ONLY PARALLAX BACKGROUND SHAPES */}
      <div className="absolute inset-0 w-full h-full lg:hidden pointer-events-none z-0">
        <div 
          className="absolute top-1/3 -left-10 w-32 h-32 border-4 border-[#00D4C2]/10 rounded-xl transform rotate-12"
          style={{ transform: `translateY(${-scrollY * 0.3}px) rotate(${12 + scrollY * 0.05}deg)` }}
        />
        <div 
          className="absolute bottom-1/4 right-10 w-16 h-16 bg-[#0F1E3D]/5 rounded-full"
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        />
        <svg 
          className="absolute top-40 left-10 w-24 h-24 opacity-10 text-[#00E0FF]"
          viewBox="0 0 100 100"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <polygon points="50,0 100,100 0,100" fill="currentColor"/>
        </svg>
      </div>

      {/* DESKTOP DECORATION (Original Dots) */}
      <div className="absolute top-32 left-12 w-24 h-24 opacity-30 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 5) * 25 + 12.5}
              cy={Math.floor(i / 5) * 25 + 12.5}
              r="3"
              fill="#00E0FF"
            />
          ))}
        </svg>
      </div>

      <Container className="py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="inline-block">
              <span className="px-4 py-2 bg-[#00E0FF]/10 text-[#0F1E3D] rounded-full text-sm">
                AI Integration & MCP Specialists
              </span>
            </div>

            <h1 className="text-4xl lg:text-4xl text-[#0F1E3D] font-bold lg:font-normal">
              Seamlessly Connect Your LLMs to Your Infrastructure
            </h1>

            <p className="text-base lg:text-lg text-[#94A3B8] max-w-xl mx-auto lg:mx-0">
              Transform isolated chatbots into powerful agents. We specialize in end-to-end AI adoption and MCP architecture to make your systems talk to each other.
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <button 
                className="bg-[#00D4C2] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => window.location.href = "#contact"}
              >
                Book a Meeting
              </button>
              
              <button 
                className="bg-white text-black border px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={() => window.location.href = "#portfolio"}
              >
                Our portfolio
              </button>

              <button
                className="flex items-center gap-3 group transition-all hover:opacity-80 pt-2 lg:pt-0 w-full lg:w-auto justify-center lg:justify-start"
                onClick={() => window.location.href = "#video"}
              >
                <div className="w-10 h-10 rounded-full border-[1.5px] border-[#00E0FF] flex items-center justify-center bg-white group-hover:bg-[#00E0FF]/5 transition-colors">
                  <Play className="w-4 h-4 text-[#00E0FF] fill-current ml-0.5" />
                </div>
                <span className="text-[#0F1E3D] font-medium">
                  Watch our company video
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT - HIDDEN on Mobile */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative aspect-square">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-32 h-32">
                      <div className="w-full h-full bg-[#00E0FF] opacity-80" 
                           style={{
                             clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
                           }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-[#0F1E3D]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-[#0F1E3D]" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-[#00D4C2] w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#00E0FF]/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#00D4C2]/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </Container>

      {/* Wave Transition */}
      <div className="absolute -bottom-5 left-0 right-0 overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-16 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z"
            fill="white"
            className="transition-all duration-300"
          />
        </svg>
      </div>
    </section>
  );
}