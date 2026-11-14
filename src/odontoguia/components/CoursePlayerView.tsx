import React, { useState } from 'react';
import {
  Check,
  PanelLeft,
  FileText,
  ZoomOut,
  ZoomIn,
  Hand,
  Maximize2,
  Search,
  Settings,
  ExternalLink,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';
import { DentalProcedure } from '../data/procedures';

interface CoursePlayerViewProps {
  procedure: DentalProcedure;
  isSelectedForNewHires: boolean;
  isCourseCompleted: boolean;
  onBack: () => void;
  onToggleSelectForNewHires: (id: string) => void;
  onMarkCourseCompleted: (id: string) => void;
}

interface LessonItem {
  id: string;
  kind: 'Video' | 'Guía' | 'Módulo' | 'Documento';
  label: string;
  section?: string;
  instruction: string;
  bullets?: string[];
  keyCheck?: string;
  videoUrl?: string;
  isCover?: boolean;
  isGoldenRules?: boolean;
}

export const CoursePlayerView: React.FC<CoursePlayerViewProps> = ({
  procedure,
  isSelectedForNewHires,
  isCourseCompleted,
  onBack,
  onToggleSelectForNewHires,
  onMarkCourseCompleted,
}) => {
  const lessons: LessonItem[] = [
    ...(procedure.videoUrl
      ? [
          {
            id: `${procedure.id}-video-principal`,
            kind: 'Video' as const,
            label: 'Video 1: Demostración de cambio de tóner (Brother DCP-L2540DW)',
            section: 'Video Capacitación Presencial',
            instruction:
              'Reproduce el video para ver cómo apagar el equipo Brother DCP-L2540DW, extraer la bandeja completa, liberar el cartucho usado desde la pestañita verde e instalar el reemplazo TN-660 quitando el protector naranja.',
            bullets: [
              '1. Equipo apagado (Brother DCP-L2540DW): Levantar la tapa superior y abrir la tapita frontal.',
              '2. Extraer toda la bandeja: Sujetar del centro y jalar hacia atrás/afuera para sacar la unidad de tambor (DR-630) con el tóner y apoyarla en una mesa plana.',
              '3. Botar el tóner usado: Presionar la pestañita/botoncito verde del lado izquierdo de la bandeja para liberar y retirar el cartucho agotado.',
              '4. Quitar plástico naranja del tóner nuevo: Sacar el reemplazo TN-660 de su bolsa y quitarle el protector naranja de donde se sujeta en la bandeja.',
              '5. Colocar hasta que truene y limpiar: Poner el tóner nuevo parejo en las pestañitas blancas, presionar hacia abajo hasta que truene (clic), limpiar el polvo exterior con un poquito de alcohol y volver a meter la bandeja.',
            ],
            keyCheck:
              'Tóner nuevo presionado hasta que truene en el seguro verde y polvo exterior limpiado con un poco de alcohol.',
            videoUrl: procedure.videoUrl,
          },
        ]
      : []),
    {
      id: `${procedure.id}-portada`,
      kind: 'Documento',
      label: 'Presentación y Filosofía del Módulo',
      instruction: procedure.philosophy || procedure.summary,
      bullets: procedure.toolsRequired.map((t) => `Requisito / Herramienta: ${t}`),
      keyCheck: `Ubicación / Sistema: ${procedure.locationOrSystem}`,
      isCover: true,
    },
    ...procedure.steps.map((s) => ({
      id: s.id,
      kind: (s.section ? 'Módulo' : 'Guía') as 'Módulo' | 'Guía',
      label: s.title,
      section: s.section,
      instruction: s.instruction,
      bullets: s.bullets,
      keyCheck: s.keyCheck,
    })),
    ...(procedure.goldenRules && procedure.goldenRules.length > 0
      ? [
          {
            id: `${procedure.id}-reglas-oro`,
            kind: 'Documento' as const,
            label: 'Guía de estudio: 3 Reglas de Oro',
            instruction:
              'Resumen esencial que todo el personal de la clínica debe aplicar en cada consulta:',
            bullets: procedure.goldenRules.map((r) => `${r.title}: ${r.description}`),
            keyCheck: 'Autoguardado, valores predeterminados e impresión en 1 clic en tamaño Carta.',
            isGoldenRules: true,
          },
        ]
      : []),
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewedIds, setViewedIds] = useState<Record<string, boolean>>(() => ({
    [lessons[0].id]: true,
  }));
  const [zoom, setZoom] = useState<number>(100);
  const [commentText, setCommentText] = useState<string>('');
  const [savedComments, setSavedComments] = useState<string[]>([]);

  const currentLesson = lessons[activeIndex] || lessons[0];

  const selectLesson = (idx: number) => {
    const target = lessons[idx];
    if (!target) return;
    setActiveIndex(idx);
    setViewedIds((prev) => ({ ...prev, [target.id]: true }));
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      selectLesson(activeIndex - 1);
    }
  };

  const handleFinishCourse = () => {
    const allViewed = Object.fromEntries(lessons.map((l) => [l.id, true]));
    setViewedIds(allViewed);
    onMarkCourseCompleted(procedure.id);
    onBack();
  };

  const handleNext = () => {
    if (activeIndex < lessons.length - 1) {
      selectLesson(activeIndex + 1);
    } else {
      handleFinishCourse();
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSavedComments((prev) => [...prev, commentText.trim()]);
    setCommentText('');
  };

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-row items-stretch bg-[#EEF4F3] text-[#1E293B] overflow-x-auto">
      {/* LEFT SIDEBAR: Always left column side-by-side with right viewer */}
      <aside className="w-[300px] sm:w-[320px] shrink-0 bg-[#F7FAFA] border-r border-[#D5E3E0] flex flex-col justify-between">
        <div>
          {/* Top Block Header */}
          <div className="px-6 pt-6 pb-4 space-y-3 border-b border-[#E2ECE9]">
            <h2 className="text-xs font-extrabold tracking-wide text-[#0F172A] uppercase">
              BLOQUE I: {procedure.title}
            </h2>

            {/* Checkbox to include/exclude this course for new hires */}
            <label
              onClick={() => onToggleSelectForNewHires(procedure.id)}
              className="pt-1 flex items-center gap-2 text-xs font-semibold cursor-pointer select-none"
            >
              <span
                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                  isSelectedForNewHires
                    ? 'bg-[#0D9488] border-[#0D9488] text-white'
                    : 'bg-white border-slate-300'
                }`}
              >
                {isSelectedForNewHires && <Check className="w-3 h-3 stroke-[3]" />}
              </span>
              <span className={isSelectedForNewHires ? 'text-[#0F766E]' : 'text-slate-500'}>
                Escogido para nuevos ingresos
              </span>
            </label>
          </div>

          {/* Lesson Items List */}
          <div className="py-2 space-y-0.5">
            {lessons.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isViewed = !!viewedIds[item.id] || isCourseCompleted;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectLesson(idx)}
                  className={`w-full text-left px-6 py-3.5 flex items-start gap-3.5 transition-colors ${
                    isActive
                      ? 'bg-[#DDF0EC] text-[#0F172A]'
                      : 'hover:bg-[#EAF3F1] text-[#475569]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isViewed
                        ? 'bg-[#0F766E] text-white'
                        : 'border-2 border-slate-400 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>

                  <div className="text-sm leading-snug">
                    <span className="font-bold text-[#0F172A]">{item.kind}: </span>
                    <span className={isActive ? 'font-semibold text-[#0F766E]' : 'text-[#475569]'}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Complete Course Button at the bottom of the left sidebar */}
        <div className="p-5 border-t border-[#D5E3E0] bg-white">
          <button
            type="button"
            onClick={handleFinishCourse}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] transition-colors cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCourseCompleted ? 'Curso Completado · Volver' : 'Finalizar Curso'}
            </span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA: ANTERIOR | SIGUIENTE + Document/Video Viewer */}
      <div className="flex-1 flex flex-col min-w-0 px-4 sm:px-8 py-5 space-y-4">
        {/* Top Bar: ANTERIOR — SIGUIENTE */}
        <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#0F766E] px-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="hover:underline disabled:opacity-35 disabled:no-underline cursor-pointer"
          >
            ANTERIOR
          </button>

          {procedure.externalUrl && (
            <a
              href={procedure.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline text-xs sm:text-sm text-[#0D9488]"
            >
              <span>ABRIR SISTEMA WEB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="hover:underline cursor-pointer"
          >
            {activeIndex < lessons.length - 1 ? 'SIGUIENTE' : 'FINALIZAR'}
          </button>
        </div>

        {/* Document & Video Viewer Container */}
        <div className="bg-white border border-[#D5E3E0] rounded-md shadow-xs overflow-hidden flex flex-col">
          {/* Top Document Toolbar */}
          <div className="bg-[#F7FAFA] border-b border-[#E2ECE9] px-4 py-2 flex items-center justify-between text-slate-500">
            <div className="flex items-center gap-4">
              <span className="p-1 text-slate-500">
                <PanelLeft className="w-4 h-4" />
              </span>
              <span className="h-4 w-px bg-slate-300" />
              <span className="p-1 text-slate-500">
                {currentLesson.videoUrl ? (
                  <PlayCircle className="w-4 h-4 text-[#0D9488]" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
              </span>

              <div className="flex items-center gap-2 bg-[#E6F0EE] px-2.5 py-1 rounded text-xs font-medium text-[#0F172A]">
                <span className="font-mono tabular-nums">{zoom}%</span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(75, z - 10))}
                  className="hover:text-[#0D9488]"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(125, z + 10))}
                  className="hover:text-[#0D9488]"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="p-1 text-slate-500 hidden sm:inline-flex">
                <Hand className="w-4 h-4" />
              </span>
              <span className="p-1 bg-[#E6F0EE] rounded text-[#0F766E] hidden sm:inline-flex">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                Página {activeIndex + 1} de {lessons.length}
              </span>
              <Search className="w-4 h-4 text-slate-500" />
              <Settings className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* Document Stage with Centered Study Guide / Video Sheet */}
          <div className="bg-[#E3ECEA] p-4 sm:p-8 flex justify-center overflow-y-auto min-h-[470px]">
            <div
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-[640px] transition-transform"
            >
              {currentLesson.isCover ? (
                /* COVER SHEET */
                <div className="bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#1E293B] text-white rounded-sm shadow-lg min-h-[520px] p-10 flex flex-col justify-between items-center text-center relative overflow-hidden">
                  <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border border-white/15 pointer-events-none" />
                  <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full border border-white/15 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />

                  <div className="relative z-10 space-y-1.5 pt-2">
                    <div className="w-12 h-12 rounded-full bg-amber-300 text-[#0F172A] font-extrabold text-lg flex items-center justify-center mx-auto shadow-sm">
                      OD
                    </div>
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/95">
                      ODONTOGUÍA CLÍNICA
                    </div>
                    <div className="text-[11px] tracking-[0.15em] uppercase text-teal-100/80">
                      MANUAL DE CAPACITACIÓN INTERNA
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 my-auto py-8">
                    <h1 className="text-xl sm:text-2xl font-extrabold leading-snug">
                      {procedure.title}
                    </h1>
                    <p className="text-sm font-semibold text-teal-100">
                      {procedure.department}
                    </p>
                    <p className="text-xs text-white/80 pt-1">
                      Guía Operativa · Bloque I
                    </p>
                    <p className="text-xs text-white/90 max-w-md mx-auto leading-relaxed pt-3">
                      {currentLesson.instruction}
                    </p>

                    {procedure.externalUrl && (
                      <div className="pt-4">
                        <a
                          href={procedure.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-[#0F766E] font-bold text-xs shadow-sm hover:bg-teal-50 transition-colors"
                        >
                          <span>Ir a {procedure.externalUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 text-[11px] font-semibold text-teal-100/90 pb-2">
                    Pulsa &ldquo;SIGUIENTE&rdquo; o selecciona un tema del menú izquierdo para avanzar
                  </div>
                </div>
              ) : (
                /* CONTENT & VIDEO SHEET */
                <div className="bg-white text-[#1E293B] rounded-sm shadow-lg min-h-[520px] p-6 sm:p-9 flex flex-col justify-between border border-slate-200">
                  <div className="space-y-5">
                    <div className="border-b-2 border-[#0D9488] pb-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                        {currentLesson.section || procedure.title}
                      </div>
                      <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mt-1">
                        {currentLesson.label}
                      </h1>
                    </div>

                    {/* Embedded Video Player when lesson has videoUrl */}
                    {currentLesson.videoUrl && (
                      <div className="rounded-lg overflow-hidden bg-slate-950 border border-slate-300 shadow-sm">
                        <video
                          src={currentLesson.videoUrl}
                          controls
                          playsInline
                          className="w-full max-h-[380px] mx-auto bg-black"
                        >
                          Tu navegador no soporta la reproducción de video.
                        </video>
                      </div>
                    )}

                    <p className="text-sm text-[#334155] leading-relaxed font-medium">
                      {currentLesson.instruction}
                    </p>

                    {currentLesson.bullets && currentLesson.bullets.length > 0 && (
                      <div className="space-y-3 pt-1">
                        {currentLesson.bullets.map((bullet, idx) => {
                          const [boldPart, ...rest] = bullet.split(':');
                          const hasColon = rest.length > 0;
                          return (
                            <div
                              key={idx}
                              className="p-3.5 rounded-lg bg-[#F4F9F8] border border-[#D5E3E0] text-xs sm:text-sm text-[#334155] leading-relaxed"
                            >
                              {hasColon ? (
                                <>
                                  <strong className="font-bold text-[#0F172A]">
                                    {boldPart}:
                                  </strong>
                                  <span>{rest.join(':')}</span>
                                </>
                              ) : (
                                <span>{bullet}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {currentLesson.keyCheck && (
                      <div className="p-4 rounded-lg bg-teal-50/80 border border-teal-200 text-xs sm:text-sm text-teal-950">
                        <span className="font-bold">Punto clave a verificar: </span>
                        <span>{currentLesson.keyCheck}</span>
                      </div>
                    )}
                  </div>

                  {/* Sheet Footer */}
                  <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Guía Oficial de Capacitación Clínica</span>
                    {activeIndex < lessons.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="font-bold text-[#0F766E] hover:underline cursor-pointer"
                      >
                        Continuar al siguiente tema →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinishCourse}
                        className="px-4 py-2 rounded-md bg-[#0D9488] text-white font-bold hover:bg-[#0F766E] transition-colors cursor-pointer"
                      >
                        Finalizar módulo ✓
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Comments Section */}
          <div className="bg-white border-t border-[#D5E3E0] p-6 space-y-3">
            <h3 className="text-sm font-semibold text-[#1E293B]">
              Notas y observaciones sobre este contenido
            </h3>
            <div className="bg-[#F2F7F6] rounded p-3.5 text-xs text-[#475569]">
              Espacio para anotar dudas o recordatorios prácticos durante tu capacitación en la clínica.
            </div>

            {savedComments.length > 0 && (
              <div className="space-y-2 pt-1">
                {savedComments.map((c, i) => (
                  <div
                    key={i}
                    className="text-xs bg-teal-50/70 border border-teal-200 text-slate-800 px-3 py-2 rounded"
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escribe una nota sobre este paso..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#0D9488]"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded transition-colors cursor-pointer"
              >
                Guardar nota
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
