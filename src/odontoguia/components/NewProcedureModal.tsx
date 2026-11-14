import React, { useState } from 'react';
import { X, Monitor, Wrench, Plus, Trash2 } from 'lucide-react';
import {
  DentalProcedure,
  Modality,
  ProcedureStep,
} from '../data/procedures';

interface NewProcedureModalProps {
  existingCount: number;
  onClose: () => void;
  onSave: (newProcedure: DentalProcedure, addToPlan: boolean) => void;
}

export const NewProcedureModal: React.FC<NewProcedureModalProps> = ({
  existingCount,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [modality, setModality] = useState<Modality>('operativo');
  const [externalUrl, setExternalUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [addToPlan, setAddToPlan] = useState(true);

  const [steps, setSteps] = useState<
    Array<{ title: string; instruction: string }>
  >([
    {
      title: '1. Preparación inicial',
      instruction: '',
    },
    {
      title: '2. Ejecución del proceso',
      instruction: '',
    },
  ]);

  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        title: `${prev.length + 1}. `,
        instruction: '',
      },
    ]);
  };

  const handleRemoveStep = (idx: number) => {
    if (steps.length <= 1) return;
    setSteps((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateStep = (
    idx: number,
    field: 'title' | 'instruction',
    value: string
  ) => {
    setSteps((prev) =>
      prev.map((step, i) => (i === idx ? { ...step, [field]: value } : step))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const codePrefix = modality === 'virtual' ? 'SOP-VT' : 'SOP-OP';
    const codeNumber = String(existingCount + 1).padStart(2, '0');

    const formattedSteps: ProcedureStep[] = steps.map((s, idx) => ({
      id: `custom-step-${Date.now()}-${idx}`,
      title: s.title.trim() || `Paso ${idx + 1}`,
      instruction: s.instruction.trim() || 'Seguir las indicaciones del paso.',
      keyCheck: '',
    }));

    const newProc: DentalProcedure = {
      id: `proc-custom-${Date.now()}`,
      code: `${codePrefix}-${codeNumber}`,
      title: title.trim(),
      summary: summary.trim(),
      externalUrl: externalUrl.trim() || undefined,
      modality,
      department:
        modality === 'virtual' ? 'Recepción y Administración' : 'Equipos y Soporte',
      targetRole: 'Todo el Personal',
      durationMinutes: 10,
      frequency: 'Según operación',
      locationOrSystem:
        externalUrl.trim() ||
        (modality === 'virtual' ? 'Sistema en Computadora' : 'Clínica'),
      toolsRequired: [],
      steps: formattedSteps,
      verification: {
        question: '',
        options: [],
        correctIndex: 0,
      },
      mandatoryForNewHires: addToPlan,
    };

    onSave(newProc, addToPlan);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-proc-title"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 id="new-proc-title" className="text-lg font-bold text-slate-900">
              Nuevo Proceso
            </h2>
            <p className="text-xs text-slate-600">
              Agrega un proceso en computadora o un procedimiento presencial a OdontoGuía.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Modality Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-800">
              Categoría
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModality('virtual')}
                className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  modality === 'virtual'
                    ? 'bg-teal-50/70 border-teal-700 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Monitor className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Procesos en Computadora
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Sistemas web, registros o procesos digitales.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('operativo')}
                className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                  modality === 'operativo'
                    ? 'bg-teal-50/70 border-teal-700 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Wrench className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Procedimientos Presenciales
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Equipos físicos, impresora o tareas operativas.
                </div>
                </div>
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Título del proceso *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Limpieza de escáner o Registro de consulta"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Descripción breve *
              </label>
              <textarea
                required
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe brevemente en qué consiste este proceso..."
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>

            {modality === 'virtual' && (
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Enlace al sistema web (opcional)
                </label>
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>
            )}
          </div>

          {/* Steps Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-800">
                Pasos del proceso ({steps.length})
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar paso
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700">
                      Paso {idx + 1}
                    </span>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-xs text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Eliminar paso"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    required
                    value={step.title}
                    onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                    placeholder="Título del paso"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                  />

                  <textarea
                    rows={2}
                    required
                    value={step.instruction}
                    onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                    placeholder="Instrucción detallada paso a paso..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                  />
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={addToPlan}
              onChange={(e) => setAddToPlan(e.target.checked)}
              className="accent-teal-700 w-4 h-4 rounded"
            />
            <span>Escoger este proceso para nuevos ingresos</span>
          </label>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Guardar proceso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
