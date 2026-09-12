// admin-origins.jsx — Vista Origins (admin de empresa): login, perfil de empresa,
// empleados + invitaciones a la evaluación Origins 4P, y acceso al comparativo/diagnóstico.

const { useState: useStateOr, useMemo: useMemoOr } = React;

function deriveEvalStatus(e) {
  if (e.status === 'eliminado') return null;
  if (e.perfil === 'Completo') return 'Completada';
  if (e.status === 'pendiente') return 'Invitado';
  return 'En Progreso';
}

// ── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ company, onLogin }) {
  const [email, setEmail] = useStateOr('');
  const [password, setPassword] = useStateOr('');
  const [error, setError] = useStateOr('');

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
              El diagnóstico 4P de Human Complex: mide Base, Propósito, Conexión e Impacto de tu organización
              a través de 11 esferas, y sigue la participación de tu equipo en tiempo real.
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
            <span className="sidebar-wordmark display" style={{ color: 'var(--ink)' }}>Origins</span>
            <span className="sidebar-wordmark-sub" style={{ color: 'var(--ink-4)' }}>by Human Complex · 4P</span>
          </div>
          <p className="subtitle" style={{ fontSize: 14, margin: '0 0 24px', color: 'var(--ink-3)' }}>
            Panel de administración
          </p>
          <form className="login-form" onSubmit={submit}>
            <label className="field">
              <span className="field-label">Correo</span>
              <input className="text-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@empresa.com" />
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

// ── Inicio: perfil de empresa + KPIs + resumen reciente ─────────────────────
function OriginsHome({ company, employees, onGoEmpleados }) {
  const active = employees.filter((e) => e.status !== 'eliminado');
  const withEval = active.map((e) => ({ ...e, evalStatus: deriveEvalStatus(e) }));
  const completed = withEval.filter((e) => e.evalStatus === 'Completada');
  const open = withEval.filter((e) => e.evalStatus === 'Invitado' || e.evalStatus === 'En Progreso');
  const rate = active.length ? Math.round((completed.length / active.length) * 100) : 0;
  const recent = [...withEval].sort((a, b) => b.ingreso - a.ingreso).slice(0, 8);

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: 12 }}>Mi empresa</p>
          <h1 className="display" style={{ fontSize: 40, margin: 0, letterSpacing: '-0.028em' }}>{company.name}</h1>
          <p className="subtitle" style={{ fontSize: 16, margin: '10px 0 0' }}>Evaluación Origins 4P by Human Complex</p>
        </div>
      </header>

      <section className="panel company-profile">
        <div className="company-profile-head">
          <BuildingGlyph size={26} />
          <div>
            <div className="company-profile-name">{company.razonSocial || company.name}</div>
            <div className="company-profile-sub">{company.giro} · {company.region}, México</div>
          </div>
        </div>
        <div className="company-profile-grid">
          <div><span className="cp-label">RFC</span><span className="cp-val">{company.rfc || '—'}</span></div>
          <div><span className="cp-label">Tipo de persona</span><span className="cp-val">{company.tipoPersona || 'Persona Moral'}</span></div>
          <div><span className="cp-label">Giro / industria</span><span className="cp-val">{company.giro}</span></div>
          <div><span className="cp-label">Región</span><span className="cp-val">{company.region}</span></div>
          <div><span className="cp-label">Contacto</span><span className="cp-val">{company.contactoNombre || '—'}</span></div>
          <div><span className="cp-label">Cargo</span><span className="cp-val">{company.contactoCargo || '—'}</span></div>
          <div><span className="cp-label">Régimen fiscal</span><span className="cp-val">{company.regimenFiscal || '—'}</span></div>
          <div><span className="cp-label">Estado</span><span className="tag-neutral">{company.estadoRegistro === 'activa' ? 'Activa' : 'Inactiva'}</span></div>
        </div>
      </section>

      <section className="kpi-grid">
        <Stat label="Total de empleados">{active.length}</Stat>
        <Stat label="Evaluaciones abiertas" sub="empleados invitados o en progreso">{open.length}</Stat>
        <Stat label="Tasa de evaluación" sub={<span className="delta delta-up">{completed.length} completadas</span>}>{rate}%<span className="stat-unit"> </span></Stat>
        <Stat label="Sin completar" accent={open.length ? 'var(--lvl-atencion)' : null}>{open.length}</Stat>
      </section>

      <section className="panel">
        <div className="panel-head">
          <p className="eyebrow" style={{ color: 'var(--p-conexion)' }}>Resumen de evaluaciones recientes</p>
          <button className="btn-link" onClick={onGoEmpleados}>Ver todos los empleados →</button>
        </div>
        <div className="crud-table-wrap">
          <table className="crud-table">
            <thead><tr><th>Empleado</th><th>Email</th><th>Estado de evaluación</th><th>Ingreso</th></tr></thead>
            <tbody>
              {recent.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="crud-person">
                      <span className="crud-avatar">{initials(e.nombre, e.apellido)}</span>
                      <div className="crud-co-name" style={{ fontSize: 14.5 }}>{e.nombre} {e.apellido}</div>
                    </div>
                  </td>
                  <td className="crud-dim">{e.email}</td>
                  <td>
                    <span className="eval-badge" data-estado={e.evalStatus === 'Completada' ? 'activa' : e.evalStatus === 'En Progreso' ? 'pendiente' : 'inactiva'}>
                      {e.evalStatus || 'Sin asignar'}
                    </span>
                  </td>
                  <td className="crud-dim">{fmtDateShort(e.ingreso)}</td>
                </tr>
              ))}
              {recent.length === 0 && <tr><td colSpan={4} className="crud-empty">Aún no hay empleados registrados.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ── Modal: agregar + invitar a Origins 4P ───────────────────────────────────
function InviteEmployeeModal({ onClose, onSave }) {
  const [form, setForm] = useStateOr({ nombre: '', apellido: '', email: '', assignEval: true });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal title="Agregar Empleado"
      subtitle="Da de alta al empleado en tu empresa. Si asignas la evaluación, se enviará automáticamente la invitación por correo."
      icon={<UsersGlyph />} onClose={onClose} width={560}>
      <div className="modal-grid">
        <Field label="Nombre"><input className="text-input" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} /></Field>
        <Field label="Apellido"><input className="text-input" value={form.apellido} onChange={(e) => set('apellido', e.target.value)} /></Field>
        <Field label="Email" full><input className="text-input" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="empleado@empresa.com" /></Field>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, cursor: 'pointer' }}>
        <input type="checkbox" checked={form.assignEval} onChange={(e) => set('assignEval', e.target.checked)} />
        <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>Asignar la evaluación <strong>Origins 4P</strong> y enviar invitación por correo</span>
      </label>
      <div className="info-callout">
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }}><path d="M2 4l6 4 6-4M2 4v8h12V4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" /></svg>
        <p>El empleado recibirá un correo para verificar su cuenta {form.assignEval && 'y comenzar la evaluación Origins 4P'}.</p>
      </div>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" disabled={!form.nombre.trim() || !form.email.trim()} onClick={() => onSave(form)}>
          {form.assignEval ? 'Crear y Enviar Invitación' : 'Crear Empleado'}
        </button>
      </div>
    </Modal>
  );
}

// ── Empleados + tablero de invitaciones (una sola empresa) ──────────────────
function OriginsEmployees({ company, employees, setEmployees }) {
  const [tab, setTab] = useStateOr('directorio');
  const [query, setQuery] = useStateOr('');
  const [adding, setAdding] = useStateOr(false);
  const [remindedAt, setRemindedAt] = useStateOr({});

  const list = employees.filter((e) => e.companyId === company.id && e.status !== 'eliminado')
    .map((e) => ({ ...e, evalStatus: deriveEvalStatus(e) }));
  const filtered = list.filter((e) => !query || (e.nombre + ' ' + e.apellido + ' ' + e.email).toLowerCase().includes(query.toLowerCase()));
  const invitations = list.filter((e) => e.evalStatus);
  const pending = invitations.filter((e) => e.evalStatus !== 'Completada');

  const handleAdd = (form) => {
    const id = 'emp_new_' + Date.now();
    setEmployees((es) => [...es, {
      id, companyId: company.id, nombre: form.nombre, apellido: form.apellido, email: form.email,
      rol: 'employee', emailStatus: 'Pendiente',
      perfil: 'Incompleto', status: form.assignEval ? 'pendiente' : 'activo', ingreso: new Date(),
    }]);
    setAdding(false);
  };

  const remind = (id) => setRemindedAt((r) => ({ ...r, [id]: new Date() }));
  const remindAll = () => {
    const now = new Date();
    const next = {}; pending.forEach((e) => { next[e.id] = now; });
    setRemindedAt((r) => ({ ...r, ...next }));
  };

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--p-conexion)', marginBottom: 12 }}>Mi empresa</p>
          <h1 className="display" style={{ fontSize: 40, margin: 0, letterSpacing: '-0.028em' }}>Empleados</h1>
          <p className="subtitle" style={{ fontSize: 16, margin: '10px 0 0' }}>Alta de empleados e invitaciones a la evaluación Origins 4P</p>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-primary" onClick={() => setAdding(true)}>+ Agregar Empleado</button>
        </div>
      </header>

      <section className="panel">
        <div className="crud-toolbar">
          <div className="segment">
            <button className={tab === 'directorio' ? 'active' : ''} onClick={() => setTab('directorio')}>Directorio ({list.length})</button>
            <button className={tab === 'invitaciones' ? 'active' : ''} onClick={() => setTab('invitaciones')}>Invitaciones ({invitations.length})</button>
          </div>
          {tab === 'directorio' && <input className="text-input search-input" placeholder="Buscar empleados…" value={query} onChange={(e) => setQuery(e.target.value)} />}
        </div>

        {tab === 'directorio' && (
          <div className="crud-table-wrap">
            <table className="crud-table">
              <thead><tr><th>Empleado</th><th>Email</th><th>Email status</th><th>Evaluación</th><th>Ingreso</th></tr></thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="crud-person">
                        <span className="crud-avatar">{initials(e.nombre, e.apellido)}</span>
                        <div className="crud-co-name" style={{ fontSize: 14.5 }}>{e.nombre} {e.apellido}</div>
                      </div>
                    </td>
                    <td className="crud-dim">{e.email}</td>
                    <td><span className="status-pill" data-status={e.emailStatus === 'Verificado' ? 'ok' : 'wait'}>{e.emailStatus}</span></td>
                    <td>{e.evalStatus
                      ? <span className="eval-badge" data-estado={e.evalStatus === 'Completada' ? 'activa' : e.evalStatus === 'En Progreso' ? 'pendiente' : 'inactiva'}>{e.evalStatus}</span>
                      : <span className="crud-dim">Sin asignar</span>}
                    </td>
                    <td className="crud-dim">{fmtDateShort(e.ingreso)}</td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={5} className="crud-empty">Sin empleados en esta vista.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'invitaciones' && (
          <div>
            <div className="invite-summary">
              <div className="invite-summary-item"><span className="invite-summary-num">{invitations.length}</span><span className="invite-summary-lbl">invitaciones enviadas</span></div>
              <div className="invite-summary-item"><span className="invite-summary-num" style={{ color: 'var(--lvl-enCamino)' }}>{invitations.length - pending.length}</span><span className="invite-summary-lbl">completadas</span></div>
              <div className="invite-summary-item"><span className="invite-summary-num" style={{ color: 'var(--lvl-atencion)' }}>{pending.length}</span><span className="invite-summary-lbl">pendientes</span></div>
              {pending.length > 0 && <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} onClick={remindAll}>Recordar a todos</button>}
            </div>
            <div className="crud-table-wrap" style={{ marginTop: 18 }}>
              <table className="crud-table">
                <thead><tr><th>Empleado</th><th>Email</th><th>Estado</th><th>Recordatorio</th><th></th></tr></thead>
                <tbody>
                  {invitations.map((e) => {
                    const done = e.evalStatus === 'Completada';
                    const wasReminded = !!remindedAt[e.id];
                    return (
                      <tr key={e.id}>
                        <td>
                          <div className="crud-person">
                            <span className="crud-avatar">{initials(e.nombre, e.apellido)}</span>
                            <div className="crud-co-name" style={{ fontSize: 14.5 }}>{e.nombre} {e.apellido}</div>
                          </div>
                        </td>
                        <td className="crud-dim">{e.email}</td>
                        <td><span className="eval-badge" data-estado={done ? 'activa' : e.evalStatus === 'En Progreso' ? 'pendiente' : 'inactiva'}>{e.evalStatus}</span></td>
                        <td className="crud-dim">{wasReminded ? `Enviado ${fmtDateShort(remindedAt[e.id])}` : '—'}</td>
                        <td style={{ textAlign: 'right' }}>
                          {!done && <button className="btn-remind" disabled={wasReminded} onClick={() => remind(e.id)}>{wasReminded ? '✓ Enviado' : 'Recordar'}</button>}
                        </td>
                      </tr>
                    );
                  })}
                  {invitations.length === 0 && <tr><td colSpan={5} className="crud-empty">Aún no has enviado invitaciones.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {adding && <InviteEmployeeModal onClose={() => setAdding(false)} onSave={handleAdd} />}
    </div>
  );
}

Object.assign(window, { LoginScreen, OriginsHome, OriginsEmployees, deriveEvalStatus });
