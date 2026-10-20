import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";
import { Logo } from "./Logo";

const navLink =
  "relative py-2 text-[0.82rem] font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-500 hover:after:scale-x-100 data-[status=active]:text-foreground data-[status=active]:after:scale-x-100";

export function SiteHeader() {
  const { catalog } = useCatalog();
  const { count, setOpen } = useCart();
  const { setSearchOpen, setMenuOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 450);
    return () => window.clearTimeout(t);
  }, [count]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-b border-transparent bg-background",
      )}
    >
      <div className="mx-auto grid h-[var(--header-h)] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-10">
        {/* Móvil: menú */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="grid size-11 place-items-center rounded-full transition hover:bg-muted"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <Logo className="justify-self-center lg:justify-self-start" />

        {/* Escritorio: categorías */}
        <nav aria-label="Categorías" className="hidden items-center justify-center gap-7 lg:flex xl:gap-9">
          {catalog.categories.map((c) => (
            <Link key={c.id} to="/coleccion/$slug" params={{ slug: c.slug }} className={navLink}>
              {c.name}
            </Link>
          ))}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(navLink, "inline-flex items-center gap-1 outline-none")}>
              Espacios <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={14} className="w-64 rounded-2xl p-2">
              {catalog.spaces.map((s) => (
                <DropdownMenuItem key={s.id} asChild className="rounded-xl px-3 py-2.5">
                  <Link to="/coleccion/$slug" params={{ slug: s.slug }} className="flex flex-col items-start gap-0">
                    <span className="font-display text-lg leading-tight">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.tagline}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar productos"
            className="grid size-11 place-items-center rounded-full transition hover:bg-muted lg:size-auto lg:gap-2 lg:rounded-full lg:border lg:border-border lg:px-4 lg:py-2 lg:[display:inline-flex]"
          >
            <Search className="size-[1.15rem]" />
            <span className="hidden text-sm text-muted-foreground xl:inline">Buscar</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Abrir carrito, ${count} artículos`}
            className="relative grid size-11 place-items-center rounded-full transition hover:bg-muted"
          >
            <ShoppingBag className="size-[1.2rem]" />
            {count > 0 && (
              <span
                className={cn(
                  "absolute right-1 top-1 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold leading-5 text-primary-foreground transition-transform duration-300",
                  bump && "scale-125",
                )}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
