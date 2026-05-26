import fs from "fs";

const path = "app/arbitrage/page.tsx";
let s = fs.readFileSync(path, "utf8");
s = s.replace(/  return \(\n    <div><\/div>\n/, "  return (\n");
s = s
  .split("\n")
  .map((line) => {
    if (line.startsWith("    // ")) return line.slice(6);
    if (line === "    //") return "";
    return line;
  })
  .join("\n");
fs.writeFileSync(path, s);
console.log("Done");
