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
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal leading-tight">
                Inversión y modalidades
              </h2>
              <p className="mt-3 font-sans text-sm sm:text-base text-[#5A554D] font-normal max-w-lg mx-auto">
                Disponibilidad exclusiva de plazas limitadas por mes para atención individualizada.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Presencial Chihuahua */}
            <Reveal variant="left">
              <div className="bg-[#E6E3DB] border border-[#D2CDC4] p-8 sm:p-9 flex flex-col justify-between h-full hover:bg-[#DDD9D0] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#7A756D] font-medium">
                      Atelier privado
                    </span>
                    <MapPin className="size-4 text-[#1A1A1A]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                    Modalidad presencial
                  </h3>
                  <p className="font-sans text-xs text-[#7A756D] mt-1">
                    Chihuahua, Chih., México
                  </p>
                  <p className="mt-4 font-sans text-sm text-[#4A453D] font-normal leading-relaxed">
                    Diagnóstico presencial con telas de calibración cromática, auditoría física de armario en tu residencia o despacho y acompañamiento personalizado a sastrería.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#D2CDC4]">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans w-full bg-[#1A1A1A] text-[#F5F2EB] py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                  >
                    Agendar presencial
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Online Global */}
            <Reveal variant="right" delay={80}>
              <div className="bg-[#E6E3DB] border border-[#D2CDC4] p-8 sm:p-9 flex flex-col justify-between h-full hover:bg-[#DDD9D0] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#7A756D] font-medium">
                      Sesiones HD globales
                    </span>
                    <Video className="size-4 text-[#1A1A1A]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-normal">
                    Modalidad online HD
                  </h3>
                  <p className="font-sans text-xs text-[#7A756D] mt-1">
                    Videollamada en directo
                  </p>
                  <p className="mt-4 font-sans text-sm text-[#4A453D] font-normal leading-relaxed">
                    Diagnóstico a distancia de alta resolución, lookbook digital interactivo y canal privado de consulta para directivos y líderes internacionales.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#D2CDC4]">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="font-sans w-full bg-[#1A1A1A] text-[#F5F2EB] py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                  >
                    Agendar online
                    <ArrowRight className="size-3.5" />
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
