import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitHero() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#F4F1EA] text-[#1A1A1A] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Title & Description */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
            <Reveal variant="up">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-5 block">
                CONSULTORÍA DE IMAGEN & MARCA PERSONAL
              </span>

              <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-light leading-[0.96] tracking-tight text-[#1A1A1A] uppercase">
                Arquitectura de Imagen & Estilo Ejecutivo
              </h1>

              <p className="mt-8 max-w-xl text-sm sm:text-base leading-relaxed text-[#5A554D] font-light">
                Diseñamos planes de imagen pública y presencia estratégica que elevan tu estatus y comunican tu liderazgo antes de pronunciar una sola palabra.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="bg-[#1A1A1A] text-[#F4F1EA] px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-[#333333] shadow-sm"
                >
                  Reservar Diagnóstico
                </button>

                <a
                  href="#que-incluye"
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-[#7A756D] hover:border-[#7A756D] transition-colors"
                >
                  Conoce el Programa
                </a>
              </div>

              {/* Minimal Seal Badge */}
              <div className="mt-14 pt-8 border-t border-[#DDD8CF] flex items-center gap-4">
                <div className="size-11 rounded-full border border-[#1A1A1A]/30 flex items-center justify-center text-[0.65rem] uppercase font-bold tracking-widest text-[#1A1A1A]">
                  YES
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    YES I'AM · Atelier de Imagen
                  </p>
                  <p className="text-[0.7rem] text-[#7A756D] uppercase tracking-widest">
                    Chihuahua, México & Online Global
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Tall Vertical Editorial Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Reveal variant="clip" className="w-full max-w-md aspect-[3/4] bg-[#E8E4DC] overflow-hidden border border-[#DDD8CF] shadow-sm">
              <img
                src={consultantPortrait}
                alt="Consultora de Imagen y Marca Personal — YES I'AM"
                className="size-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                fetchPriority="high"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
