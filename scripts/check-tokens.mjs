#!/usr/bin/env node
// PROJECT_SPEC §14.1 — enforce "디자인 시스템 토큰 외의 값 금지" (§2-3) across
// src/**/*.css (CSS Modules included), excluding tokens.css itself (the one
// place raw hex/shadow/z-index values are allowed to live).
//
// Checks:
//   1. z-index must be var(--z-*)
//   2. margin/padding/gap (and directional/logical variants) px values must be
//      in the allowed set, unless the exact "property: value" pair is
//      registered in scripts/ds-exceptions.json with a DS section reference.
//   3. border-radius px values must be one of 4/8/12/24/9999 (same exception path)
//   4. box-shadow must be var(--shadow-*)
//   5. no hex color literals outside tokens.css

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const EXCEPTIONS_PATH = path.join(__dirname, "ds-exceptions.json");

const ALLOWED_SPACING_PX = new Set([
  0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 60, 80, 100, 120, 140,
]);
const ALLOWED_RADIUS_PX = new Set([4, 8, 12, 24, 9999]);

const SPACING_PROP_RE =
  /^(margin|padding|gap|row-gap|column-gap)(-(top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end))?$/;
const RADIUS_PROP_RE =
  /^(border-radius|border-top-left-radius|border-top-right-radius|border-bottom-left-radius|border-bottom-right-radius)$/;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const PX_NUM_RE = /(-?\d+(?:\.\d+)?)px/g;

function normalizeValue(value) {
  return value.replace(/\s+/g, " ").trim();
}

function loadExceptions() {
  const raw = JSON.parse(readFileSync(EXCEPTIONS_PATH, "utf8"));
  const set = new Set(raw.map((e) => `${e.property.toLowerCase()}::${normalizeValue(e.value)}`));
  return set;
}

function isExempt(exceptions, property, value) {
  return exceptions.has(`${property.toLowerCase()}::${normalizeValue(value)}`);
}

function walkCssFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walkCssFiles(full));
    } else if (entry.endsWith(".css") && entry !== "tokens.css") {
      out.push(full);
    }
  }
  return out;
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function checkFile(filePath, exceptions) {
  const relPath = path.relative(ROOT, filePath);
  const raw = readFileSync(filePath, "utf8");
  const css = stripComments(raw);
  const violations = [];

  // Rule 5: hex color literals anywhere in the file.
  for (const match of css.matchAll(HEX_RE)) {
    violations.push(
      `hex 색상 리터럴 사용: "${match[0]}" — 색상은 tokens.css의 var(--...)만 사용해야 합니다.`,
    );
  }

  // Declaration-level rules (1-4).
  const declRe = /([a-zA-Z-]+)\s*:\s*([^;{}]+);/g;
  for (const match of css.matchAll(declRe)) {
    const prop = match[1].trim().toLowerCase();
    const value = normalizeValue(match[2]);

    if (prop === "z-index") {
      if (!/^var\(--z-[\w-]+\)$/.test(value)) {
        violations.push(`z-index: ${value} — var(--z-*) 토큰만 허용됩니다.`);
      }
      continue;
    }

    if (prop === "box-shadow") {
      if (!/^var\(--shadow-[\w-]+\)$/.test(value) && !isExempt(exceptions, prop, value)) {
        violations.push(`box-shadow: ${value} — var(--shadow-*) 토큰만 허용됩니다.`);
      }
      continue;
    }

    if (RADIUS_PROP_RE.test(prop)) {
      if (isExempt(exceptions, prop, value)) continue;
      const nums = [...value.matchAll(PX_NUM_RE)].map((m) => Number(m[1]));
      if (value.includes("9999px")) continue; // radius/full shorthand written directly
      for (const n of nums) {
        if (!ALLOWED_RADIUS_PX.has(n)) {
          violations.push(
            `${prop}: ${value} — ${n}px는 허용된 radius 값(4/8/12/24/9999)이 아닙니다. (ds-exceptions.json에 근거 절과 함께 등록하거나 토큰 값으로 바꾸세요)`,
          );
        }
      }
      continue;
    }

    if (SPACING_PROP_RE.test(prop)) {
      if (isExempt(exceptions, prop, value)) continue;
      const nums = [...value.matchAll(PX_NUM_RE)].map((m) => Number(m[1]));
      for (const n of nums) {
        if (!ALLOWED_SPACING_PX.has(n)) {
          violations.push(
            `${prop}: ${value} — ${n}px는 허용된 spacing 값이 아닙니다. (ds-exceptions.json에 근거 절과 함께 등록하거나 토큰 값으로 바꾸세요)`,
          );
        }
      }
    }
  }

  return violations.map((v) => `${relPath}: ${v}`);
}

function main() {
  const exceptions = loadExceptions();
  const files = walkCssFiles(SRC_DIR);
  let allViolations = [];

  for (const file of files) {
    allViolations = allViolations.concat(checkFile(file, exceptions));
  }

  if (allViolations.length > 0) {
    console.error(`check-tokens: ${allViolations.length}건의 토큰 규칙 위반을 찾았습니다.\n`);
    for (const v of allViolations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`check-tokens: 통과 (${files.length}개 CSS 파일 검사, tokens.css 제외)`);
}

main();
