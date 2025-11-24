'use client';
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Container } from "../ui/Container";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";


export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const heroSlides = [
    { 
      image: "./1.png", 
      title: t("slides.ecommerce.title"),
      subtext: t("slides.ecommerce.subtitle")
    },
    { 
      image: "./2.png", 
      title: t("slides.warehouse.title"),
      subtext: t("slides.warehouse.subtitle")
    },
    { 
      image: "./3.jpg", 
      title: t("slides.portal.title"),
      subtext: t("slides.portal.subtitle")
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION_MS = 10000;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const step = 100 / (SLIDE_DURATION_MS / 100); 

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % heroSlides.length);
          return 0;
        }
        return prev + step; 
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  };
  const isRtl = ["ar"].includes(locale); 
  const directionMultiplier = isRtl ? -1 : 1;
  return (
    <section className="rtl:text-center relative min-h-screen bg-[#F8FAFF] pt-20 overflow-hidden">
      
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

      {/* DESKTOP DECORATION */}

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
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left lg:rtl:text-right">
            <div className="inline-block">
              <span className="px-4 py-2 bg-[#00E0FF]/10 text-[#0F1E3D] rounded-full text-sm">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-4xl lg:text-4xl text-[#0F1E3D] font-bold lg:font-normal">
              {t("title")}
            </h1>

            <p className="text-base lg:text-lg text-[#94A3B8] max-w-xl mx-auto lg:mx-0">
              {t("description")}
            </p>

            <div className=" flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <button 
                className="bg-[#00D4C2] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => window.location.href = "#contact"}
              >
                {t("bookMeeting")}
              </button>
              
              <button 
                className="bg-white text-black border px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={() => window.location.href = "#portfolio"}
              >
                {t("portfolio")}
              </button>
            </div>

            <button
              className="flex items-center gap-3 group transition-all hover:opacity-80 pt-2 lg:pt-0 w-full lg:w-auto justify-center lg:justify-start"
              onClick={() => window.location.href = "#video"}
            >
              <div className="w-10 h-10 rounded-full border-[1.5px] border-[#00E0FF] flex items-center justify-center bg-white group-hover:bg-[#00E0FF]/5 transition-colors">
                <Play className="w-4 h-4 text-[#00E0FF] fill-current ml-0.5" />
              </div>
              <span className="text-[#0F1E3D] font-medium">
                {t("tryDemo")}
              </span>
            </button>
          </div>

          {/* RIGHT CONTENT - 3D Card Stack */}
          <div className="relative hidden lg:block h-[500px]" style={{ perspective: '1500px' }}>
            {heroSlides.map((slide, index) => {
              const position = (index - currentSlide + heroSlides.length) % heroSlides.length;
              
              return (
                <div
                  key={index}
                  className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out"
                  style={{
                    zIndex: heroSlides.length - position,
                    transform: `
                      translateX(${position * 35 * directionMultiplier}px) 
                      translateY(${position * 25}px) 
                      rotateY(${position * -10 * directionMultiplier}deg) 
                      scale(${1 - position * 0.08})
                    `,
                    transformStyle: 'preserve-3d',
                    opacity: position < 3 ? 1 : 0,
                    pointerEvents: position === 0 ? 'auto' : 'none',
                  }}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={slide.image}
                      alt={`Card ${index + 1}: ${slide.title}`}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {position === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div 
                          className="h-full bg-[#00E0FF] transition-all duration-100 ease-linear"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl">{slide.title}</h3>
                          <p className="text-sm text-white/80">{slide.subtext}</p>
                        </div>
                        {position === 0 && (
                          <button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
                          >
                          {
                            isRtl 
                            ? <ChevronLeft className="w-5 h-5" />
                            : <ChevronRight className="w-5 h-5" /> 
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
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