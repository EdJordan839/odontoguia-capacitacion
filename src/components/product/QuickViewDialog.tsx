import { Truck, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/data/catalog";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";
import { PriceTag, SizeSelector, useProductConfig, WoodSelector } from "./product-config";

export function QuickViewDialog() {
  const { catalog } = useCatalog();
  const { quickViewId, openQuickView } = useUI();
  const product = catalog.products.find((p) => p.id === quickViewId);

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && openQuickView(null)}>
      <DialogContent className="max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-4xl gap-0 overflow-y-auto overscroll-contain rounded-3xl border-0 p-0 [&>button:last-child]:hidden">
        {product && <QuickViewBody key={product.id} product={product} onClose={() => openQuickView(null)} />}
      </DialogContent>
    </Dialog>
  );
}

function QuickViewBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const { catalog } = useCatalog();
  const cfg = useProductConfig(product);
  const category = catalog.categories.find((c) => c.id === product.categoryId);

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-[4/5] bg-sand md:aspect-auto md:min-h-[560px]">
        <img key={cfg.image} src={cfg.image} alt={product.name} className="animate-fade-soft absolute inset-0 size-full object-contain" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-background/90 backdrop-blur md:hidden"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex flex-col gap-5 p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 hidden size-10 place-items-center rounded-full hover:bg-muted md:grid"
        >
          <X className="size-5" />
        </button>
        <div>
          <p className="eyebrow text-parota">{category?.name}</p>
          <DialogTitle className="mt-2 font-display text-3xl font-medium leading-tight sm:text-4xl">{product.name}</DialogTitle>
          <PriceTag price={cfg.price} compareAt={cfg.compareAt} className="mt-3 text-xl font-semibold" />
        </div>
        <DialogDescription className="text-sm leading-relaxed text-muted-foreground">{product.description}</DialogDescription>
        {cfg.woods.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Madera</p>
            <WoodSelector woods={cfg.woods} value={cfg.woodId} onChange={cfg.setWoodId} size="sm" />
          </div>
        )}
        {product.sizes && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Medidas</p>
            <SizeSelector product={product} value={cfg.sizeId} onChange={cfg.setSizeId} />
          </div>
        )}
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck className="size-4 text-olive" /> {product.leadTime}
        </p>
        <button
          type="button"
          onClick={() => {
            cfg.addToCart();
            onClose();
          }}
          className="mt-auto flex min-h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
