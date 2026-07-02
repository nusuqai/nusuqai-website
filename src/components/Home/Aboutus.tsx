'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

// Meaningful photos + our own brand logo.
const IMG_TEAM =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=900&fit=crop';
const IMG_COLLAB =
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=900&fit=crop';
const LOGO = '/aboutus/nusuq.png';

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4 tracking-tight font-poppins">
            {t('title')}
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed font-inter">
            {t('description')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-5 md:h-[640px]"
        >
          {/* A — large team image (col 1, rows 1-2) */}
          <ImageCard
            src={IMG_TEAM}
            className="md:col-start-1 md:row-start-1 md:row-span-2"
          />

          {/* C — value card, light (col 2, row 1) */}
          <div className="md:col-start-2 md:row-start-1 rounded-3xl bg-[#F8FAFF] p-7 flex flex-col justify-center">
            <span className="inline-block w-10 h-1 rounded-full bg-[#00D4C2] mb-4" />
            <h3 className="text-xl lg:text-2xl font-semibold font-poppins text-[#0F1E3D] mb-2.5 leading-snug">
              {t('bento.card1.title')}
            </h3>
            <p className="text-[#64748B] leading-relaxed font-inter text-[14px]">
              {t('bento.card1.content')}
            </p>
          </div>

          {/* B — capabilities card, navy (col 1, row 3) */}
          <div className="md:col-start-1 md:row-start-3 rounded-3xl bg-[#0F1E3D] p-7 flex flex-col justify-center">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#00D4C2] font-inter mb-4">
              {t('bento.highlights.title')}
            </h4>
            <ul className="space-y-2.5">
              {(['a', 'b', 'c'] as const).map((k) => (
                <li key={k} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#00D4C2]/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#00D4C2]" strokeWidth={3} />
                  </span>
                  <span className="text-white font-inter text-sm font-medium">
                    {t(`bento.highlights.${k}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* E — brand logo card (col 3, row 1) */}
          <ImageCard
            src={LOGO}
            className="md:col-start-3 md:row-start-1 md:mb-6"
          />

          {/* F — value card, navy (col 3, rows 2-3) */}
          <div className="md:col-start-3 md:row-start-2 md:row-span-2 rounded-3xl bg-[#0F1E3D] p-7 flex flex-col justify-center">
            <span className="inline-block w-10 h-1 rounded-full bg-[#00D4C2] mb-5" />
            <h3 className="text-xl lg:text-2xl font-semibold font-poppins text-white mb-2.5 leading-snug">
              {t('bento.card2.title')}
            </h3>
            <p className="text-slate-300 leading-relaxed font-inter text-[14px]">
              {t('bento.card2.content')}
            </p>
          </div>

          {/* D — image (col 2, rows 2-3) */}
          <ImageCard
            src={IMG_COLLAB}
            className="md:col-start-2 md:row-start-2 md:row-span-2"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Image card ─────────────────────────────────────── */
function ImageCard({ src, className = '' }: { src: string; className?: string }) {
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden min-h-[220px] ${className}`}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
