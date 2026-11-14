import React, { useState } from 'react';
import {
  X,
  Monitor,
  Wrench,
  CheckSquare,
  Square,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Check,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { DentalProcedure } from '../data/procedures';

interface ProcedureTrainingModalProps {
  procedure: DentalProcedure;
  isSelectedForPlan: boolean;
  isCompletedByActiveTrainee: boolean;
  activeTraineeName: string;
  onClose: () => void;
  onToggleSelectForPlan: (id: string) => void;
  onMarkCompleted: (id: string) => void;
}

export const ProcedureTrainingModal: React.FC<ProcedureTrainingModalProps> = ({
  procedure,
  isSelectedForPlan,
  isCompletedByActiveTrainee,
  activeTraineeName,
  onClose,
  onToggleSelectForPlan,
  onMarkCompleted,
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    if (isCompletedByActiveTrainee) {
      return Object.fromEntries(procedure.steps.map((s) => [s.id, true]));
    }
    return {};
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    isCompletedByActiveTrainee ? procedure.verification.correctIndex : null
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(isCompletedByActiveTrainee);

  const toggleStep = (stepId: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const completedStepsCount = procedure.steps.filter((s) => checkedSteps[s.id]).length;
  const allStepsDone = completedStepsCount === procedure.steps.length;
  const isQuizCorrect = selectedAnswer === procedure.verification.correctIndex;

  const handleVerifyAndComplete = () => {
    setQuizSubmitted(true);
    if (selectedAnswer === procedure.verification.correctIndex) {
      onMarkCompleted(procedure.id);
    }
  };

  const handleResetProgress = () => {
    setCheckedSteps({});
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-proc-title"
    >
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50/70">
          <div className="space-y-1.5">
            {/* Clean unboxed metadata row */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1.5 text-slate-900 font-semibold">
                {procedure.modality === 'virtual' ? (
                  <Monitor className="w-3.5 h-3.5 text-teal-700" />
                ) : (
                  <Wrench className="w-3.5 h-3.5 text-amber-700" />
                )}
                {procedure.modality === 'virtual'
                  ? 'Proceso virtual en computadora'
                  : 'Proceso operativo en persona'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-700">{procedure.code}</span>
              <span aria-hidden="true">·</span>
              <span>{procedure.department}</span>
              <span aria-hidden="true">·</span>
              <span>Rol: {procedure.targetRole}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{procedure.durationMinutes} min</span>
            </div>

            <h2
              id="modal-proc-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
            >
              {procedure.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors shrink-0"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Overview & Location / Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-200">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-xs font-semibold text-slate-500">Objetivo del procedimiento</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{procedure.summary}</p>
              <div className="pt-2 text-xs text-slate-600 space-y-1">
                <div>
                  <span className="font-semibold text-slate-800">Ubicación / Sistema: </span>
                  <span>{procedure.locationOrSystem}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Frecuencia de ejecución: </span>
                  <span>{procedure.frequency}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2.5">
              <h3 className="text-xs font-semibold text-slate-800">
                Insumos, herramientas o accesos requeridos
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {procedure.toolsRequired.map((tool, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="font-mono tabular-nums text-slate-400 select-none">
                      0{index + 1}.
                    </span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Step-by-Step Guide */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Secuencia operativa paso a paso
                </h3>
                <p className="text-xs text-slate-500">
                  Marca cada paso conforme lo ejecutes o demuestres durante tu capacitación.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tabular-nums text-slate-700">
                  Avance: {completedStepsCount}/{procedure.steps.length} pasos
                </span>
                {completedStepsCount > 0 && (
                  <button
                    onClick={handleResetProgress}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reiniciar
                  </button>
                )}
              </div>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
              {procedure.steps.map((step, idx) => {
                const isChecked = !!checkedSteps[step.id];
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`p-4 sm:p-5 transition-colors cursor-pointer ${
                      isChecked ? 'bg-teal-50/40' : 'bg-white hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(step.id);
                        }}
                        className="mt-0.5 text-teal-700 hover:text-teal-800 focus:outline-none shrink-0"
                        aria-label={`Marcar paso ${idx + 1}`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-teal-700" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4
                            className={`text-sm font-semibold ${
                              isChecked ? 'text-slate-500 line-through' : 'text-slate-900'
                            }`}
                          >
                            <span className="font-mono tabular-nums text-teal-700 mr-2">
                              0{idx + 1}.
                            </span>
                            {step.title}
                          </h4>
                        </div>

                        <p className="text-sm text-slate-700 leading-relaxed">{step.instruction}</p>

                        <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
                          <div className="text-slate-600">
                            <span className="font-semibold text-slate-800">
                              Verificación de calidad:{' '}
                            </span>
                            <span>{step.keyCheck}</span>
                          </div>
                        </div>

                        {step.commonMistake && (
                          <div className="mt-2 p-3 rounded-md bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
                            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold">Error común a evitar: </span>
                              <span>{step.commonMistake}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Verification Question */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Comprobación de aprendizaje para {activeTraineeName}
                </h3>
                <p className="text-xs text-slate-600">
                  Responde la pregunta de control operativo para validar este proceso.
                </p>
              </div>
              {isCompletedByActiveTrainee && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                  Proceso validado
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-slate-900">{procedure.verification.question}</p>

            <div className="space-y-2">
              {procedure.verification.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrectOption = idx === procedure.verification.correctIndex;

                let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';
                if (quizSubmitted) {
                  if (isCorrectOption) {
                    optionStyle = 'bg-teal-50 border-teal-600 text-teal-950 font-medium';
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = 'bg-red-50 border-red-400 text-red-900';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-teal-50/60 border-teal-700 text-slate-900 font-medium';
                }

                return (
                  <label
                    key={idx}
                    onClick={() => {
                      setSelectedAnswer(idx);
                      setQuizSubmitted(false);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${optionStyle}`}
                  >
                    <input
                      type="radio"
                      name={`verify-${procedure.id}`}
                      checked={isSelected}
                      onChange={() => {
                        setSelectedAnswer(idx);
                        setQuizSubmitted(false);
                      }}
                      className="mt-0.5 accent-teal-700"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>

            {quizSubmitted && !isQuizCorrect && (
              <p className="text-xs text-red-700 font-medium">
                Respuesta incorrecta. Revisa los puntos de control de los pasos anteriores e inténtalo de nuevo.
              </p>
            )}

            {quizSubmitted && isQuizCorrect && (
              <p className="text-xs text-teal-800 font-medium">
                Respuesta correcta. El procedimiento ha quedado registrado como completado para {activeTraineeName}.
              </p>
            )}

            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={handleVerifyAndComplete}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                {allStepsDone
                  ? 'Validar respuesta y marcar proceso como completado'
                  : 'Validar respuesta y acreditar proceso'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => onToggleSelectForPlan(procedure.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isSelectedForPlan
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isSelectedForPlan ? (
              <>
                <Check className="w-4 h-4" />
                Incluido en la ruta de nuevos ingresos
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Incluir en la ruta de nuevos ingresos
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Cerrar ventana</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
