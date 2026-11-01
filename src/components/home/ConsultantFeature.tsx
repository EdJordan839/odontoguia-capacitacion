import { ArrowRight, Award, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import heroConsultant from "@/assets/yesiam/hero-consultant.jpg";
import { useUI } from "@/store/ui-store";

export function ConsultantFeature() {
  const { openBookingModal } = useUI();

  return (
    <section id="diagnostico-360" className="scroll-mt-24 bg-obsidian text-cream py-20 lg:py-32 border-t border-cream/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column — Consultant with Laptop Portrait */}
          <div className="lg:col-span-5">
            <Reveal variant="clip" className="overflow-hidden aspect-[3/4] rounded-none shadow-lift relative">
              <img
                src={heroConsultant}
                alt="Consultora de Imagen Ejecutiva con laptop — YES I'AM"
                className="size-full object-cover object-top transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
            </Reveal>
          </div>

          {/* Right Column — Editorial Text */}
          <div className="lg:col-span-7 flex flex-col items-start pl-0 lg:pl-6">
            <Reveal>
              <div className="mb-4">
                <span className="eyebrow text-champagne font-bold text-[0.65rem] tracking-[0.25em]">
                  ESTRATEGIA VIP · GAME PLAN
                </span>
              </div>

              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-tight text-cream">
                Diagnóstico de Imagen 360°: Eleva tu Posicionamiento y Liderazgo
              </h2>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-cream/80 max-w-xl font-light">
                Un diagnóstico exhaustivo diseñado para identificar fortalezas, corregir inconsistencias y construir una imagen que proyecte máxima seguridad, autoridad y coherencia profesional ante inversionistas, clientes y equipos de alto rendimiento.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-cream/15 py-6 w-full max-w-xl">
                <div className="flex items-start gap-3">
                  <Award className="size-5 text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg text-cream font-medium">Auditoría Morfológica & Color</h3>
                    <p className="text-xs text-cream/60 mt-1 leading-normal">
                      Selección exacta de tonalidades y prendas para destacar tu fisonomía.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-5 text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg text-cream font-medium">Protocolo & Lenguaje Corporal</h3>
                    <p className="text-xs text-cream/60 mt-1 leading-normal">
                      Dominio de la escena, postura y proyección en juntas directivas y medios.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="group inline-flex items-center justify-center gap-3 bg-cream text-obsidian px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-champagne hover:text-obsidian shadow-lg"
                >
                  Reservar Diagnóstico
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
