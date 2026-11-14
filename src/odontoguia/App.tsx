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
      {/* Clean Header Bar with Clinical Teal Accents */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#D5E3E0] px-6 sm:px-10 py-3.5 flex items-center justify-between gap-8">
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

        <nav className="flex items-center gap-6 text-sm font-semibold text-[#5A6B68]">
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
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0F766E] bg-[#E6F4F1] hover:bg-[#CCFBF1] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            Nuevo Proceso
          </button>
        </div>
      </header>

      {/* Completion Confirmation Banner */}
      {completionNotice && (
        <div className="bg-[#0F766E] text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
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
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col justify-center">
          <div className="space-y-8 animate-[fadeIn_180ms_ease-out] w-full">
            {/* Top Row: Filter Checkboxes Centered with the Cards */}
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6">
              <div className="flex flex-wrap items-center justify-center gap-7">
                <label
                  onClick={() => setFilterMode('actuales')}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      filterMode === 'actuales'
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {filterMode === 'actuales' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      filterMode === 'actuales' ? 'text-[#0F766E]' : 'text-[#849693]'
                    }`}
                  >
                    Todos los Procesos
                  </span>
                </label>

                <label
                  onClick={() => setFilterMode('asignados')}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      filterMode === 'asignados'
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {filterMode === 'asignados' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      filterMode === 'asignados' ? 'text-[#0F766E]' : 'text-[#849693]'
                    }`}
                  >
                    Escogidos para Nuevos ({selectedIds.length})
                  </span>
                </label>

                <label
                  onClick={() => setFilterMode('aprobados')}
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      filterMode === 'aprobados'
                        ? 'bg-[#0D9488] border-[#0D9488] text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {filterMode === 'aprobados' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
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
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F766E] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Inicio
                </button>
              )}
            </div>

            {/* PAGE 1: MAIN VIEW — THE 2 CENTERED CARDS IN TWO COLUMNS */}
            {!openedCategory ? (
              <div className="grid grid-cols-2 gap-6 sm:gap-8 justify-center mx-auto">
                {/* CARD 1: PROCESOS EN COMPUTADORA */}
                <article
                  onClick={() => setOpenedCategory('virtual')}
                  className="bg-white rounded-xl border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] hover:shadow-[0_12px_34px_rgba(15,60,55,0.11)] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="h-52 bg-white border-b border-[#E6F0EE] flex items-center justify-center p-4">
                    <CourseIllustration procedureId="main-computadora" modality="virtual" />
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-[#0F172A]">
                        Procesos en Computadora
                      </h2>
                      <p className="text-sm text-[#5A6B68] leading-relaxed">
                        Analiza y ejecuta los procesos digitales de la clínica dental, como dar de alta a un paciente en el Sistema Clínico Odontológico.
                      </p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenedCategory('virtual');
                        }}
                        className="text-base font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
                      >
                        Entrar
                      </button>
                    </div>
                  </div>
                </article>

                {/* CARD 2: PROCEDIMIENTOS PRESENCIALES */}
                <article
                  onClick={() => setOpenedCategory('operativo')}
                  className="bg-white rounded-xl border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] hover:shadow-[0_12px_34px_rgba(15,60,55,0.11)] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="h-52 bg-white border-b border-[#E6F0EE] flex items-center justify-center p-4">
                    <CourseIllustration procedureId="main-presenciales" modality="operativo" />
                  </div>

                  <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-[#0F172A]">
                        Procedimientos Presenciales
                      </h2>
                      <p className="text-sm text-[#5A6B68] leading-relaxed">
                        Identifica los procedimientos operativos en persona dentro de la clínica, como el cambio de tóner de la impresora.
                      </p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenedCategory('operativo');
                        }}
                        className="text-base font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
                      >
                        Entrar
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              /* PAGE 2: CATEGORY CARDS */
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-xl font-bold text-[#0F172A]">
                    {openedCategory === 'virtual'
                      ? 'Procesos en Computadora'
                      : 'Procedimientos Presenciales'}
                  </h1>
                </div>

                {categoryProcedures.length === 0 ? (
                  <div className="bg-white rounded-xl p-10 text-center border border-[#DCE8E6] shadow-[0_8px_26px_rgba(15,60,55,0.06)] space-y-3 max-w-md mx-auto">
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
                    className={`grid gap-8 mx-auto ${
                      categoryProcedures.length === 1
                        ? 'grid-cols-1 max-w-sm'
                        : 'grid-cols-2 max-w-3xl'
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
                          <div className="relative h-52 bg-white border-b border-[#E6F0EE] flex items-center justify-center pt-10 pb-3 px-4">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectForNewHires(proc.id);
                              }}
                              className="absolute top-4 left-4 inline-flex items-center gap-2 text-xs font-semibold"
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
                              <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-xs font-bold text-[#0F766E]">
                                <CheckCircle2 className="w-4 h-4" />
                                Completado
                              </span>
                            )}

                            <CourseIllustration
                              procedureId={proc.id}
                              modality={proc.modality}
                            />
                          </div>

                          <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-2.5">
                              <h2 className="text-lg font-bold text-[#0F172A] leading-snug">
                                {proc.title}
                              </h2>
                              <p className="text-sm text-[#5A6B68] leading-relaxed">
                                {proc.summary}
                              </p>
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenCoursePage(proc);
                                }}
                                className="text-base font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
                              >
                                Entrar
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
