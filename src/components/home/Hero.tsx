import { ArrowRight, Crown } from "lucide-react";
import heroConsultant from "@/assets/yesiam/hero-consultant.jpg";
import { useUI } from "@/store/ui-store";

export function Hero() {
  const { openBookingModal } = useUI();

  return (
    <section aria-label="Presentación Editorial" className="relative bg-obsidian text-cream min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background consultant image grid layout */}
      <div className="absolute inset-0 z-0 opacity-40 lg:opacity-50 flex justify-end">
        <img
          src={heroConsultant}
          alt="Consultora de Imagen y Marca Personal — YES I'AM"
          className="size-full object-cover object-top lg:object-right max-w-5xl"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 lg:py-32 w-full">
        <div className="max-w-2xl">
          <div className="animate-fade-soft mb-6 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 backdrop-blur-md">
            <Crown className="size-3.5 text-champagne" />
            <span className="eyebrow text-cream/90 text-[0.65rem]">
              ESTRATEGIA & POSICIONAMIENTO VIP
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.8rem,7.5vw,6rem)] font-light leading-[0.95] tracking-tight text-cream">
            Consultoría de <br />
            <em className="font-normal italic text-champagne">Imagen</em> & Marca Personal
          </h1>

          <p className="animate-fade-soft mt-6 max-w-lg text-sm sm:text-base leading-relaxed tracking-wider uppercase text-cream/80 font-medium">
            Donde tu presencia se convierte en autoridad y tu marca en un legado perdurable.
          </p>

          <div className="animate-fade-soft mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-none bg-cream px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-obsidian transition-all hover:bg-champagne hover:text-obsidian shadow-lg"
            >
              Iniciar Diagnóstico
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <a
              href="#metodologia"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-none border border-cream/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream backdrop-blur-sm transition hover:border-cream hover:bg-cream/10"
            >
              Explorar Metodología
            </a>
          </div>

          {/* Quick Stats Bar under hero */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8 max-w-lg">
            <div>
              <p className="font-display text-3xl font-semibold text-cream">500+</p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream/60 mt-1">Líderes Asesorados</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-champagne">10+</p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream/60 mt-1">Años de Trayectoria</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-cream">98%</p>
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream/60 mt-1">Éxito en Posicionamiento</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
