export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="foot-root">
      <div className="ruler" />
      <div className="wrap foot-grid">
        <div>
          <div className="brand-word">plinth</div>
          <p style={{marginTop:10, maxWidth:280}}>
            A material board for your home. Pick the surfaces, the pieces,
            the light — we build it, on site, on schedule.
          </p>
        </div>
        <div className="foot-col">
          <span className="eyebrow">Studio</span>
          <a href="#">Amritsar &amp; Ludhiana</a>
          <a href="mailto:hello@plinth.studio">hello@plinth.studio</a>
          <a href="tel:+910000000000">+91 00000 00000</a>
        </div>
        <div className="foot-col">
          <span className="eyebrow">Sitemap</span>
          <a href="/customize">Build a room</a>
          <a href="/portfolio">Projects</a>
          <a href="/process">How it works</a>
          <a href="/contact">Start a project</a>
        </div>
        <div className="foot-col foot-note">
          <span className="eyebrow">Note</span>
          <p className="hand" style={{fontSize:20, color:'var(--redline)'}}>
            built as a CV project — react + node + express
          </p>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {year} Plinth Studio</span>
        <span>Scale 1:1 — every room, actual size.</span>
      </div>
      <style>{`
        .foot-root{ margin-top:120px; background:var(--paper-2); }
        .foot-grid{
          display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr; gap:40px;
          padding-top:56px; padding-bottom:40px;
        }
        .foot-col{ display:flex; flex-direction:column; gap:10px; }
        .foot-col a{ font-size:14px; color:var(--ink-soft); width:fit-content; }
        .foot-col a:hover{ color:var(--ink); }
        .foot-bottom{
          display:flex; justify-content:space-between;
          padding-bottom:26px; font-size:12px; color:var(--ink-soft);
          border-top:1px solid var(--line); padding-top:18px;
        }
        @media (max-width:820px){
          .foot-grid{ grid-template-columns:1fr 1fr; }
          .foot-bottom{ flex-direction:column; gap:6px; }
        }
      `}</style>
    </footer>
  );
}
