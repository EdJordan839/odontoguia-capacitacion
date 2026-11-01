import { Reveal } from "@/components/motion/Reveal";

export function ShowitTopBanner() {
  return (
    <div className="relative bg-[#C2BCB2] text-white py-14 sm:py-20 overflow-hidden border-b border-[#B0AAA0]/50 select-none">
      {/* Background with subtle botanical silhouette & texture */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/20 pointer-events-none" />

      {/* Decorative botanical shadow leaf on the left */}
      <div className="absolute -left-12 top-4 w-48 h-64 opacity-25 filter blur-sm pointer-events-none transform -rotate-12">
        <svg viewBox="0 0 100 150" fill="currentColor" className="text-black/60 size-full">
          <path d="M50 150 C45 100 20 80 10 50 C5 30 15 10 30 5 C45 0 55 20 50 50 C65 20 85 10 95 25 C100 45 80 80 50 150 Z" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
        <Reveal variant="up">
          <span className="font-script text-6xl sm:text-7xl lg:text-8xl text-white block leading-[0.9] drop-shadow-sm font-normal">
            Showit
          </span>
          <span className="font-sans text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.28em] text-white uppercase block mt-2 drop-shadow-sm">
            WEBSITE TEMPLATE
          </span>
        </Reveal>
      </div>
    </div>
  );
}
