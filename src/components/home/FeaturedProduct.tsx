import { CalendarDays, Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { PriceTag, SizeSelector, useProductConfig, WoodSelector } from "@/components/product/product-config";
import { resolveImage } from "@/data/images";
import { cn } from "@/lib/utils";
import { useCatalog } from "@/store/catalog-store";

export function FeaturedProduct() {
  const { catalog } = useCatalog();
  const product = catalog.products.find((p) => p.id === catalog.featuredProductId) ?? catalog.products[0];
  const cfg = useProductConfig(product);
  if (!product) return null;

  const wood = catalog.woods.find((w) => w.id === cfg.woodId);
  const size = product.sizes?.find((s) => s.id === cfg.sizeId);
  const gallery = product.woods.length > 0
    ? product.woods.map((w) => ({ id: w, src: resolveImage(product.woodImages?.[w] ?? product.image) }))
    : [{ id: "default", src: resolveImage(product.image) }];

  return (
    <section id="pieza-insignia" className="scroll-mt-24 bg-secondary/70 py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Reveal variant="clip" className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-card shadow-lift">
              <div className="reveal-media absolute inset-0">
                {gallery.map((g) => (
                  <img
                    key={g.id}
                    src={g.src}
                    alt={`${product.name} en ${g.id}`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    aria-hidden={g.id !== cfg.woodId && gallery.length > 1}
                    className={cn(
                      "absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)]",
                      g.id === cfg.woodId || gallery.length === 1 ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                    )}
                  />
                ))}
              </div>
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-wider backdrop-blur">
                  {product.badge}
                </span>
              )}
            </Reveal>
            {wood && (
              <div key={wood.id} className="animate-fade-soft mt-5 flex items-start gap-4 px-1">
                <span className="font-display text-5xl leading-none text-parota/80">“</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{wood.name}</strong> · {wood.description}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5 lg:py-6">
          <Reveal>
            <p className="eyebrow text-parota">Diseño Insignia · CNC Nogara</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.6vw,3.75rem)] font-medium leading-[0.98]">{product.name}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{product.description}</p>
          </Reveal>

          {cfg.woods.length > 0 && (
            <Reveal delay={80}>
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">1 · Elige el acabado</p>
                <p className="text-sm font-medium">{wood?.name}</p>
              </div>
              <WoodSelector woods={cfg.woods} value={cfg.woodId} onChange={cfg.setWoodId} />
            </Reveal>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <Reveal delay={140}>
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2 · Elige la medida</p>
                <p className="text-sm font-medium">{size?.dimensions}</p>
              </div>
              <SizeSelector product={product} value={cfg.sizeId} onChange={cfg.setSizeId} />
            </Reveal>
          )}

          <Reveal delay={200} className="rounded-[1.25rem] border border-border bg-card p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Precio de tu selección</p>
                <PriceTag
                  key={cfg.price}
                  price={cfg.price}
                  compareAt={cfg.compareAt}
                  className="animate-fade-soft mt-1 font-display text-4xl"
                />
              </div>
              <p className="text-right text-xs text-muted-foreground">
                o 12 mensualidades de
                <br />
                <span className="font-semibold text-foreground tabular-nums">
                  {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(
                    Math.ceil(cfg.price / 12),
                  )}
                </span>
              </p>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={() => cfg.addToCart()}
                className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <ShoppingBag className="size-4" /> Agregar al carrito
              </button>
              <button
                type="button"
                onClick={() => toast("Nos comunicaremos contigo para personalizar tu pedido.")}
                className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-sm font-semibold transition hover:border-foreground"
              >
                <CalendarDays className="size-4" /> Solicitar cotización
              </button>
            </div>
            <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {["Corte CNC de alta precisión", "Acabados de calidad profesional", product.leadTime, "Garantía de satisfacción Nogara"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-olive" /> {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
