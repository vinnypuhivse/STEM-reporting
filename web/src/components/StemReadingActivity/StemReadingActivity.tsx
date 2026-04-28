import styles from "./StemReadingActivity.module.css";
import Select from "@/components/Select/Select";

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12" />
    <path d="M6 11l6 6 6-6" />
    <path d="M4 21h16" />
  </svg>
);

const SortIcon = () => (
  <span style={{ display: "inline-flex", flexDirection: "column", gap: 2, verticalAlign: "middle", marginLeft: 4 }} aria-hidden="true">
    <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M5 0 l5 6 H0 z" /></svg>
    <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor"><path d="M5 6 l5 -6 H0 z" /></svg>
  </span>
);

const FirstPageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
);

const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const rows = [
  {
    article: "Mars rover discovers ancient river delta on the red planet",
    thumb: "/images/article-1.svg",
    skills: ["Scientific reasoning", "Data interpretation"],
    lexile: "1010 L",
    grade: "Grade 7",
    viewed: "9/5/23",
    time: "15 min",
    quiz: "100%",
    write: "2",
    annotations: "3",
    powerWords: "90%",
    lastActivity: "04/15/2026 at 5:02 pm",
  },
  {
    article: "Scientists grow human organs in pig embryos for the first time",
    thumb: "/images/article-2.svg",
    skills: ["Connecting ideas", "Word meaning & choice"],
    lexile: "980 L",
    grade: "Grade 7",
    viewed: "9/6/23",
    time: "11 min",
    quiz: "75%",
    write: "—",
    annotations: "1",
    powerWords: "80%",
    lastActivity: "04/13/2026 at 8:26 am",
  },
  {
    article: "Astronomers detect water vapor in atmosphere of distant exoplanet",
    thumb: "/images/article-3.svg",
    skills: ["Scientific reasoning", "Text structure"],
    lexile: "1040 L",
    grade: "Grade 8",
    viewed: "9/12/23",
    time: "13 min",
    quiz: "50%",
    write: "Ungraded",
    annotations: "2",
    powerWords: "—",
    lastActivity: "04/14/2026 at 1:30 pm",
  },
  {
    article: "CRISPR gene editing used to treat sickle-cell disease in trial",
    thumb: "/images/article-4.svg",
    skills: ["Arguments & claims", "Word meaning & choice"],
    lexile: "950 L",
    grade: "Grade 7",
    viewed: "9/12/23",
    time: "16 min",
    quiz: "100%",
    write: "1",
    annotations: "—",
    powerWords: "100%",
    lastActivity: "04/15/2026 at 1:47 pm",
  },
  {
    article: "Engineers design solar-powered desalination device for clean water",
    thumb: "/images/article-5.svg",
    skills: ["Scientific reasoning", "Main idea & summarization"],
    lexile: "900 L",
    grade: "Grade 6",
    viewed: "9/13/23",
    time: "9 min",
    quiz: "75%",
    write: "—",
    annotations: "1",
    powerWords: "80%",
    lastActivity: "04/13/2026 at 9:20 am",
  },
  {
    article: "New species of deep-sea fish discovered near hydrothermal vents",
    thumb: "/images/article-6.svg",
    skills: ["Point of view & purpose", "Word meaning & choice"],
    lexile: "870 L",
    grade: "Grade 6",
    viewed: "9/14/23",
    time: "10 min",
    quiz: "50%",
    write: "—",
    annotations: "—",
    powerWords: "—",
    lastActivity: "N/A",
  },
  {
    article: "AI model predicts protein structures with near-perfect accuracy",
    thumb: "/images/article-7.svg",
    skills: ["Connecting ideas", "Data interpretation"],
    lexile: "1060 L",
    grade: "Grade 8",
    viewed: "9/15/23",
    time: "18 min",
    quiz: "100%",
    write: "—",
    annotations: "—",
    powerWords: "—",
    lastActivity: "04/14/2026 at 4:33 pm",
  },
];

function SortableHeader({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles.thSort}>
      {children} <SortIcon />
    </span>
  );
}

export default function StemReadingActivity() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>Student activity</h2>
        <a className={styles.downloadLink} href="#">
          <DownloadIcon />
          <span className={styles.underline}>Download as .csv</span>
        </a>
      </div>
      <p className={styles.sub}>
        See Sarah&rsquo;s overall reading activity across STEM content.
      </p>

      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table} aria-label="STEM reading activity">
            <thead>
              <tr>
                <th style={{ width: "18%" }}>
                  <SortableHeader>Content</SortableHeader>
                </th>
<th style={{ width: "10%" }}>
                  <SortableHeader>Text level</SortableHeader>
                  <div className={styles.subLabel}>Average Lexile of texts viewed</div>
                </th>
                <th style={{ width: "13%" }}>
                  <SortableHeader>Date of last activity</SortableHeader>
                  <div className={styles.subLabel}>Latest data ⓘ</div>
                </th>
                <th style={{ width: "10%" }}>
                  <SortableHeader>Active time</SortableHeader>
                  <div className={styles.subLabel}>Time on article</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>
                    <div className={styles.articleCell}>
                      <div className={styles.thumb} aria-hidden="true">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={row.thumb} alt="" className={styles.thumbImg} />
                      </div>
                      <a href="#" className={styles.articleLink}>{row.article}</a>
                    </div>
                  </td>
<td>
                    <span className={styles.bold}>{row.lexile}</span>
                    <br />
                    <span className={styles.muted}>{row.grade}</span>
                  </td>
                  <td>{row.lastActivity}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <div className={styles.footerLeft}>
            <span>Show activity rows</span>
            <Select options={["10", "25", "50"]} size="small" aria-label="Rows per page" />
          </div>
          <div className={styles.pager}>
            <button className={styles.pagerBtn} disabled aria-label="First page">
              <FirstPageIcon />
            </button>
            <button className={styles.pagerBtn} disabled aria-label="Previous page">
              <PrevIcon />
            </button>
            <span>1 – 7 of 12</span>
            <button className={styles.pagerBtn} aria-label="Next page">
              <NextIcon />
            </button>
          </div>
        </div>
      </div>{/* end tableCard */}
    </section>
  );
}
