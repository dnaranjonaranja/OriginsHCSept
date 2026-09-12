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

function QualitativeResults({ overallScore, pillarScores, sphereScores }) {
  return null;
}

function Results({ onOpenSphere, onOpenResources }) {
  const r = RESULT;
  const [openPillar, setOpenPillar] = useStateR(null);
  const [openSphere, setOpenSphere] = useStateR(null);
  const prioritySphere = SPHERES.find((s) => s.id === r.priority.sphereId);
  const priorityPillar = PILLARS.find((p) => p.id === prioritySphere.pillar);
  const priorityColor = PILLAR_COLORS[priorityPillar.id];

  const overall = computeOverallScore(r.sphereStates);
  const overallLevel = scoreToLevelKey(overall);
  const overallLevelName = LEVEL_META.find((l) => l.key === overallLevel).name;

  return (
    <div className="canvas">
      {/* Header narrativo */}
      <div style={{
        background: 'var(--bg-deep)',
        borderBottom: '1px solid var(--line-soft)',
        padding: '80px 44px 96px',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h1 className="display" style={{ fontSize: 56, margin: '0 0 40px', letterSpacing: '-0.03em' }}>Tus Resultados</h1>
          <div className="rise results-intro" style={{ marginBottom: 48, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 560px)', gap: 56, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 22, fontSize: 16, fontWeight: 700 }}>Tu mapa personal</p>
              <p style={{
                color: 'var(--ink-2)', fontSize: 19.5, lineHeight: 1.62, maxWidth: '58ch',
                fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: 32,
              }}>
                No somos solo un pilar, somos un sistema complejo en constante cambio. Tu bienestar,
                tus decisiones, tus relaciones y tu sentido de vida están profundamente conectados;
                cuando uno de nuestros pilares se debilita, impacta a los demás.
              </p>
              <p style={{
                color: 'var(--ink-3)', fontSize: 20, marginTop: 0, maxWidth: '54ch',
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
              }}>
                No es una calificación. Es un reflejo de tu estado actual.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
              <PillarField states={r.pillarStates} size={520}/>
            </div>
          </div>

          {/* HERO SCORE — número grande con desglose por pilar */}
          <div className="rise-2 hero-score" style={{
            marginTop: 56,
            display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 48,
            alignItems: 'center',
            padding: '40px 48px',
            background: 'var(--bg-card)',
            border: '1px solid var(--line-soft)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--shadow-soft)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Tu lectura global</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'nowrap' }}>
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

            <div className="hero-score-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18,
              borderLeft: '1px solid var(--line-soft)', paddingLeft: 40, minWidth: 0,
            }}>
              {PILLARS.map((p) => {
                const score = computePillarScore(r.sphereStates, p.id);
                const c = PILLAR_COLORS[p.id];
                return (
                  <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <PillarGlyph pillar={p.id} size={22}/>
                      <span style={{
                        fontFamily: 'var(--font-ui)', fontSize: 11.5, fontWeight: 700,
                        letterSpacing: '0.16em', textTransform: 'uppercase', color: PILLAR_INK[p.id],
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

          {/* Por pilar */}
          <div className="rise" style={{ marginBottom: 72, marginTop: 36 }}>
            <p className="eyebrow" style={{ marginBottom: 32 }}>Cómo se ven tus cuatro pilares</p>
            <div className="grid-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }}>
              {PILLARS.map((p) => {
                const state = r.pillarStates[p.id];
                const c = PILLAR_COLORS[p.id];
                const score = computePillarScore(r.sphereStates, p.id);
                const qKey = scoreToLevelKey(score);
                const lvl = LEVEL_META.find((l) => l.key === qKey);
                const isOpen = openPillar === p.id;
                return (
                  <button key={p.id} onClick={() => setOpenPillar(isOpen ? null : p.id)} className="card-quiet clickable-card" style={{
                    padding: 0, textAlign: 'left', cursor: 'pointer', overflow: 'hidden',
                    border: '1px solid var(--line-soft)', background: 'var(--bg-card)',
                    font: 'inherit', color: 'inherit', width: '100%',
                    display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start',
                  }}>
                    <div className="pillar-block" style={{ background: c }}>
                      <PillarGlyph pillar={p.id} size={30}/>
                      <span className="pillar-block-name">{p.name}</span>
                      <span className="def-caret" style={{ marginLeft: 'auto', color: '#0d253e', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                    </div>
                    <div style={{ padding: 26 }}>
                    {/* Score + barra de progreso */}
                    <div style={{ marginBottom: 22 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                        <span className="display" style={{
                          fontSize: 38, fontWeight: 500, color: 'var(--ink)',
                          letterSpacing: '-0.025em', lineHeight: 1,
                          fontVariantNumeric: 'lining-nums tabular-nums',
                        }}>{score.toFixed(1)}</span>
                        <span style={{ fontSize: 14, color: 'var(--ink-3)', fontFamily: 'var(--font-display)' }}>/ 5</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: 'var(--line-soft)', overflow: 'hidden' }}>
                        <div style={{ width: `${(score / 5) * 100}%`, height: '100%', background: c, transition: 'width 600ms ease' }}/>
                      </div>
                    </div>
                    <p className="display-italic" style={{
                      fontSize: 23, margin: 0, marginBottom: 8,
                      color: 'var(--ink)', lineHeight: 1.18, letterSpacing: '-0.015em',
                    }}>
                      {lvl.name}
                    </p>
                    <p className="subtitle" style={{ fontSize: 15, marginBottom: 16, color: 'var(--ink-3)' }}>
                      Rango {lvl.range}
                    </p>
                    <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: 0, lineHeight: 1.6 }}>
                      {state.note}
                    </p>
                    {isOpen && (
                      <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--line-soft)' }}>
                        <p className="eyebrow-mono" style={{ fontSize: 12, color: PILLAR_INK[p.id], marginBottom: 10 }}>Interpretación completa</p>
                        <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: 0, lineHeight: 1.6 }}>
                          {PILLAR_LEVEL_TEXT[p.id][qKey]}
                        </p>
                      </div>
                    )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Esferas — lista narrativa */}
          <div className="rise-2">
            <p className="eyebrow" style={{ marginBottom: 32 }}>Tus once esferas</p>
            <div className="grid-spheres" style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: 56, rowGap: 0,
            }}>
              {SPHERES.map((s) => {
                const lvl = r.sphereStates[s.id]?.level;
                const sphereScore = LEVEL_TO_SCORE[lvl] || 3;
                const sc = PILLAR_COLORS[s.pillar];
                const qName = SPHERE_QUALITATIVE_MAP[s.id];
                const qKey = scoreToLevelKey(sphereScore);
                const isOpen = openSphere === s.id;
                return (
                  <div key={s.id} style={{ borderTop: '1px solid var(--line-soft)' }}>
                    <button onClick={() => setOpenSphere(isOpen ? null : s.id)} className="clickable-row sphere-row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr auto auto',
                        gap: 18, alignItems: 'center',
                        padding: '18px 0',
                        background: 'transparent', border: 'none',
                        cursor: 'pointer', color: 'inherit', width: '100%',
                        fontFamily: 'inherit', textAlign: 'left',
                      }}>
                      <PillarGlyph pillar={s.pillar} size={26}/>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 2 }}>
                          <div className="display" style={{ fontSize: 21, color: 'var(--ink)', fontWeight: 500 }}>
                            {s.name}
                          </div>
                          <LevelPip level={lvl}/>
                        </div>
                        <div className="subtitle" style={{ fontSize: 15, color: 'var(--ink-3)', marginBottom: 8 }}>
                          {s.subtitle}
                        </div>
                        {/* Mini barra de progreso por esfera */}
                        <div style={{ height: 3, borderRadius: 2, background: 'var(--line-soft)', overflow: 'hidden', maxWidth: 280 }}>
                          <div style={{ width: `${(sphereScore / 5) * 100}%`, height: '100%', background: sc, transition: 'width 600ms ease' }}/>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                        <span className="display" style={{
                          fontSize: 24, color: 'var(--ink)', fontWeight: 500,
                          letterSpacing: '-0.02em', lineHeight: 1,
                          fontVariantNumeric: 'lining-nums tabular-nums',
                        }}>{sphereScore.toFixed(1)}</span>
                        <span className="muted" style={{
                          fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                          fontWeight: 700,
                        }}>{LEVEL_META.find((l) => l.key === qKey).name}</span>
                      </div>
                      <span className="def-caret" style={{ color: sc, transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                    </button>
                    {isOpen && qName && SPHERE_LEVEL_TEXT[qName] && (
                      <div className="sphere-row-body" style={{ padding: '0 0 24px 46px' }}>
                        <p className="eyebrow-mono" style={{ fontSize: 12, color: PILLAR_INK[s.pillar], marginBottom: 10 }}>Interpretación · {LEVEL_META.find(l=>l.key===qKey).name}</p>
                        <p style={{ fontSize: 16.5, color: 'var(--ink-2)', margin: '0 0 16px', lineHeight: 1.62, maxWidth: 600 }}>
                          {SPHERE_LEVEL_TEXT[qName][qKey]}
                        </p>
                        <button className="btn-link" onClick={(e) => { e.stopPropagation(); onOpenSphere(s.id); }}>Ver esta esfera →</button>
                      </div>
                    )}
                  </div>
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

  const qName = SPHERE_QUALITATIVE_MAP[s.id];
  const qKey = scoreToLevelKey(sphereScore);
  const qMeta = LEVEL_META.find((l) => l.key === qKey);
  const qText = qName && SPHERE_LEVEL_TEXT[qName] ? SPHERE_LEVEL_TEXT[qName][qKey] : null;

  // Resultado por nivel 1–5 según el modelo de definiciones
  const rLevel = scoreToResultLevel(sphereScore);
  const rName = RESULT_LEVEL_NAMES[p.id][rLevel];
  const rText = qName && SPHERE_RESULT_LEVELS[qName] ? SPHERE_RESULT_LEVELS[qName][rLevel] : null;

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
              fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: PILLAR_INK[p.id],
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
        <div className="rise-2 card-rise sphere-score-card" style={{
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
                {qMeta.name}
              </p>
              <p className="subtitle" style={{ fontSize: 15, color: 'var(--ink-3)', margin: '10px 0 0' }}>
                Rango de puntuación — {qMeta.range}
              </p>
            </div>
            <CoherenceRing level={state.level} color={c} size={120} strokeWidth={6}/>
          </div>
        </div>

        {/* Tarjeta de nivel — encabezado del resultado */}
        {rName && (
          <div className="rise-2 level-card" style={{ marginBottom: 48 }}>
            <div className="level-card-rail" style={{ background: c }}>
              <span className="lc-eyebrow">Nivel</span>
              <span className="lc-num">{rLevel}</span>
            </div>
            <div className="level-card-body">
              <p className="level-card-name">{rName.n}</p>
              <p className="level-card-motto">«{rName.m}»</p>
            </div>
          </div>
        )}

        {/* Interpretación */}
        <div className="rise-3" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Definición del nivel</p>
          <p className="display" style={{
            fontSize: 26, lineHeight: 1.35, margin: 0,
            color: 'var(--ink)', textWrap: 'pretty', maxWidth: '42ch',
            fontWeight: 500, letterSpacing: '-0.015em',
          }}>
            {qMeta.definition}
          </p>
        </div>

        {/* Implicaciones */}
        <div className="rise-3" style={{ marginBottom: 64 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Interpretación para {s.name}</p>
          <p style={{
            fontSize: 19, color: 'var(--ink-2)', margin: 0,
            lineHeight: 1.62, maxWidth: '58ch',
            fontFamily: 'var(--font-display)', fontWeight: 400,
          }}>
            {qText || lvl.descriptor}
          </p>
        </div>

        {/* Resultado por nivel — definición y actitud */}
        {rText && (
          <div className="rise-3" style={{ marginBottom: 64 }}>
            <div style={{ display: 'grid', gap: 28 }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: 12, color: PILLAR_INK[p.id] }}>Definición — {rName.n}</p>
                <p style={{ fontSize: 18.5, color: 'var(--ink-2)', margin: 0, lineHeight: 1.62, maxWidth: '60ch', fontFamily: 'var(--font-display)' }}>
                  {rText.definition}
                </p>
              </div>
              <div>
                <p className="eyebrow" style={{ marginBottom: 12, color: PILLAR_INK[p.id] }}>Actitud</p>
                <p style={{ fontSize: 18.5, color: 'var(--ink-2)', margin: 0, lineHeight: 1.62, maxWidth: '60ch', fontFamily: 'var(--font-display)' }}>
                  {rText.attitude}
                </p>
              </div>
            </div>
          </div>
        )}

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
  const qName = SPHERE_QUALITATIVE_MAP[s.id];
  const hasPlan = !!SPHERE_ACTIONS[qName];
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
              fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: PILLAR_INK[p.id],
            }}>Para — {s.name}</span>
          </div>
          <h1 className="display" style={{
            fontSize: 60, margin: 0, lineHeight: 1.06,
            letterSpacing: '-0.026em', maxWidth: '18ch',
          }}>
            Material para{' '}
            <em className="display-italic" style={{ color: 'var(--amber)' }}>seguir tu desarrollo.</em>
          </h1>
          <p style={{
            color: 'var(--ink-3)', fontSize: 19, marginTop: 22, maxWidth: '50ch',
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
          }}>
            Te compartimos recursos prácticos para empezar tu desarrollo hoy.
          </p>
        </div>

        {hasPlan ? (
          <div className="rise-2">
            <SphereActionResources sphereName={qName} sphereLabel={s.name} pillarName={p.name} color={c}/>
          </div>
        ) : (
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
        )}

      </div>
    </div>
  );
}

Object.assign(window, { Results, SphereDetail, ResourcesScreen });
