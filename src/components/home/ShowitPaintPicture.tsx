import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const BULLETS = [
  "Identidad visual y código de vestimenta alineados al nivel de tu liderazgo ejecutivo.",
  "Un fondo de armario inteligente y curado que elimina la fatiga de decisión diaria.",
  "Dominio de la comunicación no verbal, postura y proyección escénica ante inversionistas y juntas.",
  "Coherencia absoluta entre tu visión profesional y la percepción que el mercado tiene de ti.",
  "Reconocimiento instantáneo de estatus, autoridad y elegancia en cualquier entorno de negocios.",
];

export function ShowitPaintPicture() {
  return (
    <section id="que-incluye" className="scroll-mt-20 bg-[#EFECE6] text-[#1A1A1A] py-20 lg:py-28 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <span className="font-display italic text-lg sm:text-xl text-[#6B655D] block mb-3">
            Imagina esto...
          </span>

          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-light leading-[1.08] text-[#1A1A1A] uppercase tracking-wide">
            Una presencia que impacta antes de pronunciar una sola palabra.
          </h2>

          <div className="mt-12 text-left max-w-xl mx-auto space-y-4">
            {BULLETS.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <Check className="size-4 text-[#1A1A1A] shrink-0 mt-1 stroke-[1.75]" />
                <p className="text-sm leading-relaxed text-[#4A453D] font-light">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#7A756D] block">
              METODOLOGÍA SOBRIA · RESULTADOS COMPROBADOS
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
