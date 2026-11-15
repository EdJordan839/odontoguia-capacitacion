import React, { useState } from 'react';
import {
  Check,
  FileText,
  ZoomOut,
  ZoomIn,
  ExternalLink,
  CheckCircle2,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  List,
  ArrowLeft,
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
    {
      id: `${procedure.id}-portada`,
      kind: 'Documento',
      label: 'Presentación',
      instruction: procedure.philosophy || procedure.summary,
      isCover: true,
    },
    ...(procedure.videoUrl
      ? [
          {
            id: `${procedure.id}-video-principal`,
            kind: 'Video' as const,
            label: 'Video 1: Demostración de cambio de tóner (Brother DCP-L2540DW)',
            section: 'Video Capacitación Presencial',
            instruction:
              'Demostración práctica en video del procedimiento en la impresora multifuncional Brother DCP-L2540DW. Puedes consultar cada paso detallado de forma individual en el temario.',
            videoUrl: procedure.videoUrl,
          },
        ]
      : []),
    ...procedure.steps.map((s) => ({
      id: s.id,
      kind: (s.section ? 'Módulo' : 'Guía') as 'Módulo' | 'Guía',
      label: s.title,
      section: s.section,
      instruction: s.instruction,
      bullets: s.bullets,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const currentLesson = lessons[activeIndex] || lessons[0];

  const selectLesson = (idx: number) => {
    const target = lessons[idx];
    if (!target) return;
    setActiveIndex(idx);
    setViewedIds((prev) => ({ ...prev, [target.id]: true }));
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col md:flex-row items-stretch bg-[#EEF4F3] text-[#1E293B]">
      {/* MOBILE TOP COURSE HEADER & COLLAPSIBLE SYLLABUS DRAWER (< 768px) */}
      <div className="md:hidden bg-white border-b border-[#D5E3E0] px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] py-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <label
            onClick={() => onToggleSelectForNewHires(procedure.id)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none"
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
              Para nuevos ingresos
            </span>
          </label>
        </div>

        <h2 className="text-xs font-extrabold tracking-wide text-[#0F172A] uppercase leading-snug">
          {procedure.title}
        </h2>

        {/* Collapsible Mobile Lesson Selector */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg bg-[#F2F8F7] border border-[#CDE0DD] text-left text-xs font-semibold text-[#0F172A] cursor-pointer"
        >
          <div className="flex items-center gap-2 min-w-0">
            <List className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span className="truncate">
              <strong className="text-[#0F766E]">
                Tema {activeIndex + 1}/{lessons.length}:
              </strong>{' '}
              {currentLesson.label}
            </span>
          </div>
          {mobileMenuOpen ? (
            <ChevronUp className="w-4 h-4 text-[#0F766E] shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#0F766E] shrink-0" />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="mt-1 rounded-lg border border-[#D5E3E0] bg-[#F7FAFA] divide-y divide-[#E2ECE9] max-h-72 overflow-y-auto shadow-md">
            {lessons.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isViewed = !!viewedIds[item.id] || isCourseCompleted;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectLesson(idx)}
                  className={`w-full text-left px-3.5 py-3 flex items-start gap-3 transition-colors ${
                    isActive
                      ? 'bg-[#DDF0EC] text-[#0F172A]'
                      : 'hover:bg-[#EAF3F1] text-[#475569]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isViewed
                        ? 'bg-[#0F766E] text-white'
                        : 'border-2 border-slate-400 text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <div className="text-xs leading-snug">
                    <span className="font-bold text-[#0F172A]">{item.kind}: </span>
                    <span className={isActive ? 'font-semibold text-[#0F766E]' : 'text-[#475569]'}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* DESKTOP LEFT SIDEBAR (>= 768px): Always left column side-by-side with right viewer */}
      <aside className="hidden md:flex w-[320px] shrink-0 bg-[#F7FAFA] border-r border-[#D5E3E0] flex-col justify-between">
        <div>
          {/* Top Course Header */}
          <div className="px-6 pt-6 pb-4 space-y-3 border-b border-[#E2ECE9]">
            <h2 className="text-xs font-extrabold tracking-wide text-[#0F172A] uppercase">
              {procedure.title}
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
      <div className="flex-1 flex flex-col min-w-0 px-3 sm:px-8 py-4 sm:py-5 space-y-3 sm:space-y-4">
        {/* Top Bar: ANTERIOR — SIGUIENTE */}
        <div className="flex items-center justify-between text-xs sm:text-base font-bold text-[#0F766E] px-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="hover:underline disabled:opacity-35 disabled:no-underline cursor-pointer py-1"
          >
            ← ANTERIOR
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
            className="hover:underline cursor-pointer py-1"
          >
            {activeIndex < lessons.length - 1 ? 'SIGUIENTE →' : 'FINALIZAR ✓'}
          </button>
        </div>

        {/* Document & Video Viewer Container */}
        <div className="bg-white border border-[#D5E3E0] rounded-lg sm:rounded-md shadow-xs overflow-hidden flex flex-col">
          {/* Top Document Toolbar */}
          <div className="bg-[#F7FAFA] border-b border-[#E2ECE9] px-3.5 sm:px-4 py-2 flex items-center justify-between text-slate-500">
            <div className="flex items-center gap-3">
              <span className="p-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E]">
                {currentLesson.videoUrl ? (
                  <>
                    <PlayCircle className="w-4 h-4 text-[#0D9488]" />
                    <span>Video</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-[#0D9488]" />
                    <span>Documento</span>
                  </>
                )}
              </span>

              {/* Zoom controls visible on tablet/desktop where sheet scaling applies */}
              <span className="hidden sm:inline-block h-4 w-px bg-slate-300" />
              <div className="hidden sm:flex items-center gap-2 bg-[#E6F0EE] px-2.5 py-1 rounded text-xs font-medium text-[#0F172A]">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(75, z - 10))}
                  className="hover:text-[#0D9488] cursor-pointer"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono tabular-nums">{zoom}%</span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(125, z + 10))}
                  className="hover:text-[#0D9488] cursor-pointer"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                Página {activeIndex + 1} de {lessons.length}
              </span>
            </div>
          </div>

          {/* Document Stage with Centered Study Guide / Video Sheet */}
          <div className="bg-[#E3ECEA] p-2.5 sm:p-8 flex justify-center overflow-y-auto sm:min-h-[500px]">
            <div
              style={
                zoom !== 100
                  ? { transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }
                  : undefined
              }
              className="w-full max-w-[640px] transition-transform"
            >
              {currentLesson.isCover ? (
                /* COVER SHEET */
                <div className="bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#1E293B] text-white rounded-md sm:rounded-sm shadow-lg min-h-[380px] sm:min-h-[520px] p-6 sm:p-10 flex flex-col justify-between items-center text-center relative overflow-hidden">
                  <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border border-white/15 pointer-events-none" />
                  <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full border border-white/15 pointer-events-none" />
                  <div className="absolute inset-6 sm:inset-8 rounded-full border border-white/10 pointer-events-none" />

                  <div className="relative z-10 space-y-1.5 pt-1 sm:pt-2">
                    <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/95">
                      ODONTOGUÍA
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 sm:space-y-4 my-auto py-6 sm:py-8">
                    <h1 className="text-lg sm:text-2xl font-extrabold leading-snug px-2">
                      {procedure.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto leading-relaxed px-1">
                      {currentLesson.instruction}
                    </p>

                    {procedure.externalUrl && (
                      <div className="pt-3 sm:pt-4">
                        <a
                          href={procedure.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0F766E] font-bold text-xs shadow-sm hover:bg-teal-50 transition-colors"
                        >
                          <span>Ir a {procedure.externalUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 text-[11px] font-semibold text-teal-100/90 pb-1">
                    Pulsa &ldquo;SIGUIENTE&rdquo; para avanzar al siguiente tema
                  </div>
                </div>
              ) : (
                /* CONTENT & VIDEO SHEET */
                <div className="bg-white text-[#1E293B] rounded-md sm:rounded-sm shadow-lg sm:min-h-[520px] p-4 sm:p-9 flex flex-col justify-between border border-slate-200">
                  <div className="space-y-4 sm:space-y-5">
                    <div className="border-b-2 border-[#0D9488] pb-3 sm:pb-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                        {currentLesson.section || procedure.title}
                      </div>
                      <h1 className="text-base sm:text-xl font-extrabold text-[#0F172A] mt-1 leading-snug">
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
                          className="w-full max-h-[340px] sm:max-h-[380px] mx-auto bg-black"
                        >
                          Tu navegador no soporta la reproducción de video.
                        </video>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
                      {currentLesson.instruction}
                    </p>

                    {currentLesson.bullets && currentLesson.bullets.length > 0 && (
                      <div className="space-y-2.5 sm:space-y-3 pt-1">
                        {currentLesson.bullets.map((bullet, idx) => {
                          const [boldPart, ...rest] = bullet.split(':');
                          const hasColon = rest.length > 0;
                          return (
                            <div
                              key={idx}
                              className="p-3 sm:p-3.5 rounded-lg bg-[#F4F9F8] border border-[#D5E3E0] text-xs sm:text-sm text-[#334155] leading-relaxed"
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
                  </div>

                  {/* Sheet Footer */}
                  <div className="pt-6 sm:pt-8 mt-5 sm:mt-6 border-t border-slate-100 flex items-center justify-between sm:justify-end gap-3 text-xs">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={activeIndex === 0}
                      className="sm:hidden px-3.5 py-2 rounded-md border border-[#D5E3E0] text-[#0F766E] font-bold disabled:opacity-35 cursor-pointer"
                    >
                      ← Anterior
                    </button>

                    {activeIndex < lessons.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-4 py-2 sm:p-0 rounded-md sm:rounded-none bg-[#0D9488] sm:bg-transparent text-white sm:text-[#0F766E] font-bold sm:hover:underline cursor-pointer"
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
        </div>

        {/* Mobile Bottom Complete Course Button */}
        <div className="md:hidden pt-1 pb-4">
          <button
            type="button"
            onClick={handleFinishCourse}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] transition-colors cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCourseCompleted ? 'Curso Completado · Volver al Inicio' : 'Finalizar Curso'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
