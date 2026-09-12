// screens-results-v2.jsx — Resultados, Detalle y Recursos (v2 moderno)

const { useState: useStateR } = React;

// ═══════════════════════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════════════════════
function Results({ onOpenSphere, onOpenResources }) {
  const pattern = PATTERNS[0];

  return (
    <div className="canvas">
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 32px 140px', width: '100%' }}>
        {/* Header */}
        <div className="rise" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Tu mapa actual · {new Date().toLocaleDateString('es', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <h1 className="display" style={{
            fontSize: 56, margin: 0, lineHeight: 1.0, maxWidth: '20ch',
          }}>
            Esto no es un veredicto.<br />
            <em className="display-italic" style={{ color: 'var(--accent)' }}>
              Es una fotografía de hoy.
            </em>
          </h1>
        </div>

        {/* Patrón + Pillar field */}
        <div className="rise-2" style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr',
          gap: 32, marginBottom: 64,
        }}>
          <div style={{
            padding: '32px 36px', background: 'var(--bg-card)',
            border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
          }}>
            <p className="eyebrow" style={{ marginBottom: 18 }}>Tu patrón principal</p>
            <h2 className="display" style={{
              fontSize: 30, margin: '0 0 22', lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              {pattern.title}
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: '54ch' }}>
              {pattern.body}
            </p>
          </div>

          <div style={{
            padding: '32px 36px', background: 'var(--bg-card)',
            border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
          }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>Cómo se distribuye</p>
            <PillarField states={pattern.pillarStates} />
          </div>
        </div>

        {/* Implicaciones */}
        <div className="rise-3" style={{
          marginBottom: 64, padding: '36px 40px',
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-line)',
          borderRadius: 'var(--r-lg)',
        }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>
            Lo que esto puede significar
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.4, margin: 0,
            color: 'var(--ink)', maxWidth: '54ch',
          }}>
            Reconoces lo que sientes, pero te cuesta sostenerlo en acción.
            Tomas buenas decisiones, pero no siempre las llevas hasta el final.
            La energía existe, sólo necesita un canal para fluir.
          </p>
        </div>

        {/* Detalle por dimensión */}
        <div className="rise-4">
          <div className="between" style={{
            marginBottom: 24, paddingBottom: 16,
            borderBottom: '1px solid var(--line)',
          }}>
            <p className="eyebrow">Tu mapa, por dimensión</p>
            <span className="eyebrow-mono">12 DIMENSIONES · CLICK PARA EXPLORAR</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {PILLARS.map((p) => {
              const dims = SPHERES.filter((s) => s.pillar === p.id);
              return (
                <div key={p.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <PillarGlyph pillar={p.id} size={16} />
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500,
                      color: 'var(--ink)', letterSpacing: '-0.015em',
                    }}>{p.name}</span>
                  </div>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 10,
                  }}>
                    {dims.map((s) => {
                      const lv = pattern.sphereStates[s.id]?.level || 'enCamino';
                      const lvLabels = {
                        desequilibrio: 'Desequilibrio',
                        atencion: 'Atención',
                        enCamino: 'En camino',
                        fortaleza: 'Fortaleza',
                      };
                      return (
                        <button key={s.id}
                          onClick={() => onOpenSphere(s.id)}
                          style={{
                            padding: '20px 22px', textAlign: 'left',
                            border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
                            background: 'var(--bg-card)', cursor: 'pointer',
                            fontFamily: 'inherit', fontSize: 'inherit',
                            color: 'var(--ink)',
                            display: 'flex', flexDirection: 'column', gap: 12,
                            transition: 'all 160ms ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--line-strong)';
                            e.currentTarget.style.background = 'var(--bg-rise)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--line)';
                            e.currentTarget.style.background = 'var(--bg-card)';
                          }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="display" style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.015em' }}>
                              {s.name}
                            </span>
                            <LevelPip level={lv} />
                          </div>
                          <p style={{
                            margin: 0, fontSize: 13, color: 'var(--ink-3)',
                            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                            lineHeight: 1.45,
                          }}>
                            {s.subtitle}
                          </p>
                          <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginTop: 'auto',
                            paddingTop: 8, borderTop: '1px solid var(--line-soft)',
                          }}>
                            <span className="eyebrow-mono" style={{ fontSize: 10 }}>
                              {lvLabels[lv]}
                            </span>
                            <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>→</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA recursos */}
        <div className="rise-4" style={{
          marginTop: 64, padding: '36px 40px',
          background: 'var(--ink)', color: 'var(--bg)',
          borderRadius: 'var(--r-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
        }}>
          <div style={{ maxWidth: '46ch' }}>
            <p className="eyebrow" style={{ marginBottom: 12, color: 'var(--accent)' }}>
              Siguiente paso
            </p>
            <h3 className="display" style={{ fontSize: 24, margin: '0 0 8', lineHeight: 1.2 }}>
              Recursos curados para tu dimensión prioritaria.
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: 'oklch(1 0 0 / 0.6)' }}>
              Libros, TED Talks, ejercicios y journaling — para llevar el insight a la práctica.
            </p>
          </div>
          <button onClick={() => onOpenResources('ejecucion')}
            style={{
              padding: '14px 22px', background: 'var(--bg)', color: 'var(--ink)',
              border: 'none', borderRadius: 'var(--r-md)', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              flexShrink: 0,
            }}>
            Ver recursos <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SPHERE DETAIL
// ═══════════════════════════════════════════════════════════════════════════
function SphereDetail({ sphereId, onResources, onBack }) {
  const sphere = SPHERES.find((s) => s.id === sphereId) || SPHERES[0];
  const pillar = PILLARS.find((p) => p.id === sphere.pillar);
  const lv = PATTERNS[0].sphereStates[sphere.id]?.level || 'enCamino';
  const lvLabels = {
    desequilibrio: 'Desequilibrio',
    atencion: 'Atención',
    enCamino: 'En camino',
    fortaleza: 'Fortaleza',
  };

  return (
    <div className="canvas">
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 32px 140px', width: '100%' }}>
        <button onClick={onBack} className="btn-link rise" style={{ marginBottom: 32 }}>
          ← Volver al mapa completo
        </button>

        {/* Header */}
        <div className="rise" style={{
          paddingBottom: 32, marginBottom: 40,
          borderBottom: '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <PillarChip pillar={pillar.id} />
            <span className="level-badge">
              <LevelPip level={lv} /> {lvLabels[lv]}
            </span>
          </div>
          <h1 className="display" style={{
            fontSize: 52, margin: '0 0 14', lineHeight: 1.0,
            letterSpacing: '-0.025em',
          }}>
            {sphere.name}
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 22, color: 'var(--ink-2)', margin: 0, maxWidth: '40ch',
          }}>
            {sphere.subtitle}
          </p>
        </div>

        {/* Lectura narrativa */}
        <div className="rise-2" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Lo que tu respuesta refleja</p>
          <p style={{
            fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)',
            margin: 0, maxWidth: '58ch', textWrap: 'pretty',
          }}>
            En esta dimensión apareces con presencia, pero también con tensión.
            Sabes leer lo que sientes y reconoces tus reacciones, aunque a veces
            te toma horas — o días — volver a un punto de equilibrio. Lo que
            está en juego no es la capacidad: es la velocidad con la que vuelves
            a ti.
          </p>
        </div>

        {/* Implicaciones diarias */}
        <div className="rise-3" style={{
          padding: '28px 32px', background: 'var(--accent-soft)',
          border: '1px solid var(--accent-line)', borderRadius: 'var(--r-lg)',
          marginBottom: 48,
        }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: 'var(--accent)' }}>
            Implicaciones en tu vida diaria
          </p>
          <ul style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: 'flex', flexDirection: 'column', gap: 14,
            fontSize: 15.5, color: 'var(--ink)', lineHeight: 1.55,
          }}>
            {[
              'En conversaciones difíciles, te conectas — pero también te quedas en bucle.',
              'Tomas decisiones desde la emoción cuando estás bajo presión.',
              'Te exiges responder rápido cuando lo que necesitas es respirar primero.',
            ].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 14 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                  color: 'var(--accent)', minWidth: 22, paddingTop: 3,
                }}>0{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pregunta reflexiva */}
        <div className="rise-3" style={{
          padding: '40px 44px', border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)', marginBottom: 48, background: 'var(--bg-card)',
        }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Una pregunta para llevar contigo</p>
          <blockquote className="quote" style={{ fontSize: 30, maxWidth: '24ch' }}>
            ¿Qué necesitarías para volver a ti más rápido cuando te pierdes?
          </blockquote>
        </div>

        {/* CTA recursos */}
        <div className="rise-4" style={{
          padding: '28px 32px', background: 'var(--bg-card)',
          border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Recursos para esta dimensión</p>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 15 }}>
              4 piezas curadas — un libro, una TED, un ejercicio y un journaling.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => onResources(sphere.id)}>
            Ver recursos <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RESOURCES
// ═══════════════════════════════════════════════════════════════════════════
function ResourcesScreen({ sphereId, onBack }) {
  const sphere = SPHERES.find((s) => s.id === sphereId) || SPHERES[0];
  const pillar = PILLARS.find((p) => p.id === sphere.pillar);

  return (
    <div className="canvas">
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 32px 140px', width: '100%' }}>
        <button onClick={onBack} className="btn-link rise" style={{ marginBottom: 32 }}>
          ← Volver a la dimensión
        </button>

        <div className="rise" style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <PillarChip pillar={pillar.id} />
            <span style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 15, color: 'var(--ink-3)',
            }}>{sphere.name}</span>
          </div>
          <h1 className="display" style={{
            fontSize: 48, margin: 0, lineHeight: 1.0, maxWidth: '20ch',
            letterSpacing: '-0.025em',
          }}>
            Cuatro piezas para<br />
            <em className="display-italic" style={{ color: 'var(--accent)' }}>llevarlo a la práctica.</em>
          </h1>
        </div>

        <div className="rise-2" style={{ marginBottom: 56 }}>
          {RESOURCES_FOR_PRIORITY.map((r, i) => (
            <div key={i} className="res-row">
              <ResourceGlyph kind={r.glyph} />
              <div>
                <div className="res-kind">{r.kind}</div>
                <div className="res-title">{r.title}</div>
                <div className="res-meta">{r.author}</div>
              </div>
              <span style={{ color: 'var(--ink-3)', fontSize: 15 }}>→</span>
            </div>
          ))}
        </div>

        {/* Seguimiento */}
        <div className="rise-3" style={{
          padding: '32px 36px', background: 'var(--bg-card)',
          border: '1px solid var(--line)', borderRadius: 'var(--r-lg)',
        }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>Seguimiento · Recordatorios</p>
          <h3 className="display" style={{
            fontSize: 24, margin: '0 0 18', lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Que esto no se quede aquí.
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['7 días', 'Una pregunta breve. ¿Qué cambió en una semana?'],
              ['30 días', 'Revisión profunda. ¿Cuál fue tu compromiso? ¿Lo sostuviste?'],
              ['90 días', 'Re-diagnóstico. Compara este mapa con el de hace 3 meses.'],
            ].map(([when, what], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr auto',
                gap: 24, padding: '18px 0',
                borderTop: '1px solid var(--line-soft)',
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}>{when}</span>
                <span style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{what}</span>
                <button className="btn-link" style={{ fontSize: 13 }}>Activar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Results, SphereDetail, ResourcesScreen });
