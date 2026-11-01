import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitHero() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#9C9891] text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-end justify-center overflow-hidden">
      {/* Background Studio Lighting & Atmosphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#8E8A83] via-[#9C9891] to-[#8E8A83]" />

      {/* Consultant in Black Blazer - Centered / Slightly Right */}
      <div className="absolute inset-y-0 right-0 sm:right-[5%] lg:right-[12%] w-full sm:w-[68%] lg:w-[56%] z-0 flex items-end justify-center sm:justify-end pointer-events-none">
        <img
          src={consultantPortrait}
          alt="Consultora de Imagen y Marca Personal"
          className="h-full max-h-[720px] w-auto object-cover object-top opacity-95 filter brightness-105"
          fetchPriority="high"
        />
        {/* Soft edge blend for smooth editorial integration */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#8E8A83] to-transparent hidden sm:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:hidden" />
      </div>

      {/* Foreground Content Overlaid on Left exactly like the screenshot */}
      <div className="relative z-10 mx-auto max-w-[1360px] w-full px-6 sm:px-10 lg:px-16 pb-14 sm:pb-20 pt-16">
        <div className="max-w-xl text-left">
          <Reveal variant="up">
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-white/80 font-light block mb-3">
              off beat
            </span>

            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-light leading-[0.98] text-white tracking-[0.04em] uppercase drop-shadow-sm">
              YOUR UNIQUE PROGRAM <br />
              <span className="font-serif italic font-light lowercase text-[clamp(2.2rem,5vw,4.25rem)] text-white/95">
                or a{" "}
              </span>
              <span className="font-display font-light text-[clamp(2.5rem,5.5vw,4.75rem)]">
                COURSE NAME
              </span>
            </h1>

            <p className="mt-5 font-serif text-xs sm:text-sm text-white/90 leading-relaxed font-light max-w-sm drop-shadow-xs">
              The place for a short description of your program, course or any services package and products. Consultoría de imagen ejecutiva y marca personal.
            </p>

            {/* Exact (I got you!) Tilted White Oval Hand-drawn Badge */}
            <div className="mt-8 flex items-center gap-6">
              <div className="inline-flex items-center justify-center -rotate-12 rounded-[999px] border border-white/85 px-5 py-1 font-script text-2xl text-white shadow-sm select-none hover:rotate-0 transition-transform">
                (I got you!)
              </div>

              <button
                type="button"
                onClick={() => openBookingModal()}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white border-b border-white pb-0.5 hover:text-white/80 hover:border-white/80 transition-colors"
              >
                APPLY HERE
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
