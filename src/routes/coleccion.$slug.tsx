import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { SEED_CATALOG } from "@/data/catalog";
import { resolveImage } from "@/data/images";
import { useCatalog } from "@/store/catalog-store";

function titleFor(slug: string) {
  if (slug === "todo") return "Catálogo completo";
  return (
    SEED_CATALOG.categories.find((c) => c.slug === slug)?.name ??
    SEED_CATALOG.spaces.find((s) => s.slug === slug)?.name ??
    slug.replace(/-/g, " ")
  );
}

export const Route = createFileRoute("/coleccion/$slug")({
  head: ({ params }) => {
    const title = titleFor(params.slug);
    const description = `Explora ${title.toLowerCase()} de NOGARA: piezas de corte CNC, diseño paramétrico, reconocimientos y soluciones a la medida.`;
    return {
      meta: [
        { title: `${title} — NOGARA` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — NOGARA` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const { catalog } = useCatalog();
  const category = catalog.categories.find((c) => c.slug === slug);
  const space = catalog.spaces.find((s) => s.slug === slug);

  const products =
    slug === "todo"
      ? catalog.products
      : category
        ? catalog.products.filter((p) => p.categoryId === category.id)
        : space
          ? catalog.products.filter((p) => p.spaceIds.includes(space.id))
          : [];

  const title = slug === "todo" ? "Catálogo completo" : (category?.name ?? space?.name ?? "Colección");
  const subtitle =
    slug === "todo"
      ? "Todas nuestras soluciones de corte CNC, diseño paramétrico y reconocimientos en un solo lugar."
      : (category?.description ?? space?.tagline ?? "Esta colección no está disponible por ahora.");
  const cover = space?.image ?? (products[0]?.image || "hero");

  return (
    <>
      <section className="px-2 sm:px-4 lg:px-6">
        <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-ink lg:rounded-[2.25rem]">
          <img src={resolveImage(cover)} alt="" className="animate-hero-zoom absolute inset-0 -z-10 size-full object-cover opacity-80" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
          <div className="mx-auto flex min-h-[42vh] max-w-[1440px] flex-col justify-end px-5 py-10 text-ink-foreground sm:px-10 lg:min-h-[48vh] lg:px-16 lg:py-14">
            <nav aria-label="Ruta" className="animate-fade-soft mb-4 flex items-center gap-1.5 text-xs text-ink-foreground/75">
              <Link to="/" className="hover:text-ink-foreground">
                Inicio
              </Link>
              <ChevronRight className="size-3" />
              <span>{title}</span>
            </nav>
            <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95]">
              <span className="line-mask">
                <span>{title}</span>
              </span>
            </h1>
            <p className="animate-fade-soft mt-4 max-w-lg text-ink-foreground/85" style={{ ["--line-delay" as string]: "300ms" }}>
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ slug: "todo", name: "Todo" }, ...catalog.categories, ...catalog.spaces].map((c) => (
            <Link
              key={c.slug}
              to="/coleccion/$slug"
              params={{ slug: c.slug }}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-muted-foreground transition hover:border-foreground/50 hover:text-foreground data-[status=active]:border-foreground data-[status=active]:bg-foreground data-[status=active]:text-background"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "pieza" : "piezas"}
        </p>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border py-20 text-center">
            <p className="font-display text-3xl">Aún no hay piezas aquí</p>
            <Link to="/coleccion/$slug" params={{ slug: "todo" }} className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
              Ver catálogo completo
            </Link>
          </div>
        ) : (
          <div key={slug} className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 90}>
                <ProductCard product={p} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
