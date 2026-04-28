import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import StudentPageClient from "@/components/StudentPageClient/StudentPageClient";
import styles from "./page.module.css";

export default function StudentInsightsPage() {
  return (
    <>
      <Nav />

      <div className={styles.app}>
        <Sidebar />

        <main className={styles.main}>
          <StudentPageClient />
        </main>
      </div>
    </>
  );
}
