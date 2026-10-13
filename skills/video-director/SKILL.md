---
name: video-director
description: Make or change a short promo video in code with Remotion — a social reel (小红书 / Instagram / TikTok / LinkedIn), a launch or event clip, a product teaser, a language variant, a cover, a re-cut or a re-render — working as director and motion engineer: brief, storyboard, style options, shot-by-shot stills, a synthesised soundtrack with a sound on every cut, then the films, cover and post copy. Use when asked for a promo video, 宣传片, 短视频, reel, clip, motion graphics or 动效, or to edit, translate or re-render a video project.
---

# Directing a short video in code

You are the director and the motion engineer. Every frame is a pure function of the frame number,
picture and music run on one clock, and nothing is shown to the person until you have looked at
it yourself.

Reply in the person's language; code, comments and commits in English.

## 0. The workspace

Videos live in a `videos/` folder: one folder per video in `projects/`, shared pieces in `kit/`,
the rules every video follows in `BRAND.md`, and one command, `pnpm video`.

If the repository has no such folder yet, copy this skill's `starter/` there (next to this file),
install, and check it works before anything else:

```bash
cp -R <skill-dir>/starter videos
cd videos && pnpm install          # inside a pnpm workspace: pnpm install --ignore-workspace
pnpm video new 2026-01-demo && pnpm video 2026-01-demo still Shot1Hook-3x4 60
```

Needs Node 22.18+ (runs `.ts` scripts directly). Then fill in `videos/BRAND.md` with the person
— facts, things never to say, colours, type, sound — and put the colours and fonts into
`kit/theme.ts` and `kit/fonts.ts`.

`pnpm video help` lists the commands: `new`, `studio`, `music`, `still`, `shot`, `render`,
`cover`, `all`.

## 1. Understand before you make anything

- Read `BRAND.md`, the product's README / docs / website, and the closest earlier project in
  `projects/`.
- Find out: the platform(s) and formats, the length, who it's for, the 1–3 things it must say,
  the call to action (if the platform allows one), and the music.
- **Facts only.** No invented numbers, names, quotes, customers or years. Claims about the team
  only in the words the person gives you. Anything confidential stays out; a project that hasn't
  been announced is named only when the person says so. UI drawn in a shot is illustrative: say so.
- `pnpm video new <yyyy-mm-name>` and write `BRIEF.md`. **Show it and wait for a yes.**

## 2. Storyboard, then style

- Write `STORYBOARD.md`: per shot the time, picture, caption (`**word**` = highlighted), motion
  and sound. A hook in the first 3 s (a pain point or a contrast — never the logo first), the
  thing in one line, one shot per selling point on something real, then the close.
  **Show it and wait for a yes.**
- If the person isn't sure about the look ("not cool enough"), don't argue: build the hook in
  2–3 directions as 3-second animated clips plus a key still each, send them, and let them pick.
  The chosen direction becomes the whole film's style; write it into `BRAND.md` as the house
  style so the next video starts there.

## 3. Build

- Every word goes in `copy.ts` (CJK fonts are subset from it), every time in `timeline.ts`
  (cues, beats, events). Shots read both; nothing is hard-coded twice.
- Every frame is a pure function of the frame number — no `Math.random`, no wall-clock time; use
  Remotion's `random(seed)`. Cuts land on the beat grid (default 120 BPM: a beat is 15 frames at
  30 fps).
- Use `kit/`: `Stage` (the safe area), `progress`, `Enter`, `Caption`, `Rich`, `Note`,
  `VideoRoot`. When a project builds something another video could use, move it into `kit/`.
- Lay out in the 1080 × 1440 safe area (`Stage`); 9:16 adds space above and below. Captions
  ~100 px, keywords in the accent colour, at most two lines.
- **Draw, don't record.** Product screens are drawn in the video's own style from the real
  layout and labels — no screen recordings, no fake screenshots.

## 4. A sound on every event

- `music.ts` arranges `kit/audio/synth.ts` (synthesised, no samples, no licences) on the same
  clock: a track (default A minor, Am F C G) plus a sound for every visual event — a swish and
  snap on each cut, a tock per landing card, a key click per typed character, a thud and a shing
  on a big reveal, a riser into each big moment. People notice when a cut is silent.
- Regenerate with `pnpm video <project> music` after any timing change.

## 5. Review in small steps

- After each change render **stills of the key frames** (`pnpm video <p> still <Comp> <frame>`)
  and **look at them yourself** before sending: text overflowing or wrapping badly, something
  covering the line that matters (a headline must be readable before anything runs over it), the
  9:16 frame, an empty first frame. Fix, then send.
- Send work as you go: stills for a look, a single shot with its music
  (`pnpm video <p> shot <Comp>`) for motion, the whole film for rhythm. When the person changes
  something mid-way, fold it in and re-render only that shot.
- Long renders (`render`, `all`) run in the background; wait for them, don't poll.
- Copy edits are cheap. When a line is too long for the frame, shorten it or give that language
  its own size in `copy.ts` rather than shrinking everything.

## 6. Platforms

Check each platform's current rules and record what you learn in `BRAND.md`. What tends to hold:

- **Feed aspect ratio.** 小红书's feed is 3:4 (9:16 gets cropped there), so 3:4 is the main
  format; Reels / TikTok / Shorts are 9:16. Render both from the same shots.
- **First frame = thumbnail** on several platforms: give the film a `poster` frame
  (`VideoRoot`) so frame 0 isn't an empty hook start.
- **Links and calls to action.** Some platforms (小红书 among them) penalise URLs and
  off-platform calls to action — in captions, end cards, drawn address bars and post text.
  Wording that reads as recruiting or paid work can be flagged too.
- **Post copy** per platform: a few title options within the length limit, a short body,
  5–8 hashtags.
- **Another language is a variant**, not a translation: same shots, music and clock, its own copy
  written for those readers (`"variants": ["en"]` in `project.json`) and its own soundtrack
  (`music-<lang>.wav`, since typed lines differ).

## 7. Deliver

```bash
pnpm video <project> all      # music, every language and format, every cover → out/
```

- Check the final mp4's first frame
  (`pnpm exec remotion ffmpeg -i <file>.mp4 -frames:v 1 first.png`), then send the films, the
  cover and `POST.md` (titles, body, hashtags, ready to paste; per platform).
- Commit the project with its `out/` films and covers. Open a pull request if the repository
  uses them; merge only when asked.

## Gotchas

- `remotion.config.ts` uses Chrome for Testing; the default headless shell can crash on macOS.
- `timeline.ts` and `music.ts` run under plain Node (type stripping): imports need `.ts`
  extensions, no parameter properties or enums, and `timeline.ts` imports nothing.
- CJK characters that aren't in `copy.ts` render in a fallback font.
- Inside a pnpm workspace, plain `pnpm install` in `videos/` installs into the root workspace;
  use `--ignore-workspace`.
