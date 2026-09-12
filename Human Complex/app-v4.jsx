// app-v4.jsx — Cream/warm desktop design canvas

const DESK_W_V4_APP = 1280;
const DESK_H_V4_APP = 800;

function AppV4() {
  return (
    <div className="dc-host" style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'fixed', top: 18, left: 24, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10,
        color: 'var(--slate-900)', pointerEvents: 'none',
      }}>
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="3" width="26" height="26" rx="8" fill="currentColor"/>
          <circle cx="16" cy="16" r="4" fill="#ff5d8f"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: '-0.015em' }}>
          Human Complex
          <span style={{ color: 'var(--slate-500)', fontWeight: 400, marginLeft: 8, fontSize: 13 }}>v4 · Cream/Warm</span>
        </span>
      </div>

      <DesignCanvas>
        <DCSection id="onboarding" title="Onboarding emocional" subtitle="¿Qué te trae aquí hoy? · 3 enfoques">
          <DCArtboard id="ob-a-v4" label="A · Cream split + ilustración" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <OnboardingA_v4/>
          </DCArtboard>
          <DCArtboard id="ob-b-v4" label="B · Mint cinema" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <OnboardingB_v4/>
          </DCArtboard>
          <DCArtboard id="ob-c-v4" label="C · Pilares de colores" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <OnboardingC_v4/>
          </DCArtboard>
        </DCSection>

        <DCSection id="home" title="Home con saludo + stats" subtitle="Pantalla principal · 3 lecturas">
          <DCArtboard id="home-a-v4" label="A · Mixed cards · cream" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <HomeA_v4/>
          </DCArtboard>
          <DCArtboard id="home-b-v4" label="B · Big number · paper" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <HomeB_v4/>
          </DCArtboard>
          <DCArtboard id="home-c-v4" label="C · Editorial · pink" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <HomeC_v4/>
          </DCArtboard>
        </DCSection>

        <DCSection id="detail" title="Detalle de sesión" subtitle="3 momentos profundos">
          <DCArtboard id="det-a-v4" label="A · Dimensión + recursos" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <DetailA_v4/>
          </DCArtboard>
          <DCArtboard id="det-b-v4" label="B · ¡Bien hecho!" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <DetailB_v4/>
          </DCArtboard>
          <DCArtboard id="det-c-v4" label="C · Reflexión lavender" width={DESK_W_V4_APP} height={DESK_H_V4_APP}>
            <DetailC_v4/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppV4/>);
