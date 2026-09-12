// brand.jsx — Logo Human Complex y vocabulario visual de geometría.
// Tres círculos superpuestos = pensar / sentir / decir / hacer en intersección.
// La región común es la marca.

// ── LOGO PRINCIPAL ──────────────────────────────────────────────────────────
// Tres círculos en intersección. Cuando se alinean, forman una figura central:
// el "ojo de la coherencia". Eso es Human Complex.
function HCLogo({ size = 28, mono = false, color, intersection }) {
  const c = color || 'currentColor';
  const inter = intersection || 'var(--amber)';
  const stroke = mono ? c : c;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ display: 'block' }}>
      <circle cx="14" cy="16" r="10" stroke={stroke} strokeWidth="1.2" opacity={mono ? 1 : 0.85} />
      <circle cx="26" cy="16" r="10" stroke={stroke} strokeWidth="1.2" opacity={mono ? 1 : 0.85} />
      <circle cx="20" cy="26" r="10" stroke={stroke} strokeWidth="1.2" opacity={mono ? 1 : 0.85} />
      {/* Centro: punto de coherencia */}
      <circle cx="20" cy="20" r="2" fill={inter} />
    </svg>);

}

// ── LOCKUP DE MARCA (logo + nombre) ─────────────────────────────────────────
function HCLockup({ italic = true, size = 17 }) {
  return (
    <span className="topbar-brand">
      <HCLogo size={26} />
      <span>
        Human{' '}
        <span style={{ fontStyle: italic ? 'italic' : 'normal', color: 'var(--amber)' }}>
          Complex
        </span>
      </span>
    </span>);

}

// ── ANILLO DE COHERENCIA ────────────────────────────────────────────────────
// Reemplaza la barra de progreso. El arco se cierra a medida que hay alineación.
// Cualitativo, no numérico.
function CoherenceRing({ level, color, size = 72, strokeWidth = 5, label }) {
  const fillByLevel = {
    desequilibrio: 0.18,
    atencion: 0.42,
    enCamino: 0.68,
    fortaleza: 0.92
  };
  const fill = fillByLevel[level] || 0.5;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * fill;
  const ringColor = color || 'var(--amber)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="var(--line)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={ringColor} strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${c - dash}`}
          strokeDashoffset={c * 0.25}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      {label &&
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontSize: 13,
        color: 'var(--ink-2)', letterSpacing: '-0.01em'
      }}>{label}</div>
      }
    </div>);

}

// ── CAMPO DE 4 PILARES (radar suavizado) ────────────────────────────────────
// En lugar de un radar gráfico de KPI, dibujamos un "campo" — gradiente suave
// que representa la forma actual del usuario en los 4 pilares.
function PillarField({ states, size = 280 }) {
  const half = size / 2;
  const r = half - 36;
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // base, propósito, conexión, impacto (top, right, bottom, left)
  const pillars = ['base', 'proposito', 'conexion', 'impacto'];
  const labels = ['Mi Base', 'Mi Propósito', 'Mi Conexión', 'Mi Impacto'];
  const colors = ['var(--p-base)', 'var(--p-proposito)', 'var(--p-conexion)', 'var(--p-impacto)'];

  const valByLevel = {
    desequilibrio: 0.25, atencion: 0.50, enCamino: 0.75, fortaleza: 0.95
  };

  const pts = pillars.map((p, i) => {
    const v = valByLevel[states[p]?.level || 'presencia'];
    const x = half + Math.cos(angles[i]) * r * v;
    const y = half + Math.sin(angles[i]) * r * v;
    return { x, y };
  });

  const path = `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y} L ${pts[3].x} ${pts[3].y} Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <defs>
        <radialGradient id="hc-field" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.30" />
          <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      {/* Anillos referenciales (cualitativos) */}
      {[0.30, 0.55, 0.80].map((rr, i) =>
      <circle key={i} cx={half} cy={half} r={r * rr}
      fill="none" stroke="var(--line-soft)" strokeWidth="0.5" />
      )}
      {/* Ejes */}
      {angles.map((a, i) =>
      <line key={i}
      x1={half} y1={half}
      x2={half + Math.cos(a) * r}
      y2={half + Math.sin(a) * r}
      stroke="var(--line-soft)" strokeWidth="0.5" />
      )}
      {/* Polígono del usuario */}
      <path d={path} fill="url(#hc-field)" stroke="var(--amber)"
      strokeWidth="1" strokeLinejoin="round" opacity="0.85" />
      {/* Puntos de pilar */}
      {pts.map((p, i) =>
      <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={colors[i]} />
        </g>
      )}
      {/* Labels */}
      {pillars.map((p, i) => {
        const lx = half + Math.cos(angles[i]) * (r + 22);
        const ly = half + Math.sin(angles[i]) * (r + 22);
        return (
          <text key={p} x={lx} y={ly}
          textAnchor="middle" dominantBaseline="middle"
          fill="var(--ink-3)" fontSize="10"
          fontFamily="var(--font-ui)"
          letterSpacing="0.16em"
          style={{ textTransform: 'uppercase' }}>
            {labels[i]}
          </text>);

      })}
    </svg>);

}

// ── ICONO DE PILAR (pequeño glifo geométrico) ───────────────────────────────
function PillarGlyph({ pillar, size = 14 }) {
  const c = `var(--p-${pillar})`;
  if (pillar === 'base') {
    // círculo con punto: el centro desde el que se mira
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" style={{ width: "24px", height: "24px" }}>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke={c} strokeWidth="1" />
        <circle cx="7" cy="7" r="1.5" fill={c} />
      </svg>);

  }
  if (pillar === 'proposito') {
    // semicírculo apuntando: dirección
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" style={{ width: "3px", height: "24px" }}>
        <path d="M 1.5 7 A 5.5 5.5 0 0 1 12.5 7 L 1.5 7 Z" fill={c} />
      </svg>);

  }
  if (pillar === 'conexion') {
    // círculo lleno: presencia con otros
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" style={{ width: "36px", height: "36px" }}>
        <circle cx="7" cy="7" r="5.5" fill={c} opacity="0.9" />
      </svg>);

  }
  if (pillar === 'impacto') {
    // anillo abierto: acción que sale al mundo
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" style={{ width: "24px", height: "24px" }}>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke={c} strokeWidth="2"
        strokeDasharray="20 6" transform="rotate(-30 7 7)" strokeLinecap="round" />
      </svg>);

  }
  return null;
}

// ── GLIFOS DE RECURSO ───────────────────────────────────────────────────────
function ResourceGlyph({ kind }) {
  const s = 28;
  const stroke = 'var(--ink-3)';
  switch (kind) {
    case 'doc':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="3" width="16" height="22" rx="1" stroke={stroke} strokeWidth="0.8" />
          <line x1="9" y1="9" x2="19" y2="9" stroke={stroke} strokeWidth="0.5" />
          <line x1="9" y1="13" x2="19" y2="13" stroke={stroke} strokeWidth="0.5" />
          <line x1="9" y1="17" x2="15" y2="17" stroke={stroke} strokeWidth="0.5" />
        </svg>);

    case 'wave':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <line x1="6" y1="14" x2="6" y2="14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="9" x2="10" y2="19" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="6" x2="14" y2="22" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="10" x2="18" y2="18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="13" x2="22" y2="15" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>);

    case 'book':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M 4 6 L 14 8 L 24 6 L 24 22 L 14 24 L 4 22 Z" stroke={stroke} strokeWidth="0.8" />
          <line x1="14" y1="8" x2="14" y2="24" stroke={stroke} strokeWidth="0.5" />
        </svg>);

    case 'pen':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M 6 22 L 20 8 L 22 10 L 8 24 Z" stroke={stroke} strokeWidth="0.8" />
          <line x1="6" y1="22" x2="8" y2="24" stroke={stroke} strokeWidth="0.8" />
        </svg>);

    case 'play':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth="0.8" />
          <path d="M 12 10 L 18 14 L 12 18 Z" fill={stroke} />
        </svg>);

    default:return null;
  }
}

// ── PUNTO INDICADOR (en lugar de barra) ─────────────────────────────────────
function LevelPip({ level }) {
  const colors = {
    desequilibrio: 'var(--lvl-desequilibrio)',
    atencion: 'var(--lvl-atencion)',
    enCamino: 'var(--lvl-enCamino)',
    fortaleza: 'var(--lvl-fortaleza)'
  };
  return (
    <span style={{
      display: 'inline-block',
      width: 8, height: 8, borderRadius: '50%',
      background: colors[level] || 'var(--ink-4)'
    }} />);

}

Object.assign(window, { HCLogo, HCLockup, CoherenceRing, PillarField, PillarGlyph, ResourceGlyph, LevelPip });