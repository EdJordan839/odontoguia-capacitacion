import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import yesiamBrandLogo from "@/assets/yesiam/yesiam-brand-logo.jpeg";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="YES I'AM — Consultoría de Imagen y Marca Personal"
      className={cn("inline-flex items-center leading-none transition-opacity hover:opacity-90", className)}
    >
      <div className="relative h-10 px-2.5 bg-black rounded flex items-center justify-center border border-white/20 shadow-xs shrink-0 overflow-hidden">
        <img
          src={yesiamBrandLogo}
          alt="YES I'AM"
          className="h-8 w-auto object-contain"
        />
      </div>
    </Link>
  );
}
