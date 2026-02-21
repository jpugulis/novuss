"use client";

import { Season, seasons as baseSeasons } from "@/lib/tournament-data";

const baseSorted = [...baseSeasons].sort((a, b) => b.year - a.year);

export function useSeasons(): Season[] {
  return baseSorted;
}
