import { Link } from "@tanstack/react-router";
import { Clock, CreditCard, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import { useCatalog } from "@/store/catalog-store";

const GUARANTEES = [
  { icon: ShieldCheck, title: "Garantía de 5 años", text: "Estructura y ensambles cubiertos." },
  { icon: Truck, title: "Envío asegurado", text: "Entrega e instalación a domicilio." },
  { icon: CreditCard, title: "Pago seguro", text: "Hasta 12 meses sin intereses." },
  { icon: Wrench, title: "Servicio de por vida", text: "Mantenimiento y re-acabado." },
];

export function SiteFooter() {
  const { catalog } = useCatalog();
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Escribe un correo válido");
      return;
    }
    toast.success("¡Gracias! Te escribiremos con novedades del taller.");
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-ink text-ink-foreground">
      <div className="border-b border-ink-foreground/10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
          {GUARANTEES.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:gap-4 lg:py-10">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink-foreground/8 ring-1 ring-ink-foreground/15">
                <g.icon className="size-5 text-oak" />
              </span>
              <span>
                <span className="block font-display text-lg leading-tight">{g.title}</span>
                <span className="block text-xs text-ink-foreground/65">{g.text}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-display text-4xl font-semibold">
            Casa<span className="italic text-parota">·</span>Veta
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            Diseñamos y fabricamos mobiliario de madera maciza para hogares que valoran el oficio, la calidez y las piezas que duran
            generaciones.
          </p>
          <form onSubmit={subscribe} className="mt-8 max-w-sm">
            <label htmlFor="newsletter" className="eyebrow text-ink-foreground/60">
              Boletín del taller
            </label>
            <div className="mt-3 flex rounded-full bg-ink-foreground/8 p-1 ring-1 ring-ink-foreground/15 focus-within:ring-oak">
              <input
                id="newsletter"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="min-h-11 w-full bg-transparent px-4 text-base text-ink-foreground outline-none placeholder:text-ink-foreground/45 sm:text-sm"
              />
              <button type="submit" className="shrink-0 rounded-full bg-cream px-5 text-sm font-semibold text-foreground transition hover:bg-oak">
                Suscribirme
              </button>
            </div>
          </form>
        </div>

        <nav aria-label="Tienda" className="lg:col-span-2">
          <p className="eyebrow mb-4 text-ink-foreground/60">Tienda</p>
          <ul className="space-y-3 text-sm">
            {catalog.categories.map((c) => (
              <li key={c.id}>
                <Link to="/coleccion/$slug" params={{ slug: c.slug }} className="text-ink-foreground/80 transition hover:text-ink-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Espacios" className="lg:col-span-2">
          <p className="eyebrow mb-4 text-ink-foreground/60">Espacios</p>
          <ul className="space-y-3 text-sm">
            {catalog.spaces.map((s) => (
              <li key={s.id}>
                <Link to="/coleccion/$slug" params={{ slug: s.slug }} className="text-ink-foreground/80 transition hover:text-ink-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="eyebrow mb-4 text-ink-foreground/60">Contacto</p>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="https://wa.me/525500000000" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-oak">
                <MessageCircle className="size-4 text-oak" /> WhatsApp +52 55 0000 0000
              </a>
            </li>
            <li>
              <a href="tel:+525500000000" className="flex items-center gap-3 hover:text-oak">
                <Phone className="size-4 text-oak" /> 55 0000 0000
              </a>
            </li>
            <li>
              <a href="mailto:hola@casaveta.mx" className="flex items-center gap-3 hover:text-oak">
                <Mail className="size-4 text-oak" /> hola@casaveta.mx
              </a>
            </li>
            <li className="flex items-start gap-3 text-ink-foreground/80">
              <MapPin className="mt-0.5 size-4 shrink-0 text-oak" /> Showroom: Colonia Roma Norte, Ciudad de México
            </li>
            <li className="flex items-start gap-3 text-ink-foreground/80">
              <Clock className="mt-0.5 size-4 shrink-0 text-oak" /> Lunes a sábado · 10:00 – 19:00
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="pb-safe mx-auto flex max-w-[1440px] flex-col gap-3 px-4 pt-6 text-xs text-ink-foreground/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© 2026 Casa Veta. Hecho a mano en México.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Tarjetas · Transferencia · Mercado Pago · PayPal</span>
            <Link to="/gestion" className="underline-offset-4 hover:text-ink-foreground hover:underline">
              Gestión de catálogo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
