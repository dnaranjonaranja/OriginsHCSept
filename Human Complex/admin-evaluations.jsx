// admin-evaluations.jsx — Sección Evaluaciones: asignaciones, filtros, alta y detalle

const { useState: useStateEv, useMemo: useMemoEv } = React;

function ClipboardGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="12" height="17" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 11l1.6 1.6L15 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 16h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const ESTADO_LABEL = { activa: 'Activa', pendiente: 'Pendiente', expirada: 'Expirada', inactiva: 'Inactiva' };

function EstadoBadge({ estado }) {
  return <span className="eval-badge" data-estado={estado}>{ESTADO_LABEL[estado]}</span>;
}

// ── Modal: asignar evaluación ────────────────────────────────────────────────
function AssignEvalModal({ companies, onClose, onSave }) {
  const [form, setForm] = useStateEv({ evaluacion: '', companyId: '', inicio: '', fin: '' });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canSave = form.evaluacion && form.companyId && form.inicio && form.fin;

  return (
    <Modal title="Asignar Evaluación a Empresa"
      subtitle="Selecciona una plantilla de evaluación y una empresa para crear una nueva asignación de evaluación."
      icon={<ClipboardGlyph />} onClose={onClose} width={560}>
      <div className="modal-grid" style={{ gridTemplateColumns: '1fr' }}>
        <Field label="Plantilla de evaluación">
          <select className="select" value={form.evaluacion} onChange={(e) => set('evaluacion', e.target.value)}>
            <option value="">Seleccionar una evaluación</option>
            {EVAL_TEMPLATES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Empresa">
          <select className="select" value={form.companyId} onChange={(e) => set('companyId', e.target.value)}>
            <option value="">Seleccionar una empresa</option>
            {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <div className="modal-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Fecha de inicio"><input className="text-input" type="date" value={form.inicio} onChange={(e) => set('inicio', e.target.value)} /></Field>
          <Field label="Fecha de fin"><input className="text-input" type="date" value={form.fin} onChange={(e) => set('fin', e.target.value)} /></Field>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" disabled={!canSave} onClick={() => onSave(form)}>Asignar Evaluación</button>
      </div>
    </Modal>
  );
}

// ── Modal: detalle de asignación ─────────────────────────────────────────────
function AssignmentDetailModal({ assignment, company, employees, onClose, onRemove }) {
  const rows = assignment.assigned.map((a) => ({ ...a, emp: employees.find((e) => e.id === a.employeeId) })).filter((r) => r.emp);

  return (
    <Modal title="Detalles de Asignación de Evaluación"
      subtitle="Información detallada sobre la asignación de evaluación seleccionada y los empleados asignados."
      icon={<ClipboardGlyph />} onClose={onClose} width={680}>
      <div className="modal-grid">
        <Field label="Evaluación"><p className="detail-static">{assignment.evaluacion}</p></Field>
        <Field label="Empresa"><p className="detail-static">{company?.name}</p></Field>
        <Field label="Fecha de inicio"><p className="detail-static">{fmtDate(assignment.inicio)}</p></Field>
        <Field label="Fecha de fin"><p className="detail-static">{fmtDate(assignment.fin)}</p></Field>
      </div>

      <p className="field-label" style={{ margin: '22px 0 12px' }}>Empleados Asignados</p>
      <div className="assignee-list">
        {rows.map((r) => (
          <div key={r.employeeId} className="assignee-row">
            <div className="assignee-top">
              <span className="assignee-name">{r.emp.nombre} {r.emp.apellido}</span>
              <span className="eval-badge" data-estado={r.status === 'Completada' ? 'activa' : r.status === 'En Progreso' ? 'pendiente' : 'inactiva'}>{r.status}</span>
              <button className="assignee-x" onClick={() => onRemove(assignment.id, r.employeeId)} aria-label="Quitar">
                <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.2" stroke="currentColor" strokeWidth="1.3" /><path d="M5 5l4 4M9 5l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="assignee-track"><div className="assignee-bar" style={{ width: `${r.progress}%` }} /></div>
            <span className="assignee-pct">{r.progress}%</span>
          </div>
        ))}
        {rows.length === 0 && <p className="crud-empty">Sin empleados asignados.</p>}
      </div>

      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  );
}

// ── Tarjeta de asignación ────────────────────────────────────────────────────
function AssignmentCard({ a, company, onOpen }) {
  const pct = a.totalAsignados ? Math.round((a.totalCompletados / a.totalAsignados) * 100) : 0;
  return (
    <div className="card-quiet eval-card" onClick={onOpen}>
      <div className="eval-card-head">
        <div>
          <div className="crud-co-name">{a.evaluacion}</div>
          <div className="crud-co-sub"><BuildingGlyph size={13} /> {company?.name}</div>
        </div>
        <EstadoBadge estado={a.estado} />
      </div>
      <div className="eval-card-rows">
        <div><span>Inicio:</span><b>{fmtDateShort(a.inicio)}</b></div>
        <div><span>Fin:</span><b>{fmtDateShort(a.fin)}</b></div>
        <div><span>Empleados:</span><b>{a.totalAsignados} asignados</b></div>
        <div><span>Progreso:</span><b className={pct > 0 ? 'progreso-pos' : ''}>{pct}% completadas ({a.totalCompletados}/{a.totalAsignados})</b></div>
      </div>
      <div className="assignee-track" style={{ marginTop: 10 }}><div className="assignee-bar" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
function EvaluationsSection({ companies, employees, assignments, setAssignments }) {
  const [filter, setFilter] = useStateEv('todas');
  const [query, setQuery] = useStateEv('');
  const [assigning, setAssigning] = useStateEv(false);
  const [detailId, setDetailId] = useStateEv(null);

  const companyById = Object.fromEntries(companies.map((c) => [c.id, c]));

  const filtered = useMemoEv(() => assignments.filter((a) => {
    if (filter !== 'todas' && a.estado !== filter) return false;
    if (!query) return true;
    const co = companyById[a.companyId];
    return (a.evaluacion + ' ' + (co?.name || '')).toLowerCase().includes(query.toLowerCase());
  }), [assignments, filter, query]);

  const counts = {
    todas: assignments.length,
    activa: assignments.filter((a) => a.estado === 'activa').length,
    pendiente: assignments.filter((a) => a.estado === 'pendiente').length,
    expirada: assignments.filter((a) => a.estado === 'expirada').length,
    inactiva: assignments.filter((a) => a.estado === 'inactiva').length,
  };

  const handleAssign = (form) => {
    const coEmployees = employees.filter((e) => e.companyId === form.companyId && e.status !== 'eliminado');
    const assigned = coEmployees.map((e) => ({ employeeId: e.id, progress: 0, status: 'Sin Iniciar' }));
    const today = new Date();
    const start = new Date(form.inicio), end = new Date(form.fin);
    const estado = end < today ? 'expirada' : start > today ? 'pendiente' : 'activa';
    setAssignments((as) => [...as, {
      id: 'asg_new_' + Date.now(), companyId: form.companyId, evaluacion: form.evaluacion,
      inicio: start, fin: end, estado, assigned, totalAsignados: assigned.length, totalCompletados: 0,
    }]);
    setAssigning(false);
  };

  const handleRemove = (assignmentId, employeeId) => {
    setAssignments((as) => as.map((a) => {
      if (a.id !== assignmentId) return a;
      const assigned = a.assigned.filter((x) => x.employeeId !== employeeId);
      return { ...a, assigned, totalAsignados: assigned.length, totalCompletados: assigned.filter((x) => x.status === 'Completada').length };
    }));
  };

  const detail = assignments.find((a) => a.id === detailId);

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--p-impacto)', marginBottom: 12 }}>Seguimiento</p>
          <h1 className="display" style={{ fontSize: 40, margin: 0, letterSpacing: '-0.028em' }}>Evaluaciones Asignadas</h1>
          <p className="subtitle" style={{ fontSize: 16, margin: '10px 0 0' }}>Gestiona asignaciones de evaluaciones a empresas</p>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-primary" onClick={() => setAssigning(true)}>+ Asignar Evaluación</button>
        </div>
      </header>

      <section className="panel" style={{ padding: '20px 24px' }}>
        <div className="crud-toolbar">
          <input className="text-input search-input" placeholder="Buscar evaluaciones o empresas…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="segment">
            <button className={filter === 'todas' ? 'active' : ''} onClick={() => setFilter('todas')}>Todas</button>
            <button className={filter === 'activa' ? 'active' : ''} onClick={() => setFilter('activa')}>Activas</button>
            <button className={filter === 'pendiente' ? 'active' : ''} onClick={() => setFilter('pendiente')}>Pendientes</button>
            <button className={filter === 'expirada' ? 'active' : ''} onClick={() => setFilter('expirada')}>Expiradas</button>
            <button className={filter === 'inactiva' ? 'active' : ''} onClick={() => setFilter('inactiva')}>Inactivas</button>
          </div>
          <span className="eyebrow-mono"><BuildingGlyph size={13} /> {assignments.length} asignaciones</span>
        </div>
      </section>

      <div className="eval-grid">
        {filtered.map((a) => (
          <AssignmentCard key={a.id} a={a} company={companyById[a.companyId]} onOpen={() => setDetailId(a.id)} />
        ))}
        {filtered.length === 0 && <p className="crud-empty">No hay asignaciones en este filtro.</p>}
      </div>

      {assigning && <AssignEvalModal companies={companies} onClose={() => setAssigning(false)} onSave={handleAssign} />}
      {detail && (
        <AssignmentDetailModal assignment={detail} company={companyById[detail.companyId]} employees={employees}
          onClose={() => setDetailId(null)} onRemove={handleRemove} />
      )}
    </div>
  );
}

Object.assign(window, { EvaluationsSection });
