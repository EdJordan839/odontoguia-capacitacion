import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const DELIVERABLES = [
  {
    title: "Diagnóstico Morfológico & Colorimetría de Precisión",
    desc: "Identificación de paleta cromática de autoridad y tipología corporal para prendas a la medida.",
  },
  {
    title: "Lookbook Digital Interactivo (30+ Combinaciones)",
    desc: "Guía visual con atuendos clasificados para reuniones directivas, eventos formales, viajes y casual de negocios.",
  },
  {
    title: "Auditoría Técnica & Reestructuración de Armario",
    desc: "Depuración estratégica para quedarte únicamente con piezas que potencien tu estatus y presencia.",
  },
  {
    title: "Manual de Estilo Ejecutivo & Guía de Inversión",
    desc: "Recomendación de firmas de sastrería, calzado, accesorios y protocolo de etiqueta corporativa.",
  },
  {
    title: "Acompañamiento VIP Directo",
    desc: "Asistencia directa con la consultora previa a juntas de consejo, presentaciones clave o apariciones en medios.",
  },
];

export function ShowitYouWillGet() {
  return (
    <section className="bg-[#F4F1EA] text-[#1A1A1A] py-20 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal variant="up">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-4 block">
                ENTREGABLES TÉCNICOS
              </span>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1] text-[#1A1A1A] uppercase">
                Qué Obtendrás:
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5A554D] font-light max-w-sm">
                Un sistema completo y documentado para que proyectar autoridad sea un proceso diario sin esfuerzo.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Clean Checklist */}
          <div className="lg:col-span-8 space-y-8">
            {DELIVERABLES.map((item, i) => (
              <Reveal key={i} delay={i * 70} variant="up">
                <div className="flex items-start gap-5 pb-8 border-b border-[#DDD8CF] last:border-b-0">
                  <span className="size-6 rounded-full border border-[#1A1A1A] flex items-center justify-center shrink-0 mt-1">
                    <Check className="size-3.5 text-[#1A1A1A] stroke-[2]" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1A1A1A]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5A554D] font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
