import { MessageCircle, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { name: "Qué Incluye", href: "#que-incluye" },
  { name: "Servicios", href: "#servicios" },
  { name: "Sobre la Consultora", href: "#sobre-mi" },
  { name: "Cliente Ideal", href: "#cliente-ideal" },
  { name: "Inversión", href: "#inversion" },
];

export function MobileMenu() {
  const { catalog } = useCatalog();
  const { menuOpen, setMenuOpen, openBookingModal } = useUI();
  const close = () => setMenuOpen(false);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent
        side="left"
        className="h-screen-dvh flex w-[88vw] max-w-sm flex-col gap-0 overflow-hidden border-r-0 bg-[#F4F1EA] text-[#1A1A1A] p-0 [&>button:first-child]:hidden"
      >
        <SheetTitle className="sr-only">Menú YES I'AM</SheetTitle>
        <SheetDescription className="sr-only">Navegación principal</SheetDescription>
        <div className="flex h-16 items-center justify-between border-b border-[#DDD8CF] px-6">
          <Logo onClick={close} className="items-start" />
          <SheetClose className="grid size-10 place-items-center rounded-none text-[#1A1A1A] hover:bg-black/5" aria-label="Cerrar menú">
            <X className="size-5" />
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-6">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-3">
            SECCIONES
          </span>
          <nav aria-label="Navegación móvil" className="mb-8 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={close}
                className="flex min-h-12 items-center justify-between border-b border-[#DDD8CF] font-display text-xl font-light text-[#1A1A1A] active:bg-black/5"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-3">
            SERVICIOS
          </span>
          <div className="space-y-2 mb-6">
            {catalog.products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  close();
                  openBookingModal(p.id);
                }}
                className="w-full text-left p-3.5 bg-[#EFECE6] border border-[#DDD8CF] text-xs font-medium text-[#1A1A1A] uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors flex items-center justify-between"
              >
                <span>{p.name}</span>
                <span className="text-[0.65rem] text-[#7A756D]">${p.price.toLocaleString("es-MX")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#DDD8CF] bg-[#EFECE6] p-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              close();
              openBookingModal();
            }}
            className="w-full py-3.5 bg-[#1A1A1A] text-[#F4F1EA] text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
          >
            Agendar Diagnóstico
          </button>
          <a
            href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n"
            target="_blank"
            rel="noreferrer"
            className="flex py-3 items-center justify-center gap-2 border border-[#1A1A1A] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors"
          >
            <MessageCircle className="size-3.5" /> WhatsApp Directo
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
