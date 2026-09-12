// app.jsx — Shell de 4P, navegación y panel de Tweaks

const { useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "light",
  "density": "airy"
}/*EDITMODE-END*/;

function UserLogin({ onLogin }) {
  const [email, setEmail] = useStateA('');
  const [password, setPassword] = useStateA('');
  const [error, setError] = useStateA('');

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError('Ingresa tu correo y contraseña.'); return; }
    onLogin();
  };

  return (
    <div className="login-screen split">
      <div className="login-cover">
        <div className="login-cover-inner">
          <HCLockup size={110} dark />
          <div>
            <p className="login-cover-copy">
              En un mundo que exige respuestas rápidas, Human Complex presenta Origins, un espacio para hacer algo distinto: detenerte, observarte y comprenderte con mayor profundidad. Tu desarrollo se analiza a través de 4 Pilares fundamentales:
              <br></br>
            </p>
          </div>
          <ul className="login-cover-points">
            <li><PillarGlyph pillar="base" size={18} /> Mi Base</li>
            <li><PillarGlyph pillar="proposito" size={18} /> Mi Propósito</li>
            <li><PillarGlyph pillar="conexion" size={18} /> Mi Conexión</li>
            <li><PillarGlyph pillar="impacto" size={18} /> Mi Impacto</li>
          </ul>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <div className="login-brand">
            <span className="sidebar-wordmark display" style={{ color: 'var(--ink)' }}>Origins Panel de usuario</span>
            <span className="sidebar-wordmark-sub" style={{ color: 'var(--ink-4)' }}></span>
          </div>
          <p className="subtitle" style={{ fontSize: 14, margin: '0 0 24px', color: 'var(--ink-3)' }}>
          </p>
          <form className="login-form" onSubmit={submit}>
            <label className="field">
              <span className="field-label">Correo</span>
              <input className="text-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" />
            </label>
            <label className="field">
              <span className="field-label">Contraseña</span>
              <input className="text-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </label>
            {error && <p className="login-error">{error}</p>}
            <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loggedIn, setLoggedIn] = useStateA(false);
  const [view, setView] = useStateA('onboarding');
  const [sphereId, setSphereId] = useStateA('ejecucion');

  React.useEffect(() => {
    document.documentElement.dataset.mode = tweaks.mode;
  }, [tweaks.mode]);

  React.useEffect(() => {
    document.body.style.fontSize = tweaks.density === 'airy' ? '17.5px' : '16px';
  }, [tweaks.density]);

  if (!loggedIn) return <UserLogin onLogin={() => setLoggedIn(true)}/>;

  const screens = [
    { id: 'onboarding', label: 'Bienvenida' },
    { id: 'selector',   label: 'Modalidad' },
    { id: 'diagnosis',  label: 'Diagnóstico' },
    { id: 'results',    label: 'Resultados' },
    { id: 'detail',     label: 'Esfera' },
    { id: 'resources',  label: 'Recursos' },
  ];

  return (
    <div className="app">
      <BrandWatermark/>
      <Topbar view={view} setView={setView}/>

      {view === 'onboarding' && <Onboarding setView={setView} onComplete={() => setView('selector')}/>}
      {view === 'selector'   && <Selector
                                  onPickFull={() => setView('diagnosis')}
                                  onPickSphere={(id) => { setSphereId(id); setView('diagnosis'); }}
                                  onPickSpheres={(ids) => { setSphereId(ids[0]); setView('diagnosis'); }}/>}
      {view === 'diagnosis'  && <Diagnosis onComplete={() => setView('results')}/>}
      {view === 'results'    && <Results
                                  onOpenSphere={(id) => { setSphereId(id); setView('detail'); }}
                                  onOpenResources={(id) => { setSphereId(id); setView('resources'); }}/>}
      {view === 'detail'     && <SphereDetail sphereId={sphereId}
                                  onResources={(id) => { setSphereId(id); setView('resources'); }}
                                  onBack={() => setView('results')}/>}
      {view === 'resources'  && <ResourcesScreen sphereId={sphereId}
                                  onBack={() => setView('detail')}/>}

      <footer className="brand-footer">
        <HCLogo size={26}/>
        <span>Origins · Human Complex</span>
      </footer>

      {/* Dev nav */}
      <div className="devnav">
        {screens.map((s) => (
          <button key={s.id}
            className={view === s.id ? 'active' : ''}
            onClick={() => setView(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Apariencia"/>
        <TweakRadio
          label="Modo"
          value={tweaks.mode}
          options={['dark', 'light']}
          onChange={(v) => setTweak('mode', v)}/>

        <TweakSection label="Densidad"/>
        <TweakRadio
          label="Aire"
          value={tweaks.density}
          options={['airy', 'compact']}
          onChange={(v) => setTweak('density', v)}/>
      </TweaksPanel>
    </div>
  );
}

function BrandWatermark() {
  return (
    <div className="brand-watermark" aria-hidden="true">
      <HCLogo size={600}/>
    </div>
  );
}

function Topbar({ view, setView }) {
  return (
    <header className="topbar">
      <img className="topbar-logo" src="assets/origins-logo.svg" alt="Origins — by Human Complex" />
      <div className="topbar-meta">
        <span className="topbar-tagline"></span>
      </div>
    </header>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
