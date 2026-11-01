import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "zoom" | "clip";

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
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  return sharedObserver;
}

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

  const variantClass =
    variant === "clip"
      ? "reveal-clip relative"
      : variant === "left"
      ? "reveal-left"
      : variant === "right"
      ? "reveal-right"
      : variant === "zoom"
      ? "reveal-zoom"
      : "reveal";

  return (
    <Tag
      ref={ref}
      className={cn(variantClass, className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {variant === "clip" ? (
        <div className="reveal-clip-inner absolute inset-0">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}
