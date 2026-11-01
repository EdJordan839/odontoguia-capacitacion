import { Reveal } from "@/components/motion/Reveal";
import heroConsultant from "@/assets/yesiam/hero-consultant.jpg";
import consultantPortrait from "@/assets/yesiam/consultant-portrait.jpg";
import { useUI } from "@/store/ui-store";

export function ShowitVipDark() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#141414] text-[#F5F2EB] pt-20 sm:pt-24 pb-16 sm:pb-24 overflow-hidden border-b border-black">
      {/* Background Subtle Studio photo */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
        <img
          src={consultantPortrait}
          alt=""
          className="size-full object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-[#141414]/90 to-[#141414]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[#9A958D] mb-3 block">
            PROGRAMA INSIGNIA
          </span>

          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1] tracking-[0.12em] uppercase text-[#F5F2EB]">
            DIAGNÓSTICO VIP 360°
          </h2>

          <p className="mt-3 font-serif italic text-base sm:text-lg text-[#C8C2B8] max-w-md mx-auto">
            Inmersión presencial o digital exclusiva de imagen ejecutiva, estilismo de negocios y presencia pública.
          </p>

          {/* Open Laptop Frame with Consultant Photo Inside Screen */}
          <div className="mt-12 mx-auto max-w-lg relative">
            {/* Laptop Body Shell */}
            <div className="bg-[#262626] rounded-t-xl p-3 sm:p-4 border-t border-l border-r border-[#404040] shadow-2xl">
              {/* Laptop Screen Display */}
              <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden rounded-sm border border-black/40">
                <img
                  src={heroConsultant}
                  alt="Sesión de Consultoría de Imagen Ejecutiva en Laptop"
                  className="size-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            {/* Laptop Bottom Base & Hinge */}
            <div className="h-3 sm:h-3.5 bg-[#383838] rounded-b-md border-b-2 border-[#1F1F1F] flex items-center justify-center shadow-lg">
              <div className="w-16 h-1 bg-[#202020] rounded-full" />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => openBookingModal("imagen-ejecutiva")}
              className="bg-[#F5F2EB] text-[#141414] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-white shadow-lg"
            >
              APLICAR AL PROGRAMA VIP
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
