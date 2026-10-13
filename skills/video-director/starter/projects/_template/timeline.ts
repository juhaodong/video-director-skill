// The one clock the picture and the music share. No imports: music.ts reads it under plain Node.

export const FPS = 30;
export const BPM = 120;
export const BEAT_SECONDS = 60 / BPM; // 0.5 s
export const BEAT = BEAT_SECONDS * FPS; // 15 frames
export const BAR = BEAT * 4; // 60 frames
export const DURATION = 12; // seconds

/** Where each shot starts, in seconds (STORYBOARD.md). */
export const CUES = {
  hook: 0,
  cta: 6,
  end: DURATION,
} as const;

/** Hard cuts, each with a snap in the music. */
export const CUTS = [CUES.cta] as const;

/** The call-to-action pill lands two beats into the close. */
export const PILL_AT = 2 * BEAT_SECONDS;
export const LANDINGS = [CUES.cta + PILL_AT] as const;
