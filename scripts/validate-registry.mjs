#!/usr/bin/env node
// Validates registry files against docs/REGISTRY.md. Exit 1 on any violation.
// Usage: node scripts/validate-registry.mjs [registryDir=registry]
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? "registry";
const errors = [];
const KEY_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VISIBILITIES = new Set(["public", "hidden"]);
const STATUSES = new Set(["seed", "growing", "dormant"]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function checkInterestsFile(path, expectedVisibility, required) {
  if (!existsSync(path)) {
    if (required) errors.push(`${path}: missing`);
    return;
  }
  let doc;
  try {
    doc = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`${path}: invalid JSON (${e.message})`);
    return;
  }
  if (doc.version !== 1) errors.push(`${path}: version must be 1`);
  if (!Array.isArray(doc.interests)) {
    errors.push(`${path}: interests must be an array`);
    return;
  }
  const seen = new Set();
  doc.interests.forEach((it, i) => {
    const at = `${path}#${i}`;
    for (const f of ["key", "label", "description", "visibility", "specificity", "facet", "status"]) {
      if (it[f] === undefined) errors.push(`${at}: missing field "${f}"`);
    }
    if (it.key !== undefined) {
      if (!KEY_RE.test(String(it.key))) errors.push(`${at}: key "${it.key}" not kebab-case`);
      if (seen.has(it.key)) errors.push(`${at}: duplicate key "${it.key}"`);
      seen.add(it.key);
    }
    if (it.visibility !== undefined) {
      if (!VISIBILITIES.has(it.visibility)) errors.push(`${at}: visibility "${it.visibility}" invalid`);
      else if (it.visibility !== expectedVisibility)
        errors.push(`${at}: visibility "${it.visibility}" not allowed in this file (expected ${expectedVisibility})`);
    }
    if (it.specificity !== undefined && ![1, 2, 3].includes(it.specificity))
      errors.push(`${at}: specificity must be 1, 2, or 3`);
    if (it.status !== undefined && !STATUSES.has(it.status)) errors.push(`${at}: status "${it.status}" invalid`);
    if (it.planted !== undefined && it.planted !== null && !DATE_RE.test(String(it.planted)))
      errors.push(`${at}: planted must be YYYY-MM-DD or null`);
    if (it.lastMatched !== undefined && it.lastMatched !== null && !DATE_RE.test(String(it.lastMatched)))
      errors.push(`${at}: lastMatched must be YYYY-MM-DD or null`);
  });
}

function checkPersona(path) {
  if (!existsSync(path)) {
    errors.push(`${path}: missing`);
    return;
  }
  let p;
  try {
    p = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`${path}: invalid JSON (${e.message})`);
    return;
  }
  for (const f of ["name", "repName", "disclosure", "contactRelease", "commitmentRegister"])
    if (!p[f]) errors.push(`${path}: missing field "${f}"`);
  if (p.disclosure && p.disclosure !== "always")
    errors.push(`${path}: disclosure must be "always" (art. 50; no other value implemented)`);
  if (p.contactRelease && !["on-mutual-pursue", "never"].includes(p.contactRelease))
    errors.push(`${path}: contactRelease "${p.contactRelease}" invalid`);
  if (p.commitmentRegister && p.commitmentRegister !== "proposal-only")
    errors.push(`${path}: commitmentRegister must be "proposal-only"`);
}

if (!existsSync(join(dir, "public-doc.md"))) errors.push(`${dir}/public-doc.md: missing`);
checkInterestsFile(join(dir, "interests.json"), "public", true);
checkInterestsFile(join(dir, "private", "interests.hidden.json"), "hidden", false);
checkPersona(join(dir, "persona.json"));

if (errors.length) {
  console.error(`registry INVALID (${errors.length}):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`registry OK: ${dir}`);
