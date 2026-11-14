export type Modality = 'virtual' | 'operativo';

export type Department =
  | 'Recepción y Administración'
  | 'Clínica y Esterilización'
  | 'Equipos y Soporte'
  | 'Facturación y Seguros';

export type RoleTarget = 'Recepción' | 'Asistente Dental' | 'Coordinador' | 'Todo el Personal';

export interface ProcedureStep {
  id: string;
  section?: string;
  title: string;
  instruction: string;
  bullets?: string[];
  keyCheck: string;
  commonMistake?: string;
}

export interface VerificationQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface GoldenRule {
  title: string;
  description: string;
}

export interface DentalProcedure {
  id: string;
  code: string;
  title: string;
  summary: string;
  externalUrl?: string;
  videoUrl?: string;
  philosophy?: string;
  modality: Modality;
  department: Department;
  targetRole: RoleTarget;
  durationMinutes: number;
  frequency: string;
  locationOrSystem: string;
  toolsRequired: string[];
  steps: ProcedureStep[];
  goldenRules?: GoldenRule[];
  verification: VerificationQuestion;
  mandatoryForNewHires: boolean;
}

export const INITIAL_PROCEDURES: DentalProcedure[] = [
  {
    id: 'proc-alta-paciente-virtual',
    code: 'SOP-VT-01',
    title: 'Alta de Paciente y Sistema Clínico Odontológico',
    summary:
      'Guía completa de captura rápida e impresión inteligente en el sistema web (Módulos: Historia Clínica y Ficha de Exploración / Consulta).',
    externalUrl: 'https://datingscriptlab.com/',
    philosophy:
      'El sistema cuenta con "Captura Rápida e Impresión Inteligente": muchos campos vienen preconfigurados con valores normales ("Sano", "No", "Negados") para ahorrar tiempo en consulta, y al imprimir en papel tamaño Carta, el sistema limpia y compacta automáticamente lo que no se utilizó para entregar un documento clínico impecable en una sola hoja por sección.',
    modality: 'virtual',
    department: 'Recepción y Administración',
    targetRole: 'Todo el Personal',
    durationMinutes: 15,
    frequency: 'En cada ingreso y consulta de paciente',
    locationOrSystem: 'Sistema Web Clínico — https://datingscriptlab.com/',
    toolsRequired: [
      'Acceso a https://datingscriptlab.com/',
      'Datos del paciente y signos vitales',
      'Impresora configurada en tamaño Carta (o guardar como PDF)',
    ],
    steps: [
      {
        id: 'mod1-1',
        section: 'Módulo 1: Historia Clínica',
        title: '1. Datos de Identificación y Alergias Automáticas',
        instruction:
          'Registra los datos iniciales del paciente aprovechando la automatización de edad y alertas médicas:',
        bullets: [
          'Cálculo automático de edad: Al seleccionar la fecha de nacimiento, el sistema calcula automáticamente la edad en años (o meses si es bebé).',
          'Sincronización de Alergias: Cuenta con un recuadro destacado de "Alergias". Si más abajo en antecedentes se marca "Sí" en "Alergia a algún medicamento" y se escribe cuál es, el sistema lo copia automáticamente al recuadro superior para que nunca pase desapercibido.',
        ],
        keyCheck: 'Edad calculada y alergias sincronizadas en el recuadro superior.',
      },
      {
        id: 'mod1-2',
        section: 'Módulo 1: Historia Clínica',
        title: '2. Antecedentes Heredofamiliares y Signos Vitales Inteligentes',
        instruction:
          'Los campos cuentan con valores normales precargados y formato automático para agilizar la captura:',
        bullets: [
          'Heredofamiliares: Si se dejan en blanco en pantalla, al imprimir aparecen automáticamente como "Negados".',
          'Valores Normales Precargados: SpO2 (98), Pulso (80), Resp (18), P.A. (120/80) y Temp (36.5 °C) ya vienen cargados como valores reales (incluye botón para restablecerlos).',
          'Auto-formato numérico: Al escribir presión arterial (12080 → 120/80), talla (170 → 1.70) y temperatura (365 → 36.5) coloca diagonal o punto decimal solo.',
          'Conversión en tiempo real: Alterna Talla entre metros y pies (mts/ft) y Peso entre kilos y libras (kg/lbs) mostrando su equivalencia.',
        ],
        keyCheck: 'Signos vitales verificados con auto-formato.',
      },
      {
        id: 'mod1-3',
        section: 'Módulo 1: Historia Clínica',
        title: '3. Antecedentes Personales Patológicos y Enfermedades',
        instruction:
          'Todas las preguntas patológicas vienen listas para pacientes sanos y solo despliegan detalle cuando se requiere:',
        bullets: [
          'Pre-llenado seguro: Por defecto, todas las preguntas patológicas y enfermedades vienen marcadas en "No".',
          'Detalle condicional: Si se cambia una opción a "Sí" (ej. Hospitalizaciones, Tabaquismo o Medicación), se despliega automáticamente el campo "¿Cuál / Motivo?".',
          'Botones de Acción Rápida: Barras superiores para "Marcar todas en No" o "Limpiar" en un clic, con contadores visuales de respuestas positivas.',
        ],
        keyCheck: 'Condiciones positivas especificadas con su motivo.',
      },
      {
        id: 'mod1-4',
        section: 'Módulo 1: Historia Clínica',
        title: '4. Firma y Consentimiento',
        instruction:
          'Validación legal de la Historia Clínica al finalizar la captura:',
        bullets: [
          'Al pie de la hoja se incluye automáticamente el texto legal de veracidad de datos.',
          'Espacio formal listo al imprimir para el nombre y firma del paciente, tutor y doctor.',
        ],
        keyCheck: 'Hoja impresa firmada por paciente/tutor y odontólogo.',
      },
      {
        id: 'mod2-1',
        section: 'Módulo 2: Ficha de Exploración y Consulta',
        title: '1. Exploración Física (Extraoral e Intraoral)',
        instruction:
          'Evalúa Inspección general, Ganglios, ATM, Tejidos blandos y Tejidos duros con lógica inteligente:',
        bullets: [
          'Valores predeterminados: Todo inicia en parámetros normales (Ausente, Normales, Buena, Encía Sana, Sin placa).',
          'Lógica en Encía y Placa: En placa/cálculo el selector es exclusivo (Sí o No). En Encía, si está en "Sana" y se selecciona una patología (ej. Gingivitis), el sistema desmarca "Sana" automáticamente (y viceversa).',
          'Observaciones limpias: Si no se escribe nada en el renglón de observaciones, se oculta automáticamente al imprimir.',
        ],
        keyCheck: 'Exploración registrada sin campos vacíos innecesarios.',
      },
      {
        id: 'mod2-2',
        section: 'Módulo 2: Ficha de Exploración y Consulta',
        title: '2. Odontogramas Interactivos (Diagnóstico y Tratamiento)',
        instruction:
          'Dos odontogramas independientes (hallazgos/diagnóstico y plan de tratamiento) sincronizados con las listas inferiores:',
        bullets: [
          'Modo Lista (Clic en diente): Abre ventana con buscador para asignar diagnósticos o tratamientos exactos a esa pieza.',
          'Modo Dibujo Libre: Trazos a mano alzada con colores clínicos (Rojo, Azul, Verde, Amarillo, Negro) y distintos grosores.',
          'Modo Selección Múltiple: Toca varios dientes seguidos para aplicarles un mismo diagnóstico o tratamiento de golpe.',
          'Botones Limpiadores Independientes: "Limpiar trazos", "Limpiar selección" y "Limpiar diente" individual.',
          'Sincronización Automática: Lo registrado en el Odontograma de Diagnóstico marca automáticamente las casillas en la lista inferior.',
        ],
        keyCheck: 'Odontogramas registrados y sincronizados con la lista inferior.',
      },
      {
        id: 'mod2-3',
        section: 'Módulo 2: Ficha de Exploración y Consulta',
        title: '3. Listas de Diagnóstico y Plan de Tratamiento',
        instruction:
          'Selección ágil con buscador por código o palabra clave e impresión compacta:',
        bullets: [
          'Buscador rápido: Encuentra al instante Caries, Corona Zirconia, Prótesis parcial removible, Prótesis transicional, Ionómero, Pericoronitis, etc.',
          'Opciones Especiales Desplegables: Al marcar Profilaxis permite elegir cuadrantes (I, II, III, IV) o arcadas (Superior/Inferior). Al marcar Interconsulta despliega especialidades (Endodoncia, Maxilofacial, Ortodoncia, Periodoncia, etc.).',
          'Impresión Inteligente: En pantalla se ven todas las opciones, pero al imprimir solo aparecen los diagnósticos y tratamientos seleccionados.',
        ],
        keyCheck: 'Diagnósticos y tratamientos seleccionados correctamente.',
      },
      {
        id: 'mod2-4',
        section: 'Módulo 2: Ficha de Exploración y Consulta',
        title: '4. Planeación de Citas y Presupuesto',
        instruction:
          'Organiza la secuencia de citas del paciente y su presupuesto con control total del orden:',
        bullets: [
          'Primera cita predeterminada: Inicia automáticamente con "Historia clínica, diagnóstico, plan de tratamiento, presupuesto".',
          'Catálogo de Frases con Buscador: Botón desplegable en cada cita para insertar frases clínicas completas o tratamientos en segundos.',
          'Subir y Bajar: Reordena cualquier cita si cambia el plan de trabajo (ej. pasar la cita 5 a la cita 2).',
          'Insertar cita intermedia (+ o tecla Enter): Abre un renglón nuevo exactamente debajo de la cita actual sin desordenar las demás.',
        ],
        keyCheck: 'Secuencia de citas y presupuesto listos para imprimir en 1 clic.',
      },
    ],
    goldenRules: [
      {
        title: '1. Autoguardado continuo',
        description:
          'Todo lo que se escribe o dibuja se guarda automáticamente en la memoria del navegador para evitar pérdidas por cierres accidentales.',
      },
      {
        title: '2. Lo que ves en los recuadros es lo que se imprime',
        description:
          'Los signos vitales y valores normales ya están activos por defecto; solo modifícalos cuando el paciente presente un valor distinto.',
      },
      {
        title: '3. Impresión en 1 clic',
        description:
          'El botón "Imprimir / Guardar PDF" formatea automáticamente la vista activa para que quepa en tamaño Carta, ocultando botones, menús y campos vacíos.',
      },
    ],
    verification: {
      question:
        '¿Qué ocurre al imprimir la Historia Clínica o la Ficha de Exploración con el botón "Imprimir / Guardar PDF"?',
      options: [
        'Imprime todas las opciones vacías en varias hojas',
        'Limpia y compacta automáticamente los campos no utilizados para entregar el documento en una sola hoja tamaño Carta',
        'Borra la memoria del navegador antes de imprimir',
      ],
      correctIndex: 1,
    },
    mandatoryForNewHires: true,
  },
  {
    id: 'proc-toner-impresora',
    code: 'SOP-OP-01',
    title: 'Cambio de tóner de la impresora (Brother DCP-L2540DW)',
    summary:
      'Video demostrativo y guía paso a paso para retirar la bandeja de tambor, reemplazar el cartucho de tóner TN-660 y limpiar residuos en la impresora Brother DCP-L2540DW.',
    videoUrl: '/assets/aistudio/WhatsApp_Video_2026-11-10_at_9.02.53_PM_50fdd14a.mp4',
    philosophy:
      'Para cambiar el tóner de la impresora multifuncional Brother modelo DCP-L2540DW es indispensable tener el equipo apagado antes de abrir la cubierta frontal, liberar el cartucho usando la pestañita verde lateral y asegurarse de retirar el protector naranja del repuesto nuevo antes de presionarlo hasta que truene.',
    modality: 'operativo',
    department: 'Equipos y Soporte',
    targetRole: 'Todo el Personal',
    durationMinutes: 5,
    frequency: 'Cada vez que el equipo indique reemplazo de tóner',
    locationOrSystem: 'Impresora Brother modelo DCP-L2540DW (Tambor DR-630 / Tóner TN-660)',
    toolsRequired: [
      'Impresora Brother DCP-L2540DW apagada',
      'Cartucho de tóner de reemplazo TN-660',
      'Un poco de alcohol y paño/papel para limpiar polvo exterior del tóner',
    ],
    steps: [
      {
        id: 'toner-1',
        section: 'Procedimiento en Impresora Brother DCP-L2540DW',
        title: '1. Apagar el equipo y abrir las cubiertas frontal y superior',
        instruction:
          'Antes de manipular el interior de la impresora Brother DCP-L2540DW, verifica que esté apagada y abre el acceso frontal:',
        bullets: [
          'Tener apagado el equipo: Verifica en el panel superior que la impresora Brother modelo DCP-L2540DW se encuentre completamente apagada.',
          'Abrir las cubiertas: Levanta ligeramente la cubierta de arriba (escáner) y baja hacia adelante la tapita frontal para dejar descubierto el compartimento del tóner.',
        ],
        keyCheck: 'Equipo apagado y tapita delantera completamente abierta.',
      },
      {
        id: 'toner-2',
        section: 'Procedimiento en Impresora Brother DCP-L2540DW',
        title: '2. Jalar y extraer toda la bandeja (tambor + tóner)',
        instruction:
          'Retira el conjunto completo del interior de la impresora y apóyalo en una mesa firme:',
        bullets: [
          'Sujetar del asa verde: Localiza la manija con etiqueta verde en el centro del conjunto.',
          'Jalar hacia atrás/afuera: Jala suavemente hacia ti para que salga toda la bandejita completa (unidad de tambor DR-630 con el cartucho de tóner montado).',
          'Apoyar en superficie plana: Coloca la bandeja sobre el escritorio a un lado de la impresora para trabajar cómodamente.',
        ],
        keyCheck: 'Bandeja completa colocada sobre una superficie plana y estable.',
      },
      {
        id: 'toner-3',
        section: 'Procedimiento en Impresora Brother DCP-L2540DW',
        title: '3. Presionar la pestañita verde para botar el tóner usado',
        instruction:
          'Libera el cartucho agotado de la bandeja del tambor sin forzar las piezas:',
        bullets: [
          'Localizar el seguro verde: En el costado izquierdo de la bandeja (junto a la etiqueta verde DR-630) se encuentra una pestañita/botoncito verde.',
          'Botar el cartucho: Presiona esa pestañita verde hacia abajo; escucharás cómo se libera el seguro y podrás levantar y sacar el tóner vacío.',
        ],
        keyCheck: 'Tóner agotado retirado de la bandeja presionando la pestañita verde.',
      },
      {
        id: 'toner-4',
        section: 'Procedimiento en Impresora Brother DCP-L2540DW',
        title: '4. Desempacar el tóner nuevo y quitar el plástico protector naranja',
        instruction:
          'Prepara el cartucho de reemplazo TN-660 antes de montarlo en la bandeja:',
        bullets: [
          'Sacar de la bolsa protectora: Extrae el tóner nuevo de su empaque (es normal que traiga un poquito de polvo de tinta por fuera).',
          'Botar el protector naranja: Retira la cubierta de plástico naranja que protege la parte inferior del cartucho, ya que de esa zona es justo de donde se va a agarrar dentro de la bandeja.',
        ],
        keyCheck: 'Plástico protector naranja completamente retirado del tóner nuevo.',
      },
      {
        id: 'toner-5',
        section: 'Procedimiento en Impresora Brother DCP-L2540DW',
        title: '5. Colocar el tóner parejo hasta que truene, limpiar con alcohol y reinsertar',
        instruction:
          'Instala el cartucho nuevo en la bandeja, limpia cualquier exceso de polvo y devuélvelo a la impresora:',
        bullets: [
          'Alinear con las pestañitas blancas: Coloca el tóner nuevo tal cual estaba el anterior, cuidando que quede lo más parejo posible y que bajen las pestañitas blancas laterales.',
          'Presionar hasta que truene: Empuja ligeramente el cartucho hacia abajo hasta escuchar que truene (clic) y quede bien sujeto por el seguro verde.',
          'Limpiar polvo exterior con alcohol: Es recomendable limpiar el polvo de tóner que haya quedado por fuera de la carcasa usando un poquito de alcohol.',
          'Reinsertar la bandeja: Vuelve a introducir toda la bandeja dentro de la impresora y cierra la tapita frontal.',
        ],
        keyCheck: 'El tóner nuevo tronó en su seguro, se limpió el polvo exterior con alcohol y la bandeja volvió a colocarse en la impresora.',
      },
    ],
    verification: {
      question:
        'En la impresora Brother DCP-L2540DW, ¿qué debes hacer para liberar el tóner usado y qué pieza debes quitarle al tóner nuevo antes de colocarlo?',
      options: [
        'Presionar la pestañita verde lateral para botar el usado, y quitarle el plástico protector naranja al tóner nuevo antes de presionarlo hasta que truene',
        'Desatornillar la tapa trasera con desarmador y dejar puesto el plástico naranja',
        'Cambiar el tóner con la impresora imprimiendo sin sacar la bandeja',
      ],
      correctIndex: 0,
    },
    mandatoryForNewHires: true,
  },
];
