"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Clock, Gift, MapPin, Snowflake, TreePine } from "lucide-react";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=%F0%9F%8E%84%20Novusa%20Ziemassv%C4%93tku%20turn%C4%ABrs%20-%20decembris&dates=20261219T190000/20261220T010000&ctz=Europe%2FRiga&details=Sezonas%20nosl%C4%93guma%20Ziemassv%C4%93tku%20turn%C4%ABrs!%20No%2019%20iera%C5%A1an%C4%81s%2C%20ap%2020%20s%C4%81kam%20sp%C4%93l%C4%93t!&location=Retro%20Auto%20muzejs";

// Fixed positions so server and client render the same snowfall.
const SNOWFLAKES = [
  { left: "6%", size: 14, delay: 0, duration: 9 },
  { left: "18%", size: 10, delay: 3, duration: 11 },
  { left: "31%", size: 12, delay: 6, duration: 10 },
  { left: "47%", size: 9, delay: 1.5, duration: 12 },
  { left: "62%", size: 13, delay: 4.5, duration: 9.5 },
  { left: "76%", size: 10, delay: 2, duration: 11.5 },
  { left: "89%", size: 15, delay: 5, duration: 10 },
];

const XMAS_RED = "oklch(0.62 0.21 25)";
const XMAS_GREEN = "oklch(0.62 0.15 150)";

export function NextTournament() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-[2px]"
          style={{
            background: `repeating-linear-gradient(135deg, ${XMAS_RED} 0 14px, oklch(0.97 0 0) 14px 22px, ${XMAS_GREEN} 22px 36px, oklch(0.97 0 0) 36px 44px)`,
          }}
        >
          <div className="relative bg-card rounded-[calc(1rem-2px)] overflow-hidden">
            {/* Snowfall */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              {SNOWFLAKES.map((flake, i) =>
                reduceMotion ? (
                  <Snowflake
                    key={i}
                    className="absolute text-white/15"
                    style={{ left: flake.left, top: `${15 + ((i * 23) % 70)}%` }}
                    width={flake.size}
                    height={flake.size}
                  />
                ) : (
                  <motion.div
                    key={i}
                    className="absolute -top-6 text-white/20"
                    style={{ left: flake.left }}
                    animate={{ y: [0, 380], rotate: [0, 180], opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: flake.duration,
                      delay: flake.delay,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Snowflake width={flake.size} height={flake.size} />
                  </motion.div>
                )
              )}
            </div>

            <div className="relative p-6 md:p-8 border-b border-border">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Nākamais turnīrs</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(90deg, ${XMAS_RED}, ${XMAS_GREEN})` }}
                >
                  <TreePine className="w-4 h-4" />
                  Ziemassvētku speciāls
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    19. decembris, sestdiena
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sezonas noslēguma Ziemassvētku turnīrs - izšķirsies 2026. gada kopvērtējums!
                  </p>
                </div>
                <span className="text-4xl md:text-5xl leading-none select-none" aria-hidden>
                  🎄
                </span>
              </div>
            </div>

            <div className="relative p-6 md:p-8 grid gap-4 md:grid-cols-[1fr_auto] items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>No 19 ierašanās, ap 20 sākam spēlēt!</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Vieta: Kur parasti</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Gift className="w-4 h-4" style={{ color: XMAS_RED }} />
                  <span>Ziemassvētku noskaņa garantēta!</span>
                </div>
              </div>

              <a
                href={GOOGLE_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CalendarDays className="w-4 h-4" />
                Pievienot Google Calendar
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
