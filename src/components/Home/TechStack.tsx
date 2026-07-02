'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

const DEVICON =
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

// Colored brand logos (Devicon "-original" variants).
const logos: { name: string; path: string }[] = [
  { name: 'React', path: 'react/react-original.svg' },
  { name: 'Node.js', path: 'nodejs/nodejs-original.svg' },
  { name: 'TypeScript', path: 'typescript/typescript-original.svg' },
  { name: 'JavaScript', path: 'javascript/javascript-original.svg' },
  { name: 'Python', path: 'python/python-original.svg' },
  { name: 'Java', path: 'java/java-original.svg' },
  { name: 'Next.js', path: 'nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', path: 'tailwindcss/tailwindcss-original.svg' },
  { name: 'Docker', path: 'docker/docker-original.svg' },
  { name: 'AWS', path: 'amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'PostgreSQL', path: 'postgresql/postgresql-original.svg' },
  { name: 'MongoDB', path: 'mongodb/mongodb-original.svg' },
  { name: 'Redis', path: 'redis/redis-original.svg' },
  { name: 'GraphQL', path: 'graphql/graphql-plain.svg' },
  { name: 'Angular', path: 'angularjs/angularjs-original.svg' },
  { name: 'Vue.js', path: 'vuejs/vuejs-original.svg' },
  { name: 'Git', path: 'git/git-original.svg' },
  { name: 'Figma', path: 'figma/figma-original.svg' },
  { name: 'HTML5', path: 'html5/html5-original.svg' },
  { name: 'CSS3', path: 'css3/css3-original.svg' },
];

// Distribute logos across 4 columns.
const COLS = 4;
const columns = Array.from({ length: COLS }, (_, c) =>
  logos.filter((_, i) => i % COLS === c)
);

// Vary speed a little per column so it feels organic.
const durations = [22, 28, 24, 30];

export default function TechStackSection() {
  const t = useTranslations('TechStack');

  return (
    <section id="techstack" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >

            <h2 className="text-2xl lg:text-5xl text-[#0F1E3D] mb-5 tracking-tight font-poppins leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed font-inter mb-8 max-w-md">
              {t('description')}
            </p>
          </motion.div>

          {/* Right — vertical marquee */}
          <div
            className="tech-marquee relative h-[420px] lg:h-[480px] overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
              maskImage:
                'linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
            }}
          >
            <div className="grid grid-cols-4 gap-4 h-full">
              {columns.map((col, i) => (
                <div
                  key={i}
                  className="tech-col flex flex-col will-change-transform"
                  style={{
                    animation: `${i % 2 === 0 ? 'techUp' : 'techDown'} ${durations[i]}s linear infinite`,
                  }}
                >
                  {[...col, ...col].map((logo, j) => (
                    <div
                      key={`${logo.name}-${j}`}
                      className="shrink-0 aspect-square mb-4 rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm flex items-center justify-center"
                    >
                      <img
                        src={`${DEVICON}/${logo.path}`}
                        alt={logo.name}
                        loading="lazy"
                        className="w-1/2 h-1/2 object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes techUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes techDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .tech-marquee:hover .tech-col {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
