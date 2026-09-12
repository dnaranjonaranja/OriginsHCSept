// brand-v2.jsx — Sistema visual modernizado.
// Logo: 4 cuadrantes en grid, no círculos. Más editorial-tech.

// ── LOGO ────────────────────────────────────────────────────────────────────
function HCLogo({ size = 28, color }) {
  const c = color || 'currentColor';
  const accent = 'var(--accent)';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}>
      {/* Marco */}
      <rect x="2" y="2" width="28" height="28" rx="6" stroke={c} strokeWidth="1.4" />
      {/* Cuatro cuadrantes representando los 4 pilares */}
      <line x1="16" y1="6" x2="16" y2="26" stroke={c} strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="16" x2="26" y2="16" stroke={c} strokeWidth="1" opacity="0.4" />
      {/* Punto central — coherencia */}
      <circle cx="16" cy="16" r="2.4" fill={accent} />
    </svg>
  );
}

// ── LOCKUP ──────────────────────────────────────────────────────────────────
function HCLockup() {
  return (
    <span className="topbar-brand">
      <HCLogo size={22} />
      <span style={{ fontWeight: 600 }}>Human Complex</span>
    </span>
  );
}

// ── ANILLO DE NIVEL (más moderno) ───────────────────────────────────────────
function CoherenceRing({ level, color, size = 72, strokeWidth = 4, label }) {
  const fillByLevel = {
    desequilibrio: 0.18,
    atencion: 0.42,
    enCamino: 0.68,
    fortaleza: 0.92,
  };
  const fill = fillByLevel[level] || 0.5;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * fill;
  const ringColor = color || 'var(--accent)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="var(--line)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={ringColor} strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${c - dash}`}
          strokeDashoffset={c * 0.25}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      {label && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 12,
          color: 'var(--ink-2)', letterSpacing: '-0.005em',
          fontWeight: 500,
        }}>{label}</div>
      )}
    </div>
  );
}

// ── PILLAR FIELD — versión barras horizontales (más moderno que radar) ─────
function PillarField({ states, size = 280 }) {
  const pillars = ['base', 'proposito', 'conexion', 'impacto'];
  const labels = { base: 'Mi Base', proposito: 'Mi Propósito', conexion: 'Mi Conexión', impacto: 'Mi Impacto' };
  const colors = {
    base: 'var(--p-base)',
    proposito: 'var(--p-proposito)',
    conexion: 'var(--p-conexion)',
    impacto: 'var(--p-impacto)',
  };
  const valByLevel = { desequilibrio: 0.22, atencion: 0.48, enCamino: 0.74, fortaleza: 0.94 };
  const levelLabel = { desequilibrio: 'Desequilibrio', atencion: 'Atención', enCamino: 'En camino', fortaleza: 'Fortaleza' };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {pillars.map((p) => {
        const lv = states[p]?.level || 'enCamino';
        const v = valByLevel[lv];
        return (
          <div key={p}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'var(--ink-2)', fontWeight: 500,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 2,
                  background: colors[p] }} />
                {labels[p]}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--ink-3)', letterSpacing: '0.02em',
              }}>{levelLabel[lv]}</span>
            </div>
            <div style={{
              height: 6, background: 'var(--bg-elev)',
              borderRadius: 3, overflow: 'hidden',
              border: '1px solid var(--line-soft)',
            }}>
              <div style={{
                width: `${v * 100}%`, height: '100%',
                background: colors[p],
                borderRadius: 3,
                transition: 'width 600ms cubic-bezier(0.2, 0.6, 0.2, 1)',
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── PILLAR GLYPH (cuadrados redondeados, no círculos) ──────────────────────
function PillarGlyph({ pillar, size = 14 }) {
  const c = `var(--p-${pillar})`;
  // Cada pilar es un cuadrado con un patrón geométrico distinto
  if (pillar === 'base') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14">
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" fill="none" stroke={c} strokeWidth="1.2" />
        <rect x="5" y="5" width="4" height="4" rx="1" fill={c} />
      </svg>);
  }
  if (pillar === 'proposito') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14">
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" fill="none" stroke={c} strokeWidth="1.2" />
        <path d="M 4 9 L 7 4 L 10 9 Z" fill={c} />
      </svg>);
  }
  if (pillar === 'conexion') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14">
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" fill={c} opacity="0.18" />
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" fill="none" stroke={c} strokeWidth="1.2" />
      </svg>);
  }
  if (pillar === 'impacto') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14">
        <rect x="1.5" y="1.5" width="11" height="11" rx="2" fill="none" stroke={c} strokeWidth="1.2" />
        <path d="M 4 7 L 10 7 M 7.5 4.5 L 10 7 L 7.5 9.5"
          stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>);
  }
  return null;
}

// ── RESOURCE GLYPHS (más sólidos) ───────────────────────────────────────────
function ResourceGlyph({ kind }) {
  const s = 32;
  const stroke = 'var(--ink-2)';
  switch (kind) {
    case 'doc':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <rect x="7" y="4" width="18" height="24" rx="2" stroke={stroke} strokeWidth="1.3" />
          <line x1="11" y1="11" x2="21" y2="11" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
          <line x1="11" y1="16" x2="21" y2="16" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
          <line x1="11" y1="21" x2="17" y2="21" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
        </svg>);
    case 'wave':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <line x1="7" y1="16" x2="7" y2="16" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="11" y1="11" x2="11" y2="21" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="6" x2="16" y2="26" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="11" x2="21" y2="21" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="14" x2="25" y2="18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>);
    case 'book':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <path d="M 5 7 L 16 9 L 27 7 L 27 25 L 16 27 L 5 25 Z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
          <line x1="16" y1="9" x2="16" y2="27" stroke={stroke} strokeWidth="1.1" />
        </svg>);
    case 'pen':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <path d="M 7 25 L 22 10 L 25 13 L 10 28 Z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M 7 25 L 10 28" stroke={stroke} strokeWidth="1.3" />
          <path d="M 19 13 L 22 16" stroke={stroke} strokeWidth="1.1" />
        </svg>);
    case 'play':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11" stroke={stroke} strokeWidth="1.3" />
          <path d="M 14 12 L 21 16 L 14 20 Z" fill={stroke} />
        </svg>);
    default: return null;
  }
}

// ── LEVEL PIP ───────────────────────────────────────────────────────────────
function LevelPip({ level }) {
  const colors = {
    desequilibrio: 'var(--lvl-desequilibrio)',
    atencion: 'var(--lvl-atencion)',
    enCamino: 'var(--lvl-enCamino)',
    fortaleza: 'var(--lvl-fortaleza)',
  };
  return (
    <span style={{
      display: 'inline-block',
      width: 8, height: 8, borderRadius: 2,
      background: colors[level] || 'var(--ink-4)',
    }} />
  );
}

// ── PILLAR CHIP ─────────────────────────────────────────────────────────────
function PillarChip({ pillar, size = 11 }) {
  const p = PILLARS.find((x) => x.id === pillar);
  if (!p) return null;
  return (
    <span className="pillar-chip" style={{ '--pillar-color': `var(--p-${pillar})` }}>
      <span className="pillar-dot" />
      {p.name}
    </span>
  );
}

Object.assign(window, { HCLogo, HCLockup, CoherenceRing, PillarField, PillarGlyph, ResourceGlyph, LevelPip, PillarChip });
