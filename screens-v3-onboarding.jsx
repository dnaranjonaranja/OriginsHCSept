// screens-v3-onboarding.jsx — DESKTOP onboarding (3 variantes)

const DESK_W = 1280;
const DESK_H = 800;

function WebChrome({ url = 'humancomplex.app/inicio' }) {
  return (
    <div className="web-chrome">
      <div className="web-dots">
        <span className="web-dot" style={{ background: '#ff5f57' }}/>
        <span className="web-dot" style={{ background: '#febc2e' }}/>
        <span className="web-dot" style={{ background: '#28c840' }}/>
      </div>
      <div className="web-url">
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <rect x="2" y="4" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8"/>
          <path d="M3.5 4V3a1 1 0 012 0v1" stroke="currentColor" strokeWidth="0.8"/>
        </svg>
        <span>{url}</span>
      </div>
      <div style={{ width: 50 }}/>
    </div>
  );
}

function Brand({ light = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="6" stroke={light ? '#fff' : '#000'} strokeWidth="1.4"/>
        <line x1="16" y1="6" x2="16" y2="26" stroke={light ? '#fff' : '#000'} strokeWidth="1" opacity="0.4"/>
        <line x1="6" y1="16" x2="26" y2="16" stroke={light ? '#fff' : '#000'} strokeWidth="1" opacity="0.4"/>
        <circle cx="16" cy="16" r="2.4" fill="oklch(0.75 0.18 260)"/>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600,
        color: light ? '#fff' : '#000', letterSpacing: '-0.015em',
      }}>Human Complex</span>
    </div>
  );
}

function GlowBlob({ color = 'oklch(0.50 0.18 260)', size = 600, top = -200, left = '50%', opacity = 0.5 }) {
  return <div className="glow-blob" style={{
    width: size, height: size, background: color, opacity,
    top, left, transform: 'translateX(-50%)',
  }}/>;
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING A · Glass cards split layout
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingA() {
  const [intent, setIntent] = React.useState('entender');
  const intents = [
    { id: 'entender', text: 'Quiero entenderme mejor' },
    { id: 'cambio',   text: 'Estoy en un momento de cambio' },
    { id: 'estanco',  text: 'Siento que algo no fluye' },
    { id: 'crecer',   text: 'Quiero crecer con intención' },
  ];

  return (
    <div className="web bg-night">
      <GlowBlob color="oklch(0.55 0.20 260)" size={800} top={-300} opacity={0.55}/>
      <WebChrome/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 48px', flexShrink: 0 }}>
          <Brand/>
          <div className="dots">
            <span className="dot active"/><span className="dot"/><span className="dot"/><span className="dot"/>
          </div>
          <button className="btn-text">Salir</button>
        </div>

        {/* Split content */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
          padding: '20px 80px 60px', alignItems: 'center' }}>
          {/* Left: Hero copy */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Bienvenido · Paso 01 de 04</div>
            <h1 className="h-hero" style={{ fontSize: 64, marginBottom: 22 }}>
              Esto no es un test.<br/>
              <em className="h-italic" style={{ color: 'oklch(0.85 0.12 260)' }}>
                Es un encuentro<br/>contigo.
              </em>
            </h1>
            <p className="body" style={{ fontSize: 17, maxWidth: '46ch', marginBottom: 36 }}>
              En un mundo que exige respuestas rápidas, Human Complex es un espacio
              para detenerte, observarte y comprenderte con mayor profundidad.
              Sin puntajes. Sin veredictos. Solo lo que aparece cuando te miras de frente.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn-pill">Empezar →</button>
              <button className="btn-text">Saber más</button>
            </div>
          </div>

          {/* Right: Intent card */}
          <div className="glass" style={{ padding: '32px 32px' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Antes de comenzar</div>
            <h2 className="h-display" style={{ fontSize: 26, marginBottom: 22 }}>
              ¿Qué te trae hoy aquí?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
              {intents.map((opt) => {
                const sel = intent === opt.id;
                return (
                  <button key={opt.id} className={`choice-row ${sel ? 'selected' : ''}`}
                    onClick={() => setIntent(opt.id)}>
                    <span className={`choice-radio ${sel ? 'on' : ''}`}/>
                    <span style={{ flex: 1 }}>{opt.text}</span>
                  </button>
                );
              })}
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 14, color: 'oklch(1 0 0 / 0.65)', margin: 0, lineHeight: 1.5 }}>
              No importa dónde estés hoy. Lo importante es que estás dispuesto a mirarte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING B · Aurora · centered cinema
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingB() {
  return (
    <div className="web bg-aurora">
      <GlowBlob color="oklch(0.65 0.16 175)" size={700} top="20%" opacity={0.45}/>
      <WebChrome/>

      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 48px' }}>
          <Brand/>
          <div className="tag">PASO 02 · 04</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost-pill">Atrás</button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 80px 60px' }}>
          <div style={{ textAlign: 'center', maxWidth: 760 }}>
            <div style={{
              width: 96, height: 96, borderRadius: 30,
              background: 'oklch(0.10 0.02 200 / 0.6)',
              border: '1.5px solid oklch(0.85 0.10 175 / 0.4)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 36, boxShadow: '0 0 80px oklch(0.65 0.16 175 / 0.5)',
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M12 25 L21 33 L36 14" stroke="oklch(0.88 0.14 165)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="h-hero" style={{ fontSize: 88, marginBottom: 28 }}>
              No somos una sola<br/>
              <em className="h-italic" style={{ color: 'oklch(0.85 0.14 175)' }}>dimensión.</em>
            </h1>
            <p className="body" style={{ fontSize: 19, maxWidth: '52ch', margin: '0 auto 44px', color: 'oklch(1 0 0 / 0.75)' }}>
              Tu bienestar, decisiones, relaciones y propósito están profundamente conectados.
              Aquí los miramos como un sistema vivo, no como áreas separadas.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-pill">Sigamos →</button>
              <button className="btn-ghost-pill">Saber más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING C · Pillars grid violet
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingC() {
  const pillars = [
    { id: 'base',      name: 'Mi Base',      q: '¿Cómo me habito?',     color: 'oklch(0.62 0.16 245)' },
    { id: 'proposito', name: 'Mi Propósito', q: '¿Hacia dónde voy?',    color: 'oklch(0.62 0.20 305)' },
    { id: 'conexion',  name: 'Mi Conexión',  q: '¿Cómo me relaciono?',  color: 'oklch(0.64 0.14 165)' },
    { id: 'impacto',   name: 'Mi Impacto',   q: '¿Cómo construyo?',     color: 'oklch(0.72 0.16 50)' },
  ];

  return (
    <div className="web bg-violet">
      <GlowBlob color="oklch(0.55 0.20 300)" size={800} top={-280} opacity={0.55}/>
      <WebChrome/>

      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px' }}>
          <Brand/>
          <div className="dots">
            <span className="dot"/><span className="dot"/><span className="dot active"/><span className="dot"/>
          </div>
          <button className="btn-text">Saltar</button>
        </div>

        <div style={{ flex: 1, padding: '20px 80px 60px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 36, maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Cuatro pilares · Tu sistema</div>
            <h1 className="h-hero" style={{ fontSize: 56, marginBottom: 14 }}>
              Tu desarrollo se mira a través de<br/>
              <em className="h-italic" style={{ color: 'oklch(0.84 0.14 300)' }}>cuatro pilares.</em>
            </h1>
            <p className="body" style={{ fontSize: 17, maxWidth: '54ch' }}>
              Ninguno es más importante que otro. El equilibrio entre ellos es donde aparece la coherencia.
            </p>
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, alignItems: 'stretch' }}>
            {pillars.map((p) => (
              <div key={p.id} className="glass glass-violet" style={{
                padding: '28px 24px', borderRadius: 24,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `linear-gradient(135deg, ${p.color}, oklch(0.20 0.05 280))`,
                  border: '1px solid oklch(1 0 0 / 0.18)',
                  boxShadow: `0 0 32px ${p.color.replace(')', ' / 0.5)')}`,
                  marginBottom: 28,
                }}/>
                <div>
                  <div className="h-display" style={{ fontSize: 22, marginBottom: 6 }}>{p.name}</div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: 15, color: 'oklch(1 0 0 / 0.7)',
                  }}>{p.q}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
            <button className="btn-pill">Empezar diagnóstico →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingA, OnboardingB, OnboardingC, WebChrome, Brand, GlowBlob, DESK_W, DESK_H });
