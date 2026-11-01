import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { name: "LO QUE OBTENDRÁS", href: "#que-obtendras" },
  { name: "LO QUE INCLUYE", href: "#que-incluye" },
  { name: "SERVICIOS VIP", href: "#servicios" },
  { name: "CLIENTE IDEAL", href: "#cliente-ideal" },
  { name: "SOBRE MÍ", href: "#sobre-mi" },
  { name: "INVERSIÓN", href: "#inversion" },
  { name: "PREGUNTAS", href: "#faq" },
];

export function SiteHeader() {
  const { setMenuOpen, openBookingModal } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-t border-b border-[#DDD8CF] bg-[#F5F2EB]",
        scrolled ? "shadow-sm bg-[#F5F2EB]/95 backdrop-blur-md" : "",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="grid size-9 place-items-center rounded-none text-[#1A1A1A] hover:bg-black/5"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* Official Crisp YES I'AM Brand Logo */}
        <Logo variant="dark" />

        {/* Desktop Navigation Links in Spanish */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#4A453D] transition-colors hover:text-[#1A1A1A]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="bg-[#1A1A1A] text-[#F5F2EB] px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] hover:bg-[#333333] transition-colors shadow-xs"
          >
            AGENDAR DIAGNÓSTICO
          </button>
        </div>
      </div>
    </header>
  );
}
