// screens-flow.jsx — Onboarding emocional, Selector de modalidad, Diagnóstico
// Lenguaje editorial. Tipografía grande. Trazos del logo como íconos de pilar.

const { useState } = React;

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING — versión 3 · layout editorial de dos columnas
//   IZQ: texto editorial · DER: visual (asterisco animado / interactivo)
// 0 — Bienvenida
// 1 — Qué es 8D (animación: las líneas forman el asterisco)
// 2 — Los 4 pilares (asterisco interactivo)
// 3 — Privacidad
// 4 — Cómo responder
// ═══════════════════════════════════════════════════════════════════════════

// ── Animación: las 4 líneas del logo 8D se trazan secuencialmente ──────────
// Anima al montar; se queda en su estado final. Si quieres verla otra vez,
// retrocede al paso anterior y avanza de nuevo.
function FormingMark({ size = 320 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: 'block' }}>
        <defs>
          <style>{`
            .fm-stroke {
              transform-origin: 40px 40px;
              transform-box: view-box;
            }
            .fm-v   { animation: fm-grow-y   780ms cubic-bezier(.5,.05,.25,1) 0ms    both; }
            .fm-h   { animation: fm-grow-x   780ms cubic-bezier(.5,.05,.25,1) 500ms  both; }
            .fm-d1  { animation: fm-grow-d1  780ms cubic-bezier(.5,.05,.25,1) 1000ms both; }
            .fm-d2  { animation: fm-grow-d2  780ms cubic-bezier(.5,.05,.25,1) 1500ms both; }
            @keyframes fm-grow-y  { from { transform: scale(1, 0); }              to { transform: scale(1, 1); } }
            @keyframes fm-grow-x  { from { transform: scale(0, 1); }              to { transform: scale(1, 1); } }
            @keyframes fm-grow-d1 { from { transform: rotate(45deg) scale(1, 0); }  to { transform: rotate(45deg) scale(1, 1); } }
            @keyframes fm-grow-d2 { from { transform: rotate(-45deg) scale(1, 0); } to { transform: rotate(-45deg) scale(1, 1); } }
          `}</style>
        </defs>
        <rect className="fm-stroke fm-h"  x="8"  y="34" width="64" height="12" rx="2.5" fill="#7166eb"/>
        <rect className="fm-stroke fm-d1" x="34" y="8"  width="12" height="64" rx="2.5" fill="#3fa66a"/>
        <rect className="fm-stroke fm-d2" x="34" y="8"  width="12" height="64" rx="2.5" fill="#efb840"/>
        <rect className="fm-stroke fm-v"  x="34" y="8"  width="12" height="64" rx="2.5" fill="#e85a3e"/>
      </svg>
    </div>
  );
}

// ── Mark "sellado" — 8D pequeño dentro de anillos concéntricos (privacidad) ──
function SealedMark({ size = 280 }) {
  const r1 = size / 2 - 4;
  const r2 = size / 2 - 28;
  const r3 = size / 2 - 56;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r1} fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx={size/2} cy={size/2} r={r2} fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle cx={size/2} cy={size/2} r={r3} fill="var(--bg-card)" stroke="var(--line-soft)" strokeWidth="1" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <HCLogo size={size * 0.32}/>
      </div>
      <div style={{
        position: 'absolute', top: '50%', left: -8, transform: 'translateY(-50%)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
        color: 'var(--ink-3)', textTransform: 'uppercase',
        writingMode: 'vertical-rl',
      }}>privacy · sealed</div>
    </div>
  );
}

// ── Mark "respiración" — 8D con escalado suave continuo ────────────────────
function BreathingMark({ size = 280 }) {
  return (
    <div style={{
      width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <style>{`
        @keyframes bm-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.06); opacity: 0.92; }
        }
        @keyframes bm-halo {
          0%, 100% { transform: scale(0.95); opacity: 0.45; }
          50%      { transform: scale(1.15); opacity: 0.0; }
        }
        .bm-halo {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid var(--amber);
          animation: bm-halo 3.6s ease-in-out infinite;
        }
        .bm-mark { animation: bm-pulse 3.6s ease-in-out infinite; transform-origin: center; }
      `}</style>
      <div className="bm-halo" style={{ borderColor: 'var(--ink-3)' }}/>
      <div className="bm-mark">
        <HCLogo size={size * 0.6}/>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [hoverPillar, setHoverPillar] = useState(null);
  const total = 5;
  const next = () => step < total - 1 ? setStep(step + 1) : onComplete();

  // Helper: layout de 2 columnas para cada paso
  const Page = ({ left, right }) => (
    <div className="rise" style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
      gap: 72,
      alignItems: 'center',
      width: '100%',
    }}>
      <div style={{ minWidth: 0 }}>{left}</div>
      <div style={{ minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{right}</div>
    </div>
  );

  return (
    <div className="canvas" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '56px 56px 100px',
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        width: '100%',
      }}>
        {step === 0 && (
          <Page
            left={
              <div>
                <p className="eyebrow" style={{ marginBottom: 22 }}>Bienvenido a 8D</p>
                <h1 className="display" style={{
                  fontSize: 60, marginBottom: 24, marginTop: 0, lineHeight: 1.03,
                  letterSpacing: '-0.026em', maxWidth: '15ch', fontWeight: 500,
                }}>
                  Este no es un test.{' '}
                  <em className="display-italic" style={{ color: 'var(--amber)' }}>
                    Estás aquí para encontrarte contigo.
                  </em>
                </h1>
                <p style={{
                  fontSize: 19, color: 'var(--ink-2)', marginBottom: 16, maxWidth: '46ch',
                  lineHeight: 1.5, fontFamily: 'var(--font-display)', fontWeight: 400,
                }}>
                  En un mundo que exige respuestas rápidas, 8D es un espacio para hacer
                  algo distinto: detenerte, observarte y comprenderte con mayor profundidad.
                </p>
                <p style={{ fontSize: 15.5, color: 'var(--ink-3)', marginBottom: 36, maxWidth: '46ch', lineHeight: 1.6 }}>
                  No estás aquí para ser evaluado. No hay puntajes ni veredictos —
                  solo lo que aparece cuando te detienes a mirarte de frente.
                </p>
                <button className="btn btn-primary" onClick={next} style={{ fontSize: 15, padding: '14px 26px' }}>
                  Empezar <ArrowRight/>
                </button>
                <p className="eyebrow-mono" style={{ marginTop: 32, fontSize: 11 }}>
                  <span style={{ color: 'var(--amber)' }}>·</span> 15–20 min &nbsp;·&nbsp;
                  <span style={{ color: 'var(--amber)' }}>·</span> Puedes pausar &nbsp;·&nbsp;
                  <span style={{ color: 'var(--amber)' }}>·</span> Solo para ti
                </p>
              </div>
            }
            right={<BreathingMark size={320}/>}
          />
        )}

        {step === 1 && (
          <Page
            left={
              <div>
                <p className="eyebrow" style={{ marginBottom: 18 }}>Qué es 8D</p>
                <h2 className="display" style={{
                  fontSize: 48, marginBottom: 20, marginTop: 0, lineHeight: 1.06,
                  letterSpacing: '-0.022em', maxWidth: '18ch', fontWeight: 500,
                }}>
                  No somos una sola dimensión.{' '}
                  <em className="display-italic" style={{ color: 'var(--amber)' }}>
                    Somos un sistema complejo en cambio.
                  </em>
                </h2>
                <p style={{
                  color: 'var(--ink-2)', fontSize: 17, marginBottom: 16, maxWidth: '46ch',
                  lineHeight: 1.55, fontFamily: 'var(--font-display)', fontWeight: 400,
                }}>
                  Tu bienestar, tus decisiones, tus relaciones y tu sentido de vida están
                  profundamente conectados. Cuando una dimensión se debilita, impacta a las
                  demás.
                </p>
                <blockquote className="quote" style={{ margin: '24px 0 32px', maxWidth: '34ch', fontSize: 20 }}>
                  La calidad de tu vida está directamente relacionada con la calidad de tu mundo interior.
                </blockquote>
                <p className="eyebrow-mono" style={{ marginBottom: 22, fontSize: 10 }}>
                  Mira cómo se forman los cuatro trazos —
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight/></button>
                  <button className="btn-link" onClick={() => setStep(0)}>Atrás</button>
                </div>
              </div>
            }
            right={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <FormingMark size={340}/>
                {/* Labels de las 4 dimensiones bajo el mark animado */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 24,
                  justifyContent: 'center', alignItems: 'center',
                }}>
                  {PILLARS.map((p) => (
                    <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <PillarGlyph pillar={p.id} size={22}/>
                      <span style={{
                        fontFamily: 'var(--font-ui)', fontSize: 9.5, fontWeight: 600,
                        letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: PILLAR_COLORS[p.id],
                      }}>{p.name.replace('Mi ', '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        )}

        {step === 2 && (
          <Page
            left={
              <div>
                <p className="eyebrow" style={{ marginBottom: 18 }}>Los cuatro pilares</p>
                <h2 className="display" style={{
                  fontSize: 44, marginBottom: 16, marginTop: 0, lineHeight: 1.08,
                  letterSpacing: '-0.022em', maxWidth: '20ch', fontWeight: 500,
                }}>
                  Tu desarrollo se mira a través de{' '}
                  <em className="display-italic" style={{ color: 'var(--amber)' }}>cuatro pilares fundamentales.</em>
                </h2>
                <p style={{ color: 'var(--ink-3)', fontSize: 15.5, marginBottom: 24, maxWidth: '46ch', lineHeight: 1.6 }}>
                  Ningún pilar es más importante que otro. El desarrollo ocurre en el
                  equilibrio entre los cuatro. Pasa el cursor sobre cada trazo.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                  {PILLARS.map((p) => {
                    const active = !hoverPillar || hoverPillar === p.id;
                    return (
                      <div key={p.id}
                        onMouseEnter={() => setHoverPillar(p.id)}
                        onMouseLeave={() => setHoverPillar(null)}
                        style={{
                          display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16,
                          padding: '10px 12px',
                          border: `1px solid ${active && hoverPillar === p.id ? 'var(--line)' : 'transparent'}`,
                          borderRadius: 'var(--r-md)',
                          opacity: active ? 1 : 0.4,
                          transition: 'all 280ms ease', cursor: 'pointer',
                          alignItems: 'center',
                        }}>
                        <PillarGlyph pillar={p.id} size={28}/>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: 600,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            color: PILLAR_COLORS[p.id], marginBottom: 2,
                          }}>{p.name}</div>
                          <div className="display-italic" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.25 }}>
                            {p.question}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight/></button>
                  <button className="btn-link" onClick={() => setStep(1)}>Atrás</button>
                </div>
              </div>
            }
            right={
              <PillarAsterisk
                size={320}
                active={hoverPillar ? [hoverPillar] : ['base','proposito','conexion','impacto']}
                onClickPillar={(p) => setHoverPillar(hoverPillar === p ? null : p)}
              />
            }
          />
        )}

        {step === 3 && (
          <Page
            left={
              <div>
                <p className="eyebrow" style={{ marginBottom: 18 }}>Una promesa antes de empezar</p>
                <h2 className="display" style={{
                  fontSize: 46, marginBottom: 24, marginTop: 0, lineHeight: 1.08,
                  letterSpacing: '-0.022em', maxWidth: '18ch', fontWeight: 500,
                }}>
                  Lo que escribas aquí{' '}
                  <em className="display-italic" style={{ color: 'var(--amber)' }}>queda contigo.</em>
                </h2>
                <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none',
                  display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--ink-2)', fontSize: 15.5,
                  fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1.5, maxWidth: '46ch',
                }}>
                  <li style={{ display: 'flex', gap: 14 }}>
                    <span className="amber" style={{ marginTop: 2 }}>—</span>
                    <span>Tus respuestas son tuyas. Nadie de tu organización ve respuestas individuales.</span>
                  </li>
                  <li style={{ display: 'flex', gap: 14 }}>
                    <span className="amber" style={{ marginTop: 2 }}>—</span>
                    <span>Tu organización solo verá tendencias agregadas, nunca nombres.</span>
                  </li>
                  <li style={{ display: 'flex', gap: 14 }}>
                    <span className="amber" style={{ marginTop: 2 }}>—</span>
                    <span>Puedes pausar y continuar cuando lo necesites.</span>
                  </li>
                </ul>
                <label style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '12px 0', cursor: 'pointer', color: 'var(--ink-2)',
                  fontSize: 14.5, marginBottom: 28,
                }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: 3, accentColor: 'var(--amber)' }}/>
                  <span>Entiendo y acepto. <span className="muted-2">(Puedes leer la política completa en cualquier momento.)</span></span>
                </label>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <button className="btn btn-primary" onClick={next}>Acepto, sigamos</button>
                  <button className="btn-link" onClick={() => setStep(2)}>Atrás</button>
                </div>
              </div>
            }
            right={<SealedMark size={300}/>}
          />
        )}

        {step === 4 && (
          <Page
            left={
              <div>
                <p className="eyebrow" style={{ marginBottom: 18 }}>Cómo responder</p>
                <h2 className="display" style={{
                  fontSize: 52, marginBottom: 24, marginTop: 0, lineHeight: 1.06,
                  letterSpacing: '-0.024em', maxWidth: '15ch', fontWeight: 500,
                }}>
                  No hay <em className="display-italic" style={{ color: 'var(--amber)' }}>respuestas correctas.</em>
                </h2>
                <p style={{
                  fontSize: 17, color: 'var(--ink-2)', maxWidth: '46ch', marginBottom: 14,
                  fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1.5,
                }}>
                  Responde desde tu realidad, no desde lo que <em>"debería ser"</em>.
                  Este ejercicio es para ti, no para cumplir expectativas externas.
                </p>
                <p style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: '46ch', marginBottom: 28, lineHeight: 1.6 }}>
                  Si una pregunta te incomoda, esa incomodidad ya es información.
                  Quédate ahí un segundo más antes de responder.
                </p>
                <blockquote className="quote" style={{ fontSize: 20, marginBottom: 36, maxWidth: '36ch' }}>
                  Tómate unos segundos. Respira profundamente. Entre más honesto seas contigo, más valioso será el resultado.
                </blockquote>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <button className="btn btn-primary" onClick={next} style={{ fontSize: 15, padding: '14px 26px' }}>
                    Estoy listo <ArrowRight/>
                  </button>
                  <button className="btn-link" onClick={() => setStep(3)}>Atrás</button>
                </div>
              </div>
            }
            right={<BreathingMark size={320}/>}
          />
        )}

        {/* Trail */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
          <div className="steps-trail">
            {Array.from({ length: total }).map((_, i) =>
              <div key={i} className={`step ${i < step ? 'passed' : ''} ${i === step ? 'current' : ''}`}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SELECTOR DE MODALIDAD
// Dos modos: "Todo el mapa" o "Por esferas" (multi-select dentro de cada pilar)
// ═══════════════════════════════════════════════════════════════════════════
function Selector({ onPickFull, onPickSphere, onPickSpheres }) {
  const [mode, setMode] = useState(null); // 'todo' | 'esferas' | null
  const [selected, setSelected] = useState([]); // array of sphere ids

  const toggle = (id) => {
    setSelected((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  };

  const grouped = PILLARS.map((p) => ({
    ...p,
    spheres: SPHERES.filter((s) => s.pillar === p.id)
  }));

  const startEsferas = () => {
    if (selected.length === 0) return;
    if (onPickSpheres) onPickSpheres(selected);else
    if (selected.length === 1) onPickSphere(selected[0]);else
    onPickFull(); // fallback
  };

  // Helper: seleccionar todas las esferas de un pilar
  const togglePillar = (pillarId) => {
    const pillarSpheres = SPHERES.filter((s) => s.pillar === pillarId).map((s) => s.id);
    const allSelected = pillarSpheres.every((id) => selected.includes(id));
    if (allSelected) {
      setSelected((cur) => cur.filter((id) => !pillarSpheres.includes(id)));
    } else {
      setSelected((cur) => [...new Set([...cur, ...pillarSpheres])]);
    }
  };

  return (
    <div className="canvas">
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 44px 160px', width: '100%' }}>
        <div className="rise" style={{ marginBottom: 64 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Por dónde empezar</p>
          <h1 className="display" style={{
            fontSize: 68, margin: 0, lineHeight: 1.04, letterSpacing: '-0.028em', maxWidth: '18ch', color: "rgb(15, 27, 46)"
          }}>
            Mira el mapa entero,{' '}
            <em className="display-italic" style={{ color: 'var(--amber)' }}>
              o entra por una esfera a la vez.
            </em>
          </h1>
          <p style={{
            color: 'var(--ink-3)', fontSize: 19, marginTop: 24, maxWidth: '54ch',
            fontFamily: 'var(--font-display)', fontStyle: 'italic'
          }}>
            Cada pilar contiene tres esferas. Elige las que te están hablando hoy.
          </p>
        </div>

        {/* Dos modalidades */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 56 }}>
          <button onClick={() => setMode('todo')}
          className="rise-2"
          style={{
            padding: 36, textAlign: 'left', border: '1px solid',
            borderColor: mode === 'todo' ? 'var(--amber)' : 'var(--line-soft)',
            borderRadius: 'var(--r-lg)',
            background: mode === 'todo' ? 'var(--amber-soft)' : 'var(--bg-card)',
            color: 'var(--ink)', fontFamily: 'inherit', fontSize: 'inherit',
            cursor: 'pointer', transition: 'all 240ms ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span className="eyebrow-mono">Modalidad 01</span>
              <PillarAsterisk size={56} />
            </div>
            <h3 className="display" style={{ fontSize: 32, margin: 0, marginBottom: 14, lineHeight: 1.15 }}>
              Todo el mapa
            </h3>
            <p className="subtitle" style={{ fontSize: 18, margin: 0, marginBottom: 20, maxWidth: '32ch' }}>
              Las cuatro dimensiones, las doce esferas. La lectura más completa de quién eres hoy.
            </p>
            <div className="row" style={{ gap: 24, fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              <span><span className="amber">·</span> 63 preguntas</span>
              <span><span className="amber">·</span> 15–20 min</span>
            </div>
          </button>

          <button onClick={() => setMode('esferas')}
          className="rise-3"
          style={{
            padding: 36, textAlign: 'left', border: '1px solid',
            borderColor: mode === 'esferas' ? 'var(--amber)' : 'var(--line-soft)',
            borderRadius: 'var(--r-lg)',
            background: mode === 'esferas' ? 'var(--amber-soft)' : 'var(--bg-card)',
            color: 'var(--ink)', fontFamily: 'inherit', fontSize: 'inherit',
            cursor: 'pointer', transition: 'all 240ms ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span className="eyebrow-mono">Modalidad 02</span>
              <span style={{ display: 'inline-flex', gap: 4 }}>
                {['base', 'proposito', 'conexion', 'impacto'].map((p) => <PillarGlyph key={p} pillar={p} size={20} />)}
              </span>
            </div>
            <h3 className="display" style={{ fontSize: 32, margin: 0, marginBottom: 14, lineHeight: 1.15 }}>
              Trabajar por <em className="display-italic" style={{ color: 'var(--amber)' }}>esferas</em>
            </h3>
            <p className="subtitle" style={{ fontSize: 18, margin: 0, marginBottom: 20, maxWidth: '32ch' }}>
              Elige una esfera, varias o todas las de un pilar. Para cuando hay algo concreto que te pesa.
            </p>
            <div className="row" style={{ gap: 24, fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              <span><span className="amber">·</span> 5–7 preguntas por esfera</span>
              <span><span className="amber">·</span> A tu ritmo</span>
            </div>
          </button>
        </div>

        {/* Si eligen "todo" → CTA directo */}
        {mode === 'todo' &&
        <div className="rise" style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <button className="btn btn-primary" onClick={onPickFull} style={{ fontSize: 16, padding: '16px 32px' }}>
              Empezar el mapa completo <ArrowRight />
            </button>
          </div>
        }

        {/* Si eligen "esferas" → multi-select */}
        {mode === 'esferas' &&
        <div className="rise" style={{ marginTop: 24 }}>
            <div className="between" style={{ marginBottom: 32, alignItems: 'flex-end' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 10 }}>Elige una, varias o todas</p>
                <h2 className="display" style={{ fontSize: 32, margin: 0, lineHeight: 1.15, maxWidth: '24ch' }}>
                  Las esferas que <em className="display-italic" style={{ color: 'var(--amber)' }}>quieres mirar.</em>
                </h2>
              </div>
              <div className="eyebrow-mono">
                {selected.length} <span className="muted-2">de 12 seleccionadas</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {grouped.map((p) => {
              const allOn = p.spheres.every((s) => selected.includes(s.id));
              const someOn = p.spheres.some((s) => selected.includes(s.id));
              return (
                <div key={p.id}>
                    <div className="between" style={{ marginBottom: 16 }}>
                      <PillarRow pillar={p.id} size={28}>{p.name}</PillarRow>
                      <button onClick={() => togglePillar(p.id)} className="btn-link"
                    style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.06em',
                      textTransform: 'uppercase', color: allOn ? 'var(--amber)' : 'var(--ink-3)' }}>
                        {allOn ? '– Quitar el pilar' : someOn ? '+ Completar pilar' : '+ Todo este pilar'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {p.spheres.map((s) => {
                      const on = selected.includes(s.id);
                      return (
                        <button key={s.id}
                        className={`chip ${on ? 'selected' : ''}`}
                        onClick={() => toggle(s.id)}
                        style={{
                          '--pillar': PILLAR_COLORS[p.id],
                          '--pillar-soft': `${PILLAR_COLORS[p.id]}22`
                        }}>
                            <span className="chip-dot" style={{ background: PILLAR_COLORS[p.id] }} />
                            {s.name}
                          </button>);

                    })}
                    </div>
                  </div>);

            })}
            </div>

            <div style={{
            marginTop: 56, padding: '24px 28px',
            borderTop: '1px solid var(--line-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
            position: 'sticky', bottom: 0, background: 'var(--bg-deep)'
          }}>
              <div>
                <p className="eyebrow-mono" style={{ marginBottom: 4 }}>
                  {selected.length === 0 ? 'Selecciona al menos una esfera' :
                selected.length === 1 ? '1 esfera · ~5 min' :
                `${selected.length} esferas · ~${Math.round(selected.length * 4)} min`}
                </p>
                <p className="subtitle" style={{ fontSize: 17, margin: 0 }}>
                  {selected.length === 12 ? 'Estás eligiendo todo el mapa.' :
                selected.length >= 6 ? 'Una mirada amplia.' :
                selected.length >= 1 ? 'Una entrada concreta.' : ''}
                </p>
              </div>
              <button className="btn btn-primary" onClick={startEsferas}
            disabled={selected.length === 0}
            style={{ fontSize: 16, padding: '16px 28px' }}>
                Empezar <ArrowRight />
              </button>
            </div>
          </div>
        }
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════════════════
// DIAGNÓSTICO
// ═══════════════════════════════════════════════════════════════════════════
function Diagnosis({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showPause, setShowPause] = useState(false);
  const total = QUESTIONS.length;
  const halfway = Math.floor(total / 2);

  const q = QUESTIONS[idx];
  const sphere = SPHERES.find((s) => s.id === q.sphere);
  const pillar = PILLARS.find((p) => p.id === q.pillar);

  const advance = () => {
    if (idx === halfway - 1 && !showPause) {setShowPause(true);return;}
    if (idx < total - 1) setIdx(idx + 1);else
    onComplete();
  };

  const pickAnswer = (val) => {
    setAnswers({ ...answers, [idx]: val });
    setTimeout(advance, 320);
  };

  if (showPause) {
    return (
      <div className="canvas">
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '120px 44px',
          width: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 24 }}>{REFLECTION_PAUSE.eyebrow}</p>
            <p className="display-italic" style={{
              fontSize: 48, lineHeight: 1.2, margin: 0, marginBottom: 32,
              color: 'var(--ink)', textWrap: 'pretty', maxWidth: '20ch',
              letterSpacing: '-0.022em'
            }}>
              {REFLECTION_PAUSE.text}
            </p>
            <p className="subtitle" style={{ fontSize: 18, color: 'var(--ink-3)', marginBottom: 56, maxWidth: '46ch' }}>
              — {REFLECTION_PAUSE.hint}
            </p>
            <button className="btn btn-primary" onClick={() => {setShowPause(false);setIdx(idx + 1);}}>
              Sigo <ArrowRight />
            </button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="canvas">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 44px 140px', width: '100%' }}>
        {/* Trail superior */}
        <div className="between" style={{ marginBottom: 72 }}>
          <div className="row" style={{ gap: 14, alignItems: 'center' }}>
            <PillarGlyph pillar={pillar.id} size={22} />
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: PILLAR_COLORS[pillar.id]
            }}>{pillar.name}</span>
            <span style={{ width: 20, height: 1, background: 'var(--line)' }} />
            <span className="display-italic" style={{ fontSize: 16, color: 'var(--ink-2)' }}>{sphere.name}</span>
          </div>
          <div className="eyebrow-mono">
            {String(idx + 1).padStart(2, '0')} <span className="muted-2">de</span> {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* Pregunta */}
        <div key={idx} className="rise" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 28 }}>Responde desde tu realidad</p>
          <p className="display" style={{
            fontSize: 38, lineHeight: 1.25, margin: 0, color: 'var(--ink)',
            textWrap: 'pretty', maxWidth: '28ch', letterSpacing: '-0.02em', fontWeight: 500
          }}>
            {q.text}
          </p>
        </div>

        {/* Opciones Likert */}
        <div className="rise-2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LIKERT.map((opt) => {
            const selected = answers[idx] === opt.value;
            return (
              <button key={opt.value}
              className={`choice ${selected ? 'selected' : ''}`}
              onClick={() => pickAnswer(opt.value)}>
                <span className="choice-glyph" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                  color: selected ? 'var(--amber)' : 'var(--ink-3)',
                  letterSpacing: '0.05em'
                }}>{opt.glyph}</span>
                <span style={{ flex: 1 }}>{opt.label}</span>
              </button>);

          })}
        </div>

        {/* Nav */}
        <div className="between" style={{ marginTop: 56 }}>
          <button className="btn-link" disabled={idx === 0}
          onClick={() => idx > 0 && setIdx(idx - 1)}
          style={{ opacity: idx === 0 ? 0.3 : 1 }}>
            ← Anterior
          </button>
          <div className="steps-trail">
            {QUESTIONS.map((_, i) =>
            <div key={i} className={`step ${i < idx ? 'passed' : ''} ${i === idx ? 'current' : ''}`} />
            )}
          </div>
          <button className="btn-link" onClick={() => idx < total - 1 && setIdx(idx + 1)}
          disabled={!answers[idx]} style={{ opacity: !answers[idx] ? 0.3 : 1 }}>
            Saltar →
          </button>
        </div>
      </div>
    </div>);

}

// ── Iconito flecha ──────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M 2 7 L 12 7 M 8 3 L 12 7 L 8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

Object.assign(window, { Onboarding, Selector, Diagnosis, ArrowRight });