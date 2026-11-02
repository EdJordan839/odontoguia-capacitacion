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
    <section className="bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 text-center">
        <Reveal variant="up">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal leading-tight">
            Una imagen que refuerza tu marca
          </h2>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#4A453D] leading-relaxed font-normal max-w-xl mx-auto">
            Capta la atención de tu industria y comunica autoridad antes de hablar.
          </p>

          <div className="mt-10 lg:mt-12 text-left space-y-3.5 sm:space-y-4 max-w-xl mx-auto">
            {BULLETS.map((item, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <Check className="size-4 text-[#1A1A1A] shrink-0 mt-0.5 stroke-[1.75]" />
                <p className="font-sans text-sm sm:text-base text-[#3A352D] font-normal leading-relaxed">
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
