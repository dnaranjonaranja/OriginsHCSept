// data.jsx — Modelo de dominio de Human Complex
// 4 pilares (Mi Base, Mi Propósito, Mi Conexión, Mi Impacto), cada uno con 3 dimensiones.
// Lenguaje narrativo, introspectivo, no clínico.

const PILLARS = [
  {
    id: 'base',
    name: 'Mi Base',
    question: '¿Desde dónde estoy parado?',
    descriptor: 'Autoconocimiento · Regulación emocional · Bienestar físico',
    color: 'var(--p-base)',
  },
  {
    id: 'proposito',
    name: 'Mi Propósito',
    question: '¿Hacia dónde voy?',
    descriptor: 'Claridad · Motivación · Decisión',
    color: 'var(--p-proposito)',
  },
  {
    id: 'conexion',
    name: 'Mi Conexión',
    question: '¿Cómo me vinculo?',
    descriptor: 'Comunicación · Empatía · Colaboración',
    color: 'var(--p-conexion)',
  },
  {
    id: 'impacto',
    name: 'Mi Impacto',
    question: '¿Qué genero?',
    descriptor: 'Ejecución · Adaptabilidad · Influencia',
    color: 'var(--p-impacto)',
  },
];

// Dimensiones (las antiguas "esferas") — 3 por pilar = 12 dimensiones
const SPHERES = [
  { id: 'autoconocimiento',  name: 'Autoconocimiento', pillar: 'base',      subtitle: 'Claridad interna para actuar con consciencia' },
  { id: 'regulacion',        name: 'Regulación Emocional', pillar: 'base',  subtitle: 'Gestionar mis emociones y reacciones' },
  { id: 'bienestar',         name: 'Bienestar Físico', pillar: 'base',      subtitle: 'El cuerpo como fuente de energía' },

  { id: 'claridad',          name: 'Sentido de Vida',  pillar: 'proposito', subtitle: 'La dirección fundamental de mi vida' },
  { id: 'motivacion',        name: 'Autónoma',         pillar: 'proposito', subtitle: 'Dirigir mi tiempo y mis decisiones' },
  { id: 'decision',          name: 'Trascendencia',    pillar: 'proposito', subtitle: 'El impacto de lo que hago en otros' },

  { id: 'comunicacion',      name: 'Conexión Intrapersonal', pillar: 'conexion', subtitle: 'La relación que construyo conmigo' },
  { id: 'empatia',           name: 'Conexión Extrapersonal', pillar: 'conexion', subtitle: 'Vínculos significativos con otros' },

  { id: 'ejecucion',         name: 'Contribución',     pillar: 'impacto',   subtitle: 'Aportar más valor del esperado' },
  { id: 'adaptabilidad',     name: 'Liderazgo Personal', pillar: 'impacto', subtitle: 'Influir y guiar con el ejemplo' },
  { id: 'influencia',        name: 'Visión Estratégica', pillar: 'impacto', subtitle: 'Anticipar consecuencias antes de actuar' },
];

// Niveles cualitativos — alineados con el lenguaje del documento
const LEVELS = {
  desequilibrio: { id: 'desequilibrio', name: 'Desequilibrio',     descriptor: 'aquí algo pide cuidado urgente', glyph: '◐' },
  atencion:      { id: 'atencion',      name: 'Área de atención',  descriptor: 'pide ser mirado',                glyph: '◑' },
  enCamino:      { id: 'enCamino',      name: 'En camino',         descriptor: 'estás avanzando',                glyph: '◒' },
  fortaleza:     { id: 'fortaleza',     name: 'Fortaleza',         descriptor: 'es uno de tus apoyos',           glyph: '●' },
};

// Pregunta inicial del onboarding emocional
const INTENT_OPTIONS = [
  { id: 'entender',   text: 'Quiero entenderme mejor' },
  { id: 'cambio',     text: 'Estoy en un momento de cambio' },
  { id: 'mejorar',    text: 'Quiero mejorar algún aspecto de mi vida' },
  { id: 'claridad',   text: 'Busco mayor claridad o dirección' },
  { id: 'otro',       text: 'Otro' },
];

// Cuestionario — subset representativo (en producción, 63 preguntas)
const QUESTIONS = [
  { sphere: 'autoconocimiento', pillar: 'base',
    text: 'Reconozco las emociones y reacciones que aparecen en mí, incluso cuando son incómodas.' },
  { sphere: 'regulacion', pillar: 'base',
    text: 'Antes de reaccionar ante un impulso fuerte, hago una pausa y elijo cómo responder.' },
  { sphere: 'bienestar', pillar: 'base',
    text: 'Atiendo las señales de mi cuerpo antes de que aparezcan problemas mayores.' },

  { sphere: 'claridad', pillar: 'proposito',
    text: 'Mis acciones diarias se alinean con los valores que son importantes para mí.' },
  { sphere: 'motivacion', pillar: 'proposito',
    text: 'Cumplo los compromisos que hago conmigo mismo sin necesidad de supervisión.' },
  { sphere: 'decision', pillar: 'proposito',
    text: 'Considero cómo mis decisiones afectan a las personas que me rodean.' },

  { sphere: 'comunicacion', pillar: 'conexion',
    text: 'Mantengo un diálogo interno respetuoso conmigo, incluso cuando cometo errores.' },
  { sphere: 'empatia', pillar: 'conexion',
    text: 'Construyo relaciones basadas en confianza y respeto mutuo, equilibrando hablar y escuchar.' },

  { sphere: 'ejecucion', pillar: 'impacto',
    text: 'Busco entregar resultados que superen lo mínimo requerido.' },
  { sphere: 'adaptabilidad', pillar: 'impacto',
    text: 'Cuando algo falla, asumo la responsabilidad en lugar de esperar que otro decida.' },
  { sphere: 'influencia', pillar: 'impacto',
    text: 'Analizo cómo las decisiones de hoy impactarán en el futuro antes de actuar.' },
];

const LIKERT = [
  { value: 1, label: 'Casi nunca',           glyph: '○○○○○' },
  { value: 2, label: 'Rara vez',             glyph: '●○○○○' },
  { value: 3, label: 'A veces',              glyph: '●●○○○' },
  { value: 4, label: 'Casi siempre',         glyph: '●●●●○' },
  { value: 5, label: 'Siempre',              glyph: '●●●●●' },
];

// Pausa reflexiva — aparece a mitad del cuestionario
const REFLECTION_PAUSE = {
  eyebrow: 'Reflexiona',
  text: '¿Cuándo fue la última vez que realmente escuchaste lo que tu cuerpo necesitaba?',
  hint: 'No se trata de responder rápido. Se trata de responder con consciencia.',
};

// Resultado simulado
const RESULT = {
  pattern: {
    name: 'Tu base sostiene, tu impacto pide cuidado',
    italics: 'sabes desde dónde estás parado, pero la ejecución se te dispersa',
    body: 'Hay claridad sobre quién eres y un buen contacto con tu base. Donde el sistema empieza a cojear es entre lo que decides y lo que ejecutas: la energía existe, pero no siempre se traduce en acto.',
  },
  pillarStates: {
    base:      { level: 'fortaleza', note: 'Tienes contacto con lo que te sucede.' },
    proposito: { level: 'enCamino',  note: 'Sabes hacia dónde, aunque a veces se te nubla.' },
    conexion:  { level: 'enCamino',  note: 'Estás presente con otros, sin perderte.' },
    impacto:   { level: 'atencion',  note: 'La acción no termina de seguir a la decisión.' },
  },
  sphereStates: {
    autoconocimiento: { level: 'fortaleza' },
    regulacion:       { level: 'enCamino' },
    bienestar:        { level: 'atencion' },
    claridad:         { level: 'fortaleza' },
    motivacion:       { level: 'enCamino' },
    decision:         { level: 'enCamino' },
    comunicacion:     { level: 'enCamino' },
    empatia:          { level: 'fortaleza' },
    ejecucion:        { level: 'desequilibrio' },
    adaptabilidad:    { level: 'atencion' },
    influencia:       { level: 'enCamino' },
  },
  priority: {
    sphereId: 'ejecucion',
    invitation: 'Empieza por tu ejecución.',
    body: 'No porque sea lo más urgente, sino porque es la dimensión donde más distancia hay entre tu claridad y tu acción. Cerrar ese hueco va a mover otras dimensiones contigo.',
    action: {
      eyebrow: 'Una sola acción esta semana',
      text: 'Antes de aceptar el próximo compromiso, deja pasar una respiración completa. Mira tu agenda. Pregúntate: si dijera que sí, ¿qué le estoy quitando a algo que ya importa?',
    },
    implications: 'Cuando la ejecución no sigue a la claridad, el cuerpo lo registra como cansancio difuso, y los vínculos como promesas no cumplidas — incluso las que te haces a ti mismo.',
  },
  benchmarks: [
    { label: 'Tu lectura',                value: 'En camino',          emphasis: true },
    { label: 'Tu organización',           value: 'En camino' },
    { label: 'Plataforma global',         value: 'En camino' },
  ],
};

// Recursos por dimensión (alineados con el documento: Libros, TED Talks, Ejercicios, Journaling)
const RESOURCES_FOR_PRIORITY = [
  { kind: 'Libro',     title: 'Cuatro mil semanas',                              author: 'Oliver Burkeman',                  glyph: 'book' },
  { kind: 'TED Talk',  title: 'Cómo dejar de regalar tu poder',                  author: 'Charla · 16 min',                  glyph: 'play' },
  { kind: 'Ejercicio', title: 'Auditoría silenciosa de una semana',              author: 'Cuaderno · 7 días',                glyph: 'pen' },
  { kind: 'Journaling',title: 'Tres preguntas al cierre del día',                author: 'Práctica · 5 min · 21 días',       glyph: 'doc' },
  { kind: 'Audio',     title: 'Conversación con tu agenda',                      author: 'Práctica guiada · 9 min',          glyph: 'wave' },
];

// Cierre experiencial — preguntas finales y compromiso
const CLOSING = {
  questions: [
    '¿Qué es lo más importante que descubriste sobre ti?',
    '¿Qué vas a hacer diferente a partir de hoy?',
  ],
  commitmentPrompt: 'Me comprometo conmigo a…',
  signoff: 'Human Complex no termina aquí. Empieza contigo.',
};

// Recordatorios para la sección de seguimiento
const REMINDERS = [
  'Hoy, ¿estás actuando desde lo que quieres o desde la inercia?',
  '¿Qué necesita tu cuerpo que aún no le has dado?',
  'Si tu yo de hace un año te viera ahora, ¿qué te diría?',
];
