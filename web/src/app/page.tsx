"use client";

import { useState } from "react";
import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import TabView from "@/components/TabView/TabView";
import { type Tab } from "@/components/TabBar/TabBar";
import styles from "./page.module.css";

const CLASSROOM_URL = "https://stem-reporting.vercel.app/";

export default function StudentInsightsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("ELA");
  const classroomHref = `${CLASSROOM_URL}?tab=${activeTab.toLowerCase()}`;

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
            <a href={classroomHref}>Classroom data</a>
            <span className={styles.sep}>/</span>
            <span className={styles.crumbCurrent}>Sarah Camacho</span>
          </nav>

          <h1 className={styles.pageTitle}>Sarah Camacho</h1>

          {/* ELA / STEM tab switcher + content */}
          <TabView activeTab={activeTab} onTabChange={setActiveTab} />
        </main>
      </div>
    </>
  );
}
