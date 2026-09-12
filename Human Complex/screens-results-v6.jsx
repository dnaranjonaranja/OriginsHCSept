// screens-results.jsx — Resultados, Detalle, Recursos, Seguimiento, Cierre

const { useState: useStateR } = React;

// ═══════════════════════════════════════════════════════════════════════════
// RESULTADOS — narrativa, no dashboard
// ═══════════════════════════════════════════════════════════════════════════
function Results({ onOpenSphere, onOpenResources }) {
  const r = RESULT;
  const prioritySphere = SPHERES.find((s) => s.id === r.priority.sphereId);
  const priorityPillar = PILLARS.find((p) => p.id === prioritySphere.pillar);

  return (
    <div className="canvas">
      {/* Header narrativo */}
      <div style={{
        background: 'var(--bg-deep)',
        borderBottom: '0.5px solid var(--line-soft)',
        padding: '64px 40px 80px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="rise" style={{ marginBottom: 16 }}>
            <p className="eyebrow" style={{ marginBottom: 18 }}>Tu mapa personal</p>
            <h1 className="display" style={{
              fontSize: 54, margin: 0, lineHeight: 1.05, letterSpacing: '-0.025em',
              maxWidth: '20ch',
            }}>
              {r.pattern.name.split(',')[0]},<br />
              <em className="display-italic" style={{ color: 'var(--amber)' }}>
                {r.pattern.name.split(',').slice(1).join(',').trim()}.
              </em>
            </h1>
            <p style={{
              color: 'var(--ink-3)', fontSize: 16, marginTop: 22, maxWidth: '52ch',
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
            }}>
              No es una calificación. Es un reflejo de tu estado actual.
            </p>
          </div>

          {/* Tres lecturas en línea */}
          <div className="rise-2" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
            background: 'var(--line-soft)', border: '0.5px solid var(--line-soft)',
            borderRadius: 'var(--r-md)', overflow: 'hidden', maxWidth: 720,
            marginTop: 36,
          }}>
            {r.benchmarks.map((b, i) => (
              <div key={i} style={{
                background: 'var(--bg-deep)', padding: '20px 24px',
              }}>
                <p className="eyebrow-mono" style={{ marginBottom: 10, fontSize: 10 }}>{b.label}</p>
                <p className="display" style={{
                  fontSize: b.emphasis ? 24 : 19,
                  fontStyle: 'italic',
                  margin: 0,
                  color: b.emphasis ? 'var(--amber)' : 'var(--ink-2)',
                  letterSpacing: '-0.01em',
                }}>{b.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: 'var(--bg)', padding: '80px 40px 140px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {/* Field + Patrón */}
          <div style={{
            display: 'grid', gridTemplateColumns: '320px 1fr', gap: 64,
            marginBottom: 80, alignItems: 'center',
          }}>
            <div className="rise" style={{ display: 'flex', justifyContent: 'center' }}>
              <PillarField states={r.pillarStates} size={280} />
            </div>
            <div className="rise-2">
              <p className="eyebrow" style={{ marginBottom: 14 }}>El patrón que aparece</p>
              <h2 className="display" style={{ fontSize: 28, margin: 0, marginBottom: 18, lineHeight: 1.25 }}>
                {r.pattern.name}
              </h2>
              <p className="display-italic muted" style={{ fontSize: 18, marginBottom: 20, color: 'var(--ink-3)' }}>
                — {r.pattern.italics}
              </p>
              <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6, maxWidth: '46ch', margin: 0 }}>
                {r.pattern.body}
              </p>
            </div>
          </div>

          {/* Dimensión prioritaria */}
          <div className="rise card-rise" style={{
            padding: 48, marginBottom: 80,
            display: 'grid', gridTemplateColumns: '1fr 280px', gap: 56, alignItems: 'center',
          }}>
            <div>
              <div className="row" style={{ gap: 10, alignItems: 'center', marginBottom: 14, color: 'var(--ink-3)' }}>
                <PillarGlyph pillar={priorityPillar.id} size={14} />
                <span className="eyebrow" style={{ letterSpacing: '0.14em' }}>
                  {priorityPillar.name} · {prioritySphere.name}
                </span>
              </div>
              <h3 className="display" style={{ fontSize: 36, margin: 0, marginBottom: 14, lineHeight: 1.15 }}>
                <em className="display-italic" style={{ color: 'var(--amber)' }}>{r.priority.invitation}</em>
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6, maxWidth: '46ch', marginBottom: 18 }}>
                {r.priority.body}
              </p>
              <p style={{
                color: 'var(--ink-3)', fontSize: 14.5, lineHeight: 1.6, maxWidth: '46ch',
                marginBottom: 32, fontFamily: 'var(--font-display)', fontStyle: 'italic',
              }}>
                {r.priority.implications}
              </p>

              <div style={{
                padding: '20px 24px', background: 'var(--amber-soft)',
                borderLeft: '2px solid var(--amber)',
                borderRadius: '0 var(--r-sm) var(--r-sm) 0',
                maxWidth: 540,
              }}>
                <p className="eyebrow" style={{ marginBottom: 10, color: 'var(--amber)' }}>
                  {r.priority.action.eyebrow}
                </p>
                <p className="display" style={{
                  fontSize: 17, fontStyle: 'italic', margin: 0, lineHeight: 1.45, color: 'var(--ink)',
                }}>
                  {r.priority.action.text}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 32, alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => onOpenSphere(prioritySphere.id)}>
                  Ver esta dimensión <ArrowRight />
                </button>
                <button className="btn-link" onClick={() => onOpenResources(prioritySphere.id)}>
                  Recursos para empezar
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CoherenceRing
                level="desequilibrio"
                color="var(--p-impacto)"
                size={200}
                strokeWidth={6}
                label={null}
              />
            </div>
          </div>

          {/* Por pilar */}
          <div className="rise" style={{ marginBottom: 60 }}>
            <p className="eyebrow" style={{ marginBottom: 28 }}>Cómo se ven tus cuatro pilares</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
            }}>
              {PILLARS.map((p) => {
                const state = r.pillarStates[p.id];
                const lvl = LEVELS[state.level];
                return (
                  <div key={p.id} className="card-quiet" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                      <PillarGlyph pillar={p.id} size={14} />
                      <span className="eyebrow" style={{ letterSpacing: '0.14em' }}>{p.name}</span>
                    </div>
                    <p className="display" style={{
                      fontSize: 22, fontStyle: 'italic', margin: 0, marginBottom: 8,
                      color: 'var(--ink)', lineHeight: 1.2,
                    }}>
                      {lvl.name}
                    </p>
                    <p className="muted" style={{ fontSize: 13, fontFamily: 'var(--font-display)',
                      fontStyle: 'italic', marginBottom: 16, color: 'var(--ink-3)' }}>
                      — {lvl.descriptor}
                    </p>
                    <p style={{ fontSize: 13.5, color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>
                      {state.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dimensiones — lista narrativa */}
          <div className="rise-2">
            <p className="eyebrow" style={{ marginBottom: 28 }}>Tus doce dimensiones</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: 48, rowGap: 0,
            }}>
              {SPHERES.map((s) => {
                const lvl = r.sphereStates[s.id]?.level;
                return (
                  <button key={s.id} onClick={() => onOpenSphere(s.id)}
                    style={{
                      display: 'grid', gridTemplateColumns: '14px 1fr auto auto',
                      gap: 16, alignItems: 'center',
                      padding: '18px 0',
                      background: 'transparent', border: 'none',
                      borderTop: '0.5px solid var(--line-soft)',
                      cursor: 'pointer', color: 'inherit',
                      fontFamily: 'inherit', textAlign: 'left',
                    }}>
                    <LevelPip level={lvl} />
                    <div>
                      <div className="display" style={{ fontSize: 17, color: 'var(--ink)' }}>
                        {s.name}
                      </div>
                      <div className="muted" style={{ fontSize: 12, fontFamily: 'var(--font-display)',
                        fontStyle: 'italic', color: 'var(--ink-3)' }}>
                        {s.subtitle}
                      </div>
                    </div>
                    <span className="muted-2" style={{
                      fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase',
                    }}>{LEVELS[lvl].name}</span>
                    <span className="muted-2">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DETALLE DE DIMENSIÓN
// ═══════════════════════════════════════════════════════════════════════════
function SphereDetail({ sphereId, onResources, onBack }) {
  const s = SPHERES.find((x) => x.id === sphereId) || SPHERES[9];
  const p = PILLARS.find((x) => x.id === s.pillar);
  const state = RESULT.sphereStates[s.id] || { level: 'enCamino' };
  const lvl = LEVELS[state.level];

  // Texto contextual por nivel
  const meaning = {
    desequilibrio: 'Hay una distancia importante entre lo que dices que importa en esta dimensión y lo que estás haciendo. No es para alarmarse — es para mirarse.',
    atencion:      'Algo aquí pide ser mirado. No está roto, pero te está mandando señales que vale la pena escuchar.',
    enCamino:      'Estás en contacto con esta dimensión. La cuidas, aunque no siempre con la misma constancia. Hay camino por delante.',
    fortaleza:     'Aquí hay alineación entre lo que crees, sientes, dices y haces. Es uno de tus puntos de apoyo.',
  }[state.level];

  // Implicaciones diarias
  const implications = {
    desequilibrio: 'En el día a día puede aparecer como cansancio difuso, promesas incumplidas o la sensación de no avanzar.',
    atencion:      'En el día a día puede aparecer como decisiones aplazadas, fricciones repetidas o pequeñas señales del cuerpo.',
    enCamino:      'En el día a día se traduce en una práctica que sostiene, aunque a veces con altibajos.',
    fortaleza:     'En el día a día sostiene tus decisiones, tus vínculos y tu relación contigo mismo.',
  }[state.level];

  return (
    <div className="canvas">
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 40px 140px', width: '100%' }}>
        <button className="btn-link" onClick={onBack} style={{ marginBottom: 48 }}>
          ← Volver a tu mapa
        </button>

        <div className="rise" style={{ marginBottom: 56 }}>
          <div className="row" style={{ gap: 10, alignItems: 'center', marginBottom: 18, color: 'var(--ink-3)' }}>
            <PillarGlyph pillar={p.id} size={14} />
            <span className="eyebrow" style={{ letterSpacing: '0.14em' }}>{p.name}</span>
          </div>
          <h1 className="display" style={{ fontSize: 54, margin: 0, lineHeight: 1.05, marginBottom: 16 }}>
            {s.name}
          </h1>
          <p className="display-italic" style={{ fontSize: 22, color: 'var(--ink-3)', margin: 0, maxWidth: '36ch' }}>
            {s.subtitle}
          </p>
        </div>

        {/* Estado actual */}
        <div className="rise-2 card-rise" style={{ padding: 36, marginBottom: 48 }}>
          <div className="between" style={{ marginBottom: 4, alignItems: 'flex-start' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Tu nivel actual</p>
              <p className="display" style={{ fontSize: 32, fontStyle: 'italic', margin: 0,
                color: 'var(--amber)', lineHeight: 1.15 }}>
                {lvl.name}
              </p>
              <p className="muted" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 16, color: 'var(--ink-3)', margin: '8px 0 0' }}>
                — {lvl.descriptor}
              </p>
            </div>
            <CoherenceRing level={state.level} color="var(--amber)" size={88} strokeWidth={4} />
          </div>
        </div>

        {/* Interpretación */}
        <div className="rise-3" style={{ marginBottom: 40 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Interpretación</p>
          <p className="display" style={{ fontSize: 24, lineHeight: 1.4, margin: 0,
            color: 'var(--ink)', textWrap: 'pretty', maxWidth: '36ch' }}>
            {meaning}
          </p>
        </div>

        {/* Implicaciones */}
        <div className="rise-3" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>En tu vida diaria</p>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: 0,
            lineHeight: 1.6, maxWidth: '52ch' }}>
            {implications}
          </p>
        </div>

        {/* Tu siguiente paso */}
        <div className="rise-3 card" style={{ padding: 36, marginBottom: 56,
          background: 'var(--amber-soft)', borderColor: 'var(--amber)' }}>
          <p className="eyebrow" style={{ marginBottom: 14, color: 'var(--amber)' }}>
            Una sola acción esta semana
          </p>
          <p className="display" style={{
            fontSize: 22, lineHeight: 1.4, margin: 0, fontStyle: 'italic',
            color: 'var(--ink)', textWrap: 'pretty', maxWidth: '40ch',
          }}>
            Antes de aceptar el próximo compromiso, deja pasar una respiración
            completa. Mira tu agenda. Pregúntate: <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>¿qué le estoy quitando a algo que ya importa?</em>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => onResources(s.id)}>
            Recursos para esta dimensión <ArrowRight />
          </button>
          <button className="btn-link" onClick={onBack}>Volver</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RECURSOS
// ═══════════════════════════════════════════════════════════════════════════
function ResourcesScreen({ sphereId, onBack, onClosing }) {
  const s = SPHERES.find((x) => x.id === sphereId) || SPHERES[9];
  const list = RESOURCES_FOR_PRIORITY;

  return (
    <div className="canvas">
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 40px 140px', width: '100%' }}>
        <button className="btn-link" onClick={onBack} style={{ marginBottom: 48 }}>
          ← Volver
        </button>

        <div className="rise" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Para acompañarte en — {s.name}</p>
          <h1 className="display" style={{ fontSize: 44, margin: 0, lineHeight: 1.1 }}>
            Material para <em className="display-italic" style={{ color: 'var(--amber)' }}>seguir mirando.</em>
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 16, marginTop: 18, maxWidth: '48ch' }}>
            Una selección breve: libros, charlas, ejercicios y prácticas
            de journaling. Mejor cinco cosas leídas con calma que cincuenta guardadas.
          </p>
        </div>

        <div className="rise-2">
          {list.map((res, i) => (
            <div key={i} className="res-row">
              <ResourceGlyph kind={res.glyph} />
              <div>
                <p className="res-kind">{res.kind}</p>
                <p className="res-title" style={{ margin: '4px 0 0' }}>{res.title}</p>
                <p className="res-meta">{res.author}</p>
              </div>
              <span className="muted-2">→</span>
            </div>
          ))}
        </div>

        {/* Bloque de seguimiento ligero */}
        <div className="rise-3" style={{
          marginTop: 80, padding: '36px 0 0',
          borderTop: '0.5px solid var(--line-soft)',
        }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Seguimiento</p>
          <h2 className="display" style={{ fontSize: 28, margin: 0, marginBottom: 14, lineHeight: 1.2 }}>
            El autoconocimiento <em className="display-italic" style={{ color: 'var(--amber)' }}>no es un evento.</em><br />
            Es un proceso.
          </h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 15, marginBottom: 24, maxWidth: '52ch' }}>
            Volverás a este diagnóstico para comparar tus resultados, identificar avances reales
            y detectar nuevos desequilibrios.
          </p>

          <div style={{
            padding: '22px 24px',
            border: '0.5px solid var(--line-soft)',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg-rise)',
          }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Recordatorio</p>
            <p className="display-italic" style={{
              fontSize: 19, margin: 0, color: 'var(--ink)', lineHeight: 1.4,
              maxWidth: '40ch',
            }}>
              {REMINDERS[0]}
            </p>
          </div>

          {onClosing && (
            <div style={{ marginTop: 36, display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={onClosing}>
                Cerrar la experiencia <ArrowRight />
              </button>
              <span className="muted-2" style={{ fontSize: 13 }}>
                Un compromiso contigo antes de salir.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CIERRE EXPERIENCIAL — preguntas finales y compromiso personal
// ═══════════════════════════════════════════════════════════════════════════
function ClosingScreen({ onRestart }) {
  const [answers, setAnswers] = useStateR(['', '']);
  const [commitment, setCommitment] = useStateR('');

  const update = (i, v) => {
    const next = [...answers];
    next[i] = v;
    setAnswers(next);
  };

  return (
    <div className="canvas">
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 40px 140px', width: '100%' }}>
        <div className="rise" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Antes de salir</p>
          <h1 className="display" style={{ fontSize: 48, margin: 0, lineHeight: 1.1, marginBottom: 28, maxWidth: '18ch' }}>
            No es el mapa.<br />
            <em className="display-italic" style={{ color: 'var(--amber)' }}>Es lo que harás con él.</em>
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 16, maxWidth: '48ch', lineHeight: 1.6 }}>
            Tómate un momento. Responde con honestidad — no para nadie más, solo para ti.
          </p>
        </div>

        <div className="rise-2" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {CLOSING.questions.map((q, i) => (
            <div key={i}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                Pregunta {String(i + 1).padStart(2, '0')}
              </p>
              <p className="display" style={{
                fontSize: 26, margin: 0, marginBottom: 18, lineHeight: 1.25, color: 'var(--ink)',
                fontStyle: 'italic', maxWidth: '32ch',
              }}>
                {q}
              </p>
              <textarea
                value={answers[i]}
                onChange={(e) => update(i, e.target.value)}
                placeholder="Escribe lo que aparezca..."
                rows={3}
                style={{
                  width: '100%', resize: 'vertical',
                  background: 'transparent', border: 'none',
                  borderBottom: '0.5px solid var(--line)',
                  color: 'var(--ink)', fontFamily: 'var(--font-display)',
                  fontSize: 20, padding: '12px 0', outline: 'none',
                  letterSpacing: '-0.01em', lineHeight: 1.5,
                }}
              />
            </div>
          ))}

          {/* Compromiso */}
          <div className="card-rise" style={{ padding: 36, marginTop: 12 }}>
            <p className="eyebrow" style={{ marginBottom: 14, color: 'var(--amber)' }}>Compromiso personal</p>
            <p className="display" style={{
              fontSize: 26, margin: 0, marginBottom: 16, lineHeight: 1.25,
              fontStyle: 'italic', color: 'var(--ink)',
            }}>
              {CLOSING.commitmentPrompt}
            </p>
            <textarea
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              placeholder="Escribe tu compromiso contigo mismo..."
              rows={3}
              style={{
                width: '100%', resize: 'vertical',
                background: 'transparent', border: 'none',
                borderBottom: '0.5px solid var(--amber)',
                color: 'var(--ink)', fontFamily: 'var(--font-display)',
                fontSize: 20, padding: '12px 0', outline: 'none',
                letterSpacing: '-0.01em', lineHeight: 1.5,
              }}
            />
          </div>
        </div>

        <div className="rise-3" style={{
          marginTop: 80, paddingTop: 36,
          borderTop: '0.5px solid var(--line-soft)',
          textAlign: 'center',
        }}>
          <blockquote className="quote" style={{
            margin: '0 auto 32px', maxWidth: '34ch', fontSize: 24,
          }}>
            {CLOSING.signoff}
          </blockquote>
          <button className="btn btn-primary" onClick={onRestart}>
            Volver al inicio <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Results, SphereDetail, ResourcesScreen, ClosingScreen });
