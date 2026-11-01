import { useState, type FormEvent } from "react";
import { MessageCircle, X, Calendar, User, Mail, Phone, MapPin, Sparkles } from "lucide-react";
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
      <DialogContent className="max-w-lg rounded-2xl bg-cream border-obsidian/10 p-6 text-obsidian sm:p-8">
        <DialogHeader className="text-left">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-champagne font-bold">YES I'AM · Diagnóstico VIP</span>
          </div>
          <DialogTitle className="font-display text-3xl font-semibold text-obsidian mt-1">
            Reserva tu Consultoría
          </DialogTitle>
          <DialogDescription className="text-xs text-obsidian/70">
            Diseñamos una experiencia de marca personalizada para proyectar tu máxima autoridad.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
              Programa / Servicio
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full rounded-xl border border-obsidian/20 bg-background px-4 py-3 text-sm font-medium focus:border-obsidian focus:outline-none"
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
                Nombre Completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 size-4 text-obsidian/40" />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-obsidian/20 bg-background pl-9 pr-3 py-2.5 text-sm focus:border-obsidian focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
                Teléfono / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 size-4 text-obsidian/40" />
                <input
                  type="tel"
                  required
                  placeholder="+52 614 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-obsidian/20 bg-background pl-9 pr-3 py-2.5 text-sm focus:border-obsidian focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 size-4 text-obsidian/40" />
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-obsidian/20 bg-background pl-9 pr-3 py-2.5 text-sm focus:border-obsidian focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
                Ciudad / Modalidad
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 size-4 text-obsidian/40" />
                <input
                  type="text"
                  placeholder="Chihuahua / En línea"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-obsidian/20 bg-background pl-9 pr-3 py-2.5 text-sm focus:border-obsidian focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
              Fecha Tentativa
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 size-4 text-obsidian/40" />
              <input
                type="text"
                placeholder="Ej. Próxima semana, Martes por la tarde..."
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-obsidian/20 bg-background pl-9 pr-3 py-2.5 text-sm focus:border-obsidian focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/80 mb-1">
              Objetivo de Imagen o Mensaje
            </label>
            <textarea
              rows={2}
              placeholder="Cuéntanos brevemente qué deseas lograr con tu marca personal..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-obsidian/20 bg-background p-3 text-sm focus:border-obsidian focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-obsidian text-cream py-3.5 px-6 text-sm font-semibold hover:bg-obsidian/90 transition-all shadow-md"
            >
              <Sparkles className="size-4 text-champagne" />
              Confirmar & Agendar
            </button>
            <a
              href={`https://wa.me/526141879067?text=Hola%20YES%20I'AM%2C%20quisiera%20agendar%20una%20sesi%C3%B3n%20directa%20de%20diagn%C3%B3stico`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-700 text-white py-3.5 px-5 text-sm font-semibold hover:bg-emerald-600 transition-all"
            >
              <MessageCircle className="size-4" />
              WhatsApp Directo
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
