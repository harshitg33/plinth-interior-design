import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { PROJECTS } from '../data/projects.js';

const STYLES = ['All', ...new Set(PROJECTS.map((p) => p.style))];

export default function Portfolio(){
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.style === filter);

  return (
    <main className="wrap port">
      <Reveal as="span" className="eyebrow">Finished boards</Reveal>
      <Reveal delay={0.05}>
        <h1 style={{ fontSize:'clamp(34px,5.5vw,64px)', marginTop:10, maxWidth:760 }}>
          Six rooms, six boards, six very different clients.
        </h1>
      </Reveal>

      <div className="filters">
        {STYLES.map((s) => (
          <button key={s} className={`filter-pill ${filter===s?'is-active':''}`} onClick={() => setFilter(s)} data-cursor="pin">
            {s}
          </button>
        ))}
      </div>

      <div className="port-grid">
        {shown.map((p, i) => (
          <Reveal key={p.id} delay={(i%3)*0.06} className={`port-item ${i % 5 === 0 ? 'is-wide' : ''}`}>
            <div className="port-frame">
              <img src={p.image} alt={p.title} />
              <span className="pin" style={{ top:-6, left:16 }} />
            </div>
            <div className="port-caption">
              <h3 style={{ fontSize:20 }}>{p.title}</h3>
              <p style={{ marginTop:6, fontSize:13 }}>{p.room} · {p.city} · <span className="hand" style={{ fontSize:16 }}>{p.style}</span></p>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        .port{ padding-top:56px; padding-bottom:100px; }
        .filters{ display:flex; gap:10px; flex-wrap:wrap; margin:28px 0 40px; }
        .filter-pill{
          border:1px solid var(--line-strong); background:transparent; padding:8px 16px;
          font-size:13px; font-weight:600; color:var(--ink-soft);
        }
        .filter-pill.is-active{ background:var(--ink); color:var(--paper); border-color:var(--ink); }
        .port-grid{
          display:grid; grid-template-columns:repeat(3,1fr); gap:28px 22px;
        }
        .port-item.is-wide{ grid-column:span 2; }
        .port-frame{ position:relative; }
        .port-frame img{ width:100%; height:340px; object-fit:cover; filter:sepia(.15) saturate(.92); border:1px solid var(--line-strong); }
        .port-item:nth-child(3n+1) .port-frame img{ transform:rotate(-1deg); }
        .port-item:nth-child(3n+2) .port-frame img{ transform:rotate(1deg); }
        .port-caption{ margin-top:12px; }
        @media (max-width:900px){
          .port-grid{ grid-template-columns:1fr 1fr; }
          .port-item.is-wide{ grid-column:span 2; }
        }
        @media (max-width:560px){
          .port-grid{ grid-template-columns:1fr; }
          .port-item.is-wide{ grid-column:span 1; }
        }
      `}</style>
    </main>
  );
}
