import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitAbout() {
  const { openBookingModal } = useUI();

  return (
    <section id="sobre-mi" className="scroll-mt-16 bg-[#EAE5DE] text-[#1A1A1A] py-16 sm:py-24 lg:py-32 border-b border-[#DDD8CF]">
      <div id="about" className="scroll-mt-16">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal variant="clip" className="w-full max-w-sm lg:max-w-md aspect-[3/4] bg-[#DDD8CF] border border-[#DDD8CF] overflow-hidden shadow-sm">
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
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal leading-tight">
                  Técnica, sobriedad y sofisticación sin excesos
                </h2>

                <p className="mt-6 font-sans text-sm sm:text-base leading-relaxed text-[#3A352D] font-normal">
                  Consultora especializada en arquitectura de imagen pública, estilismo ejecutivo y comunicación estratégica de marca personal. Con más de una década de experiencia asesorando a líderes directivos, socios corporativos, voceros y empresarios en Chihuahua y a nivel internacional.
                </p>

                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-[#4A453D] font-normal">
                  Su metodología prioriza el rigor técnico por encima de modas efímeras: colorimetría científica, proporción morfológica y curaduría de guardarropas inteligentes donde cada detalle comunica autoridad, estatus y serenidad.
                </p>

                <div className="mt-8 py-5 border-t border-b border-[#DDD8CF] w-full">
                  <blockquote className="font-serif text-lg sm:text-xl lg:text-2xl text-[#2A251D] leading-snug">
                    “Porque La imagen no es vanidad, es identidad”
                  </blockquote>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans bg-[#1A1A1A] text-[#F5F2EB] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-colors"
                  >
                    Agendar consulta
                  </button>
                  <a
                    href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n"
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-sm text-[#4A453D] hover:text-[#1A1A1A] transition-colors"
                  >
                    WhatsApp directo: +52 614 187 9067
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
