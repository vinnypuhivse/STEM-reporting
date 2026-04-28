"use client";

import TabBar, { type Tab } from "@/components/TabBar/TabBar";
import PageFilters from "@/components/PageFilters/PageFilters";
import Overview from "@/components/Overview/Overview";
import ReadingActivity from "@/components/ReadingActivity/ReadingActivity";
import ReadingSkills from "@/components/ReadingSkills/ReadingSkills";
import StemOverview from "@/components/StemOverview/StemOverview";
import StemReadingActivity from "@/components/StemReadingActivity/StemReadingActivity";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabView({ activeTab, onTabChange }: Props) {
  return (
    <>
      <TabBar active={activeTab} onChange={onTabChange} />
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
