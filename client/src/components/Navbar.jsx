import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LINKS = [
  { to:'/customize', label:'Build a room' },
  { to:'/portfolio', label:'Projects' },
  { to:'/process', label:'How it works' },
  { to:'/contact', label:'Start a project' },
];

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav-root">
      <div className="ruler" />
      <div className={`wrap nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
        <NavLink to="/" className="brand" data-cursor="pin">
          <span className="brand-mark">PL</span>
          <span className="brand-word">plinth</span>
        </NavLink>
        <nav className="nav-links">
          {LINKS.map((l, i) => (
            <NavLink key={l.to} to={l.to} className="nav-link" data-cursor="pin">
              <span className="tick">{String(i+1).padStart(2,'0')}</span>
              <span className="label">{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <style>{`
        .nav-root{ position:sticky; top:0; z-index:500; background:var(--paper); }
        .nav-bar{
          display:flex; align-items:center; justify-content:space-between;
          padding-top:18px; padding-bottom:18px;
          transition:padding .3s var(--ease);
        }
        .nav-bar.is-scrolled{ padding-top:12px; padding-bottom:12px; }
        .brand{ display:flex; align-items:center; gap:8px; }
        .brand-mark{
          width:30px; height:30px; display:grid; place-items:center;
          background:var(--ink); color:var(--paper);
          font-family:var(--font-display); font-size:15px;
          border-radius:50%;
        }
        .brand-word{
          font-family:var(--font-display); font-size:22px; letter-spacing:-.01em;
        }
        .nav-links{ display:flex; gap:clamp(14px,2.4vw,34px); }
        .nav-link{
          display:flex; align-items:baseline; gap:6px;
          font-size:13px; font-weight:600; color:var(--ink-soft);
          position:relative; padding-bottom:3px;
        }
        .nav-link .tick{ font-family:var(--font-hand); color:var(--brass); font-size:15px; }
        .nav-link::after{
          content:""; position:absolute; left:0; right:100%; bottom:0; height:1px;
          background:var(--redline); transition:right .32s var(--ease);
        }
        .nav-link:hover::after, .nav-link.active::after{ right:0; }
        .nav-link:hover, .nav-link.active{ color:var(--ink); }
        @media (max-width: 720px){
          .nav-link .label{ display:none; }
          .nav-links{ gap:16px; }
        }
      `}</style>
    </header>
  );
}
