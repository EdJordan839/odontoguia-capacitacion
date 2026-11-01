import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle } from "lucide-react";
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
          <a
            href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20de%20diagn%C3%B3stico"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-700/30 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="size-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

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
