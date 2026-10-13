import type { CSSProperties, ReactNode } from "react";

import { color } from "./theme";

/** A line of copy; **word** is set in `accent`. */
export function Rich({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
        part.startsWith("**") ? (
          <span key={j} style={{ color: accent }}>
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={j}>{part}</span>
        ),
      )}
    </>
  );
}

/** A white card with an ink border: one idea, one line. */
export function Note({ children, style, ink = color.ink }: { children: ReactNode; style?: CSSProperties; ink?: string }) {
  return (
    <div style={{ background: color.paper, border: `3px solid ${ink}`, color: ink, padding: "26px 34px", fontSize: 50, fontWeight: 800, whiteSpace: "nowrap", ...style }}>
      {children}
    </div>
  );
}
