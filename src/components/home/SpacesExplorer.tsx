import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { resolveImage } from "@/data/images";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/store/catalog-store";

type Mode = "espacios" | "categorias";

const SPACE_LAYOUT = [
  "col-span-2 aspect-[16/11] lg:col-span-1 lg:row-span-2 lg:aspect-auto",
  "aspect-[3/4] lg:aspect-auto",
  "aspect-[3/4] lg:aspect-auto",
  "aspect-[3/4] lg:row-span-2 lg:aspect-auto",
];

export function SpacesExplorer() {
  const { catalog } = useCatalog();
  const [mode, setMode] = useState<Mode>("espacios");

  const items =
    mode === "espacios"
      ? catalog.spaces.map((s) => ({
          id: s.id,
          slug: s.slug,
          name: s.name,
          caption: s.tagline,
          image: s.image,
          count: catalog.products.filter((p) => p.spaceIds.includes(s.id)).length,
        }))
      : catalog.categories.map((c) => {
          const items = catalog.products.filter((p) => p.categoryId === c.id);
          return {
            id: c.id,
            slug: c.slug,
            name: c.name,
            caption: c.description,
            image: items[0]?.image ?? "p-repisas",
            count: items.length,
          };
        });

  return (
    <section id="espacios" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <p className="eyebrow text-parota">Soluciones Nogara</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.98]">
            Diseño, tecnología y precisión para <em className="text-olive">cada proyecto</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div role="tablist" aria-label="Explorar por" className="inline-flex rounded-full border border-border bg-card p-1">
            {(["espacios", "categorias"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "min-h-11 rounded-full px-5 text-sm font-semibold capitalize transition-all duration-500",
                  mode === m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "espacios" ? "Líneas de aplicación" : "Categorías"}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div
        key={mode}
        className={cn(
          "grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5",
          mode === "espacios"
            ? "lg:grid-flow-dense lg:grid-cols-3 lg:auto-rows-[19rem] xl:auto-rows-[22rem]"
            : "lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <Reveal
            key={item.id}
            variant="clip"
            delay={(i % 3) * 110}
            className={cn(
              "group relative overflow-hidden rounded-[1.25rem]",
              mode === "espacios"
                ? (SPACE_LAYOUT[i] ?? "aspect-[3/4]")
                : "aspect-[4/3]",
            )}
          >
            <img
              src={resolveImage(item.image)}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-hero-fade opacity-90" />
            <Link
              to="/coleccion/$slug"
              params={{ slug: item.slug }}
              className="absolute inset-0 flex flex-col justify-end p-4 text-ink-foreground sm:p-6"
            >
              <span className="mb-auto self-end grid size-10 place-items-center rounded-full bg-cream/90 text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-cream sm:size-12">
                <ArrowUpRight className="size-4 sm:size-5" />
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-ink-foreground/75">
                {item.count} {item.count === 1 ? "producto" : "productos"}
              </span>
              <span className="mt-1 font-display text-2xl leading-none sm:text-3xl lg:text-4xl">{item.name}</span>
              <span className="mt-1.5 line-clamp-1 text-xs text-ink-foreground/80 sm:text-sm">{item.caption}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
