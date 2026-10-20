import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/store/catalog-store";

export function ProductShowcase() {
  const { catalog } = useCatalog();
  const [filter, setFilter] = useState<string>("todo");
  const products = catalog.products
    .filter((p) => filter === "todo" || p.categoryId === filter);

  const chips = [{ id: "todo", name: "Todos los productos" }, ...catalog.categories];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
      <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <p className="eyebrow text-parota">Catálogo Nogara</p>
          <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.98]">
            Productos destacados y <em className="text-olive">soluciones CNC</em>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Link
            to="/coleccion/$slug"
            params={{ slug: filter }}
            className="group inline-flex items-center gap-2 text-sm font-semibold"
          >
            Ver catálogo completo
            <span className="grid size-10 place-items-center rounded-full border border-border transition group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            aria-pressed={filter === c.id}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-all duration-300",
              filter === c.id
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:border-foreground/50 hover:text-foreground",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div key={filter} className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
        {products.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted-foreground">Pronto tendremos más piezas en esta categoría.</p>
        )}
      </div>
    </section>
  );
}
