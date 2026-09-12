// origins-definitions-data.jsx — Contenido del módulo "Definiciones del Modelo ORIGINS"
// Fuente: especificación de producto compartida por el cliente.

const PILLAR_DEFINITIONS = [
  {
    id: 'base',
    label: 'Pilar 1',
    name: 'Mi Base',
    definition: 'Es el cimiento físico, mental y emocional que sostiene todas tus acciones en cualquier situación. Integra pensamiento claro, estabilidad emocional y energía corporal constante para que puedas actuar con coherencia, incluso en momentos difíciles o de crisis.',
    reflect: 'Es la base sobre la que se apoyan todas tus acciones diarias. Cuando esta base es sólida, puedes pensar con claridad incluso bajo mucha presión, manejar emociones intensas sin perder el control y mantener energía estable durante el día. Si esta base es débil, los planes se caen, las relaciones se desgastan y el trabajo se vuelve más difícil. Cuando está bien construida, puedes enfrentar imprevistos, conflictos o cargas de trabajo altas sin perder estabilidad ni rendimiento.',
    spheres: [
      { name: 'Autoconocimiento', definition: 'Conocerte profundamente para actuar con una claridad interna real.', practical: 'Sabes identificar qué estás pensando, sintiendo y por qué reaccionas de cierta manera. Reconoces los patrones de comportamiento que te generan problemas repetidos. Aceptas tus fortalezas con naturalidad y trabajas en tus debilidades con objetividad. Incluso en situaciones de presión, puedes mantener la mente clara y cumplir los compromisos que haces contigo mismo. No reaccionas por impulso. Actúas con consciencia y claridad.' },
      { name: 'Regulación Emocional', definition: 'Capacidad de gestionar conscientemente tus emociones y reacciones.', practical: 'Antes de reaccionar ante un impulso fuerte, haces una pausa y eliges cómo responder. Reconoces tus errores y asumes responsabilidad sin culpar a otros. Puedes expresar desacuerdos sin romper relaciones. También detectas tensiones emocionales antes de que exploten y recuperas el equilibrio después de momentos difíciles. Manejas tus emociones sin que ellas controlen tu comportamiento.' },
      { name: 'Bienestar Físico', definition: 'Cuidado integral del cuerpo como fuente de energía para la vida.', practical: 'Prestas atención a las señales tempranas de tu cuerpo antes de que aparezcan problemas mayores. Buscas mantener una alimentación, descanso y movimiento que apoyen la vida que quieres vivir. Estableces límites físicos saludables y sabes diferenciar entre cansancio normal y agotamiento profundo. Mantienes energía constante para las cosas que realmente son importantes.' },
    ],
  },
  {
    id: 'proposito',
    label: 'Pilar 2',
    name: 'Mi Propósito',
    definition: 'Dirección vital clara y operativa que transforma ideas generales en acciones diarias concretas. Une claridad de rumbo, disciplina autónoma y conexión con impactos más amplios que tú mismo, generando ventaja competitiva sostenida.',
    reflect: 'Es tu GPS interno que evita que vivas a la deriva. Te da claridad exacta de hacia dónde vas, disciplina para cumplirte a ti mismo sin que nadie te vigile, y visión para conectar tus decisiones diarias con familia, equipo o comunidad. Resultado: cada día te acerca automáticamente a donde quieres estar realmente.',
    spheres: [
      { name: 'Sentido de Vida', definition: 'Claridad sobre la dirección fundamental de tu vida.', practical: 'Tus acciones diarias se alinean con valores que son importantes para ti. Evitas vivir en piloto automático y tomas decisiones que reflejan lo que realmente quieres lograr. Tus metas nacen de convicciones personales y no solo de presiones externas. Cada día te acerca automáticamente a donde quieres estar.' },
      { name: 'Autónoma', definition: 'Capacidad de dirigir tu tiempo, tus decisiones y tu camino personal.', practical: 'Cumples los compromisos que haces contigo mismo sin necesidad de supervisión. Priorizas lo importante sobre lo urgente. Mantienes disciplina en hábitos clave y tomas decisiones de forma consciente. Cuando cambian las circunstancias, ajustas tus planes con rapidez. Eres dueño de tu tiempo y de tus decisiones.' },
      { name: 'Trascendencia', definition: 'Conexión consciente entre tus acciones y el impacto que generan en otras personas.', practical: 'Consideras cómo tus decisiones afectan a quienes te rodean. Reflexionas sobre el propósito más profundo de lo que haces y conectas tus metas personales con el bienestar de tu familia, tu equipo o tu comunidad. También estás dispuesto a cambiar ideas cuando encuentras evidencia que lo justifica. Tus decisiones generan impacto positivo más allá de ti mismo.' },
    ],
  },
  {
    id: 'conexion',
    label: 'Pilar 3',
    name: 'Mi Conexión',
    definition: 'Es el sistema de relaciones que integra la forma en que te relacionas contigo mismo y con los demás. Busca crear coherencia interna y vínculos externos sanos y funcionales.',
    reflect: 'Representa tu capacidad para vivir en paz contigo mismo y construir relaciones sólidas con otras personas. Internamente te aceptas sin máscaras. Externamente generas confianza, te comunicas con claridad y puedes convivir con personas diferentes. Como resultado, construyes una red de apoyo estable y una autoestima equilibrada.',
    spheres: [
      { name: 'Conexión Intrapersonal', definition: 'Relación equilibrada y constructiva contigo mismo.', practical: 'Te aceptas con tus virtudes y también con tus áreas de mejora. Mantienes un diálogo interno respetuoso incluso cuando cometes errores. Practicas empatía contigo mismo como lo harías con alguien cercano. También buscas que lo que haces en tu vida refleje quién eres realmente. Desarrollas paz interna, estabilidad emocional y autoestima sólida.' },
      { name: 'Conexión Extrapersonal', definition: 'Capacidad de construir relaciones significativas con otras personas.', practical: 'Construyes relaciones basadas en confianza y respeto mutuo. Sabes equilibrar hablar y escuchar. Puedes compartir ideas con seguridad en grupos y también escuchar perspectivas diferentes con apertura. Participas de manera auténtica y colaborativa. Creas una red sólida de apoyo, confianza y cooperación.' },
    ],
  },
  {
    id: 'impacto',
    label: 'Pilar 4',
    name: 'Mi Impacto',
    definition: 'Es la manera en que generas resultados reales que benefician a otras personas en tu trabajo, tu equipo o tu comunidad. Convierte tus habilidades personales en contribuciones concretas y útiles.',
    reflect: 'Significa pasar de "saber hacer cosas" a "hacer que otros mejoren gracias a ti". Buscas aportar más de lo esperado, asumes responsabilidad cuando algo falla, enfrentas problemas de forma directa y ayudas a otros a crecer. Las personas valoran tu presencia porque generas cambios reales y soluciones prácticas.',
    spheres: [
      { name: 'Contribución', definition: 'Aportar más valor del que esperan de ti en cualquier situación.', practical: 'Buscas entregar resultados que superen lo mínimo requerido. Piensas en el beneficio del equipo completo y no solo en el propio. Compartes conocimientos sin guardarlos por competencia y cumples tus compromisos incluso cuando nadie te supervisa. Te conviertes en alguien confiable para resolver problemas y generar valor.' },
      { name: 'Liderazgo Personal', definition: 'Influir y guiar a otros principalmente a través del ejemplo.', practical: 'Las personas te siguen por lo que haces y por cómo actúas. Cuando algo falla asumes responsabilidad. Enfrentas conversaciones difíciles con respeto y ayudas a otros a desarrollar sus capacidades. En situaciones difíciles mantienes calma y claridad. Generas confianza natural y resultados consistentes en los equipos.' },
      { name: 'Visión Estratégica', definition: 'Capacidad de anticipar consecuencias y pensar en el futuro antes de actuar.', practical: 'Analizas cómo las decisiones de hoy impactarán en el futuro. Aprendes de los errores y ajustas estrategias cuando algo no funciona. Buscas soluciones prácticas que realmente resuelvan problemas importantes. Construyes resultados sostenibles a largo plazo para ti y para tu equipo.' },
    ],
  },
];

Object.assign(window, { PILLAR_DEFINITIONS });
