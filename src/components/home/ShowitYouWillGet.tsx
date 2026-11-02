import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const DELIVERABLES = [
  "Diagnóstico morfológico y estudio de colorimetría de precisión para determinar tu paleta cromática exacta de autoridad y estatus.",
  "Lookbook digital interactivo con más de 30 combinaciones ejecutivas catalogadas para juntas directivas, foros públicos y viajes de negocios.",
  "Auditoría técnica de guardarropa y manual de estilo ejecutivo con protocolo de vestimenta y firmas recomendadas.",
];

export function ShowitYouWillGet() {
  return (
    <section id="que-obtendras" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1260px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 lg:gap-20 items-start">
          {/* Left Column: Title only */}
          <div className="md:col-span-4 lg:col-span-5">
            <Reveal variant="up">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal leading-tight">
                Lo que obtendrás
              </h2>
            </Reveal>
          </div>

          {/* Right Column: Normal text bullets */}
          <div className="md:col-span-8 lg:col-span-7 space-y-4 sm:space-y-6">
            {DELIVERABLES.map((item, i) => (
              <Reveal key={i} delay={i * 80} variant="up">
                <div className="flex items-start gap-4">
                  <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[1.75]" />
                  <p className="font-sans text-sm sm:text-base text-[#3A352D] font-normal leading-relaxed">
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
