// screens-flow.jsx — Onboarding emocional, Selector, Diagnóstico

const { useState } = React;

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING EMOCIONAL
// 0 — Bienvenida + intención · 1 — Qué es Human Complex · 2 — Los 4 pilares
// 3 — Privacidad · 4 — Instrucciones
// ═══════════════════════════════════════════════════════════════════════════
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState(null);
  const total = 5;
  const next = () => step < total - 1 ? setStep(step + 1) : onComplete();

  return (
    <div className="canvas" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <div style={{
        maxWidth: 680, margin: '0 auto', padding: '64px 40px 120px',
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>
        {step === 0 &&
        <div className="rise">
            <div style={{ marginBottom: 48 }}>
              <HCLogo size={48} />
            </div>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Bienvenido</p>
            <h1 className="display" style={{ fontSize: 52, marginBottom: 24, marginTop: 0, lineHeight: 1.05 }}>
              Este no es un test.<br />
              <em className="display-italic" style={{ color: 'var(--amber)' }}>
                Estás aquí para encontrarte contigo.
              </em>
            </h1>
            <p style={{ fontSize: 17, color: 'var(--ink-2)', marginBottom: 14, maxWidth: '52ch', lineHeight: 1.55 }}>
              En un mundo que exige respuestas rápidas, Human Complex es un
              espacio para hacer algo distinto: detenerte, observarte y
              comprenderte con mayor profundidad.
            </p>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', marginBottom: 40, maxWidth: '52ch' }}>
              No estás aquí para ser evaluado. No hay puntajes ni veredictos.
              Solo lo que aparece cuando te detienes a mirarte de frente.
            </p>

            <div style={{
              borderTop: '0.5px solid var(--line-soft)',
              paddingTop: 36, marginBottom: 36,
            }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Antes de comenzar</p>
              <p className="display" style={{ fontSize: 26, margin: 0, marginBottom: 22, lineHeight: 1.2 }}>
                ¿Qué te trae <em className="display-italic" style={{ color: 'var(--amber)' }}>hoy aquí?</em>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {INTENT_OPTIONS.map((opt) => {
                  const selected = intent === opt.id;
                  return (
                    <button key={opt.id}
                      className={`choice ${selected ? 'selected' : ''}`}
                      onClick={() => setIntent(opt.id)}
                      style={{ paddingLeft: 22 }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: selected ? 'var(--amber)' : 'var(--ink-4)',
                        flexShrink: 0,
                      }} />
                      <span style={{ flex: 1 }}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
              <p className="display-italic" style={{
                fontSize: 15, color: 'var(--ink-3)', marginTop: 24, maxWidth: '44ch'
              }}>
                — No importa dónde estés hoy. Lo importante es que estás dispuesto a mirarte.
              </p>
            </div>

            <button className="btn btn-primary" onClick={next} disabled={!intent}
              style={{ opacity: intent ? 1 : 0.4 }}>
              Empezar
              <ArrowRight />
            </button>
          </div>
        }

        {step === 1 &&
        <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Qué es Human Complex</p>
            <h2 className="display" style={{ fontSize: 36, marginBottom: 18, marginTop: 0, lineHeight: 1.15 }}>
              No somos una sola dimensión.<br />
              <em className="display-italic" style={{ color: 'var(--amber)' }}>
                Somos un sistema complejo en cambio.
              </em>
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, marginBottom: 18, maxWidth: '52ch', lineHeight: 1.6 }}>
              Tu bienestar, tus decisiones, tus relaciones y tu sentido de vida
              están profundamente conectados. Cuando una dimensión se debilita,
              impacta a las demás. Cuando se fortalecen en conjunto, aparece
              equilibrio, claridad y dirección.
            </p>
            <blockquote className="quote" style={{ marginTop: 28, marginBottom: 40, maxWidth: '40ch' }}>
              La calidad de tu vida está directamente relacionada con la
              calidad de tu mundo interior.
            </blockquote>

            <div style={{
              padding: '22px 0 0', borderTop: '0.5px solid var(--line-soft)',
              marginBottom: 40,
            }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Esta plataforma te permite</p>
              <ul style={{
                margin: 0, padding: 0, listStyle: 'none',
                display: 'flex', flexDirection: 'column', gap: 12,
                color: 'var(--ink-2)', fontSize: 15,
              }}>
                {[
                  'Comprender cómo estás funcionando hoy, de forma integral',
                  'Identificar desequilibrios que pueden estar afectándote',
                  'Reconocer tus fortalezas reales — no idealizadas',
                  'Tomar decisiones más conscientes',
                  'Construir una vida más alineada contigo',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14 }}>
                    <span className="amber" style={{ marginTop: 2 }}>—</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight /></button>
              <button className="btn-link" onClick={() => setStep(0)}>Atrás</button>
            </div>
          </div>
        }

        {step === 2 &&
        <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Los cuatro pilares</p>
            <h2 className="display" style={{ fontSize: 36, marginBottom: 14, marginTop: 0, lineHeight: 1.15 }}>
              Tu desarrollo se mira a través de<br />
              <em className="display-italic" style={{ color: 'var(--amber)' }}>cuatro pilares fundamentales.</em>
            </h2>
            <p style={{ color: 'var(--ink-3)', fontSize: 15, marginBottom: 36, maxWidth: '52ch' }}>
              Ningún pilar es más importante que otro.
              El verdadero desarrollo ocurre en el equilibrio entre ellos.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 44 }}>
              {PILLARS.map((p) =>
            <div key={p.id} style={{
              padding: '22px 22px',
              border: '0.5px solid var(--line-soft)',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-rise)'
            }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <PillarGlyph pillar={p.id} size={16} />
                    <span style={{
                      fontFamily: 'var(--font-ui)', fontSize: 11,
                      letterSpacing: '0.16em', textTransform: 'uppercase',
                      color: 'var(--ink-3)'
                    }}>{p.name}</span>
                  </div>
                  <p className="display" style={{
                    fontSize: 17, margin: '0 0 8px', fontStyle: 'italic',
                    color: 'var(--ink)', lineHeight: 1.25,
                  }}>
                    {p.question}
                  </p>
                  <p style={{
                    fontSize: 12, margin: 0, color: 'var(--ink-3)',
                    lineHeight: 1.5, fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.02em',
                  }}>
                    {p.descriptor}
                  </p>
                </div>
            )}
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight /></button>
              <button className="btn-link" onClick={() => setStep(1)}>Atrás</button>
            </div>
          </div>
        }

        {step === 3 &&
        <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Una promesa antes de empezar</p>
            <h2 className="display" style={{ fontSize: 34, marginBottom: 28, marginTop: 0, lineHeight: 1.15 }}>
              Lo que escribas aquí <em className="display-italic" style={{ color: 'var(--amber)' }}>queda contigo.</em>
            </h2>

            <div className="card" style={{ padding: 28, marginBottom: 22 }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--ink-2)', fontSize: 15 }}>
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
            </div>

            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '16px 0', cursor: 'pointer', color: 'var(--ink-2)',
              fontSize: 14, marginBottom: 32
            }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 4, accentColor: 'oklch(0.72 0.13 60)' }} />
              <span>
                Entiendo y acepto. <span className="muted-2">(Puedes leer la política completa en cualquier momento.)</span>
              </span>
            </label>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Acepto, sigamos</button>
              <button className="btn-link" onClick={() => setStep(2)}>Atrás</button>
            </div>
          </div>
        }

        {step === 4 &&
        <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Cómo responder</p>
            <h2 className="display" style={{ fontSize: 36, marginBottom: 24, marginTop: 0, lineHeight: 1.15 }}>
              No hay <em className="display-italic" style={{ color: 'var(--amber)' }}>respuestas correctas.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: '52ch', marginBottom: 14 }}>
              Responde desde tu realidad, no desde lo que <em>"debería ser"</em>.
              Este ejercicio es para ti, no para cumplir expectativas externas.
            </p>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: '52ch', marginBottom: 32 }}>
              Si una pregunta te incomoda, esa incomodidad ya es información.
              Quédate ahí un segundo más antes de responder.
            </p>

            <div style={{
              display: 'flex', gap: 24, marginBottom: 40,
              fontSize: 13, color: 'var(--ink-3)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
            }}>
              <span><span className="amber">·</span> 15–20 min</span>
              <span><span className="amber">·</span> Puedes pausar</span>
              <span><span className="amber">·</span> Solo para ti</span>
            </div>

            <blockquote className="quote" style={{ fontSize: 21, marginBottom: 48 }}>
              Tómate unos segundos. Respira profundamente. Entre más honesto seas
              contigo, más valioso será el resultado.
            </blockquote>

            <button className="btn btn-primary" onClick={next}>
              Estoy listo
              <ArrowRight />
            </button>
          </div>
        }

        {/* Trail */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 72 }}>
          <div className="steps-trail">
            {Array.from({ length: total }).map((_, i) =>
            <div key={i} className={`step ${i < step ? 'passed' : ''} ${i === step ? 'current' : ''}`} />
            )}
          </div>
        </div>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════════════════
// SELECTOR DE MODALIDAD
// ═══════════════════════════════════════════════════════════════════════════
function Selector({ onPickFull, onPickSphere }) {
  const grouped = PILLARS.map((p) => ({
    ...p,
    spheres: SPHERES.filter((s) => s.pillar === p.id)
  }));

  return (
    <div className="canvas">
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 40px 140px', width: '100%' }}>
        <div className="rise" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Por dónde empezar</p>
          <h1 className="display" style={{ fontSize: 44, margin: 0, lineHeight: 1.1, maxWidth: '20ch' }}>
            Puedes mirarlo todo, o<br />
            <em className="display-italic" style={{ color: 'var(--amber)' }}>elegir una sola dimensión.</em>
          </h1>
        </div>

        {/* Dos modalidades */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 64 }}>
          <button className="card-rise rise-2" onClick={onPickFull}
          style={{ padding: 32, textAlign: 'left', border: 'none', cursor: 'pointer',
            background: 'var(--bg-rise)', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <span className="eyebrow-mono">Diagnóstico completo</span>
              <span style={{ color: 'var(--amber)' }}><ArrowRight /></span>
            </div>
            <h3 className="display" style={{ fontSize: 26, margin: 0, marginBottom: 16, lineHeight: 1.2 }}>
              Un mapa integral de tu estado actual.
            </h3>
            <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: 0, marginBottom: 24, maxWidth: '36ch' }}>
              63 preguntas a través de los cuatro pilares. Es lo más completo,
              y también lo más demandante. Reserva 15 a 20 minutos contigo mismo.
            </p>
            <div className="row" style={{ gap: 24, fontSize: 12, color: 'var(--ink-3)' }}>
              <span><span className="amber">·</span> 63 preguntas</span>
              <span><span className="amber">·</span> 15–20 min</span>
            </div>
          </button>

          <button className="card-rise rise-3" onClick={() => onPickSphere('ejecucion')}
          style={{ padding: 32, textAlign: 'left', border: 'none', cursor: 'pointer',
            background: 'transparent', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 'inherit',
            borderColor: 'var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <span className="eyebrow-mono">Una sola dimensión</span>
              <span style={{ color: 'var(--ink-3)' }}><ArrowRight /></span>
            </div>
            <h3 className="display" style={{ fontSize: 26, margin: 0, marginBottom: 16, lineHeight: 1.2 }}>
              Empieza por la que ya<br /><em className="display-italic" style={{ color: 'var(--amber)' }}>te está hablando.</em>
            </h3>
            <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: 0, marginBottom: 24, maxWidth: '36ch' }}>
              5 a 7 preguntas sobre un solo aspecto de tu vida.
              Cuando tengas pocos minutos, o cuando algo concreto te pese.
            </p>
            <div className="row" style={{ gap: 24, fontSize: 12, color: 'var(--ink-3)' }}>
              <span><span className="amber">·</span> 5–7 preguntas</span>
              <span><span className="amber">·</span> 3–5 min</span>
            </div>
          </button>
        </div>

        {/* Grid de dimensiones */}
        <div className="rise-4">
          <p className="eyebrow" style={{ marginBottom: 28 }}>O elige directamente una dimensión</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {grouped.map((p) =>
            <div key={p.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, color: 'var(--ink-3)' }}>
                  <PillarGlyph pillar={p.id} size={14} />
                  <span style={{
                  fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.16em', textTransform: 'uppercase'
                }}>{p.name}</span>
                  <span className="display-italic muted-2" style={{ fontSize: 13, marginLeft: 4 }}>
                    {p.question}
                  </span>
                </div>
                <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 12
              }}>
                  {p.spheres.map((s) =>
                <button key={s.id} className="sphere-tile" onClick={() => onPickSphere(s.id)}>
                      <div className="sphere-tile-name">{s.name}</div>
                      <div className="muted-2" style={{ fontSize: 13, fontStyle: 'italic',
                    fontFamily: 'var(--font-display)', color: 'var(--ink-3)' }}>
                        {s.subtitle}
                      </div>
                      <div className="sphere-tile-meta">
                        <span>5–7 preguntas</span>
                        <span>→</span>
                      </div>
                    </button>
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════════════════════
// DIAGNÓSTICO — con pausa reflexiva a mitad del camino
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
    if (idx === halfway - 1 && !showPause) { setShowPause(true); return; }
    if (idx < total - 1) setIdx(idx + 1);
    else onComplete();
  };

  const pickAnswer = (val) => {
    setAnswers({ ...answers, [idx]: val });
    setTimeout(advance, 320);
  };

  if (showPause) {
    return (
      <div className="canvas">
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '120px 40px',
          width: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', minHeight: 'calc(100vh - 70px)' }}>
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 22 }}>{REFLECTION_PAUSE.eyebrow}</p>
            <p className="display" style={{
              fontSize: 38, lineHeight: 1.25, margin: 0, marginBottom: 28,
              color: 'var(--ink)', textWrap: 'pretty', maxWidth: '24ch',
              fontStyle: 'italic',
            }}>
              {REFLECTION_PAUSE.text}
            </p>
            <p className="display-italic" style={{
              fontSize: 16, color: 'var(--ink-3)', marginBottom: 48, maxWidth: '46ch'
            }}>
              — {REFLECTION_PAUSE.hint}
            </p>
            <button className="btn btn-primary" onClick={() => {
              setShowPause(false);
              setIdx(idx + 1);
            }}>
              Sigo <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="canvas">
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 40px 120px', width: '100%' }}>
        {/* Trail superior */}
        <div className="between" style={{ marginBottom: 64 }}>
          <div className="row" style={{ gap: 12, alignItems: 'center', color: 'var(--ink-3)' }}>
            <PillarGlyph pillar={pillar.id} size={14} />
            <span className="eyebrow" style={{ letterSpacing: '0.14em' }}>{pillar.name}</span>
            <span style={{ width: 18, height: 1, background: 'var(--line)' }} />
            <span className="display-italic" style={{ fontSize: 14, color: 'var(--ink-2)' }}>{sphere.name}</span>
          </div>
          <div className="eyebrow-mono">
            {String(idx + 1).padStart(2, '0')} <span className="muted-2">de</span> {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* Pregunta */}
        <div key={idx} className="rise" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>Responde desde tu realidad</p>
          <p className="display" style={{
            fontSize: 32, lineHeight: 1.25, margin: 0, color: 'var(--ink)',
            textWrap: 'pretty', maxWidth: '26ch'
          }}>
            {q.text}
          </p>
        </div>

        {/* Opciones Likert */}
        <div className="rise-2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LIKERT.map((opt) => {
            const selected = answers[idx] === opt.value;
            return (
              <button
                key={opt.value}
                className={`choice ${selected ? 'selected' : ''}`}
                onClick={() => pickAnswer(opt.value)}>
                <span className="choice-glyph" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: selected ? 'var(--amber)' : 'var(--ink-3)',
                  letterSpacing: '0.05em'
                }}>{opt.glyph}</span>
                <span style={{ flex: 1 }}>{opt.label}</span>
              </button>);

          })}
        </div>

        {/* Nav */}
        <div className="between" style={{ marginTop: 48 }}>
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
      <path d="M 2 7 L 12 7 M 8 3 L 12 7 L 8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

Object.assign(window, { Onboarding, Selector, Diagnosis, ArrowRight });
