// admin-shell.jsx — Dos vistas separadas:
//   · OriginsShell      → panel del admin de la empresa (login, Mi Empresa, Empleados, Evaluaciones)
//   · HumanComplexShell → panel de plataforma del súper admin (alta de Empresas y Evaluaciones, Comparativo)

const { useState: useStateSh } = React;

function NavIcon({ d, size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
const ICONS = {
  tablero: 'M4 19V10M11 19V4M18 19V13',
  empresas: 'M6 20V6a1 1 0 011-1h10a1 1 0 011 1v14M6 20h12M9 8h1M9 11h1M9 14h1M14 8h1M14 11h1M14 14h1',
  empleados: 'M9 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16.5 8.7a2 2 0 100 4M15.5 20c.2-2.4 1.7-4.3 3.8-5',
  evaluaciones: 'M8 4h8a1.5 1.5 0 011.5 1.5V19A1.5 1.5 0 0116 20.5H8A1.5 1.5 0 016.5 19V5.5A1.5 1.5 0 018 4zM9 4V3.5A1 1 0 0110 2.5h4a1 1 0 011 1V4M9 12l1.6 1.6L15 9',
  switch: 'M7 16l-4-4 4-4M3 12h11M17 8l4 4-4 4M21 12H10',
};

function NavItem({ icon, label, active, onClick }) {
  return (
    <button className={active ? 'nav-item active' : 'nav-item'} onClick={onClick}>
      <NavIcon d={icon} />
      <span>{label}</span>
    </button>
  );
}

// ── Vista de plataforma (Human Complex, blanco + azul, rosa terciario) ──────
function HumanComplexShell({ onSwitchToOrigins, companies, setCompanies, employees, setEmployees, assignments, setAssignments }) {
  const [section, setSection] = useStateSh('comparativo');

  React.useEffect(() => { document.documentElement.dataset.mode = 'light'; }, []);

  const NAV = [
    { id: 'comparativo', label: 'Comparativo', icon: ICONS.tablero },
    { id: 'empresas', label: 'Empresas', icon: ICONS.empresas },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: ICONS.evaluaciones },
  ];

  return (
    <div className="shell">
      <aside className="sidebar hc">
        <div className="sidebar-brand">
          <img src="assets/logo-human-complex.png" alt="Human Complex" style={{ height: 63, width: 203 }} />
        </div>
        <div className="sidebar-role">
          <span className="sidebar-avatar">SA</span>
          <div>
            <div className="sidebar-role-name">Súper Admin</div>
            <div className="sidebar-role-sub">Todas las empresas</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <p className="nav-group-label">Plataforma</p>
            {NAV.map((it) => (
              <NavItem key={it.id} icon={it.icon} label={it.label} active={section === it.id} onClick={() => setSection(it.id)} />
            ))}
          </div>
        </nav>

        <div className="sidebar-foot">
          <button className="shell-switch" onClick={onSwitchToOrigins}>
            <NavIcon d={ICONS.switch} size={16} />
            Ir al panel de una empresa (Origins)
          </button>
        </div>
      </aside>

      <main className="shell-main hc-theme">
        {section === 'comparativo' && <SuperAdmin />}
        {section === 'empresas' && <CompaniesSection companies={companies} setCompanies={setCompanies} />}
        {section === 'evaluaciones' && (
          <EvaluationsSection companies={companies} employees={employees} assignments={assignments} setAssignments={setAssignments} />
        )}
      </main>
    </div>
  );
}

// ── Vista de empresa (Origins) — login + Mi Empresa, Empleados, Evaluaciones ─
function OriginsShell({ onSwitchToPlatform, companies, setCompanies, employees, setEmployees }) {
  const [tweaks, setTweak] = useTweaks({ mode: 'light' });
  const [loggedIn, setLoggedIn] = useStateSh(false);
  const [section, setSection] = useStateSh('inicio');

  const myCompany = companies.find((c) => c.name === 'Nébula Systems') || companies[0];

  React.useEffect(() => {
    document.documentElement.dataset.mode = tweaks.mode;
  }, [tweaks.mode]);

  if (!loggedIn) {
    return <LoginScreen company={myCompany} onLogin={() => setLoggedIn(true)} />;
  }

  const NAV = [
    { id: 'inicio', label: 'Mi Empresa', icon: ICONS.tablero },
    { id: 'empleados', label: 'Empleados', icon: ICONS.empleados },
    { id: 'evaluaciones', label: 'Evaluaciones', icon: ICONS.evaluaciones },
  ];

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <HCLockup size={36} dark />
        </div>
        <div className="sidebar-role">
          <span className="sidebar-avatar">A</span>
          <div>
            <div className="sidebar-role-name">Admin</div>
            <div className="sidebar-role-sub">{myCompany.name}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <p className="nav-group-label">Panel</p>
            {NAV.map((it) => (
              <NavItem key={it.id} icon={it.icon} label={it.label} active={section === it.id} onClick={() => setSection(it.id)} />
            ))}
          </div>
        </nav>

        <div className="sidebar-foot">
          <button className="shell-switch" onClick={onSwitchToPlatform}>
            <NavIcon d={ICONS.switch} size={16} />
            Ir al panel de plataforma (Human Complex)
          </button>
          <TweakRadio label="Modo" value={tweaks.mode} options={['light', 'dark']} onChange={(v) => setTweak('mode', v)} />
        </div>
      </aside>

      <main className="shell-main">
        {section === 'inicio' && <OriginsHome company={myCompany} employees={employees} companies={companies} setCompanies={setCompanies} onGoEmpleados={() => setSection('empleados')} />}
        {section === 'empleados' && <OriginsEmployees company={myCompany} employees={employees} setEmployees={setEmployees} companies={companies} setCompanies={setCompanies} />}
        {section === 'evaluaciones' && <AdminDashboard />}
      </main>
    </div>
  );
}

function AdminRoot() {
  const [entry, setEntry] = useStateSh('origins');
  const [companies, setCompanies] = useStateSh(() => buildInitialCompanies());
  const [employees, setEmployees] = useStateSh(() => buildInitialEmployees(companies));
  const [assignments, setAssignments] = useStateSh(() => buildInitialAssignments(companies, employees));

  return entry === 'origins'
    ? <OriginsShell onSwitchToPlatform={() => setEntry('hc')} companies={companies} setCompanies={setCompanies} employees={employees} setEmployees={setEmployees} />
    : <HumanComplexShell onSwitchToOrigins={() => setEntry('origins')} companies={companies} setCompanies={setCompanies} employees={employees} setEmployees={setEmployees} assignments={assignments} setAssignments={setAssignments} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminRoot />);
