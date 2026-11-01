import { useState } from "react";
import { Plus, Minus, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { resolveImage } from "@/data/images";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";

export function ProductShowcase() {
  const { catalog } = useCatalog();
  const { openBookingModal } = useUI();
  const [expandedId, setExpandedId] = useState<string>(catalog.products[0]?.id || "");

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="servicios" className="scroll-mt-24 bg-cream text-obsidian py-20 lg:py-32 border-t border-obsidian/10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow text-champagne font-bold block mb-3">SERVICIOS VIP</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-tight text-obsidian">
              Nuestros Servicios & Soluciones de Marca
            </h2>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-obsidian/70">
              Programas estructurados de consultoría de imagen pública, estilismo y proyección ejecutiva.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {catalog.products.map((p, index) => {
            const isOpen = expandedId === p.id;
            return (
              <Reveal key={p.id} delay={index * 80}>
                <div className="border border-obsidian/15 bg-background rounded-none overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => toggle(p.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left group hover:bg-obsidian/5 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-display text-2xl sm:text-3xl text-champagne font-light tracking-wider">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-medium text-obsidian group-hover:text-champagne transition-colors">
                          {p.name}
                        </h3>
                        {p.badge && (
                          <span className="inline-block mt-1 text-[0.65rem] uppercase tracking-widest font-semibold text-obsidian/60">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="grid size-10 place-items-center border border-obsidian/20 transition-all group-hover:border-obsidian">
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-obsidian/10 animate-fade-soft">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-4 aspect-[4/3] overflow-hidden">
                          <img
                            src={resolveImage(p.image)}
                            alt={p.name}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="lg:col-span-8 space-y-4">
                          <p className="text-sm leading-relaxed text-obsidian/80">
                            {p.description}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs uppercase tracking-wider text-obsidian/75">
                            <div className="flex items-center gap-2">
                              <Check className="size-4 text-champagne shrink-0" />
                              <span>{p.leadTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="size-4 text-champagne shrink-0" />
                              <span>Modalidad Presencial o Digital</span>
                            </div>
                          </div>

                          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-obsidian/10">
                            <div>
                              <span className="text-[0.65rem] uppercase tracking-widest text-obsidian/60 block">Inversión</span>
                              <span className="font-display text-2xl font-semibold text-obsidian">
                                ${p.price.toLocaleString("es-MX")} MXN
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => openBookingModal(p.id)}
                              className="inline-flex items-center gap-2 bg-obsidian text-cream px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-champagne hover:text-obsidian transition-colors"
                            >
                              Reservar Servicio
                              <ArrowRight className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
