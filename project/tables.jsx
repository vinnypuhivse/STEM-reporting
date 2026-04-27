// Tables: Student activity (STEM + ELA), Reading skills (ELA).
(function() {
const { createElement: h, useState, useMemo } = React;
const I = window.Icons;
const Sort = window.SortGlyph;
const STUDENT_URLS = { 'Sarah Camacho': 'https://stem-reporting.vercel.app/' };
function NameCell({ name, className }) {
  const url = STUDENT_URLS[name];
  return h('td', { className },
    url ? h('a', { href: url, target: '_blank', rel: 'noopener noreferrer', style: { color: 'var(--blue-600)', textDecoration: 'none', fontWeight: 500 } }, name) : name
  );
}

// Build a sortable column header
function Th({ label, sub, width, onSort, sortKey, current, info }) {
  const active = current && current.key === sortKey;
  return h('th', { style: { width } },
    h('button', {
      onClick: () => onSort(sortKey),
      style: { display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'inherit', fontWeight: 700, color: 'inherit', fontSize: 14 }
    }, label, h(Sort)),
    sub && h('span', { className: 'sub' }, sub, info && h(window.InfoTip, { text: info, below: true })),
  );
}

function useSort(rows, initial = { key: 'name', dir: 'asc' }) {
  const [sort, setSort] = useState(initial);
  const sorted = useMemo(() => {
    const out = [...rows];
    out.sort((a, b) => {
      const va = a[sort.key]; const vb = b[sort.key];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number') return sort.dir === 'asc' ? va - vb : vb - va;
      return sort.dir === 'asc' ? String(va).localeCompare(vb) : String(vb).localeCompare(va);
    });
    return out;
  }, [rows, sort]);
  function toggle(key) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }
  return [sorted, sort, toggle];
}

function Pagination({ page, setPage, pageSize, setPageSize, total }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return h('div', { className: 'table-foot' },
    h('div', { className: 'left' },
      h('span', null, 'Rows per page:'),
      h(window.Dropdown, {
        ariaLabel: 'Rows per page',
        size: 'sm',
        value: String(pageSize),
        options: ['25', '35', '50'],
        onChange: (v) => setPageSize(+v),
      }),
      h('span', null, `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`)
    ),
    h('div', null,
      h('button', { className: 'page-btn', disabled: page === 1, onClick: () => setPage(1) }, h(I.ChevronLeftStop, { size: 16 })),
      h('button', { className: 'page-btn', disabled: page === 1, onClick: () => setPage(page - 1) }, h(I.ChevronLeft, { size: 16 })),
      h('span', { style: { padding: '0 8px' } }, `Page ${page} of ${pages}`),
      h('button', { className: 'page-btn', disabled: page >= pages, onClick: () => setPage(page + 1) }, h(I.ChevronRight, { size: 16 })),
      h('button', { className: 'page-btn', disabled: page >= pages, onClick: () => setPage(pages) }, h(I.ChevronRightStop, { size: 16 })),
    )
  );
}

// ────────────────────────── Student activity table (STEM variant) ──────────────────────────
window.StemStudentTable = function StemStudentTable({ students }) {
  const [sorted, sort, toggle] = useSort(students, { key: 'name', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const rows = sorted.slice((page - 1) * pageSize, page * pageSize);

  return h('div', { className: 'table-wrap' },
    h('div', { className: 'table-scroll' },
      h('table', { className: 'data' },
        h('thead', null,
          h('tr', null,
            h(Th, { label: 'Student', sortKey: 'name', onSort: toggle, current: sort, width: 180 }),
            h(Th, { label: 'Text level', sub: 'Average Lexile of texts viewed', sortKey: 'lexile', onSort: toggle, current: sort, info: 'Average Lexile score of articles this student has read.' }),
            h(Th, { label: 'Date of last activity', sub: 'Latest data', sortKey: 'last', onSort: toggle, current: sort, info: 'Most recent time this student used Newsela.' }),
            h(Th, { label: 'Article views', sub: 'total views', sortKey: 'articleViews', onSort: toggle, current: sort, info: 'Count of articles opened in this range.' }),
            h(Th, { label: 'Active time', sub: 'Average time on article', sortKey: 'articleMin', onSort: toggle, current: sort, info: 'Average active minutes per article.' }),
            h(Th, { label: 'Video views', sub: 'total views', sortKey: 'videoViews', onSort: toggle, current: sort, info: 'Count of videos watched.' }),
            h(Th, { label: 'Active time', sub: 'Average time on video', sortKey: 'videoMin', onSort: toggle, current: sort, info: 'Average active minutes per video.' }),
          )
        ),
        h('tbody', null,
          rows.map(s => h('tr', { key: s.name },
            h(NameCell, { name: s.name, className: 'name-col' }),
            h('td', { className: 'grade-cell' }, `Grade ${s.grade} `, h('span', { className: 'lex' }, `— ${s.lexile}L`)),
            h('td', null, s.last),
            h('td', null, s.articleViews),
            h('td', null, s.articleMin === 0 ? '0 min' : `${s.articleMin} min`),
            h('td', null, s.videoViews),
            h('td', null, s.videoMin === 0 ? '0 min' : `${s.videoMin} min`),
          ))
        )
      )
    ),
    h(Pagination, { page, setPage, pageSize, setPageSize, total: students.length })
  );
};

// ────────────────────────── Student activity table (ELA variant) ──────────────────────────
window.ElaStudentTable = function ElaStudentTable({ students }) {
  const [sorted, sort, toggle] = useSort(students, { key: 'name', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const rows = sorted.slice((page - 1) * pageSize, page * pageSize);

  return h('div', { className: 'table-wrap' },
    h('div', { className: 'table-scroll' },
      h('table', { className: 'data' },
        h('thead', null,
          h('tr', null,
            h(Th, { label: 'Student', sortKey: 'name', onSort: toggle, current: sort }),
            h(Th, { label: 'Text level', sub: 'Average Lexile of texts viewed', sortKey: 'lexile', onSort: toggle, current: sort }),
            h(Th, { label: 'Date of last activity', sub: 'Latest data', sortKey: 'last', onSort: toggle, current: sort }),
            h(Th, { label: 'Article views', sub: 'total views', sortKey: 'articleViews', onSort: toggle, current: sort }),
            h(Th, { label: 'Quizzes', sub: 'attempts', sortKey: 'quizCount', onSort: toggle, current: sort }),
            h(Th, { label: 'Avg. score', sub: 'quiz average', sortKey: 'avgScore', onSort: toggle, current: sort }),
            h(Th, { label: 'Write prompts', sub: 'attempts', sortKey: 'writeCount', onSort: toggle, current: sort }),
            h(Th, { label: 'Active time', sub: 'Average time per article', sortKey: 'articleMin', onSort: toggle, current: sort }),
          )
        ),
        h('tbody', null,
          rows.map(s => h('tr', { key: s.name },
            h(NameCell, { name: s.name, className: 'name-col' }),
            h('td', { className: 'grade-cell' }, `Grade ${s.grade} `, h('span', { className: 'lex' }, `— ${s.lexile}L`)),
            h('td', null, s.last),
            h('td', null, s.articleViews),
            h('td', null, s.quizCount),
            h('td', null, s.avgScore == null ? 'N/A' : s.avgScore + '%'),
            h('td', null, s.writeCount),
            h('td', null, s.articleMin === 0 ? '0 min' : `${s.articleMin} min`),
          ))
        )
      )
    ),
    h(Pagination, { page, setPage, pageSize, setPageSize, total: students.length })
  );
};

// ────────────────────────── Reading skills table (ELA only) ──────────────────────────
// Stable pseudo-random question count per (name, skill index) so the UI looks real.
function qCount(name, i, pct) {
  if (pct == null) return 0;
  let hash = i * 31 + 7;
  for (let k = 0; k < name.length; k++) hash = (hash * 33 + name.charCodeAt(k)) >>> 0;
  // Sample plausible question counts; weighted toward 4/6/10/12.
  const pool = [4, 6, 8, 10, 12, 12, 6, 10];
  return pool[hash % pool.length];
}
function SkillCell({ v, questions, average = false }) {
  const zero = v === 0;
  const na = v == null;
  const cls = 'skill-cell' + (average ? ' avg' : na ? ' na' : zero ? ' zero' : '');
  const pctText = na ? 'N/A' : v + '%';
  const subText = average ? 'Newsela average'
    : na ? '0 questions'
    : (questions === 1 ? '1 question' : questions + ' questions');
  return h('div', { className: cls },
    h('div', { className: 'pct' }, pctText),
    h('div', { className: 'barline' },
      !na && h('div', { className: 'fill', style: { width: (v || 0) + '%' } })
    ),
    h('div', { className: 'sub' }, subText)
  );
}
// Expose for average row
window.__SkillCell = SkillCell;
window.__qCount = qCount;

window.ReadingSkillsTable = function ReadingSkillsTable({ students, skills }) {
  const [sorted, sort, toggle] = useSort(students, { key: 'name', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const rows = sorted.slice((page - 1) * pageSize, page * pageSize);
  return h('div', { className: 'table-wrap' },
    h('div', { className: 'table-scroll' },
      h('table', { className: 'data', style: { minWidth: 1200 } },
        h('thead', null,
          h('tr', null,
            h(Th, { label: 'Student', sortKey: 'name', onSort: toggle, current: sort, width: 180 }),
            skills.map((s, i) =>
              h('th', { key: s, style: { minWidth: 140, verticalAlign: 'top' } },
                h('div', { style: { fontWeight: 700, fontSize: 14, lineHeight: 1.3 } }, s, ' ', h(window.InfoTip, { text: `Quiz performance on "${s}".`, below: true }))
              )
            )
          )
        ),
        h('tbody', null,
          // Newsela-average row — green-accent row shown once at top of body
          h('tr', { className: 'avg-row' },
            h('td', { className: 'name-col' }),
            skills.map((_, i) => h('td', { key: i },
              h(SkillCell, { v: 50, average: true })
            ))
          ),
          rows.map(s => h('tr', { key: s.name },
            h(NameCell, { name: s.name, className: 'name-col name-link' }),
            s.skills.map((v, i) => h('td', { key: i },
              h(SkillCell, { v, questions: qCount(s.name, i, v) })
            ))
          ))
        )
      )
    ),
    h(Pagination, { page, setPage, pageSize, setPageSize, total: students.length })
  );
};

})();
