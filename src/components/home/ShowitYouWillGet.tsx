import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const DELIVERABLES = [
  "Diagnóstico morfológico y estudio de colorimetría presencial o digital para calibrar tu paleta cromática exacta de autoridad y elegancia.",
  "Lookbook digital interactivo con más de 30 combinaciones ejecutivas catalogadas para juntas directivas, foros públicos y viajes de negocios.",
  "Auditoría técnica de guardarropa y manual de estilo institucional con protocolo de vestimenta y firmas recomendadas.",
];

export function ShowitYouWillGet() {
  return (
    <section id="you-will-get" className="scroll-mt-14 bg-[#F5F2EB] text-[#1A1A1A] py-20 lg:py-28 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="md:col-span-4">
            <Reveal variant="up">
              <h2 className="font-display text-2xl sm:text-3xl tracking-[0.14em] text-[#1A1A1A] uppercase">
                YOU WILL GET:
              </h2>
            </Reveal>
          </div>

          {/* Right Column: 3 Clean Checkmark Bullets */}
          <div className="md:col-span-8 space-y-6">
            {DELIVERABLES.map((item, i) => (
              <Reveal key={i} delay={i * 80} variant="up">
                <div className="flex items-start gap-4">
                  <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[1.75]" />
                  <p className="font-serif text-sm sm:text-base text-[#3A352D] font-light leading-relaxed">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
