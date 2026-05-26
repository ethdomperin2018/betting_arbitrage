import fs from "fs";

const js = fs.readFileSync("_recovered-arbitrage.js", "utf8");
const m = js.match(
  /\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,([A-Za-z0-9+/=]+)/
);
if (!m) {
  console.error("No inline source map");
  process.exit(1);
}
const map = JSON.parse(Buffer.from(m[1], "base64").toString("utf8"));
const content = map.sourcesContent?.[0];
if (!content) {
  console.error("No sourcesContent in map");
  process.exit(1);
}
fs.mkdirSync("app/arbitrage", { recursive: true });
let ts = content;
if (!ts.includes('from "next/link"')) {
  ts =
    '"use client";\n\nimport Link from "next/link";\n' +
    ts.replace(/^"use client";\s*\n?/, "");
}
if (!ts.includes("← Home") && !ts.includes("href=\"/\"")) {
  ts = ts.replace(
    /(<header[^>]*>)/,
    '$1\n        <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Home</Link>'
  );
}
fs.writeFileSync("app/arbitrage/page.tsx", ts);
console.log("Wrote app/arbitrage/page.tsx,", ts.split("\n").length, "lines");
