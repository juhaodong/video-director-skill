// Every word on screen, in one place. **word** is set in the accent colour.
// Facts only — see ../../BRAND.md and BRIEF.md.

export const copy = {
  hook: {
    caption: ["A question", "that **hurts**?"],
    notes: ["Idea one", "Idea two", "Idea three"],
  },
  cta: {
    caption: ["The next one", "could be **yours**"],
    action: "example.com",
  },
  cover: {
    title: ["Cover", "big **title**"],
  },
} as const;

/** Every character the video puts on screen, for the font subset. */
export function allText(): string {
  const strings: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") strings.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(copy);
  return strings.join("");
}
