// screens-v3-home.jsx — DESKTOP home (3 variantes)

function SideNav({ active = 'home' }) {
  const items = [
    { id: 'today',   label: 'Hoy',          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg> },
    { id: 'home',    label: 'Mi mapa',      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8 L8 3 L14 8 V14 H10 V10 H6 V14 H2 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill={active === 'home' ? 'currentColor' : 'none'} fillOpacity={active === 'home' ? 0.18 : 0}/></svg> },
    { id: 'reflect', label: 'Reflexionar',  icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5 L8 2 L14 5 V11 L8 14 L2 11 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
    { id: 'res',     label: 'Recursos',     icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.4"/><line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2"/><line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2"/></svg> },
    { id: 'wins',    label: 'Logros',       icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 3 H12 V6 A4 4 0 014 6 V3 Z M8 10 V13 M5 14 H11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
  ];
  return (
    <div className="sidenav">
      <div style={{ padding: '6px 10px 22px' }}>
        <Brand/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it) => (
          <div key={it.id} className={`sidenav-item ${active === it.id ? 'active' : ''}`}>
            {it.icon}
            <span>{it.label}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', padding: '14px 10px 0', borderTop: '1px solid oklch(1 0 0 / 0.06)' }}>
        <div className="sidenav-item" style={{ padding: '6px 4px' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, oklch(0.65 0.14 260), oklch(0.40 0.10 260))',
            border: '1px solid oklch(1 0 0 / 0.20)',
          }}/>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>Ana López</span>
            <span style={{ fontSize: 11, color: 'oklch(1 0 0 / 0.45)' }}>Ver perfil</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME A · Glass pair (Sleep Mode style adapted to desktop)
// ═══════════════════════════════════════════════════════════════════════════
function HomeA() {
  return (
    <div className="web bg-night">
      <GlowBlob color="oklch(0.55 0.20 260)" size={900} top={-360} opacity={0.5}/>
      <WebChrome url="humancomplex.app/hoy"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNav active="today"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Mar 14 · Enero · 9:41</div>
              <h1 className="h-hero" style={{ fontSize: 52 }}>
                Buen día, <em className="h-italic" style={{ color: 'oklch(0.85 0.12 260)' }}>Ana.</em>
              </h1>
              <p className="body" style={{ fontSize: 16, maxWidth: '48ch', marginTop: 8 }}>
                Aquí está cómo se ve tu sistema interno hoy.
              </p>
            </div>
            <button className="btn-round" style={{ width: 42, height: 42 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11 3 L13 5 L5.5 12.5 L3 13 L3.5 10.5 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Glass pair */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
            <div className="glass" style={{ padding: '28px 32px' }}>
              <div className="label" style={{ marginBottom: 10 }}>Coherencia</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 64, lineHeight: 1, letterSpacing: '-0.035em', color: '#fff' }}>72</span>
                <span style={{ fontSize: 18, color: 'oklch(1 0 0 / 0.5)' }}>%</span>
              </div>
              <div style={{ height: 1, background: 'oklch(1 0 0 / 0.18)', margin: '12px 0' }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'oklch(0.85 0.12 145)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 6l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                +4 vs ayer
              </div>
            </div>

            <div className="glass" style={{ padding: '28px 32px' }}>
              <div className="label" style={{ marginBottom: 10 }}>Pilar fuerte</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 10 }}>
                Mi Base
              </div>
              <div style={{ height: 1, background: 'oklch(1 0 0 / 0.18)', margin: '12px 0' }}/>
              <div style={{ fontSize: 13, color: 'oklch(1 0 0 / 0.65)', lineHeight: 1.5 }}>
                Autoconocimiento en fortaleza · Te reconoces con honestidad.
              </div>
            </div>
          </div>

          {/* Pause CTA card */}
          <div role="button" tabIndex={0} className="glass" style={{
            width: '100%', padding: '22px 28px', marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 18, textAlign: 'left',
            cursor: 'pointer', color: '#fff', fontFamily: 'inherit',
            border: '1px solid oklch(1 0 0 / 0.20)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: 'oklch(1 0 0 / 0.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 6v5l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="h-display" style={{ fontSize: 18, marginBottom: 4 }}>Pausa de 3 minutos</div>
              <div className="label" style={{ fontSize: 13 }}>Recomendado para ti hoy · Regulación emocional</div>
            </div>
            <button className="btn-pill" style={{ height: 44, padding: '0 22px', fontSize: 14 }}>Empezar →</button>
          </div>

          {/* Reflection cards */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h3 className="h-display" style={{ fontSize: 24 }}>Reflexiones</h3>
            <span className="eyebrow">VER TODAS · 12</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { c: 'oklch(0.40 0.12 250)', t: 'Volver a ti', s: 'Regulación · 3 min' },
              { c: 'oklch(0.40 0.14 305)', t: 'Lo no dicho', s: 'Conexión · 4 min' },
              { c: 'oklch(0.40 0.14 175)', t: 'El siguiente paso', s: 'Propósito · 5 min' },
            ].map((card, i) => (
              <div key={i} style={{
                height: 180, borderRadius: 22,
                background: `linear-gradient(160deg, ${card.c}, oklch(0.10 0.02 260))`,
                padding: '22px 22px', display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', position: 'relative', overflow: 'hidden',
                border: '1px solid oklch(1 0 0 / 0.10)', cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute', top: -30, right: -30, width: 140, height: 140,
                  borderRadius: '50%', background: `radial-gradient(circle, ${card.c}, transparent)`,
                  filter: 'blur(20px)', opacity: 0.8,
                }}/>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ position: 'absolute', top: 18, left: 22, color: '#fff', opacity: 0.7 }}>
                  <circle cx="11" cy="11" r="3" fill="currentColor"/>
                  <path d="M11 4v14M4 11h14" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                </svg>
                <div className="h-display" style={{ fontSize: 20, position: 'relative' }}>{card.t}</div>
                <div className="label" style={{ fontSize: 12, position: 'relative', color: 'oklch(1 0 0 / 0.6)' }}>{card.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME B · Big number + pillar bars (data-forward)
// ═══════════════════════════════════════════════════════════════════════════
function HomeB() {
  const pillars = [
    { name: 'Mi Base',      pct: 78, color: 'oklch(0.62 0.16 245)', level: 'Fortaleza' },
    { name: 'Mi Propósito', pct: 64, color: 'oklch(0.65 0.18 305)', level: 'En camino' },
    { name: 'Mi Conexión',  pct: 71, color: 'oklch(0.65 0.14 165)', level: 'En camino' },
    { name: 'Mi Impacto',   pct: 52, color: 'oklch(0.72 0.16 50)',  level: 'Atención' },
  ];
  return (
    <div className="web bg-aurora">
      <GlowBlob color="oklch(0.65 0.16 175)" size={800} top={-160} opacity={0.5}/>
      <WebChrome url="humancomplex.app/mapa"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNav active="home"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'center', marginBottom: 36 }}>
            {/* Hero number */}
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Coherencia hoy</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 184, lineHeight: 0.9, letterSpacing: '-0.05em',
                color: '#fff', marginBottom: 12,
                textShadow: '0 0 80px oklch(0.65 0.16 175 / 0.6)',
              }}>66</div>
              <div className="tag tag-emerald" style={{ marginBottom: 16 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>
                EN CAMINO
              </div>
              <p className="body" style={{ fontSize: 17, maxWidth: '38ch' }}>
                Reconoces lo que sientes, pero te cuesta sostenerlo en acción.
                Tomas buenas decisiones, pero no siempre las llevas hasta el final.
              </p>
            </div>

            {/* Pillar bars */}
            <div className="glass-soft" style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
                <div className="h-display" style={{ fontSize: 18 }}>Tus pilares</div>
                <button className="btn-text" style={{ padding: 0, fontSize: 12 }}>Ver mapa completo →</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {pillars.map((p) => (
                  <div key={p.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{p.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'oklch(1 0 0 / 0.55)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.level} · {p.pct}%</span>
                    </div>
                    <div style={{ height: 6, background: 'oklch(1 0 0 / 0.06)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        width: `${p.pct}%`, height: '100%', background: p.color,
                        boxShadow: `0 0 12px ${p.color.replace(')', ' / 0.5)')}`,
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
              ['RACHA', '7', 'días'],
              ['SESIONES', '23', 'totales'],
              ['MINUTOS', '142', 'reflexión'],
              ['ÚLTIMA', 'Ayer', '8:42 PM'],
            ].map(([k, v, sub], i) => (
              <div key={i} className="glass-soft" style={{ padding: '20px 22px' }}>
                <div className="eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>{k}</div>
                <div className="value-big">{v}</div>
                <div className="label" style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-pill">Empezar reflexión diaria →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME C · Editorial warm + dimensions grid
// ═══════════════════════════════════════════════════════════════════════════
function HomeC() {
  const dimensions = [
    { name: 'Autoconocimiento', pillar: 'Base',      level: 'Fortaleza',  color: 'oklch(0.65 0.16 145)' },
    { name: 'Regulación',        pillar: 'Base',      level: 'En camino',  color: 'oklch(0.62 0.16 245)' },
    { name: 'Cuerpo y energía',  pillar: 'Base',      level: 'En camino',  color: 'oklch(0.62 0.14 200)' },
    { name: 'Claridad',          pillar: 'Propósito', level: 'En camino',  color: 'oklch(0.65 0.18 305)' },
    { name: 'Sentido',           pillar: 'Propósito', level: 'Fortaleza',  color: 'oklch(0.62 0.16 280)' },
    { name: 'Decisión',          pillar: 'Propósito', level: 'Atención',   color: 'oklch(0.66 0.20 320)' },
    { name: 'Vínculos',          pillar: 'Conexión',  level: 'En camino',  color: 'oklch(0.65 0.14 165)' },
    { name: 'Comunicación',      pillar: 'Conexión',  level: 'Fortaleza',  color: 'oklch(0.62 0.12 180)' },
  ];
  return (
    <div className="web bg-warm">
      <GlowBlob color="oklch(0.55 0.18 30)" size={800} top={-220} opacity={0.5}/>
      <WebChrome url="humancomplex.app/inicio"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNav active="today"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Mar 14 · Enero</div>
              <h1 className="h-hero" style={{ fontSize: 56 }}>
                Buen día,<br/>
                <em className="h-italic" style={{ color: 'oklch(0.85 0.12 30)' }}>Ana.</em>
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost-pill">Configurar</button>
              <button className="btn-round">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="2.5" r="1" fill="currentColor"/>
                  <circle cx="7" cy="7" r="1" fill="currentColor"/>
                  <circle cx="7" cy="11.5" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quote hero */}
          <div className="glass glass-warm" style={{ padding: '40px 44px', marginBottom: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 14, color: 'oklch(0.85 0.12 30)' }}>
              Pregunta del día
            </div>
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 38, lineHeight: 1.2, color: '#fff',
              margin: 0, letterSpacing: '-0.015em', maxWidth: '24ch',
            }}>
              "¿Qué necesitarías para volver a ti más rápido cuando te pierdes?"
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
              <div key={i} style={{ padding: '16px 18px', borderRadius: 16, background: 'oklch(1 0 0 / 0.05)', border: '1px solid oklch(1 0 0 / 0.08)' }}>
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
              <div key={d.name} style={{
                padding: '18px 18px', borderRadius: 16,
                background: 'oklch(1 0 0 / 0.04)', border: '1px solid oklch(1 0 0 / 0.08)',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 2,
                  background: d.color, marginBottom: 14,
                  boxShadow: `0 0 8px ${d.color.replace(')', ' / 0.6)')}`,
                }}/>
                <div style={{ fontSize: 14, color: '#fff', fontWeight: 500, marginBottom: 4 }}>{d.name}</div>
                <div className="label" style={{ fontSize: 11 }}>{d.pillar} · {d.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeA, HomeB, HomeC, SideNav });
