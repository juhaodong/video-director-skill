import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { continueRender, delayRender } from "remotion";

// Latin: Inter. CJK: Noto Sans SC, subset by Google Fonts to the characters the video uses (the
// full family is ~100 chunks per weight). Swap in your brand's faces here.
const inter = loadInter("normal", { weights: ["400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

/** Load every @font-face in a stylesheet under `family`. */
async function loadCss(family: string, url: string) {
  const css = await (await fetch(url)).text();
  const faces = [...css.matchAll(/@font-face\s*{([^}]*)}/g)].map((m) => m[1]!);
  await Promise.all(
    faces.map(async (body) => {
      const weight = /font-weight:\s*(\d+)/.exec(body)?.[1] ?? "400";
      let src = /src:\s*url\(['"]?([^'")]+)['"]?\)/.exec(body)?.[1];
      if (!src) return;
      if (src.startsWith("//")) src = `https:${src}`;
      const face = new FontFace(family, `url(${src})`, { weight });
      await face.load();
      document.fonts.add(face);
    }),
  );
}

function loadSubset(family: string, weights: string, chars: string) {
  const text = encodeURIComponent([...new Set(chars)].join(""));
  return loadCss(family, `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weights}&text=${text}&display=block`);
}

/** Call once from a project's index.ts with every character it puts on screen. */
export function loadFonts(text: string) {
  const handle = delayRender("CJK font subset");
  loadSubset("Noto Sans SC", "500;700;900", text).finally(() => continueRender(handle));
}

export const fontFamily = `${inter.fontFamily}, "Noto Sans SC", sans-serif`;
