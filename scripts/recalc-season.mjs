#!/usr/bin/env node
/**
 * Pārrēķina sezonas kopvērtējumu no mēnešu rezultātiem lib/seasons.generated.json failā.
 *
 * Lietošana:
 *   node scripts/recalc-season.mjs 2026            # pārrēķina un ieraksta failā
 *   node scripts/recalc-season.mjs 2026 --check    # tikai salīdzina, neko neraksta
 *
 * Datu modelis:
 *  - season.months[].results[] : { name, position, points, stoses? }
 *      "stoses" (neobligāts) = štošu skaits šajā turnīrā (apvilktais Š uz tablo).
 *  - season.stosesBase : { [name]: n }  (neobligāts)
 *      Štošu sākuma atlikums, ja mēnešu ierakstos štoses nav pierakstītas no sezonas sākuma.
 *      Kopā sezonā: stosesBase[name] + summa no months[].results[].stoses.
 *      Ja nav ne stosesBase, ne mēnešu štošu — saglabā esošo vērtību no players[].
 */
import fs from "fs";
import { fileURLToPath } from "url";

const FILE = fileURLToPath(new URL("../lib/seasons.generated.json", import.meta.url));
const args = process.argv.slice(2);
const check = args.includes("--check");
const years = args.filter((a) => /^\d{4}$/.test(a)).map(Number);
if (years.length === 0) {
  console.error("Norādi gadu, piem.: node scripts/recalc-season.mjs 2026 [--check]");
  process.exit(1);
}

const seasons = JSON.parse(fs.readFileSync(FILE, "utf8"));
const r1 = (x) => Math.round(x * 10) / 10;

function recalcSeason(season) {
  const agg = new Map();
  (season.months || []).forEach((m, mi) => {
    for (const r of m.results || []) {
      const a = agg.get(r.name) || { points: [], stoses: 0, firstMonth: mi, bestPos: 99 };
      a.points.push(r.points);
      if (r.stoses) a.stoses += r.stoses;
      if (r.position < a.bestPos) a.bestPos = r.position;
      agg.set(r.name, a);
    }
  });
  const prev = new Map((season.players || []).map((p) => [p.name, p]));
  const base = season.stosesBase || {};
  const players = [...agg.entries()].map(([name, a]) => {
    const total = r1(a.points.reduce((s, x) => s + x, 0));
    const sorted = [...a.points].sort((x, y) => y - x);
    const top8 = r1(sorted.slice(0, 8).reduce((s, x) => s + x, 0));
    let stoses;
    if (name in base || a.stoses > 0) stoses = (base[name] || 0) + a.stoses;
    else stoses = prev.get(name)?.stoses || 0;
    return {
      name,
      top8,
      stoses,
      top8avg: r1(top8 / 8),
      punktiKopa: total,
      avg: r1(total / a.points.length),
      tournaments: a.points.length,
      position: 0,
      _fm: a.firstMonth,
      _bp: a.bestPos,
    };
  });
  players.sort(
    (x, y) =>
      y.punktiKopa - x.punktiKopa ||
      y.top8 - x.top8 ||
      y.stoses - x.stoses ||
      x._fm - y._fm ||
      x._bp - y._bp ||
      x.name.localeCompare(y.name, "lv")
  );
  players.forEach((p, i) => {
    p.position = i + 1;
    delete p._fm;
    delete p._bp;
  });
  return players;
}

let changed = false;
for (const year of years) {
  const season = seasons.find((s) => s.year === year);
  if (!season) {
    console.error(`Sezona ${year} nav atrasta.`);
    process.exit(1);
  }
  const computed = recalcSeason(season);
  const existing = season.players || [];

  // salīdzinājums
  const byName = new Map(existing.map((p) => [p.name, p]));
  const diffs = [];
  for (const c of computed) {
    const e = byName.get(c.name);
    if (!e) {
      diffs.push(`+ ${c.name} (jauns): ${JSON.stringify(c)}`);
      continue;
    }
    for (const k of ["top8", "stoses", "top8avg", "punktiKopa", "avg", "tournaments", "position"]) {
      if (e[k] !== c[k]) diffs.push(`~ ${c.name}.${k}: ${e[k]} -> ${c[k]}`);
    }
  }
  for (const e of existing)
    if (!computed.find((c) => c.name === e.name)) diffs.push(`- ${e.name} (nav mēnešu datos)`);

  if (diffs.length === 0) {
    console.log(`${year}: viss sakrīt (${computed.length} spēlētāji).`);
  } else {
    console.log(`${year}: ${diffs.length} izmaiņas:`);
    for (const d of diffs) console.log("  " + d);
  }

  if (!check && diffs.length > 0) {
    season.players = computed;
    changed = true;
  }
}

if (changed) {
  fs.writeFileSync(FILE, JSON.stringify(seasons, null, 2) + "\n", "utf8");
  console.log("Ierakstīts:", FILE);
} else if (!check) {
  console.log("Nekas nav jāraksta.");
}
