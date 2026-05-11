// Overview cards (STEM + ELA) and the Content breakdown card.
(function() {
const h = React.createElement;
const I = window.Icons;
const { useEffect, useState } = React;

// ────────────────────────── Ring gauge (for avg minutes) ──────────────────────────
window.Ring = function Ring({ value, label, size = 72, pct }) {
  // If pct not given, treat value as raw number to display; default to 75% arc.
  const p = pct != null ? pct : 75;
  const r = 30;
  const C = 2 * Math.PI * r;
  const len = (Math.min(100, Math.max(0, p)) / 100) * C;
  return h('div', { style: { position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center' } },
    h('svg', { width: size, height: size, viewBox: '0 0 72 72', style: { transform: 'rotate(-90deg)' } },
      h('circle', { cx: 36, cy: 36, r, fill: 'none', stroke: 'var(--blue-100)', strokeWidth: 8 }),
      p > 0 && h('circle', {
        cx: 36, cy: 36, r, fill: 'none',
        stroke: 'var(--blue-600)', strokeWidth: 8, strokeLinecap: 'round',
        strokeDasharray: `${len} ${C}`,
      }),
    ),
    h('span', { style: { position: 'absolute', fontWeight: 700, fontSize: 22, color: 'var(--blue-700)', lineHeight: 1 } }, label ?? value)
  );
};

// ────────────────────────── Metric tile ──────────────────────────
window.MetricTile = function MetricTile({ kind, value, label, bigNum }) {
  return h('div', { className: 'metric-tile' },
    kind === 'ring'
      ? h(window.Ring, { value, label: value })
      : h('div', { className: 'num' + (bigNum ? ' num-big' : '') }, value),
    h('div', { className: 'label' }, label)
  );
};

// ────────────────────────── Reading activity overview (ELA top card) ──────────────────────────
// 4 inner tiles: Average reading level / Total texts / Avg min / Texts read by grade levels
// ────────────────────────── Average reading level (standalone) ──────────────────────────
window.AvgReadingLevelCard = function AvgReadingLevelCard({ tipText, avgLevel, avgLevelSub, avgLexile, avgLexileSub }) {
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, h(I.Article, { size: 22 }), 'Average reading level'),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { className: 'ela-lvl-stack' },
      h('div', { className: 'ela-lvl-panel' },
        h('div', { className: 'ela-lvl-num' }, avgLevel),
        h('div', { className: 'ela-lvl-sub' }, avgLevelSub),
      ),
      h('div', { className: 'ela-lvl-panel' },
        h('div', { className: 'ela-lvl-num' }, avgLexile),
        h('div', { className: 'ela-lvl-sub' }, avgLexileSub),
      ),
    ),
  );
};

// ────────────────────────── Reading totals (two rings) ──────────────────────────
// ────────────────────────── Total texts viewed (standalone) ──────────────────────────
window.TotalTextsCard = function TotalTextsCard({ tipText, totalTexts }) {
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, h(I.Article, { size: 22 }), 'Total texts viewed'),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { background: '#fff', borderRadius: 8, padding: '24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 8, flex: 1, justifyContent: 'center' } },
      h(window.Ring, { value: totalTexts, label: totalTexts, pct: 0 }),
      h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, 'Total texts viewed by class'),
    ),
  );
};

// ────────────────────────── Average minutes per article (standalone) ──────────────────────────
window.AvgMinutesCard = function AvgMinutesCard({ tipText, avgMinPerArticle }) {
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, h(I.Clock, { size: 22 }), 'Average time'),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { background: '#fff', borderRadius: 8, padding: '24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 8, flex: 1, justifyContent: 'center' } },
      h(window.Ring, { value: avgMinPerArticle, label: avgMinPerArticle, pct: (avgMinPerArticle / 60) * 100 }),
      h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, 'Average minutes per article'),
    ),
  );
};

// ────────────────────────── Reading totals (two inner rings) ──────────────────────────
window.ReadingTotalsCard = function ReadingTotalsCard({ tipText, totalTexts, avgMinPerArticle, elaIconHtml }) {
  const icon = elaIconHtml
    ? h('span', {
        style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
        dangerouslySetInnerHTML: { __html: elaIconHtml.replace('<svg ', '<svg style="width:22px;height:22px;display:block;fill:currentColor" ') }
      })
    : h(I.Chart, { size: 22 });
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, icon, 'Reading totals'),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8, flex: 1 } },
      h('div', { style: { background: '#fff', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 } },
        h(window.Ring, { value: totalTexts, label: totalTexts, pct: 0 }),
        h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, 'Total texts viewed by class'),
      ),
      h('div', { style: { background: '#fff', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 } },
        h(window.Ring, { value: avgMinPerArticle, label: avgMinPerArticle, pct: (avgMinPerArticle / 60) * 100 }),
        h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, 'Average minutes per article'),
      ),
    ),
  );
};
window.ReadingTotalsCardOld = function ReadingTotalsCard({ tipText, totalTexts, avgMinPerArticle }) {
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, h(I.Chart, { size: 22 }), 'Reading totals'),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8, flex: 1 } },
      h('div', { style: { background: '#fff', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 } },
        h(window.Ring, { value: totalTexts, label: totalTexts, pct: 0 }),
        h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, 'Total texts viewed by class'),
      ),
      h('div', { style: { background: '#fff', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 } },
        h(window.Ring, { value: avgMinPerArticle, label: avgMinPerArticle, pct: (avgMinPerArticle / 60) * 100 }),
        h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, 'Average minutes per article'),
      ),
    ),
  );
};

// ────────────────────────── Texts by grade levels (standalone) ──────────────────────────
window.TextsByLevelCard = function TextsByLevelCard({ tipText, textsByLevel }) {
  const max = Math.max(...textsByLevel.map(t => t.count), 1);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, h(I.TrendUp, { size: 22 }), 'Texts by grade levels'),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { className: 'ela-tile ela-tile--right', style: { marginTop: 8, flex: 1, justifyContent: 'center' } },
      h('div', { className: 'ela-bars' },
        textsByLevel.map((row, i) =>
          h('div', { key: row.level, className: 'ela-bar-row' },
            h('span', { className: 'ela-bar-label' }, row.level),
            h('div', { style: { width: '100%', height: 24, background: 'transparent', overflow: 'visible' } },
              h('div', { style: { height: '100%', background: 'rgb(16,111,243)', borderRadius: '0 8px 0 0', width: visible ? ((row.count / max) * 100) + '%' : '0%', transition: 'width 600ms cubic-bezier(0.2,0,0,1)', transitionDelay: (i * 80) + 'ms' } }),
            ),
            h('span', { className: 'ela-bar-count' }, row.count),
          )
        ),
      ),
      h('a', { className: 'ela-trend', href: '#', style: { marginTop: 12 } },
        h(I.TrendUp, { size: 14 }),
        'Trending higher this week',
      ),
    ),
  );
};

window.ReadingActivityCard = function ReadingActivityCard({ title, tipText, avgLevel, avgLevelSub, avgLexile, avgLexileSub, totalTexts, avgMinPerArticle, textsByLevel }) {
  const max = Math.max(...textsByLevel.map(t => t.count), 1);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);
  return h('div', { className: 'card card--tinted ela-reading-card' },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, h(I.Article, { size: 22 }), title),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { className: 'ela-reading-grid' },
      // Tile 1: Average reading level (grade + lexile side-by-side)
      h('div', { className: 'ela-tile ela-tile--left' },
        h('div', { className: 'ela-tile-heading' }, 'Average reading level'),
        h('div', { className: 'ela-lvl-row' },
          h('div', { className: 'ela-lvl-num' }, avgLevel),
          h('div', { className: 'ela-lvl-sub' }, avgLevelSub),
        ),
        h('div', { className: 'ela-lvl-divider' }),
        h('div', { className: 'ela-lvl-row' },
          h('div', { className: 'ela-lvl-num' }, avgLexile),
          h('div', { className: 'ela-lvl-sub' }, avgLexileSub),
        ),
      ),
      // Tile 2: Total texts viewed — number-only ring
      h('div', { className: 'ela-tile ela-tile--center' },
        h(window.Ring, { value: totalTexts, label: totalTexts, pct: 0 }),
        h('div', { className: 'ela-tile-label' }, 'Total texts viewed by class'),
      ),
      // Tile 3: Average minutes per article — ring showing %
      h('div', { className: 'ela-tile ela-tile--center' },
        h(window.Ring, { value: avgMinPerArticle, label: avgMinPerArticle, pct: (avgMinPerArticle / 60) * 100 }),
        h('div', { className: 'ela-tile-label' }, 'Average minutes per article'),
      ),
      // Tile 4: Texts read by grade levels — horizontal bars
      h('div', { className: 'ela-tile ela-tile--right' },
        h('div', { className: 'ela-tile-heading' }, 'Texts read by grade levels'),
        h('div', { className: 'ela-bars' },
          textsByLevel.map((row, i) =>
            h('div', { key: row.level, className: 'ela-bar-row' },
              h('span', { className: 'ela-bar-label' }, row.level),
              h('div', { className: 'ela-bar-track' },
                h('div', { className: 'ela-bar-fill', style: { width: visible ? ((row.count / max) * 100) + '%' : '0%', transitionDelay: (i * 80) + 'ms' } }),
              ),
              h('span', { className: 'ela-bar-count' }, row.count),
            )
          ),
        ),
        h('a', { className: 'ela-trend', href: '#' },
          h(I.TrendUp, { size: 14 }),
          'Trending higher this week',
        ),
      ),
    )
  );
};

// ────────────────────────── Activity card (shared) ──────────────────────────
// Used for "Articles activity" and "Videos activity" cards in STEM.
window.ActivityCard = function ActivityCard({ icon, title, tiles, tipText }) {
  return h('div', { className: 'card card--tinted' },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, icon, title),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { className: 'metric-row' },
      tiles.map((t, i) => h(window.MetricTile, { key: i, ...t }))
    )
  );
};

// ────────────────────────── Content breakdown ──────────────────────────
// Shows "Articles read per category" & "Videos watched per category"
// With percentage + count, animated bars.
window.ContentBreakdown = function ContentBreakdown({
  title, tipText, left, right,
}) {
  // each of `left` and `right` = { heading, unit, rows: [{level,count,pct}] }
  return h('div', { className: 'card card--tinted' },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' },
        h(I.TrendUp, { size: 22 }),
        title
      ),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', {
      style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 },
      className: 'breakdown-grid',
    },
      h(window.BreakdownBlock, left),
      h(window.BreakdownBlock, right),
    )
  );
};

window.BreakdownBlock = function BreakdownBlock({ heading, unit, rows, trendText }) {
  const max = Math.max(...rows.map(r => r.count), 1);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return h('div', { className: 'breakdown' },
    h('h3', null, heading),
    rows.map((r, i) =>
      h('div', { className: 'breakdown-row', key: r.level },
        h('span', { className: 'lvl' }, r.level),
        h('div', { className: 'bar-wrap', 'aria-hidden': true },
          h('div', {
            className: 'bar',
            style: {
              width: visible ? ((r.count / max) * 100) + '%' : '0%',
              transitionDelay: (i * 80) + 'ms',
            },
          })
        ),
        h('div', { className: 'val' },
          h('span', { className: 'pct' }, r.pct + '%'),
          h('span', { className: 'count' }, `(${r.count} ${unit})`),
        ),
      )
    ),
    h('button', { className: 'breakdown-trend' },
      h(I.TrendUp, { size: 16 }),
      trendText || 'Trending higher this week',
    )
  );
};

// ────────────────────────── Donut card (STEM overview: % Articles vs Videos) ──────────────────────────
window.DonutCard = function DonutCard({ title, icon, tipText, articlesPct, videosPct, articlesTotal, videosTotal, subLabel }) {
  // SVG donut with rounded stroke caps + small white gaps between segments.
  // Blue (Articles) on the LEFT half, Purple (Videos) on the RIGHT half.
  const a = Math.max(0, Math.min(100, articlesPct));
  const v = Math.max(0, Math.min(100, videosPct));
  const r = 42;
  const C = 2 * Math.PI * r;
  const gap = 8; // px gap in stroke length on each side of a segment
  // Videos (purple) on the right — start at top (rotate -90) going clockwise for `v`%.
  const vLen = (v / 100) * C;
  const aLen = (a / 100) * C;
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);
  const ease = 'stroke-dasharray 700ms cubic-bezier(0.2,0,0,1)';

  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, icon, title),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { background: '#fff', borderRadius: 8, padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 8, flex: 1 } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        h('div', { style: { textAlign: 'right' } },
          h('div', { style: { fontWeight: 700, fontSize: 22, color: 'var(--blue-700)' } }, articlesPct + '%'),
          articlesTotal != null && h('div', { style: { fontSize: 14, color: 'var(--text-900)', fontWeight: 400, marginTop: 2 } }, articlesTotal + ' Articles viewed'),
        ),
        h('svg', { width: 96, height: 96, viewBox: '0 0 100 100', style: { transform: 'rotate(-90deg)' } },
          // Purple (Videos) — right side, grows clockwise from top
          h('circle', {
            cx: 50, cy: 50, r,
            fill: 'none', stroke: '#a437c9', strokeWidth: 10,
            strokeLinecap: 'round',
            strokeDasharray: `${visible ? Math.max(0, vLen - gap * 2) : 0} ${C}`,
            strokeDashoffset: -gap,
            style: { transition: ease },
          }),
          // Blue (Articles) — grows clockwise starting after the videos slice
          h('circle', {
            cx: 50, cy: 50, r,
            fill: 'none', stroke: 'rgb(16,111,243)', strokeWidth: 10,
            strokeLinecap: 'round',
            strokeDasharray: `${visible ? Math.max(0, aLen - gap * 2) : 0} ${C}`,
            strokeDashoffset: -(vLen + gap),
            style: { transition: ease, transitionDelay: '80ms' },
          }),
        ),
        h('div', { style: { textAlign: 'left' } },
          h('div', { style: { fontWeight: 700, fontSize: 22, color: '#a437c9' } }, videosPct + '%'),
          videosTotal != null && h('div', { style: { fontSize: 14, color: 'var(--text-900)', fontWeight: 400, marginTop: 2 } }, videosTotal + ' Videos viewed'),
        ),
      ),
    )
  );
};

// ────────────────────────── Disciplines card (horizontal bars) ──────────────────────────
window.DisciplinesCard = function DisciplinesCard({ title, icon, tipText, disciplines, items, labelCol = 100, barHeight = 24 }) {
  const rows = items || disciplines || [];
  const max = Math.max(...rows.map(d => d.count), 1);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, icon, title),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { background: '#fff', borderRadius: 8, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8, flex: 1, justifyContent: 'center' } },
      rows.map((d, i) =>
        h('div', { key: d.name, style: { display: 'grid', gridTemplateColumns: labelCol + 'px 1fr auto', alignItems: 'center', gap: 12 } },
          h('span', { style: { fontSize: 14, color: 'var(--text-900)' } }, d.name),
          h('div', { style: { height: barHeight, background: 'transparent', borderRadius: 0, overflow: 'visible' } },
            h('div', { style: { height: '100%', background: 'rgb(16,111,243)', borderRadius: '0 8px 0 0', width: visible ? ((d.count / max) * 100) + '%' : '0%', transition: 'width 600ms cubic-bezier(0.2,0,0,1)', transitionDelay: (i * 80) + 'ms' } })
          ),
          h('span', { style: { fontWeight: 700, fontSize: 14, color: 'var(--text-900)' } }, typeof d.count === 'number' ? d.count.toLocaleString() : d.count),
        )
      )
    )
  );
};

// ────────────────────────── Time spent card (two rings) ──────────────────────────
window.TimeSpentCard = function TimeSpentCard({ title, icon, tipText, articleMin, videoMin }) {
  return h('div', { className: 'card card--tinted', style: { display: 'flex', flexDirection: 'column' } },
    h('div', { className: 'card-head' },
      h('div', { className: 'card-title' }, icon, title),
      h(window.InfoTip, { text: tipText }),
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8, flex: 1 } },
      [{ v: articleMin, label: 'Average minutes per article' }, { v: videoMin, label: 'Average minutes per video' }].map((t, i) =>
        h('div', { key: i, style: { background: '#fff', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 } },
          h(window.Ring, { value: t.v, label: t.v, pct: (t.v / 60) * 100 }),
          h('div', { style: { fontSize: 13, color: 'var(--text-900)', textAlign: 'center', lineHeight: 1.3 } }, t.label)
        )
      )
    )
  );
};
})();
