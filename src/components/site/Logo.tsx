import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import yesiamLogo from "@/assets/yesiam/logo.jpg";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="YES I'AM — Consultoría de Imagen y Marca Personal"
      className={cn("group inline-flex items-center gap-3 leading-none", className)}
    >
      <div className="relative size-10 overflow-hidden rounded-md border border-foreground/15 shadow-sm group-hover:scale-105 transition-transform duration-300">
        <img
          src={yesiamLogo}
          alt="YES I'AM Logo"
          width={40}
          height={40}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="font-display text-[1.5rem] font-semibold tracking-wider text-foreground">
          YES I'AM
        </span>
        <span className="mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Imagen & Marca Personal
        </span>
      </div>
    </Link>
  );
}
