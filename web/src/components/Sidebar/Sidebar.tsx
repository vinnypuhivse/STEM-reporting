import styles from "./Sidebar.module.css";

const students = [
  "Abby Bronovich",
  "Sarah Camacho",
  "Jess Diangelo",
  "Ben Evanco",
  "Jess Diangelo",
  "Ben Evanco",
  "Ben Evanco",
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.label}>REPORTS</p>
      <div className={styles.heading}>ELA Period 3</div>

      <nav aria-label="Student list">
        {students.map((name, i) => (
          <a
            key={`${name}-${i}`}
            href="#"
            className={`${styles.item} ${name === "Sarah Camacho" ? styles.active : ""}`}
            aria-current={name === "Sarah Camacho" ? "page" : undefined}
          >
            {name}
          </a>
        ))}
      </nav>

      <a href="#" className={styles.powerWords}>
        Power words
      </a>
    </aside>
  );
}
