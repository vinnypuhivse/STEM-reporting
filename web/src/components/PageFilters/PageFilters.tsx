"use client";

import Select from "@/components/Select/Select";
import styles from "./PageFilters.module.css";

export default function PageFilters() {
  return (
    <div className={styles.filters}>
      <Select
        options={[
          "Sarah Camacho",
          "Amy Benson",
          "Shirley Brewer",
          "Christopher Burns",
          "Kimberly Gonzalez",
          "Jessica Johnson",
          "Justin Lyons",
          "Devin Maldonado",
          "Teresa Montgomery",
          "James Olson",
          "Ava Petersen",
          "Kevin Reyes",
        ]}
        defaultValue="Sarah Camacho"
        aria-label="Student"
      />
      <Select
        options={["All activity", "Assigned activity", "Independent activity"]}
        aria-label="Activity type"
      />
      <Select
        options={["July to date", "Last 30 days", "This semester"]}
        aria-label="Date range"
      />
    </div>
  );
}
