import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import yesiamBrandLogo from "@/assets/yesiam/yesiam-brand-logo.jpeg";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="YES I'AM — Consultoría de Imagen y Marca Personal"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <img
        src={yesiamBrandLogo}
        alt="YES I'AM"
        className="h-8 sm:h-9 w-auto object-contain invert mix-blend-multiply"
      />
    </Link>
  );
}
