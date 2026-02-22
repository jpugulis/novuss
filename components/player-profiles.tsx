"use client";

import { motion } from "framer-motion";
import { User, Trophy, Flame, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSeasons } from "@/hooks/use-seasons";
import { useMemo } from "react";

export function PlayerProfiles() {
  const seasons = useSeasons();
  const allTimeBest = useMemo(() => {
    const totals = new Map<
      string,
      { totalPoints: number; totalStoses: number; seasons: number; wins: number }
    >();

    seasons.forEach((season) => {
      if (season.players.length === 0) return;

      season.players.forEach((player) => {
        const entry = totals.get(player.name) ?? {
          totalPoints: 0,
          totalStoses: 0,
          seasons: 0,
          wins: 0,
        };
        entry.totalPoints += player.punktiKopa;
        entry.totalStoses += player.stoses;
        entry.seasons += 1;
        totals.set(player.name, entry);
      });

      const winner = season.players[0];
      const winnerEntry = totals.get(winner.name);
      if (winnerEntry) winnerEntry.wins += 1;
    });

    return Array.from(totals.entries())
      .map(([name, stats]) => ({
        name,
        totalPoints: Math.round(stats.totalPoints * 10) / 10,
        totalStoses: Math.round(stats.totalStoses),
        seasons: stats.seasons,
        wins: stats.wins,
      }))
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.totalStoses !== a.totalStoses) return b.totalStoses - a.totalStoses;
        return a.name.localeCompare(b.name, "lv");
      })
      .slice(0, 5);
  }, [seasons]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Visu laiku labākie</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">HALL OF</span>
            <br />
            <span className="text-primary">FAME</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTimeBest.map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-xl border overflow-hidden group hover:border-primary/50 transition-all duration-300",
                index === 0 ? "border-yellow-400/50 md:col-span-2 lg:col-span-1" : "border-border"
              )}
            >
              {/* Header gradient */}
              <div
                className={cn(
                  "h-24 relative",
                  index === 0
                    ? "bg-gradient-to-br from-yellow-400/30 to-orange-500/20"
                    : index === 1
                    ? "bg-gradient-to-br from-gray-300/20 to-gray-500/10"
                    : "bg-gradient-to-br from-secondary to-card"
                )}
              >
                {player.name === "Repča" && (
                  <div className="absolute top-4 right-4 bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold">
                    THE GOAT
                  </div>
                )}
                {player.wins > 0 && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1">
                    {[...Array(player.wins)].map((_, i) => (
                      <Trophy key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <div
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center border-4 bg-card",
                    index === 0
                      ? "border-yellow-400"
                      : index === 1
                      ? "border-gray-300"
                      : "border-border"
                  )}
                >
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="pt-16 pb-6 px-6 text-center">
                <h3
                  className={cn(
                    "text-xl font-bold mb-1",
                    index === 0 ? "text-yellow-400" : "text-foreground"
                  )}
                >
                  {player.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {player.wins > 0 ? `${player.wins}x Čempions` : "Veterāns"}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-bold text-foreground">{player.totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Kopā punkti</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="text-xl font-bold text-foreground">{player.totalStoses}</div>
                    <div className="text-xs text-muted-foreground">Kopā štoses</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
