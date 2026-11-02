import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function ShowitIdealClient() {
  return (
    <section id="cliente-ideal" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 border-b border-[#D2CDC4]">
      <div id="ideal-client" className="scroll-mt-16">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="text-center mb-12">
            <Reveal variant="up">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-tight">
                Cliente ideal
              </h2>
              <p className="mt-3 font-sans text-sm sm:text-base text-[#5A554D] font-normal max-w-lg mx-auto">
                Diseñado exclusivamente para líderes comprometidos con su proyección y reputación.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Esto es para ti si... */}
            <Reveal variant="left">
              <div className="bg-[#E6E3DB] border border-[#D2CDC4] p-8 sm:p-10 h-full transition-colors hover:bg-[#DDD9D0]">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal block mb-5 border-b border-[#D2CDC4] pb-3">
                  Esto es para ti si...
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "Eres directivo, CEO, socio o vocero con responsabilidades de alta visibilidad.",
                    "Buscas que tu presencia física comunique la misma autoridad y calibre que tu trayectoria.",
                    "Valoras el minimalismo sobrio, la técnica morfológica y la elegancia sin modas pasajeras.",
                    "Deseas un guardarropa estratégico que elimine la fatiga de decisión diaria.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="size-4 text-[#1A1A1A] shrink-0 mt-0.5 stroke-[1.75]" />
                      <span className="font-sans text-sm text-[#3A352D] font-normal leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Card 2: Esto no es para ti si... */}
            <Reveal variant="right" delay={80}>
              <div className="bg-[#E6E3DB] border border-[#D2CDC4] p-8 sm:p-10 h-full transition-colors hover:bg-[#DDD9D0]">
                <h3 className="font-serif text-xl sm:text-2xl text-[#7A756D] font-normal block mb-5 border-b border-[#D2CDC4] pb-3">
                  Esto no es para ti si...
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "Buscas tendencias efímeras de moda rápida o atuendos llamativos sin criterio directivo.",
                    "No estás dispuesto a evaluar con apertura tu presencia y código de vestimenta actual.",
                    "Prefieres fórmulas genéricas masivas en vez de una asesoría técnica 1 a 1.",
                    "No consideras tu reputación visual como un activo estratégico en los negocios.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Minus className="size-4 text-[#7A756D] shrink-0 mt-0.5 stroke-[1.5]" />
                      <span className="font-sans text-sm text-[#6B655D] font-normal leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
