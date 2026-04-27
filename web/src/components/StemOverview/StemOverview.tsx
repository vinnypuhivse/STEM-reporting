import styles from "./StemOverview.module.css";

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-5" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" /><path d="M6 11l6 6 6-6" /><path d="M4 21h16" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 2.75C3.55228 2.75 3.99999 3.19772 4 3.75V20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H2V3.75C2.00001 3.19772 2.44772 2.75 3 2.75ZM7.5 10.25C8.05228 10.25 8.49999 10.6977 8.5 11.25V16.5C8.5 17.0523 8.05228 17.5 7.5 17.5C6.94772 17.5 6.5 17.0523 6.5 16.5V11.25C6.50001 10.6977 6.94772 10.25 7.5 10.25ZM12.75 4.25C13.3023 4.25 13.75 4.69772 13.75 5.25V16.5C13.75 17.0523 13.3023 17.5 12.75 17.5C12.1977 17.5 11.75 17.0523 11.75 16.5V5.25C11.75 4.69772 12.1977 4.25 12.75 4.25ZM18 7.25C18.5523 7.25 19 7.69772 19 8.25V16.5C19 17.0523 18.5523 17.5 18 17.5C17.4477 17.5 17 17.0523 17 16.5V8.25C17 7.69772 17.4477 7.25 18 7.25Z" fill="currentColor"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function RingChart({ value, fillPct }: { value: number; fillPct?: number }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const filled = fillPct != null ? (fillPct / 100) * circ : 0;
  const gap = circ - filled;
  return (
    <div className={styles.ring}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#CCE1FF" strokeWidth="7" />
        {fillPct != null && fillPct > 0 && (
          <circle cx="50" cy="50" r={r} fill="none" stroke="#0A6EFA" strokeWidth="7"
            strokeLinecap="round" strokeDasharray={`${filled} ${gap}`} transform="rotate(-90 50 50)" />
        )}
      </svg>
      <span>{value}</span>
    </div>
  );
}

export default function StemOverview() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>Overview of student reading</h2>
        <a className={styles.downloadLink} href="#"><DownloadIcon /><span className={styles.underline}>Download as .csv</span></a>
      </div>
      <p className={styles.sub}>Get a snapshot of how Sarah is reading STEM texts on Newsela.</p>

      <div className={styles.grid}>
        {/* Average reading level */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Average reading level</div>
          <button className={styles.infoBtn} aria-label="More info"><InfoIcon /></button>
          <div className={styles.rows}>
            <div className={styles.row}>
              <div className={styles.rowVal}>8th</div>
              <div className={styles.rowLbl}>Average grade level for all texts viewed by Sarah</div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowVal}>1030L</div>
              <div className={styles.rowLbl}>Average Lexile level for all texts viewed by Sarah</div>
            </div>
          </div>
        </div>

        {/* Reading totals */}
        <div className={`${styles.card} ${styles.totalsCard}`}>
          <div className={styles.totalsHead}>
            <TrendingIcon />
            <span className={styles.totalsTitle}>Reading totals</span>
            <button className={styles.totalsInfoBtn} aria-label="More info"><InfoIcon /></button>
          </div>
          <div className={styles.totalsGrid}>
            <div className={styles.tile}>
              <RingChart value={12} />
              <div className={styles.tileLbl}>Total texts viewed by Sarah</div>
            </div>
            <div className={styles.tile}>
              <RingChart value={11} fillPct={20} />
              <div className={styles.tileLbl}>Average minutes per article</div>
            </div>
          </div>
        </div>

        {/* Grade level */}
        <div className={`${styles.card} ${styles.gradeCard}`}>
          <button className={styles.infoBtn} aria-label="More info"><InfoIcon /></button>
          <div className={styles.gradeTop}>
            <div className={styles.gradeCheck}><CheckIcon /></div>
            <div className={styles.gradeTitle}>On grade level</div>
          </div>
          <div className={styles.gradeBody}>Based on 12 texts, Sarah usually views on-grade level texts</div>
        </div>
      </div>
    </section>
  );
}
