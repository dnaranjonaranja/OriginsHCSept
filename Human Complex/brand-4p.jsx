// brand.jsx — Sistema visual de 4P
// Mark: asterisco compuesto por 4 trazos, uno por pilar.
//   ↑ vertical  → Mi Base       (naranja)
//   → horizontal→ Mi Propósito  (púrpura)
//   ↘ diagonal  → Mi Conexión   (verde)
//   ↙ diagonal  → Mi Impacto    (amarillo)
// Cada trazo se usa también como ícono individual del pilar.

const PILLAR_INK = {
  base: '#9c5029',
  proposito: '#3f5680',
  conexion: '#3d6b46',
  impacto: '#7a4a84'
};

const PILLAR_COLORS = {
  base: '#dc8763',
  proposito: '#7f8fb3',
  conexion: '#95b095',
  impacto: '#c19bc7'
};

// ── MARK PRINCIPAL ──────────────────────────────────────────────────────────
// El asterisco 4P — los 4 trazos juntos. Opcionalmente con fondo navy.
function HCLogo({ size = 32, withCard = false, mono = false, color }) {
  const c = mono ? color || 'currentColor' : null;
  const fillBase = mono ? c : PILLAR_COLORS.base;
  const fillProp = mono ? c : PILLAR_COLORS.proposito;
  const fillCon = mono ? c : PILLAR_COLORS.conexion;
  const fillImp = mono ? c : PILLAR_COLORS.impacto;

  const mark =
  <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: 'block' }}>
      {/* Horizontal → Propósito (púrpura, capa inferior) */}
      <rect x="8" y="34" width="64" height="12" rx="2.5" fill={fillProp} />
      {/* Diagonal ↘ → Conexión (verde) */}
      <rect x="34" y="8" width="12" height="64" rx="2.5" fill={fillCon} transform="rotate(45 40 40)" />
      {/* Diagonal ↙ → Impacto (amarillo) */}
      <rect x="34" y="8" width="12" height="64" rx="2.5" fill={fillImp} transform="rotate(-45 40 40)" />
      {/* Vertical → Base (naranja, capa superior) */}
      <rect x="34" y="8" width="12" height="64" rx="2.5" fill={fillBase} />
    </svg>;


  if (!withCard) return mark;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size * 1.5, height: size * 1.5,
      background: '#0f1b2e', borderRadius: size * 0.32
    }}>
      <span style={{ width: size, height: size }}>{mark}</span>
    </span>);

}

// ── LOCKUP DE MARCA (logo + 4P + by Human Complex — horizontal) ────────────
// Usa los archivos de logo final entregados por Human Complex, sin contenedor.
// `dark` = versión para fondos oscuros/navy; variante clara por defecto.
function HCLockup({ size = 44, dark = false }) {
  const src = dark ? 'assets/origins-logo-dark.svg' : 'assets/origins-logo.svg';
  return <img src={src} alt="Origins by Human Complex" style={{ height: size * 0.82, width: 'auto', display: 'block' }} />;
}

// ── PILLAR GLYPH — el trazo individual del pilar, en su color ──────────────
// Cada glyph es UNA línea del asterisco, en el color del pilar.
function PillarGlyph({ pillar, size = 24, on = true, withinAsterisk = false }) {
  const c = PILLAR_COLORS[pillar] || 'currentColor';
  const dim = on ? 1 : 0.20;
  const w = withinAsterisk ? 12 : 14;

  const stroke = (() => {
    switch (pillar) {
      case 'base': // vertical
        return <rect x={(80 - w) / 2} y="8" width={w} height="64" rx="2.5" fill={c} />;
      case 'proposito': // horizontal
        return <rect x="8" y={(80 - w) / 2} width="64" height={w} rx="2.5" fill={c} />;
      case 'conexion': // diagonal ↘
        return <rect x={(80 - w) / 2} y="8" width={w} height="64" rx="2.5" fill={c} transform="rotate(45 40 40)" />;
      case 'impacto': // diagonal ↙
        return <rect x={(80 - w) / 2} y="8" width={w} height="64" rx="2.5" fill={c} transform="rotate(-45 40 40)" />;
      default:
        return null;
    }
  })();

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: 'block', opacity: dim, transition: 'opacity 280ms ease' }}>
      {stroke}
    </svg>);

}

// ── ASTERISCO INTERACTIVO ───────────────────────────────────────────────────
// Mark grande que se "ilumina" según los pilares activos.
function PillarAsterisk({ active = ['base', 'proposito', 'conexion', 'impacto'], size = 280, onClickPillar }) {
  const isOn = (p) => active.includes(p);
  const strokeFor = (p) => isOn(p) ? PILLAR_COLORS[p] : 'rgba(255,255,255,0.08)';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: 'block' }}>
      <rect
        x="8" y="34" width="64" height="12" rx="2.5"
        fill={strokeFor('proposito')}
        style={{ cursor: onClickPillar ? 'pointer' : 'default', transition: 'fill 320ms ease' }}
        onClick={() => onClickPillar && onClickPillar('proposito')} />
      
      <rect
        x="34" y="8" width="12" height="64" rx="2.5"
        fill={strokeFor('conexion')} transform="rotate(45 40 40)"
        style={{ cursor: onClickPillar ? 'pointer' : 'default', transition: 'fill 320ms ease' }}
        onClick={() => onClickPillar && onClickPillar('conexion')} />
      
      <rect
        x="34" y="8" width="12" height="64" rx="2.5"
        fill={strokeFor('impacto')} transform="rotate(-45 40 40)"
        style={{ cursor: onClickPillar ? 'pointer' : 'default', transition: 'fill 320ms ease' }}
        onClick={() => onClickPillar && onClickPillar('impacto')} />
      
      <rect
        x="34" y="8" width="12" height="64" rx="2.5"
        fill={strokeFor('base')}
        style={{ cursor: onClickPillar ? 'pointer' : 'default', transition: 'fill 320ms ease' }}
        onClick={() => onClickPillar && onClickPillar('base')} />
      
    </svg>);

}

// ── ANILLO DE COHERENCIA ────────────────────────────────────────────────────
function CoherenceRing({ level, color, size = 72, strokeWidth = 5, label }) {
  const fillByLevel = { desequilibrio: 0.18, atencion: 0.42, enCamino: 0.68, fortaleza: 0.92 };
  const fill = fillByLevel[level] || 0.5;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * fill;
  const ringColor = color || 'var(--amber)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r}
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
        fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500,
        color: 'var(--ink-2)', letterSpacing: '-0.01em'
      }}>{label}</div>
      }
    </div>);

}

// ── CAMPO DE 4 PILARES (radar suavizado) ────────────────────────────────────
function PillarField({ states, size = 320 }) {
  const half = size / 2;
  const r = half - 72;
  // base = top (vertical), proposito = right (horizontal), conexion = SE diagonal, impacto = SW diagonal
  // Para mostrarlos en las direcciones de sus trazos:
  const angles = [-Math.PI / 2, 0, Math.PI / 4, 3 * Math.PI / 4];
  const pillars = ['base', 'proposito', 'conexion', 'impacto'];
  const labels = ['Mi Base', 'Mi Propósito', 'Mi Conexión', 'Mi Impacto'];
  const colors = [PILLAR_COLORS.base, PILLAR_COLORS.proposito, PILLAR_COLORS.conexion, PILLAR_COLORS.impacto];

  const valByLevel = { desequilibrio: 0.30, atencion: 0.52, enCamino: 0.76, fortaleza: 0.96 };

  const pts = pillars.map((p, i) => {
    const v = valByLevel[states[p]?.level || 'enCamino'];
    return {
      x: half + Math.cos(angles[i]) * r * v,
      y: half + Math.sin(angles[i]) * r * v
    };
  });

  const path = `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y} L ${pts[3].x} ${pts[3].y} Z`;
  const inkColors = ['var(--p-base-ink)', 'var(--p-proposito-ink)', 'var(--p-conexion-ink)', 'var(--p-impacto-ink)'];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', overflow: 'visible' }}
    role="img" aria-label="Mapa de los cuatro pilares">
      <defs>
        {pts.map((p, i) => {
          const q = pts[(i + 1) % 4];
          return (
            <linearGradient key={'g' + i} id={`hc-wedge-${i}`} gradientUnits="userSpaceOnUse"
            x1={p.x} y1={p.y} x2={q.x} y2={q.y}>
              <stop offset="0%" stopColor={colors[i]} />
              <stop offset="100%" stopColor={colors[(i + 1) % 4]} />
            </linearGradient>);

        })}
      </defs>
      {/* Bandas concéntricas alternadas → dan contraste para leer los anillos */}
      {[1.0, 0.80, 0.55, 0.30].map((rr, i) =>
      <circle key={'band' + i} cx={half} cy={half} r={r * rr}
      fill={i % 2 === 0 ? 'var(--line-soft)' : 'var(--bg)'} />
      )}
      {[0.30, 0.55, 0.80, 1.0].map((rr, i) =>
      <circle key={'ring' + i} cx={half} cy={half} r={r * rr} fill="none"
      stroke="var(--ink-4)" strokeWidth={i === 3 ? 1.3 : 0.9}
      strokeOpacity={0.40 + i * 0.12} />
      )}
      {angles.map((a, i) =>
      <line key={i}
      x1={half} y1={half}
      x2={half + Math.cos(a) * r}
      y2={half + Math.sin(a) * r}
      stroke="var(--ink-4)" strokeWidth="0.9" strokeOpacity="0.45" />
      )}
      {/* Área en color pleno de marca: 4 cuñas, una por par de pilares */}
      {pts.map((p, i) => {
        const q = pts[(i + 1) % 4];
        return (
          <path key={'w' + i}
          d={`M ${half} ${half} L ${p.x} ${p.y} L ${q.x} ${q.y} Z`}
          fill={`url(#hc-wedge-${i})`} />);

      })}
      <path d={path} fill="none" stroke="var(--bg)" strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((p, i) =>
      <circle key={i} cx={p.x} cy={p.y} r="7" fill={colors[i]}
      stroke="var(--bg)" strokeWidth="2.5" />
      )}
      {pillars.map((p, i) => {
        const lx = half + Math.cos(angles[i]) * (r + 34);
        const ly = half + Math.sin(angles[i]) * (r + 34);
        return (
          <text key={p} x={lx} y={ly}
          textAnchor="middle" dominantBaseline="middle"
          fill={inkColors[i]} fontSize="13.5" fontWeight="700"
          fontFamily="var(--font-ui)"
          letterSpacing="0.16em"
          style={{ textTransform: 'uppercase' }}>
            {labels[i]}
          </text>);

      })}
    </svg>);

}

// ── GLIFOS DE RECURSO ───────────────────────────────────────────────────────
function ResourceGlyph({ kind, color = 'var(--ink-3)' }) {
  const s = 36;
  switch (kind) {
    case 'doc':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <rect x="6" y="3" width="16" height="22" rx="1" stroke={color} strokeWidth="0.8" />
          <line x1="9" y1="9" x2="19" y2="9" stroke={color} strokeWidth="0.5" />
          <line x1="9" y1="13" x2="19" y2="13" stroke={color} strokeWidth="0.5" />
          <line x1="9" y1="17" x2="15" y2="17" stroke={color} strokeWidth="0.5" />
        </svg>);
    case 'wave':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <line x1="6" y1="14" x2="6" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="9" x2="10" y2="19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="6" x2="14" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="10" x2="18" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="13" x2="22" y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>);
    case 'book':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M 4 6 L 14 8 L 24 6 L 24 22 L 14 24 L 4 22 Z" stroke={color} strokeWidth="0.8" />
          <line x1="14" y1="8" x2="14" y2="24" stroke={color} strokeWidth="0.5" />
        </svg>);
    case 'pen':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <path d="M 6 22 L 20 8 L 22 10 L 8 24 Z" stroke={color} strokeWidth="0.8" />
          <line x1="6" y1="22" x2="8" y2="24" stroke={color} strokeWidth="0.8" />
        </svg>);
    case 'play':
      return (
        <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="0.8" />
          <path d="M 12 10 L 18 14 L 12 18 Z" fill={color} />
        </svg>);
    default:return null;
  }
}

// ── PUNTO INDICADOR ─────────────────────────────────────────────────────────
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
      width: 10, height: 10, borderRadius: '50%',
      background: colors[level] || 'var(--ink-4)'
    }} />);

}

// ── PILLAR ROW (con trazo del logo + nombre) ────────────────────────────────
function PillarRow({ pillar, children, size = 28 }) {
  return (
    <span className="row" style={{ alignItems: 'center', gap: 12, color: 'var(--ink-3)' }}>
      <PillarGlyph pillar={pillar} size={size} />
      <span style={{
        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: PILLAR_COLORS[pillar]
      }}>{children}</span>
    </span>);

}

Object.assign(window, {
  HCLogo, HCLockup, CoherenceRing, PillarField,
  PillarGlyph, PillarAsterisk, ResourceGlyph, LevelPip, PillarRow,
  PILLAR_COLORS, PILLAR_INK
});