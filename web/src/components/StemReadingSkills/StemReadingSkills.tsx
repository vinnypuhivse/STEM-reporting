import styles from "./StemReadingSkills.module.css";
import Select from "@/components/Select/Select";

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" /><path d="M6 11l6 6 6-6" /><path d="M4 21h16" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const skills = [
  { name: "Scientific reasoning", questions: 6, pct: 83, status: "percent" as const },
  { name: "Data interpretation", questions: 8, pct: 63, status: "percent" as const },
  { name: "Main idea & summarization", questions: 4, pct: 50, status: "percent" as const },
  { name: "Word meaning & choice", questions: 6, pct: 100, status: "percent" as const },
  { name: "Text structure", questions: 4, pct: 75, status: "percent" as const },
  { name: "Arguments & claims", questions: 4, pct: 25, status: "percent" as const },
  { name: "Connecting ideas", questions: 2, pct: 0, status: "zero" as const },
  { name: "Point of view & purpose", questions: 0, pct: null, status: "na" as const },
];

export default function StemReadingSkills() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>Reading skills</h2>
        <a className={styles.downloadLink} href="#"><DownloadIcon /><span className={styles.underline}>Download as .csv</span></a>
      </div>
      <p className={styles.sub}>Use the table below to see Sarah's quiz performance in all STEM reading skills.</p>

      <div className={styles.gradeFilter}>
        <Select
          options={["All grade levels", "12th grade", "11th grade", "10th grade", "9th grade", "8th grade", "7th grade", "6th grade", "5th grade", "4th grade", "3rd grade", "2nd grade and lower"]}
          aria-label="Grade level filter"
        />
      </div>

      <div className={styles.wrap}>
        {skills.map((skill) => {
          const isZero = skill.status === "zero";
          const isNa = skill.status === "na";
          return (
            <div key={skill.name} className={styles.row}>
              <div className={styles.barCol}>
                {isNa ? (
                  <>
                    <span className={`${styles.pct} ${styles.pctNa}`}>N/A</span>
                    <div className={styles.naLink}>Find articles that match this skill on&nbsp;<a href="#">search page</a></div>
                  </>
                ) : (
                  <>
                    <span className={`${styles.pct} ${isZero ? styles.pctZero : ""}`}>{skill.pct}%</span>
                    <div className={`${styles.bar} ${isZero ? styles.barZero : ""}`}>
                      <div className={`${styles.fill} ${isZero ? styles.fillZero : ""}`} style={{ width: isZero ? "4%" : `${skill.pct}%` }} />
                    </div>
                  </>
                )}
              </div>
              <div className={styles.meta}>
                <span className={styles.questions}>{skill.questions} questions</span>
                <span className={styles.skillName}>{skill.name}<span className={styles.infoIcon}><InfoIcon /></span></span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
