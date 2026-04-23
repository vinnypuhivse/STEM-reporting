// Main App: assembles ELA + STEM tabs.
(function() {
const { createElement: h, useState } = React;
const I = window.Icons;

function StemPanel({ data }) {
  const stem = data.stemOverview;
  return h('div', null,
    // Section: STEM overview
    h('section', { className: 'section' },
      h('div', { className: 'section-head' },
        h('h2', null, 'STEM overview')
      ),
      h('p', { className: 'section-sub' }, 'Get data related on how your students activities are doing on Newsela.'),
      h('div', { className: 'ela-four-col', style: { marginBottom: 16 } },
        h(window.DisciplinesCard, {
          icon: h(I.Chart, { size: 22 }),
          title: 'Student activity',
          tipText: 'Summary counts of students and content engagement.',
          items: stem.studentActivity,
          labelCol: 170,
        }),
        h(window.DonutCard, {
          icon: h(I.Chart, { size: 22 }),
          title: 'Content breakdown',
          tipText: 'Proportion of articles vs videos consumed by your class.',
          articlesPct: stem.articlesPct,
          videosPct: stem.videosPct,
          articlesTotal: stem.articlesTotal,
          videosTotal: stem.videosTotal,
          subLabel: 'Articles vs Video usage',
        }),
        h(window.DisciplinesCard, {
          icon: h(I.Article, { size: 22 }),
          title: 'STEM Disciplines',
          tipText: 'Count of content pieces engaged with by STEM discipline.',
          disciplines: stem.disciplines,
        }),
        h(window.TimeSpentCard, {
          icon: h(I.Article, { size: 22 }),
          title: 'Time spent',
          tipText: 'Average active minutes per article and per video.',
          articleMin: stem.articleAvgMin,
          videoMin: stem.videoAvgMin,
        }),
      ),
    ),
    h('section', { className: 'section' },
      h('div', { className: 'section-head' },
        h('h2', null, 'Student activity'),
        h(window.DownloadBtn)
      ),
      h('p', { className: 'section-sub' }, "See students' overall activity across Newsela."),
      h(window.StemStudentTable, { students: data.students })
    ),
  );
}

function ElaPanel({ data, elaSvg }) {
  const ela = data.elaOverview;
  return h('div', null,
    h('section', { className: 'section' },
      h('div', { className: 'section-head' },
        h('h2', null, 'ELA overview')
      ),
      h('p', { className: 'section-sub' }, 'Get a rapid snapshot of how your students are reading on Newsela.'),
      h('div', { className: 'ela-four-col' },
        h(window.DisciplinesCard, {
          icon: h(I.Chart, { size: 22 }),
          title: 'Student activity',
          tipText: 'Summary counts of students and content engagement.',
          items: ela.studentActivity,
          labelCol: 170,
        }),
        h(window.AvgReadingLevelCard, {
          tipText: 'Average grade level and Lexile for texts viewed by your class.',
          avgLevel: ela.avgLevel,
          avgLevelSub: ela.avgLevelSub,
          avgLexile: ela.avgLexile,
          avgLexileSub: ela.avgLexileSub,
        }),
        h(window.ReadingTotalsCard, {
          tipText: 'Total texts viewed and average time per article.',
          totalTexts: ela.totalTexts,
          avgMinPerArticle: ela.avgMinPerArticle,
          elaIconHtml: elaSvg,
        }),
        h(window.TextsByLevelCard, {
          tipText: 'Distribution of texts read at, above, or below grade level.',
          textsByLevel: ela.textsByLevel,
        }),
      ),
      h('div', { style: { height: 16 } }),
    ),
    h('section', { className: 'section' },
      h('div', { className: 'section-head' },
        h('h2', null, 'Reading skills'),
        h(window.DownloadBtn)
      ),
      h('p', { className: 'section-sub' }, 'Use the table below to see student quiz performance in all 8 reading skills.'),
      h(window.ReadingSkillsTable, { students: data.students, skills: data.readingSkills })
    ),
    h('section', { className: 'section' },
      h('div', { className: 'section-head' },
        h('h2', null, 'Reading activity'),
        h(window.DownloadBtn)
      ),
      h('p', { className: 'section-sub' }, "See students' overall reading activity across Newsela."),
      h(window.ElaStudentTable, { students: data.students })
    ),
  );
}

function App() {
  const data = window.REPORT_DATA;
  const [tab, setTab] = useState(() => localStorage.getItem('classroomTab') || 'stem');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [elaSvg, setElaSvg] = useState('');
  const [stemSvg, setStemSvg] = useState('');
  React.useEffect(() => {
    fetch('assets/ela-detail.svg').then(r => r.text()).then(setElaSvg);
    fetch('assets/stem-logo.svg').then(r => r.text()).then(setStemSvg);
  }, []);
  const [filters, setFilters] = useState({
    school: data.schools[0],
    activity: data.activities[0],
    dateRange: data.dateRanges[0],
  });
  function changeTab(v) {
    setTab(v); localStorage.setItem('classroomTab', v);
  }
  return h(React.Fragment, null,
    h(window.TopNav, { onMenuToggle: () => setSidebarOpen(o => !o) }),
    h('div', { className: 'layout' },
      h(window.Sidebar, { open: sidebarOpen }),
      h('main', { className: 'main' },
        h(window.Breadcrumb),
        h('h1', { className: 'page-title' }, 'Classroom data'),
        h(window.Tabs, {
          value: tab, onChange: changeTab,
          tabs: [
            { id: 'ela', label: 'ELA', icon: h('span', { className: 'tab-svg', dangerouslySetInnerHTML: { __html: elaSvg } }) },
            { id: 'stem', label: 'STEM', icon: h('span', { className: 'tab-svg', dangerouslySetInnerHTML: { __html: stemSvg } }) },
          ],
        }),
        h(window.Filters, { filters, setFilters }),
        tab === 'stem' ? h(StemPanel, { data }) : h(ElaPanel, { data, elaSvg }),
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(h(App));

// Mount Tweaks panel into its own root
if (window.TweaksPanel) {
  const tweakHost = document.createElement('div');
  document.body.appendChild(tweakHost);
  const defaults = window.__TWEAKS || { hue: 215, sat: 92, lightDelta: 0, dark: false };
  // Apply saved tweak defaults immediately so page reflects them before panel activates
  if (window.__applyTweaks) window.__applyTweaks(defaults);
  ReactDOM.createRoot(tweakHost).render(h(window.TweaksPanel, { defaults }));
}
})();
