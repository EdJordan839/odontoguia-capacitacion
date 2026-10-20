import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "clip";

interface RevealProps {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return sharedObserver;
}

/**
 * Revela su contenido al entrar en pantalla. Usa un único IntersectionObserver
 * (sin listeners de scroll) para no interferir con el desplazamiento táctil.
 * Con prefers-reduced-motion el CSS deja todo visible y estático.
 * Variante "clip": los hijos deben posicionarse en absoluto (llenan el marco).
 */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className, style, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(variant === "clip" ? "reveal-clip relative" : "reveal", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {variant === "clip" ? (
        // El recorte se aplica a una capa interna: el elemento observado no
        // se recorta, así IntersectionObserver puede detectarlo.
        <div className="reveal-clip-inner absolute inset-0">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
