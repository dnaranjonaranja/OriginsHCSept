// admin-companies.jsx — Sección Empresas: lista, KPIs, alta/edición con pestañas

const { useState: useStateCo, useMemo: useMemoCo } = React;

function BuildingGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CompanyFormModal({ initial, onClose, onSave }) {
  const [tab, setTab] = useStateCo('basicos');
  const [form, setForm] = useStateCo(initial || {
    name: '', razonSocial: '', tipoPersona: 'Persona Moral', rfc: '', descripcion: '',
    contactoNombre: '', contactoCargo: '',
    giro: GIROS[0], region: ESTADOS_MX[0], empleados: '',
    calle: '', ciudad: '', cp: '', pais: 'México',
    telefono: '', email: '',
    regimenFiscal: '', metodoPago: 'Transferencia',
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const isEdit = !!initial;

  return (
    <Modal
      title={isEdit ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
      subtitle={isEdit ? 'Actualiza la información de la empresa' : 'Completa la información para registrar una nueva empresa'}
      icon={<BuildingGlyph />}
      onClose={onClose}
      width={720}>

      <Field label="Tipo de persona">
        <select className="select" value={form.tipoPersona} onChange={(e) => set('tipoPersona', e.target.value)}>
          {TIPO_PERSONA.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <ModalTabs
        active={tab} onChange={setTab}
        tabs={[
          { id: 'basicos', label: 'Básicos' },
          { id: 'direccion', label: 'Dirección' },
          { id: 'contacto', label: 'Contacto' },
          { id: 'fiscal', label: 'Fiscal' },
        ]} />

      {tab === 'basicos' && (
        <div className="modal-grid">
          <Field label="Nombre comercial *"><input className="text-input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nombre de la empresa" /></Field>
          <Field label="Razón social"><input className="text-input" value={form.razonSocial} onChange={(e) => set('razonSocial', e.target.value)} placeholder="Razón social completa" /></Field>
          <Field label="Giro / industria">
            <select className="select" value={form.giro} onChange={(e) => set('giro', e.target.value)}>
              {GIROS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Colaboradores (aprox.)"><input className="text-input" type="number" value={form.empleados} onChange={(e) => set('empleados', e.target.value)} placeholder="Ej. 250" /></Field>
          <Field label="Descripción" full>
            <textarea className="text-input textarea" value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} placeholder="Breve descripción de la empresa…" />
          </Field>
        </div>
      )}

      {tab === 'direccion' && (
        <div className="modal-grid">
          <Field label="Calle y número" full><input className="text-input" value={form.calle} onChange={(e) => set('calle', e.target.value)} placeholder="Calle, número, colonia" /></Field>
          <Field label="Ciudad"><input className="text-input" value={form.ciudad} onChange={(e) => set('ciudad', e.target.value)} placeholder="Ciudad" /></Field>
          <Field label="Estado">
            <select className="select" value={form.region} onChange={(e) => set('region', e.target.value)}>
              {ESTADOS_MX.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Código postal"><input className="text-input" value={form.cp} onChange={(e) => set('cp', e.target.value)} placeholder="00000" /></Field>
          <Field label="País"><input className="text-input" value={form.pais} onChange={(e) => set('pais', e.target.value)} /></Field>
        </div>
      )}

      {tab === 'contacto' && (
        <div className="modal-grid">
          <Field label="Persona de contacto"><input className="text-input" value={form.contactoNombre} onChange={(e) => set('contactoNombre', e.target.value)} placeholder="Nombre de la persona de contacto" /></Field>
          <Field label="Cargo"><input className="text-input" value={form.contactoCargo} onChange={(e) => set('contactoCargo', e.target.value)} placeholder="Ej: Directora de RH" /></Field>
          <Field label="Teléfono"><input className="text-input" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} placeholder="+52 55 0000 0000" /></Field>
          <Field label="Email de facturación"><input className="text-input" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="contacto@empresa.com" /></Field>
        </div>
      )}

      {tab === 'fiscal' && (
        <div className="modal-grid">
          <Field label="RFC"><input className="text-input" value={form.rfc} onChange={(e) => set('rfc', e.target.value)} placeholder="ABCD123456ABC" /></Field>
          <Field label="Régimen fiscal"><input className="text-input" value={form.regimenFiscal} onChange={(e) => set('regimenFiscal', e.target.value)} placeholder="Ej. 601 · General de Ley" /></Field>
          <Field label="Método de pago preferido">
            <select className="select" value={form.metodoPago} onChange={(e) => set('metodoPago', e.target.value)}>
              <option>Transferencia</option><option>Tarjeta corporativa</option><option>Cheque</option>
            </select>
          </Field>
        </div>
      )}

      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" disabled={!form.name.trim()}
          onClick={() => onSave(form)}>
          {isEdit ? 'Guardar Cambios' : 'Registrar Empresa'}
        </button>
      </div>
    </Modal>
  );
}

function CompaniesSection({ companies, setCompanies }) {
  const [tab, setTab] = useStateCo('activas');
  const [query, setQuery] = useStateCo('');
  const [editing, setEditing] = useStateCo(null); // null | 'new' | company obj

  const filtered = useMemoCo(() => {
    const wantActive = tab === 'activas';
    return companies.filter((c) => (c.estadoRegistro === 'activa') === wantActive)
      .filter((c) => !query || (c.name + c.giro + c.region).toLowerCase().includes(query.toLowerCase()));
  }, [companies, tab, query]);

  const kpis = useMemoCo(() => ({
    total: companies.length,
    morales: companies.filter((c) => c.tipoPersona === 'Persona Moral').length,
    fisicas: companies.filter((c) => c.tipoPersona === 'Persona Física').length,
    activas: companies.filter((c) => c.estadoRegistro === 'activa').length,
  }), [companies]);

  const handleSave = (form) => {
    if (form.id) {
      setCompanies((cs) => cs.map((c) => (c.id === form.id ? { ...c, ...form } : c)));
    } else {
      const id = 'co_new_' + Date.now();
      setCompanies((cs) => [...cs, {
        ...form, id, color: ENTITY_COLORS[cs.length % ENTITY_COLORS.length],
        empleados: Number(form.empleados) || 0, invited: Number(form.empleados) || 0, done: 0, participation: 0,
        global: 3.0, pillarAvg: Object.fromEntries(PILLARS.map((p) => [p.id, 3.0])),
        sphereAvg: Object.fromEntries(SPHERES.map((s) => [s.id, 3.0])),
        lowest: { id: SPHERES[0].id, value: 3.0 }, highest: { id: SPHERES[0].id, value: 3.0 },
        estadoRegistro: 'activa', creado: new Date(),
      }]);
    }
    setEditing(null);
  };

  const toggleEstado = (co) => {
    setCompanies((cs) => cs.map((c) => c.id === co.id ? { ...c, estadoRegistro: c.estadoRegistro === 'activa' ? 'inactiva' : 'activa' } : c));
  };

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--p-base)', marginBottom: 12 }}>Gestión</p>
          <h1 className="display" style={{ fontSize: 40, margin: 0, letterSpacing: '-0.028em' }}>Empresas</h1>
          <p className="subtitle" style={{ fontSize: 16, margin: '10px 0 0' }}>Gestiona empresas y sus configuraciones</p>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-primary" onClick={() => setEditing('new')}>+ Agregar Empresa</button>
        </div>
      </header>

      <section className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <Stat label="Total de empresas">{kpis.total}</Stat>
        <Stat label="Personas morales">{kpis.morales}</Stat>
        <Stat label="Personas físicas">{kpis.fisicas}</Stat>
        <Stat label="Empresas activas" accent="var(--lvl-enCamino)">{kpis.activas}</Stat>
      </section>

      <section className="panel">
        <div className="crud-toolbar">
          <div className="segment">
            <button className={tab === 'activas' ? 'active' : ''} onClick={() => setTab('activas')}>Empresas Activas</button>
            <button className={tab === 'inactivas' ? 'active' : ''} onClick={() => setTab('inactivas')}>Empresas Inactivas</button>
          </div>
          <input className="text-input search-input" placeholder="Buscar empresas…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="crud-table-wrap">
          <table className="crud-table">
            <thead>
              <tr><th>Empresa</th><th>RFC</th><th>Tipo</th><th>Estado</th><th>Creado</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="crud-co-name">{c.name}</div>
                    <div className="crud-co-sub">{c.razonSocial}</div>
                  </td>
                  <td className="mono-cell">{c.rfc}</td>
                  <td><span className="tag-neutral">{c.tipoPersona}</span></td>
                  <td><span className={c.estadoRegistro === 'activa' ? 'status-pill' : 'status-pill'} data-status={c.estadoRegistro === 'activa' ? 'ok' : 'off'}>{c.estadoRegistro === 'activa' ? 'Activa' : 'Inactiva'}</span></td>
                  <td className="crud-dim">{fmtDate(c.creado)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-remind" onClick={() => setEditing(c)}>Editar</button>
                      <button className="btn-remind" onClick={() => toggleEstado(c)}>{c.estadoRegistro === 'activa' ? 'Desactivar' : 'Activar'}</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="crud-empty">No hay empresas en esta vista.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editing && (
        <CompanyFormModal
          initial={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSave={handleSave} />
      )}
    </div>
  );
}

Object.assign(window, { CompaniesSection, BuildingGlyph });
