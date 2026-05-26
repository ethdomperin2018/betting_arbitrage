import fs from "fs";

const chunkPath =
  ".next/dev/static/webpack/app/page.b829fc15a5fa5e1b.hot-update.js";
const s = fs.readFileSync(chunkPath, "utf8");

const needle = 'eval(__webpack_require__.ts("';
let best = "";
let pos = 0;
while (true) {
  const i = s.indexOf(needle, pos);
  if (i === -1) break;
  let j = i + needle.length;
  let raw = "";
  while (j < s.length) {
    const c = s[j];
    if (c === "\\") {
      raw += s.slice(j, j + 2);
      j += 2;
      continue;
    }
    if (c === '"') break;
    raw += c;
    j++;
  }
  const decoded = JSON.parse(`"${raw}"`);
  if (
    decoded.includes("DEFAULT_INTERVAL_SEC") &&
    decoded.length > best.length
  ) {
    best = decoded;
  }
  pos = j + 1;
}

if (!best) {
  console.error("Could not find page module in chunk");
  process.exit(1);
}

fs.writeFileSync("_recovered-arbitrage.js", best);
console.log("Wrote", best.length, "chars,", best.split("\n").length, "lines");
