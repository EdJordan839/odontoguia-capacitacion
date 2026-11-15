import React, { useState, useMemo, useEffect } from 'react';
import { Check, ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';
import { INITIAL_PROCEDURES, DentalProcedure, Modality } from './data/procedures';
import { CourseIllustration } from './components/CourseIllustration';
import { CoursePlayerView } from './components/CoursePlayerView';
import { NewProcedureModal } from './components/NewProcedureModal';

const STORAGE_KEY_CUSTOM_PROCEDURES = 'odontoguia_custom_procedures_v5';
const STORAGE_KEY_SELECTED_PLAN = 'odontoguia_selected_plan_v5';
const STORAGE_KEY_COMPLETED = 'odontoguia_completed_v5';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [procedures, setProcedures] = useState<DentalProcedure[]>(INITIAL_PROCEDURES);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'proc-alta-paciente-virtual',
    'proc-toner-impresora',
  ]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const [filterMode, setFilterMode] = useState<'actuales' | 'asignados' | 'aprobados'>('actuales');

  // Navigation state
  const [openedCategory, setOpenedCategory] = useState<Modality | null>(null);
  const [activeProcedure, setActiveProcedure] = useState<DentalProcedure | null>(null);
  const [isNewProcedureOpen, setIsNewProcedureOpen] = useState<boolean>(false);
  const [completionNotice, setCompletionNotice] = useState<string | null>(null);

  useEffect(() => {
    const read = (k: string) => {
      try {
        const s = localStorage.getItem(k);
        return s ? JSON.parse(s) : null;
      } catch {
        return null;
      }
    };
    const p = read(STORAGE_KEY_CUSTOM_PROCEDURES);
    if (Array.isArray(p) && p.length > 0) {
      const initialIds = new Set(INITIAL_PROCEDURES.map((item) => item.id));
      const customOnly = p.filter((item: DentalProcedure) => !initialIds.has(item.id));
      setProcedures([...customOnly, ...INITIAL_PROCEDURES]);
    }
    const s = read(STORAGE_KEY_SELECTED_PLAN);
    if (Array.isArray(s)) setSelectedIds(s);
    const c = read(STORAGE_KEY_COMPLETED);
    if (Array.isArray(c)) setCompletedIds(c);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_PROCEDURES, JSON.stringify(procedures));
    } catch {
      // ignore
    }
  }, [procedures, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED_PLAN, JSON.stringify(selectedIds));
    } catch {
      // ignore
    }
  }, [selectedIds, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedIds));
    } catch {
      // ignore
    }
  }, [completedIds, loaded]);

  const toggleSelectForNewHires = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkCourseCompleted = (id: string) => {
    setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const proc = procedures.find((p) => p.id === id);
    if (proc) {
      setCompletionNotice(`Módulo finalizado correctamente: "${proc.title}".`);
      window.setTimeout(() => {
        setCompletionNotice(null);
      }, 4000);
    }
  };

  const handleOpenCoursePage = (proc: DentalProcedure) => {
    setActiveProcedure(proc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveProcedure(null);
    setOpenedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveNewProcedure = (newProc: DentalProcedure, addToPlan: boolean) => {
    setProcedures((prev) => [newProc, ...prev]);
    if (addToPlan) {
      setSelectedIds((prev) => [newProc.id, ...prev]);
    }
    setIsNewProcedureOpen(false);
  };

  const computerProcs = useMemo(
    () =>
      procedures.filter((p) => {
        if (p.modality !== 'virtual') return false;
        if (filterMode === 'asignados') return selectedIds.includes(p.id);
        if (filterMode === 'aprobados') return completedIds.includes(p.id);
        return true;
      }),
    [procedures, filterMode, selectedIds, completedIds]
  );

  const inPersonProcs = useMemo(
    () =>
      procedures.filter((p) => {
        if (p.modality !== 'operativo') return false;
        if (filterMode === 'asignados') return selectedIds.includes(p.id);
        if (filterMode === 'aprobados') return completedIds.includes(p.id);
        return true;
      }),
    [procedures, filterMode, selectedIds, completedIds]
  );

  const categoryProcedures = useMemo(() => {
    if (!openedCategory) return [];
    return openedCategory === 'virtual' ? computerProcs : inPersonProcs;
  }, [openedCategory, computerProcs, inPersonProcs]);

  return (
    <div className="min-h-screen bg-[#F2F7F6] text-[#1E293B] flex flex-col">
      {/* Responsive Header Bar: 2 clean rows on mobile, 1 row on tablet/desktop */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#D5E3E0] px-4 sm:px-10 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleGoHome();
            }}
            className="font-display text-lg font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
          >
            OdontoGuía
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-[#5A6B68]">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleGoHome();
              }}
              className={`hover:text-[#0D9488] transition-colors whitespace-nowrap shrink-0 ${
                !openedCategory && !activeProcedure ? 'text-[#0D9488]' : ''
              }`}
            >
              Inicio
            </a>
            <a
              href="#computadora"
              onClick={(e) => {
                e.preventDefault();
                setActiveProcedure(null);
                setOpenedCategory('virtual');
              }}
              className={`hover:text-[#0D9488] transition-colors whitespace-nowrap shrink-0 ${
                openedCategory === 'virtual' ? 'text-[#0D9488]' : ''
              }`}
            >
              En Computadora
            </a>
            <a
              href="#presenciales"
              onClick={(e) => {
                e.preventDefault();
                setActiveProcedure(null);
                setOpenedCategory('operativo');
              }}
              className={`hover:text-[#0D9488] transition-colors whitespace-nowrap shrink-0 ${
                openedCategory === 'operativo' ? 'text-[#0D9488]' : ''
              }`}
            >
              Presenciales
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsNewProcedureOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-[#0F766E] bg-[#E6F4F1] hover:bg-[#CCFBF1] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Proceso</span>
            </button>
          </div>
        </div>

        {/* Mobile Segmented Navigation Bar */}
        <nav className="flex sm:hidden items-center justify-between gap-1 mt-2.5 pt-2 border-t border-[#E6F0EE] text-xs font-semibold text-[#5A6B68]">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleGoHome();
            }}
            className={`flex-1 text-center py-1.5 rounded-md transition-colors ${
              !openedCategory && !activeProcedure
                ? 'bg-[#E6F4F1] text-[#0F766E] font-bold'
                : 'hover:text-[#0D9488]'
            }`}
          >
            Inicio
          </a>
          <a
            href="#computadora"
            onClick={(e) => {
              e.preventDefault();
              setActiveProcedure(null);
              setOpenedCategory('virtual');
            }}
            className={`flex-1 text-center py-1.5 rounded-md transition-colors ${
              openedCategory === 'virtual'
                ? 'bg-[#E6F4F1] text-[#0F766E] font-bold'
                : 'hover:text-[#0D9488]'
            }`}
          >
            En Computadora
          </a>
          <a
            href="#presenciales"
            onClick={(e) => {
              e.preventDefault();
              setActiveProcedure(null);
              setOpenedCategory('operativo');
            }}
            className={`flex-1 text-center py-1.5 rounded-md transition-colors ${
              openedCategory === 'operativo'
                ? 'bg-[#E6F4F1] text-[#0F766E] font-bold'
                : 'hover:text-[#0D9488]'
            }`}
          >
            Presenciales
          </a>
        </nav>
      </header>

      {/* Completion Confirmation Banner */}
      {completionNotice && (
        <div className="bg-[#0F766E] text-white px-4 sm:px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 text-center">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{completionNotice}</span>
        </div>
      )}

      {/* IF INSIDE A SPECIFIC COURSE: RENDER THE COURSE PLAYER VIEW */}
      {activeProcedure ? (
        <CoursePlayerView
          procedure={activeProcedure}
          isSelectedForNewHires={selectedIds.includes(activeProcedure.id)}
          isCourseCompleted={completedIds.includes(activeProcedure.id)}
          onBack={() => setActiveProcedure(null)}
          onToggleSelectForNewHires={toggleSelectForNewHires}
          onMarkCourseCompleted={handleMarkCourseCompleted}
        />
      ) : (
        /* PAGES 1 & 2: HOME (2 MAIN CARDS) OR CATEGORY CARDS */
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-12 flex flex-col justify-center">
          <div className="space-y-6 sm:space-y-8 animate-[fadeIn_180ms_ease-out] w-full">
            {/* Top Row: Filter Checkboxes */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-6">
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-7 bg-white sm:bg-transparent p-3.5 sm:p-0 rounded-xl border border-[#DCE8E6] sm:border-0">
                <label
                  onClick={() => setFilterMode('actuales')}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none py-0.5"
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      filterMode === 'actuales'
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {filterMode === 'actuales' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      filterMode === 'actuales' ? 'text-[#0F766E]' : 'text-[#849693]'
                    }`}
                  >
                    Todos los Procesos
                  </span>
                </label>

                <label
                  onClick={() => setFilterMode('asignados')}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none py-0.5"
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      filterMode === 'asignados'
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {filterMode === 'asignados' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      filterMode === 'asignados' ? 'text-[#0F766E]' : 'text-[#849693]'
                    }`}
                  >
                    Escogidos para Nuevos ({selectedIds.length})
                  </span>
                </label>

                <label
                  onClick={() => setFilterMode('aprobados')}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none py-0.5"
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      filterMode === 'aprobados'
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {filterMode === 'aprobados' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      filterMode === 'aprobados' ? 'text-[#0F766E]' : 'text-[#849693]'
                    }`}
                  >
                    Procesos Completados ({completedIds.length})
                  </span>
                </label>
              </div>

              {openedCategory && (
                <button
                  type="button"
                  onClick={() => setOpenedCategory(null)}
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-bold text-[#0F766E] bg-white sm:bg-transparent py-2.5 sm:py-0 px-4 sm:px-0 rounded-lg border border-[#DCE8E6] sm:border-0 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Inicio
                </button>
              )}
            </div>

            {/* PAGE 1: MAIN VIEW — 1 COLUMN ON MOBILE, 2 COLUMNS ON TABLET/DESKTOP */}
            {!openedCategory ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 justify-center mx-auto">
                {/* CARD 1: PROCESOS EN COMPUTADORA */}
                <article
                  onClick={() => setOpenedCategory('virtual')}
                  className="bg-white rounded-xl border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] hover:shadow-[0_12px_34px_rgba(15,60,55,0.11)] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="h-44 sm:h-52 bg-white border-b border-[#E6F0EE] flex items-center justify-center p-4">
                    <CourseIllustration procedureId="main-computadora" modality="virtual" />
                  </div>

                  <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                        Procesos en Computadora
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5A6B68] leading-relaxed">
                        Analiza y ejecuta los procesos digitales de la clínica dental, como dar de alta a un paciente en el Sistema Clínico Odontológico.
                      </p>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenedCategory('virtual');
                        }}
                        className="text-sm sm:text-base font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
                      >
                        Entrar →
                      </button>
                    </div>
                  </div>
                </article>

                {/* CARD 2: PROCEDIMIENTOS PRESENCIALES */}
                <article
                  onClick={() => setOpenedCategory('operativo')}
                  className="bg-white rounded-xl border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] hover:shadow-[0_12px_34px_rgba(15,60,55,0.11)] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="h-44 sm:h-52 bg-white border-b border-[#E6F0EE] flex items-center justify-center p-4">
                    <CourseIllustration procedureId="main-presenciales" modality="operativo" />
                  </div>

                  <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
                        Procedimientos Presenciales
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5A6B68] leading-relaxed">
                        Identifica los procedimientos operativos en persona dentro de la clínica, como el cambio de tóner de la impresora.
                      </p>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenedCategory('operativo');
                        }}
                        className="text-sm sm:text-base font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
                      >
                        Entrar →
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              /* PAGE 2: CATEGORY CARDS */
              <div className="space-y-5 sm:space-y-6">
                <div className="text-center">
                  <h1 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    {openedCategory === 'virtual'
                      ? 'Procesos en Computadora'
                      : 'Procedimientos Presenciales'}
                  </h1>
                </div>

                {categoryProcedures.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 sm:p-10 text-center border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] space-y-3 max-w-md mx-auto">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      No hay procesos en este filtro
                    </p>
                    <button
                      type="button"
                      onClick={() => setFilterMode('actuales')}
                      className="text-sm font-bold text-[#0D9488] hover:underline"
                    >
                      Ver todos los procesos
                    </button>
                  </div>
                ) : (
                  <div
                    className={`grid gap-5 sm:gap-8 mx-auto ${
                      categoryProcedures.length === 1
                        ? 'grid-cols-1 max-w-sm'
                        : 'grid-cols-1 sm:grid-cols-2 max-w-3xl'
                    }`}
                  >
                    {categoryProcedures.map((proc) => {
                      const isSelected = selectedIds.includes(proc.id);
                      const isCompleted = completedIds.includes(proc.id);

                      return (
                        <article
                          key={proc.id}
                          onClick={() => handleOpenCoursePage(proc)}
                          className="bg-white rounded-xl border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] hover:shadow-[0_12px_34px_rgba(15,60,55,0.11)] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                        >
                          <div className="relative h-48 sm:h-52 bg-white border-b border-[#E6F0EE] flex items-center justify-center pt-11 pb-3 px-4">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectForNewHires(proc.id);
                              }}
                              className="absolute top-3.5 left-4 inline-flex items-center gap-2 text-xs font-semibold"
                              title="Escoger para que los nuevos lo vean"
                            >
                              <span
                                className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                                  isSelected
                                    ? 'bg-[#0D9488] border-[#0D9488] text-white'
                                    : 'bg-white border-slate-300 text-transparent'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                              <span className={isSelected ? 'text-[#0F766E]' : 'text-[#849693]'}>
                                {isSelected ? 'Escogido para nuevos' : 'Escoger'}
                              </span>
                            </button>

                            {isCompleted && (
                              <span className="absolute top-3.5 right-4 inline-flex items-center gap-1 text-xs font-bold text-[#0F766E]">
                                <CheckCircle2 className="w-4 h-4" />
                                Completado
                              </span>
                            )}

                            <CourseIllustration
                              procedureId={proc.id}
                              modality={proc.modality}
                            />
                          </div>

                          <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                              <h2 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                                {proc.title}
                              </h2>
                              <p className="text-xs sm:text-sm text-[#5A6B68] leading-relaxed">
                                {proc.summary}
                              </p>
                            </div>

                            <div className="flex justify-end pt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenCoursePage(proc);
                                }}
                                className="text-sm sm:text-base font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
                              >
                                Entrar →
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}

      {/* Add New Procedure Modal */}
      {isNewProcedureOpen && (
        <NewProcedureModal
          existingCount={procedures.length}
          onClose={() => setIsNewProcedureOpen(false)}
          onSave={handleSaveNewProcedure}
        />
      )}
    </div>
  );
}
