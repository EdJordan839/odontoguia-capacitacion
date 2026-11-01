import { MapPin, Video, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useUI } from "@/store/ui-store";

export function ShowitInvestment() {
  const { openBookingModal } = useUI();

  return (
    <section id="inversion" className="scroll-mt-20 bg-[#F4F1EA] text-[#1A1A1A] py-20 lg:py-28 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="text-center mb-16">
          <Reveal variant="up">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#7A756D] mb-3 block">
              MODALIDADES & INVERSIÓN
            </span>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-[1] text-[#1A1A1A] uppercase">
              Opciones de Acompañamiento
            </h2>
            <p className="mt-3 text-sm text-[#5A554D] font-light max-w-md mx-auto">
              Disponibilidad exclusiva de plazas por mes para garantizar atención 1 a 1 de máxima dedicación.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Presencial Chihuahua */}
          <Reveal variant="left">
            <div className="bg-[#EFECE6] border border-[#DDD8CF] p-8 sm:p-10 flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#7A756D]">
                    EXPERIENCIA PRIVADA
                  </span>
                  <MapPin className="size-4 text-[#1A1A1A]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                  Modalidad Presencial
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#7A756D] mt-1">
                  Atelier Privado en Chihuahua, Chih.
                </p>
                <p className="mt-6 text-sm text-[#5A554D] font-light leading-relaxed">
                  Diagnóstico directo con telas de calibración morfológica, auditoría física en tu guardarropa y acompañamiento exclusivo a firmas y sastrerías recomendadas.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDD8CF]">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="w-full bg-[#1A1A1A] text-[#F4F1EA] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  Agendar Presencial
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Online Global */}
          <Reveal variant="right" delay={100}>
            <div className="bg-[#EFECE6] border border-[#DDD8CF] p-8 sm:p-10 flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#7A756D]">
                    ALCANCE INTERNACIONAL
                  </span>
                  <Video className="size-4 text-[#1A1A1A]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                  Modalidad Online HD
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#7A756D] mt-1">
                  Sesiones 1 a 1 por Videollamada
                </p>
                <p className="mt-6 text-sm text-[#5A554D] font-light leading-relaxed">
                  Acompañamiento flexible con entregables digitales de alta precisión, lookbook interactivo y asesoría continua por canal privado de mensajería para ejecutivos globales.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DDD8CF]">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="w-full bg-[#1A1A1A] text-[#F4F1EA] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  Agendar Online
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
