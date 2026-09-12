// admin-modal.jsx — Modal genérico + Tabs, reutilizados por Empresas/Empleados/Evaluaciones

function Modal({ title, subtitle, icon, onClose, children, width = 640 }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" style={{ maxWidth: width }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2 className="modal-title">{icon} {title}</h2>
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function ModalTabs({ tabs, active, onChange }) {
  return (
    <div className="modal-tabs">
      {tabs.map((t) => (
        <button key={t.id} className={active === t.id ? 'active' : ''} onClick={() => onChange(t.id)}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <label className="field" style={full ? { gridColumn: '1 / -1' } : null}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

Object.assign(window, { Modal, ModalTabs, Field });
