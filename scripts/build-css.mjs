#!/usr/bin/env node
/**
 * Compiles src/styles/package.css into dist/styles.css and copies the
 * standalone CSS entries next to it. Uses @tailwindcss/postcss (the same
 * plugin Storybook runs through postcss.config.js) rather than
 * @tailwindcss/cli, which pins a file watcher this one-shot build doesn't
 * need.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src/styles");
const dist = path.join(root, "dist");
const from = path.join(src, "package.css");
const to = path.join(dist, "styles.css");

const result = await postcss([tailwindcss({ base: root, optimize: { minify: true } })]).process(
  readFileSync(from, "utf8"),
  { from, to }
);
mkdirSync(dist, { recursive: true });
writeFileSync(to, result.css);

for (const file of ["fonts.css", "tailwind.css", "tokens.css"]) {
  copyFileSync(path.join(src, file), path.join(dist, file));
}
