import { Eye, Heart, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/catalog";
import { resolveImage } from "@/data/images";
import { computePrice, formatMXN } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";
import { toast } from "sonner";
import { WOOD_SWATCH } from "./product-config";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { catalog } = useCatalog();
  const { add } = useCart();
  const { openQuickView } = useUI();
  const [fav, setFav] = useState(false);
  const category = catalog.categories.find((c) => c.id === product.categoryId);
  const fromPrice = computePrice(product, catalog.woods, product.woods[0], product.sizes?.[0]?.id);
  const minPrice = Math.min(
    fromPrice,
    ...product.woods.map((w) => computePrice(product, catalog.woods, w, product.sizes?.[0]?.id)),
  );
  const configurable = product.woods.length > 1 || (product.sizes?.length ?? 0) > 1;

  const quickAdd = () => {
    if (configurable) {
      openQuickView(product.id);
      return;
    }
    add({ productId: product.id, woodId: product.woods[0], sizeId: product.sizes?.[0]?.id, unitPrice: fromPrice });
    toast.success(`${product.name} se agregó al carrito`);
  };

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="absolute inset-0 z-0 block"
          aria-label={`Vista rápida de ${product.name}`}
        >
          <img
            src={resolveImage(product.image)}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            width={800}
            height={1000}
            className="size-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
          />
        </button>
        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider backdrop-blur">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setFav((f) => !f)}
          aria-pressed={fav}
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-105"
        >
          <Heart className={cn("size-4 transition", fav && "fill-parota text-parota")} />
        </button>

        {/* Acciones rápidas: visibles al pasar el cursor; siempre visibles en táctil */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-500 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={quickAdd}
            className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90"
          >
            <Plus className="size-4" /> {configurable ? "Elegir opciones" : "Agregar"}
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product.id)}
            aria-label="Vista rápida"
            className="hidden size-11 place-items-center rounded-full bg-background/95 shadow-soft backdrop-blur sm:grid"
          >
            <Eye className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{category?.name}</p>
          <h3 className="mt-1 font-display text-xl leading-tight">{product.name}</h3>
          {product.woods.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5" aria-label={`Maderas: ${product.woods.join(", ")}`}>
              {product.woods.map((w) => (
                <span key={w} className={cn("size-3.5 rounded-full ring-1 ring-foreground/10", WOOD_SWATCH[w])} />
              ))}
            </div>
          )}
        </div>
        <div className="shrink-0 text-right text-sm font-semibold tabular-nums">
          {configurable && <span className="block text-[0.65rem] font-medium text-muted-foreground">desde</span>}
          {formatMXN(minPrice)}
          {product.compareAtPrice && (
            <span className="block text-xs font-normal text-muted-foreground line-through">
              {formatMXN(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
