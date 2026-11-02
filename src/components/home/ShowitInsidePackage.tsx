import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/store/ui-store";

const CARDS = [
  {
    pointLabel: "Point one",
    serviceName: "Imagen Ejecutiva",
    desc: "Para directores, CEOs y líderes corporativos. Código visual de autoridad, elegancia sobria y congruencia que refuerza tu capacidad de liderazgo en juntas de consejo y negociaciones clave.",
    num: "1.",
    id: "imagen-ejecutiva",
  },
  {
    pointLabel: "Point two",
    serviceName: "Imagen Personal",
    desc: "Análisis integral de morfología, estudio de colorimetría y reestructuración inteligente de guardarropa personal. Descubre tu estilo auténtico y optimiza tus combinaciones con criterio y sofisticación.",
    num: "2.",
    id: "imagen-personal",
  },
  {
    pointLabel: "Point three",
    serviceName: "Imagen Pública",
    desc: "Estrategia reputacional y entrenamiento en comunicación no verbal para voceros, conferencistas y figuras públicas. Dominio de entrevistas, presencia escénica y proyección de máxima seguridad.",
    num: "3.",
    id: "imagen-publica",
  },
  {
    pointLabel: "Point four",
    serviceName: "Imagen para Empresas",
    desc: "Transformación de la proyección de equipos directivos y fuerza de negocios. Elaboración de manuales de código de vestimenta corporativo, protocolo empresarial y talleres institucionales.",
    num: "4.",
    id: "imagen-empresas",
  },
];

export function ShowitInsidePackage() {
  const { openBookingModal } = useUI();

  return (
    <section id="que-incluye" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 border-b border-[#DDD8CF]">
      <div id="servicios" className="scroll-mt-16">
        <div className="mx-auto max-w-[1260px] px-4 sm:px-8 lg:px-12">
          {/* Exact Showit Layout Grid: Left Header Column & Right Card Cells with inner shaded panels */}
          <div className="border border-[#D2CDC4] bg-[#F5F2EB] grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column: What Is Inside The Package */}
            <div className="md:col-span-4 p-8 sm:p-12 md:border-r border-b md:border-b-0 border-[#D2CDC4] flex flex-col justify-start md:sticky md:top-24 self-start">
              <Reveal variant="up">
                <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-3">
                  LO QUE INCLUYE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-snug">
                  What Is Inside <br />
                  The Package
                </h2>
                <p className="mt-4 font-sans text-xs text-[#5A554D] leading-relaxed max-w-xs font-normal">
                  Cuatro programas estructurados con rigor técnico y visión editorial para cada etapa de tu proyección.
                </p>
                <div className="mt-8 pt-6 border-t border-[#D2CDC4]/70">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#6A655D] hover:border-[#6A655D] transition-colors"
                  >
                    AGENDAR DIAGNÓSTICO
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Stacked Grid Cells with Inner Shaded Panels (Exact match to IMG_2704_47ec1cea.jpeg) */}
            <div className="md:col-span-8 divide-y divide-[#D2CDC4]">
              {CARDS.map((card, i) => (
                <div key={card.num} className="p-3 sm:p-5 lg:p-6 bg-[#F5F2EB]">
                  <Reveal delay={i * 70} variant="up">
                    <div
                      onClick={() => openBookingModal(card.id)}
                      className="bg-[#E6E3DB] p-7 sm:p-9 lg:p-11 flex items-center justify-between gap-6 transition-colors hover:bg-[#DDD9D0] cursor-pointer group select-none"
                    >
                      {/* Left: Point label, service name and description */}
                      <div className="max-w-xl pr-2">
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light tracking-tight mb-2.5">
                          {card.pointLabel}{" "}
                          <span className="font-normal text-xl sm:text-2xl text-[#2A251D]">
                            — {card.serviceName}
                          </span>
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#4A453D] leading-relaxed font-normal">
                          {card.desc}
                        </p>
                      </div>

                      {/* Right: Slender Didone Large Numeral */}
                      <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#1A1A1A] shrink-0 pl-4 self-center tracking-tight">
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
