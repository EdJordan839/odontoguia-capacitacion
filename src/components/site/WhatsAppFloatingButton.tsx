import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  const whatsappUrl =
    "https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20de%20diagn%C3%B3stico";

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp al +52 614 187 9067"
        className="flex items-center gap-2.5 rounded-full bg-[#1A1A1A] px-5 py-3 text-[#F4F1EA] border border-[#DDD8CF]/40 shadow-lg hover:bg-[#333333] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
      >
        <MessageCircle className="size-4 text-[#F4F1EA]" />
        <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase hidden sm:inline-block">
          WhatsApp Directo
        </span>
      </a>
    </aside>
  );
}
