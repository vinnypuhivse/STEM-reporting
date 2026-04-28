const STATUS: string = "Design WIP";
const HANDOFF_URL = "https://stem-reporting.vercel.app/design-spec.html";

const COLORS: Record<string, { background: string; color: string }> = {
  "Early exploration": { background: "#FBBFC9", color: "#1E2A78" },
  "Design WIP":        { background: "#F9E16A", color: "#1E2A78" },
  "Design ready":      { background: "#A8EFD6", color: "#1E2A78" },
};

export default function StatusBadge() {
  const colors = COLORS[STATUS];
  if (!colors) return null;
  const linkCopy = STATUS === "Design ready" ? "Design spec" : "Design spec WIP";

  return (
    <div style={{
      position: "fixed",
      top: 16,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 200,
      background: colors.background,
      color: colors.color,
      borderRadius: 50,
      fontWeight: 700,
      fontSize: 15,
      padding: "10px 40px",
      whiteSpace: "nowrap",
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      pointerEvents: HANDOFF_URL ? "auto" : "none",
    }}>
      <span>{STATUS}</span>
      {HANDOFF_URL && (
        <a
          href={HANDOFF_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: colors.color,
            textDecoration: "underline",
            pointerEvents: "auto",
          }}
        >
          {linkCopy}
        </a>
      )}
    </div>
  );
}
