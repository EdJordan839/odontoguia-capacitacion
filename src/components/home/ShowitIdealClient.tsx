import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function ShowitIdealClient() {
  return (
    <section id="ideal-client" className="scroll-mt-14 bg-[#F5F2EB] text-[#1A1A1A] py-20 lg:py-28 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="text-center mb-14">
          <Reveal variant="up">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-3 block">
              CLARITY & ALIGNMENT
            </span>
            <h2 className="font-display text-2xl sm:text-3xl tracking-[0.12em] text-[#1A1A1A] uppercase">
              IDEAL CLIENT
            </h2>
            <p className="mt-2 font-serif italic text-base text-[#5A554D]">
              Diseñado exclusivamente para líderes comprometidos con su proyección.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: This is for you if: */}
          <Reveal variant="left">
            <div className="bg-[#EAE5DE] border border-[#DDD8CF] p-8 sm:p-10 h-full">
              <span className="font-serif italic text-base text-[#1A1A1A] block mb-5 border-b border-[#D5D0C5] pb-3">
                This is for you if...
              </span>
              <ul className="space-y-3.5">
                {[
                  "Eres directivo, CEO, socio o vocero con responsabilidades de alta visibilidad.",
                  "Buscas que tu presencia física comunique la misma autoridad y calibre que tu trayectoria.",
                  "Valoras el minimalismo sobrio, la técnica morfológica y la elegancia sin modas pasajeras.",
                  "Deseas un guardarropa estratégico que elimine la fatiga de decisión diaria.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[1.75]" />
                    <span className="font-serif text-xs sm:text-sm text-[#3A352D] font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Card 2: This is not for you if: */}
          <Reveal variant="right" delay={80}>
            <div className="bg-[#EAE5DE] border border-[#DDD8CF] p-8 sm:p-10 h-full">
              <span className="font-serif italic text-base text-[#7A756D] block mb-5 border-b border-[#D5D0C5] pb-3">
                This is not for you if...
              </span>
              <ul className="space-y-3.5">
                {[
                  "Buscas tendencias efímeras de moda rápida o atuendos llamativos sin criterio directivo.",
                  "No estás dispuesto a evaluar con apertura tu presencia y código de vestimenta actual.",
                  "Prefieres fórmulas genéricas masivas en vez de una asesoría técnica 1 a 1.",
                  "No consideras tu reputación visual como un activo estratégico en los negocios.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Minus className="size-4 text-[#7A756D] shrink-0 mt-1 stroke-[1.5]" />
                    <span className="font-serif text-xs sm:text-sm text-[#6B655D] font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
