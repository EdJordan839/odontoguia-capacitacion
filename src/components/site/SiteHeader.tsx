import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui-store";

const NAV_LINKS = [
  { name: "YOU WILL GET", href: "#you-will-get" },
  { name: "WHAT'S INSIDE", href: "#whats-inside" },
  { name: "INVESTMENT", href: "#investment" },
  { name: "ABOUT", href: "#about" },
  { name: "IDEAL CLIENT", href: "#ideal-client" },
  { name: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const { setMenuOpen, openBookingModal } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-b border-[#DDD8CF]",
        scrolled ? "bg-[#EAE5DE]/95 backdrop-blur-md shadow-xs" : "bg-[#EAE5DE]",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1360px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="grid size-9 place-items-center rounded-none text-[#1A1A1A] hover:bg-black/5"
          >
            <Menu className="size-4" />
          </button>
        </div>

        {/* Script Logo like in Showit template */}
        <a href="/" className="font-script text-3xl sm:text-4xl text-[#1A1A1A] leading-none pt-1">
          Yes I'am
        </a>

        {/* Desktop Minimal Navigation matching Showit template */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:gap-8 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#4A453D] transition-colors hover:text-[#1A1A1A]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Action: APPLY HERE */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#6A655D] hover:border-[#6A655D] transition-colors"
          >
            APPLY HERE
          </button>
        </div>
      </div>
    </header>
  );
}
