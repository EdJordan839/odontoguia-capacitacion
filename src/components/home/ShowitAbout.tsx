import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitAbout() {
  const { openBookingModal } = useUI();

  return (
    <section id="sobre-mi" className="scroll-mt-16 bg-[#EAE5DE] text-[#1A1A1A] py-16 sm:py-24 border-b border-[#DDD8CF]">
      <div id="about" className="scroll-mt-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
                <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] mb-3 block">
                  SOBRE LA CONSULTORA
                </span>

                <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] text-[#1A1A1A] uppercase tracking-[0.04em]">
                  Técnica, Sobriedad y Sofisticación Sin Excesos
                </h2>

                <p className="mt-5 font-sans text-xs sm:text-sm leading-relaxed text-[#3A352D] font-normal">
                  Consultora especializada en arquitectura de imagen pública, estilismo ejecutivo y comunicación estratégica de marca personal. Con más de una década de experiencia asesorando a líderes directivos, socios corporativos, voceros y empresarios en Chihuahua y a nivel internacional.
                </p>

                <p className="mt-3.5 font-sans text-xs sm:text-sm leading-relaxed text-[#4A453D] font-normal">
                  Su metodología prioriza el rigor técnico por encima de modas efímeras: colorimetría científica, proporción morfológica y curaduría de guardarropas inteligentes donde cada detalle comunica autoridad, estatus y serenidad.
                </p>

                <div className="mt-6 py-4 border-t border-b border-[#DDD8CF] w-full">
                  <blockquote className="font-serif italic text-base sm:text-lg text-[#2A251D] leading-snug">
                    “La verdadera elegancia no busca llamar la atención a gritos, sino ser recordada con respeto y autoridad indiscutible.”
                  </blockquote>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans bg-[#1A1A1A] text-[#F5F2EB] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors"
                  >
                    AGENDAR CONSULTA
                  </button>
                  <a
                    href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n"
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-xs font-medium text-[#5A554D] hover:text-[#1A1A1A] transition-colors"
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
