// screens-v4-detail.jsx — Cream/warm detail (3 variantes)

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL A · Dimension overview + recursos (cream)
// ═══════════════════════════════════════════════════════════════════════════
function DetailA_v4() {
  return (
    <div className="web bg-cream">
      <Blob color="#ffd4e1" size={700} top={-280} opacity={0.5}/>
      <WebChromeV4 url="humancomplex.app/mapa/regulacion"/>
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <SideNavV4 active="home"/>
        <div className="scrollY" style={{ flex: 1, padding: '36px 56px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, color: 'var(--slate-500)', fontSize: 13 }}>
            <button className="btn-text" style={{ padding: 0 }}>← Mi mapa</button>
            <span>/</span><span>Mi Base</span><span>/</span>
            <span style={{ color: 'var(--slate-900)' }}>Regulación</span>
          </div>

          {/* Hero */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 32, alignItems: 'center' }}>
            <div>
              <div className="tag tag-pink" style={{ marginBottom: 18 }}>
                <span style={{ width: 6, height: 6, borderRadius: 2, background: '#ff5d8f' }}/>
                MI BASE · DIMENSIÓN
              </div>
              <h1 className="h-hero" style={{ fontSize: 72, marginBottom: 14 }}>Regulación</h1>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 22, color: '#b8395f', margin: 0,
              }}>Cómo habito lo que siento.</p>
            </div>

            {/* Big ring stat */}
            <div className="card-pink" style={{
              padding: '32px 32px', display: 'flex', alignItems: 'center', gap: 24,
            }}>
              <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(26,29,36,0.10)" strokeWidth="8"/>
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke="#ff5d8f" strokeWidth="8"
                    strokeDasharray={`${0.66 * 327} ${327}`}
                    strokeDashoffset={327 * 0.25}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"/>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 36, letterSpacing: '-0.025em',
                }}>66</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="eyebrow" style={{ marginBottom: 8, color: '#b8395f' }}>Tu nivel hoy</div>
                <div className="h-display" style={{ fontSize: 24, marginBottom: 8 }}>En camino</div>
                <p className="body" style={{ fontSize: 14, lineHeight: 1.5, margin: 0, color: 'var(--slate-700)' }}>
                  Sabes leer lo que sientes, aunque a veces te toma volver al equilibrio.
                </p>
              </div>
            </div>
          </div>

          {/* Implications */}
          <div className="card" style={{ padding: '28px 32px', marginBottom: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Implicaciones en tu vida diaria</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                ['01', 'En conversaciones difíciles, te conectas — pero también te quedas en bucle.'],
                ['02', 'Tomas decisiones desde la emoción cuando estás bajo presión.'],
                ['03', 'Te exiges responder rápido cuando lo que necesitas es respirar.'],
              ].map(([n, t], i) => (
                <div key={i} style={{ padding: '0 16px', borderLeft: i > 0 ? '1px solid rgba(26,29,36,0.10)' : 'none' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: '#ff5d8f', fontWeight: 600,
                    letterSpacing: '0.06em', display: 'block', marginBottom: 8,
                  }}>{n}</span>
                  <p style={{ fontSize: 14, color: 'var(--slate-900)', lineHeight: 1.5, margin: 0 }}>{t}</p>
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
              { kind: 'LIBRO',     title: 'Cuatro mil semanas',           meta: 'Oliver Burkeman · 6 min', cls: 'card-lavender' },
              { kind: 'TED TALK',  title: 'Cómo dejar de regalar tu poder', meta: 'Charla · 16 min',         cls: 'card-pink' },
              { kind: 'EJERCICIO', title: 'Pausa de 3 respiraciones',     meta: 'Práctica · 3 min',        cls: 'card-mint' },
              { kind: 'JOURNAL',   title: '¿Qué te pidió esa emoción?',   meta: 'Escritura · 5 min',       cls: 'card-peach' },
            ].map((r, i) => (
              <div key={i} className={r.cls} style={{ padding: '20px 22px', cursor: 'pointer' }}>
                <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10, color: 'var(--slate-700)' }}>{r.kind}</div>
                <div className="h-display" style={{ fontSize: 16, marginBottom: 6 }}>{r.title}</div>
                <div className="label" style={{ fontSize: 12, color: 'var(--slate-700)' }}>{r.meta}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="card-dark" style={{
            padding: '24px 28px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 24,
          }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 6, color: 'rgba(255,255,255,0.55)' }}>Sesión recomendada</div>
              <div className="h-display" style={{ fontSize: 20, marginBottom: 4, color: '#fff' }}>
                Práctica · Volver al cuerpo
              </div>
              <div className="label" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>5 minutos · Solo necesitas una silla</div>
            </div>
            <button className="btn-pill btn-pill-pink">Empezar →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL B · ¡Bien hecho! celebración
// ═══════════════════════════════════════════════════════════════════════════
function DetailB_v4() {
  return (
    <div className="web bg-warm-pink">
      <Blob color="#ffd4e1" size={900} top={-200} opacity={0.8}/>
      <WebChromeV4 url="humancomplex.app/sesion/completa"/>
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 36px' }}>
          <button className="btn-ghost-pill">↓ Cerrar</button>
          <div className="tag" style={{ background: 'transparent', border: 'none' }}>
            <span style={{ fontSize: 16 }}>📖</span>
            <span style={{ color: 'var(--slate-900)', textTransform: 'none', letterSpacing: '-0.01em', fontFamily: 'var(--font-display)', fontSize: 14 }}>Sesión completada</span>
          </div>
          <button className="btn-round">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Center */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px 40px' }}>
          {/* Trophy illustration */}
          <div style={{ position: 'relative', width: 280, height: 280, marginBottom: 40 }}>
            <svg width="280" height="280" viewBox="0 0 280 280">
              {/* Confetti dots */}
              <circle cx="40" cy="60" r="6" fill="#ff5d8f"/>
              <circle cx="240" cy="50" r="5" fill="#6dd6b1"/>
              <circle cx="60" cy="220" r="7" fill="#b89cf5"/>
              <circle cx="230" cy="230" r="6" fill="#ffa17a"/>
              <rect x="20" y="140" width="10" height="10" rx="2" fill="#5b8cff" transform="rotate(20 25 145)"/>
              <rect x="250" y="130" width="10" height="10" rx="2" fill="#ff5d8f" transform="rotate(-15 255 135)"/>
              {/* Center sun/medal */}
              <circle cx="140" cy="140" r="80" fill="#ff5d8f"/>
              <circle cx="140" cy="140" r="62" fill="#ffe2eb"/>
              {/* Check */}
              <path d="M105 140 L130 165 L180 110"
                stroke="#1a1d24" strokeWidth="10"
                strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              {/* Rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line key={angle}
                  x1={140 + Math.cos(angle * Math.PI / 180) * 95}
                  y1={140 + Math.sin(angle * Math.PI / 180) * 95}
                  x2={140 + Math.cos(angle * Math.PI / 180) * 110}
                  y2={140 + Math.sin(angle * Math.PI / 180) * 110}
                  stroke="#ff5d8f" strokeWidth="4" strokeLinecap="round"/>
              ))}
            </svg>
          </div>

          <h1 className="h-hero" style={{ fontSize: 80, marginBottom: 22, textAlign: 'center' }}>
            ¡Bien hecho!
          </h1>
          <p className="body" style={{
            fontSize: 19, textAlign: 'center', maxWidth: '40ch',
            color: 'var(--slate-700)', lineHeight: 1.5, marginBottom: 36,
          }}>
            Te diste 3 minutos para volver a ti.<br/>
            Eso ya es un acto de cuidado.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-pill btn-pill-pink">Ir más profundo →</button>
            <button className="btn-ghost-pill">Cerrar por hoy</button>
          </div>
        </div>

        {/* Footer summary */}
        <div className="card" style={{
          margin: '0 36px 28px', padding: '20px 28px',
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
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: 'var(--slate-900)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL C · Reflexión inmersiva (lavender, journaling)
// ═══════════════════════════════════════════════════════════════════════════
function DetailC_v4() {
  return (
    <div className="web bg-lavender">
      <Blob color="#dccdf2" size={700} top={-200} opacity={0.7}/>
      <WebChromeV4 url="humancomplex.app/reflexion/02"/>
      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top with progress */}
        <div style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <button className="btn-round">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="eyebrow" style={{ minWidth: 100 }}>02 · 05 PREGUNTAS</div>
          <div style={{ flex: 1, height: 6, background: 'rgba(26,29,36,0.08)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: '#b89cf5', borderRadius: 3 }}/>
          </div>
          <button className="btn-text" style={{ fontSize: 13 }}>Pausar</button>
        </div>

        <div className="scrollY" style={{ flex: 1, padding: '32px 80px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxWidth: 820, margin: '0 auto', width: '100%' }}>
            {/* Pillar tag */}
            <div className="tag" style={{ marginBottom: 28, background: '#ece1fa', borderColor: '#c5b3e8', color: '#6b4ec0' }}>
              <span style={{ width: 6, height: 6, borderRadius: 2, background: '#b89cf5' }}/>
              MI PROPÓSITO · CLARIDAD
            </div>

            {/* Question */}
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 56, lineHeight: 1.1,
              color: 'var(--slate-900)', letterSpacing: '-0.03em',
              margin: '0 0 32px',
            }}>
              ¿Qué necesitarías para volver a ti más rápido cuando te pierdes?
            </h1>

            {/* Hint card */}
            <div className="card-lavender" style={{ padding: '20px 24px', marginBottom: 18 }}>
              <div className="eyebrow" style={{ marginBottom: 10, color: '#6b4ec0' }}>
                Para reflexionar
              </div>
              <p className="body" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--slate-700)' }}>
                Piensa en la última vez que perdiste el centro. ¿Qué te ayudó —o podría haberte ayudado— a volver más rápido?
                No hay respuestas correctas. Lo que escribas queda solo contigo.
              </p>
            </div>

            {/* Text area */}
            <div className="card" style={{
              padding: '24px 28px', minHeight: 180, marginBottom: 18,
            }}>
              <div style={{
                color: 'var(--slate-400)', fontSize: 16, lineHeight: 1.6,
              }}>
                Escribe lo que sientas...
              </div>
              <div style={{
                width: 2, height: 18, background: '#b89cf5',
                display: 'inline-block', marginTop: 6,
                animation: 'blinkV4 1s infinite',
              }}/>
            </div>

            {/* Suggestions */}
            <div style={{ marginBottom: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>SUGERENCIAS</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Espacio', 'Silencio', 'Una caminata', 'Llorar', 'Hablar con alguien', 'Escribir', 'Respirar profundo'].map((s) => (
                  <span key={s} style={{
                    padding: '8px 16px', borderRadius: 999,
                    background: 'var(--paper)',
                    border: '1px solid rgba(26,29,36,0.10)',
                    fontSize: 13, color: 'var(--slate-700)',
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
          borderTop: '1px solid rgba(26,29,36,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        }}>
          <div className="label" style={{ fontSize: 13 }}>Privado · Solo para ti</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-ghost-pill">Saltar</button>
            <button className="btn-pill btn-pill-pink">Sigue →</button>
          </div>
        </div>
      </div>

      <style>{`@keyframes blinkV4 { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </div>
  );
}

Object.assign(window, { DetailA_v4, DetailB_v4, DetailC_v4 });
