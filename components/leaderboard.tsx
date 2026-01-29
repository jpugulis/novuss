"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Flame,
  ExternalLink,
  CalendarDays,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { rulebookUrl } from "@/lib/tournament-data";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useSeasons } from "@/hooks/use-seasons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const positionStyles: Record<number, { icon: typeof Trophy | null; emoji: string | null; color: string; bg: string }> = {
  1: { icon: null, emoji: "🐐", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  2: { icon: Medal, emoji: null, color: "text-gray-300", bg: "bg-gray-300/10 border-gray-300/30" },
  3: { icon: Medal, emoji: null, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  4: { icon: null, emoji: "🪵", color: "text-amber-700", bg: "bg-amber-700/10 border-amber-700/30" },
};

export function Leaderboard() {
  const seasons = useSeasons();
  const [selectedYear, setSelectedYear] = useState(() => seasons[0]?.year ?? 2025);
  const [hasUserSelected, setHasUserSelected] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | null>(null);
  const [playerSeasonYear, setPlayerSeasonYear] = useState<number | null>(null);
  const [pendingMonthParam, setPendingMonthParam] = useState<string | null>(null);
  const [pendingPlayerParam, setPendingPlayerParam] = useState<string | null>(null);
  const [sortPlayerMonthsByPoints, setSortPlayerMonthsByPoints] = useState(false);
  const isGoatSeason = selectedYear !== 2026;
  const isActiveSeason = selectedYear === 2026;

  useEffect(() => {
    if (hasUserSelected || seasons.length === 0) return;
    if (selectedYear !== seasons[0].year) {
      setSelectedYear(seasons[0].year);
    }
  }, [hasUserSelected, seasons, selectedYear]);

  const currentSeason = seasons.find((s) => s.year === selectedYear);
  const months = useMemo(() => currentSeason?.months ?? [], [currentSeason]);
  const hasMonthlyData = months.length > 0;
  const maxTop8 = useMemo(
    () => (currentSeason ? Math.max(...currentSeason.players.map((player) => player.top8)) : 0),
    [currentSeason]
  );
  const playerSeasons = useMemo(() => {
    if (!selectedPlayerName) return [];
    return seasons.filter((season) =>
      season.players.some((player) => player.name === selectedPlayerName)
    );
  }, [seasons, selectedPlayerName]);
  const playerSeasonYears = useMemo(() => playerSeasons.map((season) => season.year), [playerSeasons]);
  const playerSeasonIndex = playerSeasonYear ? playerSeasonYears.indexOf(playerSeasonYear) : -1;

  useEffect(() => {
    setShowAllPlayers(false);
    setSelectedPlayerName(null);
    setSortPlayerMonthsByPoints(false);
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedPlayerName || playerSeasons.length === 0) {
      setPlayerSeasonYear(null);
      return;
    }
    const preferredYear =
      playerSeasons.find((season) => season.year === selectedYear)?.year ?? playerSeasons[0].year;
    setPlayerSeasonYear((prev) => {
      if (prev && playerSeasons.some((season) => season.year === prev)) return prev;
      return preferredYear;
    });
  }, [playerSeasons, selectedPlayerName, selectedYear]);

  useEffect(() => {
    setSortPlayerMonthsByPoints(false);
  }, [selectedPlayerName]);

  useEffect(() => {
    setSortPlayerMonthsByPoints(false);
  }, [playerSeasonYear]);

  useEffect(() => {
    if (!hasMonthlyData) {
      setSelectedMonth(null);
      return;
    }
    if (!selectedMonth || !months.some((month) => month.month === selectedMonth)) {
      setSelectedMonth(months[0].month);
    }
  }, [hasMonthlyData, months, selectedMonth]);

  useEffect(() => {
    if (typeof window === "undefined" || seasons.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const yearParamRaw = params.get("year");
    const yearParam = yearParamRaw ? Number(yearParamRaw) : NaN;
    const monthParam = params.get("month");
    const playerParam = params.get("player");

    if (!Number.isNaN(yearParam) && seasons.some((season) => season.year === yearParam)) {
      setSelectedYear(yearParam);
      setHasUserSelected(true);
    }

    setPendingMonthParam(monthParam);
    setPendingPlayerParam(playerParam);
  }, [seasons]);

  useEffect(() => {
    if (!pendingMonthParam || !hasMonthlyData) return;
    if (!months.some((month) => month.month === pendingMonthParam)) return;
    setSelectedMonth(pendingMonthParam);
    setPendingMonthParam(null);
  }, [hasMonthlyData, months, pendingMonthParam]);

  useEffect(() => {
    if (!pendingPlayerParam || !currentSeason) return;
    if (!currentSeason.players.some((player) => player.name === pendingPlayerParam)) return;
    setSelectedPlayerName(pendingPlayerParam);
    setPlayerSeasonYear(currentSeason.year);
    setPendingPlayerParam(null);
  }, [currentSeason, pendingPlayerParam]);

  useEffect(() => {
    if (typeof window === "undefined" || !currentSeason) return;

    const params = new URLSearchParams(window.location.search);
    params.set("year", String(selectedYear));

    if (selectedMonth) {
      params.set("month", selectedMonth);
    } else {
      params.delete("month");
    }

    if (selectedPlayerName) {
      params.set("player", selectedPlayerName);
    } else {
      params.delete("player");
    }

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}#results`;
    window.history.replaceState(null, "", nextUrl);
  }, [currentSeason, selectedMonth, selectedPlayerName, selectedYear]);

  const playersWithPoints = useMemo(() => {
    if (!currentSeason) return [];
    return currentSeason.players.filter((player) => player.top8 > 0 || player.punktiKopa > 0);
  }, [currentSeason]);
  const playersForAll = useMemo(() => {
    if (!currentSeason) return [];
    return playersWithPoints.length > 0 ? playersWithPoints : currentSeason.players;
  }, [currentSeason, playersWithPoints]);
  const topTenPlayers = useMemo(
    () => (currentSeason ? currentSeason.players.slice(0, 10) : []),
    [currentSeason]
  );
  const shouldShowToggle = playersForAll.length > 10;
  const playersToShow = showAllPlayers && shouldShowToggle ? playersForAll : topTenPlayers;
  const visibleTopLabel = useMemo(() => {
    if (!currentSeason) return 10;
    return showAllPlayers ? playersForAll.length : Math.min(10, currentSeason.players.length);
  }, [currentSeason, playersForAll.length, showAllPlayers]);

  const activeMonth = useMemo(() => {
    if (!hasMonthlyData) return null;
    return months.find((month) => month.month === selectedMonth) ?? months[0];
  }, [hasMonthlyData, months, selectedMonth]);
  const playerSeason = useMemo(() => {
    if (!playerSeasonYear) return null;
    return playerSeasons.find((season) => season.year === playerSeasonYear) ?? null;
  }, [playerSeasons, playerSeasonYear]);
  const playerSeasonMonths = useMemo(() => playerSeason?.months ?? [], [playerSeason]);
  const selectedPlayer = useMemo(() => {
    if (!playerSeason || !selectedPlayerName) return null;
    return playerSeason.players.find((player) => player.name === selectedPlayerName) ?? null;
  }, [playerSeason, selectedPlayerName]);
  const playerMonthlyResults = useMemo(() => {
    if (!selectedPlayer) return [];
    return playerSeasonMonths
      .map((month) => ({
        month: month.month,
        result: month.results.find((result) => result.name === selectedPlayer.name) ?? null,
      }))
      .filter((entry) => entry.result);
  }, [playerSeasonMonths, selectedPlayer]);
  const playerMonthlyResultsSorted = useMemo(() => {
    if (!sortPlayerMonthsByPoints) return playerMonthlyResults;
    return [...playerMonthlyResults].sort((a, b) => {
      const aPoints = a.result?.points ?? 0;
      const bPoints = b.result?.points ?? 0;
      if (bPoints !== aPoints) return bPoints - aPoints;
      const aPos = a.result?.position ?? Number.POSITIVE_INFINITY;
      const bPos = b.result?.position ?? Number.POSITIVE_INFINITY;
      return aPos - bPos;
    });
  }, [playerMonthlyResults, sortPlayerMonthsByPoints]);
  const positionChanges = useMemo(() => {
    if (!currentSeason || months.length < 2) return new Map<string, number>();

    const playerNames = currentSeason.players.map((player) => player.name);
    const basePositions = new Map(currentSeason.players.map((player) => [player.name, player.position]));

    const buildRanking = (monthIndex: number) => {
      const pointsByPlayer = new Map<string, number[]>();
      playerNames.forEach((name) => pointsByPlayer.set(name, []));

      for (let i = 0; i <= monthIndex; i += 1) {
        const month = months[i];
        if (!month) continue;
        month.results.forEach((result) => {
          if (!pointsByPlayer.has(result.name)) return;
          pointsByPlayer.get(result.name)?.push(result.points ?? 0);
        });
      }

      const totals = playerNames.map((name) => {
        const points = pointsByPlayer.get(name) ?? [];
        const top8Total = [...points]
          .sort((a, b) => b - a)
          .slice(0, 8)
          .reduce((sum, value) => sum + value, 0);
        return {
          name,
          total: top8Total,
          basePosition: basePositions.get(name) ?? Number.MAX_SAFE_INTEGER,
        };
      });

      totals.sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        if (a.basePosition !== b.basePosition) return a.basePosition - b.basePosition;
        return a.name.localeCompare(b.name);
      });

      const ranking = new Map<string, number>();
      totals.forEach((entry, index) => {
        ranking.set(entry.name, index + 1);
      });

      return ranking;
    };

    const previousRanking = buildRanking(months.length - 2);
    const latestRanking = buildRanking(months.length - 1);
    const deltas = new Map<string, number>();

    playerNames.forEach((name) => {
      const prev = previousRanking.get(name);
      const current = latestRanking.get(name);
      if (!prev || !current) return;
      const delta = prev - current;
      if (delta !== 0) deltas.set(name, delta);
    });

    return deltas;
  }, [currentSeason, months]);

  if (!currentSeason) return null;

  return (
    <section id="results" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">TOP </span>
            <span className="text-primary">{visibleTopLabel}</span>
          </h2>
          <p className="text-muted-foreground mb-4">Sezonas kopvērtējums</p>
          {months.length > 1 && (
            <p className="text-xs text-muted-foreground/70 mb-4">
              ↑/↓ Vietas izmaiņa kopš iepriekšējā turnīra.
            </p>
          )}
          <a
            href={rulebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Oficiālie novusa noteikumi
          </a>
        </motion.div>

        {/* Year Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-8"
        >
          {seasons.map((season) => (
            <button
              key={season.year}
              onClick={() => {
                setSelectedYear(season.year);
                setHasUserSelected(true);
              }}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all duration-300",
                selectedYear === season.year
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {season.year}
            </button>
          ))}
        </motion.div>

        {/* Leaderboard */}
        <div className="space-y-3">
          {playersToShow.map((player, index) => {
            const pos = player.position;
            const style = positionStyles[pos];
            const isTopFour = pos <= 4;
            const isSelectedPlayer = selectedPlayerName === player.name;
            const positionChange = positionChanges.get(player.name);

            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative rounded-xl border p-4 md:p-5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                  isTopFour && style
                    ? style.bg
                    : "bg-card border-border hover:border-primary/30",
                  isSelectedPlayer && "ring-2 ring-primary/60 border-primary/40"
                )}
                onClick={() => {
                  setSelectedPlayerName(player.name);
                  setPlayerSeasonYear(selectedYear);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedPlayerName(player.name);
                    setPlayerSeasonYear(selectedYear);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Position */}
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg",
                        isTopFour && style ? style.color : "text-muted-foreground bg-secondary"
                      )}
                    >
                      {isActiveSeason && pos === 1 ? (
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                      ) : isGoatSeason && style?.emoji ? (
                        <span className="text-2xl md:text-3xl">{style.emoji}</span>
                      ) : style?.icon ? (
                        <style.icon className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        pos
                      )}
                    </div>
                    {positionChange !== undefined && positionChange !== 0 && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                          positionChange > 0
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-rose-500/15 text-rose-500"
                        )}
                      >
                        {positionChange > 0 ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {Math.abs(positionChange)}
                      </span>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={cn(
                        "font-bold text-lg md:text-xl truncate",
                        isTopFour && style ? style.color : "text-foreground"
                      )}>
                        {player.name}
                      </h3>
                      {player.name === "Repča" && (
                        <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">
                          🐐 GOAT
                        </span>
                      )}
                      {pos === 1 && isGoatSeason && player.name !== "Repča" && (
                        <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">
                          GOAT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                      {player.stoses > 0 && (
                        <>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-400" />
                            {player.stoses} štoses
                          </span>
                          <span className="hidden md:inline">|</span>
                        </>
                      )}
                      <span>AVG: {player.avg.toFixed(1)}</span>
                      <span className="hidden md:inline">|</span>
                      <span>{player.tournaments} turnīri</span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className={cn(
                      "text-2xl md:text-3xl font-bold",
                      isTopFour && style ? style.color : "text-foreground"
                    )}>
                      {player.top8}
                    </div>
                    <div className="text-xs text-muted-foreground">TOP8 punkti</div>
                  </div>
                </div>

                {/* Performance bar */}
                <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${maxTop8 ? (player.top8 / maxTop8) * 100 : 0}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      isTopFour ? "bg-primary" : "bg-muted-foreground/50"
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {shouldShowToggle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 flex justify-center"
          >
            <button
              onClick={() => setShowAllPlayers((prev) => !prev)}
              className="px-5 py-2.5 rounded-full border border-border bg-card text-sm font-semibold hover:border-primary/40 hover:text-primary transition-colors"
            >
              {showAllPlayers
                ? "Rādīt tikai TOP 10"
                : `Rādīt visus spēlētājus ar punktiem (${playersForAll.length})`}
            </button>
          </motion.div>
        )}

        {/* Monthly results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-center">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold">Mēnešu rezultāti</h3>
          </div>

          {!hasMonthlyData && (
            <p className="text-center text-sm text-muted-foreground">
              Šim gadam mēnešu griezuma dati šobrīd nav pieejami.
            </p>
          )}

          {hasMonthlyData && activeMonth && (
            <>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {months.map((month) => (
                  <button
                    key={month.month}
                    onClick={() => setSelectedMonth(month.month)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                      activeMonth.month === month.month
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {month.month}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="grid grid-cols-[80px_minmax(0,1fr)_120px] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-secondary/40">
                  <div>Vieta</div>
                  <div>Spēlētājs</div>
                  <div className="text-right">Punkti</div>
                </div>
                <div className="divide-y divide-border">
                  {activeMonth.results.map((result) => (
                    <div
                      key={`${activeMonth.month}-${result.name}`}
                      className={cn(
                        "grid grid-cols-[80px_minmax(0,1fr)_120px] px-4 py-3 items-center cursor-pointer transition-colors hover:bg-secondary/30",
                        selectedPlayerName === result.name && "bg-primary/10"
                      )}
                      onClick={() => {
                        setSelectedPlayerName(result.name);
                        setPlayerSeasonYear(selectedYear);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedPlayerName(result.name);
                          setPlayerSeasonYear(selectedYear);
                        }
                      }}
                    >
                      <div className="text-sm font-bold text-primary">{result.position}</div>
                      <div className="text-sm font-semibold truncate">{result.name}</div>
                      <div className="text-right text-sm font-bold">{result.points}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>

        <Dialog
          open={Boolean(selectedPlayer)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedPlayerName(null);
              setPlayerSeasonYear(null);
            }
          }}
        >
          {selectedPlayer && (
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{selectedPlayer.name}</span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {(playerSeasonYear ?? selectedYear)}. gada sezona
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Detalizēta statistika un mēnešu griezuma rezultāti.
                </DialogDescription>
              </DialogHeader>

              {playerSeasonYears.length > 1 && playerSeasonYear && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Sezona
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPlayerSeasonYear(
                          playerSeasonIndex < playerSeasonYears.length - 1
                            ? playerSeasonYears[playerSeasonIndex + 1]
                            : playerSeasonYear
                        )
                      }
                      disabled={playerSeasonIndex >= playerSeasonYears.length - 1}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Iepriekšējā sezona"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold">{playerSeasonYear}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setPlayerSeasonYear(
                          playerSeasonIndex > 0
                            ? playerSeasonYears[playerSeasonIndex - 1]
                            : playerSeasonYear
                        )
                      }
                      disabled={playerSeasonIndex <= 0}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Nākamā sezona"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">Vieta</div>
                  <div className="text-2xl font-bold text-primary">{selectedPlayer.position}</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">TOP8 punkti</div>
                  <div className="text-2xl font-bold">{selectedPlayer.top8}</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">Punkti kopā</div>
                  <div className="text-2xl font-bold">{selectedPlayer.punktiKopa}</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">Štoses</div>
                  <div className="text-2xl font-bold">{selectedPlayer.stoses}</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">AVG</div>
                  <div className="text-xl font-bold">{selectedPlayer.avg.toFixed(1)}</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">TOP8 AVG</div>
                  <div className="text-xl font-bold">{selectedPlayer.top8avg.toFixed(1)}</div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="text-xs text-muted-foreground">Turnīri</div>
                  <div className="text-xl font-bold">{selectedPlayer.tournaments}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Mēnešu rezultāti
                  </h4>
                  {playerMonthlyResults.length > 1 && (
                    <button
                      onClick={() => setSortPlayerMonthsByPoints((prev) => !prev)}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors",
                        sortPlayerMonthsByPoints
                          ? "border-primary/40 text-primary bg-primary/10"
                          : "border-border hover:border-primary/40 hover:text-primary"
                      )}
                    >
                      {sortPlayerMonthsByPoints ? "Kārtot pēc mēneša" : "Kārtot pēc punktiem ↓"}
                    </button>
                  )}
                </div>

                {playerMonthlyResults.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Šim spēlētājam mēnešu griezuma dati šobrīd nav pieejami.
                  </p>
                )}

                {playerMonthlyResults.length > 0 && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-[minmax(0,1fr)_100px_120px] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-secondary/40">
                      <div>Mēnesis</div>
                      <div>Vieta</div>
                      <div className="text-right">Punkti</div>
                    </div>
                    <div className="divide-y divide-border">
                      {playerMonthlyResultsSorted.map(({ month, result }) => (
                        <div
                          key={`${selectedPlayer.name}-${month}`}
                          className="grid grid-cols-[minmax(0,1fr)_100px_120px] px-4 py-2.5 items-center"
                        >
                          <div className="text-sm font-semibold">{month}</div>
                          <div className="text-sm font-bold text-primary">{result?.position}</div>
                          <div className="text-right text-sm font-bold">{result?.points}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>

        {/* Data notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            2026. gada dati tiek sinhronizēti no Google Sheets kopvērtējuma tabulas.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Vecākie gadi jāmeklē vēstures anālēs feisbuka eventos...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
