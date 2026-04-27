"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
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

interface SelectProps {
  options: string[];
  defaultValue?: string;
  "aria-label"?: string;
  size?: "default" | "small";
  openUp?: boolean;
}

export default function Select({
  options,
  defaultValue,
  "aria-label": ariaLabel,
  size = "default",
  openUp = false,
}: SelectProps) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${size === "small" ? styles.small : ""}`}
      ref={wrapperRef}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.triggerValue}>{value}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <ul className={`${styles.panel} ${openUp ? styles.panelUp : ""}`} role="listbox" aria-label={ariaLabel}>
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`${styles.option} ${opt === value ? styles.selected : ""}`}
              onMouseDown={() => {
                setValue(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
