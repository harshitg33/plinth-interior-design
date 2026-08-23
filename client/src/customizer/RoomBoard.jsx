import { FLOOR_PATTERNS } from './roomData.js';

export default function RoomBoard({ state, onDrop, activeZone, setActiveZone }){
  const handleDrop = (zone) => (e) => {
    e.preventDefault();
    setActiveZone(null);
    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;
    const payload = JSON.parse(raw);
    if (payload.category !== zone) return;
    onDrop(zone, payload);
  };

  const zoneProps = (zone) => ({
    onDragOver: (e) => { e.preventDefault(); setActiveZone(zone); },
    onDragLeave: () => setActiveZone((z) => (z === zone ? null : z)),
    onDrop: handleDrop(zone),
    'data-active': activeZone === zone ? 'true' : 'false',
  });

  const floorStyle = FLOOR_PATTERNS[state.floor]?.swatch || '#A9A79C';

  return (
    <div className="board">
      <span className="pin" style={{ top:-6, left:-6 }} />
      <span className="pin" style={{ top:-6, right:-6 }} />
      <div className="tape" style={{ top:-16, left:'42%', transform:'rotate(-4deg)' }} />

      <div className="scene">
        {/* back wall */}
        <div className="zone wall" style={{ background: state.wall }} {...zoneProps('wall')}>
          <span className="zone-tag">Wall</span>
        </div>

        {/* window */}
        <div className="window">
          <div className="window-cross-v" />
          <div className="window-cross-h" />
        </div>

        {/* curtains */}
        <div className="zone curtain curtain-l" style={{ background: state.curtain }} {...zoneProps('curtain')} />
        <div className="zone curtain curtain-r" style={{ background: state.curtain }} {...zoneProps('curtain')} />

        {/* floor */}
        <div
          className="zone floor"
          style={{ background: floorStyle.startsWith?.('linear') ? undefined : floorStyle, backgroundImage: floorStyle.startsWith?.('linear') ? floorStyle : undefined, backgroundSize: '64px 100%' }}
          {...zoneProps('floor')}
        >
          <span className="zone-tag">Floor</span>
        </div>

        {/* rug */}
        <div className="zone rug" style={{ background: state.rug }} {...zoneProps('rug')}>
          <span className="zone-tag">Rug</span>
        </div>

        {/* sofa */}
        <div className="sofa-group">
          <div className="zone sofa-back" style={{ background: state.sofa }} {...zoneProps('sofa')} />
          <div className="zone sofa-seat" style={{ background: state.sofa }} {...zoneProps('sofa')}>
            <span className="zone-tag">Sofa</span>
          </div>
          <div className="sofa-arm sofa-arm-l" style={{ background: state.sofa }} />
          <div className="sofa-arm sofa-arm-r" style={{ background: state.sofa }} />
          <div className="zone cushion cushion-1" style={{ background: state.cushion }} {...zoneProps('cushion')} />
          <div className="zone cushion cushion-2" style={{ background: state.cushion }} {...zoneProps('cushion')} />
        </div>

        {/* plant, static prop for warmth */}
        <div className="plant">
          <div className="pot" />
          <div className="leaf leaf-1" />
          <div className="leaf leaf-2" />
          <div className="leaf leaf-3" />
        </div>
      </div>

      <p className="board-caption hand">drag a swatch onto the piece it belongs to</p>

      <style>{`
        .board{
          position:relative;
          background:var(--paper-2);
          border:1px solid var(--line-strong);
          padding:26px 26px 18px;
        }
        .scene{
          position:relative;
          aspect-ratio: 16/11;
          overflow:hidden;
          border:1px solid var(--line-strong);
          background:#efe8d6;
        }
        .zone{ position:relative; transition:background .25s var(--ease), filter .2s; cursor:grab; }
        .zone[data-active="true"]{ filter:brightness(1.12); box-shadow:inset 0 0 0 2px var(--redline); }
        .zone-tag{
          position:absolute; bottom:6px; left:8px;
          font-family:var(--font-hand); font-size:14px; color:rgba(0,0,0,.38);
          pointer-events:none;
        }
        .wall{ position:absolute; inset:0 0 34% 0; }
        .floor{ position:absolute; left:0; right:0; bottom:0; height:34%; background-repeat:repeat-x; }
        .window{
          position:absolute; top:10%; left:8%; width:22%; height:36%;
          background:linear-gradient(180deg,#cfe1e6,#b9d3da);
          border:6px solid #efe8d6;
        }
        .window-cross-v{ position:absolute; left:50%; top:0; bottom:0; width:6px; background:#efe8d6; transform:translateX(-50%); }
        .window-cross-h{ position:absolute; top:50%; left:0; right:0; height:6px; background:#efe8d6; transform:translateY(-50%); }
        .curtain{ position:absolute; top:6%; width:8%; height:42%; opacity:.92; }
        .curtain-l{ left:6.5%; }
        .curtain-r{ left:29%; }
        .rug{ position:absolute; left:30%; right:8%; bottom:6%; height:14%; border-radius:6px; opacity:.9; }
        .sofa-group{ position:absolute; right:8%; bottom:8%; width:52%; height:34%; }
        .sofa-back{ position:absolute; left:4%; right:4%; bottom:38%; top:0; border-radius:10px 10px 0 0; }
        .sofa-seat{ position:absolute; left:0; right:0; bottom:14%; height:34%; border-radius:8px; }
        .sofa-arm{ position:absolute; bottom:8%; width:12%; height:56%; border-radius:8px; opacity:.92; }
        .sofa-arm-l{ left:-3%; }
        .sofa-arm-r{ right:-3%; }
        .cushion{ position:absolute; bottom:34%; width:15%; height:20%; border-radius:4px; transform:rotate(-6deg); }
        .cushion-1{ left:14%; }
        .cushion-2{ left:34%; transform:rotate(5deg); }
        .plant{ position:absolute; left:2%; bottom:6%; width:8%; }
        .pot{ width:100%; aspect-ratio:1.2; background:#8C7355; border-radius:2px 2px 8px 8px; margin-top:60%; }
        .leaf{ position:absolute; width:60%; aspect-ratio:.4; background:#45573C; border-radius:50% 50% 50% 0; bottom:52%; }
        .leaf-1{ left:8%; transform:rotate(-18deg); }
        .leaf-2{ left:32%; transform:rotate(6deg) scaleY(1.15); }
        .leaf-3{ left:52%; transform:rotate(28deg); }
        .board-caption{ margin-top:12px; color:var(--ink-soft); font-size:19px; }
      `}</style>
    </div>
  );
}
