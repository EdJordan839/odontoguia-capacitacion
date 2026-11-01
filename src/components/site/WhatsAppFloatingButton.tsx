import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  const whatsappUrl =
    "https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20de%20diagn%C3%B3stico";

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="fixed bottom-6 right-5 z-40 flex items-center group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp al +52 614 187 9067"
        className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#E8D3B2] to-[#B39366] px-5 py-3.5 text-obsidian border border-[#FFF5E1]/60 shadow-[0_12px_28px_-6px_rgba(197,168,128,0.65),0_6px_12px_-4px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-6px_rgba(197,168,128,0.8),0_8px_16px_-4px_rgba(0,0,0,0.4)] active:translate-y-0.5 active:shadow-[0_6px_16px_-4px_rgba(197,168,128,0.5)] focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-100" />
          </span>
          <MessageCircle className="size-5 fill-obsidian text-obsidian" />
        </div>
        <span className="text-xs font-bold tracking-wider uppercase hidden sm:inline-block text-obsidian drop-shadow-sm">
          Agendar por WhatsApp
        </span>
      </a>
    </aside>
  );
}
