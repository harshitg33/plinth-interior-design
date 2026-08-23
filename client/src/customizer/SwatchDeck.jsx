import { SWATCHES, FLOOR_PATTERNS } from './roomData.js';

export default function SwatchDeck({ state, onPick }){
  const handleDragStart = (category, option) => (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ category, ...option }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="deck">
      {SWATCHES.map((group) => (
        <div className="deck-group" key={group.category}>
          <span className="eyebrow">{group.title}</span>
          <div className="chip-row">
            {group.options.map((opt) => {
              const isActive = state[group.category] === opt.value;
              return (
                <button
                  key={opt.value}
                  className={`chip ${isActive ? 'is-active' : ''}`}
                  draggable
                  onDragStart={handleDragStart(group.category, opt)}
                  onClick={() => onPick(group.category, opt)}
                  data-cursor="pin"
                  title={`Drag onto the ${group.title.toLowerCase()}`}
                >
                  <span
                    className="chip-swatch"
                    style={group.kind === 'floor'
                      ? { background: FLOOR_PATTERNS[opt.value].swatch, backgroundSize:'20px 100%' }
                      : { background: opt.value }
                    }
                  />
                  <span className="chip-name">{opt.name}</span>
                  <span className="chip-price">{opt.price ? `+₹${opt.price.toLocaleString('en-IN')}` : 'included'}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <style>{`
        .deck-group{ margin-bottom:22px; }
        .chip-row{ display:flex; flex-wrap:wrap; gap:10px; margin-top:10px; }
        .chip{
          display:flex; align-items:center; gap:8px;
          background:var(--paper); border:1px solid var(--line-strong);
          padding:7px 10px 7px 7px; cursor:grab;
          transition:transform .2s var(--ease), box-shadow .2s var(--ease);
        }
        .chip:hover{ transform:translateY(-2px); box-shadow:0 4px 0 var(--line); }
        .chip.is-active{ outline:2px solid var(--redline); outline-offset:-1px; }
        .chip-swatch{ width:22px; height:22px; border-radius:3px; border:1px solid rgba(0,0,0,.2); background-repeat:repeat-x; }
        .chip-name{ font-size:12.5px; font-weight:600; }
        .chip-price{ font-size:11px; color:var(--ink-soft); }
      `}</style>
    </div>
  );
}
