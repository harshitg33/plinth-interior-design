import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import RoomBoard from '../customizer/RoomBoard.jsx';
import SwatchDeck from '../customizer/SwatchDeck.jsx';
import SpecSheet from '../customizer/SpecSheet.jsx';
import { DEFAULTS } from '../customizer/roomData.js';
import { api } from '../lib/api.js';

export default function Customize(){
  const [state, setState] = useState(DEFAULTS);
  const [activeZone, setActiveZone] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedCode, setSavedCode] = useState(null);
  const [error, setError] = useState(null);

  const applyChoice = (category, option) => {
    setState((s) => ({ ...s, [category]: option.value }));
    setSavedCode(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await api.saveDesign({ selections: state, createdAt: new Date().toISOString() });
      setSavedCode(res.code);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      <section className="wrap cust-hero">
        <Reveal as="p" className="eyebrow">Build a room — living room, v1</Reveal>
        <Reveal delay={0.05}>
          <h1 style={{ fontSize:'clamp(34px,5vw,58px)' }}>
            Pin your own board. <span className="redline-note">watch the number move.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ maxWidth:560, marginTop:14, fontSize:16 }}>
            Drag a swatch from the deck onto the wall, the floor, the sofa — anywhere it fits.
            The spec sheet on the right updates live, the same way our designers price a job on site.
          </p>
        </Reveal>
      </section>

      <section className="wrap cust-grid">
        <div>
          <RoomBoard state={state} onDrop={(zone, opt) => applyChoice(zone, opt)} activeZone={activeZone} setActiveZone={setActiveZone} />
          <div style={{ marginTop:28 }}>
            <SwatchDeck state={state} onPick={applyChoice} />
          </div>
        </div>
        <SpecSheet state={state} onSave={handleSave} saving={saving} savedCode={savedCode} />
      </section>

      {error && (
        <p className="wrap" style={{ color:'var(--redline)', marginTop:10 }}>{error} — is the server running on :4000?</p>
      )}

      <style>{`
        .cust-hero{ padding-top:56px; padding-bottom:20px; }
        .cust-grid{
          display:grid; grid-template-columns:1fr 320px; gap:40px;
          padding-bottom:80px;
        }
        @media (max-width:900px){
          .cust-grid{ grid-template-columns:1fr; }
          .spec{ position:static !important; }
        }
      `}</style>
    </main>
  );
}
