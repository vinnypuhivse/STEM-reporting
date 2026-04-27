import styles from "./ReadingSkills.module.css";
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

const InfoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

type SkillStatus = "percent" | "zero" | "na";

interface Skill {
  name: string;
  questions: number;
  pct: number | null;
  status: SkillStatus;
}

const skills: Skill[] = [
  { name: "What the text says", questions: 4, pct: 25, status: "percent" },
  { name: "Main idea, key details & summarization", questions: 8, pct: 75, status: "percent" },
  { name: "Connecting people, events, & ideas", questions: 6, pct: 50, status: "percent" },
  { name: "Word meaning & choice", questions: 2, pct: 100, status: "percent" },
  { name: "Text structure", questions: 12, pct: 50, status: "percent" },
  { name: "Point of view and purpose", questions: 2, pct: 0, status: "zero" },
  { name: "Interpret multimedia", questions: 0, pct: null, status: "na" },
  { name: "Arguments and claims", questions: 4, pct: 75, status: "percent" },
];

function SkillRow({ skill }: { skill: Skill }) {
  const isZero = skill.status === "zero";
  const isNa = skill.status === "na";

  return (
    <div className={styles.row}>
      {/* Bar column */}
      <div className={styles.barCol}>
        {isNa ? (
          <>
            <span className={`${styles.pct} ${styles.pctNa}`}>N/A</span>
            <div className={styles.naLink}>
              Find articles that match this skill on&nbsp;
              <a href="#">search page</a>
            </div>
          </>
        ) : (
          <>
            <span
              className={`${styles.pct} ${isZero ? styles.pctZero : ""}`}
            >
              {skill.pct}%
            </span>
            <div className={`${styles.bar} ${isZero ? styles.barZero : ""}`}>
              <div
                className={`${styles.fill} ${isZero ? styles.fillZero : ""}`}
                style={{ width: isZero ? "4%" : `${skill.pct}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Meta column */}
      <div className={styles.meta}>
        <span className={styles.questions}>{skill.questions} questions</span>
        <span className={styles.skillName}>
          {skill.name}
          <span className={styles.infoIcon}>
            <InfoIcon />
          </span>
        </span>
      </div>
    </div>
  );
}

export default function ReadingSkills() {
  return (
    <section className={styles.section} data-screen-label="Reading skills">
      <div className={styles.head}>
        <h2 className={styles.title}>Reading skills</h2>
        <a className={styles.downloadLink} href="#">
          <DownloadIcon />
          <span className={styles.underline}>Download as .csv</span>
        </a>
      </div>
      <p className={styles.sub}>
        Use the table below to see Sarah&rsquo;s quiz performance in all 8
        reading skills.
      </p>

      <div className={styles.gradeFilter}>
        <Select
          options={["All grade levels", "12th grade", "11th grade", "10th grade", "9th grade", "8th grade", "7th grade", "6th grade", "5th grade", "4th grade", "3rd grade", "2nd grade and lower"]}
          aria-label="Grade level filter"
        />
      </div>

      <div className={styles.wrap}>
        {skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}
