// admin-employees.jsx — Sección Empleados: grid de empresas → directorio con pestañas

const { useState: useStateEm, useMemo: useMemoEm } = React;

function UsersGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="17" cy="8.5" r="2.3" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
      <path d="M15.5 19c.2-2.2 1.6-4 3.7-4.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function initials(nombre, apellido) {
  return ((nombre[0] || '') + (apellido[0] || '')).toUpperCase();
}

function AddEmployeeModal({ companies, defaultCompanyId, onClose, onSave }) {
  const [form, setForm] = useStateEm({ nombre: '', apellido: '', email: '', companyId: defaultCompanyId || companies[0]?.id || '' });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title="Agregar Nuevo Empleado"
      subtitle="Se enviará un correo de bienvenida con código 2FA para que el empleado pueda verificar su email y activar su cuenta."
      icon={<UsersGlyph />} onClose={onClose} width={560}>
      <div className="modal-grid">
        <Field label="Nombre"><input className="text-input" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} /></Field>
        <Field label="Apellido"><input className="text-input" value={form.apellido} onChange={(e) => set('apellido', e.target.value)} /></Field>
        <Field label="Email" full><input className="text-input" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="empleado@empresa.com" /></Field>
        <Field label="Empresa" full>
          <select className="select" value={form.companyId} onChange={(e) => set('companyId', e.target.value)}>
            {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
      </div>
      <div className="info-callout">
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }}><path d="M2 4l6 4 6-4M2 4v8h12V4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" /></svg>
        <p>Se enviará un correo de bienvenida con un código de 6 dígitos para verificar el email y activar la cuenta.</p>
      </div>
      <div className="modal-actions">
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
          disabled={!form.nombre.trim() || !form.email.trim()}
          onClick={() => onSave(form)}>
          Crear Empleado
        </button>
      </div>
    </Modal>
  );
}

// ── Directorio de una empresa ────────────────────────────────────────────────
function CompanyEmployeeDirectory({ company, employees, setEmployees, allCompanies, onBack }) {
  const [tab, setTab] = useStateEm('activos');
  const [query, setQuery] = useStateEm('');
  const [adding, setAdding] = useStateEm(false);

  const list = employees.filter((e) => e.companyId === company.id);
  const counts = {
    activo: list.filter((e) => e.status === 'activo').length,
    pendiente: list.filter((e) => e.status === 'pendiente').length,
    eliminado: list.filter((e) => e.status === 'eliminado').length,
  };
  const statusKey = tab === 'activos' ? 'activo' : tab === 'pendientes' ? 'pendiente' : 'eliminado';
  const filtered = list.filter((e) => e.status === statusKey)
    .filter((e) => !query || (e.nombre + ' ' + e.apellido + ' ' + e.email).toLowerCase().includes(query.toLowerCase()));

  const handleAdd = (form) => {
    setEmployees((es) => [...es, {
      id: 'emp_new_' + Date.now(), companyId: form.companyId,
      nombre: form.nombre, apellido: form.apellido, email: form.email,
      rol: 'employee', emailStatus: 'Pendiente', perfil: 'Incompleto',
      status: 'pendiente', ingreso: new Date(),
    }]);
    setAdding(false);
  };

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <button className="btn-back" onClick={onBack}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2 L4 7 L9 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Volver a Empresas
          </button>
          <h1 className="display" style={{ fontSize: 34, margin: '14px 0 0', letterSpacing: '-0.026em' }}>Empleados — {company.name}</h1>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-primary" onClick={() => setAdding(true)}>+ Agregar Empleado</button>
        </div>
      </header>

      <section className="panel">
        <div className="crud-toolbar">
          <div className="segment">
            <button className={tab === 'activos' ? 'active' : ''} onClick={() => setTab('activos')}>Activos ({counts.activo})</button>
            <button className={tab === 'pendientes' ? 'active' : ''} onClick={() => setTab('pendientes')}>Pendientes ({counts.pendiente})</button>
            <button className={tab === 'eliminados' ? 'active' : ''} onClick={() => setTab('eliminados')}>Eliminados ({counts.eliminado})</button>
          </div>
          <input className="text-input search-input" placeholder="Buscar empleados…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="crud-table-wrap">
          <table className="crud-table">
            <thead><tr><th>Empleado</th><th>Email</th><th>Rol</th><th>Email status</th><th>Perfil</th><th>Ingreso</th></tr></thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="crud-person">
                      <span className="crud-avatar">{initials(e.nombre, e.apellido)}</span>
                      <div>
                        <div className="crud-co-name">{e.nombre} {e.apellido}</div>
                        <div className="crud-co-sub">{e.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="crud-dim">{e.email}</td>
                  <td><span className="tag-neutral">{e.rol}</span></td>
                  <td><span className="status-pill" data-status={e.emailStatus === 'Verificado' ? 'ok' : 'wait'}>{e.emailStatus}</span></td>
                  <td><span className="status-pill" data-status={e.perfil === 'Completo' ? 'ok' : 'off'}>{e.perfil}</span></td>
                  <td className="crud-dim">{fmtDateShort(e.ingreso)}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="crud-empty">Sin empleados en esta vista.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      {adding && (
        <AddEmployeeModal companies={allCompanies} defaultCompanyId={company.id} onClose={() => setAdding(false)} onSave={handleAdd} />
      )}
    </div>
  );
}

// ── Grid de empresas → entra al directorio ──────────────────────────────────
function EmployeesSection({ companies, employees, setEmployees }) {
  const [openCompanyId, setOpenCompanyId] = useStateEm(null);
  const [query, setQuery] = useStateEm('');
  const [adding, setAdding] = useStateEm(false);

  const openCompany = companies.find((c) => c.id === openCompanyId);
  if (openCompany) {
    return <CompanyEmployeeDirectory company={openCompany} employees={employees} setEmployees={setEmployees}
      allCompanies={companies} onBack={() => setOpenCompanyId(null)} />;
  }

  const filteredCompanies = companies.filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()));

  const handleAdd = (form) => {
    setEmployees((es) => [...es, {
      id: 'emp_new_' + Date.now(), companyId: form.companyId,
      nombre: form.nombre, apellido: form.apellido, email: form.email,
      rol: 'employee', emailStatus: 'Pendiente', perfil: 'Incompleto',
      status: 'pendiente', ingreso: new Date(),
    }]);
    setAdding(false);
  };

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--p-conexion)', marginBottom: 12 }}>Directorio</p>
          <h1 className="display" style={{ fontSize: 40, margin: 0, letterSpacing: '-0.028em' }}>Empleados</h1>
          <p className="subtitle" style={{ fontSize: 16, margin: '10px 0 0' }}>Gestiona empleados por empresa</p>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-primary" onClick={() => setAdding(true)}>+ Agregar Empleado</button>
        </div>
      </header>

      <input className="text-input search-input" style={{ maxWidth: 420 }} placeholder="Busca empresas…" value={query} onChange={(e) => setQuery(e.target.value)} />

      <div className="company-grid">
        {filteredCompanies.map((c) => {
          const list = employees.filter((e) => e.companyId === c.id);
          const counts = {
            activo: list.filter((e) => e.status === 'activo').length,
            pendiente: list.filter((e) => e.status === 'pendiente').length,
            eliminado: list.filter((e) => e.status === 'eliminado').length,
          };
          return (
            <div key={c.id} className="card-quiet company-card">
              <div className="company-card-head">
                <BuildingGlyph />
                <span className="company-card-name">{c.name}</span>
              </div>
              <div className="company-card-stats">
                <div><span className="cc-num" style={{ color: 'var(--lvl-enCamino)' }}>{counts.activo}</span><span className="cc-lbl">Activos</span></div>
                <div><span className="cc-num" style={{ color: 'var(--lvl-atencion)' }}>{counts.pendiente}</span><span className="cc-lbl">Pendientes</span></div>
                <div><span className="cc-num" style={{ color: 'var(--lvl-desequilibrio)' }}>{counts.eliminado}</span><span className="cc-lbl">Eliminados</span></div>
                <div><span className="cc-num">{list.length}</span><span className="cc-lbl">Total</span></div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setOpenCompanyId(c.id)}>
                Ver Empleados
              </button>
            </div>
          );
        })}
      </div>

      {adding && (
        <AddEmployeeModal companies={companies} onClose={() => setAdding(false)} onSave={handleAdd} />
      )}
    </div>
  );
}

Object.assign(window, { EmployeesSection });
