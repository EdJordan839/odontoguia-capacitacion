import { Award, CheckCircle2, Sparkles, UserCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import heroConsultant from "@/assets/yesiam/hero-consultant.jpg";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function Biography() {
  const { openBookingModal } = useUI();

  return (
    <section id="biografia" className="scroll-mt-24 bg-obsidian text-cream py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Dual Photo Composition */}
          <div className="lg:col-span-5 relative">
            <Reveal variant="clip" className="overflow-hidden aspect-[3/4] shadow-lift relative z-10">
              <img
                src={consultantPortrait}
                alt="Consultora de Imagen y Marca Personal — YES I'AM"
                className="size-full object-cover object-top"
                loading="lazy"
              />
            </Reveal>

            {/* Overlapping Secondary Portrait */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-2/3 aspect-[4/5] z-20 overflow-hidden border-4 border-obsidian shadow-2xl">
              <img
                src={heroConsultant}
                alt="Consultora ejecutiva en estudio"
                className="size-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>

          {/* Biography & Story Details */}
          <div className="lg:col-span-7 flex flex-col items-start pl-0 lg:pl-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="size-3.5 text-champagne" />
                <span className="eyebrow text-champagne font-bold text-[0.65rem]">
                  LA PROFESIONAL DETRÁS DE YES I'AM
                </span>
              </div>

              <h2 className="font-display text-[clamp(2.5rem,4.8vw,4rem)] font-light leading-[1.02] text-cream">
                Arquitecta de Imagen, Presencia & Reputación Pública
              </h2>

              <p className="mt-6 text-sm sm:text-base leading-relaxed text-cream/80 font-light">
                Apasionada por el poder de la comunicación no verbal y el estilismo ejecutivo. Con más de una década de trayectoria asesorando a directivos C-Level, empresarios, voceros institucionales y firmas corporativas en el norte de México e internacionalmente.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-cream/70 font-light">
                Su metodología combina el análisis morfológico de precisión, la psicología del color aplicada al liderazgo y el diseño de guardarropas inteligentes para crear una presencia impecable que abre puertas y genera confianza inmediata.
              </p>

              {/* Highlights */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-cream/15 py-6 w-full">
                <div className="flex items-start gap-3">
                  <UserCheck className="size-5 text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-lg text-cream font-medium">Asesoría Personalizada 1 a 1</h4>
                    <p className="text-xs text-cream/60 mt-0.5">Trato confidencial y diseño a la medida de tu agenda directiva.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="size-5 text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-lg text-cream font-medium">Enfoque en Resultados</h4>
                    <p className="text-xs text-cream/60 mt-0.5">Elevación comprobada de estatus, reputación y autoridad.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="inline-flex items-center justify-center bg-cream text-obsidian px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-champagne hover:text-obsidian shadow-lg"
                >
                  Conoce mi Metodología
                </button>
                <a
                  href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20platicar%20sobre%20mi%20caso%20de%20imagen"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-cream/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream hover:border-cream hover:bg-cream/10 transition-colors"
                >
                  Contacto Directo por WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
