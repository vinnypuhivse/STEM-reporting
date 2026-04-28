// Tweaks panel — color sliders + dark mode toggle
const { useState: useTweakState, useEffect: useTweakEffect, useRef: useTweakRef } = React;

// Convert hex to HSL so we can shift hue/sat/lightness
function hexToHsl(hex) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hsl(h, s, l) { return `hsl(${h} ${s}% ${l}%)`; }

function applyTheme({ hue, sat, lightDelta, dark, radius }) {
  const root = document.documentElement;
  // Roundedness: inject an override stylesheet that scales key radii
  if (typeof radius === 'number') {
    let s = document.getElementById('__tweak-radius-style');
    if (!s) {
      s = document.createElement('style');
      s.id = '__tweak-radius-style';
      document.head.appendChild(s);
    }
    const pill = radius < 0.15 ? '4px' : '999px';
    s.textContent = `
      .card { border-radius: ${Math.round(16 * radius)}px !important; }
      .ela-tile, .breakdown, .table-wrap, .skill-cell .barline, .skill-cell .barline .fill { border-radius: ${Math.round(12 * radius)}px !important; }
      .metric-tile, .filter-input, .sidebar-item, .btn-ghost, .page-select, .page-btn, .tooltip { border-radius: ${Math.round(8 * radius)}px !important; }
      .nav-logo-mark { border-radius: ${Math.round(2 * radius)}px !important; }
      .sidebar-item.active { border-radius: ${Math.round(2 * radius)}px ${Math.round(8 * radius)}px ${Math.round(2 * radius)}px ${Math.round(2 * radius)}px !important; }
      .ela-bar-fill, .breakdown-row .bar { border-radius: 0 ${pill} ${pill} 0 !important; }
      .ring, .nav-avatar, .tab-dot, .icon-btn { border-radius: ${radius < 0.15 ? '8px' : '50%'} !important; }
    `;
  }

  // Base Newsela blue is hsl(215, 92%, 50%). Hue slider OVERRIDES, sat scales, lightness shifts.
  const baseH = hue;
  const baseS = sat;
  const shift = (l) => Math.max(4, Math.min(96, l + lightDelta));

  root.style.setProperty('--blue-500', hsl(baseH, baseS, shift(50)));
  root.style.setProperty('--blue-600', hsl(baseH, baseS, shift(51)));
  root.style.setProperty('--blue-700', hsl(baseH, baseS, shift(25)));
  root.style.setProperty('--blue-25',  hsl(baseH, Math.max(40, baseS - 20), dark ? 14 : 95));
  root.style.setProperty('--blue-50',  hsl(baseH, Math.max(40, baseS - 20), dark ? 16 : 94));
  root.style.setProperty('--blue-100', hsl(baseH, Math.max(40, baseS - 10), dark ? 22 : 88));

  if (dark) {
    root.style.setProperty('--text-900', 'rgb(235,235,235)');
    root.style.setProperty('--text-700', 'rgb(210,210,210)');
    root.style.setProperty('--text-500', 'rgb(170,170,170)');
    root.style.setProperty('--text-400', 'rgb(140,140,140)');
    root.style.setProperty('--text-300', 'rgb(110,110,110)');
    root.style.setProperty('--bg-app',   'rgb(20,22,26)');
    root.style.setProperty('--bg-panel', 'rgb(24,26,30)');
    root.style.setProperty('--border',       'rgb(55,58,63)');
    root.style.setProperty('--border-soft',  'rgb(48,51,56)');
    root.style.setProperty('--white',    'rgb(30,32,36)');
    document.body.style.background = 'rgb(18,20,24)';
    document.body.style.color = 'rgb(235,235,235)';
  } else {
    root.style.setProperty('--text-900', 'rgb(29,29,29)');
    root.style.setProperty('--text-700', 'rgb(51,51,51)');
    root.style.setProperty('--text-500', 'rgb(84,84,84)');
    root.style.setProperty('--text-400', 'rgb(118,118,118)');
    root.style.setProperty('--text-300', 'rgb(149,149,149)');
    root.style.setProperty('--bg-app',   'rgb(248,248,248)');
    root.style.setProperty('--bg-panel', 'rgb(247,248,248)');
    root.style.setProperty('--border',      'rgb(221,221,221)');
    root.style.setProperty('--border-soft', 'rgb(225,227,229)');
    root.style.setProperty('--white', '#fff');
    document.body.style.background = '#fff';
    document.body.style.color = 'rgb(29,29,29)';
  }
}

// Apply any saved defaults on load BEFORE panel mounts, so the page reflects them
window.__applyTweaks = applyTheme;

function TweakSlider({ label, min, max, step, value, suffix, onChange }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'var(--text-500)' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>{value}{suffix || ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: 'var(--blue-600)' }}/>
    </label>
  );
}

window.TweaksPanel = function TweaksPanel({ defaults }) {
  const [visible, setVisible] = useTweakState(false);
  const [open, setOpen] = useTweakState(true);
  const [hue, setHue] = useTweakState(defaults.hue);
  const [sat, setSat] = useTweakState(defaults.sat);
  const [lightDelta, setLightDelta] = useTweakState(defaults.lightDelta);
  const [dark, setDark] = useTweakState(defaults.dark);
  const [radius, setRadius] = useTweakState(defaults.radius ?? 1);
  const firstRun = useTweakRef(true);

  // Listen for host activate/deactivate BEFORE announcing
  useTweakEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setVisible(true);
      if (t === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Apply & persist on any change
  useTweakEffect(() => {
    applyTheme({ hue, sat, lightDelta, dark, radius });
    if (firstRun.current) { firstRun.current = false; return; }
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: { hue, sat, lightDelta, dark, radius },
    }, '*');
  }, [hue, sat, lightDelta, dark, radius]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, width: 280,
      background: '#fff', color: '#1d1d1d',
      border: '1px solid #e1e3e5', borderRadius: 12,
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      fontFamily: 'Circular, sans-serif', zIndex: 9999,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left',
          padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: open ? '1px solid #e1e3e5' : 'none',
          background: '#f7f8f8', cursor: 'pointer',
        }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>Tweaks</span>
        <span style={{ fontSize: 12, color: '#767676' }}>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div style={{ padding: '14px 14px 10px' }}>
          <div style={{ fontSize: 11, color: '#767676', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, fontWeight: 700 }}>Primary color</div>
          <TweakSlider label="Hue" min={0} max={360} step={1} value={hue} suffix="°" onChange={setHue}/>
          <TweakSlider label="Saturation" min={0} max={100} step={1} value={sat} suffix="%" onChange={setSat}/>
          <TweakSlider label="Lightness shift" min={-20} max={20} step={1} value={lightDelta} suffix="%" onChange={setLightDelta}/>

          <div style={{ fontSize: 11, color: '#767676', textTransform: 'uppercase', letterSpacing: 0.8, margin: '6px 0 10px', fontWeight: 700 }}>Shape</div>
          <TweakSlider label="Corner roundness" min={0} max={2} step={0.05} value={radius} suffix="×" onChange={setRadius}/>

          <div style={{ fontSize: 11, color: '#767676', textTransform: 'uppercase', letterSpacing: 0.8, margin: '6px 0 10px', fontWeight: 700 }}>Theme</div>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: '#f7f8f8', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>Dark mode</span>
            <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
          </label>

          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            {[
              { name: 'Newsela', h: 215, s: 92 },
              { name: 'Violet',  h: 265, s: 82 },
              { name: 'Emerald', h: 160, s: 70 },
              { name: 'Sunset',  h: 22,  s: 85 },
              { name: 'Rose',    h: 340, s: 78 },
            ].map(p => (
              <button key={p.name} title={p.name}
                onClick={() => { setHue(p.h); setSat(p.s); setLightDelta(0); }}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: `hsl(${p.h} ${p.s}% 50%)`,
                  cursor: 'pointer',
                }}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
