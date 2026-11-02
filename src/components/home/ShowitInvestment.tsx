import { MapPin, Video, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/store/ui-store";

export function ShowitInvestment() {
  const { openBookingModal } = useUI();

  return (
    <section id="inversion" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 border-b border-[#DDD8CF]">
      <div id="investment" className="scroll-mt-16">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="text-center mb-12">
            <Reveal variant="up">
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] mb-3 block">
                MODALIDADES & RESERVAS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.06em] text-[#1A1A1A] uppercase">
                INVERSIÓN
              </h2>
              <p className="mt-2 font-sans text-xs sm:text-sm text-[#5A554D] font-normal">
                Disponibilidad exclusiva de plazas limitadas por mes para atención individualizada.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Presencial Chihuahua */}
            <Reveal variant="left">
              <div className="bg-[#EAE5DE] border border-[#DDD8CF] p-8 sm:p-9 flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-[#7A756D]">
                      Atelier Privado
                    </span>
                    <MapPin className="size-3.5 text-[#1A1A1A]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A]">
                    Modalidad Presencial
                  </h3>
                  <p className="font-sans text-[0.68rem] uppercase tracking-widest text-[#7A756D] mt-1">
                    Chihuahua, Chih., México
                  </p>
                  <p className="mt-4 font-sans text-xs sm:text-sm text-[#4A453D] font-normal leading-relaxed">
                    Diagnóstico presencial con telas de calibración cromática, auditoría física de armario en tu residencia o despacho y acompañamiento personalizado a sastrería.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#D5D0C5]">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans w-full bg-[#1A1A1A] text-[#F5F2EB] py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                  >
                    Agendar Presencial
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Online Global */}
            <Reveal variant="right" delay={80}>
              <div className="bg-[#EAE5DE] border border-[#DDD8CF] p-8 sm:p-9 flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-wider text-[#7A756D]">
                      Sesiones HD Globales
                    </span>
                    <Video className="size-3.5 text-[#1A1A1A]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A]">
                    Modalidad Online HD
                  </h3>
                  <p className="font-sans text-[0.68rem] uppercase tracking-widest text-[#7A756D] mt-1">
                    Videollamada en Directo
                  </p>
                  <p className="mt-4 font-sans text-xs sm:text-sm text-[#4A453D] font-normal leading-relaxed">
                    Diagnóstico a distancia de alta resolución, lookbook digital interactivo y canal privado de consulta para directivos y líderes internacionales.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#D5D0C5]">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans w-full bg-[#1A1A1A] text-[#F5F2EB] py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                  >
                    Agendar Online
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
