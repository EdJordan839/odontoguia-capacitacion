import { useEffect, useRef } from "react";

/**
 * Parallax ligero sólo con puntero fino (escritorio) y sin reduced-motion.
 * En pantallas táctiles no se aplica para no entorpecer el scroll nativo.
 * Escribe una variable CSS (--parallax) con el progreso en px vía rAF.
 */
export function useParallax<T extends HTMLElement>(speed = 0.25) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = -rect.top * speed;
      el.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
      el.style.setProperty("--parallax-progress", `${Math.min(1, Math.max(0, -rect.top / rect.height)).toFixed(3)}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
