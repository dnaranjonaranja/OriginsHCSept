// admin-filters.jsx — Barra de filtros del panel (nivel, área, estado, ciudad)

const { useState: useStateF, useRef: useRefF, useEffect: useEffectF } = React;

// Menú desplegable multi-selección
function FilterDropdown({ label, options, selected, onChange, disabled }) {
  const [open, setOpen] = useStateF(false);
  const ref = useRefF(null);

  useEffectF(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const toggle = (opt) => {
    if (selected.includes(opt)) onChange(selected.filter((x) => x !== opt));
    else onChange([...selected, opt]);
  };

  const count = selected.length;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className="filter-btn"
        data-active={count > 0 ? '' : undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}>
        <span>{label}</span>
        {count > 0 && <span className="filter-count">{count}</span>}
        <svg width="11" height="11" viewBox="0 0 12 12" style={{ opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }}>
          <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="filter-menu">
          {options.length === 0 && (
            <p style={{ padding: '10px 14px', margin: 0, fontSize: 13, color: 'var(--ink-4)', fontStyle: 'italic' }}>
              Selecciona un estado primero
            </p>
          )}
          {options.map((opt) => {
            const on = selected.includes(opt);
            return (
              <button key={opt} className="filter-opt" data-on={on ? '' : undefined} onClick={() => toggle(opt)}>
                <span className="filter-check">{on && (
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.5 L5 9 L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}</span>
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterBar({ filters, setFilters }) {
  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  // Ciudades disponibles según estados seleccionados (si no hay estado, todas)
  const cityOptions = (() => {
    const states = filters.estado.length ? filters.estado : SEG.estado;
    const cities = [];
    states.forEach((s) => (CITY_BY_STATE[s] || []).forEach((c) => cities.push(c)));
    return [...new Set(cities)];
  })();

  const activeCount = filters.nivel.length + filters.area.length + filters.estado.length + filters.ciudad.length + filters.genero.length;

  return (
    <div className="filterbar">
      <span className="eyebrow" style={{ marginRight: 4 }}>Filtrar</span>
      <FilterDropdown label="Nivel jerárquico" options={SEG.nivel}
        selected={filters.nivel} onChange={(v) => set('nivel', v)} />
      <FilterDropdown label="Área" options={SEG.area}
        selected={filters.area} onChange={(v) => set('area', v)} />
      <FilterDropdown label="Estado" options={SEG.estado}
        selected={filters.estado} onChange={(v) => {
          // al cambiar estado, limpia ciudades que ya no aplican
          const allowed = (v.length ? v : SEG.estado).flatMap((s) => CITY_BY_STATE[s] || []);
          setFilters((f) => ({ ...f, estado: v, ciudad: f.ciudad.filter((c) => allowed.includes(c)) }));
        }} />
      <FilterDropdown label="Ciudad" options={cityOptions}
        selected={filters.ciudad} onChange={(v) => set('ciudad', v)} />
      <FilterDropdown label="Género" options={SEG.genero}
        selected={filters.genero} onChange={(v) => set('genero', v)} />

      {activeCount > 0 && (
        <button className="filter-clear" onClick={() => setFilters({ nivel: [], area: [], estado: [], ciudad: [], genero: [] })}>
          Limpiar ({activeCount})
        </button>
      )}
    </div>
  );
}

Object.assign(window, { FilterBar, FilterDropdown });
