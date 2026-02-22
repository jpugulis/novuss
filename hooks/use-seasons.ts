"use client";

import { useEffect, useState } from "react";
import { MonthlyStandings, Season, seasons as baseSeasons } from "@/lib/tournament-data";

const SHEET_BASE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVQqxoZX9HB8fbTqhFcN9LnLqyVv-vNJ8IsL4OvplVDdKnzxV7T2X8RDt3_xltKl2WtWONj_OAsRms/pub?output=csv";
const SHEET_SEASONS = [
  { year: 2017, gid: "610551329" },
  { year: 2018, gid: "1555513506" },
  { year: 2019, gid: "1913034709" },
  { year: 2020, gid: "290983024" },
  { year: 2021, gid: "1029121250" },
  { year: 2022, gid: "802844939" },
  { year: 2023, gid: "1273478125" },
  { year: 2024, gid: "896123171" },
  { year: 2025, gid: "680304360" },
  { year: 2026, gid: "1659881521" },
] as const;

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

const baseSorted = [...baseSeasons].sort((a, b) => b.year - a.year);

let cachedSeasons: Season[] | null = null;
let inFlight: Promise<Season[] | null> | null = null;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
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

function normalizeCell(value: string | undefined): string {
  return value?.trim() ?? "";
}

function parseOptionalNumber(value: string | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.toUpperCase() === "COVID") return null;
  const normalized = trimmed.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseNumber(value: string | undefined): number {
  return parseOptionalNumber(value) ?? 0;
}

function normalizeName(rawName: string | undefined): string {
  const trimmed = rawName?.trim();
  if (!trimmed) return "";
  return NAME_MAP[trimmed] ?? trimmed;
}

function uniqueMonthNames(names: string[]): string[] {
  const counts = new Map<string, number>();
  return names.map((name) => {
    const current = counts.get(name) ?? 0;
    counts.set(name, current + 1);
    return current === 0 ? name : `${name} (${current + 1})`;
  });
}

function buildOldSeason(rows: string[][], year: number, baseSeason: Season | undefined): Season | null {
  if (rows.length === 0) return null;
  if (rows.length === 1 && normalizeCell(rows[0][0]).toUpperCase() === "COVID") {
    return {
      year,
      players: [],
      months: [],
      comment: baseSeason?.comment ?? "Dati importēti no Google Sheets.",
      images: baseSeason?.images,
    };
  }

  const header = rows[0].map((cell) => normalizeCell(cell));
  let nameIndex = header.indexOf("Vārds");
  if (nameIndex === -1) nameIndex = header.indexOf("Kopvērtējums");
  if (nameIndex === -1) nameIndex = 0;

  const summaryLabels = new Set(["KOPĀ", "Top", "Top3", "Top8", "AVG", "Vieta"]);
  const summaryIndexes = header
    .map((cell, index) => (summaryLabels.has(cell) ? index : -1))
    .filter((index) => index !== -1);
  const endIndex = summaryIndexes.length > 0 ? Math.min(...summaryIndexes) : header.length;

  const monthHeaders = uniqueMonthNames(
    header.slice(nameIndex + 1, endIndex).filter((cell) => cell.length > 0)
  );

  let dataStart = 1;
  const secondRowName = normalizeCell(rows[1]?.[nameIndex]);
  if (secondRowName.toLowerCase() === "vārds" || secondRowName.toLowerCase() === "punkti") {
    dataStart = 2;
  }

  const rowsParsed = rows.slice(dataStart).map((row) => {
    const name = normalizeName(row[nameIndex]);
    if (!name) return null;

    const monthPoints = monthHeaders.map((_, offset) =>
      parseNumber(row[nameIndex + 1 + offset])
    );

    const getValue = (label: string) => {
      const idx = header.indexOf(label);
      return idx === -1 ? null : parseOptionalNumber(row[idx]);
    };

    const total = getValue("KOPĀ") ?? monthPoints.reduce((sum, value) => sum + value, 0);
    const tournaments = monthPoints.filter((value) => value > 0).length;
    const sortedPoints = [...monthPoints].filter((value) => value > 0).sort((a, b) => b - a);
    const top8 = sortedPoints.slice(0, 8).reduce((sum, value) => sum + value, 0);
    const avg = getValue("AVG") ?? (tournaments > 0 ? total / tournaments : 0);
    const top8avg = tournaments > 0 ? top8 / Math.min(8, tournaments) : 0;
    const position = getValue("Vieta");

    return {
      name,
      monthPoints,
      total,
      top8,
      avg,
      top8avg,
      tournaments,
      position: position ? Math.round(position) : null,
    };
  });

  const filteredRows = rowsParsed.filter((row): row is NonNullable<typeof row> => Boolean(row));
  if (filteredRows.length === 0) return null;

  if (filteredRows.some((row) => row.position === null)) {
    filteredRows
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        if (b.top8 !== a.top8) return b.top8 - a.top8;
        return a.name.localeCompare(b.name, "lv");
      })
      .forEach((row, index) => {
        row.position = index + 1;
      });
  }

  const months: MonthlyStandings[] = monthHeaders
    .map((month, monthIndex) => {
      const results = filteredRows
        .map((row) => ({ name: row.name, points: row.monthPoints[monthIndex] }))
        .filter((result) => result.points > 0)
        .sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return a.name.localeCompare(b.name, "lv");
        })
        .map((result, index) => ({
          name: result.name,
          position: index + 1,
          points: result.points,
        }));

      return { month, results };
    })
    .filter((month) => month.results.length > 0);

  const players = filteredRows
    .map((row) => ({
      name: row.name,
      top8: Math.round(row.top8 * 10) / 10,
      stoses: 0,
      top8avg: Math.round(row.top8avg * 10) / 10,
      punktiKopa: Math.round(row.total * 10) / 10,
      avg: Math.round(row.avg * 10) / 10,
      tournaments: row.tournaments,
      position: row.position ?? 0,
    }))
    .sort((a, b) => a.position - b.position);

  return {
    year,
    players,
    months,
    comment: baseSeason?.comment ?? "Dati importēti no Google Sheets.",
    images: baseSeason?.images,
  };
}

function buildModernSeason(rows: string[][], year: number, baseSeason: Season | undefined): Season | null {
  if (rows.length === 0) return null;

  const header = rows[0].map((cell) => normalizeCell(cell));
  const nameIndex = header.indexOf("Spēlētāju saraksts");
  if (nameIndex === -1) return null;

  const positionIndex = header.indexOf("Vieta");
  const top8Index = header.indexOf("TOP8");
  const top8AvgIndex = header.indexOf("TOP8 AVG");
  const pointsIndex = header.indexOf("Punkti KOPĀ");
  const avgIndex = header.indexOf("AVG");
  const stosesIndex = header.indexOf("Štoses");
  const tournamentsIndex = header.indexOf("Apmeklēto turnīru skaits");

  const excluded = new Set([
    "Vieta",
    "Spēlētāju saraksts",
    "TOP8",
    "TOP8 AVG",
    "Punkti KOPĀ",
    "AVG",
    "Štoses",
    "Apmeklēto turnīru skaits",
  ]);

  const monthDefs: { month: string; positionIndex: number; pointsIndex: number }[] = [];
  for (let i = 0; i < header.length; i += 1) {
    const name = header[i];
    if (!name || excluded.has(name)) continue;
    monthDefs.push({ month: name, positionIndex: i, pointsIndex: i + 1 });
    i += 1;
  }

  const players = rows
    .slice(1)
    .map((row) => {
      const name = normalizeName(row[nameIndex]);
      if (!name) return null;

      const position = parseOptionalNumber(row[positionIndex]) ?? 0;
      if (!position) return null;

      const monthPoints = monthDefs.map(({ pointsIndex: ptsIdx }) =>
        parseOptionalNumber(row[ptsIdx]) ?? 0
      );
      const monthPositions = monthDefs.map(({ positionIndex: posIdx }) =>
        parseOptionalNumber(row[posIdx]) ?? 0
      );

      const tournaments = parseOptionalNumber(row[tournamentsIndex]) ??
        monthPoints.filter((value) => value > 0).length;
      const top8 = parseOptionalNumber(row[top8Index]) ?? 0;
      const top8avg = parseOptionalNumber(row[top8AvgIndex]) ??
        (tournaments > 0 ? top8 / Math.min(8, tournaments) : 0);

      return {
        name,
        position: Math.round(position),
        top8: Math.round(top8 * 10) / 10,
        top8avg: Math.round(top8avg * 10) / 10,
        punktiKopa: Math.round((parseOptionalNumber(row[pointsIndex]) ?? 0) * 10) / 10,
        avg: Math.round((parseOptionalNumber(row[avgIndex]) ?? 0) * 10) / 10,
        stoses: Math.round(parseOptionalNumber(row[stosesIndex]) ?? 0),
        tournaments: Math.round(tournaments),
        monthPoints,
        monthPositions,
      };
    })
    .filter((player): player is NonNullable<typeof player> => Boolean(player))
    .sort((a, b) => a.position - b.position);

  if (players.length === 0) return null;

  const months: MonthlyStandings[] = monthDefs
    .map(({ month }, monthIndex) => {
      const results = players
        .map((player) => ({
          name: player.name,
          position: Math.round(player.monthPositions[monthIndex] ?? 0),
          points: player.monthPoints[monthIndex] ?? 0,
        }))
        .filter((result) => result.position > 0 || result.points > 0)
        .sort((a, b) => {
          if (a.position && b.position && a.position !== b.position) {
            return a.position - b.position;
          }
          if (b.points !== a.points) return b.points - a.points;
          return a.name.localeCompare(b.name, "lv");
        });

      return { month, results };
    })
    .filter((month) => month.results.length > 0);

  return {
    year,
    players: players.map(({ monthPoints, monthPositions, ...rest }) => rest),
    months,
    comment: baseSeason?.comment ?? "Dati importēti no Google Sheets.",
    images: baseSeason?.images,
  };
}

function buildSeason(rows: string[][], year: number, baseSeason: Season | undefined): Season | null {
  const header = rows[0] ?? [];
  if (header.some((cell) => normalizeCell(cell) === "Spēlētāju saraksts")) {
    return buildModernSeason(rows, year, baseSeason);
  }
  return buildOldSeason(rows, year, baseSeason);
}

async function loadSeasons(): Promise<Season[] | null> {
  try {
    const fetchedSeasons = await Promise.all(
      SHEET_SEASONS.map(async ({ year, gid }) => {
        const url = `${SHEET_BASE_URL}&gid=${gid}`;
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;
        const csvText = await response.text();
        const rows = parseCsv(csvText);
        const baseSeason = baseSorted.find((season) => season.year === year);
        return buildSeason(rows, year, baseSeason);
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
