import { useState } from "react";
import { Compass, Eye, ShieldCheck, Sparkles, Star, Award, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type TabKey = "mision" | "vision" | "valores";

const TABS: { id: TabKey; title: string; subtitle: string; icon: typeof Compass }[] = [
  { id: "mision", title: "Nuestra Misión", subtitle: "Propósito & Impacto", icon: Compass },
  { id: "vision", title: "Nuestra Visión", subtitle: "Futuro & Alcance", icon: Eye },
  { id: "valores", title: "Valores Fundamentales", subtitle: "Principios de Marca", icon: ShieldCheck },
];

const VALORES_LIST = [
  { title: "Excelencia Editorial", desc: "Estándares visuales de alta costura en cada entregable y diagnóstico.", icon: Star },
  { title: "Confidencialidad VIP", desc: "Absoluta discreción y acuerdos de privacidad para líderes y ejecutivos.", icon: ShieldCheck },
  { title: "Autenticidad Directiva", desc: "Potenciamos la personalidad real del cliente sin disfrazar su esencia.", icon: Award },
  { title: "Coherencia Estratégica", desc: "Alineación perfecta entre tu vestuario, lenguaje corporal y metas.", icon: HeartHandshake },
];

export function MissionVisionValues() {
  const [activeTab, setActiveTab] = useState<TabKey>("mision");

  return (
    <section id="mision-vision" className="scroll-mt-24 bg-cream text-obsidian py-20 lg:py-32 border-t border-obsidian/10">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal>
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-3.5 text-champagne" />
              <span className="eyebrow text-champagne font-bold text-[0.65rem]">
                PROPÓSITO & FILOSOFÍA
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-tight text-obsidian">
              Misión, Visión & Valores
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-obsidian/70">
              El compromiso de excelencia detrás de cada estrategia de imagen ejecutiva.
            </p>
          </Reveal>
        </div>

        {/* Tab Selector buttons */}
        <Reveal delay={100}>
          <div className="flex justify-center mb-12">
            <div role="tablist" aria-label="Nuestra Misión, Visión y Valores" className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-obsidian/5 border border-obsidian/15 rounded-full">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-500",
                      isActive
                        ? "bg-obsidian text-cream shadow-md"
                        : "text-obsidian/70 hover:text-obsidian hover:bg-obsidian/10",
                    )}
                  >
                    <Icon className={cn("size-4", isActive ? "text-champagne" : "text-obsidian/60")} />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Tab Content Cards with Smooth Fade-in */}
        <div className="min-h-[280px]">
          {activeTab === "mision" && (
            <Reveal key="mision" className="animate-fade-soft bg-background border border-obsidian/15 p-8 sm:p-12 shadow-lift">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="size-14 mx-auto grid place-items-center rounded-full bg-obsidian text-champagne">
                  <Compass className="size-7" />
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-light text-obsidian leading-snug">
                  "Transformar la presencia de líderes y organizaciones mediante estrategias de imagen pública auténticas, sofisticadas y orientadas a resultados de impacto."
                </h3>
                <p className="text-sm leading-relaxed text-obsidian/75 font-light max-w-2xl mx-auto">
                  Construimos una arquitectura de comunicación visual donde cada prenda, postura y detalle refuercen la autoridad y visión de nuestros clientes ante sus públicos clave.
                </p>
              </div>
            </Reveal>
          )}

          {activeTab === "vision" && (
            <Reveal key="vision" className="animate-fade-soft bg-background border border-obsidian/15 p-8 sm:p-12 shadow-lift">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="size-14 mx-auto grid place-items-center rounded-full bg-obsidian text-champagne">
                  <Eye className="size-7" />
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-light text-obsidian leading-snug">
                  "Ser el estudio de consultoría de imagen ejecutiva y marca personal referente en México y Latinoamérica."
                </h3>
                <p className="text-sm leading-relaxed text-obsidian/75 font-light max-w-2xl mx-auto">
                  Ser reconocidos internacionalmente por llevar la reputación y estatus de líderes directivos, empresarios y marcas corporativas a su máxima expresión de elegancia y coherencia.
                </p>
              </div>
            </Reveal>
          )}

          {activeTab === "valores" && (
            <Reveal key="valores" className="animate-fade-soft">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {VALORES_LIST.map((val) => {
                  const VIcon = val.icon;
                  return (
                    <div
                      key={val.title}
                      className="bg-background border border-obsidian/15 p-6 sm:p-8 flex flex-col justify-between hover:border-obsidian hover:shadow-md transition-all group"
                    >
                      <div>
                        <span className="grid size-12 place-items-center rounded-full bg-obsidian/5 text-obsidian group-hover:bg-obsidian group-hover:text-champagne transition-colors">
                          <VIcon className="size-5" />
                        </span>
                        <h4 className="font-display text-xl font-medium text-obsidian mt-5">
                          {val.title}
                        </h4>
                        <p className="mt-2 text-xs text-obsidian/70 leading-relaxed font-light">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
