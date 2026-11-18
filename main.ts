// News front page entry: write the repository's entry.png to
// /output/entry.png, with preflight validation and an atomic write.
// The front page itself is rendered from page.html by render.py;
// this program is the deliverable the sandbox runs.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024; // bounty gate: a whole PNG of at most 1 MiB
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = "/output";
const dest = join(outDir, "entry.png");

// --- preflight: the source must exist, be a PNG, and fit the size cap ---
if (!existsSync(src)) {
  console.error(`error: source image not found: ${src}`);
  process.exit(1);
}
const data = readFileSync(src);
if (data.length > MAX_BYTES) {
  console.error(`error: entry.png is ${data.length} bytes, over the 1 MiB cap`);
  process.exit(1);
}
const hasSignature = PNG_SIGNATURE.every((byte, i) => data[i] === byte);
if (!hasSignature) {
  console.error("error: entry.png does not start with the PNG signature");
  process.exit(1);
}

// --- atomic write: temp file in the same directory, then rename ---
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, `.entry.png.tmp-${process.pid}`);
writeFileSync(tmp, data);
renameSync(tmp, dest);
console.log(`wrote ${dest} (${data.length} bytes)`);
