import { Reveal } from "@/components/motion/Reveal";
import esenciaManifesto from "@/assets/yesiam/esencia-manifesto.jpeg";
import { useUI } from "@/store/ui-store";

export function ShowitVipDark() {
  const { openBookingModal } = useUI();

  return (
    <section className="relative bg-[#141414] text-[#F5F2EB] py-16 sm:py-24 border-b border-black">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F2EB] font-normal leading-tight">
            Diagnóstico VIP 360°
          </h2>

          <p className="mt-3 font-sans text-sm sm:text-base text-[#C8C2B8] max-w-xl mx-auto leading-relaxed font-normal">
            Inmersión presencial o digital de imagen ejecutiva, estilismo de negocios y presencia de alto nivel.
          </p>

          {/* Replacement Photo: Official ESENCIA Manifesto Artwork */}
          <div className="mt-10 mx-auto max-w-lg sm:max-w-xl flex justify-center">
            <div className="overflow-hidden border border-white/20 shadow-2xl bg-[#F8F6F2]">
              <img
                src={esenciaManifesto}
                alt="ESENCIA — La esencia es el punto de partida de todo — YES I'AM"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => openBookingModal("imagen-ejecutiva")}
              className="font-sans bg-[#F5F2EB] text-[#141414] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all hover:bg-white"
            >
              Aplicar al Programa VIP
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
