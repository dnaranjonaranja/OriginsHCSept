// screens-v4-onboarding.jsx — Cream/warm onboarding (3 variantes)

const DESK_W_V4 = 1280;
const DESK_H_V4 = 800;

function WebChromeV4({ url = 'humancomplex.app/inicio', tone = 'light' }) {
  return (
    <div className="web-chrome" style={tone === 'dark' ? { background: '#1f232c', borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}}>
      <div className="web-dots">
        <span className="web-dot" style={{ background: '#ff5f57' }}/>
        <span className="web-dot" style={{ background: '#febc2e' }}/>
        <span className="web-dot" style={{ background: '#28c840' }}/>
      </div>
      <div className="web-url" style={tone === 'dark' ? { background: '#2a2f3a', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)' } : {}}>
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

function BrandV4({ tone = 'dark' }) {
  const c = tone === 'dark' ? '#1a1d24' : '#fff';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="8" fill={c}/>
        <circle cx="16" cy="16" r="4" fill="#ff5d8f"/>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600,
        color: c, letterSpacing: '-0.015em',
      }}>Human Complex</span>
    </div>
  );
}

function Blob({ color, size = 500, top = 0, left = '50%', opacity = 0.6 }) {
  return <div className="blob" style={{
    width: size, height: size, background: color, opacity,
    top, left, transform: 'translateX(-50%)',
  }}/>;
}

// Decorative SVG illustration — abstract, no slop
function HeroIllustration({ palette = 'pink' }) {
  const palettes = {
    pink:    { p1: '#ff5d8f', p2: '#ffa17a', p3: '#1a1d24', bg: '#fde4ec' },
    mint:    { p1: '#6dd6b1', p2: '#5b8cff', p3: '#1a1d24', bg: '#dcf3e6' },
    lavender:{ p1: '#b89cf5', p2: '#ff5d8f', p3: '#1a1d24', bg: '#ece1fa' },
  };
  const c = palettes[palette];
  return (
    <svg viewBox="0 0 320 320" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`bg-${palette}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.bg}/>
          <stop offset="1" stopColor="#fff"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="320" rx="32" fill={`url(#bg-${palette})`}/>
      {/* Concentric arcs */}
      <circle cx="160" cy="160" r="110" fill="none" stroke={c.p1} strokeWidth="2" opacity="0.6"/>
      <circle cx="160" cy="160" r="80" fill="none" stroke={c.p2} strokeWidth="2" opacity="0.7"/>
      <circle cx="160" cy="160" r="50" fill={c.p1} opacity="0.20"/>
      {/* Center dot */}
      <circle cx="160" cy="160" r="14" fill={c.p3}/>
      <circle cx="160" cy="160" r="6" fill={c.p1}/>
      {/* Orbiting marks */}
      <circle cx="160" cy="50" r="8" fill={c.p2}/>
      <circle cx="270" cy="160" r="6" fill={c.p1}/>
      <circle cx="160" cy="270" r="10" fill={c.p3}/>
      <circle cx="50" cy="160" r="7" fill={c.p2}/>
      {/* Curved line */}
      <path d="M40 240 Q 160 100 280 240" stroke={c.p3} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING A · Cream split with hero illustration
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingA_v4() {
  const [intent, setIntent] = React.useState('entender');
  const intents = [
    { id: 'entender', text: 'Quiero entenderme mejor' },
    { id: 'cambio',   text: 'Estoy en un momento de cambio' },
    { id: 'estanco',  text: 'Siento que algo no fluye' },
    { id: 'crecer',   text: 'Quiero crecer con intención' },
  ];

  return (
    <div className="web bg-cream">
      <Blob color="#ffd4e1" size={600} top={-200} opacity={0.8}/>
      <WebChromeV4/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 48px', flexShrink: 0 }}>
          <BrandV4/>
          <div className="dots">
            <span className="dot active"/><span className="dot"/><span className="dot"/><span className="dot"/>
          </div>
          <button className="btn-text">Salir</button>
        </div>

        {/* Split content */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64,
          padding: '20px 80px 60px', alignItems: 'center' }}>
          {/* Left: Hero copy */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Bienvenido · Paso 01 de 04</div>
            <h1 className="h-hero" style={{ fontSize: 64, marginBottom: 22 }}>
              Esto no es un test.<br/>
              <span className="h-accent">Es un encuentro<br/>contigo.</span>
            </h1>
            <p className="body" style={{ fontSize: 17, maxWidth: '46ch', marginBottom: 36 }}>
              En un mundo que exige respuestas rápidas, Human Complex es un espacio
              para detenerte, observarte y comprenderte con mayor profundidad.
              Sin puntajes. Sin veredictos.
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn-pill btn-pill-pink">Empezar →</button>
              <button className="btn-text">Saber más</button>
            </div>
          </div>

          {/* Right: Hero illustration + intent */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ width: '100%', aspectRatio: '1.4', position: 'relative' }}>
              <HeroIllustration palette="pink"/>
            </div>
            <div className="card" style={{ padding: '22px 24px' }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Antes de comenzar</div>
              <div className="h-display" style={{ fontSize: 18, marginBottom: 14 }}>
                ¿Qué te trae hoy aquí?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {intents.map((opt) => {
                  const sel = intent === opt.id;
                  return (
                    <button key={opt.id} className={`choice-row ${sel ? 'selected' : ''}`}
                      onClick={() => setIntent(opt.id)} style={{ padding: '12px 16px', fontSize: 14 }}>
                      <span className={`choice-radio ${sel ? 'on' : ''}`}/>
                      <span style={{ flex: 1 }}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING B · Centered cream cinema
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingB_v4() {
  return (
    <div className="web bg-mint">
      <Blob color="#c4ead4" size={700} top="20%" opacity={0.7}/>
      <WebChromeV4/>

      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 48px' }}>
          <BrandV4/>
          <div className="tag tag-mint">PASO 02 · 04</div>
          <button className="btn-ghost-pill">Atrás</button>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 60,
          alignItems: 'center', padding: '20px 80px 60px' }}>
          <div style={{ position: 'relative', maxWidth: 460, justifySelf: 'center' }}>
            <HeroIllustration palette="mint"/>
          </div>
          <div>
            <h1 className="h-hero" style={{ fontSize: 80, marginBottom: 28 }}>
              No somos una<br/>sola <span className="h-accent" style={{ color: '#2d6f4a' }}>dimensión.</span>
            </h1>
            <p className="body" style={{ fontSize: 19, maxWidth: '42ch', marginBottom: 44, color: '#3a3f4b' }}>
              Tu bienestar, decisiones, relaciones y propósito están profundamente conectados.
              Aquí los miramos como un sistema vivo, no como áreas separadas.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
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
// ONBOARDING C · Pillars grid with colored cards
// ═══════════════════════════════════════════════════════════════════════════
function OnboardingC_v4() {
  const pillars = [
    { id: 'base',      name: 'Mi Base',      q: '¿Cómo me habito?',     cls: 'card-pink',     dot: '#ff5d8f' },
    { id: 'proposito', name: 'Mi Propósito', q: '¿Hacia dónde voy?',    cls: 'card-lavender', dot: '#b89cf5' },
    { id: 'conexion',  name: 'Mi Conexión',  q: '¿Cómo me relaciono?',  cls: 'card-mint',     dot: '#6dd6b1' },
    { id: 'impacto',   name: 'Mi Impacto',   q: '¿Cómo construyo?',     cls: 'card-peach',    dot: '#ffa17a' },
  ];

  return (
    <div className="web bg-paper">
      <WebChromeV4/>

      <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px' }}>
          <BrandV4/>
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
              <span className="h-accent">cuatro pilares.</span>
            </h1>
            <p className="body" style={{ fontSize: 17, maxWidth: '54ch' }}>
              Ninguno es más importante que otro. El equilibrio entre ellos es donde aparece la coherencia.
            </p>
          </div>

          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, alignItems: 'stretch' }}>
            {pillars.map((p, i) => (
              <div key={p.id} className={p.cls} style={{
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: p.dot, marginBottom: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13,
                }}>0{i + 1}</div>
                <div>
                  <div className="h-display" style={{ fontSize: 22, marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 14, color: 'var(--slate-700)' }}>{p.q}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
            <button className="btn-pill btn-pill-pink">Empezar diagnóstico →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  OnboardingA_v4, OnboardingB_v4, OnboardingC_v4,
  WebChromeV4, BrandV4, Blob, HeroIllustration,
  DESK_W_V4, DESK_H_V4,
});
