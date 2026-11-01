import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { name: "Qué Incluye", href: "#que-incluye" },
  { name: "Servicios", href: "#servicios" },
  { name: "Sobre Mí", href: "#sobre-mi" },
  { name: "Cliente Ideal", href: "#cliente-ideal" },
  { name: "Inversión", href: "#inversion" },
];

export function SiteHeader() {
  const { setMenuOpen, openBookingModal } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-b border-[#DDD8CF]",
        scrolled ? "bg-[#F4F1EA]/95 backdrop-blur-md shadow-sm" : "bg-[#F4F1EA]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="grid size-10 place-items-center rounded-none text-[#1A1A1A] hover:bg-black/5"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <Logo />

        {/* Desktop Minimal Navigation */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[0.72rem] font-medium uppercase tracking-[0.25em] text-[#5A554D] transition-colors hover:text-[#1A1A1A]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="bg-[#1A1A1A] text-[#F4F1EA] px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] hover:bg-[#333333] transition-colors"
          >
            Agendar Cita
          </button>
        </div>
      </div>
    </header>
  );
}
