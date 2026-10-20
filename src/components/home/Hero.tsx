import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import pRepisas from "@/assets/p-repisas.jpg";
import { useParallax } from "@/hooks/use-parallax";

const LINES = ["Precisión CNC,", "diseño y piezas", "a tu medida."];

export function Hero() {
  const ref = useParallax<HTMLDivElement>(0.22);

  return (
    <section aria-label="Presentación" className="px-2 pb-2 sm:px-4 lg:px-6">
      <div ref={ref} className="h-hero relative isolate flex overflow-hidden rounded-[1.5rem] bg-ink lg:rounded-[2.25rem]">
        <div
          className="absolute inset-x-0 -bottom-[8%] -top-[8%] -z-10 will-change-transform"
          style={{ transform: "translate3d(0, var(--parallax, 0px), 0)" }}
        >
          <img
            src={pRepisas}
            alt="Muro con repisa decorativa paramétrica y logo Nogara CNC"
            width={1920}
            height={1088}
            fetchPriority="high"
            className="animate-hero-zoom size-full object-cover object-center"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-hero-fade" />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-end px-5 pb-8 pt-24 text-ink-foreground sm:px-10 sm:pb-12 lg:px-16 lg:pb-16">
          <p className="animate-fade-soft eyebrow mb-5 text-oak" style={{ ["--line-delay" as string]: "200ms" }}>
            NOGARA · CNC · Diseño · Soluciones
          </p>
          <h1 className="max-w-4xl text-[clamp(2.75rem,8.5vw,7.25rem)] font-medium leading-[0.92]">
            {LINES.map((line, i) => (
              <span key={line} className="line-mask">
                <span style={{ ["--line-delay" as string]: `${300 + i * 140}ms` }} className={i === 2 ? "italic text-oak" : undefined}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="animate-fade-soft mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/85 sm:text-lg"
            style={{ ["--line-delay" as string]: "850ms" }}
          >
            Maquinado router y corte láser CNC, arquitectura paramétrica, placas de reconocimiento de prestigio y soluciones a la medida para proyectos comerciales y residenciales.
          </p>
          <div
            className="animate-fade-soft mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ["--line-delay" as string]: "1000ms" }}
          >
            <Link
              to="/coleccion/$slug"
              params={{ slug: "todo" }}
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-semibold text-foreground transition hover:bg-oak"
            >
              Explorar productos
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href="#pieza-insignia"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink-foreground/40 px-7 py-4 text-sm font-semibold backdrop-blur-sm transition hover:border-ink-foreground hover:bg-ink-foreground/10"
            >
              Ver repisa paramétrica
            </a>
          </div>

          <div
            className="animate-fade-soft mt-10 hidden items-end justify-between border-t border-ink-foreground/20 pt-6 md:flex"
            style={{ ["--line-delay" as string]: "1200ms" }}
          >
            <dl className="flex gap-12">
              {[
                ["100%", "Precisión CNC"],
                ["Láser & Router", "Tecnología aplicada"],
                ["Mayoreo", "Precios especiales"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-4xl leading-none">{n}</dd>
                  <dd className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-foreground/70">{l}</dd>
                </div>
              ))}
            </dl>
            <a href="#espacios" className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-foreground/80 hover:text-ink-foreground">
              Desliza
              <span className="grid size-10 place-items-center rounded-full border border-ink-foreground/40">
                <ArrowDown className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
