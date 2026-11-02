import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/store/ui-store";

const CARDS = [
  {
    pointLabel: "Punto uno",
    serviceName: "Imagen Ejecutiva",
    desc: "Para directores, CEOs y líderes corporativos. Código visual de autoridad, elegancia sobria y congruencia que refuerza tu capacidad de liderazgo en juntas de consejo y negociaciones clave.",
    num: "1.",
    id: "imagen-ejecutiva",
  },
  {
    pointLabel: "Punto dos",
    serviceName: "Imagen Personal",
    desc: "Análisis integral de morfología, estudio de colorimetría y reestructuración inteligente de guardarropa personal. Descubre tu estilo auténtico y optimiza tus combinaciones con criterio y sofisticación.",
    num: "2.",
    id: "imagen-personal",
  },
  {
    pointLabel: "Punto tres",
    serviceName: "Imagen Pública",
    desc: "Estrategia reputacional y entrenamiento en comunicación no verbal para voceros, conferencistas y figuras públicas. Dominio de entrevistas, presencia escénica y proyección de máxima seguridad.",
    num: "3.",
    id: "imagen-publica",
  },
  {
    pointLabel: "Punto cuatro",
    serviceName: "Imagen para Empresas",
    desc: "Transformación de la proyección de equipos directivos y fuerza de negocios. Elaboración de manuales de código de vestimenta corporativo, protocolo empresarial y talleres institucionales.",
    num: "4.",
    id: "imagen-empresas",
  },
];

export function ShowitInsidePackage() {
  const { openBookingModal } = useUI();

  return (
    <section id="que-incluye" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 lg:py-32 border-b border-[#DDD8CF]">
      <div id="servicios" className="scroll-mt-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
          <div className="border border-[#D2CDC4] bg-[#F5F2EB] grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column */}
            <div className="md:col-span-4 p-8 sm:p-12 lg:p-14 md:border-r border-b md:border-b-0 border-[#D2CDC4] flex flex-col justify-start md:sticky md:top-28 self-start">
              <Reveal variant="up">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal leading-tight">
                  Lo que incluye <br />
                  el programa
                </h2>
                <p className="mt-4 font-sans text-sm text-[#5A554D] leading-relaxed font-normal max-w-xs">
                  Cuatro programas estructurados con rigor técnico y visión editorial para cada etapa de tu proyección.
                </p>
                <div className="mt-8 pt-6 border-t border-[#D2CDC4]/70">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#6A655D] hover:border-[#6A655D] transition-colors"
                  >
                    Agendar Diagnóstico
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column */}
            <div className="md:col-span-8 divide-y divide-[#D2CDC4]">
              {CARDS.map((card, i) => (
                <div key={card.num} className="p-3 sm:p-5 lg:p-6 bg-[#F5F2EB]">
                  <Reveal delay={i * 70} variant="up">
                    <div
                      onClick={() => openBookingModal(card.id)}
                      className="bg-[#E6E3DB] p-7 sm:p-9 lg:p-11 flex items-center justify-between gap-6 transition-colors hover:bg-[#DDD9D0] cursor-pointer group select-none"
                    >
                      <div className="max-w-xl pr-2">
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal tracking-tight mb-2">
                          {card.pointLabel} — {card.serviceName}
                        </h3>
                        <p className="font-sans text-sm text-[#4A453D] leading-relaxed font-normal">
                          {card.desc}
                        </p>
                      </div>

                      <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#1A1A1A] shrink-0 pl-4 self-center">
                        {card.num}
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
