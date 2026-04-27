"use client";

import { useState } from "react";
import TabBar, { type Tab } from "@/components/TabBar/TabBar";
import Overview from "@/components/Overview/Overview";
import ReadingActivity from "@/components/ReadingActivity/ReadingActivity";
import ReadingSkills from "@/components/ReadingSkills/ReadingSkills";
import StemOverview from "@/components/StemOverview/StemOverview";
import StemReadingActivity from "@/components/StemReadingActivity/StemReadingActivity";

export default function TabView() {
  const [activeTab, setActiveTab] = useState<Tab>("ELA");

  return (
    <>
      <TabBar active={activeTab} onChange={setActiveTab} />

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
