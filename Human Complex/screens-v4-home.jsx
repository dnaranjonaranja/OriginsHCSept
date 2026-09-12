// screens-v4-home.jsx — Cream/warm home (3 variantes)

function SideNavV4({ active = 'home', tone = 'light' }) {
  const items = [
    { id: 'today',   label: 'Hoy',          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg> },
    { id: 'home',    label: 'Mi mapa',      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8 L8 3 L14 8 V14 H10 V10 H6 V14 H2 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill={active === 'home' ? 'currentColor' : 'none'} fillOpacity={active === 'home' ? 0.18 : 0}/></svg> },
    { id: 'reflect', label: 'Reflexionar',  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5 L8 2 L14 5 V11 L8 14 L2 11 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
    { id: 'res',     label: 'Recursos',     icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.4"/><line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2"/><line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2"/></svg> },
    { id: 'wins',    label: 'Logros',       icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 3 H12 V6 A4 4 0 014 6 V3 Z M8 10 V13 M5 14 H11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
  ];
  const isDark = tone === 'dark';
  return (
    <div className="sidenav" style={isDark ? {
      background: '#0f1218', borderRight: '1px solid rgba(255,255,255,0.06)',
    } : {}}>
      <div style={{ padding: '6px 10px 22px' }}>
        <BrandV4 tone={isDark ? 'light' : 'dark'}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <div key={it.id} className={`sidenav-item ${isActive ? 'active' : ''}`}
              style={isDark ? {
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
              } : {}}>
              {it.icon}
              <span>{it.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 'auto', padding: '14px 10px 0',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(26,29,36,0.06)' }}>
        <div className="sidenav-item" style={{ padding: '6px 4px', ...(isDark ? { color: 'rgba(255,255,255,0.7)' } : {}) }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff5d8f, #ffa17a)',
          }}/>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: isDark ? '#fff' : 'var(--slate-900)' }}>Ana López</span>
            <span style={{ fontSize: 11, color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--slate-500)' }}>Ver perfil</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME A · Cream, mixed cards (peach/pink/dark accent)
// ═══════════════════════════════════════════════════════════════════════════
function HomeA_v4() {
  return (
    <div className="web bg-cream">
      <Blob color="#ffd4e1" size={700} top={-280} opacity={0.6}/>
      <WebChromeV4 url="humancomplex.app/hoy"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNavV4 active="today"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Mar 14 · Enero · 9:41</div>
              <h1 className="h-hero" style={{ fontSize: 48 }}>
                Buen día, <span className="h-accent">Ana.</span>
              </h1>
              <p className="body" style={{ fontSize: 16, maxWidth: '48ch', marginTop: 8 }}>
                Aquí está cómo se ve tu sistema interno hoy.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-round">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="btn-round">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="1" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1" fill="currentColor"/>
                  <circle cx="8" cy="13" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Top stat row — mix of card styles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div className="card-pink" style={{ padding: '26px 28px', position: 'relative', overflow: 'hidden' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
                <circle cx="40" cy="40" r="30" fill="none" stroke="#1a1d24" strokeWidth="1.5"/>
                <circle cx="40" cy="40" r="18" fill="none" stroke="#ff5d8f" strokeWidth="1.5"/>
                <circle cx="40" cy="40" r="6" fill="#1a1d24"/>
              </svg>
              <div className="eyebrow" style={{ marginBottom: 14, color: '#b8395f' }}>Coherencia</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 72, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--slate-900)' }}>72</span>
                <span style={{ fontSize: 18, color: 'var(--slate-500)' }}>%</span>
              </div>
              <div className="tag tag-mint" style={{ marginTop: 14 }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                +4 vs ayer
              </div>
            </div>

            <div className="card" style={{ padding: '22px 24px' }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Pilar fuerte</div>
              <div className="h-display" style={{ fontSize: 26, marginBottom: 10 }}>Mi Base</div>
              <div className="label" style={{ fontSize: 13, lineHeight: 1.5 }}>
                Autoconocimiento en fortaleza.
              </div>
            </div>

            <div className="card-dark" style={{ padding: '22px 24px' }}>
              <div className="eyebrow" style={{ marginBottom: 12, color: 'rgba(255,255,255,0.55)' }}>Atención</div>
              <div className="h-display" style={{ fontSize: 26, marginBottom: 10, color: '#fff' }}>Mi Impacto</div>
              <div className="label" style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.7)' }}>
                Decisión + acción están bajas.
              </div>
            </div>
          </div>

          {/* Pause CTA card */}
          <div className="card" style={{
            padding: '20px 24px', marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <div className="card-peach" style={{
              width: 56, height: 56, borderRadius: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              border: 'none',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#1a1d24" strokeWidth="1.6"/>
                <path d="M11 6v5l4 2" stroke="#1a1d24" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="h-display" style={{ fontSize: 18, marginBottom: 4 }}>Pausa de 3 minutos</div>
              <div className="label" style={{ fontSize: 13 }}>Recomendado para ti hoy · Regulación emocional</div>
            </div>
            <button className="btn-pill btn-pill-pink" style={{ height: 42, padding: '0 20px', fontSize: 13.5 }}>Empezar →</button>
          </div>

          {/* Reflection cards */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h3 className="h-display" style={{ fontSize: 22 }}>Reflexiones</h3>
            <span className="eyebrow">VER TODAS · 12</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { cls: 'card-pink', t: 'Volver a ti', s: 'Regulación · 3 min', emoji: '◐' },
              { cls: 'card-lavender', t: 'Lo no dicho', s: 'Conexión · 4 min', emoji: '◑' },
              { cls: 'card-mint', t: 'El siguiente paso', s: 'Propósito · 5 min', emoji: '◒' },
            ].map((card, i) => (
              <div key={i} className={card.cls} style={{
                height: 170, padding: '22px 22px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: 32, color: 'var(--slate-900)', opacity: 0.4 }}>{card.emoji}</div>
                <div>
                  <div className="h-display" style={{ fontSize: 20, marginBottom: 4 }}>{card.t}</div>
                  <div className="label" style={{ fontSize: 12, color: 'var(--slate-700)' }}>{card.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME B · Big number + pillar bars (paper, dark accents)
// ═══════════════════════════════════════════════════════════════════════════
function HomeB_v4() {
  const pillars = [
    { name: 'Mi Base',      pct: 78, color: '#ff5d8f', level: 'Fortaleza' },
    { name: 'Mi Propósito', pct: 64, color: '#b89cf5', level: 'En camino' },
    { name: 'Mi Conexión',  pct: 71, color: '#6dd6b1', level: 'En camino' },
    { name: 'Mi Impacto',   pct: 52, color: '#ffa17a', level: 'Atención' },
  ];
  return (
    <div className="web bg-paper">
      <WebChromeV4 url="humancomplex.app/mapa"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNavV4 active="home"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'center', marginBottom: 36 }}>
            {/* Hero number */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Coherencia hoy</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 184, lineHeight: 0.9, letterSpacing: '-0.05em',
                color: 'var(--slate-900)', marginBottom: 12,
              }}>
                66<span style={{ color: '#ff5d8f' }}>.</span>
              </div>
              <div className="tag tag-pink" style={{ marginBottom: 16 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
                EN CAMINO
              </div>
              <p className="body" style={{ fontSize: 17, maxWidth: '38ch', color: 'var(--slate-700)' }}>
                Reconoces lo que sientes, pero te cuesta sostenerlo en acción.
                Tomas buenas decisiones, pero no siempre las llevas hasta el final.
              </p>
            </div>

            {/* Pillar bars */}
            <div className="card" style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
                <div className="h-display" style={{ fontSize: 18 }}>Tus pilares</div>
                <button className="btn-text" style={{ padding: 0, fontSize: 12 }}>Ver mapa →</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {pillars.map((p) => (
                  <div key={p.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: 'var(--slate-900)', fontWeight: 500 }}>{p.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--slate-500)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.level} · {p.pct}%</span>
                    </div>
                    <div style={{ height: 8, background: 'var(--cream-2)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        width: `${p.pct}%`, height: '100%', background: p.color,
                        borderRadius: 4,
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            {[
              ['RACHA', '7', 'días', 'card-pink'],
              ['SESIONES', '23', 'totales', 'card-soft'],
              ['MINUTOS', '142', 'reflexión', 'card-mint'],
              ['ÚLTIMA', 'Ayer', '8:42 PM', 'card-soft'],
            ].map(([k, v, sub, cls], i) => (
              <div key={i} className={cls} style={{ padding: '20px 22px' }}>
                <div className="eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>{k}</div>
                <div className="value-big">{v}</div>
                <div className="label" style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-pill btn-pill-pink">Empezar reflexión diaria →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME C · Editorial — pregunta del día + dimensiones
// ═══════════════════════════════════════════════════════════════════════════
function HomeC_v4() {
  const dimensions = [
    { name: 'Autoconocimiento', pillar: 'Base',      level: 'Fortaleza',  color: '#ff5d8f' },
    { name: 'Regulación',        pillar: 'Base',      level: 'En camino',  color: '#ff5d8f' },
    { name: 'Cuerpo y energía',  pillar: 'Base',      level: 'En camino',  color: '#ff5d8f' },
    { name: 'Claridad',          pillar: 'Propósito', level: 'En camino',  color: '#b89cf5' },
    { name: 'Sentido',           pillar: 'Propósito', level: 'Fortaleza',  color: '#b89cf5' },
    { name: 'Decisión',          pillar: 'Propósito', level: 'Atención',   color: '#b89cf5' },
    { name: 'Vínculos',          pillar: 'Conexión',  level: 'En camino',  color: '#6dd6b1' },
    { name: 'Comunicación',      pillar: 'Conexión',  level: 'Fortaleza',  color: '#6dd6b1' },
  ];
  return (
    <div className="web bg-warm-pink">
      <Blob color="#ffd4e1" size={700} top={-220} opacity={0.7}/>
      <WebChromeV4 url="humancomplex.app/inicio"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNavV4 active="today"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Mar 14 · Enero</div>
              <h1 className="h-hero" style={{ fontSize: 56 }}>
                Buen día,<br/>
                <span className="h-accent">Ana.</span>
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost-pill">Configurar</button>
            </div>
          </div>

          {/* Quote hero */}
          <div className="card-pink" style={{ padding: '40px 44px', marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', top: -10, right: 30, opacity: 0.4 }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1d24" strokeWidth="2"/>
              <circle cx="60" cy="60" r="30" fill="none" stroke="#1a1d24" strokeWidth="2"/>
              <circle cx="60" cy="60" r="10" fill="#1a1d24"/>
            </svg>
            <div className="eyebrow" style={{ marginBottom: 14, color: '#b8395f' }}>
              Pregunta del día
            </div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 36, lineHeight: 1.15, color: 'var(--slate-900)',
              margin: 0, letterSpacing: '-0.025em', maxWidth: '24ch',
            }}>
              ¿Qué necesitarías para volver a ti más rápido cuando te pierdes?
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
              <button className="btn-pill" style={{ height: 44, padding: '0 22px', fontSize: 14 }}>Reflexionar · 3 min</button>
              <button className="btn-text">Saltar hoy</button>
            </div>
          </div>

          {/* Mini stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
            {[
              ['Racha', '7 días'],
              ['Coherencia', '72%'],
              ['Sesiones', '23'],
              ['Última pausa', 'Ayer'],
            ].map(([k, v], i) => (
              <div key={i} className="card" style={{ padding: '16px 18px' }}>
                <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10 }}>{k}</div>
                <div className="value-big" style={{ fontSize: 22 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Dimensions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <h3 className="h-display" style={{ fontSize: 22 }}>Tus dimensiones</h3>
            <span className="eyebrow">12 EN TOTAL</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {dimensions.map((d) => (
              <div key={d.name} className="card" style={{ padding: '18px 18px', cursor: 'pointer' }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: d.color, marginBottom: 14,
                }}/>
                <div style={{ fontSize: 14, color: 'var(--slate-900)', fontWeight: 500, marginBottom: 4 }}>{d.name}</div>
                <div className="label" style={{ fontSize: 11 }}>{d.pillar} · {d.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeA_v4, HomeB_v4, HomeC_v4, SideNavV4 });
