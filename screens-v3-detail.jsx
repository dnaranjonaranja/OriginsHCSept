// screens-v3-detail.jsx — DESKTOP detalle de sesión (3 variantes)

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL A · Dimension overview + recursos
// ═══════════════════════════════════════════════════════════════════════════
function DetailA() {
  return (
    <div className="web bg-night">
      <GlowBlob color="oklch(0.55 0.20 260)" size={900} top={-360} opacity={0.5}/>
      <WebChrome url="humancomplex.app/mapa/regulacion"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNav active="home"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, color: 'oklch(1 0 0 / 0.5)', fontSize: 13 }}>
            <button className="btn-text" style={{ padding: 0 }}>← Mi mapa</button>
            <span>/</span>
            <span>Mi Base</span>
            <span>/</span>
            <span style={{ color: '#fff' }}>Regulación</span>
          </div>

          {/* Hero */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 32, alignItems: 'center' }}>
            <div>
              <div className="tag" style={{ marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: 2, background: 'oklch(0.65 0.16 245)', boxShadow: '0 0 8px oklch(0.65 0.16 245 / 0.7)' }}/>
                MI BASE · DIMENSIÓN
              </div>
              <h1 className="h-hero" style={{ fontSize: 72, marginBottom: 14 }}>Regulación</h1>
              <p style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: 24, color: 'oklch(0.85 0.10 260)', margin: 0,
              }}>Cómo habito lo que siento.</p>
            </div>

            {/* Big ring stat */}
            <div className="glass" style={{
              padding: '32px 32px', display: 'flex', alignItems: 'center', gap: 24,
            }}>
              <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(1 0 0 / 0.10)" strokeWidth="7"/>
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke="url(#gradA)" strokeWidth="7"
                    strokeDasharray={`${0.66 * 327} ${327}`}
                    strokeDashoffset={327 * 0.25}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"/>
                  <defs>
                    <linearGradient id="gradA" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="oklch(0.78 0.16 260)"/>
                      <stop offset="1" stopColor="oklch(0.55 0.18 260)"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 36, letterSpacing: '-0.025em',
                }}>66</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Tu nivel hoy</div>
                <div className="h-display" style={{ fontSize: 26, marginBottom: 8 }}>En camino</div>
                <p className="body" style={{ fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                  Sabes leer lo que sientes, aunque a veces te toma volver al equilibrio.
                </p>
              </div>
            </div>
          </div>

          {/* Implications */}
          <div className="glass-soft" style={{ padding: '28px 32px', marginBottom: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Implicaciones en tu vida diaria</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                ['01', 'En conversaciones difíciles, te conectas — pero también te quedas en bucle.'],
                ['02', 'Tomas decisiones desde la emoción cuando estás bajo presión.'],
                ['03', 'Te exiges responder rápido cuando lo que necesitas es respirar.'],
              ].map(([n, t], i) => (
                <div key={i} style={{ padding: '0 16px', borderLeft: i > 0 ? '1px solid oklch(1 0 0 / 0.10)' : 'none' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'oklch(0.85 0.12 260)', fontWeight: 500,
                    letterSpacing: '0.06em', display: 'block', marginBottom: 8,
                  }}>{n}</span>
                  <p style={{ fontSize: 14, color: 'oklch(1 0 0 / 0.85)', lineHeight: 1.5, margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, marginTop: 28 }}>
            <h3 className="h-display" style={{ fontSize: 22 }}>Recursos para esta dimensión</h3>
            <span className="eyebrow">4 PIEZAS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { kind: 'LIBRO', title: 'Cuatro mil semanas', meta: 'Oliver Burkeman · 6 min', c: 'oklch(0.45 0.16 260)' },
              { kind: 'TED TALK', title: 'Cómo dejar de regalar tu poder', meta: 'Charla · 16 min', c: 'oklch(0.45 0.14 305)' },
              { kind: 'EJERCICIO', title: 'Pausa de 3 respiraciones', meta: 'Práctica · 3 min', c: 'oklch(0.45 0.12 175)' },
              { kind: 'JOURNAL', title: '¿Qué te pidió esa emoción?', meta: 'Escritura · 5 min', c: 'oklch(0.45 0.14 30)' },
            ].map((r, i) => (
              <div key={i} className="glass-soft" style={{ padding: '20px 22px', cursor: 'pointer' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `linear-gradient(135deg, ${r.c}, oklch(0.10 0.02 260))`,
                  marginBottom: 18, border: '1px solid oklch(1 0 0 / 0.18)',
                }}/>
                <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10, color: 'oklch(0.85 0.12 260)' }}>{r.kind}</div>
                <div className="h-display" style={{ fontSize: 15, marginBottom: 4 }}>{r.title}</div>
                <div className="label" style={{ fontSize: 12 }}>{r.meta}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="glass" style={{
            padding: '24px 28px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 24,
          }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Sesión recomendada</div>
              <div className="h-display" style={{ fontSize: 20, marginBottom: 4 }}>
                Práctica · Volver al cuerpo
              </div>
              <div className="label" style={{ fontSize: 13 }}>5 minutos · Solo necesitas una silla</div>
            </div>
            <button className="btn-pill">Empezar →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL B · Celebración (Woo-hoo style)
// ═══════════════════════════════════════════════════════════════════════════
function DetailB() {
  return (
    <div className="web bg-deep">
      <div style={{
        position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, oklch(0.65 0.16 175 / 0.6) 0%, oklch(0.50 0.10 175 / 0.30) 30%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0,
      }}/>
      <WebChrome url="humancomplex.app/sesion/completa"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1, flexDirection: 'column' }}>
        {/* Top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 36px' }}>
          <button className="btn-ghost-pill">↓ Cerrar</button>
          <div className="tag" style={{ background: 'transparent', border: 'none' }}>
            <span style={{ fontSize: 16 }}>📖</span>
            <span style={{ color: '#fff', textTransform: 'none', letterSpacing: '-0.01em', fontFamily: 'var(--font-display)', fontSize: 14 }}>Sesión completada</span>
          </div>
          <button className="btn-round">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="6" cy="5" r="1.5" fill="oklch(0.10 0 0)" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="10" cy="11" r="1.5" fill="oklch(0.10 0 0)" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
          </button>
        </div>

        {/* Center */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px 40px' }}>
          <div style={{ position: 'relative', width: 280, height: 280, marginBottom: 48 }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle, oklch(0.65 0.16 175 / 0.7) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}/>
            <svg width="280" height="280" viewBox="0 0 280 280" style={{ position: 'relative' }}>
              <defs>
                <linearGradient id="diamondV3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="oklch(0.75 0.16 175 / 0.4)"/>
                  <stop offset="1" stopColor="oklch(0.30 0.06 175 / 0.2)"/>
                </linearGradient>
              </defs>
              <path d="M140 40 L222 124 L210 210 L140 240 L70 210 L58 124 Z"
                fill="url(#diamondV3)"
                stroke="oklch(0.85 0.14 175 / 0.6)" strokeWidth="1.2"/>
              <path d="M105 145 L130 170 L185 110"
                stroke="oklch(0.88 0.14 165)" strokeWidth="9"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                style={{ filter: 'drop-shadow(0 0 12px oklch(0.85 0.16 165 / 0.8))' }}/>
            </svg>
          </div>

          <h1 className="h-hero" style={{ fontSize: 88, marginBottom: 22, textAlign: 'center' }}>
            ¡Bien hecho!
          </h1>
          <p className="body" style={{
            fontSize: 19, textAlign: 'center', maxWidth: '40ch',
            color: 'oklch(1 0 0 / 0.75)', lineHeight: 1.5, marginBottom: 44,
          }}>
            Te diste 3 minutos para volver a ti.<br/>
            Eso ya es un acto de cuidado.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-pill">Ir más profundo →</button>
            <button className="btn-ghost-pill">Cerrar por hoy</button>
          </div>
        </div>

        {/* Footer summary */}
        <div style={{
          padding: '20px 36px 28px', borderTop: '1px solid oklch(1 0 0 / 0.06)',
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        }}>
          {[
            ['Duración', '3:14'],
            ['Reflexión', 'Volver al cuerpo'],
            ['Pilar', 'Mi Base · Regulación'],
            ['Racha', '7 días seguidos'],
          ].map(([k, v], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div className="eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: '#fff' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL C · Reading flow / journaling (immersive)
// ═══════════════════════════════════════════════════════════════════════════
function DetailC() {
  return (
    <div className="web bg-violet">
      <GlowBlob color="oklch(0.55 0.20 300)" size={800} top={-280} opacity={0.5}/>
      <WebChrome url="humancomplex.app/reflexion/02"/>
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top with progress */}
        <div style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <button className="btn-round">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="eyebrow" style={{ minWidth: 100 }}>02 · 05 PREGUNTAS</div>
          <div style={{ flex: 1, height: 4, background: 'oklch(1 0 0 / 0.10)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: 'oklch(0.85 0.14 300)', borderRadius: 2 }}/>
          </div>
          <button className="btn-text" style={{ fontSize: 13 }}>Pausar</button>
        </div>

        <div className="scrollY" style={{ flex: 1, padding: '40px 80px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', width: '100%' }}>
            {/* Pillar tag */}
            <div className="tag" style={{ marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: 2, background: 'oklch(0.65 0.18 305)', boxShadow: '0 0 8px oklch(0.65 0.18 305 / 0.7)' }}/>
              MI PROPÓSITO · CLARIDAD
            </div>

            {/* Question */}
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 64, lineHeight: 1.1, fontWeight: 400,
              color: '#fff', letterSpacing: '-0.02em',
              margin: '0 0 36px',
            }}>
              ¿Qué necesitarías para volver a ti más rápido cuando te pierdes?
            </h1>

            {/* Hint card */}
            <div className="glass-soft" style={{ padding: '20px 24px', marginBottom: 22, background: 'oklch(1 0 0 / 0.04)' }}>
              <div className="eyebrow" style={{ marginBottom: 10, color: 'oklch(0.85 0.14 300)' }}>
                Para reflexionar
              </div>
              <p className="body" style={{ fontSize: 15, lineHeight: 1.6, color: 'oklch(1 0 0 / 0.78)' }}>
                Piensa en la última vez que perdiste el centro. ¿Qué te ayudó —o podría haberte ayudado— a volver más rápido?
                No hay respuestas correctas. Lo que escribas queda solo contigo.
              </p>
            </div>

            {/* Text area */}
            <div style={{
              padding: '24px 28px',
              background: 'oklch(1 0 0 / 0.04)',
              border: '1px solid oklch(1 0 0 / 0.10)',
              borderRadius: 18,
              minHeight: 200, marginBottom: 18,
            }}>
              <div style={{
                color: 'oklch(1 0 0 / 0.40)', fontSize: 16,
                lineHeight: 1.6, fontStyle: 'italic',
              }}>
                Escribe lo que sientas...
              </div>
              <div style={{
                width: 2, height: 18, background: 'oklch(0.85 0.14 300)',
                display: 'inline-block', marginTop: 6,
                animation: 'blink 1s infinite',
              }}/>
            </div>

            {/* Suggestions */}
            <div style={{ marginBottom: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>SUGERENCIAS</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Espacio', 'Silencio', 'Una caminata', 'Llorar', 'Hablar con alguien', 'Escribir', 'Respirar profundo'].map((s) => (
                  <span key={s} style={{
                    padding: '8px 16px', borderRadius: 999,
                    background: 'oklch(1 0 0 / 0.06)',
                    border: '1px solid oklch(1 0 0 / 0.10)',
                    fontSize: 13, color: 'oklch(1 0 0 / 0.78)',
                    cursor: 'pointer',
                  }}>+ {s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: '18px 56px 28px',
          borderTop: '1px solid oklch(1 0 0 / 0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        }}>
          <div className="label" style={{ fontSize: 13 }}>Privado · Solo para ti</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-ghost-pill">Saltar</button>
            <button className="btn-pill">Sigue →</button>
          </div>
        </div>
      </div>

      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </div>
  );
}

Object.assign(window, { DetailA, DetailB, DetailC });
