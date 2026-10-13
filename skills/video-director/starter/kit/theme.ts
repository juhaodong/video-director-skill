import { Easing } from "remotion";

// The palette every video starts from. Replace it with your brand's colours (and write them down
// in BRAND.md) before the first project.
export const color = {
  paper: "#ffffff",
  ink: "#111111",
  muted: "#5c5c5c",
  line: "#e3e3e3",
  subtle: "#f6f6f5",
  accent: "#2f5bea",
  // A lighter accent that reads on ink. Only on ink.
  signal: "#8fb3ff",
} as const;

// Every video runs at 30 fps. A project's timeline.ts has its own beat grid and cues.
export const FPS = 30;

export const sec = (s: number) => Math.round(s * FPS);

// The safe area every shot lays out in: 3:4, centred in the 9:16 version.
export const SAFE = { width: 1080, height: 1440 } as const;

export const type = {
  caption: { fontSize: 96, fontWeight: 900, lineHeight: 1.18, letterSpacing: -1 },
  sub: { fontSize: 48, fontWeight: 500, lineHeight: 1.35 },
} as const;

export const ease = {
  ui: Easing.bezier(0.2, 0.8, 0.2, 1), // 220 ms fades
  spring: Easing.bezier(0.34, 1.56, 0.64, 1), // accent word landing
} as const;

export const ms = (n: number) => Math.round((n / 1000) * FPS);
