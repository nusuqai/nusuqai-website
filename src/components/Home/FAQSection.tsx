'use client';
import { SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

function FAQSection() {
  const t = useTranslations("FAQ");
  
  const faqs = [
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
    },
    {
      question: t("items.4.question"),
      answer: t("items.4.answer"),
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: SetStateAction<number>) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left side: Title + CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="text-4xl lg:text-5xl text-[#0F1E3D] mb-8 leading-tight">
              {t("title")}
            </h2>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="px-5 py-2.5 bg-[#00D4C2] text-white text-sm font-medium rounded-lg hover:bg-[#00bfad] transition-colors"
              >
                Schedule meeting
              </Link>
              <Link
                href="#services"
                className="px-5 py-2.5 border border-gray-200 text-[#0F1E3D] text-sm font-medium rounded-lg hover:border-[#00D4C2] hover:text-[#00D4C2] transition-colors"
              >
                Our Services
              </Link>
            </div>
          </motion.div>

          {/* Right side: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index}>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                    >
                      <h3 className={`text-base lg:text-lg transition-colors duration-200 ${
                        isOpen ? "text-[#0F1E3D] font-medium" : "text-[#64748B]"
                      } group-hover:text-[#0F1E3D]`}>
                        {faq.question}
                      </h3>
                      <span className="flex-shrink-0 mt-1 text-[#94A3B8]">
                        {isOpen ? (
                          <Minus className="w-4 h-4" strokeWidth={1.5} />
                        ) : (
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 text-[#94A3B8] leading-relaxed text-sm lg:text-base pr-10">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
export default FAQSection;
