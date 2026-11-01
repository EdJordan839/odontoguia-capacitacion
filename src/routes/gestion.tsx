import { createFileRoute } from "@tanstack/react-router";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Product, Space, WoodId } from "@/data/catalog";
import { IMAGE_KEYS, resolveImage } from "@/data/images";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/SiteHeader";
import { useCatalog } from "@/store/catalog-store";

export const Route = createFileRoute("/gestion")({
  head: () => ({
    meta: [
      { title: "Gestión de catálogo — Casa Veta" },
      { name: "description", content: "Edita productos, precios y espacios de la tienda Casa Veta." },
      { property: "og:title", content: "Gestión de catálogo — Casa Veta" },
      { property: "og:description", content: "Panel local para editar productos y espacios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GestionPage,
});

const field =
  "min-h-10 w-full rounded-lg border border-input bg-background px-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25 sm:text-sm";

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const isKey = (IMAGE_KEYS as string[]).includes(value);
  return (
    <div className="flex items-center gap-2">
      <img src={resolveImage(value)} alt="" className="size-12 shrink-0 rounded-lg bg-sand object-cover" />
      <div className="grid w-full gap-1">
        <select className={field} value={isKey ? value : "__url"} onChange={(e) => e.target.value !== "__url" && onChange(e.target.value)}>
          {IMAGE_KEYS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
          <option value="__url">URL personalizada…</option>
        </select>
        {!isKey && <input className={field} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://…" />}
      </div>
    </div>
  );
}

function GestionPage() {
  const { catalog, updateProduct, addProduct, removeProduct, updateSpace, addSpace, removeSpace, setFeaturedProductId, resetCatalog } =
    useCatalog();

  const newProduct = () => {
    const n = catalog.products.length + 1;
    const p: Product = {
      id: `producto-${Date.now()}`,
      slug: `producto-${n}`,
      name: `Nueva pieza ${n}`,
      categoryId: catalog.categories[0]?.id ?? "",
      spaceIds: [],
      price: 1000,
      image: "p-repisas",
      woods: ["standard"],
      description: "Descripción de la pieza.",
      leadTime: "Fabricación en 3-5 días",
    };
    addProduct(p);
    toast.success("Producto agregado");
  };

  const newSpace = () => {
    const s: Space = {
      id: `espacio-${Date.now()}`,
      slug: `espacio-${catalog.spaces.length + 1}`,
      name: "Nuevo espacio",
      tagline: "Descripción breve",
      image: "space-sala",
    };
    addSpace(s);
    toast.success("Espacio agregado");
  };

  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-parota">Panel local</p>
          <h1 className="mt-2 text-5xl font-medium">Gestión de catálogo</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Los cambios se guardan en este navegador y se reflejan al instante en la tienda.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetCatalog();
            toast("Catálogo restablecido");
          }}
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-border px-5 text-sm font-semibold transition hover:border-foreground"
        >
          <RotateCcw className="size-4" /> Restablecer catálogo
        </button>
      </div>

      <section className="mb-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-medium">Productos ({catalog.products.length})</h2>
          <button
            type="button"
            onClick={newProduct}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="size-4" /> Agregar
          </button>
        </div>
        <div className="grid gap-4">
          {catalog.products.map((p) => (
            <div key={p.id} className="grid gap-4 rounded-2xl border border-border bg-card p-4 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-3">
                <ImagePicker value={p.image} onChange={(image) => updateProduct(p.id, { image })} />
              </div>
              <label className="grid gap-1 text-xs font-medium text-muted-foreground lg:col-span-3">
                Nombre
                <input
                  className={field}
                  value={p.name}
                  onChange={(e) => updateProduct(p.id, { name: e.target.value, slug: slugify(e.target.value) })}
                />
              </label>
              <label className="grid gap-1 text-xs font-medium text-muted-foreground lg:col-span-2">
                Categoría
                <select className={field} value={p.categoryId} onChange={(e) => updateProduct(p.id, { categoryId: e.target.value })}>
                  {catalog.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs font-medium text-muted-foreground lg:col-span-1">
                Precio
                <input
                  className={field}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={p.price}
                  onChange={(e) => updateProduct(p.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                />
              </label>
              <label className="grid gap-1 text-xs font-medium text-muted-foreground lg:col-span-2">
                Etiqueta
                <input className={field} value={p.badge ?? ""} onChange={(e) => updateProduct(p.id, { badge: e.target.value || undefined })} />
              </label>
              <div className="flex items-end justify-end gap-2 lg:col-span-1">
                <button
                  type="button"
                  onClick={() => removeProduct(p.id)}
                  aria-label={`Eliminar ${p.name}`}
                  className="grid size-10 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-3 text-xs lg:col-span-12">
                <span className="font-medium text-muted-foreground">Maderas:</span>
                {catalog.woods.map((w) => {
                  const on = p.woods.includes(w.id);
                  return (
                    <label key={w.id} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          updateProduct(p.id, {
                            woods: on ? p.woods.filter((x) => x !== w.id) : ([...p.woods, w.id] as WoodId[]),
                          })
                        }
                        className="size-4 accent-[var(--olive)]"
                      />
                      {w.name}
                    </label>
                  );
                })}
                <span className="ml-0 font-medium text-muted-foreground sm:ml-4">Espacios:</span>
                {catalog.spaces.map((s) => {
                  const on = p.spaceIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        updateProduct(p.id, { spaceIds: on ? p.spaceIds.filter((x) => x !== s.id) : [...p.spaceIds, s.id] })
                      }
                      className={cn(
                        "min-h-8 rounded-full border px-3 transition",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/50",
                      )}
                    >
                      {s.name}
                    </button>
                  );
                })}
                <label className="inline-flex items-center gap-2 sm:ml-auto">
                  <input
                    type="radio"
                    name="featured"
                    checked={catalog.featuredProductId === p.id}
                    onChange={() => setFeaturedProductId(p.id)}
                    className="size-4 accent-[var(--olive)]"
                  />
                  Pieza destacada
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-medium">Espacios ({catalog.spaces.length})</h2>
          <button
            type="button"
            onClick={newSpace}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="size-4" /> Agregar
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {catalog.spaces.map((s) => (
            <div key={s.id} className="grid gap-3 rounded-2xl border border-border bg-card p-4">
              <ImagePicker value={s.image} onChange={(image) => updateSpace(s.id, { image })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1 text-xs font-medium text-muted-foreground">
                  Nombre
                  <input
                    className={field}
                    value={s.name}
                    onChange={(e) => updateSpace(s.id, { name: e.target.value, slug: slugify(e.target.value) || s.slug })}
                  />
                </label>
                <label className="grid gap-1 text-xs font-medium text-muted-foreground">
                  Frase
                  <input className={field} value={s.tagline} onChange={(e) => updateSpace(s.id, { tagline: e.target.value })} />
                </label>
              </div>
              <button
                type="button"
                onClick={() => removeSpace(s.id)}
                className="inline-flex items-center gap-2 justify-self-end rounded-full px-3 py-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-3.5" /> Eliminar espacio
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
