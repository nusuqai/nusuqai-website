'use client';
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Container } from "../ui/Container";
import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1761570255027-6c251f8fbc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBnbGFzcyUyMHNreXNjcmFwZXJzJTIwbmlnaHR8ZW58MXx8fHwxNzYzODEwMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1710797213431-c89129979ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMGJsdWV8ZW58MXx8fHwxNzYzODEwMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1685210461560-080329a34d2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzc2MDYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <section className="relative min-h-screen bg-[#F8FAFF] pt-20">
      {/* Decorative dotted pattern */}
      <div className="absolute top-32 left-12 w-24 h-24 opacity-30">
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

      <Container className="py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-[#00E0FF]/10 text-[#0F1E3D] rounded-full">
                AI Integration & MCP Specialists
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl text-[#0F1E3D]">
              Seamlessly Connect Your LLMs to Your Infrastructure
            </h1>

            <p className="text-lg text-[#94A3B8]">
              Transform isolated chatbots into powerful agents. We specialize in end-to-end AI adoption and MCP architecture to make your systems talk to each other.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-[var(--nusuqai-teal)] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    onClick={ 
                    () => {
                        window.location.href = "#contact";
                    }
                }>
            Book a Meeting
            </button>
            <button className="bg-white text-black border px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={
                    () => {
                        window.location.href = "#portfolio";
                    }
                }>
                Our portfolio
            </button>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Images */}
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
                    {/* Geometric overlay */}
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

              {/* Navigation Arrows */}
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

              {/* Dots */}
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
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#00E0FF]/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#00D4C2]/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
     </Container>

      {/* Wave Transition */}
      <div className="absolute -bottom-5 left-0 right-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24 lg:h-32"
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
