#!/usr/bin/env node
// PROJECT_SPEC §14.1 — count "{{TODO" occurrences in src/content and any build
// output. Always prints the count; only fails when NODE_ENV=production and
// ALLOW_TODO is not set (so local/dev builds are never blocked by this).

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const NEEDLE = "{{TODO";

function walk(dir, extensions) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git") continue;
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walk(full, extensions));
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function countIn(filePath) {
  const text = readFileSync(filePath, "utf8");
  return text.split(NEEDLE).length - 1;
}

function main() {
  const targets = [
    ...walk(path.join(ROOT, "src", "content"), [".ts", ".tsx"]),
    ...walk(path.join(ROOT, ".next"), [".html", ".json"]),
  ];

  let total = 0;
  const perFile = [];
  for (const file of targets) {
    const count = countIn(file);
    if (count > 0) {
      total += count;
      perFile.push({ file: path.relative(ROOT, file), count });
    }
  }

  console.log(`check-todo: '{{TODO' 발견 ${total}건`);
  for (const { file, count } of perFile) {
    console.log(`  - ${file}: ${count}건`);
  }

  const isProduction = process.env.NODE_ENV === "production";
  const allowTodo = !!process.env.ALLOW_TODO;

  if (isProduction && !allowTodo && total > 0) {
    console.error(
      "\ncheck-todo: NODE_ENV=production에서 '{{TODO'가 남아 있습니다. " +
        "실제 값으로 채우거나, 의도적으로 배포하려면 ALLOW_TODO=1을 설정하세요.",
    );
    process.exit(1);
  }

  process.exit(0);
}

main();
