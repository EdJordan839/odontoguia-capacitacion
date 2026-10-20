import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, Search, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { resolveImage } from "@/data/images";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

export function MobileMenu() {
  const { catalog } = useCatalog();
  const { menuOpen, setMenuOpen, setSearchOpen } = useUI();
  const close = () => setMenuOpen(false);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent
        side="left"
        className="h-screen-dvh flex w-[88vw] max-w-sm flex-col gap-0 overflow-hidden border-r-0 bg-background p-0 [&>button:last-child]:hidden"
      >
        <SheetTitle className="sr-only">Menú</SheetTitle>
        <SheetDescription className="sr-only">Navegación por categorías y espacios</SheetDescription>
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-border px-4">
          <Logo onClick={close} className="items-start" />
          <SheetClose className="grid size-11 place-items-center rounded-full hover:bg-muted" aria-label="Cerrar menú">
            <X className="size-5" />
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-4">
          <button
            type="button"
            onClick={() => {
              close();
              setSearchOpen(true);
            }}
            className="mb-6 flex min-h-12 w-full items-center gap-3 rounded-full border border-border bg-card px-4 text-left text-sm text-muted-foreground"
          >
            <Search className="size-4" /> Buscar mesas, sillas, cerámica…
          </button>

          <p className="eyebrow mb-2 text-muted-foreground">Categorías</p>
          <nav aria-label="Categorías" className="mb-8 flex flex-col">
            {catalog.categories.map((c) => (
              <Link
                key={c.id}
                to="/coleccion/$slug"
                params={{ slug: c.slug }}
                onClick={close}
                className="flex min-h-14 items-center justify-between border-b border-border/70 font-display text-2xl active:bg-muted"
              >
                {c.name}
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>

          <p className="eyebrow mb-3 text-muted-foreground">Espacios</p>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
            {catalog.spaces.map((s) => (
              <Link
                key={s.id}
                to="/coleccion/$slug"
                params={{ slug: s.slug }}
                onClick={close}
                className="relative aspect-[3/4] w-32 shrink-0 snap-start overflow-hidden rounded-2xl"
              >
                <img src={resolveImage(s.image)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                <span className="absolute inset-0 bg-hero-fade" />
                <span className="absolute bottom-2 left-3 font-display text-lg text-ink-foreground">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pb-safe border-t border-border bg-card px-4 pt-4">
          <a
            href="https://wa.me/525500000000"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground"
          >
            <MessageCircle className="size-4" /> Asesoría por WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
