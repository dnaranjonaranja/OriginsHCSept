// screens-results.jsx — Resultados, Detalle, Recursos, Cierre
// Tipografía editorial (Lora), trazos del logo como íconos de pilar.

const { useState: useStateR } = React;

// ═══════════════════════════════════════════════════════════════════════════
// RESULTADOS — narrativa editorial, no dashboard
// ═══════════════════════════════════════════════════════════════════════════

// Score numérico promedio: convierte niveles cualitativos → escala 1–5
const LEVEL_TO_SCORE = {
  desequilibrio: 1.6,
  atencion:      2.6,
  enCamino:      3.6,
  fortaleza:     4.5,
};

function computeOverallScore(sphereStates) {
  const scores = Object.values(sphereStates).map((s) => LEVEL_TO_SCORE[s.level] || 3);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg * 10) / 10; // 1 decimal
}

function computePillarScore(sphereStates, pillarId) {
  const ids = SPHERES.filter((s) => s.pillar === pillarId).map((s) => s.id);
  const scores = ids.map((id) => LEVEL_TO_SCORE[sphereStates[id]?.level] || 3);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg * 10) / 10;
}

function scoreToLevel(score) {
  if (score < 2) return 'desequilibrio';
  if (score < 3) return 'atencion';
  if (score < 4) return 'enCamino';
  return 'fortaleza';
}

function Results({ onOpenSphere, onOpenResources }) {
  const r = RESULT;
  const prioritySphere = SPHERES.find((s) => s.id === r.priority.sphereId);
  const priorityPillar = PILLARS.find((p) => p.id === prioritySphere.pillar);
  const priorityColor = PILLAR_COLORS[priorityPillar.id];

  const overall = computeOverallScore(r.sphereStates);
  const overallLevel = scoreToLevel(overall);
  const overallLevelName = LEVELS[overallLevel].name;

  return (
    <div className="canvas">
      {/* Header narrativo */}
      <div style={{
        background: 'var(--bg-deep)',
        borderBottom: '1px solid var(--line-soft)',
        padding: '80px 44px 96px',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div className="rise" style={{ marginBottom: 16 }}>
            <p className="eyebrow" style={{ marginBottom: 22 }}>Tu mapa personal</p>
            <h1 className="display" style={{
              fontSize: 72, margin: 0, lineHeight: 1.04, letterSpacing: '-0.03em',
              maxWidth: '20ch', fontWeight: 500,
            }}>
              {r.pattern.name.split(',')[0]},{' '}
              <em className="display-italic" style={{ color: 'var(--amber)' }}>
                {r.pattern.name.split(',').slice(1).join(',').trim()}.
              </em>
            </h1>
            <p style={{
              color: 'var(--ink-3)', fontSize: 19, marginTop: 28, maxWidth: '54ch',
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
            }}>
              No es una calificación. Es un reflejo de tu estado actual.
            </p>
          </div>

          {/* HERO SCORE — número grande con desglose por pilar */}
          <div className="rise-2" style={{
            marginTop: 56,
            display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64,
            alignItems: 'center',
            padding: '40px 48px',
            background: 'var(--bg-card)',
            border: '1px solid var(--line-soft)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--shadow-soft)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Tu lectura global</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="display" style={{
                  fontSize: 128, lineHeight: 0.9, fontWeight: 500,
                  color: 'var(--ink)', letterSpacing: '-0.04em',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                }}>
                  {overall.toFixed(1)}
                </span>
                <span className="display" style={{
                  fontSize: 36, color: 'var(--ink-4)', fontWeight: 500,
                  letterSpacing: '-0.02em',
                }}>
                  / 5
                </span>
              </div>
              <p className="display-italic" style={{
                fontSize: 22, color: 'var(--amber)', margin: '8px 0 0',
                letterSpacing: '-0.01em',
              }}>
                {overallLevelName}
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18,
              borderLeft: '1px solid var(--line-soft)', paddingLeft: 56,
            }}>
              {PILLARS.map((p) => {
                const score = computePillarScore(r.sphereStates, p.id);
                const c = PILLAR_COLORS[p.id];
                return (
                  <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <PillarGlyph pillar={p.id} size={22}/>
                      <span style={{
                        fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600,
                        letterSpacing: '0.16em', textTransform: 'uppercase', color: c,
                      }}>{p.name.replace('Mi ', '')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span className="display" style={{
                        fontSize: 44, fontWeight: 500, color: 'var(--ink)',
                        letterSpacing: '-0.025em', lineHeight: 1,
                        fontVariantNumeric: 'lining-nums tabular-nums',
                      }}>{score.toFixed(1)}</span>
                      <span style={{ fontSize: 14, color: 'var(--ink-4)', fontFamily: 'var(--font-display)' }}>/ 5</span>
                    </div>
                    {/* mini bar */}
                    <div style={{ height: 4, borderRadius: 2, background: 'var(--line-soft)', overflow: 'hidden' }}>
                      <div style={{ width: `${(score / 5) * 100}%`, height: '100%', background: c, transition: 'width 600ms ease' }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tres lecturas en línea */}
          <div className="rise-2" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
            background: 'var(--line-soft)', border: '1px solid var(--line-soft)',
            borderRadius: 'var(--r-md)', overflow: 'hidden', maxWidth: 760,
            marginTop: 32,
          }}>
            {r.benchmarks.map((b, i) => (
              <div key={i} style={{ background: 'var(--bg-deep)', padding: '22px 26px' }}>
                <p className="eyebrow-mono" style={{ marginBottom: 12, fontSize: 10 }}>{b.label}</p>
                <p className="display" style={{
                  fontSize: b.emphasis ? 28 : 22, fontStyle: 'italic', margin: 0,
                  color: b.emphasis ? 'var(--amber)' : 'var(--ink-2)', letterSpacing: '-0.01em',
                }}>{b.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: 'var(--bg)', padding: '88px 44px 160px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          {/* Field + Patrón */}
          <div style={{
            display: 'grid', gridTemplateColumns: '360px 1fr', gap: 72,
            marginBottom: 96, alignItems: 'center',
          }}>
            <div className="rise" style={{ display: 'flex', justifyContent: 'center' }}>
              <PillarField states={r.pillarStates} size={320}/>
            </div>
            <div className="rise-2">
              <p className="eyebrow" style={{ marginBottom: 16 }}>El patrón que aparece</p>
              <h2 className="display" style={{
                fontSize: 38, margin: 0, marginBottom: 22, lineHeight: 1.2,
                letterSpacing: '-0.02em', maxWidth: '24ch',
              }}>
                {r.pattern.name}
              </h2>
              <p className="display-italic" style={{ fontSize: 22, marginBottom: 24, color: 'var(--ink-3)', maxWidth: '38ch' }}>
                — {r.pattern.italics}
              </p>
              <p style={{
                color: 'var(--ink-2)', fontSize: 17, lineHeight: 1.6,
                maxWidth: '48ch', margin: 0,
                fontFamily: 'var(--font-display)', fontWeight: 400,
              }}>
                {r.pattern.body}
              </p>
            </div>
          </div>

          {/* Dimensión prioritaria */}
          <div className="rise card-rise" style={{
            padding: 56, marginBottom: 96,
            display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'center',
            borderLeft: `3px solid ${priorityColor}`,
          }}>
            <div>
              <div className="row" style={{ gap: 14, alignItems: 'center', marginBottom: 18 }}>
                <PillarGlyph pillar={priorityPillar.id} size={28}/>
                <span style={{
                  fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: priorityColor,
                }}>{priorityPillar.name} · {prioritySphere.name}</span>
              </div>
              <h3 className="display" style={{
                fontSize: 48, margin: 0, marginBottom: 22, lineHeight: 1.1,
                letterSpacing: '-0.025em', maxWidth: '16ch',
              }}>
                <em className="display-italic" style={{ color: 'var(--amber)' }}>{r.priority.invitation}</em>
              </h3>
              <p style={{
                color: 'var(--ink-2)', fontSize: 18, lineHeight: 1.6, maxWidth: '46ch', marginBottom: 22,
                fontFamily: 'var(--font-display)', fontWeight: 400,
              }}>
                {r.priority.body}
              </p>
              <p style={{
                color: 'var(--ink-3)', fontSize: 16, lineHeight: 1.6, maxWidth: '46ch',
                marginBottom: 36, fontFamily: 'var(--font-display)', fontStyle: 'italic',
              }}>
                {r.priority.implications}
              </p>

              <div style={{
                padding: '22px 26px', background: 'var(--amber-soft)',
                borderLeft: `3px solid var(--amber)`,
                borderRadius: '0 var(--r-sm) var(--r-sm) 0',
                maxWidth: 560,
              }}>
                <p className="eyebrow" style={{ marginBottom: 12, color: 'var(--amber)' }}>
                  {r.priority.action.eyebrow}
                </p>
                <p className="display-italic" style={{ fontSize: 19, margin: 0, lineHeight: 1.45, color: 'var(--ink)' }}>
                  {r.priority.action.text}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 36, alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => onOpenSphere(prioritySphere.id)}>
                  Ver esta esfera <ArrowRight/>
                </button>
                <button className="btn-link" onClick={() => onOpenResources(prioritySphere.id)}>
                  Recursos para empezar
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CoherenceRing level="desequilibrio" color={priorityColor} size={220} strokeWidth={7} label={null}/>
            </div>
          </div>

          {/* Por pilar */}
          <div className="rise" style={{ marginBottom: 72 }}>
            <p className="eyebrow" style={{ marginBottom: 32 }}>Cómo se ven tus cuatro pilares</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
              {PILLARS.map((p) => {
                const state = r.pillarStates[p.id];
                const lvl = LEVELS[state.level];
                const c = PILLAR_COLORS[p.id];
                const score = computePillarScore(r.sphereStates, p.id);
                return (
                  <div key={p.id} className="card-quiet" style={{
                    padding: 28, borderTop: `3px solid ${c}`,
                  }}>
                    <div className="between" style={{ marginBottom: 22, alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <PillarGlyph pillar={p.id} size={28}/>
                        <span style={{
                          fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
                          letterSpacing: '0.18em', textTransform: 'uppercase', color: c,
                        }}>{p.name}</span>
                      </div>
                      <span className="display" style={{
                        fontSize: 24, fontWeight: 500, color: 'var(--ink-2)',
                        letterSpacing: '-0.02em', lineHeight: 1,
                        fontVariantNumeric: 'lining-nums tabular-nums',
                      }}>{score.toFixed(1)}</span>
                    </div>
                    <p className="display-italic" style={{
                      fontSize: 26, margin: 0, marginBottom: 10,
                      color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.015em',
                    }}>
                      {lvl.name}
                    </p>
                    <p className="subtitle" style={{ fontSize: 14, marginBottom: 18, color: 'var(--ink-3)' }}>
                      — {lvl.descriptor}
                    </p>
                    <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: 0, lineHeight: 1.55 }}>
                      {state.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Esferas — lista narrativa */}
          <div className="rise-2">
            <p className="eyebrow" style={{ marginBottom: 32 }}>Tus doce esferas</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: 56, rowGap: 0,
            }}>
              {SPHERES.map((s) => {
                const lvl = r.sphereStates[s.id]?.level;
                const sphereScore = LEVEL_TO_SCORE[lvl] || 3;
                return (
                  <button key={s.id} onClick={() => onOpenSphere(s.id)}
                    style={{
                      display: 'grid', gridTemplateColumns: '24px 14px 1fr auto auto auto',
                      gap: 16, alignItems: 'center',
                      padding: '20px 0',
                      background: 'transparent', border: 'none',
                      borderTop: '1px solid var(--line-soft)',
                      cursor: 'pointer', color: 'inherit',
                      fontFamily: 'inherit', textAlign: 'left',
                    }}>
                    <PillarGlyph pillar={s.pillar} size={22}/>
                    <LevelPip level={lvl}/>
                    <div>
                      <div className="display" style={{ fontSize: 19, color: 'var(--ink)', fontWeight: 500 }}>
                        {s.name}
                      </div>
                      <div className="subtitle" style={{ fontSize: 13, color: 'var(--ink-3)' }}>
                        {s.subtitle}
                      </div>
                    </div>
                    <span className="display" style={{
                      fontSize: 20, color: 'var(--ink-2)', fontWeight: 500,
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'lining-nums tabular-nums',
                    }}>{sphereScore.toFixed(1)}</span>
                    <span className="muted-2" style={{
                      fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                      fontWeight: 600,
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
// DETALLE DE ESFERA
// ═══════════════════════════════════════════════════════════════════════════
function SphereDetail({ sphereId, onResources, onBack }) {
  const s = SPHERES.find((x) => x.id === sphereId) || SPHERES[9];
  const p = PILLARS.find((x) => x.id === s.pillar);
  const c = PILLAR_COLORS[p.id];
  const state = RESULT.sphereStates[s.id] || { level: 'enCamino' };
  const lvl = LEVELS[state.level];
  const sphereScore = LEVEL_TO_SCORE[state.level] || 3;

  const meaning = {
    desequilibrio: 'Hay una distancia importante entre lo que dices que importa en esta esfera y lo que estás haciendo. No es para alarmarse — es para mirarse.',
    atencion:      'Algo aquí pide ser mirado. No está roto, pero te está mandando señales que vale la pena escuchar.',
    enCamino:      'Estás en contacto con esta esfera. La cuidas, aunque no siempre con la misma constancia. Hay camino por delante.',
    fortaleza:     'Aquí hay alineación entre lo que crees, sientes, dices y haces. Es uno de tus puntos de apoyo.',
  }[state.level];

  const implications = {
    desequilibrio: 'En el día a día puede aparecer como cansancio difuso, promesas incumplidas o la sensación de no avanzar.',
    atencion:      'En el día a día puede aparecer como decisiones aplazadas, fricciones repetidas o pequeñas señales del cuerpo.',
    enCamino:      'En el día a día se traduce en una práctica que sostiene, aunque a veces con altibajos.',
    fortaleza:     'En el día a día sostiene tus decisiones, tus vínculos y tu relación contigo mismo.',
  }[state.level];

  return (
    <div className="canvas">
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 44px 160px', width: '100%' }}>
        <button className="btn-link" onClick={onBack} style={{ marginBottom: 56 }}>
          ← Volver a tu mapa
        </button>

        <div className="rise" style={{ marginBottom: 64 }}>
          <div className="row" style={{ gap: 14, alignItems: 'center', marginBottom: 24 }}>
            <PillarGlyph pillar={p.id} size={36}/>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: c,
            }}>{p.name}</span>
          </div>
          <h1 className="display" style={{
            fontSize: 76, margin: 0, lineHeight: 1.02, marginBottom: 20,
            letterSpacing: '-0.028em', fontWeight: 500,
          }}>
            {s.name}
          </h1>
          <p className="display-italic" style={{
            fontSize: 26, color: 'var(--ink-3)', margin: 0, maxWidth: '36ch',
            letterSpacing: '-0.01em',
          }}>
            {s.subtitle}
          </p>
        </div>

        {/* Estado actual */}
        <div className="rise-2 card-rise" style={{
          padding: 40, marginBottom: 56, borderLeft: `3px solid ${c}`,
        }}>
          <div className="between" style={{ alignItems: 'flex-start' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Tu nivel actual</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                <span className="display" style={{
                  fontSize: 88, fontWeight: 500, color: 'var(--ink)',
                  letterSpacing: '-0.035em', lineHeight: 0.9,
                  fontVariantNumeric: 'lining-nums tabular-nums',
                }}>{sphereScore.toFixed(1)}</span>
                <span className="display" style={{
                  fontSize: 28, color: 'var(--ink-4)', fontWeight: 500,
                  letterSpacing: '-0.02em',
                }}>/ 5</span>
              </div>
              <p className="display-italic" style={{
                fontSize: 32, margin: 0, color: 'var(--amber)', lineHeight: 1.1,
                letterSpacing: '-0.018em',
              }}>
                {lvl.name}
              </p>
              <p className="subtitle" style={{ fontSize: 17, color: 'var(--ink-3)', margin: '10px 0 0' }}>
                — {lvl.descriptor}
              </p>
            </div>
            <CoherenceRing level={state.level} color={c} size={120} strokeWidth={6}/>
          </div>
        </div>

        {/* Interpretación */}
        <div className="rise-3" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Interpretación</p>
          <p className="display" style={{
            fontSize: 30, lineHeight: 1.35, margin: 0,
            color: 'var(--ink)', textWrap: 'pretty', maxWidth: '36ch',
            fontWeight: 500, letterSpacing: '-0.015em',
          }}>
            {meaning}
          </p>
        </div>

        {/* Implicaciones */}
        <div className="rise-3" style={{ marginBottom: 64 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>En tu vida diaria</p>
          <p style={{
            fontSize: 19, color: 'var(--ink-2)', margin: 0,
            lineHeight: 1.6, maxWidth: '54ch',
            fontFamily: 'var(--font-display)', fontWeight: 400,
          }}>
            {implications}
          </p>
        </div>

        {/* Tu siguiente paso */}
        <div className="rise-3 card" style={{
          padding: 40, marginBottom: 64,
          background: 'var(--amber-soft)', borderColor: 'var(--amber)',
        }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: 'var(--amber)' }}>
            Una sola acción esta semana
          </p>
          <p className="display-italic" style={{
            fontSize: 26, lineHeight: 1.4, margin: 0,
            color: 'var(--ink)', textWrap: 'pretty', maxWidth: '42ch',
            letterSpacing: '-0.012em',
          }}>
            Antes de aceptar el próximo compromiso, deja pasar una respiración
            completa. Mira tu agenda. Pregúntate:{' '}
            <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>¿qué le estoy quitando a algo que ya importa?</em>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => onResources(s.id)}>
            Recursos para esta esfera <ArrowRight/>
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
function ResourcesScreen({ sphereId, onBack }) {
  const s = SPHERES.find((x) => x.id === sphereId) || SPHERES[9];
  const p = PILLARS.find((x) => x.id === s.pillar);
  const c = PILLAR_COLORS[p.id];
  const list = RESOURCES_FOR_PRIORITY;

  return (
    <div className="canvas">
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 44px 160px', width: '100%' }}>
        <button className="btn-link" onClick={onBack} style={{ marginBottom: 56 }}>
          ← Volver
        </button>

        <div className="rise" style={{ marginBottom: 64 }}>
          <div className="row" style={{ gap: 14, alignItems: 'center', marginBottom: 22 }}>
            <PillarGlyph pillar={p.id} size={28}/>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: c,
            }}>Para — {s.name}</span>
          </div>
          <h1 className="display" style={{
            fontSize: 60, margin: 0, lineHeight: 1.06,
            letterSpacing: '-0.026em', maxWidth: '18ch',
          }}>
            Material para{' '}
            <em className="display-italic" style={{ color: 'var(--amber)' }}>seguir mirando.</em>
          </h1>
          <p style={{
            color: 'var(--ink-3)', fontSize: 18, marginTop: 22, maxWidth: '50ch',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            Una selección breve: libros, charlas, ejercicios y prácticas de journaling.
            Mejor cinco cosas leídas con calma que cincuenta guardadas.
          </p>
        </div>

        <div className="rise-2">
          {list.map((res, i) => (
            <div key={i} className="res-row">
              <ResourceGlyph kind={res.glyph}/>
              <div>
                <p className="res-kind">{res.kind}</p>
                <p className="res-title" style={{ margin: '4px 0 0' }}>{res.title}</p>
                <p className="res-meta">{res.author}</p>
              </div>
              <span className="muted-2">→</span>
            </div>
          ))}
        </div>

        {/* Bloque de seguimiento */}
        <div className="rise-3" style={{
          marginTop: 96, padding: '40px 0 0',
          borderTop: '1px solid var(--line-soft)',
        }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Seguimiento</p>
          <h2 className="display" style={{
            fontSize: 38, margin: 0, marginBottom: 16, lineHeight: 1.15,
            letterSpacing: '-0.02em', maxWidth: '20ch',
          }}>
            El autoconocimiento{' '}
            <em className="display-italic" style={{ color: 'var(--amber)' }}>no es un evento.</em>
            <br/>Es un proceso.
          </h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 17, marginBottom: 28, maxWidth: '54ch', lineHeight: 1.55 }}>
            Volverás a este diagnóstico para comparar tus resultados, identificar avances reales
            y detectar nuevos desequilibrios.
          </p>

          <div style={{
            padding: '24px 28px',
            border: '1px solid var(--line-soft)',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg-rise)',
          }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Recordatorio</p>
            <p className="display-italic" style={{
              fontSize: 22, margin: 0, color: 'var(--ink)', lineHeight: 1.4, maxWidth: '40ch',
            }}>
              {REMINDERS[0]}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Results, SphereDetail, ResourcesScreen });
