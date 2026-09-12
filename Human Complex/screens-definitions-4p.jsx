// screens-definitions-4p.jsx — Módulo "Definiciones del Modelo ORIGINS"
// Entre Contexto (Onboarding) e Instrucciones. Acordeón por pilar; esferas expandibles dentro.

const { useState: useStateDef } = React;

function SphereAccordionItem({ sphere, color }) {
  const [open, setOpen] = useStateDef(false);
  return (
    <div className="def-sphere" style={{ borderColor: open ? color : 'var(--line-soft)' }}>
      <button className="def-sphere-head" onClick={() => setOpen(!open)}>
        <span style={{ color: open ? color : 'var(--ink)' }}>{sphere.name}</span>
        <span className="def-caret" style={{ transform: open ? 'rotate(180deg)' : 'none', color }}>▾</span>
      </button>
      {open && (
        <div className="def-sphere-body">
          <p><strong style={{ color }}>Definición: </strong>{sphere.definition}</p>
          <p><strong style={{ color }}>Descripción práctica: </strong>{sphere.practical}</p>
        </div>
      )}
    </div>
  );
}

function PillarAccordionCard({ pillar, open, onToggle }) {
  const color = PILLAR_COLORS[pillar.id];
  return (
    <div className="def-pillar-card" style={{ borderColor: open ? color : 'var(--line-soft)' }}>
      <button className="def-pillar-head" onClick={onToggle}>
        <div className="def-pillar-head-left">
          <PillarGlyph pillar={pillar.id} size={30} />
          <div>
            <p className="eyebrow" style={{ color, marginBottom: 4 }}>{pillar.label}</p>
            <h3 className="display" style={{ margin: 0, fontSize: 26 }}>{pillar.name}</h3>
          </div>
        </div>
        <span className="def-caret def-caret-lg" style={{ transform: open ? 'rotate(180deg)' : 'none', color }}>▾</span>
      </button>

      {open && (
        <div className="def-pillar-body">
          <p className="def-pillar-def">{pillar.definition}</p>
          <p className="def-pillar-reflect-label">¿Cómo se refleja en tu vida?</p>
          <p className="def-pillar-reflect">{pillar.reflect}</p>

          <p className="def-spheres-intro">Este Pilar está integrado por:</p>
          <div className="def-spheres-list">
            {pillar.spheres.map((s) => <SphereAccordionItem key={s.name} sphere={s} color={color} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function DefinitionsScreen({ onContinue }) {
  const [openId, setOpenId] = useStateDef(PILLAR_DEFINITIONS[0].id);

  return (
    <div className="canvas">
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 44px 140px', width: '100%' }}>
        <div className="rise" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Antes de empezar</p>
          <h1 className="display" style={{ fontSize: 48, margin: 0, lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Conoce los pilares de <em className="display-italic" style={{ color: 'var(--amber)' }}>ORIGINS.</em>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-3)', marginTop: 20, maxWidth: '56ch', lineHeight: 1.6 }}>
            Antes de responder, te compartimos qué evalúa cada Pilar y cada Esfera. Toca cada tarjeta para expandirla.
          </p>
        </div>

        <div className="rise-2 def-pillar-stack">
          {PILLAR_DEFINITIONS.map((p) => (
            <PillarAccordionCard key={p.id} pillar={p} open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
          ))}
        </div>

        <div className="rise-3 def-continue" style={{ marginTop: 56 }}>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '54ch', fontFamily: 'var(--font-display)' }}>
            Ya conoces los pilares que conforman ORIGINS. En la siguiente sección responderás un cuestionario
            que permitirá identificar tu nivel de desarrollo en cada uno de ellos.
          </p>
          <button className="btn btn-primary" onClick={onContinue} style={{ marginTop: 24 }}>
            Continuar al cuestionario <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DefinitionsScreen });
