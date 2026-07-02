'use client';
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  Compass,
  Palette,
  BrainCircuit,
  Cable,
  ShieldCheck,
  Rocket,
} from "lucide-react";

const steps = [
  { key: "discovery", icon: Compass },
  { key: "design", icon: Palette },
  { key: "development", icon: BrainCircuit },
  { key: "integration", icon: Cable },
  { key: "testing", icon: ShieldCheck },
  { key: "launch", icon: Rocket },
];

export default function ProcessSection() {
  const t = useTranslations("Process");

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFF] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">
            {t("title1")}{" "}
            <span className="text-[#00D4C2]">{t("title2")}</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* ── Desktop: 2-row snake with curvy connectors ── */}
        <div className="hidden lg:flex flex-col gap-0">
          {/* Row 1: steps 1 → 2 → 3 */}
          <div className="flex items-start">
            <StepNode step={steps[0]} index={0} t={t} delay={0} />
            <CurvyConnector direction="right" />
            <StepNode step={steps[1]} index={1} t={t} delay={0.1} />
            <CurvyConnector direction="right" />
            <StepNode step={steps[2]} index={2} t={t} delay={0.2} />
          </div>

          {/* Turn connector: right side, curves down */}
          <div className="flex justify-end" style={{ paddingRight: 60 }}>
            <TurnConnector side="right" />
          </div>

          {/* Row 2: steps 6 ← 5 ← 4 (reversed visually) */}
          <div className="flex items-start direction-ltr">
            <StepNode step={steps[5]} index={5} t={t} delay={0.5} />
            <CurvyConnector direction="left" />
            <StepNode step={steps[4]} index={4} t={t} delay={0.4} />
            <CurvyConnector direction="left" />
            <StepNode step={steps[3]} index={3} t={t} delay={0.3} />
          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="lg:hidden relative pl-16">
          <div className="absolute left-[26px] top-4 bottom-4 w-px border-l-2 border-dashed border-[#00D4C2]/20" />

          <div className="space-y-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="relative"
                >
                  {/* Node on timeline */}
                  <div className="absolute -left-16 top-2 w-12 h-12 rounded-full bg-white border-2 border-[#00D4C2]/20 flex items-center justify-center shadow-sm z-10">
                    <Icon className="w-5 h-5 text-[#00D4C2]" />
                  </div>
                  <span className="absolute -left-[68px] -top-1 w-5 h-5 rounded-full bg-[#00D4C2] text-white text-[10px] font-bold flex items-center justify-center shadow-sm z-20">
                    {idx + 1}
                  </span>

                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-[#0F1E3D] mb-1">
                      {t(`steps.${step.key}`)}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {t(`descriptions.${step.key}`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-14 lg:mt-20"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3 rounded-full bg-[#00D4C2] text-[#0A1128] font-semibold text-sm hover:bg-[#00E0FF] transition-colors duration-200 shadow-sm shadow-[#00D4C2]/20"
          >
            {t("cta1")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Step Node ────────────────────────────────────────── */

function StepNode({
  step,
  index,
  t,
  delay,
}: {
  step: (typeof steps)[number];
  index: number;
  t: ReturnType<typeof useTranslations>;
  delay: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="w-[160px] shrink-0 text-center group"
    >
      {/* Circle */}
      <div className="relative inline-flex mb-3">
        <div className="w-[56px] h-[56px] rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm group-hover:border-[#00D4C2]/40 group-hover:shadow-md transition-all duration-300">
          <Icon className="w-6 h-6 text-[#94A3B8] group-hover:text-[#00D4C2] transition-colors duration-300" />
        </div>
        {/* Number badge */}
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00D4C2] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
          {index + 1}
        </span>
      </div>

      {/* Title & description */}
      <h3 className="text-sm font-semibold text-[#0F1E3D] mb-1 leading-snug">
        {t(`steps.${step.key}`)}
      </h3>
      <p className="text-[11px] text-[#94A3B8] leading-relaxed px-1">
        {t(`descriptions.${step.key}`)}
      </p>
    </motion.div>
  );
}

/* ── Curvy horizontal connector ──────────────────────── */

function CurvyConnector({ direction }: { direction: "left" | "right" }) {
  // The connector sits between two nodes.
  // mt-[26px] aligns it with the center of the 56px circles (28px center - 2px for border)
  // mt-[26px] aligns it with the center of the 56px circles
  // SVG markers auto-rotate to follow the curve tangent at the endpoint
  return (
    <div className="flex-1 mt-[26px] px-0">
      <svg
        viewBox="0 0 200 40"
        className="w-full h-[40px]"
        preserveAspectRatio="none"
        fill="none"
      >
        {direction === "right" ? (
          <path
            d="M 0 20 C 50 4, 150 36, 196 20"
            stroke="#00D4C2"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        ) : (
          <path
            d="M 200 20 C 150 4, 50 36, 4 20"
            stroke="#00D4C2"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        )}
      </svg>
    </div>
  );
}

/* ── Turn connector (vertical curve between rows) ───── */

function TurnConnector({ side }: { side: "left" | "right" }) {
  return (
    <div className="py-1">
      <svg
        width="60"
        height="72"
        viewBox="0 0 60 72"
        fill="none"
        className="overflow-visible"
      >
        {side === "right" ? (
          <path
            d="M 10 0 C 10 20, 50 20, 50 36 C 50 52, 10 52, 10 68"
            stroke="#00D4C2"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        ) : (
          <path
            d="M 50 0 C 50 20, 10 20, 10 36 C 10 52, 50 52, 50 68"
            stroke="#00D4C2"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        )}
      </svg>
    </div>
  );
}

