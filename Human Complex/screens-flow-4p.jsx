// screens-flow.jsx — Onboarding emocional, Selector de modalidad, Diagnóstico
// Lenguaje editorial. Tipografía grande. Trazos del logo como íconos de pilar.

const { useState } = React;

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING
// 0 — Bienvenida (sin intent block)
// 1 — Qué es 4P
// 2 — Los 4 pilares (asterisco interactivo)
// 3 — Privacidad
// 4 — Cómo responder
// ═══════════════════════════════════════════════════════════════════════════
function Onboarding({ onComplete, setView }) {
  const [step, setStep] = useState(0);
  const [hoverPillar, setHoverPillar] = useState(null);
  const [openPillarDef, setOpenPillarDef] = useState(null);
  const total = 4;
  const next = () => step < total - 1 ? setStep(step + 1) : onComplete();

  return (
    <div className="canvas" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div style={{
        maxWidth: 760, margin: '0 auto', padding: '40px 44px 80px',
        flex: 1, display: 'flex', justifyContent: step === 0 ? 'flex-start' : 'center',
        width: '100%', alignItems: "center", flexDirection: "column",
        ...(step === 0 ? { height: '100%', paddingTop: 16 } : { paddingTop: 20 })
      }}>
        {step === 0 &&
        <div className="rise">
            <h1 className="display" style={{
            fontSize: 52, marginBottom: 20, marginTop: 0, lineHeight: 1.08,
            letterSpacing: '-0.025em', maxWidth: '15ch', color: "rgb(13, 37, 62)", textAlign: 'center'
          }}>
              <span style={{ fontSize: '42px' }}>Conecta con tu esencia.</span>{' '}
              <em className="display-italic" style={{ color: 'var(--amber)', textAlign: "center", fontSize: '34px' }}>Comprenderte es la base de tu desarrollo.

            </em>
            </h1>
            <p style={{
            fontSize: 17, color: 'var(--ink-2)', marginBottom: 14, maxWidth: '48ch',
            lineHeight: 1.45, fontFamily: 'var(--font-display)', fontWeight: 400, textAlign: 'center'
          }}>
              En un mundo que exige respuestas rápidas, Origins es un espacio para hacer
              algo distinto: detenerte, observarte y comprenderte con mayor profundidad.
            </p>
            <p style={{ fontSize: 14.5, color: 'var(--ink-3)', marginBottom: 28, maxWidth: '48ch', lineHeight: 1.5, textAlign: 'center' }}>
              No estás aquí para ser evaluado. No hay puntajes ni veredictos.
              Solo lo que aparece cuando te detienes a mirarte de frente.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={next} style={{ fontSize: 15, padding: '14px 26px' }}>
                Empezar
                <ArrowRight />
              </button>
            </div>

            <p className="eyebrow-mono" style={{ marginTop: 18, fontSize: 10.5, textAlign: 'center' }}>
              <span style={{ color: 'var(--amber)' }}>·</span> 15–20 min &nbsp;·&nbsp;
              <span style={{ color: 'var(--amber)' }}>·</span> Puedes pausar &nbsp;·&nbsp;
              <span style={{ color: 'var(--amber)' }}>·</span> Solo para ti
            </p>
          </div>
        }

        {step === 1 &&
        <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 20 }}>¿Qué es Origins by Human Complex?</p>
            <h2 className="display" style={{
            fontSize: 56, marginBottom: 28, marginTop: 0, lineHeight: 1.05,
            letterSpacing: '-0.024em', maxWidth: '18ch'
          }}>
              No somos una sola dimensión.{' '}
              <em className="display-italic" style={{ color: 'var(--amber)' }}>
                Somos un sistema complejo en cambio.
              </em>
            </h2>
            <p style={{
            color: 'var(--ink-2)', fontSize: 19, marginBottom: 20, maxWidth: '52ch',
            lineHeight: 1.55, fontFamily: 'var(--font-display)', fontWeight: 400
          }}>
              Tu bienestar, tus decisiones, tus relaciones y tu sentido de vida están
              profundamente conectados. Cuando una dimensión se debilita, impacta a las
              demás. Cuando se fortalecen en conjunto, aparece equilibrio, claridad y dirección.
            </p>
            <blockquote className="quote" style={{ marginTop: 36, marginBottom: 48, maxWidth: '40ch' }}>
              La calidad de tu vida está directamente relacionada con la calidad de tu mundo interior.
            </blockquote>

            <div style={{ padding: '28px 0 0', borderTop: '1px solid var(--line-soft)', marginBottom: 48 }}>
              <p className="eyebrow" style={{ marginBottom: 18 }}>Esta plataforma te permite</p>
              <ul style={{
              margin: 0, padding: 0, listStyle: 'none',
              display: 'flex', flexDirection: 'column', gap: 14,
              color: 'var(--ink-2)', fontSize: 17
            }}>
                {[
              'Comprender cómo estás funcionando hoy, de forma integral',
              'Identificar desequilibrios que pueden estar afectándote',
              'Reconocer tus fortalezas reales — no idealizadas',
              'Tomar decisiones más conscientes',
              'Construir una vida más alineada contigo'].
              map((t, i) =>
              <li key={i} style={{ display: 'flex', gap: 16 }}>
                    <span className="amber" style={{ marginTop: 4, fontFamily: 'var(--font-display)' }}>—</span>
                    <span>{t}</span>
                  </li>
              )}
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
            <p className="eyebrow" style={{ marginBottom: 20 }}>Los cuatro pilares</p>
            <h2 className="display" style={{
            fontSize: 56, marginBottom: 20, marginTop: 0, lineHeight: 1.05,
            letterSpacing: '-0.024em', maxWidth: '20ch'
          }}>
              Tu desarrollo se mira a través de{' '}
              <em className="display-italic" style={{ color: 'var(--amber)' }}>cuatro pilares fundamentales.</em>
            </h2>
            <p style={{ color: 'var(--ink-3)', fontSize: 17, marginBottom: 48, maxWidth: '52ch', lineHeight: 1.6 }}>
              Ningún pilar es más importante que otro. El verdadero desarrollo ocurre
              en el equilibrio entre ellos. Pasa el cursor sobre cada trazo del símbolo.
            </p>

            {/* Asterisco interactivo grande, junto a la lista */}
            <div className="flow-asterisk" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 56, alignItems: 'center', marginBottom: 64 }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PillarAsterisk
                size={260}
                active={hoverPillar ? [hoverPillar] : ['base', 'proposito', 'conexion', 'impacto']}
                onClickPillar={(p) => setHoverPillar(hoverPillar === p ? null : p)} />
              
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PILLARS.map((p) => {
                const active = !hoverPillar || hoverPillar === p.id;
                return (
                  <div key={p.id}
                  onMouseEnter={() => setHoverPillar(p.id)}
                  onMouseLeave={() => setHoverPillar(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 18,
                    padding: '14px 16px',
                    border: `1px solid ${active ? 'var(--line)' : 'transparent'}`,
                    borderRadius: 'var(--r-md)',
                    opacity: active ? 1 : 0.4,
                    transition: 'all 280ms ease',
                    cursor: 'pointer'
                  }}>
                      <PillarGlyph pillar={p.id} size={36} />
                      <div style={{ flex: 1 }}>
                        <div style={{
                        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        color: PILLAR_COLORS[p.id], marginBottom: 4
                      }}>{p.name}</div>
                        <div className="display-italic" style={{ fontSize: 19, color: 'var(--ink)', marginBottom: 2 }}>
                          {p.question}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--font-ui)' }}>
                          {p.descriptor}
                        </div>
                      </div>
                    </div>);

              })}
              </div>
            </div>

            {/* Definiciones completas — acordeón por pilar y esfera */}
            <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: 40, marginBottom: 48 }}>
              <p className="eyebrow" style={{ marginBottom: 24 }}>Conoce cada pilar a fondo</p>
              <div className="def-pillar-stack">
                {PILLAR_DEFINITIONS.map((pd) => (
                  <PillarAccordionCard key={pd.id} pillar={pd} open={openPillarDef === pd.id}
                    onToggle={() => setOpenPillarDef(openPillarDef === pd.id ? null : pd.id)} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>Sigue <ArrowRight /></button>
              <button className="btn-link" onClick={() => setStep(1)}>Atrás</button>
            </div>
          </div>
        }

        {step === 3 &&
        <div className="rise">
            <p className="eyebrow" style={{ marginBottom: 20 }}>Una promesa antes de empezar</p>
            <h2 className="display" style={{
            fontSize: 52, marginBottom: 24, marginTop: 0, lineHeight: 1.08,
            letterSpacing: '-0.022em', maxWidth: '20ch'
          }}>
              Lo que escribas aquí{' '}
              <em className="display-italic" style={{ color: 'var(--amber)' }}>queda contigo.</em>
            </h2>

            <p style={{
            fontSize: 18, color: 'var(--ink-2)', maxWidth: '52ch', marginBottom: 28,
            fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1.55
          }}>
              No hay respuestas correctas. Responde desde tu realidad, no desde lo
              que <em>"debería ser"</em>. Entre más honesto seas contigo, más valioso
              será el resultado.
            </p>

            <div className="card" style={{ padding: 32, marginBottom: 28 }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--ink-2)', fontSize: 16 }}>
                <li style={{ display: 'flex', gap: 16 }}>
                  <span className="amber" style={{ marginTop: 2 }}>—</span>
                  <span>Tus respuestas son tuyas. Nadie de tu organización ve respuestas individuales.</span>
                </li>
                <li style={{ display: 'flex', gap: 16 }}>
                  <span className="amber" style={{ marginTop: 2 }}>—</span>
                  <span>Tu organización solo verá tendencias agregadas, nunca nombres.</span>
                </li>
                <li style={{ display: 'flex', gap: 16 }}>
                  <span className="amber" style={{ marginTop: 2 }}>—</span>
                  <span>Puedes pausar y continuar cuando lo necesites.</span>
                </li>
              </ul>
            </div>

            <label style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '16px 0', cursor: 'pointer', color: 'var(--ink-2)',
            fontSize: 15, marginBottom: 36
          }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 4, accentColor: 'var(--amber)' }} />
              <span>
                Entiendo y acepto. <span className="muted-2">(Puedes leer la política completa en cualquier momento.)</span>
              </span>
            </label>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={next}>
                Estoy listo, empezar <ArrowRight />
              </button>
              <button className="btn-link" onClick={() => setStep(2)}>Atrás</button>
            </div>
          </div>
        }

        {/* Trail */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: step === 0 ? 32 : 80 }}>
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
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 44px 160px', width: '100%', paddingTop: 48 }}>
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
            Cada pilar contiene dos o tres esferas. Elige las que te están hablando hoy.
          </p>
        </div>

        {/* Dos modalidades */}
        <div className="flow-modes" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 56 }}>
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
              Los cuatro pilares, las once esferas. La lectura más completa de quién eres hoy.
            </p>
            <div className="row" style={{ gap: 24, fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
              <span><span className="amber">·</span> {QUESTIONS.length} preguntas</span>
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
                {selected.length} <span className="muted-2">de {SPHERES.length} seleccionadas</span>
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
    <div className="canvas" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Watermark — imagotipo de 4P en la esquina inferior derecha */}
      <div aria-hidden="true" style={{
        position: 'fixed', right: -40, bottom: -40,
        opacity: 0.3, pointerEvents: 'none', zIndex: 0
      }}>
        <HCLogo size={320} />
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '56px 44px 140px', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Trail superior — más grande, más editorial */}
        <div className="between" style={{ marginBottom: 64, alignItems: 'center' }}>
          <div className="row" style={{ gap: 18, alignItems: 'center' }}>
            <PillarGlyph pillar={pillar.id} size={40} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: PILLAR_COLORS[pillar.id], lineHeight: 1
              }}>{pillar.name}</span>
              <span className="display-italic" style={{
                fontSize: 26, color: 'var(--ink)', lineHeight: 1.1,
                letterSpacing: '-0.015em'
              }}>{sphere.name}</span>
            </div>
          </div>
          <div className="eyebrow-mono" style={{ fontSize: 12 }}>
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

        {/* Opciones Likert — bullet único, sin gradiente que sugiera valor */}
        <div className="rise-2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LIKERT.map((opt) => {
            const selected = answers[idx] === opt.value;
            return (
              <button key={opt.value}
              className={`choice ${selected ? 'selected' : ''}`}
              onClick={() => pickAnswer(opt.value)}>
                <span className="choice-glyph" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: '50%',
                    border: `1.5px solid ${selected ? 'var(--amber)' : 'var(--ink-4)'}`,
                    background: selected ? 'var(--amber)' : 'transparent',
                    transition: 'all 200ms ease',
                    boxShadow: selected ? '0 0 0 3px rgba(220, 135, 99, 0.18)' : 'none'
                  }} />
                </span>
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