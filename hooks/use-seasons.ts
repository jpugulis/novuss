"use client";

import { useEffect, useState } from "react";
import { Season, seasons as baseSeasons } from "@/lib/tournament-data";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjVviAN5C7UA5D45f6bOdHLDYTuhvMK4wmv0EEdeDD3fpXAcct7DwMj_iAlqDkB52UpRD24xzBc4vz/pub?output=csv&gid=978382281";
const SEASON_YEAR = 2026;
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

function buildSeason(rows: string[][]): Season | null {
  if (!rows.length) return null;

  const header = rows[0].map((cell) => cell.trim());
  const nameIndex = header.findIndex((cell) => cell === "Spēlētāju saraksts");
  const top8Index = header.findIndex((cell) => cell === "TOP8");
  const top8AvgIndex = header.findIndex((cell) => cell === "TOP8 AVG");
  const pointsIndex = header.findIndex((cell) => cell === "Punkti KOPĀ");
  const avgIndex = header.findIndex((cell) => cell === "AVG");
  const stosesIndex = header.findIndex((cell) => cell === "Štoses");
  const tournamentsIndex = header.findIndex((cell) => cell === "Turnīri");

  if (nameIndex === -1 || top8Index === -1) return null;

  const players = rows
    .slice(1)
    .map((row) => {
      const rawName = row[nameIndex]?.trim();
      const name = rawName ? NAME_MAP[rawName] ?? rawName : "";
      if (!name) return null;

      const positionRaw = row[0]?.replace(".", "").trim();
      const position = parseNumber(positionRaw);
      if (!position) return null;

      return {
        name,
        top8: parseNumber(row[top8Index]),
        stoses: parseNumber(row[stosesIndex]),
        top8avg: parseNumber(row[top8AvgIndex]),
        punktiKopa: parseNumber(row[pointsIndex]),
        avg: parseNumber(row[avgIndex]),
        tournaments: parseNumber(row[tournamentsIndex]),
        position: Math.round(position),
      };
    })
    .filter((player): player is NonNullable<typeof player> => Boolean(player))
    .sort((a, b) => a.position - b.position)
    .slice(0, 10);

  if (!players.length) return null;

  return {
    year: SEASON_YEAR,
    players,
    comment: `2026.gada sezona iesākās ar turnīru, kurā nav seeded spēlētāji un vairākām interesantām izspēlēm, interesantiem pavērsieniem. THE G.O.A.T. aka Repča palika 7.vietā un Dzinča nebija ieradies, tāpēc TOPS šoreiz mazāk ierasts. TomyG rādīja spēcīgu sniegumu fināla pārliecinoši sakaujot Rūdi, Ziemim arī izdevās iegūt 2 štoses šajā turnīrā un 4. vietu un Birkants arī ierindojās uz pjedestāla 3.pakāpiena! No iepriekšējo sezonu TOP spēlētājiem Pūgulis nebija ieradies un Artchy aizvadīja pagalam neveiksmīgu sezonas sākumu.`,
    images: [
      { src: "/images/2026-tablo.jpg", caption: "2026. gada tablo - izslēgšanas spēles" },
      { src: "/images/2026-top3.jpg", caption: "2026. gada pirmā turnīra TOP3" },
    ],
  };
}

async function loadSeasons(): Promise<Season[] | null> {
  try {
    const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!response.ok) return null;

    const csvText = await response.text();
    const rows = parseCsv(csvText);
    const season2026 = buildSeason(rows);

    const merged = baseSorted.filter((season) => season.year !== SEASON_YEAR);
    if (season2026) {
      merged.unshift(season2026);
    }

    return merged.sort((a, b) => b.year - a.year);
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
