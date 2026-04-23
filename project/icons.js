// Icons used across the report, as React components.
// Kept stroke-based + 24×24 to match Angelou iconography.

const { createElement: h } = React;

function makeIcon(paths, viewBox = '0 0 24 24') {
  return function Icon(props) {
    const size = props.size || 24;
    return h('svg', {
      width: size, height: size, viewBox,
      fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round',
      ...props,
    }, paths);
  };
}

window.Icons = {
  Book: makeIcon([
    h('path', { key: 'b1', d: 'M4 4.5 A1.5 1.5 0 0 1 5.5 3 H11 V20 H5.5 A1.5 1.5 0 0 1 4 18.5 Z' }),
    h('path', { key: 'b2', d: 'M20 4.5 A1.5 1.5 0 0 0 18.5 3 H13 V20 H18.5 A1.5 1.5 0 0 0 20 18.5 Z' }),
    h('path', { key: 'b3', d: 'M12 3 V20' }),
  ]),
  Article: makeIcon([
    h('rect', { key: 'r', x: 3.5, y: 4, width: 17, height: 16, rx: 2 }),
    h('path', { key: 'l1', d: 'M7 9 h10' }),
    h('path', { key: 'l2', d: 'M7 13 h10' }),
    h('path', { key: 'l3', d: 'M7 17 h6' }),
  ]),
  Video: makeIcon([
    h('rect', { key: 'r', x: 3, y: 6, width: 13, height: 12, rx: 2 }),
    h('path', { key: 'p', d: 'M16 10 l5 -2.5 v9 l-5 -2.5z' }),
  ]),
  Chart: makeIcon([
    h('path', { key: 'p1', d: 'M4 20 V10' }),
    h('path', { key: 'p2', d: 'M10 20 V4' }),
    h('path', { key: 'p3', d: 'M16 20 V14' }),
    h('path', { key: 'p4', d: 'M22 20 V7' }),
  ]),
  Clock: makeIcon([
    h('circle', { key: 'c', cx: 12, cy: 12, r: 9 }),
    h('path', { key: 'p', d: 'M12 7 v5 l3.5 2' }),
  ]),
  TrendUp: makeIcon([
    h('path', { key: 'p1', d: 'M3 17 l6 -6 4 4 8 -8' }),
    h('path', { key: 'p2', d: 'M14 7 h7 v7' }),
  ]),
  Info: makeIcon([
    h('circle', { key: 'c', cx: 12, cy: 12, r: 9 }),
    h('path', { key: 'p', d: 'M12 11 v5.5' }),
    h('circle', { key: 'd', cx: 12, cy: 8, r: 0.8, fill: 'currentColor' }),
  ]),
  Download: makeIcon([
    h('path', { key: 'p', d: 'M12 4 v11 m-4 -4 l4 4 4 -4' }),
    h('path', { key: 'p2', d: 'M5 20 h14' }),
  ]),
  Check: makeIcon([
    h('circle', { key: 'c', cx: 12, cy: 12, r: 9, fill: 'currentColor', stroke: 'none' }),
    h('path', { key: 'p', d: 'M8 12.5 l3 3 5 -6', stroke: '#fff' }),
  ]),
  Search: makeIcon([
    h('circle', { key: 'c', cx: 11, cy: 11, r: 6 }),
    h('path', { key: 'p', d: 'M20 20 l-4.5 -4.5' }),
  ]),
  ChevronDown: makeIcon([h('path', { key: 'p', d: 'M6 9 l6 6 6 -6' })]),
  ChevronRight: makeIcon([h('path', { key: 'p', d: 'M9 6 l6 6 -6 6' })]),
  ChevronLeft: makeIcon([h('path', { key: 'p', d: 'M15 6 l-6 6 6 6' })]),
  ChevronLeftStop: makeIcon([
    h('path', { key: 'p', d: 'M15 6 l-6 6 6 6' }),
    h('path', { key: 'l', d: 'M5 5 v14' }),
  ]),
  ChevronRightStop: makeIcon([
    h('path', { key: 'p', d: 'M9 6 l6 6 -6 6' }),
    h('path', { key: 'l', d: 'M19 5 v14' }),
  ]),
  Slash: makeIcon([h('path', { key: 'p', d: 'M15 5 l-6 14' })]),
  Menu: makeIcon([
    h('path', { key: 'p1', d: 'M4 7 h16' }),
    h('path', { key: 'p2', d: 'M4 12 h16' }),
    h('path', { key: 'p3', d: 'M4 17 h16' }),
  ]),
  LevelSteps: makeIcon([
    h('path', { key: 'p1', d: 'M3 20 h4 v-5 h5 v-5 h5 v-5 h4' }),
    h('path', { key: 'p2', d: 'M3 20 h18', opacity: 0.4 }),
  ]),
  Gauge: makeIcon([
    h('path', { key: 'arc', d: 'M4 17 A8 8 0 0 1 20 17' }),
    h('path', { key: 'needle', d: 'M12 17 l4 -6' }),
    h('circle', { key: 'hub', cx: 12, cy: 17, r: 1.2, fill: 'currentColor', stroke: 'none' }),
  ]),
  Sort: makeIcon([
    h('path', { key: 'u', d: 'M8 6 l-3 3 h6 z', fill: 'currentColor', stroke: 'none' }),
    h('path', { key: 'd', d: 'M16 18 l-3 -3 h6 z', fill: 'currentColor', stroke: 'none' }),
  ]),
};

// Small chevron for table sort columns
window.SortGlyph = function SortGlyph() {
  return h('span', { className: 'sort', 'aria-hidden': true },
    h('svg', { width: 8, height: 5, viewBox: '0 0 10 6', fill: 'currentColor' },
      h('path', { d: 'M5 0 l5 6 H0 z' })
    ),
    h('svg', { width: 8, height: 5, viewBox: '0 0 10 6', fill: 'currentColor' },
      h('path', { d: 'M5 6 l5 -6 H0 z' })
    )
  );
};
