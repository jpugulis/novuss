"use client";

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import { seasons } from "@/lib/tournament-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function StoseCounter() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const currentSeason = seasons.find((s) => s.year === selectedYear);
  
  if (!currentSeason) return null;

  const topShooters = [...currentSeason.players]
    .sort((a, b) => b.stoses - a.stoses)
    .slice(0, 5);

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
                {seasons.map((season) => (
                  <button
                    key={season.year}
                    onClick={() => setSelectedYear(season.year)}
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
            {topShooters.map((player, index) => (
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
                      whileInView={{ width: `${(player.stoses / topShooters[0].stoses) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fun fact */}
          <div className="p-6 bg-secondary/30 border-t border-border">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                {selectedYear === 2025 ? (
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-yellow-400">Fun fact:</span> Repča ar 30 štosēm ir absolūtais
                    sezonas štošu līderis! Tas nozīmē vidēji 2.7 štoses katrā turnīrā!
                  </p>
                ) : (
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-yellow-400">Fun fact:</span> Kārlis Rēpelis ar 26 štosēm 
                    dominēja 2024. gada sezonā ar 100% apmeklējumu!
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
