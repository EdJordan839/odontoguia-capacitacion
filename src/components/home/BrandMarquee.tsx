import { Sparkle } from "lucide-react";

const VALUES = [
  "Corte Láser y Router CNC de Alta Precisión",
  "Diseño Paramétrico Exclusivo",
  "Reconocimientos y Trofeos en Acrílico y Espejo",
  "Grill Boxes Térmicos para Asados",
  "Precios Especiales de Mayoreo",
  "Envíos Seguros a Todo México",
];

const PHRASES = ["CNC", "Diseño", "Soluciones", "Precisión", "Acrílico", "Paramétrico", "Calidad", "NOGARA"];

function Row({ items, variant }: { items: string[]; variant: "solid" | "display" }) {
  const group = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span
            className={
              variant === "solid"
                ? "whitespace-nowrap px-6 text-sm font-semibold uppercase tracking-[0.22em] sm:px-10"
                : "whitespace-nowrap px-6 font-display text-5xl italic text-cream/90 sm:px-10 sm:text-7xl"
            }
          >
            {t}
          </span>
          <Sparkle className={variant === "solid" ? "size-3.5 text-oak" : "size-6 text-parota"} aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="marquee overflow-hidden"
      style={{
        ["--marquee-duration" as string]: variant === "solid" ? "38s" : "55s",
        ["--marquee-direction" as string]: variant === "solid" ? "normal" : "reverse",
      }}
    >
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section aria-label="Valores de Nogara" className="overflow-hidden bg-olive-deep py-8 text-cream sm:py-10">
      <Row items={VALUES} variant="solid" />
      <div className="my-6 h-px bg-cream/15 sm:my-8" />
      <Row items={PHRASES} variant="display" />
    </section>
  );
}
