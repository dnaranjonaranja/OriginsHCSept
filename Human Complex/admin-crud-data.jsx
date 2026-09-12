// admin-crud-data.jsx — Datos y helpers para Empresas / Empleados / Evaluaciones
// Extiende la base de COMPANIES (superadmin-data.jsx) con campos de gestión
// (razón social, RFC, contacto, estado) y genera empleados + asignaciones.

function crudMulberry(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const crudPick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

const TIPO_PERSONA = ['Persona Moral', 'Persona Física'];
const ESTADOS_MX = SEG.estado; // reutiliza estados de admin-data.jsx

// ── Empresas: campos de gestión sobre COMPANIES ─────────────────────────────
function buildInitialCompanies() {
  const rng = crudMulberry(4021);
  return COMPANIES.map((c, i) => ({
    ...c,
    razonSocial: `${c.name} S.A. de C.V.`,
    rfc: i % 4 === 0 ? 'N/A' : `${c.name.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, 'X')}${800000 + i}A${i}A`,
    tipoPersona: 'Persona Moral',
    contactoNombre: crudPick(rng, ['Ana Beltrán', 'Luis Solano', 'María Peña', 'Carlos Ibarra', 'Sofía Rangel']),
    contactoCargo: crudPick(rng, ['Directora de RH', 'Gerente de Talento', 'Director General', 'People Lead']),
    descripcion: '',
    estadoRegistro: rng() > 0.08 ? 'activa' : 'inactiva',
    creado: randomPastDate(rng, 420),
  }));
}

function randomPastDate(rng, maxDaysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(rng() * maxDaysAgo));
  return d;
}
function fmtDate(d) {
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtDateShort(d) {
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ── Empleados por empresa ────────────────────────────────────────────────────
const EMP_FIRST = ['Stephany', 'Martha', 'José', 'Andrea', 'Damián', 'Daniela', 'Isabel', 'Rosa Luz', 'Emilio', 'Fernanda', 'Ricardo', 'Paola', 'Héctor', 'Lucía', 'Bruno', 'Renata'];
const EMP_LAST = ['Ibáñez García', 'Blancas Oliva', 'Garza', 'Castro', 'Velasco Martínez', 'Bardales', 'Cabello Berber', 'Figueroa', 'Reyes', 'Ortiz', 'Chávez', 'Ramos', 'Vázquez', 'Mendoza'];
const EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

function buildInitialEmployees(companies) {
  const rng = crudMulberry(88213);
  const employees = [];
  let seq = 0;
  companies.forEach((co) => {
    const n = 4 + Math.floor(rng() * 10); // 4–13 empleados de muestra por empresa
    for (let i = 0; i < n; i++) {
      const first = crudPick(rng, EMP_FIRST);
      const last = crudPick(rng, EMP_LAST);
      const email = `${first.split(' ')[0].toLowerCase()}${last.split(' ')[0].toLowerCase()}${seq}@${crudPick(rng, EMAIL_DOMAINS)}`.replace(/\s/g, '');
      const r = rng();
      const status = r < 0.66 ? 'activo' : r < 0.9 ? 'pendiente' : 'eliminado';
      employees.push({
        id: 'emp' + (seq++),
        companyId: co.id,
        nombre: first, apellido: last,
        email,
        rol: 'employee',
        emailStatus: status === 'pendiente' ? 'Pendiente' : 'Verificado',
        perfil: status === 'activo' ? 'Completo' : 'Incompleto',
        status,
        ingreso: randomPastDate(rng, 300),
      });
    }
  });
  return employees;
}

// ── Evaluaciones asignadas ───────────────────────────────────────────────────
const EVAL_TEMPLATES = ['Diagnóstico 4P · Completo', '4P · Pulso rápido', '4P · Liderazgo'];

function buildInitialAssignments(companies, employees) {
  const rng = crudMulberry(551002);
  const today = new Date();
  const assignments = [];
  let seq = 0;

  companies.forEach((co) => {
    const coEmployees = employees.filter((e) => e.companyId === co.id && e.status !== 'eliminado');
    if (!coEmployees.length) return;
    const nAssignments = 1 + Math.floor(rng() * 2);
    for (let a = 0; a < nAssignments; a++) {
      const start = new Date(today);
      start.setDate(start.getDate() - Math.floor(rng() * 100) + 20); // puede caer antes o después de hoy
      const end = new Date(start);
      end.setDate(end.getDate() + 12 + Math.floor(rng() * 20));

      // Subconjunto de empleados asignados
      const shuffled = [...coEmployees].sort(() => rng() - 0.5);
      const count = Math.max(1, Math.floor(shuffled.length * (0.5 + rng() * 0.5)));
      const assigned = shuffled.slice(0, count).map((e) => {
        const p = rng();
        const progress = p < 0.35 ? 100 : p < 0.55 ? Math.floor(20 + rng() * 70) : 0;
        return { employeeId: e.id, progress, status: progress === 100 ? 'Completada' : progress > 0 ? 'En Progreso' : 'Sin Iniciar' };
      });
      const doneCount = assigned.filter((x) => x.status === 'Completada').length;

      let estado;
      if (end < today) estado = 'expirada';
      else if (start > today) estado = 'pendiente';
      else estado = 'activa';
      if (rng() < 0.06) estado = 'inactiva';

      assignments.push({
        id: 'asg' + (seq++),
        companyId: co.id,
        evaluacion: crudPick(rng, EVAL_TEMPLATES),
        inicio: start, fin: end,
        estado,
        assigned,
        totalAsignados: assigned.length,
        totalCompletados: doneCount,
      });
    }
  });
  return assignments;
}

Object.assign(window, {
  TIPO_PERSONA, ESTADOS_MX,
  buildInitialCompanies, buildInitialEmployees, buildInitialAssignments,
  fmtDate, fmtDateShort, crudMulberry, crudPick,
});
