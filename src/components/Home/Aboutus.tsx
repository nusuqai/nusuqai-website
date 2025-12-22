'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations("About");
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      id: 'story', 
      type: 'standard',
      label: t('tabs.story.label'),
      title: t('tabs.story.title'),
      content: t('tabs.story.content'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
    },
    { 
      id: 'problem', 
      type: 'standard',
      label: t('tabs.problem.label'),
      title: t('tabs.problem.title'),
      content: t('tabs.problem.content'),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'
    },
    { 
      id: 'solution', 
      type: 'standard',
      label: t('tabs.solution.label'),
      title: t('tabs.solution.title'),
      content: t('tabs.solution.content'),
      image: './aboutus/nusuq.png'
    },
    { 
      id: 'whynow', 
      type: 'standard',
      label: t('tabs.whynow.label'),
      title: t('tabs.whynow.title'),
      content: t('tabs.whynow.content'),
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'
    },
    { 
      id: 'case-studies', 
      type: 'case-studies',
      label: t('tabs.caseStudies.label'),
      items: [
        {
          title: t('tabs.caseStudies.booking.title'),
          content: t('tabs.caseStudies.booking.content'),
          image: './aboutus/hotel.jpg' 
        },
        {
          title: t('tabs.caseStudies.spotify.title'),
          content: t('tabs.caseStudies.spotify.content'),
          image: './aboutus/spotify.jpg'
        }
      ]
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-12 border-b border-gray-100">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className="relative pb-4 px-2 transition-colors duration-300"
            >
              <span
                className={`text-sm lg:text-lg font-medium transition-colors duration-300 ${
                  activeTab === index ? 'text-[#00E0FF]' : 'text-[#94A3B8] hover:text-gray-600'
                }`}
              >
                {tab.label}
              </span>
              
              {/* Sliding Underline Animation */}
              {activeTab === index && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E0FF]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
           <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
           >
              {currentTab.type === 'case-studies' && currentTab.items?.length ? (
                  // --- CASE STUDIES LAYOUT ---
                  <div className="flex flex-col gap-16">
                      {currentTab.items.map((item, index) => (
                          <div 
                              key={index} 
                              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                              }`}
                          >
                              {/* Image Side */}
                              <div className="w-full lg:w-1/2">
                                  <div className="rounded-2xl overflow-hidden shadow-lg h-64 lg:h-80 w-full relative group">
                                      <img 
                                          src={item.image} 
                                          alt={item.title}
                                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-[#0F1E3D]/10" />
                                  </div>
                              </div>
                              {/* Text Side */}
                              <div className="w-full lg:w-1/2">
                                  <h3 className="text-xl lg:text-2xl font-semibold text-[#0F1E3D] mb-4">
                                      {item.title}
                                  </h3>
                                  <p className="text-[#94A3B8] text-base lg:text-lg leading-relaxed">
                                      {item.content}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  // --- STANDARD LAYOUT ---
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Image */}
                      <div>
                          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] relative">
                              <img
                                  src={currentTab.image}
                                  alt={currentTab.title}
                                  className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E3D]/30 to-transparent" />
                          </div>
                      </div>

                      {/* Text Content */}
                      <div>
                          <h3 className="text-2xl lg:text-4xl text-[#0F1E3D] mb-6">
                              {currentTab.title}
                          </h3>
                          <p className="text-[#94A3B8] text-base lg:text-lg leading-relaxed mb-8">
                              {currentTab.content}
                          </p>
                      </div>
                  </div>
              )}
           </motion.div>
        </div>
      </div>
    </section>
  );
}