// admin-app.jsx — Shell del Panel Organizacional

const TWEAK_DEFAULTS_ADMIN = /*EDITMODE-BEGIN*/{
  "mode": "light"
}/*EDITMODE-END*/;

function AdminApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS_ADMIN);
  const [view, setView] = React.useState('org');

  React.useEffect(() => {
    document.documentElement.dataset.mode = tweaks.mode;
  }, [tweaks.mode]);

  return (
    <div className="app">
      <div className="topbar">
        <a href="Human Complex 4P.html" style={{ textDecoration: 'none' }}>
          <HCLockup />
        </a>
        <div className="topbar-meta">
          <div className="segment">
            <button className={view === 'org' ? 'active' : ''} onClick={() => setView('org')}>Mi organización</button>
            <button className={view === 'super' ? 'active' : ''} onClick={() => setView('super')}>Súper admin</button>
          </div>
        </div>
      </div>

      {view === 'org' ? <AdminDashboard /> : <SuperAdmin />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Apariencia" />
        <TweakRadio
          label="Modo"
          value={tweaks.mode}
          options={['light', 'dark']}
          onChange={(v) => setTweak('mode', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminApp />);
