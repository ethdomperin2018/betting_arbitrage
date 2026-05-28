/**
 * Downloads brand logos into public/bookmakers/.
 * Wiki SVGs where available; Google favicon PNG for the rest.
 *
 * Run: npm run logos
 */
import { access, copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "bookmakers");

/** @type {Record<string, { filePath: string, base?: string }>} */
const WIKI_FILES = {
  fanduel: { filePath: "Fanduel_logo.svg" },
  draftkings: {
    filePath: "DraftKings_logo.svg",
    base: "https://en.wikipedia.org/wiki/Special:FilePath/",
  },
  bet365: { filePath: "Bet365_Logo.svg" },
  caesars: { filePath: "Caesars_logo.svg" },
  unibet_us: { filePath: "Unibet_logo.svg" },
};

/** bookKey → domain (keep in sync with lib/bookmakerLogos.ts BOOK_FAVICON_DOMAINS) */
const FAVICON_DOMAINS = {
  fanduel: "fanduel.com",
  draftkings: "draftkings.com",
  betmgm: "betmgm.com",
  betrivers: "betrivers.com",
  williamhill_us: "bet365.com",
  caesars: "caesars.com",
  bovada: "bovada.lv",
  pointsbetus: "pointsbet.com",
  unibet_us: "unibet.com",
  foxbet: "fanduel.com",
  sugarhouse: "playsugarhouse.com",
  barstool: "barstoolsportsbook.com",
  betonlineag: "betonline.ag",
  lowvig: "lowvig.com",
  betus: "betus.com",
  mybookieag: "mybookie.ag",
  wynnbet: "wynnbet.com",
  twinspires: "twinspires.com",
  fanatics: "sportsbook.fanatics.com",
};

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchUrl(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { buf: Buffer.from(await res.arrayBuffer()), finalUrl: res.url };
}

async function fetchWiki(bookKey, { filePath, base }) {
  const root =
    base ?? "https://commons.wikimedia.org/wiki/Special:FilePath/";
  const url = `${root}${encodeURIComponent(filePath)}`;
  const { buf, finalUrl } = await fetchUrl(url);
  const outExt = path.extname(new URL(finalUrl).pathname) || ".svg";
  const outPath = path.join(OUT, `${bookKey}${outExt}`);
  await writeFile(outPath, buf);
  console.log(`✓ ${bookKey} (wiki) → ${path.relative(ROOT, outPath)}`);
}

async function fetchFavicon(bookKey, domain) {
  const pngPath = path.join(OUT, `${bookKey}.png`);
  if (await fileExists(pngPath)) {
    console.log(`· ${bookKey} (favicon skipped, exists)`);
    return;
  }
  const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const { buf } = await fetchUrl(url);
  await writeFile(pngPath, buf);
  console.log(`✓ ${bookKey} (favicon) → ${path.relative(ROOT, pngPath)}`);
}

await mkdir(OUT, { recursive: true });

for (const [key, spec] of Object.entries(WIKI_FILES)) {
  try {
    await fetchWiki(key, spec);
  } catch (e) {
    console.warn(`✗ ${key} (wiki): ${e.message}`);
  }
}

for (const [key, domain] of Object.entries(FAVICON_DOMAINS)) {
  try {
    await fetchFavicon(key, domain);
  } catch (e) {
    console.warn(`✗ ${key} (favicon): ${e.message}`);
  }
}

try {
  await copyFile(path.join(OUT, "bet365.svg"), path.join(OUT, "williamhill_us.svg"));
  console.log("✓ williamhill_us → copy of bet365.svg");
} catch {
  console.warn("✗ williamhill_us alias skipped");
}

/** Prefer SVG when both exist (wordmark); otherwise PNG/WebP */
async function writeManifest() {
  const files = (await readdir(OUT)).filter((f) =>
    /\.(svg|png|webp)$/i.test(f)
  );
  const byKey = {};
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const key = path.basename(file, ext);
    if (!byKey[key]) byKey[key] = {};
    byKey[key][ext] = `/bookmakers/${file}`;
  }

  const manifest = {};
  const rank = { ".svg": 0, ".png": 1, ".webp": 2 };
  for (const [key, exts] of Object.entries(byKey)) {
    const chosen = Object.entries(exts).sort(
      (a, b) => rank[a[0]] - rank[b[0]]
    )[0];
    if (chosen) manifest[key] = chosen[1];
  }

  const manifestPath = path.join(ROOT, "lib", "bookmaker-logos-manifest.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `✓ manifest → ${path.relative(ROOT, manifestPath)} (${Object.keys(manifest).length} books)`
  );
}

await writeManifest();
