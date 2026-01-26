"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSeasons } from "@/hooks/use-seasons";

export function StoseCounter() {
  const seasons = useSeasons();
  const seasonsWithStoses = seasons.filter((season) =>
    season.players.some((player) => player.stoses > 0)
  );
  const [selectedYear, setSelectedYear] = useState(() => seasonsWithStoses[0]?.year ?? 2025);
  const [hasUserSelected, setHasUserSelected] = useState(false);

  useEffect(() => {
    if (hasUserSelected || seasonsWithStoses.length === 0) return;
    if (selectedYear !== seasonsWithStoses[0].year) {
      setSelectedYear(seasonsWithStoses[0].year);
    }
  }, [hasUserSelected, seasonsWithStoses, selectedYear]);

  const currentSeason = seasonsWithStoses.find((s) => s.year === selectedYear);
  
  if (!currentSeason) return null;

  const topShooters = [...currentSeason.players]
    .sort((a, b) => b.stoses - a.stoses)
    .filter((player) => player.stoses > 0)
    .slice(0, 5);
  const maxStoses = topShooters[0]?.stoses ?? 0;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-500/20 via-card to-card rounded-2xl border border-orange-500/30 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Štošu Līderi</h3>
                  <p className="text-muted-foreground text-sm">{selectedYear}. gada sezonas labākie štosētāji</p>
                </div>
              </div>
              
              {/* Year selector */}
              <div className="flex gap-2">
                {seasonsWithStoses.map((season) => (
                  <button
                    key={season.year}
                    onClick={() => {
                      setSelectedYear(season.year);
                      setHasUserSelected(true);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      selectedYear === season.year
                        ? "bg-orange-500 text-white"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {season.year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Leaders */}
          <div className="p-6 space-y-4">
            {topShooters.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">
                Šosezon nav reģistrētu štošu.
              </p>
            ) : (
              topShooters.map((player, index) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 text-center font-bold text-muted-foreground">
                    {index + 1}.
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">{player.name}</span>
                      <span className="font-bold text-orange-400">{player.stoses}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${maxStoses ? (player.stoses / maxStoses) * 100 : 0}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
