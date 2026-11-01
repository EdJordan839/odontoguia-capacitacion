import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/store/ui-store";

const SERVICES = [
  {
    num: "1.",
    tag: "POINT ONE · DIRECTIVOS & C-LEVEL",
    title: "Imagen Ejecutiva",
    desc: "Diseñada para directores, CEOs y líderes corporativos. Desarrollamos un código visual de autoridad, elegancia sobria y congruencia que refuerza tu capacidad de liderazgo en juntas de consejo y negociaciones clave.",
    price: "$14,500 MXN",
    id: "imagen-ejecutiva",
  },
  {
    num: "2.",
    tag: "POINT TWO · ASESORÍA INDIVIDUAL",
    title: "Imagen Personal",
    desc: "Análisis integral de morfología, estudio de colorimetría y reestructuración inteligente de guardarropa personal. Descubre tu estilo auténtico y optimiza tus combinaciones diarias con criterio y sofisticación.",
    price: "$8,900 MXN",
    id: "imagen-personal",
  },
  {
    num: "3.",
    tag: "POINT THREE · MEDIOS & ORATORIA",
    title: "Imagen Pública",
    desc: "Estrategia reputacional y entrenamiento en comunicación no verbal para voceros, conferencistas y figuras públicas. Dominio de entrevistas, presencia escénica y proyección de máxima seguridad.",
    price: "$16,800 MXN",
    id: "imagen-publica",
  },
  {
    num: "4.",
    tag: "POINT FOUR · INSTITUCIONAL",
    title: "Imagen para Empresas",
    desc: "Transformación de la proyección de equipos directivos y fuerza de negocios. Elaboración de manuales de código de vestimenta corporativo, protocolo empresarial y talleres institucionales.",
    price: "$24,000 MXN",
    id: "imagen-empresas",
  },
];

export function ShowitInsidePackage() {
  const { openBookingModal } = useUI();

  return (
    <section id="servicios" className="scroll-mt-20 bg-[#EFECE6] text-[#1A1A1A] py-20 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal variant="up">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-4 block">
                CATÁLOGO DE SOLUCIONES
              </span>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1] text-[#1A1A1A] uppercase">
                Estructura de Servicios
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5A554D] font-light max-w-sm">
                Cuatro soluciones sobrias, estructuradas con rigor técnico y visión editorial para cada objetivo de proyección.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="bg-[#1A1A1A] text-[#F4F1EA] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-[#333333]"
                >
                  Agendar Diagnóstico
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Numbered Minimalist Cards (1., 2., 3., 4.) */}
          <div className="lg:col-span-8 space-y-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 80} variant="up">
                <div className="bg-[#E5E1D9] border border-[#D5D0C5] p-7 sm:p-9 transition-all hover:border-[#1A1A1A] group">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                    <div className="flex-1">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-2">
                        {s.tag}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-light text-[#1A1A1A] group-hover:text-black transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#5A554D] font-light max-w-lg">
                        {s.desc}
                      </p>
                      <div className="mt-6 flex items-center gap-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                          Inversión: {s.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => openBookingModal(s.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#7A756D] hover:border-[#7A756D] transition-colors"
                        >
                          Reservar
                          <ArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>

                    <div className="font-display text-5xl sm:text-6xl font-light text-[#A8A298] group-hover:text-[#1A1A1A] transition-colors self-end sm:self-start">
                      {s.num}
                    </div>
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
