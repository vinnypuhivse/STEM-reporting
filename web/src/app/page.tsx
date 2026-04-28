import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import TabView from "@/components/TabView/TabView";
import styles from "./page.module.css";

export default function StudentInsightsPage() {
  return (
    <>
      <Nav />

      <div className={styles.app}>
        <Sidebar />

        <main className={styles.main}>
          {/* Breadcrumbs */}
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <a href="#">Reports</a>
            <span className={styles.sep}>/</span>
            <a href="#">Classroom Social 3</a>
            <span className={styles.sep}>/</span>
            <span className={styles.crumbCurrent}>Sarah Camacho</span>
          </nav>

          <h1 className={styles.pageTitle}>Sarah Camacho</h1>

          {/* ELA / STEM tab switcher + content */}
          <TabView />
        </main>
      </div>
    </>
  );
}
