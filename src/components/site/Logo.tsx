import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import yesiamBrandLogo from "@/assets/yesiam/yesiam-brand-logo.jpeg";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  onClick?: () => void;
}

export function Logo({ className, variant = "dark", onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="YES I'AM — Consultoría de Imagen y Marca Personal"
      className={cn("group inline-flex items-center gap-2.5 leading-none transition-opacity hover:opacity-90", className)}
    >
      <div className="relative h-9 px-2 bg-black rounded flex items-center justify-center border border-white/20 shadow-xs shrink-0 overflow-hidden">
        <img
          src={yesiamBrandLogo}
          alt="YES I'AM"
          className="h-7 w-auto object-contain"
        />
      </div>
      <div className="flex flex-col text-left leading-none">
        <span
          className={cn(
            "font-display text-xl font-bold tracking-[0.14em]",
            variant === "light" ? "text-white" : "text-[#1A1A1A]",
          )}
        >
          YES I'AM
        </span>
        <span
          className={cn(
            "mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.25em]",
            variant === "light" ? "text-[#A8A298]" : "text-[#7A756D]",
          )}
        >
          IMAGEN & MARCA PERSONAL
        </span>
      </div>
    </Link>
  );
}
