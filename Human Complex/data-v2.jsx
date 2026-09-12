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
  { id: 'autoconocimiento',  name: 'Autoconocimiento', pillar: 'base',      subtitle: 'Lo que reconozco de mí mismo' },
  { id: 'regulacion',        name: 'Regulación emocional', pillar: 'base',  subtitle: 'Cómo habito lo que siento' },
  { id: 'bienestar',         name: 'Bienestar físico', pillar: 'base',      subtitle: 'El cuerpo que me sostiene' },

  { id: 'claridad',          name: 'Claridad',         pillar: 'proposito', subtitle: 'Saber para qué hago lo que hago' },
  { id: 'motivacion',        name: 'Motivación',       pillar: 'proposito', subtitle: 'La energía que me mueve' },
  { id: 'decision',          name: 'Decisión',         pillar: 'proposito', subtitle: 'Elegir, aún cuando duele' },

  { id: 'comunicacion',      name: 'Comunicación',     pillar: 'conexion',  subtitle: 'Lo que digo y cómo lo digo' },
  { id: 'empatia',           name: 'Empatía',          pillar: 'conexion',  subtitle: 'Habitar el mundo del otro' },
  { id: 'colaboracion',      name: 'Colaboración',     pillar: 'conexion',  subtitle: 'Construir junto a otros' },

  { id: 'ejecucion',         name: 'Ejecución',        pillar: 'impacto',   subtitle: 'Llevar lo que pienso al acto' },
  { id: 'adaptabilidad',     name: 'Adaptabilidad',    pillar: 'impacto',   subtitle: 'Moverme cuando el suelo cambia' },
  { id: 'influencia',        name: 'Influencia',       pillar: 'impacto',   subtitle: 'La huella que dejo en otros' },
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
    text: 'Cuando algo me desborda, encuentro maneras de regularme antes de actuar.' },
  { sphere: 'bienestar', pillar: 'base',
    text: 'Cuando me siento agotado, suelo escuchar las señales de mi cuerpo.' },

  { sphere: 'claridad', pillar: 'proposito',
    text: 'Sé para qué hago lo que hago, no solo qué hago.' },
  { sphere: 'motivacion', pillar: 'proposito',
    text: 'Tengo la energía interna para sostener lo que dije que iba a sostener.' },
  { sphere: 'decision', pillar: 'proposito',
    text: 'Tomo decisiones desde lo que quiero, no desde la inercia.' },

  { sphere: 'comunicacion', pillar: 'conexion',
    text: 'Cuando algo me incomoda, lo digo en el momento, no después.' },
  { sphere: 'empatia', pillar: 'conexion',
    text: 'Puedo entender lo que el otro siente sin perder mi propio centro.' },
  { sphere: 'colaboracion', pillar: 'conexion',
    text: 'Construir con otros me acerca más a mí mismo, no me aleja.' },

  { sphere: 'ejecucion', pillar: 'impacto',
    text: 'Lo que digo que voy a hacer, lo termino haciendo.' },
  { sphere: 'adaptabilidad', pillar: 'impacto',
    text: 'Cuando el contexto cambia, encuentro caminos nuevos sin paralizarme.' },
  { sphere: 'influencia', pillar: 'impacto',
    text: 'Las personas a mi alrededor están mejor por haberme cruzado.' },
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
    colaboracion:     { level: 'enCamino' },
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
