import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Metodología", href: "/#metodologia" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Sobre Mí", href: "/#biografia" },
  { name: "Misión & Visión", href: "/#mision-vision" },
];

export function SiteHeader() {
  const { setMenuOpen, openBookingModal } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-obsidian/10 bg-cream/90 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-cream/80"
          : "border-b border-transparent bg-cream",
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="grid size-11 place-items-center rounded-full text-obsidian transition hover:bg-obsidian/5"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <Logo />

        {/* Desktop Navigation */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-obsidian/75 transition-colors hover:text-obsidian"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-2 bg-obsidian text-cream px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-champagne hover:text-obsidian transition-colors shadow-sm"
          >
            <span>Agendar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
