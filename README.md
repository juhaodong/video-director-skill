# video-director

A [Claude Code](https://claude.com/claude-code) skill for making short promo videos **in code**
with [Remotion](https://www.remotion.dev): Claude works as director and motion engineer — brief,
storyboard, style options, shot-by-shot stills, a synthesised soundtrack with a sound on every
cut — and delivers the films (3:4 and 9:16), a cover and ready-to-paste post copy.

一个用代码做短视频（宣传片 / 小红书 / Reels）的 Claude Code skill：先写简报和分镜，给风格选项，
逐镜出静帧确认，音乐用合成器生成、每个切镜都有音效，最后交付 3:4 + 9:16 成片、封面和发布文案。

## What's inside

```
skills/video-director/
  SKILL.md      the way of working (what Claude reads)
  starter/      a working Remotion workspace to copy into your repo as videos/
    kit/        theme, fonts (incl. CJK subsetting), motion helpers, VideoRoot,
                audio/synth.ts — a tiny dependency-free synthesiser (drums, pads, plucks, UI sounds)
    projects/_template/   a 12-second, two-shot example with brief, storyboard, copy, timeline, music
    scripts/video.ts      `pnpm video new | studio | music | still | shot | render | cover | all`
```

The ideas that make it work:

- **One clock.** `timeline.ts` holds every cue and beat; shots and `music.ts` both read it, so
  every cut and landing has its sound on the exact frame.
- **Every word in `copy.ts`.** Easy edits, language variants with the same shape, CJK fonts
  subset from it.
- **Review in stills.** Claude renders key frames and looks at them before showing you anything,
  then re-renders only the shot you changed.
- **No samples, no licences.** The soundtrack is synthesised from code.

## Install

```bash
git clone https://github.com/juhaodong/video-director-skill.git
cp -R video-director-skill/skills/video-director ~/.claude/skills/
```

Or copy it into a single project's `.claude/skills/`. Then ask Claude Code for a video — "make a
15-second promo for this app" / "帮我做一条小红书宣传片". On first use it copies `starter/` into
`videos/` and asks you to fill in `videos/BRAND.md`.

Requirements: Node 22.18+, pnpm. Rendering uses Remotion's bundled Chrome and ffmpeg.

## License

MIT. Remotion itself has its own license — free for individuals and small teams; check
[remotion.dev/license](https://www.remotion.dev/license) for company use.
