import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ANNOUNCEMENTS = [
  "NOGARA · CNC · Diseño · Soluciones a tu medida",
  "Fabricación en corte láser y router CNC con precisión milimétrica",
  "Precios especiales de mayoreo en reconocimientos y piezas personalizadas",
  "Envíos y entregas seguras a toda la República Mexicana",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (dir: number) => setIndex((i) => (i + dir + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);

  return (
    <div
      className="relative z-50 h-[var(--announce-h)] bg-ink text-ink-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-2 px-2 sm:px-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anuncio anterior"
          className="grid size-8 shrink-0 place-items-center rounded-full opacity-70 transition hover:bg-ink-foreground/10 hover:opacity-100"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="relative h-full flex-1 overflow-hidden" aria-live="polite">
          {ANNOUNCEMENTS.map((text, i) => (
            <p
              key={text}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 flex items-center justify-center truncate px-2 text-center text-[0.72rem] font-medium tracking-wide transition-all duration-700 sm:text-xs",
                i === index ? "translate-y-0 opacity-100" : i < index ? "-translate-y-full opacity-0" : "translate-y-full opacity-0",
              )}
            >
              <span className="truncate">{text}</span>
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente anuncio"
          className="grid size-8 shrink-0 place-items-center rounded-full opacity-70 transition hover:bg-ink-foreground/10 hover:opacity-100"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
