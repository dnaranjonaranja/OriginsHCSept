// superadmin-data.jsx — Datos del nivel Súper Admin (benchmark entre empresas)
// Cada empresa tiene agregados por pilar y esfera. Se pueden comparar empresas
// individuales o agrupar por giro. Nada aquí expone datos individuales.

const GIROS = ['Tecnología', 'Servicios Financieros', 'Salud', 'Manufactura', 'Retail', 'Alimentos y Bebidas'];

const GIRO_BIAS = {
  'Tecnología': 0.30,
  'Servicios Financieros': 0.15,
  'Salud': 0.20,
  'Manufactura': -0.15,
  'Retail': -0.28,
  'Alimentos y Bebidas': -0.04,
};

// Paleta para distinguir empresas en las gráficas (tonos de la marca)
const ENTITY_COLORS = ['#dc8763', '#7f8fb3', '#95b095', '#c19bc7', '#c9a15a', '#7ba3a0', '#b3798f', '#8f8fae', '#cd8a6d', '#6f97b8'];

// Reutiliza el sesgo por esfera del panel de empresa
const CO_SPHERE_BIAS = {
  autoconocimiento: 0.25, regulacion: 0.05, bienestar: -0.55,
  claridad: 0.20, motivacion: 0.00, decision: -0.10,
  comunicacion: 0.05, empatia: 0.30, colaboracion: 0.10,
  ejecucion: -0.35, adaptabilidad: -0.15, influencia: 0.12,
};

const COMPANY_DEFS = [
  { name: 'Nébula Systems',      giro: 'Tecnología',            empleados: 1248, region: 'CDMX',        off: 0.18 },
  { name: 'Cúspide Digital',     giro: 'Tecnología',            empleados: 640,  region: 'Jalisco',     off: -0.05 },
  { name: 'Capital Ándive',      giro: 'Servicios Financieros', empleados: 2100, region: 'Nuevo León',  off: 0.10 },
  { name: 'Fianza MX',           giro: 'Servicios Financieros', empleados: 880,  region: 'CDMX',        off: -0.08 },
  { name: 'Clínica Vitalis',     giro: 'Salud',                 empleados: 1560, region: 'Querétaro',   off: 0.12 },
  { name: 'Aurora Manufactura',  giro: 'Manufactura',           empleados: 3200, region: 'Puebla',      off: 0.06 },
  { name: 'Grupo Ferro',         giro: 'Manufactura',           empleados: 2740, region: 'Nuevo León',  off: -0.10 },
  { name: 'Mercantil Norte',     giro: 'Retail',                empleados: 4100, region: 'CDMX',        off: 0.08 },
  { name: 'Tiendas Solstice',    giro: 'Retail',                empleados: 1980, region: 'Jalisco',     off: -0.06 },
  { name: 'Cosecha Viva',        giro: 'Alimentos y Bebidas',   empleados: 1420, region: 'Yucatán',     off: 0.05 },
];

function saCoScoreToLevel(score) {
  if (score < 2) return 'desequilibrio';
  if (score < 3) return 'atencion';
  if (score < 4) return 'enCamino';
  return 'fortaleza';
}

// Genera cada empresa determinísticamente
const COMPANIES = (() => {
  const rng = mulberry32(770011);
  return COMPANY_DEFS.map((def, idx) => {
    const base = 3.05 + (GIRO_BIAS[def.giro] || 0) + def.off;

    const sphereAvg = {};
    for (const s of SPHERES) {
      const v = base + (CO_SPHERE_BIAS[s.id] || 0) + (rng() - 0.5) * 0.5;
      sphereAvg[s.id] = Math.round(Math.max(1, Math.min(5, v)) * 10) / 10;
    }
    const pillarAvg = {};
    for (const p of PILLARS) {
      const ids = SPHERES.filter((s) => s.pillar === p.id).map((s) => s.id);
      pillarAvg[p.id] = Math.round((ids.reduce((a, id) => a + sphereAvg[id], 0) / ids.length) * 10) / 10;
    }
    const allS = SPHERES.map((s) => sphereAvg[s.id]);
    const global = Math.round((allS.reduce((a, b) => a + b, 0) / allS.length) * 10) / 10;

    let lowest = null, highest = null;
    for (const s of SPHERES) {
      const v = sphereAvg[s.id];
      if (!lowest || v < lowest.value) lowest = { id: s.id, value: v };
      if (!highest || v > highest.value) highest = { id: s.id, value: v };
    }

    const participation = Math.round((58 + rng() * 26) * 10) / 10; // 58–84%
    const done = Math.round(def.empleados * participation / 100);

    return {
      id: 'co' + idx,
      name: def.name,
      giro: def.giro,
      region: def.region,
      color: ENTITY_COLORS[idx % ENTITY_COLORS.length],
      empleados: def.empleados,
      invited: def.empleados,
      done,
      participation,
      global,
      prevGlobal: Math.round((global - (0.05 + rng() * 0.25)) * 10) / 10,
      pillarAvg, sphereAvg, lowest, highest,
    };
  });
})();

// Agrega una lista de empresas en una sola entidad (ponderado por completados)
function aggregateEntities(list, meta) {
  const wsum = list.reduce((a, c) => a + c.done, 0) || 1;
  const wavg = (sel) => Math.round((list.reduce((a, c) => a + sel(c) * c.done, 0) / wsum) * 10) / 10;

  const sphereAvg = {};
  for (const s of SPHERES) sphereAvg[s.id] = wavg((c) => c.sphereAvg[s.id]);
  const pillarAvg = {};
  for (const p of PILLARS) pillarAvg[p.id] = wavg((c) => c.pillarAvg[p.id]);
  const global = wavg((c) => c.global);

  let lowest = null, highest = null;
  for (const s of SPHERES) {
    const v = sphereAvg[s.id];
    if (!lowest || v < lowest.value) lowest = { id: s.id, value: v };
    if (!highest || v > highest.value) highest = { id: s.id, value: v };
  }
  const empleados = list.reduce((a, c) => a + c.empleados, 0);
  const done = list.reduce((a, c) => a + c.done, 0);

  return {
    id: meta.id, name: meta.name, color: meta.color, sublabel: meta.sublabel,
    empleados, invited: empleados, done,
    participation: Math.round((done / empleados) * 1000) / 10,
    global, pillarAvg, sphereAvg, lowest, highest,
    count: list.length,
  };
}

// Devuelve las entidades a comparar según el modo
// mode: 'empresa' → cada empresa seleccionada
//       'giro'    → una entidad por giro seleccionado (agregada)
function benchmarkEntities(mode, selectedIds) {
  if (mode === 'empresa') {
    return COMPANIES.filter((c) => selectedIds.includes(c.id));
  }
  // giro
  return selectedIds.map((giro, i) => {
    const list = COMPANIES.filter((c) => c.giro === giro);
    return aggregateEntities(list, {
      id: 'g_' + giro, name: giro, sublabel: `${list.length} empresas`,
      color: ENTITY_COLORS[GIROS.indexOf(giro) % ENTITY_COLORS.length],
    });
  });
}

Object.assign(window, {
  GIROS, COMPANIES, ENTITY_COLORS,
  benchmarkEntities, aggregateEntities, saCoScoreToLevel,
});
