import { useState } from 'react';
import { BASE_PRICE, SWATCHES } from './roomData.js';

export default function SpecSheet({ state, onSave, saving, savedCode }){
  const lines = SWATCHES.map((group) => {
    const opt = group.options.find((o) => o.value === state[group.category]);
    return { label: group.title, name: opt?.name || '—', price: opt?.price || 0 };
  });
  const total = BASE_PRICE + lines.reduce((sum, l) => sum + l.price, 0);

  return (
    <div className="spec">
      <div className="spec-head">
        <span className="eyebrow">Spec sheet</span>
        <span className="hand" style={{ fontSize:20, color:'var(--brass)' }}>no. 004 — living room</span>
      </div>
      <div className="spec-lines">
        <div className="spec-line spec-base">
          <span>Base build &amp; labour</span>
          <span>₹{BASE_PRICE.toLocaleString('en-IN')}</span>
        </div>
        {lines.map((l) => (
          <div className="spec-line" key={l.label}>
            <span>{l.label} — <em>{l.name}</em></span>
            <span>{l.price ? `+₹${l.price.toLocaleString('en-IN')}` : 'included'}</span>
          </div>
        ))}
      </div>
      <div className="spec-total">
        <span>Estimated total</span>
        <span>₹{total.toLocaleString('en-IN')}</span>
      </div>
      <button className="btn brass" style={{ width:'100%', justifyContent:'center' }} onClick={onSave} disabled={saving}>
        {saving ? 'Pinning to board…' : 'Save this board'}
      </button>
      {savedCode && (
        <p className="hand" style={{ marginTop:10, fontSize:18, color:'var(--redline)' }}>
          saved — reference {savedCode}
        </p>
      )}
      <style>{`
        .spec{ background:var(--paper-2); border:1px solid var(--line-strong); padding:22px; position:sticky; top:96px; }
        .spec-head{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:14px; }
        .spec-lines{ border-top:1px dashed var(--line-strong); }
        .spec-line{
          display:flex; justify-content:space-between; gap:10px;
          font-size:13px; padding:9px 0; border-bottom:1px dashed var(--line-strong);
          color:var(--ink-soft);
        }
        .spec-line em{ color:var(--ink); font-style:normal; font-weight:600; }
        .spec-base{ color:var(--ink); font-weight:600; }
        .spec-total{
          display:flex; justify-content:space-between; align-items:baseline;
          font-family:var(--font-display); font-size:26px; margin:16px 0 18px;
        }
      `}</style>
    </div>
  );
}
