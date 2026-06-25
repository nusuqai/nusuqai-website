'use client';
import { 
  Code, Smartphone, Zap, Bot, 
  BarChart3, Compass
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

/* ── Illustrations ──────────────────────────────────────────── */

function AIIllustration() {
  return (
    <svg viewBox="0 0 200 260" fill="none" className="w-full h-auto">
      {/* Network nodes representing AI connecting systems */}
      {/* Central hub */}
      <rect x="60" y="80" width="80" height="80" rx="16" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5"/>
      <rect x="75" y="95" width="50" height="50" rx="8" fill="white" stroke="#00D4C2" strokeWidth="1" opacity="0.6"/>
      <circle cx="100" cy="120" r="14" fill="#00D4C2" opacity="0.1"/>
      <circle cx="100" cy="120" r="8" fill="#00D4C2" opacity="0.25"/>
      <circle cx="100" cy="120" r="3" fill="#00D4C2"/>

      {/* Satellite nodes */}
      <circle cx="40" cy="40" r="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <rect x="32" y="35" width="16" height="10" rx="2" fill="#CBD5E1"/>
      
      <circle cx="160" cy="50" r="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <rect x="153" y="45" width="14" height="10" rx="2" fill="#00D4C2" opacity="0.4"/>

      <circle cx="35" cy="200" r="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <rect x="28" y="195" width="14" height="10" rx="2" fill="#CBD5E1"/>
      
      <circle cx="165" cy="210" r="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <rect x="157" y="205" width="16" height="10" rx="2" fill="#00D4C2" opacity="0.4"/>

      <circle cx="100" cy="20" r="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <rect x="93" y="16" width="14" height="8" rx="2" fill="#CBD5E1"/>

      <circle cx="100" cy="240" r="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <rect x="93" y="236" width="14" height="8" rx="2" fill="#CBD5E1"/>

      {/* Connecting lines */}
      <line x1="54" y1="52" x2="72" y2="88" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="148" y1="58" x2="132" y2="88" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="47" y1="190" x2="68" y2="155" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="153" y1="200" x2="132" y2="155" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="100" y1="32" x2="100" y2="80" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="100" y1="160" x2="100" y2="228" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3"/>

      {/* Connection pins on central hub */}
      <rect x="48" y="108" width="12" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="48" y="118" width="12" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="48" y="128" width="12" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="140" y="108" width="12" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="140" y="118" width="12" height="4" rx="2" fill="#CBD5E1"/>
      <rect x="140" y="128" width="12" height="4" rx="2" fill="#CBD5E1"/>
    </svg>
  );
}

function WebDevIllustration() {
  return (
    <svg viewBox="0 0 260 130" fill="none" className="w-full h-auto">
      {/* Browser window */}
      <rect x="10" y="5" width="240" height="120" rx="8" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5"/>
      <rect x="10" y="5" width="240" height="22" rx="8" fill="#E2E8F0"/>
      <circle cx="25" cy="16" r="3.5" fill="#94A3B8"/>
      <circle cx="37" cy="16" r="3.5" fill="#94A3B8"/>
      <circle cx="49" cy="16" r="3.5" fill="#94A3B8"/>
      <rect x="65" y="11" width="100" height="10" rx="5" fill="#F8FAFC"/>
      {/* Code panel */}
      <rect x="22" y="36" width="55" height="5" rx="2.5" fill="#00D4C2"/>
      <rect x="22" y="47" width="90" height="5" rx="2.5" fill="#CBD5E1"/>
      <rect x="22" y="58" width="70" height="5" rx="2.5" fill="#CBD5E1"/>
      <rect x="22" y="69" width="40" height="5" rx="2.5" fill="#00D4C2" opacity="0.5"/>
      <rect x="22" y="80" width="85" height="5" rx="2.5" fill="#CBD5E1"/>
      <rect x="22" y="91" width="50" height="5" rx="2.5" fill="#CBD5E1"/>
      {/* Preview panel */}
      <rect x="140" y="36" width="100" height="82" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="0.75"/>
      <rect x="150" y="46" width="60" height="7" rx="3.5" fill="#00D4C2" opacity="0.2"/>
      <rect x="150" y="60" width="80" height="5" rx="2.5" fill="#E2E8F0"/>
      <rect x="150" y="72" width="70" height="5" rx="2.5" fill="#E2E8F0"/>
      <rect x="150" y="90" width="50" height="14" rx="4" fill="#00D4C2" opacity="0.15"/>
      <rect x="158" y="94" width="34" height="6" rx="3" fill="#00D4C2"/>
    </svg>
  );
}

function ScalingIllustration() {
  return (
    <svg viewBox="0 0 200 260" fill="none" className="w-full h-auto">
      {/* Vertical bar chart */}
      <rect x="16" y="20" width="22" height="110" rx="4" fill="#00D4C2" opacity="0.3"/>
      <rect x="44" y="40" width="22" height="90" rx="4" fill="#00D4C2" opacity="0.45"/>
      <rect x="72" y="15" width="22" height="115" rx="4" fill="#00D4C2" opacity="0.55"/>
      <rect x="100" y="30" width="22" height="100" rx="4" fill="#00D4C2" opacity="0.7"/>
      <rect x="128" y="10" width="22" height="120" rx="4" fill="#00D4C2" opacity="0.85"/>
      <rect x="156" y="35" width="22" height="95" rx="4" fill="#00D4C2"/>

      {/* Axis labels as abstract shapes */}
      <rect x="18" y="140" width="18" height="4" rx="2" fill="#CBD5E1" opacity="0.5"/>
      <rect x="74" y="140" width="18" height="4" rx="2" fill="#CBD5E1" opacity="0.5"/>
      <rect x="140" y="140" width="18" height="4" rx="2" fill="#CBD5E1" opacity="0.5"/>

      {/* Bottom section: mini trend line */}
      <rect x="16" y="165" width="168" height="60" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.75"/>
      <polyline points="30,200 55,190 80,195 105,180 130,185 155,175 170,178" stroke="#00D4C2" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="105" cy="180" r="3" fill="#CBD5E1"/>
      <circle cx="170" cy="178" r="3" fill="#CBD5E1"/>
    </svg>
  );
}

function MobileIllustration() {
  return (
    <svg viewBox="0 0 160 260" fill="none" className="w-full h-auto max-w-[140px] mx-auto">
      {/* Phone outer frame - soft rounded */}
      <rect x="15" y="5" width="130" height="250" rx="26" fill="#F6F8FA" stroke="#E5E9EE" strokeWidth="1.5"/>
      {/* Screen */}
      <rect x="23" y="30" width="114" height="200" rx="6" fill="white"/>
      {/* Top speaker/camera area */}
      <rect x="55" y="12" width="50" height="10" rx="5" fill="#E5E9EE"/>

      {/* Teal app icon */}
      <rect x="34" y="48" width="28" height="28" rx="7" fill="#00D4C2"/>

      {/* Header bars next to icon */}
      <rect x="72" y="52" width="52" height="6" rx="3" fill="#D8DDE3"/>
      <rect x="72" y="64" width="36" height="5" rx="2.5" fill="#E5E9EE"/>

      {/* Content block 1 */}
      <rect x="34" y="92" width="92" height="32" rx="8" fill="#F0F2F5"/>
      <rect x="42" y="100" width="55" height="5" rx="2.5" fill="#D8DDE3"/>
      <rect x="42" y="110" width="38" height="4" rx="2" fill="#E5E9EE"/>

      {/* Content block 2 */}
      <rect x="34" y="132" width="92" height="32" rx="8" fill="#F0F2F5"/>
      <rect x="42" y="140" width="48" height="5" rx="2.5" fill="#D8DDE3"/>
      <rect x="42" y="150" width="62" height="4" rx="2" fill="#E5E9EE"/>

      {/* Content block 3 */}
      <rect x="34" y="172" width="92" height="28" rx="8" fill="#F0F2F5"/>
      <rect x="42" y="180" width="42" height="5" rx="2.5" fill="#D8DDE3"/>
      <rect x="42" y="190" width="30" height="4" rx="2" fill="#E5E9EE"/>

      {/* Home indicator */}
      <rect x="58" y="238" width="44" height="5" rx="2.5" fill="#D8DDE3"/>
    </svg>
  );
}

function ChatbotIllustration() {
  return (
    <svg viewBox="0 0 220 140" fill="none" className="w-full h-auto">
      {/* Chat interface mockup */}
      <rect x="10" y="5" width="200" height="130" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
      
      {/* Header bar */}
      <rect x="10" y="5" width="200" height="24" rx="10" fill="#F1F5F9"/>
      <circle cx="30" cy="17" r="6" fill="#CBD5E1"/>
      <rect x="42" y="13" width="50" height="5" rx="2.5" fill="#CBD5E1"/>
      <rect x="184" y="13" width="14" height="8" rx="4" fill="#E2E8F0"/>

      {/* User message */}
      <rect x="70" y="40" width="120" height="24" rx="8" fill="#00D4C2" opacity="0.12"/>
      <rect x="82" y="48" width="80" height="5" rx="2.5" fill="#00D4C2" opacity="0.5"/>
      <rect x="92" y="57" width="50" height="4" rx="2" fill="#00D4C2" opacity="0.3"/>

      {/* Bot response */}
      <circle cx="30" cy="86" r="8" fill="#E2E8F0"/>
      <rect x="28" y="83" width="4" height="6" rx="1" fill="#94A3B8"/>
      <rect x="44" y="76" width="130" height="30" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="0.75"/>
      <rect x="56" y="84" width="90" height="5" rx="2.5" fill="#CBD5E1"/>
      <rect x="56" y="94" width="60" height="4" rx="2" fill="#E2E8F0"/>

      {/* Input area */}
      <rect x="22" y="115" width="176" height="12" rx="6" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5"/>
      <rect x="30" y="119" width="60" height="4" rx="2" fill="#CBD5E1" opacity="0.5"/>
    </svg>
  );
}

function ConsultingIllustration() {
  return (
    <svg viewBox="0 0 300 120" fill="none" className="w-full h-auto">
      {/* Flow: connected checkmark nodes like the reference */}
      {/* Node 1 */}
      <rect x="5" y="20" width="52" height="52" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <circle cx="31" cy="46" r="14" fill="#00D4C2" opacity="0.1"/>
      <polyline points="23,46 29,52 40,41" stroke="#00D4C2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Connector 1 */}
      <line x1="57" y1="46" x2="80" y2="46" stroke="#CBD5E1" strokeWidth="1.2"/>
      <circle cx="69" cy="46" r="2.5" fill="#CBD5E1"/>

      {/* Node 2 - offset down */}
      <rect x="80" y="35" width="52" height="52" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <circle cx="106" cy="61" r="14" fill="#00D4C2" opacity="0.1"/>
      <polyline points="98,61 104,67 115,56" stroke="#00D4C2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Connector 2 - curved */}
      <path d="M132,61 C148,61 148,36 164,36" stroke="#CBD5E1" strokeWidth="1.2" fill="none"/>
      <circle cx="148" cy="48" r="2.5" fill="#CBD5E1"/>

      {/* Node 3 - offset up */}
      <rect x="164" y="10" width="52" height="52" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <circle cx="190" cy="36" r="14" fill="#00D4C2" opacity="0.1"/>
      <polyline points="182,36 188,42 199,31" stroke="#00D4C2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Connector 3 */}
      <line x1="216" y1="36" x2="240" y2="50" stroke="#CBD5E1" strokeWidth="1.2"/>
      <circle cx="228" cy="43" r="2.5" fill="#CBD5E1"/>

      {/* Node 4 */}
      <rect x="240" y="28" width="52" height="52" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2"/>
      <circle cx="266" cy="54" r="14" fill="#00D4C2" opacity="0.1"/>
      <polyline points="258,54 264,60 275,49" stroke="#00D4C2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Decorative dots */}
      <circle cx="50" cy="95" r="3" fill="#E2E8F0"/>
      <circle cx="130" cy="100" r="2" fill="#E2E8F0"/>
      <circle cx="220" cy="90" r="2.5" fill="#E2E8F0"/>
    </svg>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section className="py-16 lg:py-24 bg-white relative" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D]">
            {t("title")}
          </h2>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* ─── Card 1: AI Integration ─── TALL LEFT (spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 lg:row-span-2 group"
          >
            <div className="h-full rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 lg:p-7 flex flex-col transition-shadow duration-300 hover:shadow-lg overflow-hidden">
              {/* Illustration fills the top */}
              <div className="flex-1 flex items-center justify-center py-4 lg:py-6 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full max-w-[180px]">
                  <AIIllustration />
                </div>
              </div>
              {/* Text pinned to bottom */}
              <div className="mt-auto pt-4">
                <h3 className="text-xl font-semibold text-[#0F1E3D] mb-1">
                  {t("items.ai.title")}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {t("items.ai.description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Card 2: Web Development ─── MIDDLE TOP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="group"
          >
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 flex flex-col transition-shadow duration-300 hover:shadow-lg">
              {/* Illustration */}
              <div className="mb-5 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <WebDevIllustration />
              </div>
              {/* Text */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold text-[#0F1E3D] mb-1">
                  {t("items.webDev.title")}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {t("items.webDev.description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Card 3: RAG Systems ─── TALL RIGHT (spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-1 lg:row-span-2 group"
          >
            <div className="h-full rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 lg:p-7 flex flex-col transition-shadow duration-300 hover:shadow-lg overflow-hidden">
              {/* Illustration fills the top */}
              <div className="flex-1 flex items-center justify-center py-4 lg:py-6 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full max-w-[180px]">
                  <ScalingIllustration />
                </div>
              </div>
              {/* Text pinned to bottom */}
              <div className="mt-auto pt-4">
                <h3 className="text-xl font-semibold text-[#0F1E3D] mb-1">
                  {t("items.rag.title")}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {t("items.rag.description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Card 4: Mobile Apps ─── MIDDLE BOTTOM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 flex flex-col transition-shadow duration-300 hover:shadow-lg">
              {/* Text first for this card (varying layout) */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#0F1E3D] mb-1">
                  {t("items.mobile.title")}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {t("items.mobile.description")}
                </p>
              </div>
              {/* Illustration at bottom */}
              <div className="mt-auto opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <MobileIllustration />
              </div>
            </div>
          </motion.div>

          {/* ─── Card 5: Chatbots ─── BOTTOM LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="group"
          >
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 flex flex-col transition-shadow duration-300 hover:shadow-lg">
              {/* Illustration */}
              <div className="mb-5 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <ChatbotIllustration />
              </div>
              {/* Text */}
              <div className="mt-auto">
                <h3 className="text-lg font-semibold text-[#0F1E3D] mb-1">
                  {t("items.chatbots.title")}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {t("items.chatbots.description")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Card 6: Consulting ─── BOTTOM RIGHT WIDE (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="md:col-span-2 lg:col-span-2 group"
          >
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6 transition-shadow duration-300 hover:shadow-lg">
              {/* Text side */}
              <div className="lg:w-2/5 flex-shrink-0">
                <h3 className="text-lg font-semibold text-[#0F1E3D] mb-1">
                  {t("items.consulting.title")}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {t("items.consulting.description")}
                </p>
              </div>
              {/* Illustration side */}
              <div className="lg:w-3/5 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                <ConsultingIllustration />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}