import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const DELIVERABLES = [
  "Diagnóstico morfológico y estudio de colorimetría de precisión para determinar tu paleta cromática exacta de autoridad y estatus.",
  "Lookbook digital interactivo con más de 30 combinaciones ejecutivas catalogadas para juntas directivas, foros públicos y viajes de negocios.",
  "Auditoría técnica de guardarropa y manual de estilo ejecutivo con protocolo de vestimenta y firmas recomendadas.",
];

export function ShowitYouWillGet() {
  return (
    <section id="que-obtendras" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          {/* Left Column: Heading in Spanish */}
          <div className="md:col-span-4">
            <Reveal variant="up">
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-2">
                ENTREGABLES TÉCNICOS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.06em] text-[#1A1A1A] uppercase">
                LO QUE OBTENDRÁS:
              </h2>
            </Reveal>
          </div>

          {/* Right Column: 3 Clean Checkmark Bullets */}
          <div className="md:col-span-8 space-y-5">
            {DELIVERABLES.map((item, i) => (
              <Reveal key={i} delay={i * 80} variant="up">
                <div className="flex items-start gap-4">
                  <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[1.75]" />
                  <p className="font-sans text-xs sm:text-sm text-[#3A352D] font-normal leading-relaxed">
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
