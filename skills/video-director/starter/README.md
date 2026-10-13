# videos

Short videos made in code with [Remotion](https://www.remotion.dev). Every frame is a function of
time; picture and music share one clock, so every cut and landing has its sound on the exact frame.

```
videos/
  BRAND.md            what every video may and may not say; the look and the sound
  kit/                shared: theme, fonts, motion, parts (Rich, Note), VideoRoot,
                      and audio/synth.ts (instruments + mixer, no samples)
  projects/
    _template/        a 12-second, two-shot starting point
      BRIEF.md        this video's decisions          STORYBOARD.md   shot list
      POST.md         titles, body, hashtags          project.json    output name, formats
      copy.ts         every word on screen            timeline.ts     the clock: beats, cues, events
      shots/          one component per shot          music.ts        the soundtrack arrangement
      out/            the finished films and cover
  scripts/video.ts    the `pnpm video` command
```

## Setup

Node 22.18+ and pnpm.

```bash
pnpm install          # inside a pnpm workspace: pnpm install --ignore-workspace
```

## Commands

```bash
pnpm video list                                   # the projects
pnpm video new 2026-11-launch                     # a new project from _template
pnpm video 2026-11-launch studio                  # Remotion Studio, scrub and preview
pnpm video 2026-11-launch music                   # synthesise public/music.wav from music.ts
pnpm video 2026-11-launch still Shot1Hook-3x4 60  # one frame → out/stills/
pnpm video 2026-11-launch shot Shot1Hook-3x4      # one shot with its music → out/shots/
pnpm video 2026-11-launch render                  # every format → out/<output>_<format>.mp4
pnpm video 2026-11-launch cover                   # out/cover_3x4.png
pnpm video 2026-11-launch all                     # music, every format, cover
pnpm typecheck
```

`out/stills/`, `out/shots/` and `public/*.wav` are generated and ignored; commit the films and
covers in `out/`.

## Languages

A project can have variants (`"variants": ["en"]` in `project.json`). Each variant gets its own
compositions (`Main-en-3x4`, `Shot1Hook-en-3x4`, `Cover-en`), its own soundtrack
(`node music.ts en` → `music-en.wav`) and its own files (`<output>_en_3x4.mp4`,
`cover_en_3x4.png`). Keep the copy for each language in `copy.ts` with the same shape, and pass
`variant` and a `wrap` that provides that language's copy to a second `VideoRoot`.
