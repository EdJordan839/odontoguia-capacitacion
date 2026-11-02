import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const FAQS = [
  {
    q: "¿En qué consiste la sesión de diagnóstico inicial?",
    a: "Es una sesión técnica de evaluación integral donde analizamos tu morfología, colorimetría, objetivos profesionales y estado actual de tu guardarropa para trazar tu plan de proyección ejecutiva personalizado.",
  },
  {
    q: "¿Las asesorías son presenciales o en línea?",
    a: "Ofrecemos ambas modalidades. Contamos con atención presencial en nuestro atelier privado en Chihuahua, Chih., y sesiones virtuales en directo por videollamada HD para clientes en México e internacionalmente.",
  },
  {
    q: "¿Tengo que renovar todo mi guardarropa?",
    a: "No. Nuestro enfoque es la optimización inteligente: depuramos lo que no te favorece, rescatamos las mejores piezas de tu armario y definimos compras estratégicas de alto impacto que maximicen tus combinaciones.",
  },
  {
    q: "¿Cómo se maneja la confidencialidad?",
    a: "Mantenemos absoluta discreción y acuerdos de privacidad (NDA) para todos nuestros clientes directivos, C-Level, empresarios y figuras públicas.",
  },
];

export function ShowitFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="scroll-mt-16 bg-[#F5F2EB] text-[#1A1A1A] py-16 sm:py-24 lg:py-32 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-3xl lg:max-w-4xl px-6 sm:px-10">
        <div className="text-center mb-12 lg:mb-16">
          <Reveal variant="up">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal leading-tight">
              Preguntas frecuentes
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base text-[#5A554D] font-normal">
              Respuestas a las dudas más comunes sobre la metodología y el proceso de asesoría.
            </p>
          </Reveal>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 50} variant="up">
                <div className="border border-[#D2CDC4] bg-[#E6E3DB] p-6 lg:p-7 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between text-left gap-4"
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#1A1A1A] font-normal">
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-[#1A1A1A]">
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-4 font-sans text-sm sm:text-base text-[#4A453D] leading-relaxed font-normal border-t border-[#D2CDC4] pt-4">
                      {faq.a}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
