"use client";

import { useState, useEffect } from "react";
import styles from "./StemOverview.module.css";

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-5" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" /><path d="M6 11l6 6 6-6" /><path d="M4 21h16" />
  </svg>
);

const DetailsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const StemIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

function Ring({ value, pct }: { value: number; pct: number }) {
  const r = 30;
  const C = 2 * Math.PI * r;
  const len = (Math.min(100, Math.max(0, pct)) / 100) * C;
  return (
    <div className={styles.ring}>
      <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx="36" cy="36" r={r} fill="none" stroke="var(--ui-core-50)" strokeWidth="8" />
        {pct > 0 && (
          <circle cx="36" cy="36" r={r} fill="none" stroke="var(--ui-core-500)" strokeWidth="8"
            strokeLinecap="round" strokeDasharray={`${len} ${C}`} />
        )}
      </svg>
      <span>{value}</span>
    </div>
  );
}

const disciplines = [
  { name: "Science", count: 3 },
  { name: "Ecology", count: 17 },
  { name: "Mathematics", count: 6 },
];

const articlesPct = 75;
const videosPct = 25;
const articlesTotal = 17;
const videosTotal = 9;
const articleAvgMin = 23;
const videoAvgMin = 16;

export default function StemOverview() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const r = 42;
  const C = 2 * Math.PI * r;
  const gap = 8;
  const vLen = (videosPct / 100) * C;
  const aLen = (articlesPct / 100) * C;
  const ease = "stroke-dasharray 700ms cubic-bezier(0.2,0,0,1)";

  const maxDiscipline = Math.max(...disciplines.map(d => d.count));

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>STEM overview</h2>
        <a className={styles.downloadLink} href="#"><DownloadIcon /><span className={styles.underline}>Download as .csv</span></a>
      </div>
      <p className={styles.sub}>Get a snapshot of how Sarah is reading STEM texts on Newsela.</p>

      <div className={styles.grid}>

        {/* Content breakdown */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}><DetailsIcon />Content breakdown</div>
            <button className={styles.infoBtn} aria-label="More info"><InfoIcon /></button>
          </div>
          <div className={styles.inner}>
            <div className={styles.donutRow}>
              <div className={styles.donutSide}>
                <div className={styles.donutPct} style={{ color: "var(--ui-core-700)" }}>{articlesPct}%</div>
                <div className={styles.donutLabel} style={{ color: "var(--ui-core-700)" }}>Articles</div>
                <div className={styles.donutTotal}>{articlesTotal} total</div>
              </div>
              <svg width="96" height="96" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
                <circle cx="50" cy="50" r={r} fill="none" stroke="var(--ui-core-50)" strokeWidth="10" />
                <circle cx="50" cy="50" r={r} fill="none" stroke="#a437c9" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${visible ? Math.max(0, vLen - gap * 2) : 0} ${C}`}
                  strokeDashoffset={-gap}
                  style={{ transition: ease }} />
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgb(16,111,243)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${visible ? Math.max(0, aLen - gap * 2) : 0} ${C}`}
                  strokeDashoffset={-(vLen + gap)}
                  style={{ transition: ease, transitionDelay: "80ms" }} />
              </svg>
              <div className={styles.donutSide}>
                <div className={styles.donutPct} style={{ color: "#a437c9" }}>{videosPct}%</div>
                <div className={styles.donutLabel} style={{ color: "#a437c9" }}>Videos</div>
                <div className={styles.donutTotal}>{videosTotal} total</div>
              </div>
            </div>
          </div>
        </div>

        {/* STEM Disciplines */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}><StemIcon />STEM Disciplines</div>
            <button className={styles.infoBtn} aria-label="More info"><InfoIcon /></button>
          </div>
          <div className={styles.inner}>
            <div className={styles.bars}>
              {disciplines.map((d, i) => (
                <div key={d.name} className={styles.barRow}>
                  <span className={styles.barLabel}>{d.name}</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{
                      width: visible ? `${(d.count / maxDiscipline) * 100}%` : "0%",
                      transition: "width 600ms cubic-bezier(0.2,0,0,1)",
                      transitionDelay: `${i * 80}ms`,
                    }} />
                  </div>
                  <span className={styles.barCount}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time spent */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.cardTitle}><ClockIcon />Time spent</div>
            <button className={styles.infoBtn} aria-label="More info"><InfoIcon /></button>
          </div>
          <div className={styles.timeGrid}>
            {[
              { v: articleAvgMin, label: "Average minutes per article" },
              { v: videoAvgMin, label: "Average minutes per video" },
            ].map((t) => (
              <div key={t.label} className={styles.timeTile}>
                <Ring value={t.v} pct={(t.v / 60) * 100} />
                <div className={styles.tileLabel}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
