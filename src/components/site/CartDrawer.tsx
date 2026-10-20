import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { resolveImage } from "@/data/images";
import { formatMXN } from "@/lib/pricing";
import { useCart } from "@/store/cart-store";
import { useCatalog } from "@/store/catalog-store";

export const FREE_SHIPPING_THRESHOLD = 15000;

export function CartDrawer() {
  const { catalog } = useCatalog();
  const { lines, isOpen, setOpen, setQuantity, remove, subtotal, count } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="h-screen-dvh flex w-full max-w-none flex-col gap-0 border-l-0 bg-background p-0 sm:max-w-md [&>button:last-child]:hidden"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <SheetTitle className="font-display text-2xl font-medium">Tu carrito</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              {count} {count === 1 ? "artículo" : "artículos"}
            </SheetDescription>
          </div>
          <SheetClose className="grid size-11 place-items-center rounded-full hover:bg-muted" aria-label="Cerrar carrito">
            <X className="size-5" />
          </SheetClose>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-border px-5 py-3">
            <p className="text-xs text-muted-foreground">
              {remaining > 0 ? (
                <>
                  Te faltan <strong className="text-foreground">{formatMXN(remaining)}</strong> para envío sin costo
                </>
              ) : (
                <strong className="text-primary">¡Tu pedido tiene envío sin costo!</strong>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain px-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-sand">
                <ShoppingBag className="size-6 text-walnut" />
              </span>
              <p className="font-display text-2xl">Tu carrito está vacío</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Explora nuestras colecciones de madera maciza y encuentra la pieza para tu espacio.
              </p>
              <SheetClose className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
                Seguir explorando
              </SheetClose>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((line) => {
                const product = catalog.products.find((p) => p.id === line.productId);
                if (!product) return null;
                const wood = catalog.woods.find((w) => w.id === line.woodId);
                const size = product.sizes?.find((s) => s.id === line.sizeId);
                const img = (line.woodId && product.woodImages?.[line.woodId]) || product.image;
                return (
                  <li key={line.key} className="flex gap-4 py-5">
                    <img
                      src={resolveImage(img)}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-[4/5] w-20 shrink-0 rounded-xl bg-sand object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-lg leading-tight">{product.name}</p>
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          aria-label={`Quitar ${product.name}`}
                          className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {[wood?.name, size ? `${size.label} · ${size.dimensions}` : null].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity - 1)}
                            aria-label="Disminuir cantidad"
                            className="grid size-9 place-items-center rounded-full hover:bg-muted"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.key, line.quantity + 1)}
                            aria-label="Aumentar cantidad"
                            className="grid size-9 place-items-center rounded-full hover:bg-muted"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">{formatMXN(line.unitPrice * line.quantity)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="pb-safe border-t border-border bg-card px-5 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl tabular-nums">{formatMXN(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Impuestos incluidos. Envío calculado al finalizar.</p>
            <button
              type="button"
              onClick={() => toast("El pago en línea se habilitará al conectar la tienda.")}
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Finalizar compra
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
