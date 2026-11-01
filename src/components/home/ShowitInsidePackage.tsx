import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/store/ui-store";

const CARDS = [
  {
    point: "Point one",
    title: "Imagen Ejecutiva",
    desc: "Para directores, CEOs y líderes corporativos. Código visual de autoridad, elegancia sobria y congruencia que refuerza tu capacidad de liderazgo en juntas de consejo y negociaciones clave.",
    num: "1.",
    id: "imagen-ejecutiva",
  },
  {
    point: "Point two",
    title: "Imagen Personal",
    desc: "Análisis integral de morfología, estudio de colorimetría y reestructuración inteligente de guardarropa personal. Descubre tu estilo auténtico y optimiza tus combinaciones con criterio y sofisticación.",
    num: "2.",
    id: "imagen-personal",
  },
  {
    point: "Point three",
    title: "Imagen Pública",
    desc: "Estrategia reputacional y entrenamiento en comunicación no verbal para voceros, conferencistas y figuras públicas. Dominio de entrevistas, presencia escénica y proyección de máxima seguridad.",
    num: "3.",
    id: "imagen-publica",
  },
  {
    point: "Point four",
    title: "Imagen para Empresas",
    desc: "Transformación de la proyección de equipos directivos y fuerza de negocios. Elaboración de manuales de código de vestimenta corporativo, protocolo empresarial y talleres institucionales.",
    num: "4.",
    id: "imagen-empresas",
  },
];

export function ShowitInsidePackage() {
  const { openBookingModal } = useUI();

  return (
    <section id="whats-inside" className="scroll-mt-14 bg-[#F5F2EB] text-[#1A1A1A] py-20 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="md:col-span-4 md:sticky md:top-24">
            <Reveal variant="up">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-tight">
                What Is Inside <br />
                The Package
              </h2>
              <p className="mt-4 font-serif text-xs text-[#5A554D] leading-relaxed max-w-xs">
                Cuatro soluciones sobrias y estructuradas con rigor técnico para cada objetivo de proyección ejecutiva y personal.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Stacked Point Cards matching Showit template */}
          <div className="md:col-span-8 space-y-4">
            {CARDS.map((card, i) => (
              <Reveal key={card.num} delay={i * 70} variant="up">
                <div
                  onClick={() => openBookingModal(card.id)}
                  className="bg-[#E7E2D9] border border-[#D8D2C7] p-7 sm:p-9 cursor-pointer transition-colors hover:border-[#1A1A1A] group"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 pr-4">
                      <span className="font-serif italic text-sm text-[#1A1A1A] block mb-1">
                        {card.point} — {card.title}
                      </span>
                      <p className="font-serif text-xs sm:text-sm text-[#4A453D] leading-relaxed font-light">
                        {card.desc}
                      </p>
                    </div>

                    <div className="font-display text-4xl sm:text-5xl font-light text-[#2A251D] group-hover:text-black transition-colors shrink-0">
                      {card.num}
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
