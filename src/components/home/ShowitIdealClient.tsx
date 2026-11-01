import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function ShowitIdealClient() {
  return (
    <section id="cliente-ideal" className="scroll-mt-20 bg-[#F4F1EA] text-[#1A1A1A] py-20 lg:py-28 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="text-center mb-16">
          <Reveal variant="up">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-3 block">
              CLARIDAD & ENFOQUE
            </span>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-[1] text-[#1A1A1A] uppercase">
              ¿Este servicio es para ti?
            </h2>
            <p className="mt-3 text-sm text-[#5A554D] font-light max-w-md mx-auto">
              Trabajamos con líderes comprometidos con proyectar la versión más sobria y contundente de su marca personal.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Esto es para ti */}
          <Reveal variant="left">
            <div className="bg-[#EFECE6] border border-[#DDD8CF] p-8 sm:p-10 h-full">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A1A] block mb-6 border-b border-[#DDD8CF] pb-4">
                Esto es para ti si...
              </span>
              <ul className="space-y-4">
                {[
                  "Eres directivo, fundador, vocero o profesional con responsabilidades de alto nivel.",
                  "Buscas que tu imagen hable con la misma autoridad que tu trayectoria y conocimiento.",
                  "Valoras la sobriedad, la técnica precisa y la discreción sin modas pasajeras ni exageraciones.",
                  "Deseas un guardarropa funcional y un manual visual que te ahorre tiempo todos los días.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[2]" />
                    <span className="text-sm text-[#4A453D] font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Card 2: Esto no es para ti */}
          <Reveal variant="right" delay={100}>
            <div className="bg-[#EFECE6] border border-[#DDD8CF] p-8 sm:p-10 h-full">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7A756D] block mb-6 border-b border-[#DDD8CF] pb-4">
                Esto no es para ti si...
              </span>
              <ul className="space-y-4">
                {[
                  "Buscas consejos superficiales o tendencias de moda rápida sin sustento estratégico.",
                  "No estás dispuesto a evaluar con objetividad tu guardarropa y presencia actual.",
                  "Prefieres fórmulas genéricas en lugar de un diagnóstico individual riguroso.",
                  "No consideras tu imagen personal y reputación como un activo de negociación profesional.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <Minus className="size-4 text-[#7A756D] shrink-0 mt-1 stroke-[1.5]" />
                    <span className="text-sm text-[#6B655D] font-light leading-relaxed">{item}</span>
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
