// app.jsx — Shell, navegación y panel de Tweaks

const { useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "accent": "amber",
  "type": "editorial",
  "density": "airy"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStateA('onboarding');
  const [sphereId, setSphereId] = useStateA('tiempo');

  // Aplicar modo claro/oscuro al root
  React.useEffect(() => {
    document.documentElement.dataset.mode = tweaks.mode;
  }, [tweaks.mode]);

  // Acentos alternativos
  React.useEffect(() => {
    const root = document.documentElement;
    if (tweaks.accent === 'amber') {
      root.style.setProperty('--amber', 'oklch(0.78 0.13 65)');
      root.style.setProperty('--amber-2', 'oklch(0.72 0.14 60)');
      root.style.setProperty('--amber-soft', 'oklch(0.78 0.13 65 / 0.14)');
    } else if (tweaks.accent === 'sage') {
      root.style.setProperty('--amber', 'oklch(0.75 0.08 155)');
      root.style.setProperty('--amber-2', 'oklch(0.68 0.09 155)');
      root.style.setProperty('--amber-soft', 'oklch(0.75 0.08 155 / 0.16)');
    } else if (tweaks.accent === 'plum') {
      root.style.setProperty('--amber', 'oklch(0.68 0.10 340)');
      root.style.setProperty('--amber-2', 'oklch(0.60 0.11 340)');
      root.style.setProperty('--amber-soft', 'oklch(0.68 0.10 340 / 0.16)');
    } else if (tweaks.accent === 'azul') {
      root.style.setProperty('--amber', 'oklch(0.72 0.10 245)');
      root.style.setProperty('--amber-2', 'oklch(0.64 0.12 245)');
      root.style.setProperty('--amber-soft', 'oklch(0.72 0.10 245 / 0.16)');
    }
  }, [tweaks.accent]);

  // Tipografía alterna
  React.useEffect(() => {
    const root = document.documentElement;
    if (tweaks.type === 'editorial') {
      root.style.setProperty('--font-display', '"Source Serif 4","Source Serif Pro",Charter,Georgia,serif');
      root.style.setProperty('--font-ui', '"Inter Tight","Inter",-apple-system,system-ui,sans-serif');
    } else if (tweaks.type === 'humanist') {
      root.style.setProperty('--font-display', '"Fraunces","Source Serif 4",Georgia,serif');
      root.style.setProperty('--font-ui', '"Geist","Inter Tight",-apple-system,system-ui,sans-serif');
    } else if (tweaks.type === 'modern') {
      root.style.setProperty('--font-display', '"Instrument Serif","Source Serif 4",Georgia,serif');
      root.style.setProperty('--font-ui', '"Geist","Inter Tight",-apple-system,system-ui,sans-serif');
    }
  }, [tweaks.type]);

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
    { id: 'closing',    label: 'Cierre' },
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
                                  onBack={() => setView('detail')}
                                  onClosing={() => setView('closing')} />}
      {view === 'closing'    && <ClosingScreen onRestart={() => setView('onboarding')} />}

      {/* Dev nav (saltar entre pantallas) */}
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
        <TweakSection label="Apariencia" />
        <TweakRadio
          label="Modo"
          value={tweaks.mode}
          options={['dark', 'light']}
          onChange={(v) => setTweak('mode', v)} />
        <TweakSelect
          label="Acento"
          value={tweaks.accent}
          options={['amber', 'sage', 'plum', 'azul']}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Tipografía" />
        <TweakRadio
          label="Familia"
          value={tweaks.type}
          options={['editorial', 'humanist', 'modern']}
          onChange={(v) => setTweak('type', v)} />

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
      <div className="topbar-meta">
        <span className="eyebrow-mono">v0.1 — exploración</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
