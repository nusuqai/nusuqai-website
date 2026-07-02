'use client';
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Headphones, Layers, Workflow } from "lucide-react";

import SupportVisual from "./CustomerSupport";
import KnowledgeVisual from "./KnowledgeGraph";
import ActionsVisual from "./DatabaseAction";

export default function UseCasesShowcase() {
  const t = useTranslations("UseCases");

  const useCases = [
    {
      id: "knowledge",
      Icon: Layers,
      title: t("cases.knowledge.title"),
      description: t("cases.knowledge.description"),
      Visual: KnowledgeVisual,
    },
    {
      id: "support",
      Icon: Headphones,
      title: t("cases.support.title"),
      description: t("cases.support.description"),
      Visual: SupportVisual,
    },
    {
      id: "actions",
      Icon: Workflow,
      title: t("cases.actions.title"),
      description: t("cases.actions.description"),
      Visual: ActionsVisual,
    },
  ];

  // Middle card is the default hero.
  const [active, setActive] = useState(1);

  return (
    <section id="usecases" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4 tracking-tight font-poppins">
            {t("title")}
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed font-inter">
            {t("description")}
          </p>
        </div>

        {/* ── Desktop: horizontal expandable cards ── */}
        <div className="hidden lg:flex gap-4 h-[500px]">
          {useCases.map((useCase, index) => {
            const isActive = active === index;
            const Icon = useCase.Icon;
            const Visual = useCase.Visual;

            return (
              <div
                key={useCase.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                style={{
                  flexGrow: isActive ? 2.4 : 1,
                  flexBasis: 0,
                  transition:
                    "flex-grow 550ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms ease",
                }}
                className={`group relative flex flex-col overflow-hidden rounded-3xl cursor-pointer p-7 ${
                  isActive
                    ? "bg-[#F8FAFF] shadow-xl shadow-[#0F1E3D]/10"
                    : "bg-[#F1F5F9]"
                }`}
              >
                {/* Icon */}
                <Icon
                  strokeWidth={1.5}
                  className={`w-6 h-6 mb-4 shrink-0 transition-colors duration-300 ${
                    isActive ? "text-[#00D4C2]" : "text-slate-400"
                  }`}
                />

                {/* Title — always at the top, horizontal */}
                <h3
                  className={`font-semibold font-poppins leading-tight transition-colors duration-300 ${
                    isActive
                      ? "text-2xl xl:text-[28px] text-[#0F1E3D]"
                      : "text-lg text-[#0F1E3D]/70"
                  }`}
                >
                  {useCase.title}
                </h3>

                {/*
                  Fixed-width block so the text never reflows while the card
                  resizes — it just fades in/out and is clipped when collapsed.
                */}
                <div
                  className="w-[380px] transition-opacity duration-300"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <p className="mt-4 text-[#64748B] leading-relaxed font-inter text-[15px]">
                    {useCase.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex mt-5 px-5 py-2.5 rounded-full bg-[#00D4C2] text-white font-semibold text-sm hover:bg-[#00E0FF] transition-colors duration-200 shadow-sm shadow-[#00D4C2]/20"
                  >
                    {t("cta")}
                  </a>
                </div>

                {/* UI mockup — anchored to the side, bleeding off the edge, desaturated until active */}
                <div
                  className="pointer-events-none absolute -right-14 w-[460px] transition-all duration-500 ease-out"
                  style={{
                    top: isActive ? "296px" : "128px",
                    filter: isActive ? "none" : "grayscale(1)",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="lg:hidden flex flex-col gap-5">
          {useCases.map((useCase) => {
            const Icon = useCase.Icon;
            const Visual = useCase.Visual;
            return (
              <div
                key={useCase.id}
                className="rounded-3xl bg-[#F8FAFF] p-7 shadow-sm"
              >
                <Icon strokeWidth={1.5} className="w-6 h-6 mb-4 text-[#00D4C2]" />
                <h3 className="text-2xl font-semibold font-poppins text-[#0F1E3D] leading-tight">
                  {useCase.title}
                </h3>
                <p className="mt-4 text-[#64748B] leading-relaxed font-inter text-[15px]">
                  {useCase.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex mt-5 px-5 py-2.5 rounded-full bg-[#00D4C2] text-white font-semibold text-sm hover:bg-[#00E0FF] transition-colors duration-200 shadow-sm shadow-[#00D4C2]/20"
                >
                  {t("cta")}
                </a>

                {/* UI mockup */}
                <div className="mt-6 overflow-hidden">
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
