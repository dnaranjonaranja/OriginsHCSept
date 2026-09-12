// screens-v5.jsx — Dimensional-inspired light theme

const W5 = 1280, H5 = 800;

function Chrome5({ url = 'humancomplex.app' }) {
  return (
    <div className="web-chrome">
      <div className="web-dots">
        <span className="web-dot" style={{ background: '#ff5f57' }}/>
        <span className="web-dot" style={{ background: '#febc2e' }}/>
        <span className="web-dot" style={{ background: '#28c840' }}/>
      </div>
      <div className="web-url">
        <span>◐</span><span>{url}</span>
      </div>
      <div style={{ width: 50 }}/>
    </div>
  );
}

// Dimensional-style chunky symbolic icons
const SymAsterisk = ({ size = 80, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <rect x="34" y="8" width="12" height="64" rx="2" fill={color}/>
    <rect x="8" y="34" width="64" height="12" rx="2" fill={color}/>
    <rect x="34" y="8" width="12" height="64" rx="2" fill={color} transform="rotate(45 40 40)"/>
    <rect x="34" y="8" width="12" height="64" rx="2" fill={color} transform="rotate(-45 40 40)"/>
  </svg>
);
const SymStar = ({ size = 80, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path d="M40 4 L44 32 L72 36 L48 44 L60 72 L40 52 L20 72 L32 44 L8 36 L36 32 Z" fill={color}/>
  </svg>
);
const SymTriangle = ({ size = 26, color = '#1c1a17' }) => (
  <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
    <path d="M13 4 L23 21 H3 Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="13" cy="16" r="1.6" fill={color}/>
  </svg>
);
const SymLayers = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 1 L14 4 L8 7 L2 4 Z" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M2 8 L8 11 L14 8" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M2 12 L8 15 L14 12" stroke={color} strokeWidth="1.2" fill="none"/>
  </svg>
);
const SymFlask = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M6 2 V6 L3 13 H13 L10 6 V2" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
    <line x1="5" y1="2" x2="11" y2="2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const SymAtom = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <ellipse cx="8" cy="8" rx="6" ry="2.5" stroke={color} strokeWidth="1.1"/>
    <ellipse cx="8" cy="8" rx="6" ry="2.5" stroke={color} strokeWidth="1.1" transform="rotate(60 8 8)"/>
    <ellipse cx="8" cy="8" rx="6" ry="2.5" stroke={color} strokeWidth="1.1" transform="rotate(-60 8 8)"/>
    <circle cx="8" cy="8" r="1.4" fill={color}/>
  </svg>
);
const SymPeople = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="5.5" cy="5.5" r="2" stroke={color} strokeWidth="1.2"/>
    <circle cx="10.5" cy="5.5" r="2" stroke={color} strokeWidth="1.2"/>
    <path d="M2 13 c0-2 1.5-3.5 3.5-3.5 s3.5 1.5 3.5 3.5" stroke={color} strokeWidth="1.2"/>
    <path d="M7 13 c0-2 1.5-3.5 3.5-3.5 s3.5 1.5 3.5 3.5" stroke={color} strokeWidth="1.2"/>
  </svg>
);
const SymHeart = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 13 C3 9 2 6 4 4 C6 2 8 4 8 5 C8 4 10 2 12 4 C14 6 13 9 8 13 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
);

// Donut motif
const Donut = ({ size = 240, color = '#d97742', innerColor = '#1c1a17' }) => (
  <svg width={size} height={size} viewBox="0 0 240 240">
    <circle cx="120" cy="120" r="100" fill={color}/>
    <circle cx="120" cy="120" r="22" fill={innerColor}/>
  </svg>
);

const Bars = ({ size = 200, colors = ['#9b7db5', '#a89db5', '#d89cb0', '#e8d088', '#b88860', '#d97742'] }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 200 140">
    {colors.map((c, i) => {
      const x = 30 + i * 24;
      return <rect key={i} x={x} y={20} width={18} height={100} rx={2} fill={c}/>;
    })}
  </svg>
);

function Brand5() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 10,
        background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <SymAsterisk size={16} color="var(--paper)"/>
      </div>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400,
        color: 'var(--ink)', letterSpacing: '-0.01em',
      }}>Human Complex</span>
    </div>
  );
}

function Sidenav5({ active = 'home' }) {
  const items = [
    { id: 'today',   label: 'Hoy',         icon: <SymAtom/> },
    { id: 'home',    label: 'Mi mapa',     icon: <SymLayers/> },
    { id: 'reflect', label: 'Reflexionar', icon: <SymFlask/> },
    { id: 'res',     label: 'Recursos',    icon: <SymPeople/> },
    { id: 'wins',    label: 'Logros',      icon: <SymHeart/> },
  ];
  return (
    <div className="sidenav">
      <div style={{ padding: '6px 10px 22px' }}><Brand5/></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it) => (
          <div key={it.id} className={`sidenav-item ${active === it.id ? 'active' : ''}`}>
            {it.icon}<span>{it.label}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', padding: '14px 10px 0', borderTop: '1px solid var(--rule)' }}>
        <div className="sidenav-item" style={{ padding: '6px 4px' }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)',
          }}>AL</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>Ana López</span>
            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Ver perfil</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING — "Mi Base" intro (Dimensional Primary Traits style, light)
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingV5() {
  return (
    <div className="web wash-warm">
      <Chrome5 url="humancomplex.app/inicio"/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 36px' }}>
          <button className="btn-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="mono" style={{ color: 'var(--ink-2)' }}>STEP 01 · 04</div>
          <button className="btn-text">Salir</button>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
          padding: '0 80px 40px', alignItems: 'center' }}>
          {/* Left: chunky symbol */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 360, height: 360, borderRadius: 36,
              background: 'linear-gradient(135deg, #5a8db8 0%, #d97742 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 24px 48px -16px rgba(28,26,23,0.20)',
            }}>
              <SymAsterisk size={140} color="#fff"/>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <h1 className="h-hero" style={{ fontSize: 72, marginBottom: 22 }}>Mi Base</h1>
            <p className="body" style={{ fontSize: 17, maxWidth: '40ch', marginBottom: 28, color: 'var(--ink-2)' }}>
              La medida más fundamental de quién eres. Explora cómo te habitas:
              autoconocimiento, regulación, cuerpo y energía.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
              <span className="mono-num" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-2)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                9 min
              </span>
              <span className="mono-num" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-2)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
                12 elementos
              </span>
            </div>

            <div className="mono" style={{ marginBottom: 14 }}>REQUERIDO PARA:</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 36 }}>
              {['Mi Propósito', 'Mi Conexión', 'Mi Impacto'].map((p) => (
                <div key={p} className="card-flush" style={{
                  width: 130, padding: '18px 14px', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', gap: 10,
                }}>
                  <div className="mono" style={{ fontSize: 10 }}>{p.split(' ')[1].toUpperCase()}</div>
                  <SymTriangle size={32} color="var(--ink-3)"/>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Sin completar</div>
                </div>
              ))}
            </div>

            <button className="btn-rect btn-rect-cream" style={{ width: 180 }}>Empezar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME — Dashboard with continue assessment + traits
// ═══════════════════════════════════════════════════════════════════════════
function HomeV5() {
  return (
    <div className="web wash-paper">
      <Chrome5 url="humancomplex.app/dashboard"/>
      <div style={{ flex: 1, display: 'flex' }}>
        <Sidenav5 active="home"/>
        <div className="scrollY" style={{ flex: 1 }}>
          {/* Top tabs */}
          <div style={{ padding: '20px 40px 0' }}>
            <div className="tabs">
              <div className="tab active"><span className="tab-icon"><SymLayers size={11} color="var(--ink)"/></span>SUMMARY</div>
              <div className="tab"><span className="tab-icon"><SymFlask size={11}/></span>DETAILS</div>
              <div className="tab"><span className="tab-icon"><SymAtom size={11}/></span>IDENTITY</div>
              <div className="tab"><span className="tab-icon"><SymPeople size={11}/></span>FRIENDS</div>
            </div>
          </div>

          <div style={{ padding: '32px 40px' }}>
            <div className="mono" style={{ marginBottom: 6 }}>CONTINUE ASSESSMENT</div>
            <h2 className="h-display" style={{ fontSize: 32, marginBottom: 28 }}>Cognitive Functions</h2>

            {/* Continue card — big gradient washed */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 32 }}>
              <div style={{
                height: 280, position: 'relative',
                background: 'radial-gradient(ellipse at 50% 50%, #c8b8d8 0%, #a8b8c8 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SymStar size={120} color="#fff"/>
              </div>
              <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 className="h-display" style={{ fontSize: 24, marginBottom: 6 }}>Funciones Cognitivas</h3>
                  <div className="mono-num" style={{ color: 'var(--ink-3)' }}>8 elementos | 7 minutos</div>
                </div>
                <button className="btn-rect">Continuar →</button>
              </div>
              {/* Trait dots row */}
              <div style={{ padding: '0 28px 24px', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {[
                  ['#5a8db8', 'Autoconocimiento'],
                  ['#e0c265', 'Regulación'],
                  ['#d89cb0', 'Cuerpo'],
                  ['#95b577', 'Claridad'],
                  ['#9b7db5', 'Sentido'],
                  ['#a4b4c8', 'Decisión'],
                  ['#7a5dae', 'Vínculos'],
                  ['#aedb98', 'Comunicación'],
                ].map(([c, label], i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 60 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', background: c,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--ink)' }}/>
                    </div>
                    <div className="mono-num" style={{ fontSize: 9.5, textAlign: 'center', lineHeight: 1.2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar grid */}
            <div className="mono" style={{ marginBottom: 14 }}>YOUR PILLARS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {[
                { name: 'Mi Base',      pct: 78, c: '#d97742', sym: <SymAsterisk size={36}/> },
                { name: 'Mi Propósito', pct: 64, c: '#9b7db5', sym: <SymStar size={36}/> },
                { name: 'Mi Conexión',  pct: 71, c: '#6fa897', sym: <SymStar size={36}/> },
                { name: 'Mi Impacto',   pct: 52, c: '#e0c265', sym: <SymAsterisk size={36}/> },
              ].map((p) => (
                <div key={p.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{
                    height: 110,
                    background: `radial-gradient(ellipse at 50% 50%, ${p.c}cc 0%, ${p.c}66 70%, ${p.c}22 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {React.cloneElement(p.sym, { color: '#fff' })}
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div className="h-display" style={{ fontSize: 17, marginBottom: 4 }}>{p.name}</div>
                    <div className="mono-num" style={{ fontSize: 11, color: 'var(--ink-3)' }}>SCORE · {p.pct}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL — Trait detail (Altruism-style summary)
// ═══════════════════════════════════════════════════════════════════════════
function DetailV5() {
  return (
    <div className="web wash-meadow">
      <Chrome5 url="humancomplex.app/trait/altruism"/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar with breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 36px' }}>
          <button className="btn-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 9 L7 5 L11 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#d97742', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)' }}/>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Altruismo</span>
          </div>
          <div className="btn-icon" style={{ background: 'transparent', border: 'none' }}>✓✓</div>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 36px' }}>
          <div className="tabs">
            <div className="tab active"><span className="tab-icon"><SymLayers size={11} color="var(--ink)"/></span>SUMMARY</div>
            <div className="tab"><span className="tab-icon"><SymFlask size={11}/></span>DETAILS</div>
            <div className="tab"><span className="tab-icon"><SymAtom size={11}/></span>IDENTITY</div>
            <div className="tab"><span className="tab-icon"><SymPeople size={11}/></span>FRIENDS</div>
          </div>
        </div>

        <div className="scrollY" style={{ flex: 1, padding: '36px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 36 }}>
            {/* Left: side icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, background: 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <SymAsterisk size={26} color="var(--paper)"/>
                </div>
                <div>
                  <div className="mono" style={{ marginBottom: 2 }}>PILLAR</div>
                  <div className="h-display" style={{ fontSize: 18 }}>Mi Conexión</div>
                </div>
              </div>

              <Donut size={260} color="#d97742"/>
            </div>

            {/* Right: name + description */}
            <div>
              <div className="mono" style={{ marginBottom: 8 }}>DIMENSIÓN · TRAIT</div>
              <h1 className="h-hero" style={{ fontSize: 64, marginBottom: 18 }}>Altruismo</h1>
              <p className="body" style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: '38ch', marginBottom: 32 }}>
                Preocupado por el bienestar de otros, dispuesto a ayudar a quienes te rodean.
                Lo entregas con generosidad y atención.
              </p>

              {/* Score row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(28,26,23,0.06)', border: '1px solid var(--rule)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)',
                }}>AL</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>Tú</span>
                    <span className="mono-num" style={{ color: 'var(--ink-2)' }}>score: 75 ✓✓</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(28,26,23,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: '75%', height: '100%', background: '#5a8db8', borderRadius: 4 }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats list (Dimensional-style mono) */}
          <div className="card" style={{ padding: 0 }}>
            {[
              { icon: '◐', label: 'Promedio de usuarios', val: '73' },
              { icon: '▲', label: 'Rango en la dimensión', val: '#2 de 35' },
              { icon: '✦', label: 'Reconocimientos', val: '0' },
              { icon: '◇', label: 'Coherencia con pilar', val: 'Alta' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: i < 3 ? '1px solid var(--rule)' : 'none',
                fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink)',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ color: 'var(--ink-3)', fontSize: 16 }}>{row.icon}</span>
                  {row.label}
                </span>
                <span style={{ color: 'var(--ink-2)' }}>{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom action bar */}
        <div style={{
          padding: '16px 36px',
          borderTop: '1px solid var(--rule)',
          background: 'var(--paper)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 10 L18 3 L11 18 L9 11 Z" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              <div className="mono" style={{ fontSize: 10 }}>MENSAJE</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 14 V3 M5 8 L10 3 L15 8" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14 V17 H17 V14" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className="mono" style={{ fontSize: 10 }}>COMPARTIR</div>
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>AL</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// IDENTITY — "Social Champion" archetype card style
// ═══════════════════════════════════════════════════════════════════════════
function IdentityV5() {
  return (
    <div className="web wash-dusk">
      <Chrome5 url="humancomplex.app/identity/social-champion"/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 36px' }}>
          <button className="btn-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bars size={32} colors={['#9b7db5', '#d89cb0', '#e0c265', '#d97742']}/>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Defensor Social</span>
          </div>
          <div className="btn-icon" style={{ background: 'transparent', border: 'none' }}>✓✓</div>
        </div>

        <div style={{ padding: '0 36px' }}>
          <div className="tabs">
            <div className="tab active"><span className="tab-icon"><SymLayers size={11} color="var(--ink)"/></span>SUMMARY</div>
            <div className="tab"><span className="tab-icon"><SymFlask size={11}/></span>DETAILS</div>
            <div className="tab"><span className="tab-icon"><SymAtom size={11}/></span>IDENTITY</div>
            <div className="tab"><span className="tab-icon"><SymHeart size={11}/></span>LOVE</div>
          </div>
        </div>

        <div className="scrollY" style={{ flex: 1, padding: '36px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
            {/* Left: bars illustration */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Bars size={320} colors={['#9b7db5', '#a89db5', '#d89cb0', '#e8d088', '#b88860', '#d97742']}/>
            </div>

            {/* Right: title + score */}
            <div>
              <div className="mono" style={{ marginBottom: 8 }}>ARQUETIPO · IDENTIDAD</div>
              <h1 className="h-hero" style={{ fontSize: 60, marginBottom: 16 }}>Defensor Social</h1>
              <p className="body" style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: '40ch', marginBottom: 28 }}>
                Altruista y cooperativo. Dedicas esfuerzo a mantener la cohesión del grupo
                y a sostener a quienes te rodean.
              </p>

              {/* Score with locked state */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: 'var(--blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                }}>AL</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>Tú</span>
                    <span className="mono-num" style={{ color: 'var(--ink-3)' }}>score: ?? ✓✓</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(28,26,23,0.08)', borderRadius: 4, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                      width: 18, height: 18, borderRadius: '50%', background: 'rgba(28,26,23,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: 'var(--ink-2)', fontFamily: 'var(--font-mono)',
                    }}>?</div>
                  </div>
                </div>
              </div>

              {/* Locked card */}
              <div style={{
                padding: '20px 22px', borderRadius: 14,
                border: '1px dashed var(--rule)',
                background: 'rgba(28,26,23,0.03)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.4 }}>
                    Debes completar <strong style={{ color: 'var(--ink)' }}>Valores</strong> para ver tu score.
                  </div>
                </div>
                <button className="btn-rect btn-rect-cream" style={{ height: 42, padding: '0 24px', fontSize: 14 }}>Ir →</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px 36px', borderTop: '1px solid var(--rule)', background: 'var(--paper)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 14 V3 M5 8 L10 3 L15 8" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 14 V17 H17 V14" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="mono" style={{ fontSize: 10 }}>COMPARTIR</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>AL</div>
        </div>
      </div>
    </div>
  );
}

function AppV5() {
  return (
    <div className="dc-host" style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'fixed', top: 18, left: 24, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink)', pointerEvents: 'none',
      }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SymAsterisk size={14} color="var(--paper)"/>
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400 }}>
          Human Complex
          <span style={{ color: 'var(--ink-3)', marginLeft: 8, fontSize: 13, fontFamily: 'var(--font-mono)' }}>v5 · Dimensional/Light</span>
        </span>
      </div>

      <DesignCanvas>
        <DCSection id="onboarding-v5" title="Onboarding · Mi Base intro" subtitle="Estilo Dimensional Primary Traits, fondo cálido">
          <DCArtboard id="ob-v5" label="Onboarding · Mi Base" width={W5} height={H5}>
            <OnboardingV5/>
          </DCArtboard>
        </DCSection>
        <DCSection id="home-v5" title="Dashboard · Continue assessment" subtitle="Tarjeta gradiente + grid de pilares">
          <DCArtboard id="home-v5" label="Dashboard" width={W5} height={H5}>
            <HomeV5/>
          </DCArtboard>
        </DCSection>
        <DCSection id="trait-v5" title="Trait · Altruismo" subtitle="Detalle de dimensión con donut + stats mono">
          <DCArtboard id="det-v5" label="Trait · Altruismo" width={W5} height={H5}>
            <DetailV5/>
          </DCArtboard>
        </DCSection>
        <DCSection id="identity-v5" title="Identity · Defensor Social" subtitle="Arquetipo con barras + locked state">
          <DCArtboard id="id-v5" label="Identity · Defensor Social" width={W5} height={H5}>
            <IdentityV5/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppV5/>);
