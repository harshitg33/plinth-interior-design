import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { PROJECTS } from '../data/projects.js';

const WORDS = ['Build', 'your', 'room,', 'board', 'by', 'board.'];

export default function Home(){
  return (
    <main>
      {/* ---------------- HERO ---------------- */}
      <section className="wrap hero">
        <div className="hero-copy">
          <span className="eyebrow">Interior design studio — Punjab</span>
          <h1 className="hero-title">
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                className="hero-word"
                initial={{ y:'110%' }}
                animate={{ y:'0%' }}
                transition={{ duration:0.8, delay:0.08*i, ease:[0.22,0.9,0.3,1] }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7, duration:0.6 }}
            style={{ maxWidth:460, marginTop:22, fontSize:17 }}
          >
            Plinth is a working material board, not a showroom. Choose the paint, the timber,
            the fabric — see the number change — then we build it on site, room by room.
          </motion.p>
          <motion.div
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, duration:0.6 }}
            style={{ display:'flex', gap:14, marginTop:30 }}
          >
            <Link to="/customize" className="btn" data-cursor="pin">Start your board</Link>
            <Link to="/portfolio" className="btn ghost" data-cursor="pin">See finished rooms</Link>
          </motion.div>
        </div>

        <div className="hero-board">
          <span className="pin" style={{ top:10, left:'46%' }} />
          <div className="tape" style={{ top:-10, right:20, transform:'rotate(6deg)' }} />
          <img
            src="https://images.openai.com/static-rsc-4/7u5ob3wE9eub-s15vsJyJaCxXVwL1CosgNodYlX0dq7l73LgjlKoLUyNX8AluRQ7eVCSwoCpDj5yfro7Ch8Us0N1Hnmk77ajT25QlPn7pJBKAU-UhIMpoMU0YO78TRQCuwN-s_vTED6HPc0ySmhxDZbI1HKUV5sHcvQ5XRdCOY2KwFQiZ7uZmtgOb8h-mKPr?purpose=fullsize"
            alt="A living room mid material selection, on the Plinth board"
            className="hero-photo"
          />
          <span className="hand hero-scrawl">sofa fabric →<br/>swap me</span>
        </div>
      </section>

      <div className="ruler" />

      {/* ---------------- PROCESS TEASER ---------------- */}
      <section className="wrap process-teaser">
        <Reveal as="span" className="eyebrow">How a room gets built</Reveal>
        <div className="process-row">
          {[
            { t:'Site visit', d:'We measure the room, the light, the wiring — the real constraints.' },
            { t:'Material board', d:'You pick surfaces and pieces here, live, with a running estimate.' },
            { t:'Install', d:'Our crew builds to the board, on the day we quoted, not after.' },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i*0.08} className="process-card card">
              <span className="hand" style={{ fontSize:26, color:'var(--brass)' }}>{String(i+1).padStart(2,'0')}</span>
              <h3 style={{ fontSize:22, marginTop:10 }}>{s.t}</h3>
              <p style={{ marginTop:8 }}>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- SELECTED PROJECTS ---------------- */}
      <section className="selected">
        <div className="wrap" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <Reveal as="span" className="eyebrow">Recently pinned</Reveal>
            <Reveal delay={0.05}><h2 style={{ fontSize:'clamp(28px,4vw,44px)', marginTop:8 }}>Rooms we've built from a board like this one.</h2></Reveal>
          </div>
          <Reveal delay={0.1}><Link to="/portfolio" className="btn ghost" data-cursor="pin">All projects</Link></Reveal>
        </div>
        <div className="strip">
          {PROJECTS.slice(0,5).map((p, i) => (
            <Reveal key={p.id} delay={i*0.05} className="strip-card" y={16}>
              <img src={p.image} alt={p.title} />
              <div className="strip-tape" />
              <div className="strip-label">
                <span className="hand" style={{ fontSize:20 }}>{p.room}</span>
                <span style={{ fontSize:13, color:'var(--ink-soft)' }}>{p.city}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="wrap cta">
        <Reveal>
          <h2 style={{ fontSize:'clamp(32px,6vw,72px)', maxWidth:820 }}>
            Stop scrolling mood boards. <span className="redline-note">Start pinning your own.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/customize" className="btn brass" style={{ marginTop:28 }} data-cursor="pin">Open the board — it's free to try</Link>
        </Reveal>
      </section>

      <style>{`
        .hero{
          display:grid; grid-template-columns:1fr 0.85fr; gap:48px;
          padding-top:64px; padding-bottom:70px; align-items:center;
        }
        .hero-title{ font-size:clamp(40px,6.4vw,86px); overflow:hidden; }
        .hero-word{ display:inline-block; overflow:hidden; }
        .hero-board{ position:relative; }
        .hero-photo{ width:100%; filter:sepia(.18) contrast(1.02) saturate(.9); border:1px solid var(--line-strong); transform:rotate(1.4deg); }
        .hero-scrawl{ position:absolute; bottom:-10px; left:-30px; font-size:19px; color:var(--redline); transform:rotate(-4deg); }

        .process-teaser{ padding-top:64px; padding-bottom:20px; }
        .process-row{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:24px; }
        .process-card{ padding:24px; }

        .selected{ padding-top:80px; }
        .strip{ display:flex; gap:20px; overflow-x:auto; padding:34px clamp(20px,5vw,64px) 20px; scroll-snap-type:x mandatory; }
        .strip-card{ position:relative; flex:0 0 240px; scroll-snap-align:start; }
        .strip-card img{ width:100%; height:300px; object-fit:cover; filter:sepia(.15) saturate(.92); border:1px solid var(--line-strong); }
        .strip-card:nth-child(even) img{ transform:rotate(-1.6deg); }
        .strip-card:nth-child(odd) img{ transform:rotate(1.2deg); }
        .strip-tape{ position:absolute; top:-10px; left:30%; width:70px; height:24px; background:rgba(230,223,204,.85); box-shadow:0 1px 2px rgba(0,0,0,.15); }
        .strip-label{ display:flex; justify-content:space-between; margin-top:10px; }

        .cta{ padding:110px 0 40px; }

        @media (max-width:880px){
          .hero{ grid-template-columns:1fr; }
          .process-row{ grid-template-columns:1fr; }
        }
      `}</style>
    </main>
  );
}
