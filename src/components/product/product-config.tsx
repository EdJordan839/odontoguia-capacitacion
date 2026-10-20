import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Product, WoodId, WoodOption } from "@/data/catalog";
import { resolveImage } from "@/data/images";
import { computePrice, formatMXN } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useCatalog } from "@/store/catalog-store";

export function useProductConfig(product: Product | undefined) {
  const { catalog } = useCatalog();
  const { add, setOpen } = useCart();
  const [woodId, setWoodId] = useState<WoodId | undefined>(product?.woods[0]);
  const [sizeId, setSizeId] = useState<string | undefined>(product?.sizes?.[0]?.id);

  const activeWood = product?.woods.includes(woodId as WoodId) ? woodId : product?.woods[0];
  const activeSize = product?.sizes?.some((s) => s.id === sizeId) ? sizeId : product?.sizes?.[0]?.id;

  const price = product ? computePrice(product, catalog.woods, activeWood, activeSize) : 0;
  const compareAt =
    product?.compareAtPrice != null
      ? computePrice({ ...product, price: product.compareAtPrice }, catalog.woods, activeWood, activeSize)
      : undefined;

  const image = useMemo(() => {
    if (!product) return "";
    const byWood = activeWood ? product.woodImages?.[activeWood] : undefined;
    return resolveImage(byWood ?? product.image);
  }, [product, activeWood]);

  const woods = useMemo(
    () => catalog.woods.filter((w) => product?.woods.includes(w.id)),
    [catalog.woods, product],
  );

  function addToCart(openDrawer = true) {
    if (!product) return;
    add({ productId: product.id, woodId: activeWood, sizeId: activeSize, unitPrice: price });
    toast.success(`${product.name} se agregó al carrito`);
    if (openDrawer) setOpen(true);
  }

  return {
    woodId: activeWood,
    setWoodId,
    sizeId: activeSize,
    setSizeId,
    price,
    compareAt,
    image,
    woods,
    addToCart,
  };
}

export const WOOD_SWATCH: Record<WoodId, string> = {
  nogal: "bg-walnut",
  parota: "bg-parota",
  roble: "bg-oak",
};

export function WoodSelector({
  woods,
  value,
  onChange,
  size = "md",
}: {
  woods: WoodOption[];
  value?: WoodId | undefined;
  onChange: (id: WoodId) => void;
  size?: "sm" | "md";
}) {
  if (woods.length === 0) return null;
  return (
    <div role="radiogroup" aria-label="Tipo de madera" className="flex flex-wrap gap-2">
      {woods.map((w) => {
        const active = w.id === value;
        return (
          <button
            key={w.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(w.id)}
            className={cn(
              "group inline-flex items-center gap-2.5 rounded-full border bg-card text-left transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              size === "md" ? "min-h-11 py-1.5 pl-1.5 pr-4" : "min-h-9 py-1 pl-1 pr-3 text-sm",
              active ? "border-foreground shadow-soft" : "border-border hover:border-foreground/40",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "rounded-full ring-1 ring-foreground/10 transition-transform duration-300 group-hover:scale-105",
                WOOD_SWATCH[w.id],
                size === "md" ? "size-8" : "size-6",
              )}
            />
            <span className="font-medium">{w.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SizeSelector({
  product,
  value,
  onChange,
}: {
  product: Product;
  value?: string | undefined;
  onChange: (id: string) => void;
}) {
  if (!product.sizes?.length) return null;
  return (
    <div role="radiogroup" aria-label="Medidas" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {product.sizes.map((s) => {
        const active = s.id === value;
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s.id)}
            className={cn(
              "flex min-h-14 flex-row items-center justify-between gap-1 rounded-xl border px-4 py-3 text-left transition-all duration-300 sm:flex-col sm:items-start",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card hover:border-foreground/40",
            )}
          >
            <span className="text-sm font-semibold">{s.label}</span>
            <span className={cn("text-xs", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {s.dimensions}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PriceTag({ price, compareAt, className }: { price: number; compareAt?: number | undefined; className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="tabular-nums">{formatMXN(price)}</span>
      {compareAt != null && compareAt > price && (
        <span className="text-[0.8em] text-muted-foreground line-through tabular-nums">{formatMXN(compareAt)}</span>
      )}
    </div>
  );
}
