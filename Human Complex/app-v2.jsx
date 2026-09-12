// app-v2.jsx — Shell para v2 (sin pantalla de cierre)

const { useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "light",
  "accent": "indigo",
  "density": "airy"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStateA('onboarding');
  const [sphereId, setSphereId] = useStateA('ejecucion');

  React.useEffect(() => {
    document.documentElement.dataset.mode = tweaks.mode;
  }, [tweaks.mode]);

  React.useEffect(() => {
    const root = document.documentElement;
    const accents = {
      indigo: { c: '0.48 0.18 270', c2: '0.42 0.20 270' },
      forest: { c: '0.42 0.14 155', c2: '0.36 0.15 155' },
      coral:  { c: '0.62 0.18 30',  c2: '0.56 0.20 28' },
      ink:    { c: '0.20 0.02 280', c2: '0.16 0.02 280' },
    };
    const a = accents[tweaks.accent] || accents.indigo;
    root.style.setProperty('--accent', `oklch(${a.c})`);
    root.style.setProperty('--accent-2', `oklch(${a.c2})`);
    root.style.setProperty('--accent-soft', `oklch(${a.c} / 0.10)`);
    root.style.setProperty('--accent-line', `oklch(${a.c} / 0.32)`);
    root.style.setProperty('--amber', `oklch(${a.c})`);
    root.style.setProperty('--amber-2', `oklch(${a.c2})`);
    root.style.setProperty('--amber-soft', `oklch(${a.c} / 0.10)`);
  }, [tweaks.accent]);

  React.useEffect(() => {
    document.body.style.fontSize = tweaks.density === 'airy' ? '15px' : '14px';
  }, [tweaks.density]);

  const screens = [
    { id: 'onboarding', label: 'Bienvenida' },
    { id: 'selector',   label: 'Modalidad' },
    { id: 'diagnosis',  label: 'Diagnóstico' },
    { id: 'results',    label: 'Resultados' },
    { id: 'detail',     label: 'Dimensión' },
    { id: 'resources',  label: 'Recursos' },
  ];

  return (
    <div className="app">
      <Topbar view={view} setView={setView} />

      {view === 'onboarding' && <Onboarding onComplete={() => setView('selector')} />}
      {view === 'selector'   && <Selector
                                  onPickFull={() => setView('diagnosis')}
                                  onPickSphere={(id) => { setSphereId(id); setView('diagnosis'); }} />}
      {view === 'diagnosis'  && <Diagnosis onComplete={() => setView('results')} />}
      {view === 'results'    && <Results
                                  onOpenSphere={(id) => { setSphereId(id); setView('detail'); }}
                                  onOpenResources={(id) => { setSphereId(id); setView('resources'); }} />}
      {view === 'detail'     && <SphereDetail sphereId={sphereId}
                                  onResources={(id) => { setSphereId(id); setView('resources'); }}
                                  onBack={() => setView('results')} />}
      {view === 'resources'  && <ResourcesScreen sphereId={sphereId}
                                  onBack={() => setView('detail')} />}

      <div className="devnav">
        {screens.map((s) => (
          <button key={s.id}
            className={view === s.id ? 'active' : ''}
            onClick={() => setView(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Apariencia" />
        <TweakRadio
          label="Modo"
          value={tweaks.mode}
          options={['light', 'dark']}
          onChange={(v) => setTweak('mode', v)} />
        <TweakSelect
          label="Acento"
          value={tweaks.accent}
          options={['indigo', 'forest', 'coral', 'ink']}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Densidad" />
        <TweakRadio
          label="Aire"
          value={tweaks.density}
          options={['airy', 'compact']}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </div>
  );
}

function Topbar({ view, setView }) {
  return (
    <div className="topbar">
      <button onClick={() => setView('onboarding')} style={{
        background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
      }}>
        <HCLockup />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--ink-3)', letterSpacing: '0.04em',
          padding: '4px 10px', border: '1px solid var(--line)',
          borderRadius: 'var(--r-pill)',
        }}>v2 · 2026</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
