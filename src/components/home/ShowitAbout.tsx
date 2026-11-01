import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitAbout() {
  const { openBookingModal } = useUI();

  return (
    <section id="sobre-mi" className="scroll-mt-20 bg-[#EFECE6] text-[#1A1A1A] py-20 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Vertical Portrait in Clean Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal variant="clip" className="w-full max-w-md aspect-[3/4] bg-[#DDD8CF] border border-[#DDD8CF] overflow-hidden shadow-sm">
              <img
                src={consultantPortrait}
                alt="Consultora de Imagen y Marca Personal — YES I'AM"
                className="size-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
            </Reveal>
          </div>

          {/* Right Column: Minimalist Biography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Reveal variant="up">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-4 block">
                ABOUT · LA PROFESIONAL DETRÁS DE YES I'AM
              </span>

              <h2 className="font-display text-[clamp(2.4rem,4.8vw,3.75rem)] font-light leading-[1] text-[#1A1A1A] uppercase">
                Técnica, Sobriedad y Sofisticación Sin Excesos
              </h2>

              <p className="mt-8 text-sm sm:text-base leading-relaxed text-[#5A554D] font-light">
                Consultora especializada en arquitectura de imagen pública, estilismo ejecutivo y comunicación estratégica de marca personal. Con más de una década de experiencia asesorando a líderes directivos, socios corporativos, voceros y empresarios en Chihuahua y a nivel internacional.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#5A554D] font-light">
                Su metodología prioriza el rigor técnico por encima de modas efímeras: colorimetría científica, proporción morfológica y curaduría de guardarropas inteligentes donde cada detalle comunica autoridad, estatus y serenidad.
              </p>

              <div className="mt-8 py-6 border-t border-b border-[#DDD8CF]">
                <blockquote className="font-display italic text-lg sm:text-xl text-[#3A352D] leading-snug">
                  “La verdadera elegancia no busca llamar la atención a gritos, sino ser recordada con respeto y autoridad indiscutible.”
                </blockquote>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="bg-[#1A1A1A] text-[#F4F1EA] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-[#333333]"
                >
                  Agendar Consulta
                </button>
                <a
                  href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios%20de%20imagen"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-[#7A756D] hover:border-[#7A756D] transition-colors"
                >
                  WhatsApp Directo: +52 614 187 9067
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
