import styles from "./InfoTip.module.css";

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-5" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export default function InfoTip({ text, below }: { text: string; below?: boolean }) {
  return (
    <span className={`${styles.tip}${below ? ` ${styles.tipBelow}` : ""}`} tabIndex={0} aria-label="More info">
      <InfoIcon />
      <span className={styles.tipBody} role="tooltip">{text}</span>
    </span>
  );
}
