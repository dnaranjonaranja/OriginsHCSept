// screens-flow-v2.jsx — Onboarding emocional, Selector, Diagnóstico (v2 moderno)

const { useState } = React;

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════════════════════
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState(null);
  const total = 5;
  const next = () => step < total - 1 ? setStep(step + 1) : onComplete();

  return (
    <div className="canvas">
      <div style={{
        maxWidth: 720, margin: '0 auto', padding: '64px 32px 120px', width: '100%',
      }}>
        {/* Step badge */}
        <div className="rise" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 48,
        }}>
          <span className="eyebrow">
            Paso {String(step + 1).padStart(2, '0')} <span className="muted-2">/ {String(total).padStart(2, '0')}</span>
          </span>
          <div className="steps-trail">
            {Array.from({ length: total }).map((_, i) =>
              <div key={i} className={`step ${i < step ? 'passed' : ''} ${i === step ? 'current' : ''}`} />
            )}
          </div>
        </div>

        {step === 0 && (
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 22 }}>Bienvenido</p>
            <h1 className="display" style={{ fontSize: 56, marginBottom: 24, marginTop: 0, lineHeight: 1.0 }}>
              Este no es un test.<br />
              <em className="display-italic" style={{ color: 'var(--accent)' }}>
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
              borderTop: '1px solid var(--line)',
              paddingTop: 32, marginBottom: 36,
            }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Antes de comenzar</p>
              <h2 className="display" style={{ fontSize: 28, margin: '0 0 22', lineHeight: 1.15 }}>
                ¿Qué te trae hoy aquí?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {INTENT_OPTIONS.map((opt) => {
                  const selected = intent === opt.id;
                  return (
                    <button key={opt.id}
                      className={`choice ${selected ? 'selected' : ''}`}
                      onClick={() => setIntent(opt.id)}>
                      <span style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--line-strong)'}`,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />}
                      </span>
                      <span style={{ flex: 1 }}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
              <p style={{
                fontSize: 14, color: 'var(--ink-3)', marginTop: 22, maxWidth: '46ch',
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              }}>
                No importa dónde estés hoy. Lo importante es que estás dispuesto a mirarte.
              </p>
            </div>

            <button className="btn btn-primary" onClick={next} disabled={!intent}>
              Empezar <ArrowRight />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Qué es Human Complex</p>
            <h2 className="display" style={{ fontSize: 40, marginBottom: 18, marginTop: 0, lineHeight: 1.05 }}>
              No somos una sola dimensión.<br />
              <em className="display-italic" style={{ color: 'var(--accent)' }}>
                Somos un sistema complejo en cambio.
              </em>
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 16, marginBottom: 32, maxWidth: '54ch', lineHeight: 1.6 }}>
              Tu bienestar, tus decisiones, tus relaciones y tu sentido de vida
              están profundamente conectados. Cuando una dimensión se debilita,
              impacta a las demás. Cuando se fortalecen en conjunto, aparece
              equilibrio, claridad y dirección.
            </p>

            <div style={{
              padding: '24px 28px', background: 'var(--bg-rise)',
              borderRadius: 'var(--r-lg)', border: '1px solid var(--line)',
              marginBottom: 36,
            }}>
              <blockquote className="quote" style={{ margin: 0, fontSize: 20, maxWidth: '46ch' }}>
                La calidad de tu vida está directamente relacionada con la
                calidad de tu mundo interior.
              </blockquote>
            </div>

            <div style={{ marginBottom: 40 }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>La plataforma te permite</p>
              <ul style={{
                margin: 0, padding: 0, listStyle: 'none',
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
                color: 'var(--ink-2)', fontSize: 14.5,
              }}>
                {[
                  'Comprender cómo estás funcionando hoy',
                  'Identificar desequilibrios que te afectan',
                  'Reconocer tus fortalezas reales',
                  'Tomar decisiones más conscientes',
                  'Construir una vida más alineada contigo',
                ].map((t, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: 10, padding: '14px 16px',
                    border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
                    background: 'var(--bg)',
                  }}>
                    <span style={{
                      color: 'var(--accent)', fontFamily: 'var(--font-mono)',
                      fontSize: 12, fontWeight: 500,
                    }}>0{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight /></button>
              <button className="btn-link" onClick={() => setStep(0)}>← Atrás</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Los cuatro pilares</p>
            <h2 className="display" style={{ fontSize: 40, marginBottom: 14, marginTop: 0, lineHeight: 1.05 }}>
              Tu desarrollo se mira a través de<br />
              <em className="display-italic" style={{ color: 'var(--accent)' }}>cuatro pilares fundamentales.</em>
            </h2>
            <p style={{ color: 'var(--ink-3)', fontSize: 15, marginBottom: 36, maxWidth: '52ch' }}>
              Ningún pilar es más importante que otro. El verdadero desarrollo
              ocurre en el equilibrio entre ellos.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12, marginBottom: 44,
            }}>
              {PILLARS.map((p) => (
                <div key={p.id} style={{
                  padding: '22px 22px',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-md)',
                  background: 'var(--bg-card)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <PillarGlyph pillar={p.id} size={18} />
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      color: 'var(--ink-2)',
                    }}>{p.name}</span>
                  </div>
                  <p className="display" style={{
                    fontSize: 22, margin: '0 0 10', fontWeight: 500,
                    color: 'var(--ink)', lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}>
                    {p.question}
                  </p>
                  <p style={{
                    fontSize: 12, margin: 0, color: 'var(--ink-3)',
                    lineHeight: 1.5, fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.01em',
                  }}>
                    {p.descriptor}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight /></button>
              <button className="btn-link" onClick={() => setStep(1)}>← Atrás</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Una promesa antes de empezar</p>
            <h2 className="display" style={{ fontSize: 36, marginBottom: 28, marginTop: 0, lineHeight: 1.1 }}>
              Lo que escribas aquí <em className="display-italic" style={{ color: 'var(--accent)' }}>queda contigo.</em>
            </h2>

            <div style={{
              padding: '4px 0', marginBottom: 24,
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-lg)',
              background: 'var(--bg-card)',
              overflow: 'hidden',
            }}>
              {[
                ['Privacidad', 'Tus respuestas son tuyas. Nadie de tu organización ve respuestas individuales.'],
                ['Agregación', 'Tu organización solo verá tendencias agregadas, nunca nombres.'],
                ['Ritmo', 'Puedes pausar y continuar cuando lo necesites.'],
              ].map(([k, v], i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr',
                  gap: 24, padding: '20px 24px',
                  borderBottom: i < 2 ? '1px solid var(--line-soft)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    color: 'var(--accent)', alignSelf: 'start', paddingTop: 2,
                  }}>{k}</span>
                  <span style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{v}</span>
                </div>
              ))}
            </div>

            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '14px 0 28px', cursor: 'pointer', color: 'var(--ink-2)',
              fontSize: 14,
            }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 4, accentColor: 'var(--accent)' }} />
              <span>
                Entiendo y acepto. <span className="muted-2">(Puedes leer la política completa en cualquier momento.)</span>
              </span>
            </label>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Acepto, sigamos</button>
              <button className="btn-link" onClick={() => setStep(2)}>← Atrás</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Cómo responder</p>
            <h2 className="display" style={{ fontSize: 40, marginBottom: 24, marginTop: 0, lineHeight: 1.05 }}>
              No hay <em className="display-italic" style={{ color: 'var(--accent)' }}>respuestas correctas.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: '54ch', marginBottom: 14 }}>
              Responde desde tu realidad, no desde lo que <em>"debería ser"</em>.
              Este ejercicio es para ti, no para cumplir expectativas externas.
            </p>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', maxWidth: '54ch', marginBottom: 36 }}>
              Si una pregunta te incomoda, esa incomodidad ya es información.
              Quédate ahí un segundo más antes de responder.
            </p>

            <div style={{
              display: 'flex', gap: 0, marginBottom: 40,
              border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
              overflow: 'hidden', maxWidth: 540,
            }}>
              {[
                ['Tiempo', '15–20 min'],
                ['Pausas', 'Cuando quieras'],
                ['Privacidad', 'Solo para ti'],
              ].map(([k, v], i) => (
                <div key={i} style={{
                  flex: 1, padding: '14px 18px',
                  borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
                  background: 'var(--bg-card)',
                }}>
                  <p className="eyebrow" style={{ marginBottom: 6, fontSize: 10 }}>{k}</p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{v}</p>
                </div>
              ))}
            </div>

            <blockquote className="quote" style={{ fontSize: 22, marginBottom: 48 }}>
              Tómate unos segundos. Respira profundamente. Entre más honesto seas
              contigo, más valioso será el resultado.
            </blockquote>

            <button className="btn btn-primary" onClick={next}>
              Estoy listo <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SELECTOR
// ═══════════════════════════════════════════════════════════════════════════
function Selector({ onPickFull, onPickSphere }) {
  const grouped = PILLARS.map((p) => ({
    ...p,
    spheres: SPHERES.filter((s) => s.pillar === p.id),
  }));

  return (
    <div className="canvas">
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 32px 140px', width: '100%' }}>
        <div className="rise" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Por dónde empezar</p>
          <h1 className="display" style={{ fontSize: 48, margin: 0, lineHeight: 1.05, maxWidth: '20ch' }}>
            Puedes mirarlo todo, o<br />
            <em className="display-italic" style={{ color: 'var(--accent)' }}>elegir una sola dimensión.</em>
          </h1>
        </div>

        {/* Modalidades */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
          marginBottom: 64,
        }}>
          <button className="rise-2" onClick={onPickFull}
            style={{
              padding: 28, textAlign: 'left',
              border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
              cursor: 'pointer', background: 'var(--ink)', color: 'var(--bg)',
              fontFamily: 'inherit', fontSize: 'inherit',
              transition: 'all 200ms ease',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'var(--accent)',
                padding: '4px 10px', border: '1px solid var(--accent-line)',
                borderRadius: 'var(--r-pill)',
              }}>Recomendado</span>
              <ArrowRight />
            </div>
            <h3 className="display" style={{ fontSize: 30, margin: '0 0 14', lineHeight: 1.1 }}>
              Diagnóstico completo
            </h3>
            <p style={{ color: 'oklch(1 0 0 / 0.65)', fontSize: 14, margin: 0, marginBottom: 28, maxWidth: '38ch', lineHeight: 1.55 }}>
              Un mapa integral de tu estado actual a través de los cuatro pilares.
              63 preguntas — 15 a 20 minutos contigo mismo.
            </p>
            <div style={{ display: 'flex', gap: 24, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'oklch(1 0 0 / 0.55)' }}>
              <span>63 PREGUNTAS</span>
              <span>·</span>
              <span>15–20 MIN</span>
            </div>
          </button>

          <button className="rise-3" onClick={() => onPickSphere('ejecucion')}
            style={{
              padding: 28, textAlign: 'left',
              border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
              cursor: 'pointer', background: 'var(--bg-card)', color: 'var(--ink)',
              fontFamily: 'inherit', fontSize: 'inherit',
              transition: 'all 200ms ease',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'var(--ink-3)',
                padding: '4px 10px', border: '1px solid var(--line)',
                borderRadius: 'var(--r-pill)',
              }}>Modo rápido</span>
              <span style={{ color: 'var(--ink-3)' }}><ArrowRight /></span>
            </div>
            <h3 className="display" style={{ fontSize: 30, margin: '0 0 14', lineHeight: 1.1 }}>
              Una sola dimensión
            </h3>
            <p style={{ color: 'var(--ink-3)', fontSize: 14, margin: 0, marginBottom: 28, maxWidth: '38ch', lineHeight: 1.55 }}>
              Empieza por la que ya te está hablando. 5 a 7 preguntas sobre un
              solo aspecto, cuando algo concreto te pese.
            </p>
            <div style={{ display: 'flex', gap: 24, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--ink-4)' }}>
              <span>5–7 PREGUNTAS</span>
              <span>·</span>
              <span>3–5 MIN</span>
            </div>
          </button>
        </div>

        {/* Grid */}
        <div className="rise-4">
          <div style={{
            display: 'flex', alignItems: 'baseline',
            justifyContent: 'space-between', marginBottom: 28,
            paddingBottom: 14, borderBottom: '1px solid var(--line)',
          }}>
            <p className="eyebrow">O elige directamente una dimensión</p>
            <span className="eyebrow-mono">{SPHERES.length} dimensiones · 4 pilares</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {grouped.map((p) => (
              <div key={p.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <PillarGlyph pillar={p.id} size={16} />
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500,
                    color: 'var(--ink)', letterSpacing: '-0.015em',
                  }}>{p.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: 15, color: 'var(--ink-3)',
                  }}>— {p.question}</span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 10,
                }}>
                  {p.spheres.map((s) => (
                    <button key={s.id} className="sphere-tile" onClick={() => onPickSphere(s.id)}>
                      <div className="sphere-tile-name">{s.name}</div>
                      <div style={{
                        fontSize: 13, color: 'var(--ink-3)',
                        fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                        lineHeight: 1.4,
                      }}>
                        {s.subtitle}
                      </div>
                      <div className="sphere-tile-meta">
                        <span>5–7 PREGUNTAS</span>
                        <span style={{ color: 'var(--ink-3)' }}>→</span>
                      </div>
                    </button>
                  ))}
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
    if (idx === halfway - 1 && !showPause) { setShowPause(true); return; }
    if (idx < total - 1) setIdx(idx + 1);
    else onComplete();
  };

  const pickAnswer = (val) => {
    setAnswers({ ...answers, [idx]: val });
    setTimeout(advance, 280);
  };

  if (showPause) {
    return (
      <div className="canvas">
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '120px 32px',
          width: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', minHeight: 'calc(100vh - 70px)' }}>
          <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 22, color: 'var(--accent)' }}>
              {REFLECTION_PAUSE.eyebrow.toUpperCase()} · PAUSA
            </p>
            <p className="display" style={{
              fontSize: 38, lineHeight: 1.15, margin: 0, marginBottom: 28,
              color: 'var(--ink)', textWrap: 'pretty', maxWidth: '24ch',
              letterSpacing: '-0.025em',
            }}>
              {REFLECTION_PAUSE.text}
            </p>
            <p style={{
              fontSize: 16, color: 'var(--ink-3)', marginBottom: 48, maxWidth: '46ch',
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            }}>
              {REFLECTION_PAUSE.hint}
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
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 32px 120px', width: '100%' }}>
        {/* Trail superior */}
        <div className="between" style={{
          marginBottom: 56, paddingBottom: 18,
          borderBottom: '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <PillarChip pillar={pillar.id} />
            <span style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 15, color: 'var(--ink-2)',
            }}>{sphere.name}</span>
          </div>
          <div className="eyebrow-mono">
            {String(idx + 1).padStart(2, '0')} <span className="muted-2">/ {String(total).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Pregunta */}
        <div key={idx} className="rise" style={{ marginBottom: 40 }}>
          <p className="eyebrow" style={{ marginBottom: 22 }}>Responde desde tu realidad</p>
          <p className="display" style={{
            fontSize: 32, lineHeight: 1.15, margin: 0, color: 'var(--ink)',
            textWrap: 'pretty', maxWidth: '28ch',
            letterSpacing: '-0.025em',
          }}>
            {q.text}
          </p>
        </div>

        {/* Opciones */}
        <div className="rise-2" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LIKERT.map((opt) => {
            const selected = answers[idx] === opt.value;
            return (
              <button
                key={opt.value}
                className={`choice ${selected ? 'selected' : ''}`}
                onClick={() => pickAnswer(opt.value)}>
                <span style={{
                  width: 24, height: 24, flexShrink: 0,
                  border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--line-strong)'}`,
                  borderRadius: 'var(--r-sm)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                  color: selected ? 'var(--accent)' : 'var(--ink-3)',
                }}>{opt.value}</span>
                <span style={{ flex: 1 }}>{opt.label}</span>
                <span className="eyebrow-mono" style={{ fontSize: 10, opacity: selected ? 1 : 0.5 }}>
                  {opt.glyph}
                </span>
              </button>
            );
          })}
        </div>

        {/* Nav */}
        <div className="between" style={{ marginTop: 40 }}>
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
    </div>
  );
}

// ── ArrowRight ──────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M 2 7 L 12 7 M 8 3 L 12 7 L 8 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, { Onboarding, Selector, Diagnosis, ArrowRight });
