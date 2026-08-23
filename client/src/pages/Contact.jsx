import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { api } from '../lib/api.js';

const ROOMS = ['Living room', 'Kitchen', 'Bedroom', 'Study', 'Full home'];

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', city:'', room:ROOMS[0], notes:'' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [errMsg, setErrMsg] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrMsg('');
    try {
      await api.sendContact(form);
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message);
    }
  };

  if (status === 'done') {
    return (
      <main className="wrap contact-done">
        <Reveal>
          <span className="eyebrow">Request received</span>
          <h1 style={{ fontSize:'clamp(32px,5vw,56px)', marginTop:10 }}>
            Pinned. <span className="redline-note">We'll call within a day.</span>
          </h1>
          <p style={{ marginTop:16, maxWidth:480 }}>
            A designer will reach out on the number or email you gave us to schedule the site visit
            described on the <a href="/process" style={{ textDecoration:'underline' }}>process page</a>.
          </p>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="wrap contact">
      <div>
        <Reveal as="span" className="eyebrow">Start a project</Reveal>
        <Reveal delay={0.05}>
          <h1 style={{ fontSize:'clamp(32px,5vw,58px)', marginTop:10, maxWidth:520 }}>
            Tell us the room. We'll bring the tape measure.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ marginTop:16, maxWidth:440 }}>
            This goes straight to our studio inbox — no sales queue. If you've already built a
            board on the <a href="/customize" style={{ textDecoration:'underline' }}>customizer</a>,
            mention it in the notes and we'll pull it up.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="card form-card">
        <span className="tape" style={{ top:-14, left:30, transform:'rotate(-5deg)' }} />
        <form onSubmit={submit}>
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input required value={form.name} onChange={update('name')} placeholder="Your name" />
            </label>
            <label className="field">
              <span>City</span>
              <input required value={form.city} onChange={update('city')} placeholder="Ludhiana" />
            </label>
          </div>
          <label className="field">
            <span>Email</span>
            <input required type="email" value={form.email} onChange={update('email')} placeholder="you@email.com" />
          </label>
          <label className="field">
            <span>Room</span>
            <select value={form.room} onChange={update('room')}>
              {ROOMS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Notes</span>
            <textarea rows={4} value={form.notes} onChange={update('notes')} placeholder="Anything about the space, timeline or budget." />
          </label>
          <button className="btn brass" type="submit" disabled={status==='sending'} style={{ width:'100%', justifyContent:'center', marginTop:6 }}>
            {status === 'sending' ? 'Sending…' : 'Send to the studio'}
          </button>
          {status === 'error' && <p style={{ color:'var(--redline)', marginTop:10, fontSize:13 }}>{errMsg} — is the server running on :4000?</p>}
        </form>
      </Reveal>

      <style>{`
        .contact{ padding-top:56px; padding-bottom:100px; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; }
        .contact-done{ padding-top:120px; padding-bottom:160px; }
        .form-card{ padding:30px; position:relative; }
        .field-row{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .field{ display:flex; flex-direction:column; gap:6px; margin-bottom:16px; font-size:12px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:var(--ink-soft); }
        .field input, .field select, .field textarea{
          font-family:var(--font-body); font-size:15px; padding:11px 12px;
          border:1px solid var(--line-strong); background:var(--paper);
          color:var(--ink); font-weight:500; resize:vertical;
        }
        .field input:focus, .field select:focus, .field textarea:focus{
          outline:2px solid var(--redline); outline-offset:1px;
        }
        @media (max-width:820px){
          .contact{ grid-template-columns:1fr; }
          .field-row{ grid-template-columns:1fr; }
        }
      `}</style>
    </main>
  );
}
