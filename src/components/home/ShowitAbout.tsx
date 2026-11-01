import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitAbout() {
  const { openBookingModal } = useUI();

  return (
    <section id="sobre-mi" className="scroll-mt-16 bg-[#EAE5DE] text-[#1A1A1A] py-20 lg:py-32 border-b border-[#DDD8CF]">
      <div id="about" className="scroll-mt-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal variant="clip" className="w-full max-w-sm aspect-[3/4] bg-[#DDD8CF] border border-[#DDD8CF] overflow-hidden shadow-xs">
                <img
                  src={consultantPortrait}
                  alt="Consultora de Imagen y Marca Personal — YES I'AM"
                  className="size-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
              </Reveal>
            </div>

            {/* Right Column: About details */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <Reveal variant="up">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-3 block">
                  SOBRE LA CONSULTORA
                </span>

                <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-[1] text-[#1A1A1A] uppercase tracking-[0.06em]">
                  Técnica, Sobriedad y Sofisticación Sin Excesos
                </h2>

                <p className="mt-6 font-serif text-sm sm:text-base leading-relaxed text-[#3A352D] font-light">
                  Consultora especializada en arquitectura de imagen pública, estilismo ejecutivo y comunicación estratégica de marca personal. Con más de una década de experiencia asesorando a líderes directivos, socios corporativos, voceros y empresarios en Chihuahua y a nivel internacional.
                </p>

                <p className="mt-4 font-serif text-sm leading-relaxed text-[#4A453D] font-light">
                  Su metodología prioriza el rigor técnico por encima de modas efímeras: colorimetría científica, proporción morfológica y curaduría de guardarropas inteligentes donde cada detalle comunica autoridad, estatus y serenidad.
                </p>

                <div className="mt-8 py-5 border-t border-b border-[#DDD8CF] w-full">
                  <blockquote className="font-serif italic text-base sm:text-lg text-[#2A251D] leading-snug">
                    “La verdadera elegancia no busca llamar la atención a gritos, sino ser recordada con respeto y autoridad indiscutible.”
                  </blockquote>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="bg-[#1A1A1A] text-[#F5F2EB] px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] hover:bg-[#333333] transition-colors"
                  >
                    AGENDAR CONSULTA
                  </button>
                  <a
                    href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n"
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif italic text-xs text-[#5A554D] hover:text-[#1A1A1A] transition-colors"
                  >
                    WhatsApp Directo: +52 614 187 9067
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
