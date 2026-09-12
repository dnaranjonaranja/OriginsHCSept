// admin-dashboard.jsx — Panel Organizacional (vista admin)
// Todo se recalcula en vivo según los filtros. Solo promedios agregados.

const { useState: useStateD, useMemo: useMemoD } = React;

const SPHERE_BY_ID = Object.fromEntries(SPHERES.map((s) => [s.id, s]));
const PILLAR_BY_ID = Object.fromEntries(PILLARS.map((p) => [p.id, p]));

// ── Benchmark de mercado (usa la base de empresas del súper admin) ───────────
// La organización de este panel es Nébula Systems (sector Tecnología).
function selfCompany() { return COMPANIES.find((c) => c.name === 'Nébula Systems') || COMPANIES[0]; }
function sizeTierOf(n) { return n < 1000 ? 'Pequeñas · <1,000' : n <= 2500 ? 'Medianas · 1k–2.5k' : 'Grandes · >2.5k'; }

function marketBenchmarks(sectorGiro) {
  const self = selfCompany();
  const tier = sizeTierOf(self.empleados);
  const sectorList = COMPANIES.filter((c) => c.giro === sectorGiro);
  const sizeList = COMPANIES.filter((c) => sizeTierOf(c.empleados) === tier);
  return {
    self, tier,
    sector: aggregateEntities(sectorList, { id: 'ref-sector', name: sectorGiro, color: 'var(--p-proposito)' }),
    size: aggregateEntities(sizeList, { id: 'ref-size', name: tier, color: 'var(--p-conexion)' }),
    all: aggregateEntities(COMPANIES, { id: 'ref-all', name: 'Todas las empresas', color: 'var(--p-impacto)' }),
    sectorCount: sectorList.length, sizeCount: sizeList.length, allCount: COMPANIES.length,
  };
}

// Color por valor 1–5 (semáforo suave alineado a la marca)
function scoreColor(v) {
  if (v == null) return 'var(--ink-4)';
  if (v < 2) return 'var(--lvl-desequilibrio)';
  if (v < 3) return 'var(--lvl-atencion)';
  if (v < 4) return 'var(--lvl-enCamino)';
  return 'var(--lvl-fortaleza)';
}

function Delta({ value, decimals = 1, suffix = '' }) {
  if (value == null || Math.abs(value) < 0.05) {
    return <span className="delta delta-flat">→ sin cambio</span>;
  }
  const up = value > 0;
  return (
    <span className={up ? 'delta delta-up' : 'delta delta-down'}>
      {up ? '↑' : '↓'} {Math.abs(value).toFixed(decimals)}{suffix} vs. campaña anterior
    </span>
  );
}

// ── Tarjeta KPI ──────────────────────────────────────────────────────────────
function Stat({ label, children, sub, accent }) {
  return (
    <div className="stat-card">
      <p className="eyebrow" style={{ marginBottom: 14 }}>{label}</p>
      <div className="stat-value" style={accent ? { color: accent } : null}>{children}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

// ── Anillo de progreso del periodo ──────────────────────────────────────────
function PeriodRing({ elapsed, total, size = 46 }) {
  const frac = clampNum(elapsed / total, 0, 1);
  const sw = 5, r = (size - sw) / 2, c = 2 * Math.PI * r, dash = c * frac;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={sw} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--amber)" strokeWidth={sw}
        strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={c * 0.25}
        strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
    </svg>
  );
}
const clampNum = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ── Barra de puntaje 0–5 ─────────────────────────────────────────────────────
function ScoreBar({ value, color, height = 6, showBenchmark, benchmark }) {
  return (
    <div style={{ position: 'relative', height, borderRadius: height, background: 'var(--line-soft)', overflow: 'hidden' }}>
      <div style={{ width: value != null ? `${(value / 5) * 100}%` : 0, height: '100%', background: color, borderRadius: height, transition: 'width 500ms cubic-bezier(0.2,0.6,0.2,1)' }} />
      {showBenchmark && benchmark != null && (
        <div style={{ position: 'absolute', top: -2, bottom: -2, left: `${(benchmark / 5) * 100}%`, width: 1.5, background: 'var(--ink-3)', opacity: 0.5 }} />
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
function AdminDashboard() {
  const [filters, setFilters] = useStateD({ nivel: [], area: [], estado: [], ciudad: [], genero: [] });
  const [reminded, setReminded] = useStateD({}); // id → true
  const [nudgedAll, setNudgedAll] = useStateD(false);

  const users = useMemoD(() => filterUsers(filters), [filters]);
  const agg = useMemoD(() => aggregate(users), [users]);
  const byArea = useMemoD(() => participationBy(users, 'area'), [users]);

  // Benchmark de mercado
  const [benchSector, setBenchSector] = useStateD(selfCompany().giro);
  const [activeRef, setActiveRef] = useStateD('sector');
  const bench = useMemoD(() => marketBenchmarks(benchSector), [benchSector]);
  const refMap = { sector: bench.sector, size: bench.size, all: bench.all };
  const activeReference = refMap[activeRef];
  const filterActive = filters.nivel.length || filters.area.length || filters.estado.length || filters.ciudad.length || filters.genero.length;
  const subjectLabel = filterActive ? 'Tu selección' : 'Tu organización';

  const daysLeft = CAMPAIGN.periodDays - CAMPAIGN.elapsedDays;
  const globalDelta = agg.global != null ? agg.global - CAMPAIGN.prevGlobal : null;

  // Estados de pilar para el radar
  const pillarStates = {};
  PILLARS.forEach((p) => { pillarStates[p.id] = { level: scoreToLevelKey(agg.pillarAvg[p.id] ?? 3) }; });

  // Esferas ordenadas de menor a mayor
  const sphereRanked = [...SPHERES]
    .map((s) => ({ ...s, value: agg.sphereAvg[s.id] }))
    .filter((s) => s.value != null)
    .sort((a, b) => a.value - b.value);

  // Pendientes de responder (para recordatorios)
  const pending = [...agg.inProgressUsers, ...agg.notStartedUsers];

  const scope = describeScope(filters);

  return (
    <div className="admin">
      {/* ── Encabezado ─────────────────────────────────────────────── */}
      <header className="admin-head">
        <div>
          <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: 12 }}>Panel Organizacional</p>
          <h1 className="display" style={{ fontSize: 46, margin: 0, letterSpacing: '-0.028em', lineHeight: 1.05 }}>
            {CAMPAIGN.name}
          </h1>
          <p className="subtitle" style={{ fontSize: 18, margin: '10px 0 0', maxWidth: '60ch' }}>
            {scope}. Todos los datos son agregados — el resultado individual de cada colaborador es siempre privado.
          </p>
        </div>
        <div className="admin-head-actions">
          <button className="btn btn-ghost" onClick={() => exportCSV(agg, users, filters, bench, subjectLabel)}>
            <DownloadGlyph /> Exportar
          </button>
          <button className="btn btn-primary">+ Nueva campaña</button>
        </div>
      </header>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* ── KPIs ───────────────────────────────────────────────────── */}
      <section className="kpi-grid">
        <Stat label="Usuarios midiendo" sub={`en ${filters.estado.length || filters.area.length || filters.nivel.length ? 'el segmento' : 'toda la organización'}`}>
          {agg.invited.toLocaleString('es-MX')}
        </Stat>

        <Stat label="Completados"
          sub={<span className="delta delta-up">{agg.participation}% de participación</span>}>
          {agg.nDone.toLocaleString('es-MX')}
        </Stat>

        <div className="stat-card">
          <p className="eyebrow" style={{ marginBottom: 14 }}>Periodo · {CAMPAIGN.periodDays} días</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <PeriodRing elapsed={CAMPAIGN.elapsedDays} total={CAMPAIGN.periodDays} />
            <div>
              <div className="stat-value" style={{ fontSize: 40 }}>{daysLeft}</div>
              <div className="stat-sub">días restantes</div>
            </div>
          </div>
          <div className="stat-sub" style={{ marginTop: 12 }}>Cierra el {CAMPAIGN.endDate}</div>
        </div>

        <Stat label="Promedio global"
          sub={<Delta value={globalDelta} />}>
          {agg.global != null ? agg.global.toFixed(1) : '—'}
          <span className="stat-unit"> / 5</span>
        </Stat>

        <Stat label="Esfera más baja"
          accent={agg.lowest ? scoreColor(agg.lowest.value) : null}
          sub={agg.lowest ? SPHERE_BY_ID[agg.lowest.id].name : '—'}>
          {agg.lowest ? agg.lowest.value.toFixed(1) : '—'}
        </Stat>

        <Stat label="Esfera más alta"
          accent={agg.highest ? scoreColor(agg.highest.value) : null}
          sub={agg.highest ? SPHERE_BY_ID[agg.highest.id].name : '—'}>
          {agg.highest ? agg.highest.value.toFixed(1) : '—'}
        </Stat>
      </section>

      {/* ── Pilares + radar ────────────────────────────────────────── */}
      <section className="panel">
        <div className="panel-head">
          <p className="eyebrow" style={{ color: 'var(--p-proposito)' }}>Promedio por pilar</p>
          <span className="eyebrow-mono">Benchmark HC · {CAMPAIGN.benchmarkGlobal.toFixed(1)}</span>
        </div>
        <div className="pillar-layout">
          <div className="pillar-cards">
            {PILLARS.map((p) => {
              const v = agg.pillarAvg[p.id];
              const c = PILLAR_COLORS[p.id];
              return (
                <div key={p.id} className="card-quiet pillar-card" style={{ borderTop: `3px solid ${c}` }}>
                  <div className="pillar-card-head">
                    <PillarGlyph pillar={p.id} size={26} />
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: c }}>{p.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, margin: '4px 0 12px' }}>
                    <span className="display" style={{ fontSize: 42, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'lining-nums tabular-nums' }}>
                      {v != null ? v.toFixed(1) : '—'}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--ink-4)', fontFamily: 'var(--font-display)' }}>/ 5</span>
                  </div>
                  <ScoreBar value={v} color={c} showBenchmark benchmark={CAMPAIGN.benchmarkGlobal} />
                  <p className="pillar-card-desc">{p.descriptor}</p>
                </div>
              );
            })}
          </div>
          <div className="pillar-radar">
            <PillarField states={pillarStates} size={340} />
          </div>
        </div>
      </section>

      {/* ── Comparativa con el mercado (benchmark) ─────────────────── */}
      <section className="panel">
        <div className="panel-head" style={{ alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: 8 }}>Comparativa con el mercado</p>
            <p className="subtitle" style={{ fontSize: 15, margin: 0, maxWidth: '58ch' }}>
              Cómo se posiciona <strong style={{ color: 'var(--ink)' }}>{subjectLabel}</strong> (global {agg.global != null ? agg.global.toFixed(1) : '—'}) frente al promedio de otras empresas de la plataforma. Solo se comparan promedios agregados.
            </p>
          </div>
          <div className="bench-sector">
            <label>Sector de referencia</label>
            <div className="bench-select-wrap">
              <select value={benchSector} onChange={(e) => setBenchSector(e.target.value)}>
                {GIROS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>

        {/* Tres referencias — clic para comparar pilar a pilar */}
        <div className="bench-refs">
          {[
            { key: 'sector', ref: bench.sector, label: 'Tu sector', meta: `${bench.sectorCount} empresas · ${benchSector}` },
            { key: 'size', ref: bench.size, label: 'Tamaño similar', meta: `${bench.sizeCount} empresas · ${bench.tier}` },
            { key: 'all', ref: bench.all, label: 'Promedio global', meta: `${bench.allCount} empresas · toda la plataforma` },
          ].map(({ key, ref, label, meta }) => {
            const d = agg.global != null ? Math.round((agg.global - ref.global) * 10) / 10 : null;
            const above = d != null && d > 0.05;
            const below = d != null && d < -0.05;
            return (
              <button key={key} className="bench-ref" data-active={activeRef === key ? '' : undefined}
                onClick={() => setActiveRef(key)}>
                <p className="bench-ref-label">{label}</p>
                <div className="bench-ref-value">
                  {ref.global.toFixed(1)}<span className="bench-ref-unit"> / 5</span>
                </div>
                <div className={above ? 'bench-ref-delta up' : below ? 'bench-ref-delta down' : 'bench-ref-delta flat'}>
                  {d == null || (!above && !below) ? '→ a la par' : `${above ? '↑' : '↓'} ${Math.abs(d).toFixed(1)} ${above ? 'por encima' : 'por debajo'}`}
                </div>
                <p className="bench-ref-meta">{meta}</p>
              </button>
            );
          })}
        </div>

        {/* Cara a cara por pilar: Tu organización vs. referencia activa */}
        <div className="ftf">
          <div className="ftf-legend">
            <span><i className="dot" style={{ background: 'var(--amber)' }} /> {subjectLabel}</span>
            <span><i className="dot" style={{ background: 'var(--ink-3)' }} /> {activeReference.name}</span>
          </div>
          {PILLARS.map((p) => {
            const subj = agg.pillarAvg[p.id];
            const rv = activeReference.pillarAvg[p.id];
            const d = subj != null && rv != null ? Math.round((subj - rv) * 10) / 10 : null;
            return (
              <div key={p.id} className="ftf-row">
                <div className="ftf-side left">
                  <span className="ftf-val">{subj != null ? subj.toFixed(1) : '—'}</span>
                  <div className="ftf-track"><div className="ftf-bar" style={{ width: subj != null ? `${(subj / 5) * 100}%` : 0, background: PILLAR_COLORS[p.id], marginLeft: 'auto' }} /></div>
                </div>
                <div className="ftf-mid">
                  <PillarGlyph pillar={p.id} size={18} />
                  <span className="ftf-name">{p.name}</span>
                  {d != null && (
                    <span className={d > 0.05 ? 'ftf-delta up' : d < -0.05 ? 'ftf-delta down' : 'ftf-delta flat'}>
                      {d > 0.05 ? '+' : ''}{Math.abs(d) < 0.05 ? '±0.0' : d.toFixed(1)}
                    </span>
                  )}
                </div>
                <div className="ftf-side right">
                  <div className="ftf-track"><div className="ftf-bar" style={{ width: rv != null ? `${(rv / 5) * 100}%` : 0, background: 'var(--ink-3)' }} /></div>
                  <span className="ftf-val">{rv != null ? rv.toFixed(1) : '—'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Esferas ranking + distribución ─────────────────────────── */}
      <div className="two-col">
        <section className="panel">
          <div className="panel-head">
            <p className="eyebrow" style={{ color: 'var(--p-conexion)' }}>Promedio por esfera · 12 dimensiones</p>
            <span className="eyebrow-mono">de menor a mayor</span>
          </div>
          <div className="sphere-rank">
            {sphereRanked.map((s, i) => {
              const c = PILLAR_COLORS[s.pillar];
              const isLow = agg.lowest && s.id === agg.lowest.id;
              const isHigh = agg.highest && s.id === agg.highest.id;
              return (
                <div key={s.id} className="sphere-rank-row">
                  <span className="sphere-rank-num">{String(i + 1).padStart(2, '0')}</span>
                  <PillarGlyph pillar={s.pillar} size={18} />
                  <div style={{ minWidth: 0 }}>
                    <div className="sphere-rank-name">
                      {s.name}
                      {isLow && <span className="tag tag-low">más baja</span>}
                      {isHigh && <span className="tag tag-high">más alta</span>}
                    </div>
                    <ScoreBar value={s.value} color={c} height={5} />
                  </div>
                  <span className="sphere-rank-val" style={{ color: scoreColor(s.value) }}>{s.value.toFixed(1)}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Distribución de niveles */}
          <section className="panel">
            <div className="panel-head">
              <p className="eyebrow" style={{ color: 'var(--p-impacto)' }}>Distribución del grupo</p>
            </div>
            <DistributionBar dist={agg.dist} total={agg.nDone} />
          </section>

          {/* Participación por área */}
          <section className="panel" style={{ flex: 1 }}>
            <div className="panel-head">
              <p className="eyebrow" style={{ color: 'var(--p-base)' }}>Participación por área</p>
            </div>
            <div className="part-list">
              {byArea.map((g) => (
                <div key={g.key} className="part-row">
                  <span className="part-label">{g.key}</span>
                  <div style={{ flex: 1 }}>
                    <ScoreBar value={(g.rate / 100) * 5} color="var(--p-base)" height={7} />
                  </div>
                  <span className="part-rate">{g.rate}%</span>
                  <span className="part-count">{g.done}/{g.invited}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── Recordatorios ──────────────────────────────────────────── */}
      <section className="panel">
        <div className="panel-head" style={{ alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: 8 }}>Seguimiento de participación</p>
            <p className="subtitle" style={{ fontSize: 15, margin: 0 }}>
              {pending.length} colaborador{pending.length === 1 ? '' : 'es'} sin completar. Envía un recordatorio sin ver ningún resultado individual.
            </p>
          </div>
          <button className="btn btn-primary" disabled={nudgedAll || pending.length === 0}
            onClick={() => setNudgedAll(true)}>
            {nudgedAll ? '✓ Recordatorios enviados' : `Recordar a todos (${pending.length})`}
          </button>
        </div>

        <div className="reminder-legend">
          <span><i className="dot" style={{ background: 'var(--lvl-atencion)' }} /> En progreso · {agg.inProgress}</span>
          <span><i className="dot" style={{ background: 'var(--ink-4)' }} /> No iniciado · {agg.notStarted}</span>
          <span><i className="dot" style={{ background: 'var(--lvl-enCamino)' }} /> Completado · {agg.nDone}</span>
        </div>

        <div className="reminder-table">
          <div className="reminder-th">
            <span>Colaborador</span>
            <span>Área</span>
            <span>Nivel</span>
            <span>Ubicación</span>
            <span>Estado</span>
            <span></span>
          </div>
          {pending.slice(0, 12).map((u) => {
            const done = reminded[u.id] || nudgedAll;
            return (
              <div key={u.id} className="reminder-tr">
                <span className="reminder-name">{u.name}</span>
                <span className="reminder-dim">{u.area}</span>
                <span className="reminder-dim">{u.nivel}</span>
                <span className="reminder-dim">{u.ciudad}, {u.estado}</span>
                <span>
                  <span className="status-pill" data-status={u.status}>
                    {u.status === 'progreso' ? 'En progreso' : 'No iniciado'}
                  </span>
                </span>
                <span style={{ textAlign: 'right' }}>
                  <button className="btn-remind" disabled={done}
                    onClick={() => setReminded((r) => ({ ...r, [u.id]: true }))}>
                    {done ? '✓ Enviado' : 'Recordar'}
                  </button>
                </span>
              </div>
            );
          })}
          {pending.length > 12 && (
            <div className="reminder-more">+ {pending.length - 12} colaboradores más pendientes</div>
          )}
        </div>
      </section>

      {/* Nota de privacidad */}
      <div className="privacy-note">
        <LockGlyph />
        <p>
          Esta vista solo muestra promedios agregados y estados de participación.
          En ningún caso se expone el resultado individual de ningún colaborador.
        </p>
      </div>
    </div>
  );
}

// ── Barra de distribución apilada ────────────────────────────────────────────
function DistributionBar({ dist, total }) {
  const order = [
    { key: 'desequilibrio', name: 'Desequilibrio', color: 'var(--lvl-desequilibrio)' },
    { key: 'atencion', name: 'Atención', color: 'var(--lvl-atencion)' },
    { key: 'enCamino', name: 'En camino', color: 'var(--lvl-enCamino)' },
    { key: 'fortaleza', name: 'Fortaleza', color: 'var(--lvl-fortaleza)' },
  ];
  return (
    <div>
      <div className="dist-bar">
        {order.map((o) => {
          const n = dist[o.key] || 0;
          const pct = total ? (n / total) * 100 : 0;
          if (pct === 0) return null;
          return <div key={o.key} className="dist-seg" style={{ width: `${pct}%`, background: o.color }} title={`${o.name}: ${n}`} />;
        })}
      </div>
      <div className="dist-legend">
        {order.map((o) => {
          const n = dist[o.key] || 0;
          const pct = total ? Math.round((n / total) * 100) : 0;
          return (
            <div key={o.key} className="dist-item">
              <i className="dot" style={{ background: o.color }} />
              <span className="dist-name">{o.name}</span>
              <span className="dist-pct">{pct}%</span>
              <span className="dist-n">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Utilidades ───────────────────────────────────────────────────────────────
function describeScope(filters) {
  const parts = [];
  if (filters.nivel.length) parts.push(filters.nivel.join(', '));
  if (filters.area.length) parts.push(filters.area.join(', '));
  if (filters.ciudad.length) parts.push(filters.ciudad.join(', '));
  else if (filters.estado.length) parts.push(filters.estado.join(', '));
  if (filters.genero.length) parts.push(filters.genero.join(', '));
  if (!parts.length) return 'Resultados agregados de toda la organización';
  return 'Segmento: ' + parts.join(' · ');
}

function exportCSV(agg, users, filters, bench, subjectLabel) {
  const rows = [];
  rows.push(['Human Complex — Diagnóstico ' + CAMPAIGN.name]);
  rows.push(['Exportado', new Date().toLocaleString('es-MX')]);
  rows.push(['Filtros', describeScope(filters)]);
  rows.push([]);
  rows.push(['Métrica', 'Valor']);
  rows.push(['Usuarios midiendo', agg.invited]);
  rows.push(['Completados', agg.nDone]);
  rows.push(['Participación %', agg.participation]);
  rows.push(['Promedio global', agg.global ?? '']);
  rows.push([]);
  rows.push(['Pilar', 'Promedio /5']);
  PILLARS.forEach((p) => rows.push([p.name, agg.pillarAvg[p.id] ?? '']));
  rows.push([]);
  rows.push(['Esfera', 'Pilar', 'Promedio /5']);
  SPHERES.forEach((s) => rows.push([s.name, PILLAR_BY_ID[s.pillar].name, agg.sphereAvg[s.id] ?? '']));
  rows.push([]);
  rows.push(['Distribución', 'Colaboradores']);
  rows.push(['Desequilibrio', agg.dist.desequilibrio]);
  rows.push(['Atención', agg.dist.atencion]);
  rows.push(['En camino', agg.dist.enCamino]);
  rows.push(['Fortaleza', agg.dist.fortaleza]);

  if (bench) {
    rows.push([]);
    rows.push(['COMPARATIVA CON EL MERCADO']);
    rows.push(['Referencia', 'Empresas', 'Global /5', 'vs. ' + subjectLabel]);
    const line = (label, ref, n) => rows.push([label, n, ref.global, agg.global != null ? Math.round((agg.global - ref.global) * 10) / 10 : '']);
    rows.push([subjectLabel, '—', agg.global ?? '', '—']);
    line('Tu sector · ' + bench.sector.name, bench.sector, bench.sectorCount);
    line('Tamaño similar · ' + bench.tier, bench.size, bench.sizeCount);
    line('Promedio global', bench.all, bench.allCount);
    rows.push([]);
    rows.push(['Comparativa por pilar', subjectLabel, 'Tu sector', 'Tamaño similar', 'Global']);
    PILLARS.forEach((p) => rows.push([
      p.name, agg.pillarAvg[p.id] ?? '',
      bench.sector.pillarAvg[p.id], bench.size.pillarAvg[p.id], bench.all.pillarAvg[p.id],
    ]));
  }

  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `HumanComplex_${CAMPAIGN.name.replace(/\s+/g, '_')}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Glifos ───────────────────────────────────────────────────────────────────
function DownloadGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2 V10 M4.5 6.5 L8 10 L11.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12.5 H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function LockGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <rect x="4" y="8" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 8 V6 A3 3 0 0 1 12 6 V8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

Object.assign(window, { AdminDashboard });
