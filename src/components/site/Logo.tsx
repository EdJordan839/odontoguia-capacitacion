import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Casa Veta — inicio"
      className={cn("group inline-flex flex-col items-center leading-none", className)}
    >
      <span className="font-display text-[1.65rem] font-semibold tracking-tight lg:text-[1.9rem]">
        Casa<span className="italic text-parota">·</span>Veta
      </span>
      <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-muted-foreground">
        Mobiliario de autor
      </span>
    </Link>
  );
}
