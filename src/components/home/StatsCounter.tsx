import { Reveal } from "@/components/motion/Reveal";

const STATS = [
  { value: "500+", label: "Clientes Asesorados", subtext: "Ejecutivos y líderes" },
  { value: "10+", label: "Años de Experiencia", subtext: "Trayectoria comprobada" },
  { value: "98%", label: "Casos de Éxito", subtext: "Satisfacción garantizada" },
  { value: "150+", label: "Marcas Rediseñadas", subtext: "Identidades de impacto" },
];

export function StatsCounter() {
  return (
    <section aria-label="Estadísticas de impacto" className="bg-cream text-obsidian py-16 border-t border-b border-obsidian/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="flex flex-col items-center">
              <span className="font-display text-5xl sm:text-6xl font-light text-obsidian tracking-tight">
                {stat.value}
              </span>
              <span className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-obsidian/85">
                {stat.label}
              </span>
              <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-obsidian/50">
                {stat.subtext}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
