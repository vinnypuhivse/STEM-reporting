"use client";

import { useState } from "react";
import TabBar, { type Tab } from "@/components/TabBar/TabBar";
import PageFilters from "@/components/PageFilters/PageFilters";
import Overview from "@/components/Overview/Overview";
import ReadingActivity from "@/components/ReadingActivity/ReadingActivity";
import ReadingSkills from "@/components/ReadingSkills/ReadingSkills";
import StemOverview from "@/components/StemOverview/StemOverview";
import StemReadingActivity from "@/components/StemReadingActivity/StemReadingActivity";
import styles from "@/app/page.module.css";

const CLASSROOM_URL = "https://stem-reporting.vercel.app/";

export default function StudentPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("ELA");
  const classroomHref = `${CLASSROOM_URL}?tab=${activeTab.toLowerCase()}`;

  return (
    <>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <a href="#">Reports</a>
        <span className={styles.sep}>/</span>
        <a href={classroomHref}>Classroom data</a>
        <span className={styles.sep}>/</span>
        <span className={styles.crumbCurrent}>Sarah Camacho</span>
      </nav>

      <h1 className={styles.pageTitle}>Sarah Camacho</h1>

      <TabBar active={activeTab} onChange={setActiveTab} />
      <PageFilters />

      {activeTab === "ELA" ? (
        <>
          <Overview />
          <ReadingActivity />
          <ReadingSkills />
        </>
      ) : (
        <>
          <StemOverview />
          <StemReadingActivity />
        </>
      )}
    </>
  );
}
