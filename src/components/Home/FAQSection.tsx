'use client';
import { SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does App help people in problems?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, tempor condimentum commodo tincidunt sit dictumst. Eu placerat to a arcu at sem vitae eros, purus nonprofit organizations for all, Lorem ipsum dolor sit amet, to the consectr adipiscing elit. Volutpat to the full tempor to the condimentum vitae vel purus.",
  },
  {
    question: "What happens if I go over my subscription limits?",
    answer: "When you reach your subscription limits, we'll notify you via email. You'll have the option to upgrade your plan, purchase additional credits, or continue with your current plan and wait until the next billing cycle.",
  },
  {
    question: "Why we are so confident about the future?",
    answer: "Our confidence stems from our dedicated team, innovative technology, and strong customer satisfaction. We continuously invest in research and development to stay ahead of market trends and deliver cutting-edge solutions.",
  },
  {
    question: "Where's the funding goes?",
    answer: "Our funding is strategically allocated across product development, infrastructure improvements, customer support expansion, and research initiatives. We maintain transparency in how we use resources to ensure sustainable growth.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: SetStateAction<number>) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background gradient orbs */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl text-[#0F1E3D] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#94A3B8] mb-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit olutpat tempor.
            </p>
          </motion.div>

          {/* Right Section - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:border-[#00E0FF]/30 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors text-left"
                >
                  <HelpCircle
                    className="w-5 h-5 text-[#00E0FF] flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0F1E3D] leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <ChevronDown className="w-5 h-5 text-[#94A3B8]" strokeWidth={2} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 from-[#00E0FF]/5 to-transparent border-t border-gray-100">
                        <p className="text-[#94A3B8] leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default FAQSection;