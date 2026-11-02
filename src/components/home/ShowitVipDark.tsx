import { Reveal } from "@/components/motion/Reveal";
import esenciaManifesto from "@/assets/yesiam/esencia-manifesto.jpeg";
import { useUI } from "@/store/ui-store";

export function ShowitVipDark() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#141414] text-[#F5F2EB] py-20 lg:py-32 overflow-hidden border-b border-black">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[#9A958D] mb-3 block">
            FILOSOFÍA DE MARCA · YES I'AM
          </span>

          <h2 className="font-display text-[clamp(2.2rem,5vw,4.25rem)] font-light leading-[1] tracking-[0.08em] uppercase text-[#F5F2EB]">
            DIAGNÓSTICO VIP 360°
          </h2>

          <p className="mt-3 font-serif italic text-base sm:text-lg text-[#C8C2B8] max-w-xl mx-auto">
            Inmersión presencial o digital exclusiva de imagen ejecutiva, estilismo de negocios y presencia de alto nivel.
          </p>

          {/* Replacement Photo: Official ESENCIA Manifesto Artwork */}
          <div className="mt-12 mx-auto max-w-lg sm:max-w-xl flex justify-center">
            <div className="overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#F8F6F2]">
              <img
                src={esenciaManifesto}
                alt="ESENCIA — La esencia es el punto de partida de todo — YES I'AM"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="button"
              onClick={() => openBookingModal("imagen-ejecutiva")}
              className="bg-[#F5F2EB] text-[#141414] px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all hover:bg-white shadow-lg"
            >
              APLICAR AL PROGRAMA VIP
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
