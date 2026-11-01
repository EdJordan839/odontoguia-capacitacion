import { Reveal } from "@/components/motion/Reveal";

const PRESS_LOGOS = [
  "VOGUE",
  "FORBES",
  "BUSINESS INSIDER",
  "HARPER'S BAZAAR",
  "ELLE",
  "USA TODAY",
  "GLAMOUR",
];

export function BrandMarquee() {
  return (
    <section aria-label="Prensa y Medios" className="bg-cream text-obsidian py-14 border-t border-b border-obsidian/10">
      <div className="mx-auto max-w-[1440px] px-6 text-center">
        <Reveal>
          <p className="eyebrow text-obsidian/60 text-[0.65rem] tracking-[0.35em] mb-8 uppercase font-bold">
            EN MEDIOS Y PRENSA DE IMPACTO · AS SEEN IN
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 opacity-80">
            {PRESS_LOGOS.map((name) => (
              <span
                key={name}
                className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-obsidian/75 hover:text-obsidian hover:scale-105 transition-all cursor-default select-none uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
