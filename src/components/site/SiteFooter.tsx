import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useUI } from "@/store/ui-store";
import yesiamBrandLogo from "@/assets/yesiam/yesiam-brand-logo.jpeg";

export function SiteFooter() {
  const { openBookingModal } = useUI();

  return (
    <footer className="mt-auto bg-[#141414] text-[#F4F1EA] border-t border-black/20">
      <div className="mx-auto max-w-[1360px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Column 1: Brand & Atelier */}
          <div className="md:col-span-5">
            <img
              src={yesiamBrandLogo}
              alt="YES I'AM"
              className="h-14 sm:h-16 w-auto object-contain mb-5"
            />
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#A8A298]">
              Consultoría de Imagen & Marca Personal
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[#A8A298] font-light max-w-sm">
              Arquitectura de presencia, estilismo de negocios y posicionamiento de autoridad para directivos y líderes que valoran la sobriedad y el rigor técnico.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="bg-[#F4F1EA] text-[#141414] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                Agendar Consulta
              </button>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-5">
              SECCIONES
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-widest text-[#C8C2B8]">
              <li><a href="#que-incluye" className="hover:text-white transition-colors">Qué Incluye</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#sobre-mi" className="hover:text-white transition-colors">Sobre la Consultora</a></li>
              <li><a href="#cliente-ideal" className="hover:text-white transition-colors">Cliente Ideal</a></li>
              <li><a href="#inversion" className="hover:text-white transition-colors">Inversión</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Chihuahua Location */}
          <div className="md:col-span-4">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-5">
              ATELIER & CONTACTO
            </span>
            <ul className="space-y-3.5 text-xs text-[#C8C2B8]">
              <li>
                <a
                  href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp: +52 614 187 9067</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-3.5 text-[#A8A298]" />
                <a href="tel:+526141879067" className="hover:text-white transition-colors">+52 614 187 9067</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-3.5 text-[#A8A298]" />
                <a href="mailto:contacto@yesiam.mx" className="hover:text-white transition-colors">contacto@yesiam.mx</a>
              </li>
              <li className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <MapPin className="size-3.5 text-[#A8A298] mt-0.5 shrink-0" />
                <span className="text-[#A8A298] leading-relaxed">
                  Av. Cristóbal Colón #4105, Complejo Industrial Chihuahua, C.P. 31136, Chihuahua, Chih., México
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.68rem] text-[#7A756D] uppercase tracking-wider">
          <p>© 2026 YES I'AM. Todos los derechos reservados.</p>
          <p>Atelier Privado en Chihuahua · Asesorías Globales en Línea</p>
        </div>
      </div>
    </footer>
  );
}
