import { useEffect, useRef } from 'react';

/**
 * A small brass tack that trails the pointer with spring easing,
 * and swells into a "pin here" ring over anything interactive.
 * Desktop only — disabled on touch devices in App.jsx.
 */
export default function Cursor(){
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x:0, y:0 });
  const ringPos = useRef({ x:0, y:0 });

  useEffect(() => {
    const move = (e) => { pos.current = { x:e.clientX, y:e.clientY }; };
    window.addEventListener('mousemove', move);

    let raf;
    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor="pin"]')) {
        ring.current?.classList.add('is-active');
      }
    };
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor="pin"]')) {
        ring.current?.classList.remove('is-active');
      }
    };
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pin-cursor-dot" />
      <div ref={ring} className="pin-cursor-ring" />
      <style>{`
        .pin-cursor-dot, .pin-cursor-ring{
          position:fixed; top:0; left:0; pointer-events:none; z-index:10000;
          translate:-50% -50%;
        }
        .pin-cursor-dot{
          width:7px; height:7px; border-radius:50%;
          background:var(--redline);
        }
        .pin-cursor-ring{
          width:34px; height:34px; border-radius:50%;
          border:1px solid var(--ink);
          opacity:.55;
          transition:width .25s var(--ease), height .25s var(--ease), opacity .25s var(--ease), border-color .25s;
        }
        .pin-cursor-ring.is-active{
          width:56px; height:56px;
          opacity:1;
          border-color:var(--redline);
        }
        @media (hover:none){ .pin-cursor-dot,.pin-cursor-ring{ display:none; } }
      `}</style>
    </>
  );
}
