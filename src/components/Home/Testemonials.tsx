'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Lorem Ipsum is simply dummy text of the printing typesetting industry Lorem Ipsum.",
    name: "Robert Browsman",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    rating: 5
  },
  {
    id: 2,
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point using lorem ipsum is it a long established fact that a reader.",
    name: "Nelson Mendela",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    rating: 5
  },
  {
    id: 3,
    text: "Lorem Ipsum is simply dummy text of the printing typesetting industry Lorem Ipsum.",
    name: "Stephen Hawking",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    rating: 5
  },
  {
    id: 4,
    text: "The team delivered exceptional results beyond our expectations. Their attention to detail and commitment to quality is unmatched in the industry.",
    name: "Sarah Johnson",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const DURATION = 5000; // 5 seconds per testimonial

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Get three testimonials to display
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div 
          className="relative h-[350px] mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ 
                    opacity: testimonial.position === 1 ? 1 : 0.6,
                    scale: testimonial.position === 1 ? 1 : 0.95,
                    y: 0 
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full border border-gray-100">
                    {/* Quote Text */}
                    <p className="text-[#64748B] leading-relaxed mb-6 flex-1 text-sm">
                      {testimonial.text}
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#FFC107] text-[#FFC107]"
                        />
                      ))}
                    </div>

                    {/* Author Info */}
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
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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