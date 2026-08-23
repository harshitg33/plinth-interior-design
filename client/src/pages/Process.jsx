import Reveal from '../components/Reveal.jsx';

const STEPS = [
  { mark:'0 cm', t:'Site visit', d:'A designer comes to the room with a laser measure and a camera. We record wiring, plumbing, light direction and the things a photo never shows — a door that swings the wrong way, a beam that eats a foot of ceiling.', days:'Day 1' },
  { mark:'40 cm', t:'The board', d:'You open this same customizer, seeded with your room\'s real dimensions. You choose surfaces and pieces, we flag anything the site can\'t actually support before you fall for it.', days:'Day 2–4' },
  { mark:'85 cm', t:'Quote & sign-off', d:'The spec sheet from your board becomes the quote, line for line — no separate "package" with different numbers. You approve it once.', days:'Day 5' },
  { mark:'130 cm', t:'Procurement', d:'Fabric, timber and paint are ordered against your exact board. Long-lead items get flagged immediately so they don\'t stall install week.', days:'Week 2–4' },
  { mark:'175 cm', t:'Build & install', d:'Our crew works the room in the order that avoids redoing anything: structural first, then surfaces, then soft furnishing last.', days:'Week 5–6' },
  { mark:'220 cm', t:'Walkthrough', d:'We walk the finished room against the board together. Anything that doesn\'t match what you approved, we fix before we invoice the balance.', days:'Week 6' },
];

export default function Process(){
  return (
    <main className="wrap proc">
      <Reveal as="span" className="eyebrow">How it works</Reveal>
      <Reveal delay={0.05}>
        <h1 style={{ fontSize:'clamp(34px,5.5vw,64px)', marginTop:10, maxWidth:760 }}>
          Read this the way you'd read a tape measure — top to bottom, in order.
        </h1>
      </Reveal>

      <div className="tape-line">
        {STEPS.map((s, i) => (
          <Reveal key={s.t} delay={i*0.05} className="tape-row">
            <div className="tape-mark">
              <span className="hand">{s.mark}</span>
              <span className="tape-dot" />
            </div>
            <div className="tape-body card">
              <div className="tape-head">
                <h3 style={{ fontSize:24 }}>{s.t}</h3>
                <span className="eyebrow">{s.days}</span>
              </div>
              <p style={{ marginTop:10 }}>{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        .proc{ padding-top:56px; padding-bottom:100px; }
        .tape-line{ position:relative; margin-top:50px; padding-left:70px; }
        .tape-line::before{
          content:""; position:absolute; left:16px; top:0; bottom:0; width:2px;
          background:repeating-linear-gradient(to bottom, var(--line-strong) 0 6px, transparent 6px 12px);
        }
        .tape-row{ position:relative; display:flex; gap:24px; margin-bottom:34px; }
        .tape-mark{ position:absolute; left:-70px; top:6px; width:70px; display:flex; align-items:center; gap:8px; }
        .tape-mark .hand{ font-size:16px; color:var(--brass); white-space:nowrap; }
        .tape-dot{ width:9px; height:9px; border-radius:50%; background:var(--redline); }
        .tape-body{ padding:22px 24px; flex:1; }
        .tape-head{ display:flex; justify-content:space-between; align-items:baseline; }
        @media (max-width:640px){
          .tape-line{ padding-left:26px; }
          .tape-mark{ display:none; }
          .tape-line::before{ left:6px; }
        }
      `}</style>
    </main>
  );
}
