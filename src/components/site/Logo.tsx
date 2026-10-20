import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import nogaraLogo from "@/assets/nogara-logo.png";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="NOGARA — CNC · Diseño · Soluciones"
      className={cn("group inline-flex items-center gap-2.5 leading-none", className)}
    >
      <img
        src={nogaraLogo}
        alt="NOGARA Logotipo"
        width={40}
        height={40}
        className="size-9 sm:size-10 rounded-lg object-cover ring-1 ring-border shadow-xs transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="font-display text-[1.45rem] font-bold tracking-wider lg:text-[1.65rem] text-foreground">
          NOGARA
        </span>
        <span className="mt-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          CNC · Diseño · Soluciones
        </span>
      </span>
    </Link>
  );
}
