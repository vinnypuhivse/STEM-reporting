import styles from "./ReadingActivity.module.css";
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
    article: "How video games are teaching the world to speak English",
    thumb: "/images/article-1.svg",
    skills: ["What the text says", "Word meaning & choice"],
    lexile: "940 L",
    grade: "Grade 7",
    viewed: "9/4/23",
    time: "12 min",
    quiz: "100%",
    write: "2",
    annotations: "1",
    powerWords: "100%",
  },
  {
    article: "\"Mini-moon\" discovered orbiting Earth, but won't be there for long",
    thumb: "/images/article-2.svg",
    skills: ["Connecting people, events & ideas", "Word meaning & choice"],
    lexile: "1020 L",
    grade: "Grade 8",
    viewed: "9/11/23",
    time: "14 min",
    quiz: "75%",
    write: "—",
    annotations: "—",
    powerWords: "80%",
  },
  {
    article: "Earth's revolution around the sun",
    thumb: "/images/article-3.svg",
    skills: ["What the text says", "Word meaning & choice"],
    lexile: "980 L",
    grade: "Grade 7",
    viewed: "9/11/23",
    time: "8 min",
    quiz: "50%",
    write: "Ungraded",
    annotations: "2",
    powerWords: "—",
  },
  {
    article: "Scientists figure out how vampire bats got a taste for blood",
    thumb: "/images/article-4.svg",
    skills: ["Point of view & purpose", "Word meaning & choice"],
    lexile: "820 L",
    grade: "Grade 7",
    viewed: "9/11/23",
    time: "18 min",
    quiz: "100%",
    write: "3",
    annotations: "—",
    powerWords: "80%",
  },
  {
    article: "Russian scientists have grown watermelons in Antarctica",
    thumb: "/images/article-5.svg",
    skills: ["What the text says", "Word meaning & choice"],
    lexile: "1010 L",
    grade: "Grade 7",
    viewed: "9/11/23",
    time: "9 min",
    quiz: "75%",
    write: "—",
    annotations: "1",
    powerWords: "100%",
  },
  {
    article: "Family rescues baby squirrel, builds him tiny burger shack",
    thumb: "/images/article-6.svg",
    skills: ["Point of view & purpose", "Word meaning & choice"],
    lexile: "1080 L",
    grade: "Grade 8",
    viewed: "9/11/23",
    time: "16 min",
    quiz: "50%",
    write: "—",
    annotations: "—",
    powerWords: "—",
  },
  {
    article: "Which is longer, Amazon or Nile? New quest aims to settle age-old river …",
    thumb: "/images/article-7.svg",
    skills: ["Connecting people, events & ideas", "Word meaning & choice"],
    lexile: "980 L",
    grade: "Grade 7",
    viewed: "9/11/23",
    time: "14 min",
    quiz: "100%",
    write: "—",
    annotations: "—",
    powerWords: "—",
  },
];

function SortableHeader({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles.thSort}>
      {children} <SortIcon />
    </span>
  );
}

export default function ReadingActivity() {
  return (
    <section className={styles.section} data-screen-label="Reading activity">
      <div className={styles.head}>
        <h2 className={styles.title}>Student&rsquo;s ELA activity</h2>
        <a className={styles.downloadLink} href="#">
          <DownloadIcon />
          <span className={styles.underline}>Download as .csv</span>
        </a>
      </div>
      <p className={styles.sub}>
        See Sarah&rsquo;s ELA activity across Newsela texts.
      </p>

      <div className={styles.filters}>
        <Select
          options={["Show all skills", "What the text says", "Point of view & purpose", "Connecting people, events & ideas", "Word meaning & choice"]}
          aria-label="Skills filter"
        />
        <Select
          options={["All reading levels", "12th grade", "11th grade", "10th grade", "9th grade", "8th grade", "7th grade", "6th grade", "5th grade", "4th grade", "3rd grade", "2nd grade and lower"]}
          aria-label="Reading level"
        />
      </div>

      <div className={styles.tableCard}>
      <div className={styles.tableWrap}>
        <table className={styles.table} aria-label="Reading activity">
          <thead>
            <tr>
              <th style={{ width: "18%" }}>
                <SortableHeader>Article</SortableHeader>
              </th>
              <th style={{ width: "14%" }}>
                <SortableHeader>Skills</SortableHeader>
                <div className={styles.subLabel}>Skills practiced if quizzes taken</div>
              </th>
              <th style={{ width: "10%" }}>
                <SortableHeader>Text level</SortableHeader>
                <div className={styles.subLabel}>Average Lexile of texts viewed</div>
              </th>
              <th style={{ width: "9%" }}>
                <SortableHeader>Viewed</SortableHeader>
                <div className={styles.subLabel}>Date text viewed</div>
              </th>
              <th style={{ width: "10%" }}>
                <SortableHeader>Active time</SortableHeader>
                <div className={styles.subLabel}>Time on article</div>
              </th>
              <th style={{ width: "8%" }}>
                <SortableHeader>Quiz</SortableHeader>
                <div className={styles.subLabel}>Quiz score</div>
              </th>
              <th style={{ width: "10%" }}>
                <SortableHeader>Write prompts</SortableHeader>
                <div className={styles.subLabel}>Write Prompt score</div>
              </th>
              <th style={{ width: "10%" }}>
                <SortableHeader>Annotations</SortableHeader>
                <div className={styles.subLabel}>Total submitted</div>
              </th>
              <th style={{ width: "11%" }}>
                <SortableHeader>Power words</SortableHeader>
                <div className={styles.subLabel}>Average Lexile of texts viewed</div>
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
                <td className={styles.muted}>
                  {row.skills.map((s, j) => (
                    <span key={j}>
                      {s}
                      {j < row.skills.length - 1 && <br />}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={styles.bold}>{row.lexile}</span>
                  <br />
                  <span className={styles.muted}>{row.grade}</span>
                </td>
                <td>{row.viewed}</td>
                <td>{row.time}</td>
                <td>{row.quiz}</td>
                <td>{row.write}</td>
                <td>{row.annotations}</td>
                <td>{row.powerWords}</td>
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
            <button
              className={styles.pagerBtn}
              disabled
              aria-label="First page"
            >
              <FirstPageIcon />
            </button>
            <button
              className={styles.pagerBtn}
              disabled
              aria-label="Previous page"
            >
              <PrevIcon />
            </button>
            <span>1 – 10 of 17</span>
            <button className={styles.pagerBtn} aria-label="Next page">
              <NextIcon />
            </button>
          </div>
        </div>
      </div>{/* end tableCard */}
    </section>
  );
}
