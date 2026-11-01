import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { resolveImage } from "@/data/images";
import { useUI } from "@/store/ui-store";

export function FeaturedProduct() {
  const { openBookingModal } = useUI();

  return (
    <section id="transformacion" className="scroll-mt-24 bg-obsidian text-cream py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Side — Luxury Handbag Image */}
          <div className="lg:col-span-6">
            <Reveal variant="left" className="overflow-hidden aspect-[4/3] rounded-none shadow-lift relative">
              <img
                src={resolveImage("luxury-handbag")}
                alt="Bolso de piel luxury y accesorios ejecutivos"
                className="size-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent pointer-events-none" />
            </Reveal>
          </div>

          {/* Right Side — Editorial Text Block */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <Reveal variant="right" delay={150}>
              <span className="eyebrow text-champagne font-bold mb-4 block">TRANSFORMACIÓN VIP</span>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-[1.02] text-cream">
                Transformando líderes y marcas con visión inspirada y resultados estratégicos.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-cream/75 max-w-xl font-light">
                Diseñamos una narrativa visual y conceptual que proyecta tu valor real. Desde la reestructuración de guardarropa ejecutivo hasta el coaching de presencia mediática y comunicación de autoridad.
              </p>

              <ul className="mt-8 space-y-3 text-xs uppercase tracking-wider text-cream/85">
                {[
                  "Auditoría reputacional y código de vestimenta",
                  "Estrategia de colorimetría y morfología presencial",
                  "Dirección fotográfica de retrato editorial",
                  "Manual de presencia digital e identidad ejecutiva",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-champagne shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="group inline-flex items-center justify-center gap-3 bg-cream text-obsidian px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-champagne hover:text-obsidian shadow-lg"
                >
                  Solicitar Diagnóstico Gratuito
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
