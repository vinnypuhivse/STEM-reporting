// Nav + sidebar + breadcrumbs + shared building blocks.
(function() {
const h = React.createElement;
const I = window.Icons;

// ────────────────────────── Newsela wordmark SVG ──────────────────────────
function NewselaMark() {
  return h('svg', { width: 32, height: 32, viewBox: '0 0 32 32', 'aria-hidden': true },
    h('path', {
      d: 'M 32 32 L 0 32 L 0 0 L 32 0 L 32 32 Z M 15.145 26.95 L 5.023 26.95 L 5.023 5.023 L 15.145 5.023 L 15.145 26.95 Z M 26.976 26.974 L 16.83 26.974 L 16.83 5.047 L 21.928 5.047 C 24.708 5.047 26.976 7.315 26.976 10.096 L 26.976 26.974 Z',
      fill: 'rgb(16,111,243)', fillRule: 'evenodd',
    })
  );
}
function NewselaWord() {
  // simplified wordmark
  return h('span', {
    style: { fontFamily: 'Circular', fontWeight: 700, fontSize: 22, color: 'rgb(16,111,243)', letterSpacing: '-0.5px' }
  }, 'newsela');
}

// ────────────────────────── Top navigation ──────────────────────────
window.TopNav = function TopNav({ onMenuToggle }) {
  return h('header', { className: 'nav' },
    h('button', { className: 'nav-mobile-toggle', onClick: onMenuToggle, 'aria-label': 'Menu' },
      h(I.Menu, { size: 22 })
    ),
    h('a', { href: '#', className: 'nav-logo', 'aria-label': 'Newsela home' },
      h(NewselaMark),
      h(NewselaWord)
    ),
    h('nav', { className: 'nav-center' },
      h('button', { className: 'nav-item search-item' },
        h(I.Search, { size: 18 }), 'Search'
      ),
      h('button', { className: 'nav-item' },
        'Browse ', h(I.ChevronDown, { size: 16 })
      ),
      h('button', { className: 'nav-item' },
        'Your Content ', h(I.ChevronDown, { size: 16 })
      ),
      h('button', { className: 'nav-item' }, 'Assignments'),
      h('button', { className: 'nav-item' },
        'Reports ', h(I.ChevronDown, { size: 16 })
      ),
    ),
    h('div', { className: 'nav-right' },
      h('span', { className: 'nav-educator' }, h('span', null, 'Educator Center'), h(I.ChevronDown, { size: 14 })),
      h('div', { className: 'nav-avatar' }, 'DG'),
      h(I.ChevronDown, { size: 14 })
    )
  );
};

// ────────────────────────── Sidebar ──────────────────────────
window.Sidebar = function Sidebar({ open, onClose }) {
  return h('aside', { className: 'sidebar' + (open ? ' open' : '') },
    h('p', { className: 'sidebar-label' }, 'REPORTS'),
    h('a', { href: '#', className: 'sidebar-item active', onClick: (e) => e.preventDefault() }, 'Classroom data'),
    h('a', { href: '#', className: 'sidebar-item', onClick: (e) => e.preventDefault() }, 'Power words'),
    h('a', { href: '#', className: 'sidebar-item', onClick: (e) => e.preventDefault() }, 'Usage report'),
  );
};

// ────────────────────────── Breadcrumb ──────────────────────────
window.Breadcrumb = function Breadcrumb() {
  return h('nav', { className: 'breadcrumb', 'aria-label': 'Breadcrumb' },
    h('a', { href: '#', onClick: (e) => e.preventDefault() }, 'Reports'),
    h('span', { className: 'sep' }, '/'),
    h('span', { className: 'cur' }, 'Classroom data'),
  );
};

// ────────────────────────── Tabs ──────────────────────────
window.Tabs = function Tabs({ value, onChange, tabs }) {
  return h('div', { className: 'tabs', role: 'tablist' },
    tabs.map(t =>
      h('button', {
        key: t.id,
        role: 'tab',
        'aria-selected': value === t.id,
        className: 'tab' + (value === t.id ? ' active' : ''),
        onClick: () => onChange(t.id),
      },
        t.icon
          ? h('span', { className: 'tab-icon', 'aria-hidden': true }, t.icon)
          : h('span', { className: 'tab-dot', 'aria-hidden': true }, h(I.Check, { size: 16 })),
        t.label
      )
    )
  );
};

// ────────────────────────── Filter row ──────────────────────────
window.Filters = function Filters({ filters, setFilters }) {
  const D = window.REPORT_DATA;
  const makeFilter = (label, key, options, wide) =>
    h('div', { className: 'filter' + (wide ? ' wide' : '') },
      h('label', { className: 'filter-label', htmlFor: 'filter-' + key }, label),
      h('select', {
        id: 'filter-' + key,
        className: 'filter-input',
        value: filters[key],
        onChange: (e) => setFilters(f => ({ ...f, [key]: e.target.value })),
      },
        options.map(o => h('option', { key: o, value: o }, o))
      )
    );
  return h('div', { className: 'filters' },
    makeFilter('Select School', 'school', D.schools, true),
    makeFilter('Select activity', 'activity', D.activities),
    makeFilter('Date Range', 'dateRange', D.dateRanges),
  );
};

// ────────────────────────── Download button ──────────────────────────
window.DownloadBtn = function DownloadBtn({ label = 'Download as .csv' }) {
  return h('button', { className: 'btn-ghost' },
    h(I.Download, { size: 18 }), label
  );
};

// ────────────────────────── Info icon with tooltip ──────────────────────────
window.InfoTip = function InfoTip({ text }) {
  return h('span', { className: 'tip', tabIndex: 0 },
    h(I.Info, { size: 16 }),
    h('span', { className: 'tip-body', role: 'tooltip' }, text)
  );
};
})();
