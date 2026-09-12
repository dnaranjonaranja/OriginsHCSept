// app.jsx — Shell de 8D, navegación y panel de Tweaks

const { useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "light",
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
    document.body.style.fontSize = tweaks.density === 'airy' ? '16px' : '14.5px';
  }, [tweaks.density]);

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
      <Topbar view={view} setView={setView}/>

      {view === 'onboarding' && <Onboarding onComplete={() => setView('selector')}/>}
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

function Topbar({ view, setView }) {
  return (
    <div className="topbar">
      <button onClick={() => setView('onboarding')} style={{
        background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
      }}>
        <HCLockup/>
      </button>
      <div className="topbar-meta">
        <span className="eyebrow-mono">v0.2 — exploración</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
