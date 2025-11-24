'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  
  const testimonials = [
    {
      id: 1,
      text: t("items.1.text"),
      name: t("items.1.name"),
      company: t("items.1.company"),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      rating: 5
    },
    {
      id: 2,
      text: t("items.2.text"),
      name: t("items.2.name"),
      company: t("items.2.company"),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      rating: 5
    },
    {
      id: 3,
      text: t("items.3.text"),
      name: t("items.3.name"),
      company: t("items.3.company"),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
      rating: 5
    },
    {
      id: 4,
      text: t("items.4.text"),
      name: t("items.4.name"),
      company: t("items.4.company"),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const DURATION = 5000;
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  const handleDotClick = (index: number) => {
    const current = currentIndex;
    if (index > current) {
      setDirection(1);
    } else if (index < current) {
      setDirection(-1);
    }
    setCurrentIndex(index);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      if (offset > 0) {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      } else {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    const count = isMobile ? 1 : 3;
    
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ 
        ...testimonials[index], 
        position: i,
        uniqueKey: `${index}-${currentIndex}-${i}`
      });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section id="about" className="py-20 relative overflow-hidde  bg-gray-50">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0F1E3D 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div 
          className="relative mb-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative py-6 pointer-events-none">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              {visibleTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.uniqueKey}
                  layout
                  custom={direction}
                  initial={{ x: direction * 400, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: isMobile ? 1 : (testimonial.position === 1 ? 1 : 0.7),
                    scale: isMobile ? 1 : (testimonial.position === 1 ? 1 : 0.95),
                  }}
                  exit={{ x: direction * -400, opacity: 0 }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="flex"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col w-full border border-gray-100 pointer-events-auto cursor-pointer min-h-[300px] md:min-h-0">
                    <p className="text-[#64748B] leading-relaxed mb-6 flex-1 text-sm">
                      {testimonial.text}
                    </p>

                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#FFC107] text-[#FFC107]"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
                      />
                      <div>
                        <h4 className="text-[#0F1E3D] font-semibold">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#94A3B8] text-sm">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-[#00E0FF] to-[#00D4C2]'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}