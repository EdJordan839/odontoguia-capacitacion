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
      'El sistema está diseñado bajo una filosofía de "Captura Rápida e Impresión Inteligente": muchos campos vienen preconfigurados con valores normales ("Sano", "No", "Negados") para ahorrar tiempo en consulta, y al imprimir en papel tamaño Carta, el sistema limpia y compacta automáticamente lo que no se utilizó para entregar un documento clínico impecable en una sola hoja por sección.',
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
    title: 'Cambio de tóner de la impresora',
    summary:
      'Procedimiento presencial para reemplazar el cartucho de tóner agotado, limpiar el hilo corona y verificar que las recetas e historias clínicas salgan sin manchas.',
    modality: 'operativo',
    department: 'Equipos y Soporte',
    targetRole: 'Todo el Personal',
    durationMinutes: 10,
    frequency: 'Cada ~2,500 impresiones o aviso en pantalla',
    locationOrSystem: 'Módulo de Recepción — Impresora Multifuncional Láser',
    toolsRequired: [
      'Cartucho de tóner nuevo (Ref. TN-760 en armario de papelería)',
      'Guantes de nitrilo desechables',
      'Bolsa plástica para guardar el cartucho usado',
    ],
    steps: [
      {
        id: 'toner-1',
        title: '1. Verificar el aviso en pantalla y dejar encendida la impresora',
        instruction:
          'Confirma en el panel de la impresora el mensaje "Reemplazar Tóner". Colócate guantes de nitrilo y deja la impresora encendida para que detecte el cambio.',
        keyCheck: 'La impresora permanece encendida y tienes el repuesto nuevo a la mano.',
      },
      {
        id: 'toner-2',
        title: '2. Abrir la cubierta frontal y extraer el tambor con el tóner',
        instruction:
          'Presiona el botón de apertura frontal, sujeta el asa verde del conjunto de unidad de tambor y deslízalo hacia afuera con ambas manos sobre una superficie plana sin tocar el rodillo verde.',
        keyCheck: 'Conjunto extraído horizontalmente sin tocar el rodillo verde inferior.',
      },
      {
        id: 'toner-3',
        title: '3. Separar el tóner vacío presionando la palanca lateral',
        instruction:
          'Empuja hacia abajo la palanca de bloqueo lateral en el tambor, retira el cartucho usado y guárdalo de inmediato en la bolsa plástica.',
        keyCheck: 'El cartucho agotado queda embolsado sin derramar polvo.',
      },
      {
        id: 'toner-4',
        title: '4. Colocar el tóner nuevo y deslizar la lengüeta limpiadora',
        instruction:
          'Agita suavemente el tóner nuevo de lado a lado 5 veces, retira el protector naranja y encájalo hasta escuchar un clic. Desliza la lengüeta verde de extremo a extremo 3 veces y regrésala a la flecha inicial (▲).',
        keyCheck: 'Lengüeta verde alineada exactamente con la flecha (▲) antes de cerrar.',
      },
      {
        id: 'toner-5',
        title: '5. Reinsertar el conjunto e imprimir hoja de prueba',
        instruction:
          'Introduce el conjunto en la impresora, cierra la cubierta frontal, espera 20 segundos a que calibre e imprime una hoja de prueba.',
        keyCheck: 'Impresión nítida y el estado marca 100% de nivel de tóner.',
      },
    ],
    verification: {
      question:
        '¿Qué ocurre si olvidas regresar la lengüeta verde a su posición inicial (▲) antes de cerrar la impresora?',
      options: [
        'Aparecerá una línea negra vertical en todas las hojas impresas',
        'La impresora se apaga automáticamente por seguridad',
        'El papel saldrá completamente en blanco',
      ],
      correctIndex: 0,
    },
    mandatoryForNewHires: true,
  },
];
