import { Reveal } from "@/components/motion/Reveal";
import { resolveImage } from "@/data/images";
import { useUI } from "@/store/ui-store";

export function SpacesExplorer() {
  const { openBookingModal } = useUI();

  return (
    <section id="metodologia" className="scroll-mt-24 bg-cream text-obsidian py-20 lg:py-32 border-t border-obsidian/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column — Executive Styling Moodboard Image */}
          <div className="lg:col-span-4">
            <Reveal variant="clip" className="overflow-hidden aspect-[4/5] rounded-none shadow-soft">
              <img
                src={resolveImage("executive-styling")}
                alt="Planificación editorial de vestuario ejecutivo y paleta de colores"
                className="size-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
            </Reveal>
          </div>

          {/* Center Column — Editorial Value Proposition Quote */}
          <div className="lg:col-span-4 flex flex-col items-center text-center px-4 py-6">
            <Reveal>
              <span className="eyebrow text-champagne font-bold mb-4 block">FILOSOFÍA DE MARCA</span>
              <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-snug text-obsidian">
                Diseñamos planes de imagen pública e identidad estratégica que elevan tu estatus y conectan con tu audiencia de alto nivel.
              </h2>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-obsidian/70 max-w-sm leading-relaxed">
                Asesorías especializadas en Imagen Ejecutiva, Personal, Pública y para Empresas.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="inline-flex items-center justify-center bg-obsidian text-cream px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-champagne hover:text-obsidian"
                >
                  Descubrir Metodología
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column — Luxury Watch & Suit Image */}
          <div className="lg:col-span-4">
            <Reveal variant="clip" delay={120} className="overflow-hidden aspect-[4/5] rounded-none shadow-soft">
              <img
                src={resolveImage("luxury-watch")}
                alt="Reloj de lujo y traje ejecutivo de sartoría"
                className="size-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
