// admin-data.jsx — Modelo de datos del Panel Organizacional (admin)
// Genera una población sintética determinista y expone funciones de agregación
// que recalculan promedios en vivo según los filtros aplicados.
// PRIVACIDAD: los promedios se calculan sobre el grupo; nunca se expone el
// resultado individual de un colaborador (solo su estado de participación).

// ── Campaña actual ───────────────────────────────────────────────────────────
const CAMPAIGN = {
  name: 'Diagnóstico Q2 2026',
  invited: 1248,
  periodDays: 90,
  elapsedDays: 47,       // → 43 días restantes
  startDate: '15 may 2026',
  endDate: '13 ago 2026',
  benchmarkGlobal: 3.0,  // benchmark Human Complex plataforma
  prevGlobal: 2.9,       // promedio de la campaña anterior (para comparativa)
};

// ── Segmentos (para filtros) ─────────────────────────────────────────────────
const SEG = {
  nivel: ['Dirección', 'Gerente', 'Sub Gerente', 'Coordinador', 'Colaborador'],
  area:  ['Ventas', 'Operaciones', 'Tecnología', 'Finanzas', 'Recursos Humanos', 'Marketing'],
  estado: ['CDMX', 'Jalisco', 'Nuevo León', 'Puebla', 'Querétaro', 'Yucatán'],
  genero: ['Femenino', 'Masculino', 'Otro'],
};
// Ciudad principal por estado
const CITY_BY_STATE = {
  'CDMX':        ['Ciudad de México'],
  'Jalisco':     ['Guadalajara', 'Zapopan'],
  'Nuevo León':  ['Monterrey', 'San Pedro'],
  'Puebla':      ['Puebla'],
  'Querétaro':   ['Querétaro'],
  'Yucatán':     ['Mérida'],
};

// ── PRNG determinista (mulberry32) ───────────────────────────────────────────
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Sesgo por segmento: hace que los filtros muestren diferencias reales.
const NIVEL_BIAS = { 'Dirección': 0.45, 'Gerente': 0.28, 'Sub Gerente': 0.10, 'Coordinador': -0.05, 'Colaborador': -0.18 };
const AREA_BIAS  = { 'Ventas': -0.12, 'Operaciones': -0.20, 'Tecnología': 0.16, 'Finanzas': 0.10, 'Recursos Humanos': 0.30, 'Marketing': 0.04 };
// Sesgo por esfera (algunas esferas sistemáticamente más bajas/altas en la compañía)
const SPHERE_BIAS = {
  autoconocimiento: 0.25, regulacion: 0.05, bienestar: -0.55,
  claridad: 0.20, motivacion: 0.00, decision: -0.10,
  comunicacion: 0.05, empatia: 0.30, colaboracion: 0.10,
  ejecucion: -0.35, adaptabilidad: -0.15, influencia: 0.12,
};

// Nombres para la lista de participación (no exponen resultados)
const FIRST = ['Ana','Luis','María','Carlos','Sofía','Diego','Valeria','Jorge','Camila','Andrés','Regina','Emilio','Fernanda','Ricardo','Paola','Mateo','Daniela','Héctor','Lucía','Rodrigo','Ximena','Bruno','Renata','Iván','Mónica','Pablo','Gabriela','Sergio','Isabel','Tomás'];
const LAST  = ['García','Hernández','López','Martínez','Rodríguez','Pérez','Sánchez','Ramírez','Torres','Flores','Rivera','Gómez','Díaz','Cruz','Morales','Reyes','Ortiz','Gutiérrez','Chávez','Ramos','Vázquez','Castillo','Mendoza','Guerrero','Rojas'];

// ── Genera la población ──────────────────────────────────────────────────────
const POP = (() => {
  const rng = mulberry32(20260515);
  const users = [];
  for (let i = 0; i < CAMPAIGN.invited; i++) {
    const nivel = pick(rng, SEG.nivel);
    const area = pick(rng, SEG.area);
    const estado = pick(rng, SEG.estado);
    const ciudad = pick(rng, CITY_BY_STATE[estado]);
    // Género: ~48% F, ~48% M, ~4% Otro
    const gRoll = rng();
    const genero = gRoll < 0.48 ? 'Femenino' : gRoll < 0.96 ? 'Masculino' : 'Otro';

    // Estado de participación: 68% completado, 14% en progreso, 18% no iniciado
    const roll = rng();
    let status;
    if (roll < 0.675) status = 'completado';
    else if (roll < 0.815) status = 'progreso';
    else status = 'noIniciado';

    // Puntajes por esfera (solo relevantes si completó)
    const base = 3.05 + (NIVEL_BIAS[nivel] || 0) + (AREA_BIAS[area] || 0);
    const scores = {};
    for (const s of SPHERES) {
      const v = base + (SPHERE_BIAS[s.id] || 0) + (rng() - 0.5) * 1.1;
      scores[s.id] = clamp(Math.round(v * 10) / 10, 1, 5);
    }

    users.push({
      id: i,
      name: `${pick(rng, FIRST)} ${pick(rng, LAST)}`,
      nivel, area, estado, ciudad, genero, status,
      scores: status === 'completado' ? scores : null,
      // día en que respondió (para "última actividad")
      dayResponded: status === 'completado' ? Math.floor(rng() * CAMPAIGN.elapsedDays) : null,
    });
  }
  return users;
})();

// ── Filtrado ─────────────────────────────────────────────────────────────────
// filters = { nivel: [...], area: [...], estado: [...], ciudad: [...] }
function filterUsers(filters) {
  return POP.filter((u) => {
    if (filters.nivel?.length && !filters.nivel.includes(u.nivel)) return false;
    if (filters.area?.length && !filters.area.includes(u.area)) return false;
    if (filters.estado?.length && !filters.estado.includes(u.estado)) return false;
    if (filters.ciudad?.length && !filters.ciudad.includes(u.ciudad)) return false;
    if (filters.genero?.length && !filters.genero.includes(u.genero)) return false;
    return true;
  });
}

// ── Agregación ───────────────────────────────────────────────────────────────
function aggregate(users) {
  const invited = users.length;
  const completed = users.filter((u) => u.status === 'completado');
  const inProgress = users.filter((u) => u.status === 'progreso');
  const notStarted = users.filter((u) => u.status === 'noIniciado');
  const nDone = completed.length;

  // Promedio por esfera
  const sphereAvg = {};
  for (const s of SPHERES) {
    if (!nDone) { sphereAvg[s.id] = null; continue; }
    const sum = completed.reduce((a, u) => a + u.scores[s.id], 0);
    sphereAvg[s.id] = Math.round((sum / nDone) * 10) / 10;
  }

  // Promedio por pilar
  const pillarAvg = {};
  for (const p of PILLARS) {
    const ids = SPHERES.filter((s) => s.pillar === p.id).map((s) => s.id);
    const vals = ids.map((id) => sphereAvg[id]).filter((v) => v != null);
    pillarAvg[p.id] = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10 : null;
  }

  // Global
  const allSphere = SPHERES.map((s) => sphereAvg[s.id]).filter((v) => v != null);
  const global = allSphere.length ? Math.round((allSphere.reduce((a, b) => a + b, 0) / allSphere.length) * 10) / 10 : null;

  // Esfera más alta / más baja
  let lowest = null, highest = null;
  for (const s of SPHERES) {
    const v = sphereAvg[s.id];
    if (v == null) continue;
    if (!lowest || v < lowest.value) lowest = { id: s.id, value: v };
    if (!highest || v > highest.value) highest = { id: s.id, value: v };
  }

  // Distribución de niveles cualitativos (sobre promedio individual de completados)
  const dist = { desequilibrio: 0, atencion: 0, enCamino: 0, fortaleza: 0 };
  for (const u of completed) {
    const avg = SPHERES.reduce((a, s) => a + u.scores[s.id], 0) / SPHERES.length;
    dist[scoreToLevelKey(avg)]++;
  }

  return {
    invited, nDone, inProgress: inProgress.length, notStarted: notStarted.length,
    participation: invited ? Math.round((nDone / invited) * 1000) / 10 : 0,
    global, pillarAvg, sphereAvg, lowest, highest, dist,
    completed, inProgressUsers: inProgress, notStartedUsers: notStarted,
  };
}

function scoreToLevelKey(score) {
  if (score < 2) return 'desequilibrio';
  if (score < 3) return 'atencion';
  if (score < 4) return 'enCamino';
  return 'fortaleza';
}

// Participación agrupada por un campo de segmento (para la barra por área)
function participationBy(users, field) {
  const map = {};
  for (const u of users) {
    if (!map[u.field]) { /* noop */ }
  }
  const groups = {};
  for (const u of users) {
    const k = u[field];
    if (!groups[k]) groups[k] = { key: k, invited: 0, done: 0 };
    groups[k].invited++;
    if (u.status === 'completado') groups[k].done++;
  }
  return Object.values(groups)
    .map((g) => ({ ...g, rate: g.invited ? Math.round((g.done / g.invited) * 100) : 0 }))
    .sort((a, b) => b.rate - a.rate);
}

Object.assign(window, {
  CAMPAIGN, SEG, CITY_BY_STATE, POP,
  filterUsers, aggregate, participationBy, scoreToLevelKey,
});
