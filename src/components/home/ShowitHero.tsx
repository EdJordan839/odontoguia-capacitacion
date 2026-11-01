import { Reveal } from "@/components/motion/Reveal";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitHero() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#EAE5DE] text-[#1A1A1A] overflow-hidden border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Column: Overlaid text exactly as in Showit template */}
          <div className="lg:col-span-6 pb-12 sm:pb-20 z-10">
            <Reveal variant="up">
              <span className="font-serif italic text-sm sm:text-base text-[#6A655D] block mb-2">
                atelier privado
              </span>

              <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.75rem)] font-light leading-[0.98] tracking-[0.06em] text-[#1A1A1A] uppercase">
                YOUR UNIQUE PROGRAM <br />
                OR A COURSE NAME
              </h1>

              <p className="mt-6 font-serif italic text-sm sm:text-base text-[#4A453D] leading-relaxed max-w-md">
                The place for a short description of your program, course or any services package and products. Consultoría de imagen y marca personal para líderes y directivos.
              </p>

              {/* Exact (I got you!) Showit Tilted Oval Badge */}
              <div className="mt-8 flex items-center gap-6">
                <div className="inline-flex items-center justify-center -rotate-6 rounded-full border border-[#1A1A1A]/70 px-5 py-1.5 font-script text-2xl text-[#1A1A1A] select-none hover:rotate-0 transition-transform">
                  (I got you!)
                </div>

                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#6A655D] hover:border-[#6A655D] transition-colors"
                >
                  APPLY HERE
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Woman in Black Blazer Vertical Photo */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <Reveal variant="clip" className="w-full max-w-md aspect-[3/4] overflow-hidden bg-[#DDD8CF] border-t border-l border-r border-[#D0C9BE] shadow-xs">
              <img
                src={consultantPortrait}
                alt="Consultora en traje sastre — YES I'AM"
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
