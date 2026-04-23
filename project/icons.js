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
  Books: function Books(props) {
    const size = props.size || 24;
    return h('svg', { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', ...props },
      h('path', {
        fill: 'currentColor',
        d: 'M19.7754 4.03902C20.8133 3.66148 21.9611 4.19649 22.3389 5.23433L29.1787 24.0283C29.5565 25.0662 29.0214 26.214 27.9834 26.5918L24.2246 27.9599C23.1867 28.3376 22.0389 27.8025 21.6611 26.7646L17 13.957V26C16.9998 27.1044 16.1045 28 15 28H11C10.6352 28 10.2944 27.9 10 27.7295C9.70554 27.9001 9.36481 28 9 28H5C3.89545 28 3.00002 27.1045 3 26V5.99996C3 4.89539 3.89543 3.99996 5 3.99996H9C9.36434 3.99996 9.70482 4.09927 9.99902 4.26949C10.2936 4.09871 10.635 3.99996 11 3.99996H15C15.7896 3.99996 16.4698 4.45853 16.7949 5.12301L19.7754 4.03902ZM22.2412 22.5117L23.541 26.08L27.2998 24.7119L26.001 21.1435L22.2412 22.5117ZM5 23V26H9V23H5ZM11 23V26H15V23H11ZM5 21H9V11H5V21ZM11 21H15V11H11V21ZM18.6934 12.7627L21.5576 20.6318L25.3164 19.2636L22.4521 11.3945L18.6934 12.7627ZM17 7.17672V8.10933L18.0098 10.8837L21.7676 9.51558L20.459 5.9189L17 7.17672ZM5 8.99996H9V5.99996H5V8.99996ZM11 8.99996H15V8.4609L14.8213 7.97066C14.6035 7.37235 14.6896 6.73806 15 6.23531V5.99996H11V8.99996Z'
      })
    );
  },
  Details: function Details(props) {
    const size = props.size || 24;
    return h('svg', { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', ...props },
      h('path', {
        fill: 'currentColor',
        d: 'M21 3C22.1046 3 23 3.89543 23 5V11.8037C24.7932 12.8412 26 14.7793 26 17C26 18.5515 25.4108 19.9652 24.4443 21.0303L28.707 25.293C29.0976 25.6835 29.0976 26.3165 28.707 26.707C28.3165 27.0976 27.6835 27.0976 27.293 26.707L23 22.4141V27C23 28.1046 22.1046 29 21 29H5C3.89543 29 3 28.1046 3 27V5C3 3.89543 3.89543 3 5 3H21ZM5 27H21V22.915C20.6747 22.9696 20.3408 23 20 23C19.2263 23 18.4877 22.8516 17.8086 22.585C17.6269 22.8357 17.3333 23 17 23H9C8.44772 23 8 22.5523 8 22C8 21.4477 8.44772 21 9 21H15.5293C14.5788 19.9384 14 18.5371 14 17H9C8.44772 17 8 16.5523 8 16C8 15.4477 8.44772 15 9 15H14.3428C15.1666 12.6698 17.3877 11 20 11C20.3408 11 20.6747 11.0294 21 11.084V5H5V27ZM20 13C17.7909 13 16 14.7909 16 17C16 19.2091 17.7909 21 20 21C22.2091 21 24 19.2091 24 17C24 14.7909 22.2091 13 20 13ZM17 9C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H9C8.44772 11 8 10.5523 8 10C8 9.44772 8.44772 9 9 9H17Z'
      })
    );
  },
  Time: function Time(props) {
    const size = props.size || 24;
    return h('svg', { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', ...props },
      h('path', {
        fill: 'currentColor',
        d: 'M16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16C3 8.8203 8.8203 3 16 3ZM16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM16 10C16.5523 10 17 10.4477 17 11V15.5859L20.707 19.293C21.0975 19.6835 21.0975 20.3165 20.707 20.707C20.3165 21.0975 19.6835 21.0975 19.293 20.707L15 16.4141V11C15 10.4477 15.4477 10 16 10Z'
      })
    );
  },
  Insights: function Insights(props) {
    const size = props.size || 24;
    return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', ...props },
      h('path', {
        fillRule: 'evenodd', clipRule: 'evenodd', fill: 'currentColor',
        d: 'M3 2.75C3.55228 2.75 3.99999 3.19772 4 3.75V20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H2V3.75C2.00001 3.19772 2.44772 2.75 3 2.75ZM7.5 10.25C8.05228 10.25 8.49999 10.6977 8.5 11.25V16.5C8.5 17.0523 8.05228 17.5 7.5 17.5C6.94772 17.5 6.5 17.0523 6.5 16.5V11.25C6.50001 10.6977 6.94772 10.25 7.5 10.25ZM12.75 4.25C13.3023 4.25 13.75 4.69772 13.75 5.25V16.5C13.75 17.0523 13.3023 17.5 12.75 17.5C12.1977 17.5 11.75 17.0523 11.75 16.5V5.25C11.75 4.69772 12.1977 4.25 12.75 4.25ZM18 7.25C18.5523 7.25 19 7.69772 19 8.25V16.5C19 17.0523 18.5523 17.5 18 17.5C17.4477 17.5 17 17.0523 17 16.5V8.25C17 7.69772 17.4477 7.25 18 7.25Z'
      })
    );
  },
  Clock: makeIcon([
    h('circle', { key: 'c', cx: 12, cy: 12, r: 9 }),
    h('path', { key: 'p', d: 'M12 7 v5 l3.5 2' }),
  ]),
  TrendUp: makeIcon([
    h('path', { key: 'p1', d: 'M3 17 l6 -6 4 4 8 -8' }),
    h('path', { key: 'p2', d: 'M14 7 h7 v7' }),
  ]),
  Info: function Info(props) {
    const size = props.size || 24;
    return h('svg', { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', ...props },
      h('path', {
        fill: 'currentColor',
        d: 'M16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16C3 8.8203 8.8203 3 16 3ZM16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM16 15C16.5523 15 17 15.4477 17 16V23C17 23.5523 16.5523 24 16 24C15.4477 24 15 23.5523 15 23V16C15 15.4477 15.4477 15 16 15ZM16 8C16.5523 8 17 8.44772 17 9V10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10V9C15 8.44772 15.4477 8 16 8Z'
      })
    );
  },
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
