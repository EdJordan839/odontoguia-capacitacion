import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { resolveImage } from "@/data/images";
import { formatMXN } from "@/lib/pricing";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function SearchDialog() {
  const { catalog } = useCatalog();
  const { searchOpen, setSearchOpen, openQuickView } = useUI();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return catalog.products.slice(0, 4);
    return catalog.products.filter((p) => {
      const cat = catalog.categories.find((c) => c.id === p.categoryId)?.name ?? "";
      return normalize(`${p.name} ${cat} ${p.woods.join(" ")} ${p.description}`).includes(q);
    });
  }, [query, catalog]);

  return (
    <Dialog
      open={searchOpen}
      onOpenChange={(o) => {
        setSearchOpen(o);
        if (!o) setQuery("");
      }}
    >
      <DialogContent className="top-0 max-w-none translate-y-0 gap-0 rounded-none border-0 p-0 sm:top-[8vh] sm:max-w-2xl sm:rounded-3xl [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">Buscar en la tienda</DialogTitle>
        <DialogDescription className="sr-only">Escribe para filtrar productos</DialogDescription>
        <div className="flex items-center gap-3 border-b border-border px-4 sm:px-6">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por pieza, madera o categoría"
            className="h-16 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Buscar"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-muted"
            aria-label="Cerrar búsqueda"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="max-h-[70dvh] overflow-y-auto overscroll-contain p-3 sm:p-4">
          <p className="eyebrow px-2 pb-2 pt-1 text-muted-foreground">
            {query ? `${results.length} resultado${results.length === 1 ? "" : "s"}` : "Sugerencias"}
          </p>
          {results.length === 0 ? (
            <p className="px-2 py-10 text-center text-sm text-muted-foreground">
              No encontramos piezas para “{query}”. Prueba con “nogal” o “mesa”.
            </p>
          ) : (
            <ul className="grid gap-1">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                      openQuickView(p.id);
                    }}
                    className="flex w-full items-center gap-4 rounded-2xl p-2 text-left transition hover:bg-muted"
                  >
                    <img
                      src={resolveImage(p.image)}
                      alt=""
                      loading="lazy"
                      className="size-16 shrink-0 rounded-xl bg-sand object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-lg leading-tight">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {catalog.categories.find((c) => c.id === p.categoryId)?.name}
                      </span>
                    </span>
                    <span className="text-sm font-semibold tabular-nums">{formatMXN(p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
