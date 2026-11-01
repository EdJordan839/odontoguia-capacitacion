import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, UserCheck, Video } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion/Reveal";
import yesiamLogo from "@/assets/yesiam/logo.jpg";
import { useUI } from "@/store/ui-store";

const GUARANTEES = [
  { icon: ShieldCheck, title: "Confidencialidad Absoluta", text: "Acuerdos de confidencialidad y trato VIP." },
  { icon: UserCheck, title: "Mentoría 1 a 1 Personalizada", text: "Acompañamiento directo sin plantillas genéricas." },
  { icon: Video, title: "Sesiones Presenciales & Online", text: "Atención en Chihuahua y vía HD global." },
  { icon: Sparkles, title: "Resultados de Estatus", text: "Posicionamiento visual y comunicación de alto nivel." },
];

export function SiteFooter() {
  const { openBookingModal } = useUI();
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Por favor escribe un correo válido");
      return;
    }
    toast.success("¡Gracias por suscribirte a nuestro boletín VIP de Marca Personal!");
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-obsidian text-cream border-t border-cream/10">
      {/* Guarantees Header Bar */}
      <div className="border-b border-cream/10 bg-obsidian/90">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
          {GUARANTEES.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:gap-4 lg:py-10">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream/5 ring-1 ring-cream/20">
                <g.icon className="size-5 text-champagne" />
              </span>
              <span>
                <span className="block font-display text-lg font-medium leading-tight text-cream">{g.title}</span>
                <span className="block text-xs text-cream/65 mt-0.5">{g.text}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-20">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <img src={yesiamLogo} alt="YES I'AM Logo" className="size-12 rounded-lg object-cover ring-1 ring-cream/20" />
            <div>
              <p className="font-display text-3xl font-bold tracking-wider leading-none text-cream">YES I'AM</p>
              <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-cream/70">
                Imagen & Marca Personal
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70 font-light">
            Consultoría estratégica de imagen pública, personal branding, estilismo de negocios, oratoria y producción editorial para líderes, ejecutivos y emprendedores de alto nivel.
          </p>
          <form onSubmit={subscribe} className="mt-8 max-w-sm">
            <label htmlFor="newsletter" className="eyebrow text-cream/60">
              Boletín & Contenido de Autoridad
            </label>
            <div className="mt-3 flex rounded-none bg-cream/5 p-1 ring-1 ring-cream/20 focus-within:ring-champagne">
              <input
                id="newsletter"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="min-h-11 w-full bg-transparent px-4 text-sm text-cream outline-none placeholder:text-cream/40"
              />
              <button
                type="submit"
                className="shrink-0 bg-cream px-5 text-xs font-semibold uppercase tracking-wider text-obsidian transition hover:bg-champagne"
              >
                Suscribir
              </button>
            </div>
          </form>
        </div>

        <nav aria-label="Navegación del sitio" className="lg:col-span-2">
          <p className="eyebrow mb-4 text-cream/60">Secciones</p>
          <ul className="space-y-3 text-xs uppercase tracking-widest">
            {["Inicio", "Metodología", "Transformación", "Servicios", "Sobre Mí"].map((link) => (
              <li key={link}>
                <a
                  href={`/#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-cream/80 transition hover:text-champagne"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="eyebrow mb-4 text-cream/60">Programas VIP</p>
          <ul className="space-y-3 text-xs text-cream/80">
            <li className="hover:text-champagne transition-colors">Mentoría Executive 360°</li>
            <li className="hover:text-champagne transition-colors">Imagen & Fondo de Armario</li>
            <li className="hover:text-champagne transition-colors">Mastery en Oratoria</li>
            <li className="hover:text-champagne transition-colors">Producción Fotográfica Editorial</li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="eyebrow mb-4 text-cream/60">Contacto & Citas en Chihuahua</p>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20de%20diagn%C3%B3stico"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="size-4 shrink-0 text-emerald-400" /> WhatsApp: +52 614 187 9067
              </a>
            </li>
            <li>
              <a href="tel:+526141879067" className="flex items-center gap-3 hover:text-champagne transition-colors">
                <Phone className="size-4 shrink-0 text-champagne" /> +52 614 187 9067
              </a>
            </li>
            <li>
              <a href="mailto:contacto@yesiam.mx" className="flex items-center gap-3 hover:text-champagne transition-colors">
                <Mail className="size-4 shrink-0 text-champagne" /> contacto@yesiam.mx
              </a>
            </li>
            <li className="flex items-start gap-3 text-cream/80">
              <MapPin className="mt-0.5 size-4 shrink-0 text-champagne" />
              <span>
                <strong className="block text-cream font-semibold">Estudio de Imagen YES I'AM:</strong>
                Av. Cristóbal Colón #4105, Complejo Industrial Chihuahua, C.P. 31136, Chihuahua, Chih., México
              </span>
            </li>
            <li className="flex items-start gap-3 text-cream/80">
              <Clock className="mt-0.5 size-4 shrink-0 text-champagne" /> Lunes a Sábado · Atenciones con previa cita
            </li>
          </ul>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="w-full py-3 border border-cream/30 text-xs uppercase tracking-[0.25em] font-semibold text-cream hover:bg-cream hover:text-obsidian transition-all"
            >
              Agendar Diagnóstico en Línea
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="pb-safe mx-auto flex max-w-[1440px] flex-col gap-3 px-4 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© 2026 YES I'AM. Consultoría de Imagen & Marca Personal. Todos los derechos reservados.</p>
          <p>Chihuahua, Chih., México · Asesorías Globales en Línea</p>
        </div>
      </div>
    </footer>
  );
}
