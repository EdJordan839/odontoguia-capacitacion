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
        className="flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-xl hover:bg-emerald-500 active:scale-95 transition-all duration-300 hover:shadow-emerald-600/30 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-100" />
          </span>
          <MessageCircle className="size-5 fill-current" />
        </div>
        <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
          Agendar por WhatsApp
        </span>
      </a>
    </aside>
  );
}
