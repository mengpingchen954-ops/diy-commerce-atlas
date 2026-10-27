import { writeFile } from "node:fs/promises";
import { exportMarkdown } from "../src/content.js";
await writeFile(
  new URL("../public/资料总集.md", import.meta.url),
  exportMarkdown(),
  "utf8",
);
console.log("完整资料已同步导出。");
