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
          ? h('span', { className: 'tab-icon tab-icon-' + t.id, 'aria-hidden': true }, t.icon)
          : h('span', { className: 'tab-dot', 'aria-hidden': true }, h(I.Check, { size: 16 })),
        t.label
      )
    )
  );
};

// ────────────────────────── Custom dropdown ──────────────────────────
// Matches Figma: white pill closed state, popover with left-edge accent bar on selected row.
window.Dropdown = function Dropdown({ value, options, onChange, ariaLabel, size = 'md', menuWidth }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return h('div', {
    className: 'dd' + (size === 'sm' ? ' dd--sm' : '') + (open ? ' is-open' : ''),
    ref,
  },
    h('button', {
      type: 'button',
      className: 'dd-btn',
      'aria-haspopup': 'listbox',
      'aria-expanded': open,
      'aria-label': ariaLabel,
      onClick: () => setOpen(o => !o),
    },
      h('span', { className: 'dd-val' }, value),
      h('span', { className: 'dd-caret', 'aria-hidden': true },
        h('svg', { width: 14, height: 14, viewBox: '0 0 20 20', fill: 'none' },
          h('path', { d: 'M5 7.5 L10 12.5 L15 7.5', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })
        )
      )
    ),
    open && h('div', { className: 'dd-menu', role: 'listbox', style: menuWidth ? { width: menuWidth } : null },
      options.map(opt =>
        h('button', {
          key: opt,
          type: 'button',
          role: 'option',
          'aria-selected': opt === value,
          className: 'dd-opt' + (opt === value ? ' is-selected' : ''),
          onClick: () => { onChange(opt); setOpen(false); },
        },
          h('span', { className: 'dd-opt-bar', 'aria-hidden': true }),
          h('span', { className: 'dd-opt-label' }, opt)
        )
      )
    )
  );
};

// ────────────────────────── Filter row ──────────────────────────
window.Filters = function Filters({ filters, setFilters }) {
  const D = window.REPORT_DATA;
  const makeFilter = (label, key, options, wide) =>
    h('div', { className: 'filter' + (wide ? ' wide' : '') },
      h('label', { className: 'filter-label' }, label),
      h(window.Dropdown, {
        ariaLabel: label,
        value: filters[key],
        options,
        onChange: (v) => setFilters(f => ({ ...f, [key]: v })),
      })
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
window.InfoTip = function InfoTip({ text, below }) {
  return h('span', { className: 'tip' + (below ? ' tip--below' : ''), tabIndex: 0 },
    h(I.Info, { size: 16 }),
    h('span', { className: 'tip-body', role: 'tooltip' }, text)
  );
};
})();
