// screens-actions-4p.jsx — Los contenidos de acción como RECURSOS de la esfera.
// Cada recurso es una fila (mismo patrón visual que los recursos del Pilar 1)
// que abre un modal con su contenido.

const { useState: useStateA } = React;

// ── Catálogo de recursos derivados del Plan de Acción de la esfera ──────────
function sphereActionResources(sphereName) {
  const plan = SPHERE_ACTIONS[sphereName];
  if (!plan) return [];
  const out = [
    { id: 'reto',       kind: 'Plan de acción', title: 'Plan de acción de 7 días', author: `«${plan.challenge.name}» · reto de 7 días`, glyph: 'pen' },
    { id: 'conductual', kind: 'Acción',         title: 'Acción conductual',        author: 'Práctica para aplicar hoy',                 glyph: 'pen' },
    { id: 'habito',     kind: 'Microhábito',    title: 'Microhábito diario',       author: 'Práctica · 3 min al día',                   glyph: 'doc' },
    { id: 'reflexion',  kind: 'Journaling',     title: 'Pregunta de reflexión',    author: 'Para escribir con calma',                   glyph: 'doc' },
    { id: 'libros',     kind: 'Libros',         title: 'Libros recomendados',      author: `${plan.books.length} títulos`,              glyph: 'book' },
    { id: 'charlas',    kind: 'Charlas',        title: 'Charlas recomendadas',     author: `${plan.talks.length} charlas · TED / BBVA`, glyph: 'play' },
  ];
  if (plan.architecture) out.splice(3, 0, { id: 'arquitectura', kind: 'Arquitectura profunda', title: 'Cómo se construye', author: `${plan.architecture.length} niveles de desarrollo`, glyph: 'wave' });
  if (plan.capsule) out.push({ id: 'capsula', kind: 'Cápsula', title: plan.capsule, author: 'Cápsula de aprendizaje', glyph: 'wave' });
  if (plan.resource) out.push({ id: 'extra', kind: 'Recurso adicional', title: plan.resource, author: 'Material descargable', glyph: 'doc' });
  return out;
}

// ── Piezas de contenido ─────────────────────────────────────────────────────
function ActionResList({ items, color, numbered }) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: 12, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color, fontVariantNumeric: 'lining-nums tabular-nums' }}>
            {numbered ? String(i + 1).padStart(2, '0') : '—'}
          </span>
          <span style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}>{t}</span>
        </li>
      ))}
    </ol>
  );
}

function ActionResText({ children }) {
  return (
    <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>
      {children}
    </p>
  );
}

function ActionResBody({ plan, resId, color }) {
  if (resId === 'reto') {
    return (
      <div>
        <ActionResText>{plan.challenge.lead}</ActionResText>
        <ActionResList items={plan.challenge.steps} color={color} numbered/>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--ink-2)', margin: '20px 0 0', fontFamily: 'var(--font-display)' }}>
          {plan.challenge.close}
        </p>
      </div>
    );
  }
  if (resId === 'conductual') return <ActionResList items={plan.action} color={color} numbered/>;
  if (resId === 'habito') {
    return (
      <div>
        <ActionResText>{plan.habit.lead}</ActionResText>
        {plan.habit.blanks && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {plan.habit.blanks.map((b, i) => (
              <div key={i} style={{
                padding: '14px 18px', borderRadius: 'var(--r-md)', background: 'var(--bg-rise)',
                border: '1px solid var(--line-soft)', borderLeft: `2px solid ${color}`,
                fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.5,
              }}>{b}</div>
            ))}
          </div>
        )}
        {plan.habit.closeLead && <ActionResText>{plan.habit.closeLead}</ActionResText>}
        {plan.habit.questions && <ActionResList items={plan.habit.questions} color={color}/>}
        {plan.habit.note && (
          <p className="subtitle" style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: '18px 0 0', lineHeight: 1.55 }}>{plan.habit.note}</p>
        )}
      </div>
    );
  }
  if (resId === 'reflexion') {
    return (
      <div>
        <p className="display" style={{ fontSize: 28, lineHeight: 1.3, margin: '0 0 24px', color: 'var(--ink)', letterSpacing: '-0.02em', fontWeight: 500, textWrap: 'pretty' }}>
          {plan.reflection}
        </p>
        <ActionResText>{plan.message}</ActionResText>
      </div>
    );
  }
  if (resId === 'teoria') {
    return (
      <div>
        <ActionResText>Este desarrollo está basado en investigaciones y aportaciones de:</ActionResText>
        <ActionResList items={plan.theory} color={color}/>
      </div>
    );
  }
  if (resId === 'arquitectura') return <ActionResList items={plan.architecture} color={color} numbered/>;
  if (resId === 'libros') return <ActionResList items={plan.books} color={color}/>;
  if (resId === 'charlas') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {plan.talks.map((t, i) => (
          <div key={i}>
            <a href={t.url} target="_blank" rel="noreferrer" className="display" style={{ fontSize: 18, lineHeight: 1.35, display: 'block', marginBottom: 4, fontWeight: 500 }}>{t.title}</a>
            <p className="subtitle" style={{ fontSize: 13, margin: '0 0 6px', color: 'var(--ink-3)' }}>{t.speaker}</p>
            <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}>{t.note}</p>
          </div>
        ))}
      </div>
    );
  }
  if (resId === 'capsula') {
    return (
      <div>
        <ActionResText>{plan.opening}</ActionResText>
        <p className="subtitle" style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: 0 }}>Cápsula de aprendizaje — {plan.capsule}</p>
      </div>
    );
  }
  if (resId === 'extra') return <ActionResText>{plan.resource}</ActionResText>;
  return null;
}

// ── Modal de recurso ────────────────────────────────────────────────────────
function ActionResourceModal({ sphereName, sphereLabel, pillarName, resource, color, onClose }) {
  const plan = SPHERE_ACTIONS[sphereName];
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!plan || !resource) return null;
  return ReactDOM.createPortal((
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8, 22, 38, 0.62)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '48px 24px', overflowY: 'auto', backdropFilter: 'blur(3px)',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="rise" style={{
        width: '100%', maxWidth: 660, background: 'var(--bg-card)',
        border: '1px solid var(--line-soft)', borderTop: `3px solid ${color}`,
        borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-soft)',
        padding: '38px 40px 34px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 10, color }}>{pillarName} · {sphereLabel || sphereName}</p>
            <h3 className="display" style={{ fontSize: 30, margin: 0, letterSpacing: '-0.022em', lineHeight: 1.15, fontWeight: 500 }}>
              {resource.title}
            </h3>
            <p className="subtitle" style={{ fontSize: 14, color: 'var(--ink-3)', margin: '8px 0 0' }}>{resource.author}</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" style={{
            marginLeft: 'auto', flexShrink: 0, appearance: 'none', background: 'transparent',
            border: '1px solid var(--line-soft)', borderRadius: 'var(--r-pill)',
            color: 'var(--ink-3)', cursor: 'pointer', padding: '6px 14px',
            fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Cerrar</button>
        </div>

        <ActionResBody plan={plan} resId={resource.id} color={color}/>
      </div>
    </div>
  ), document.body);
}

// ── Lista de recursos de la esfera (filas clicables + modal) ────────────────
function SphereActionResources({ sphereName, sphereLabel, pillarName, color }) {
  const list = sphereActionResources(sphereName);
  const plan = SPHERE_ACTIONS[sphereName];
  const [open, setOpen] = useStateA(null);
  const [theoryOpen, setTheoryOpen] = useStateA(false);
  if (!list.length) return null;
  return (
    <div>
      {/* Mensaje de apertura */}
      <p className="display-italic" style={{
        fontSize: 20, lineHeight: 1.5, margin: '0 0 32px', color: 'var(--ink)',
        maxWidth: '54ch', textWrap: 'pretty',
      }}>
        {plan.opening}
      </p>

      {/* Leyenda — base teórica en acordeón (sólo si la esfera declara autores) */}
      {plan.theory && plan.theory.length > 0 && (
      <div style={{ marginBottom: 40, borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
        <button onClick={() => setTheoryOpen(!theoryOpen)} style={{
          display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '18px 0',
          background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit',
          font: 'inherit', textAlign: 'left',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.5 }}>
            Este desarrollo está basado en investigaciones y aportaciones de:
          </span>
          <span className="def-caret" style={{ marginLeft: 'auto', color, transform: theoryOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
        </button>
        {theoryOpen && (
          <div style={{ padding: '0 0 24px' }}>
            <ActionResList items={plan.theory} color={color}/>
          </div>
        )}
      </div>
      )}
      {list.map((res) => (
        <button key={res.id} className="res-row" onClick={() => setOpen(res)} style={{
          appearance: 'none', background: 'transparent', border: 'none',
          borderBottom: '1px solid var(--line-soft)', width: '100%',
          textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer',
        }}>
          <ResourceGlyph kind={res.glyph}/>
          <div>
            <p className="res-kind" style={{ color }}>{res.kind}</p>
            <p className="res-title" style={{ margin: '4px 0 0' }}>{res.title}</p>
            <p className="res-meta">{res.author}</p>
          </div>
          <span className="muted-2">→</span>
        </button>
      ))}
      {open && (
        <ActionResourceModal
          sphereName={sphereName} sphereLabel={sphereLabel} pillarName={pillarName}
          resource={open} color={color} onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}

Object.assign(window, { SphereActionResources, ActionResourceModal, sphereActionResources });
