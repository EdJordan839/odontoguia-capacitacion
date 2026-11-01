import { Reveal } from "@/components/motion/Reveal";
import heroConsultant from "@/assets/yesiam/hero-consultant.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitVipDark() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#141414] text-[#F4F1EA] py-24 lg:py-36 overflow-hidden">
      {/* Background Editorial Glow & Consultant Image */}
      <div className="absolute inset-0 z-0 opacity-25 flex items-center justify-center pointer-events-none">
        <img
          src={heroConsultant}
          alt=""
          className="size-full object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-[#141414]/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[#A8A298] mb-4 block">
            INTRODUCING · SERVICIO INSIGNIA
          </span>

          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-wider uppercase text-[#F4F1EA]">
            VIP Days Package
          </h2>

          <p className="mt-3 font-display italic text-lg sm:text-xl text-[#C8C2B8]">
            Programa Intensivo de Imagen Ejecutiva 360°
          </p>

          <p className="mt-6 max-w-xl mx-auto text-sm leading-relaxed text-[#A8A298] font-light">
            Una inmersión técnica de alto nivel diseñada para reestructurar integralmente tu proyección corporativa, código de vestimenta y presencia ante medios e inversionistas.
          </p>

          {/* Minimalist Lookbook Frame */}
          <div className="mt-12 mx-auto max-w-md aspect-[16/10] bg-[#1E1E1E] border border-white/10 p-3 shadow-2xl relative overflow-hidden">
            <img
              src={heroConsultant}
              alt="Consultora con laptop"
              className="size-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-left">
              <span className="text-[0.6rem] uppercase tracking-widest text-white/70 block">ATELIER PRIVADO</span>
              <span className="font-display text-lg text-white">Sesión Presencial o Virtual HD</span>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => openBookingModal("imagen-ejecutiva")}
              className="bg-[#F4F1EA] text-[#141414] px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-white shadow-lg"
            >
              Aplicar al Programa VIP
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
