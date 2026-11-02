import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const BULLETS = [
  "Identidad visual y código de vestimenta alineados al nivel de tu liderazgo ejecutivo.",
  "Un fondo de armario inteligente y curado que elimina la indecisión y la fatiga matutina.",
  "Dominio de la comunicación no verbal, postura y presencia escénica ante juntas e inversionistas.",
  "Coherencia absoluta entre tu visión profesional y la percepción que el mercado tiene de ti.",
];

export function ShowitPaintPicture() {
  return (
    <section className="bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-2xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block mb-3">
            IMAGINA ESTO...
          </span>

          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.08] tracking-[0.04em] text-[#1A1A1A] uppercase">
            UNA IMAGEN QUE REFUERZA TU MARCA.
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-[#2A251D] font-normal leading-tight mt-2">
            Capta la atención de tu industria y comunica autoridad antes de hablar
          </p>

          <div className="mt-10 text-left space-y-3.5 max-w-lg mx-auto">
            {BULLETS.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[1.75]" />
                <p className="font-sans text-xs sm:text-sm text-[#3A352D] font-normal leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
