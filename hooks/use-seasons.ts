"use client";

import { useEffect, useState } from "react";
import { MonthlyStandings, Season, seasons as baseSeasons } from "@/lib/tournament-data";

const SHEET_BASE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjVviAN5C7UA5D45f6bOdHLDYTuhvMK4wmv0EEdeDD3fpXAcct7DwMj_iAlqDkB52UpRD24xzBc4vz/pub?output=csv";
const SHEET_SEASONS = [
  { year: 2026, gid: "978382281" },
  { year: 2025, gid: "1991884093" },
  { year: 2024, gid: "1490465043" },
] as const;
const STOSES_GID = "280786356";
const NAME_MAP: Record<string, string> = {
  "Kārlis Rēpelis": "Repča",
  "Dzintis Aļeksejevs": "Dzinča",
  "Kārlis Orleāns": "Orļiks",
  "Jānis Pūgulis": "Pūgulis",
  "Artūrs Cekuliņš": "Artchy",
  "Toms Ziemelis": "Ziemis",
  "Rūdolfs Kuļikovskis": "Rūdis",
  "Toms Ģērmanis": "TomyG",
  "Edgars Staškevičs": "Tuncis",
  "Oskars Kasņikovskis": "Osīc",
  "Pēteris Birkants": "Birkants",
  "Oskars Grizāns": "OG",
  "Dāvis Dreika": "Dāvīc",
  "Reinis Līviņš": "ROBO",
  "Madara Saukāne": "Madara",
  "Madara Saukāna": "Madara",
};

let cachedSeasons: Season[] | null = null;
let inFlight: Promise<Season[] | null> | null = null;

const baseSorted = [...baseSeasons].sort((a, b) => b.year - a.year);
const MONTH_NAMES = [
  "Janvāris",
  "Februāris",
  "Marts",
  "Aprīlis",
  "Maijs",
  "Jūnijs",
  "Jūlijs",
  "Augusts",
  "Septembris",
  "Oktobris",
  "Novembris",
  "Decembris",
] as const;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function parseNumber(value: string | undefined): number {
  if (!value) return 0;
  const normalized = value.trim().replace(",", ".");
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeName(rawName: string | undefined): string {
  const trimmed = rawName?.trim();
  if (!trimmed) return "";
  return NAME_MAP[trimmed] ?? trimmed;
}

function parseStosesTotals(rows: string[][]): Map<string, number> {
  const totals = new Map<string, number>();
  const stosesHeaderIndex = rows.findIndex((row) => row[0]?.trim() === "Štoses");
  if (stosesHeaderIndex === -1) return totals;

  for (let i = stosesHeaderIndex + 1; i < rows.length; i += 1) {
    const row = rows[i];
    const name = normalizeName(row[0]);
    if (!name) break;
    const total = parseNumber(row[1]);
    if (total > 0) {
      totals.set(name, total);
    }
  }

  return totals;
}

async function loadStosesTotals(): Promise<Map<string, number>> {
  try {
    const url = `${SHEET_BASE_URL}&gid=${STOSES_GID}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return new Map<string, number>();
    const csvText = await response.text();
    const rows = parseCsv(csvText);
    return parseStosesTotals(rows);
  } catch {
    return new Map<string, number>();
  }
}

function buildSeason(
  rows: string[][],
  year: number,
  baseSeason: Season | undefined,
  stosesTotals: Map<string, number>
): Season | null {
  if (!rows.length) return null;

  const header = rows[0].map((cell) => cell.trim());
  const monthDefs = MONTH_NAMES.map((month) => ({
    month,
    index: header.findIndex((cell) => cell === month),
  })).filter((def) => def.index !== -1);
  const nameIndex = header.findIndex((cell) => cell === "Spēlētāju saraksts");
  const top8Index = header.findIndex((cell) => cell === "TOP8");
  const top8AvgIndex = header.findIndex((cell) => cell === "TOP8 AVG");
  const pointsIndex = header.findIndex((cell) => cell === "Punkti KOPĀ");
  const avgIndex = header.findIndex((cell) => cell === "AVG");
  const stosesIndex = header.findIndex((cell) => cell === "Štoses");
  const tournamentsIndex = header.findIndex((cell) => cell === "Turnīri");
  const tournamentsAltIndex = header.findIndex((cell) => cell === "Apmeklēto turnīru skaits");

  if (nameIndex === -1 || top8Index === -1) return null;

  const monthResultsMap = new Map<string, { name: string; position: number; points: number }[]>();

  const players = rows
    .slice(1)
    .map((row) => {
      const name = normalizeName(row[nameIndex]);
      if (!name) return null;

      const positionRaw = row[0]?.replace(".", "").trim();
      const position = parseNumber(positionRaw);
      if (!position) return null;

      monthDefs.forEach(({ month, index }) => {
        const positionCell = row[index]?.replace(".", "").trim();
        const pointsCell = row[index + 1]?.trim();
        const monthPosition = parseNumber(positionCell);
        const monthPoints = parseNumber(pointsCell);

        if (!monthPosition && !monthPoints) return;

        const existing = monthResultsMap.get(month) ?? [];
        existing.push({
          name,
          position: monthPosition ? Math.round(monthPosition) : 0,
          points: monthPoints,
        });
        monthResultsMap.set(month, existing);
      });

      const tournamentsValueIndex = tournamentsIndex !== -1 ? tournamentsIndex : tournamentsAltIndex;
      const tournamentsValue =
        tournamentsValueIndex !== -1 ? parseNumber(row[tournamentsValueIndex]) : 0;

      const stosesValueFromSheet = stosesIndex !== -1 ? parseNumber(row[stosesIndex]) : 0;
      const stosesOverride = year === 2024 ? stosesTotals.get(name) ?? 0 : stosesValueFromSheet;

      return {
        name,
        top8: parseNumber(row[top8Index]),
        stoses: stosesOverride,
        top8avg: parseNumber(row[top8AvgIndex]),
        punktiKopa: parseNumber(row[pointsIndex]),
        avg: parseNumber(row[avgIndex]),
        tournaments: tournamentsValue,
        position: Math.round(position),
      };
    })
    .filter((player): player is NonNullable<typeof player> => Boolean(player))
    .sort((a, b) => a.position - b.position)
    .filter((player) => player.position > 0);

  if (!players.length) return null;

  const months: MonthlyStandings[] = monthDefs
    .map(({ month }) => {
      const results = (monthResultsMap.get(month) ?? [])
        .filter((result) => result.position > 0 || result.points > 0)
        .sort((a, b) => {
          if (a.position && b.position && a.position !== b.position) {
            return a.position - b.position;
          }
          return b.points - a.points;
        });

      return { month, results };
    })
    .filter((month) => month.results.length > 0);

  return {
    year,
    players,
    months,
    comment:
      baseSeason?.comment ??
      `2026.gada sezona iesākās ar turnīru, kurā nav seeded spēlētāji un vairākām interesantām izspēlēm, interesantiem pavērsieniem. THE G.O.A.T. aka Repča palika 7.vietā un Dzinča nebija ieradies, tāpēc TOPS šoreiz mazāk ierasts. TomyG rādīja spēcīgu sniegumu fināla pārliecinoši sakaujot Rūdi, Ziemim arī izdevās iegūt 2 štoses šajā turnīrā un 4. vietu un Birkants arī ierindojās uz pjedestāla 3.pakāpiena! No iepriekšējo sezonu TOP spēlētājiem Pūgulis nebija ieradies un Artchy aizvadīja pagalam neveiksmīgu sezonas sākumu.`,
    images:
      baseSeason?.images ??
      (year === 2026
        ? [
            { src: "/images/2026-tablo.jpg", caption: "2026. gada tablo - izslēgšanas spēles" },
            { src: "/images/2026-top3.jpg", caption: "2026. gada pirmā turnīra TOP3" },
          ]
        : undefined),
  };
}

async function loadSeasons(): Promise<Season[] | null> {
  try {
    const stosesTotals = await loadStosesTotals();
    const fetchedSeasons = await Promise.all(
      SHEET_SEASONS.map(async ({ year, gid }) => {
        const url = `${SHEET_BASE_URL}&gid=${gid}`;
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;
        const csvText = await response.text();
        const rows = parseCsv(csvText);
        const baseSeason = baseSorted.find((season) => season.year === year);
        return buildSeason(rows, year, baseSeason, stosesTotals);
      })
    );

    const seasonMap = new Map<number, Season>();
    baseSorted.forEach((season) => {
      seasonMap.set(season.year, season);
    });

    fetchedSeasons.forEach((season) => {
      if (season) {
        seasonMap.set(season.year, season);
      }
    });

    return Array.from(seasonMap.values()).sort((a, b) => b.year - a.year);
  } catch {
    return null;
  }
}

export function useSeasons(): Season[] {
  const [seasons, setSeasons] = useState<Season[]>(cachedSeasons ?? baseSorted);

  useEffect(() => {
    if (cachedSeasons) {
      setSeasons(cachedSeasons);
      return;
    }

    if (!inFlight) {
      inFlight = loadSeasons()
        .then((data) => {
          if (data) cachedSeasons = data;
          return data;
        })
        .catch(() => null);
    }

    inFlight.then((data) => {
      if (data) setSeasons(data);
    });
  }, []);

  return seasons;
}
