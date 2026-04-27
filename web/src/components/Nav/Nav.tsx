import styles from "./Nav.module.css";

const NewsеlaLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M 32 32 L 0 32 L 0 0 L 32 0 L 32 32 Z M 15.145 26.95 L 5.023 26.95 L 5.023 5.023 L 15.145 5.023 L 15.145 26.95 Z M 26.976 26.974 L 16.83 26.974 L 16.83 5.047 L 21.928 5.047 C 24.708 5.047 26.976 7.315 26.976 10.096 L 26.976 26.974 Z"
      fill="rgb(16,111,243)"
      fillRule="evenodd"
    />
  </svg>
);

const ChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export default function Nav() {
  return (
    <header className={styles.nav}>
      <a className={styles.logo} href="#" aria-label="Newsela home">
        <NewsеlaLogo />
        <span className={styles.wordmark}>newsela</span>
      </a>

      <nav className={styles.center} aria-label="Primary navigation">
        <button className={`${styles.item} ${styles.searchItem}`}>
          <SearchIcon />
          Search
        </button>
        <button className={styles.item}>
          Browse <ChevronDown />
        </button>
        <button className={styles.item}>
          Your Content <ChevronDown />
        </button>
        <button className={styles.item}>Assignments</button>
        <button className={styles.item}>
          Reports <ChevronDown />
        </button>
      </nav>

      <div className={styles.right}>
        <span className={styles.educatorCenter}>
          Educator Center <ChevronDown size={14} />
        </span>
        <div className={styles.avatar} aria-label="User menu: DG">
          DG
        </div>
        <ChevronDown size={14} />
      </div>
    </header>
  );
}
