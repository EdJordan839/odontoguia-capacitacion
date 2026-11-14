// @ts-nocheck -- código importado tal cual desde el repositorio cursosclinica
import React, { useState } from 'react';
import { X, Monitor, Wrench, Plus, Trash2 } from 'lucide-react';
import {
  DentalProcedure,
  Modality,
  Department,
  RoleTarget,
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
  const [department, setDepartment] = useState<Department>('Equipos y Soporte');
  const [targetRole, setTargetRole] = useState<RoleTarget>('Todo el Personal');
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [locationOrSystem, setLocationOrSystem] = useState('');
  const [summary, setSummary] = useState('');
  const [toolsInput, setToolsInput] = useState('Guantes de nitrilo, Manual rápido del equipo');
  const [addToPlan, setAddToPlan] = useState(true);

  const [steps, setSteps] = useState<
    Array<{ title: string; instruction: string; keyCheck: string; commonMistake: string }>
  >([
    {
      title: 'Preparación del equipo o sistema',
      instruction: '',
      keyCheck: 'Equipo verificado antes de iniciar',
      commonMistake: '',
    },
    {
      title: 'Ejecución y comprobación final',
      instruction: '',
      keyCheck: 'Proceso documentado y área limpia',
      commonMistake: '',
    },
  ]);

  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        title: '',
        instruction: '',
        keyCheck: '',
        commonMistake: '',
      },
    ]);
  };

  const handleRemoveStep = (idx: number) => {
    if (steps.length <= 1) return;
    setSteps((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateStep = (
    idx: number,
    field: 'title' | 'instruction' | 'keyCheck' | 'commonMistake',
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
      instruction: s.instruction.trim() || 'Seguir el estándar operativo de la clínica.',
      keyCheck: s.keyCheck.trim() || 'Verificado por coordinador de turno.',
      commonMistake: s.commonMistake.trim() || undefined,
    }));

    const newProc: DentalProcedure = {
      id: `proc-custom-${Date.now()}`,
      code: `${codePrefix}-${codeNumber}`,
      title: title.trim(),
      summary: summary.trim(),
      modality,
      department,
      targetRole,
      durationMinutes: Number(durationMinutes) || 10,
      frequency: 'Según operación de clínica',
      locationOrSystem:
        locationOrSystem.trim() ||
        (modality === 'virtual'
          ? 'Computadora de Recepción — Software Clínico'
          : 'Instalaciones de la Clínica Dental'),
      toolsRequired: toolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      steps: formattedSteps,
      verification: {
        question: `¿Cuál es el criterio principal para dar por concluido el proceso "${title.trim()}"?`,
        options: [
          formattedSteps[formattedSteps.length - 1]?.keyCheck ||
            'Haber completado y verificado cada paso de control sin omitir medidas de seguridad',
          'Realizar el proceso sin revisar los insumos requeridos',
          'Dejar el registro pendiente para la semana siguiente',
        ],
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
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 id="new-proc-title" className="text-lg font-bold text-slate-900">
              Registrar nuevo procedimiento de capacitación
            </h2>
            <p className="text-xs text-slate-600">
              Agrega un protocolo virtual (en computadora) u operativo presencial (en consultorio/recepción).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Modality Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-800">
              Modalidad del procedimiento
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModality('virtual')}
                className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-colors ${
                  modality === 'virtual'
                    ? 'bg-teal-50/70 border-teal-700 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Monitor className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Proceso Virtual (En Computadora)
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Software dental, agenda, facturación, WhatsApp o rayos X digitales.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('operativo')}
                className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-colors ${
                  modality === 'operativo'
                    ? 'bg-amber-50/70 border-amber-700 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Wrench className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Proceso Operativo (En Persona)
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Cambio de tóner, autoclave, desinfección de sillón, recepción física.
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Título del procedimiento *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Reposición de rollo térmico en terminal bancaria TPV"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Duración estimada (min)
              </label>
              <input
                type="number"
                min={2}
                max={120}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Área de la clínica
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              >
                <option value="Recepción y Administración">Recepción y Administración</option>
                <option value="Clínica y Esterilización">Clínica y Esterilización</option>
                <option value="Equipos y Soporte">Equipos y Soporte</option>
                <option value="Facturación y Seguros">Facturación y Seguros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Puesto al que va dirigido
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as RoleTarget)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              >
                <option value="Todo el Personal">Todo el Personal</option>
                <option value="Recepción">Recepción</option>
                <option value="Asistente Dental">Asistente Dental</option>
                <option value="Coordinador">Coordinador</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Ubicación física o sistema informático
              </label>
              <input
                type="text"
                value={locationOrSystem}
                onChange={(e) => setLocationOrSystem(e.target.value)}
                placeholder="Ej. Recepción — Impresora / Software OdontoCloud"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Insumos o accesos necesarios (separados por coma)
              </label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="Ej. Cartucho nuevo, Guantes de nitrilo, Usuario activo"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Resumen y objetivo del proceso *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe brevemente qué aprenderá a hacer el colaborador de nuevo ingreso..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
            />
          </div>

          {/* Steps Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-800">
                Pasos del procedimiento ({steps.length})
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar paso
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono tabular-nums font-semibold text-slate-700">
                      Paso 0{idx + 1}
                    </span>
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-xs text-slate-400 hover:text-red-600 transition-colors"
                        aria-label="Eliminar paso"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={step.title}
                      onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                      placeholder="Título del paso"
                      className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                    />
                    <input
                      type="text"
                      value={step.keyCheck}
                      onChange={(e) => handleUpdateStep(idx, 'keyCheck', e.target.value)}
                      placeholder="Punto de verificación de calidad"
                      className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-teal-700"
                    />
                  </div>

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
            <span>
              Asignar automáticamente este proceso a la selección actual para nuevos ingresos
            </span>
          </label>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Guardar procedimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
