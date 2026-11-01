import { useState, type FormEvent } from "react";
import { MessageCircle, Calendar, User, Mail, Phone, MapPin, Check } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCatalog } from "@/store/catalog-store";
import { useUI } from "@/store/ui-store";

export function BookingModal() {
  const { catalog } = useCatalog();
  const { bookingOpen, setBookingOpen, selectedBookingService } = useUI();

  const [serviceId, setServiceId] = useState<string>(selectedBookingService || catalog.products[0]?.id || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Chihuahua, Chih.");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const activeService = catalog.products.find((p) => p.id === serviceId) || catalog.products[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Por favor ingresa tu nombre y teléfono de contacto");
      return;
    }

    const message = `Hola YES I'AM, me gustaría solicitar información y agendar mi sesión:\n\n` +
      `📌 *Servicio:* ${activeService?.name}\n` +
      `👤 *Nombre:* ${name}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `📧 *Email:* ${email || "No especificado"}\n` +
      `📍 *Ubicación:* ${city}\n` +
      `📅 *Fecha Tentativa:* ${date || "A convenir"}\n` +
      `💬 *Notas:* ${notes || "Ninguna"}`;

    const whatsappUrl = `https://wa.me/526141879067?text=${encodeURIComponent(message)}`;

    toast.success("¡Solicitud enviada con éxito! Te redirigiremos a WhatsApp para confirmar.");
    setBookingOpen(false);

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 400);
  };

  return (
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
      <DialogContent className="max-w-lg bg-[#F4F1EA] border border-[#DDD8CF] p-6 text-[#1A1A1A] sm:p-8 rounded-none">
        <DialogHeader className="text-left">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D]">
            YES I'AM · ATELIER PRIVADO
          </span>
          <DialogTitle className="font-display text-2xl sm:text-3xl font-light text-[#1A1A1A] uppercase tracking-wide mt-1">
            Reserva tu Consulta
          </DialogTitle>
          <DialogDescription className="text-xs text-[#5A554D] font-light">
            Estrategia de imagen y presencia ejecutiva diseñada con rigor técnico a tu medida.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
              Programa / Servicio
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full border border-[#DDD8CF] bg-[#EFECE6] px-3.5 py-2.5 text-xs font-medium focus:border-[#1A1A1A] focus:outline-none"
            >
              {catalog.products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price.toLocaleString("es-MX")} MXN
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
                Nombre Completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-3.5 text-[#7A756D]" />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#DDD8CF] bg-[#EFECE6] pl-8 pr-3 py-2 text-xs focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
                Teléfono / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 size-3.5 text-[#7A756D]" />
                <input
                  type="tel"
                  required
                  placeholder="+52 614 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#DDD8CF] bg-[#EFECE6] pl-8 pr-3 py-2 text-xs focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-3.5 text-[#7A756D]" />
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#DDD8CF] bg-[#EFECE6] pl-8 pr-3 py-2 text-xs focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
                Ciudad / Modalidad
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 size-3.5 text-[#7A756D]" />
                <input
                  type="text"
                  placeholder="Chihuahua / En línea"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-[#DDD8CF] bg-[#EFECE6] pl-8 pr-3 py-2 text-xs focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
              Fecha Tentativa
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 size-3.5 text-[#7A756D]" />
              <input
                type="text"
                placeholder="Ej. Próxima semana, Martes por la tarde..."
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-[#DDD8CF] bg-[#EFECE6] pl-8 pr-3 py-2 text-xs focus:border-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.68rem] font-semibold uppercase tracking-wider text-[#5A554D] mb-1">
              Objetivo de Imagen o Mensaje
            </label>
            <textarea
              rows={2}
              placeholder="Cuéntanos brevemente qué deseas proyectar o solucionar..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-[#DDD8CF] bg-[#EFECE6] p-2.5 text-xs focus:border-[#1A1A1A] focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] text-[#F4F1EA] py-3 px-5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#333333] transition-colors"
            >
              <Check className="size-3.5" />
              Confirmar & Agendar
            </button>
            <a
              href="https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20directa"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] py-3 px-4 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] transition-colors"
            >
              <MessageCircle className="size-3.5" />
              WhatsApp Directo
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
