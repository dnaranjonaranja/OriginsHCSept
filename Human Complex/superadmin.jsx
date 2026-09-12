// superadmin.jsx — Vista Súper Admin · Benchmark entre empresas / por giro

const { useState: useStateSA, useMemo: useMemoSA, useRef: useRefSA, useEffect: useEffectSA } = React;

// ── Multi-select con buscador (escala a muchas empresas) ─────────────────────
function CompanyPicker({ companies, selected, onChange }) {
  const [open, setOpen] = useStateSA(false);
  const [q, setQ] = useStateSA('');
  const ref = useRefSA(null);

  useEffectSA(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  const filtered = companies.filter((c) =>
    (c.name + ' ' + c.giro + ' ' + c.region).toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
      <div ref={ref} style={{ position: 'relative' }}>
        <button className="filter-btn" data-active={selected.length ? '' : undefined} onClick={() => setOpen((o) => !o)}>
          <span>Elegir empresas</span>
          {selected.length > 0 && <span className="filter-count">{selected.length}</span>}
          <svg width="11" height="11" viewBox="0 0 12 12" style={{ opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }}>
            <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="filter-menu" style={{ minWidth: 300 }}>
            <input className="picker-search" autoFocus placeholder="Buscar empresa, giro o región…"
              value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="picker-actions">
              <button onClick={() => onChange(companies.map((c) => c.id))}>Todas</button>
              <button onClick={() => onChange([])}>Limpiar</button>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: 260 }}>
              {filtered.length === 0 && <p style={{ padding: '10px 12px', margin: 0, fontSize: 13, color: 'var(--ink-4)', fontStyle: 'italic' }}>Sin resultados</p>}
              {filtered.map((c) => {
                const on = selected.includes(c.id);
                return (
                  <button key={c.id} className="filter-opt" data-on={on ? '' : undefined} onClick={() => toggle(c.id)}>
                    <span className="filter-check">{on && (
                      <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.5 L5 9 L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}</span>
                    <i className="sa-chip-dot" style={{ background: c.color }} />
                    <span style={{ flex: 1 }}>{c.name}</span>
                    <span className="sa-chip-meta" style={{ border: 'none', padding: 0 }}>{c.giro}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Chips de lo seleccionado (removibles) */}
      <div className="sa-chips" style={{ flex: 1 }}>
        {selected.map((id) => {
          const c = companies.find((x) => x.id === id);
          if (!c) return null;
          return (
            <span key={id} className="sa-chip" data-on="">
              <i className="sa-chip-dot" style={{ background: c.color }} />
              {c.name}
              <button className="sa-chip-x" onClick={() => toggle(id)} aria-label="Quitar">×</button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

const SA_SPHERE_BY_ID = Object.fromEntries(SPHERES.map((s) => [s.id, s]));

function saColor(v) {
  if (v == null) return 'var(--ink-4)';
  if (v < 2) return 'var(--lvl-desequilibrio)';
  if (v < 3) return 'var(--lvl-atencion)';
  if (v < 4) return 'var(--lvl-enCamino)';
  return 'var(--lvl-fortaleza)';
}

// ── Segmented control ────────────────────────────────────────────────────────
function Segment({ value, options, onChange }) {
  return (
    <div className="segment">
      {options.map((o) => (
        <button key={o.id} className={value === o.id ? 'active' : ''} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Chips de selección ───────────────────────────────────────────────────────
function EntityChips({ items, selected, onToggle, colorOf }) {
  return (
    <div className="sa-chips">
      {items.map((it) => {
        const on = selected.includes(it.id);
        return (
          <button key={it.id} className="sa-chip" data-on={on ? '' : undefined}
            onClick={() => onToggle(it.id)}>
            <i className="sa-chip-dot" style={{ background: on ? (colorOf ? colorOf(it) : 'var(--amber)') : 'var(--line)' }} />
            {it.label}
            {it.meta && <span className="sa-chip-meta">{it.meta}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ── Gráfica de columnas agrupadas ───────────────────────────────────────────
function GroupedBars({ groups, entities }) {
  const H = 200;
  return (
    <div className="bar-chart">
      <div className="bar-scale">
        {[5, 4, 3, 2, 1].map((n) => (
          <div key={n} className="bar-gridline" style={{ bottom: `${(n / 5) * 100}%` }}>
            <span>{n}</span>
          </div>
        ))}
      </div>
      <div className="bar-groups">
        {groups.map((g) => (
          <div key={g.label} className="bar-group">
            <div className="bar-cols" style={{ height: H }}>
              {g.values.map((v) => (
                <div key={v.id} className="bar-col-wrap" title={`${v.name}: ${v.value.toFixed(1)}`}>
                  <span className="bar-col-val">{v.value.toFixed(1)}</span>
                  <div className="bar-col" style={{ height: `${(v.value / 5) * H}px`, background: v.color }} />
                </div>
              ))}
            </div>
            <div className="bar-group-label">{g.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Detalle por entidad: pilares + 12 esferas vs. promedio del conjunto ──────
function EntityDetail({ entities, setSphereAvg }) {
  const [focusId, setFocusId] = useStateSA(entities[0]?.id);
  useEffectSA(() => {
    if (!entities.find((e) => e.id === focusId)) setFocusId(entities[0]?.id);
  }, [entities, focusId]);

  const e = entities.find((x) => x.id === focusId) || entities[0];
  if (!e) return null;

  return (
    <section className="panel">
      <div className="panel-head" style={{ marginBottom: 18 }}>
        <p className="eyebrow" style={{ color: 'var(--p-proposito)' }}>Detalle por entidad · pilares y esferas</p>
        <span className="eyebrow-mono">línea gris = promedio del conjunto</span>
      </div>

      {/* Selector de entidad */}
      <div className="detail-tabs">
        {entities.map((ent) => (
          <button key={ent.id} className={ent.id === e.id ? 'active' : ''} onClick={() => setFocusId(ent.id)}>
            <i style={{ background: ent.color }} />
            {ent.name}
            <b>{ent.global.toFixed(1)}</b>
          </button>
        ))}
      </div>

      {/* Cuatro pilares, cada uno con sus 3 esferas */}
      <div className="detail-grid">
        {PILLARS.map((p) => {
          const c = PILLAR_COLORS[p.id];
          const pv = e.pillarAvg[p.id];
          const spheres = SPHERES.filter((s) => s.pillar === p.id);
          return (
            <div key={p.id} className="card-quiet detail-pillar" style={{ borderTop: `3px solid ${c}` }}>
              <div className="detail-pillar-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <PillarGlyph pillar={p.id} size={22} />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: c }}>{p.name}</span>
                </div>
                <span className="detail-pillar-val" style={{ color: saColor(pv) }}>{pv.toFixed(1)}</span>
              </div>
              {spheres.map((s) => {
                const v = e.sphereAvg[s.id];
                const bench = setSphereAvg[s.id];
                const dv = bench != null ? v - bench : 0;
                return (
                  <div key={s.id} className="detail-sphere">
                    <div className="detail-sphere-top">
                      <span className="detail-sphere-name">{s.name}</span>
                      <span className="detail-sphere-val">
                        {v.toFixed(1)}
                        {Math.abs(dv) >= 0.05 && (
                          <em className={dv > 0 ? 'up' : 'down'}>{dv > 0 ? '+' : '−'}{Math.abs(dv).toFixed(1)}</em>
                        )}
                      </span>
                    </div>
                    <ScoreBar value={v} color={c} height={5} showBenchmark benchmark={bench} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
function SuperAdmin() {
  const [mode, setMode] = useStateSA('empresa');
  const [showSpheres, setShowSpheres] = useStateSA(true);
  const [selEmpresa, setSelEmpresa] = useStateSA(['co0', 'co2', 'co5', 'co7']);
  const [selGiro, setSelGiro] = useStateSA(GIROS.slice());

  const selectedIds = mode === 'empresa' ? selEmpresa : selGiro;
  const entities = useMemoSA(
    () => benchmarkEntities(mode, selectedIds),
    [mode, selectedIds]
  );

  const toggleEmpresa = (id) => setSelEmpresa((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const toggleGiro = (g) => setSelGiro((s) => s.includes(g) ? s.filter((x) => x !== g) : [...s, g]);

  // Métricas del conjunto
  const totalEmp = entities.reduce((a, e) => a + e.empleados, 0);
  const wsum = entities.reduce((a, e) => a + e.done, 0) || 1;
  const setAvg = entities.length ? Math.round((entities.reduce((a, e) => a + e.global * e.done, 0) / wsum) * 10) / 10 : null;
  // Promedio por esfera del conjunto (ponderado) — sirve de benchmark en el detalle
  const setSphereAvg = {};
  SPHERES.forEach((s) => {
    setSphereAvg[s.id] = entities.length
      ? Math.round((entities.reduce((a, e) => a + e.sphereAvg[s.id] * e.done, 0) / wsum) * 10) / 10
      : null;
  });
  const leader = entities.reduce((best, e) => (!best || e.global > best.global ? e : best), null);
  const globals = entities.map((e) => e.global);
  const range = globals.length ? Math.round((Math.max(...globals) - Math.min(...globals)) * 10) / 10 : 0;

  // Mejor valor por columna (para resaltar líder)
  const bestOf = (sel) => entities.length ? Math.max(...entities.map(sel)) : null;
  const bestGlobal = bestOf((e) => e.global);
  const bestPillar = {};
  PILLARS.forEach((p) => { bestPillar[p.id] = bestOf((e) => e.pillarAvg[p.id]); });
  const bestPart = bestOf((e) => e.participation);

  const groups = [
    { label: 'Global', values: entities.map((e) => ({ id: e.id, name: e.name, value: e.global, color: e.color })) },
    ...PILLARS.map((p) => ({
      label: p.name.replace('Mi ', ''),
      values: entities.map((e) => ({ id: e.id, name: e.name, value: e.pillarAvg[p.id], color: e.color })),
    })),
  ];

  const h2h = entities.length === 2 ? entities : null;

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--p-proposito)', marginBottom: 12 }}>Súper Admin · Benchmark</p>
          <h1 className="display" style={{ fontSize: 46, margin: 0, letterSpacing: '-0.028em', lineHeight: 1.05 }}>
            Comparar organizaciones
          </h1>
          <p className="subtitle" style={{ fontSize: 18, margin: '10px 0 0', maxWidth: '62ch' }}>
            Contrasta el índice Human Complex entre empresas o por giro. Ideal para posicionar a una organización frente a su industria.
          </p>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-ghost" onClick={() => exportBenchmarkCSV(entities, mode)}>
            <DownloadGlyph /> Exportar
          </button>
        </div>
      </header>

      {/* Controles */}
      <section className="panel" style={{ padding: '22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 18 }}>
          <span className="eyebrow">Comparar por</span>
          <Segment value={mode} onChange={setMode}
            options={[{ id: 'empresa', label: 'Empresa' }, { id: 'giro', label: 'Giro / industria' }]} />
          <span className="eyebrow-mono" style={{ marginLeft: 'auto' }}>
            {entities.length} {mode === 'empresa' ? 'empresas' : 'giros'} · {totalEmp.toLocaleString('es-MX')} colaboradores
          </span>
        </div>
        {mode === 'empresa'
          ? <CompanyPicker companies={COMPANIES} selected={selEmpresa} onChange={setSelEmpresa} />
          : <EntityChips
              items={GIROS.map((g) => ({ id: g, label: g, meta: COMPANIES.filter((c) => c.giro === g).length + ' empresas' }))}
              selected={selGiro} onToggle={toggleGiro}
              colorOf={(it) => ENTITY_COLORS[GIROS.indexOf(it.id) % ENTITY_COLORS.length]} />}
      </section>

      {entities.length === 0 && (
        <div className="privacy-note" style={{ borderLeftColor: 'var(--amber)' }}>
          <p style={{ fontStyle: 'italic' }}>Selecciona al menos una {mode === 'empresa' ? 'empresa' : 'industria'} para comenzar el benchmark.</p>
        </div>
      )}

      {entities.length > 0 && <>
        {/* KPIs del conjunto */}
        <section className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <Stat label={mode === 'empresa' ? 'Empresas' : 'Giros'} sub="en la comparación">{entities.length}</Stat>
          <Stat label="Colaboradores" sub="suma del conjunto">{totalEmp.toLocaleString('es-MX')}</Stat>
          <Stat label="Promedio del conjunto" sub="ponderado por participación">
            {setAvg != null ? setAvg.toFixed(1) : '—'}<span className="stat-unit"> / 5</span>
          </Stat>
          <Stat label="Líder" accent={leader ? leader.color : null} sub={leader ? leader.name : '—'}>
            {leader ? leader.global.toFixed(1) : '—'}
          </Stat>
        </section>

        {/* Tabla comparativa */}
        <section className="panel">
          <div className="panel-head">
            <p className="eyebrow" style={{ color: 'var(--p-conexion)' }}>Tabla comparativa</p>
            <span className="eyebrow-mono">líder resaltado por columna</span>
          </div>
          <div className="bench-table-wrap">
            <table className="bench-table">
              <thead>
                <tr>
                  <th className="bt-name">{mode === 'empresa' ? 'Empresa' : 'Giro'}</th>
                  <th>Global</th>
                  {PILLARS.map((p) => <th key={p.id}>{p.name.replace('Mi ', '')}</th>)}
                  <th>Particip.</th>
                  <th>Esfera + baja</th>
                  <th>Esfera + alta</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((e) => (
                  <tr key={e.id}>
                    <td className="bt-name">
                      <span className="bt-dot" style={{ background: e.color }} />
                      <div>
                        <div className="bt-co">{e.name}</div>
                        <div className="bt-sub">{e.sublabel || COMPANIES.find((c) => c.id === e.id)?.giro || ''} · {e.empleados.toLocaleString('es-MX')}</div>
                      </div>
                    </td>
                    <td className={e.global === bestGlobal ? 'bt-num bt-best' : 'bt-num'} style={{ color: saColor(e.global) }}>
                      {e.global.toFixed(1)}
                    </td>
                    {PILLARS.map((p) => {
                      const v = e.pillarAvg[p.id];
                      return <td key={p.id} className={v === bestPillar[p.id] ? 'bt-num bt-best' : 'bt-num'}>{v.toFixed(1)}</td>;
                    })}
                    <td className={e.participation === bestPart ? 'bt-num bt-best' : 'bt-num'}>{e.participation}%</td>
                    <td className="bt-sphere"><span style={{ color: saColor(e.lowest.value) }}>{e.lowest.value.toFixed(1)}</span> {SA_SPHERE_BY_ID[e.lowest.id].name}</td>
                    <td className="bt-sphere"><span style={{ color: saColor(e.highest.value) }}>{e.highest.value.toFixed(1)}</span> {SA_SPHERE_BY_ID[e.highest.id].name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Gráfica agrupada */}
        <section className="panel">
          <div className="panel-head">
            <p className="eyebrow" style={{ color: 'var(--p-base)' }}>Índice global y por pilar</p>
            <div className="bench-legend">
              {entities.map((e) => (
                <span key={e.id}><i style={{ background: e.color }} />{e.name}</span>
              ))}
            </div>
          </div>
          <GroupedBars groups={groups} entities={entities} />
        </section>

        {/* Detalle por entidad */}
        <EntityDetail entities={entities} setSphereAvg={setSphereAvg} />

        {/* Cara a cara (solo 2 entidades) */}
        {h2h && (
          <section className="panel">
            <div className="panel-head">
              <p className="eyebrow" style={{ color: 'var(--p-impacto)' }}>Cara a cara · {h2h[0].name} vs. {h2h[1].name}</p>
              <div className="segment">
                <button className={showSpheres ? '' : 'active'} onClick={() => setShowSpheres(false)}>Pilares</button>
                <button className={showSpheres ? 'active' : ''} onClick={() => setShowSpheres(true)}>Con esferas</button>
              </div>
            </div>
            <div className="h2h">
              {(() => {
                const rows = [{ id: 'global', name: 'Índice global', a: h2h[0].global, b: h2h[1].global, kind: 'global' }];
                PILLARS.forEach((p) => {
                  rows.push({ id: p.id, name: p.name, a: h2h[0].pillarAvg[p.id], b: h2h[1].pillarAvg[p.id], kind: 'pillar', color: PILLAR_COLORS[p.id] });
                  if (showSpheres) {
                    SPHERES.filter((s) => s.pillar === p.id).forEach((s) => {
                      rows.push({ id: s.id, name: s.name, a: h2h[0].sphereAvg[s.id], b: h2h[1].sphereAvg[s.id], kind: 'sphere', color: PILLAR_COLORS[p.id] });
                    });
                  }
                });
                return rows.map((row) => {
                  const aWins = row.a > row.b, bWins = row.b > row.a;
                  const d = Math.abs(row.a - row.b).toFixed(1);
                  return (
                    <div key={row.id} className="h2h-row" data-kind={row.kind}>
                      <span className={aWins ? 'h2h-val h2h-win' : 'h2h-val'} style={aWins ? { color: h2h[0].color } : null}>{row.a.toFixed(1)}</span>
                      <div className="h2h-bars">
                        <div className="h2h-bar-l"><div style={{ width: `${(row.a / 5) * 100}%`, background: h2h[0].color }} /></div>
                        <span className="h2h-label">
                          {row.kind === 'pillar' && <i className="h2h-dot" style={{ background: row.color }} />}
                          {row.name}{d !== '0.0' && <em> · Δ {d}</em>}
                        </span>
                        <div className="h2h-bar-r"><div style={{ width: `${(row.b / 5) * 100}%`, background: h2h[1].color }} /></div>
                      </div>
                      <span className={bWins ? 'h2h-val h2h-win' : 'h2h-val'} style={bWins ? { color: h2h[1].color } : null}>{row.b.toFixed(1)}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </section>
        )}

        <div className="privacy-note">
          <LockGlyph />
          <p>Benchmark entre organizaciones sobre promedios agregados. No se accede a datos individuales de ninguna empresa ni colaborador.</p>
        </div>
      </>}
    </div>
  );
}

function exportBenchmarkCSV(entities, mode) {
  const rows = [];
  rows.push(['Human Complex — Benchmark ' + (mode === 'empresa' ? 'por empresa' : 'por giro')]);
  rows.push(['Exportado', new Date().toLocaleString('es-MX')]);
  rows.push([]);
  const head = [mode === 'empresa' ? 'Empresa' : 'Giro', 'Colaboradores', 'Participación %', 'Global'];
  PILLARS.forEach((p) => head.push(p.name));
  head.push('Esfera más baja', 'Esfera más alta');
  rows.push(head);
  entities.forEach((e) => {
    const r = [e.name, e.empleados, e.participation, e.global];
    PILLARS.forEach((p) => r.push(e.pillarAvg[p.id]));
    r.push(`${SA_SPHERE_BY_ID[e.lowest.id].name} (${e.lowest.value})`, `${SA_SPHERE_BY_ID[e.highest.id].name} (${e.highest.value})`);
    rows.push(r);
  });
  // Detalle por esfera (una fila por entidad × esfera)
  rows.push([]);
  rows.push(['Detalle por esfera']);
  rows.push([mode === 'empresa' ? 'Empresa' : 'Giro', 'Pilar', 'Esfera', 'Promedio /5']);
  entities.forEach((e) => {
    SPHERES.forEach((s) => {
      rows.push([e.name, PILLARS.find((p) => p.id === s.pillar).name, s.name, e.sphereAvg[s.id]]);
    });
  });
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `HumanComplex_Benchmark_${mode}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

Object.assign(window, { SuperAdmin });
