import { useCurrentFrame } from "remotion";

import { Stage, progress } from "../../../kit/motion";
import { Rich } from "../../../kit/parts";
import { copy } from "../copy";
import { CUES, PILL_AT, color, ease, sec } from "../theme";

// 0:06–0:12 · The close: the line, then the call to action lands as a pill.
export const SHOT2_FRAMES = sec(CUES.end - CUES.cta);

export function Shot2Cta() {
  const f = useCurrentFrame();
  const { caption, action } = copy.cta;
  const pill = progress(f, sec(PILL_AT), 9, ease.spring);
  return (
    <Stage>
      <div style={{ position: "absolute", left: 72, right: 72, top: 420, textAlign: "center", fontSize: 108, fontWeight: 900, lineHeight: 1.15, letterSpacing: -2 }}>
        {caption.map((line, k) => {
          const p = progress(f, k * 3, 7, ease.spring);
          return (
            <div key={line} style={{ opacity: p, transform: `translateY(${(1 - p) * 24}px)` }}>
              <Rich text={line} accent={color.accent} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center" }}>
        <div style={{ background: color.ink, color: color.paper, fontSize: 84, fontWeight: 700, letterSpacing: -2, padding: "28px 64px 34px", transform: `scale(${0.6 + 0.4 * pill})`, opacity: pill }}>{action}</div>
      </div>
    </Stage>
  );
}
