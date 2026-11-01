import { MessageCircle, Sparkles, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { name: "Inicio", href: "/" },
  { name: "Metodología", href: "/#metodologia" },
  { name: "Transformación", href: "/#transformacion" },
  { name: "Servicios VIP", href: "/#servicios" },
  { name: "Sobre Mí", href: "/#sobre-mi" },
];

export function MobileMenu() {
  const { catalog } = useCatalog();
  const { menuOpen, setMenuOpen, openBookingModal } = useUI();
  const close = () => setMenuOpen(false);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent
        side="left"
        className="h-screen-dvh flex w-[88vw] max-w-sm flex-col gap-0 overflow-hidden border-r-0 bg-cream text-obsidian p-0 [&>button:first-child]:hidden"
      >
        <SheetTitle className="sr-only">Menú YES I'AM</SheetTitle>
        <SheetDescription className="sr-only">Navegación principal por servicios y secciones</SheetDescription>
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-obsidian/10 px-4">
          <Logo onClick={close} className="items-start" />
          <SheetClose className="grid size-11 place-items-center rounded-full hover:bg-obsidian/5" aria-label="Cerrar menú">
            <X className="size-5" />
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-6">
          <p className="eyebrow mb-3 text-obsidian/60 text-[0.65rem]">Navegación</p>
          <nav aria-label="Navegación móvil" className="mb-8 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={close}
                className="flex min-h-14 items-center justify-between border-b border-obsidian/10 font-display text-2xl font-light text-obsidian active:bg-obsidian/5"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <p className="eyebrow mb-3 text-obsidian/60 text-[0.65rem]">Programas de Imagen</p>
          <div className="space-y-3 mb-6">
            {catalog.products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  close();
                  openBookingModal(p.id);
                }}
                className="w-full text-left p-3 border border-obsidian/10 bg-background text-xs font-semibold text-obsidian uppercase tracking-wider hover:bg-obsidian hover:text-cream transition-colors flex items-center justify-between"
              >
                <span>{p.name}</span>
                <span className="text-[0.65rem] text-champagne font-normal">${p.price.toLocaleString("es-MX")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pb-safe border-t border-obsidian/10 bg-background px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              close();
              openBookingModal();
            }}
            className="w-full flex min-h-12 items-center justify-center gap-2 bg-obsidian text-cream text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
          >
            <Sparkles className="size-3.5 text-champagne" />
            Agendar Diagnóstico VIP
          </button>
          <a
            href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20de%20diagn%C3%B3stico"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-none bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            <MessageCircle className="size-4" /> WhatsApp: +52 614 187 9067
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
