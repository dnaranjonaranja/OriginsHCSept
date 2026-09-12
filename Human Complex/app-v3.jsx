// app-v3.jsx — DESKTOP design canvas

const DESK_W_V3 = 1280;
const DESK_H_V3 = 800;

function AppV3() {
  return (
    <div className="dc-host" style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'fixed', top: 18, left: 24, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10,
        color: '#fff', pointerEvents: 'none',
      }}>
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="1.4"/>
          <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <circle cx="16" cy="16" r="2.4" fill="oklch(0.65 0.20 260)"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: '-0.015em' }}>
          Human Complex
          <span style={{ color: 'oklch(1 0 0 / 0.45)', fontWeight: 400, marginLeft: 8, fontSize: 13 }}>v3 · Desktop · Opal-style</span>
        </span>
      </div>

      <DesignCanvas>
        <DCSection id="onboarding" title="Onboarding emocional" subtitle="¿Qué te trae aquí hoy? · 3 enfoques">
          <DCArtboard id="ob-a" label="A · Glass split · night" width={DESK_W_V3} height={DESK_H_V3}>
            <OnboardingA/>
          </DCArtboard>
          <DCArtboard id="ob-b" label="B · Aurora · cinema" width={DESK_W_V3} height={DESK_H_V3}>
            <OnboardingB/>
          </DCArtboard>
          <DCArtboard id="ob-c" label="C · Pilares · violet" width={DESK_W_V3} height={DESK_H_V3}>
            <OnboardingC/>
          </DCArtboard>
        </DCSection>

        <DCSection id="home" title="Home con saludo + stats" subtitle="Pantalla principal · 3 lecturas">
          <DCArtboard id="home-a" label="A · Glass pair · night" width={DESK_W_V3} height={DESK_H_V3}>
            <HomeA/>
          </DCArtboard>
          <DCArtboard id="home-b" label="B · Big number · aurora" width={DESK_W_V3} height={DESK_H_V3}>
            <HomeB/>
          </DCArtboard>
          <DCArtboard id="home-c" label="C · Editorial · warm" width={DESK_W_V3} height={DESK_H_V3}>
            <HomeC/>
          </DCArtboard>
        </DCSection>

        <DCSection id="detail" title="Detalle de sesión" subtitle="3 momentos profundos">
          <DCArtboard id="det-a" label="A · Dimensión + recursos" width={DESK_W_V3} height={DESK_H_V3}>
            <DetailA/>
          </DCArtboard>
          <DCArtboard id="det-b" label="B · ¡Bien hecho!" width={DESK_W_V3} height={DESK_H_V3}>
            <DetailB/>
          </DCArtboard>
          <DCArtboard id="det-c" label="C · Reflexión inmersiva" width={DESK_W_V3} height={DESK_H_V3}>
            <DetailC/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppV3/>);
