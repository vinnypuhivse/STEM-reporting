import styles from "./Overview.module.css";
import InfoTip from "@/components/InfoTip/InfoTip";

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

const ArticleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M7 9 h10" /><path d="M7 13 h10" /><path d="M7 17 h6" />
  </svg>
);

const ElaIcon = () => (
  <svg width="22" height="19" viewBox="0 0 30 25.5" fill="none" aria-hidden="true">
    <path d="M 20 0 C 21.971 0 23.368 0.405 24.3 0.846 C 24.764 1.065 25.106 1.291 25.343 1.473 C 25.355 1.482 25.366 1.491 25.377 1.5 L 30 1.5 L 30 22.5 L 19.006 22.5 C 19.423 23.956 18.34 25.5 16.733 25.5 L 14.207 25.5 C 12.601 25.5 11.492 23.978 11.876 22.5 L 0 22.5 L 0 1.5 L 4.672 1.5 C 4.703 1.479 4.734 1.454 4.77 1.431 C 5.023 1.263 5.39 1.049 5.865 0.837 C 6.818 0.412 8.206 0 10 0 C 11.794 0 13.182 0.412 14.135 0.837 C 14.461 0.982 14.735 1.13 14.957 1.262 C 15.158 1.13 15.404 0.986 15.7 0.846 C 16.632 0.405 18.029 0 20 0 Z M 2 20.5 L 12.297 20.5 C 13.542 20.5 14.366 21.794 13.84 22.923 C 13.714 23.192 13.91 23.5 14.207 23.5 L 16.733 23.5 C 17.005 23.5 17.179 23.21 17.051 22.971 C 16.454 21.852 17.265 20.5 18.533 20.5 L 28 20.5 L 28 3.5 L 26 3.5 L 26 19.5 L 15.224 19.5 L 14.946 19.632 L 14.725 19.5 L 4 19.5 L 4 3.5 L 2 3.5 L 2 20.5 Z M 20 2 C 18.312 2 17.209 2.345 16.556 2.654 C 16.315 2.768 16.132 2.879 16 2.969 L 16 17.08 C 16.048 17.066 16.097 17.051 16.146 17.037 C 17.1 16.769 18.443 16.5 20 16.5 C 21.515 16.5 22.827 16.755 23.775 17.016 C 23.817 17.027 23.887 17.021 23.949 16.978 C 23.977 16.958 23.992 16.939 23.997 16.93 C 24.001 16.923 24 16.922 24 16.92 L 24 2.968 C 23.868 2.878 23.685 2.768 23.444 2.654 C 22.791 2.345 21.688 2 20 2 Z M 10 2 C 8.52 2 7.408 2.338 6.68 2.663 C 6.394 2.791 6.168 2.919 6 3.022 L 6 16.741 C 6 16.743 6.003 16.749 6.009 16.759 C 6.021 16.779 6.048 16.813 6.098 16.846 C 6.209 16.92 6.327 16.93 6.387 16.914 C 7.287 16.676 8.497 16.472 10 16.472 C 11.73 16.472 13.072 16.741 14 17.022 L 14 3.022 C 13.832 2.919 13.606 2.791 13.32 2.663 C 12.592 2.338 11.48 2 10 2 Z" fill="currentColor" fillRule="nonzero" />
  </svg>
);

const TrendUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 17 l6 -6 4 4 8 -8" />
    <path d="M14 7 h7 v7" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * SVG ring chart. r=42 → circumference = 2π×42 ≈ 263.9
 * pass fillPct 0–100 to draw the filled arc.
 */
function RingChart({
  value,
  fillPct,
}: {
  value: number | string;
  fillPct?: number;
}) {
  const r = 42;
  const circ = 2 * Math.PI * r; // ≈ 263.9
  const filled = fillPct != null ? (fillPct / 100) * circ : 0;
  const gap = circ - filled;

  return (
    <div className={styles.ring}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#CCE1FF"
          strokeWidth="10"
        />
        {/* Fill */}
        {fillPct != null && fillPct > 0 && (
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#0A6EFA"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${gap}`}
            transform="rotate(-90 50 50)"
          />
        )}
      </svg>
      <span>{value}</span>
    </div>
  );
}

export default function Overview() {
  return (
    <section className={styles.section} data-screen-label="Overview">
      <div className={styles.head}>
        <h2 className={styles.title}>Overview of student reading</h2>
        <a className={styles.downloadLink} href="#">
          <DownloadIcon />
          <span className={styles.underline}>Download as .csv</span>
        </a>
      </div>
      <p className={styles.sub}>
        Get a snapshot of how Sarah is reading on Newsela.
      </p>

      <div className={styles.grid}>
        {/* ── Left: Average reading level ── */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}><ArticleIcon />Average reading level</div>
            <InfoTip text="Average grade level and Lexile for texts viewed by Sarah" />
          </div>
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

        {/* ── Middle: Reading totals ── */}
        <div className={`${styles.card} ${styles.totalsCard}`}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}><ElaIcon />Reading totals</div>
            <InfoTip text="Total texts viewed and average time per article" />
          </div>
          <div className={styles.totalsGrid}>
            <div className={styles.tile}>
              <RingChart value={17} />
              <div className={styles.tileLbl}>Total texts viewed by Sarah</div>
            </div>
            <div className={styles.tile}>
              <RingChart value={15} fillPct={25} />
              <div className={styles.tileLbl}>Average minutes per article</div>
            </div>
          </div>
        </div>

        {/* ── Right: Grade level status ── */}
        <div className={`${styles.card} ${styles.gradeCard}`}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}><TrendUpIcon />Grade level status</div>
            <InfoTip text="Determined by the average Lexile of texts Sarah has viewed compared to her enrolled grade level" />
          </div>
          <div className={styles.gradeInner}>
            <div className={styles.gradeTop}>
              <div className={styles.gradeCheck}><CheckIcon /></div>
              <div className={styles.gradeTitle}>On grade level</div>
            </div>
            <div className={styles.gradeBody}>
              Based on 17 texts, Sarah usually views on-grade level texts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
