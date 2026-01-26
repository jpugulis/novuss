"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Flame, ExternalLink } from "lucide-react";
import { rulebookUrl } from "@/lib/tournament-data";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useSeasons } from "@/hooks/use-seasons";

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
  const isGoatSeason = selectedYear !== 2026;
  const isActiveSeason = selectedYear === 2026;

  useEffect(() => {
    if (hasUserSelected || seasons.length === 0) return;
    if (selectedYear !== seasons[0].year) {
      setSelectedYear(seasons[0].year);
    }
  }, [hasUserSelected, seasons, selectedYear]);

  const currentSeason = seasons.find((s) => s.year === selectedYear);
  const maxTop8 = useMemo(
    () => (currentSeason ? Math.max(...currentSeason.players.map((player) => player.top8)) : 0),
    [currentSeason]
  );

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
            <span className="text-primary">10</span>
          </h2>
          <p className="text-muted-foreground mb-4">Sezonas kopvērtējums</p>
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
          {currentSeason.players.map((player, index) => {
            const pos = player.position;
            const style = positionStyles[pos];
            const isTopFour = pos <= 4;

            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative rounded-xl border p-4 md:p-5 transition-all duration-300",
                  isTopFour && style
                    ? style.bg
                    : "bg-card border-border hover:border-primary/30"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* Position */}
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
