"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Novusa%20turn%C4%ABrs%20-%20marts&dates=20260320T190000/20260321T010000&ctz=Europe/Riga&details=Iera%C5%A1an%C4%81s%2019%3A00%2C%20s%C4%81kam%2020%3A00.";

export function NextTournament() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-border">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nākamais turnīrs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">20. marts, piektdiena</h2>
            <p className="text-sm text-muted-foreground mt-2">
              19:00 ierašanās, 20:00 sākam. Turnīra laiks: 19:00 – 01:00.
            </p>
          </div>

          <div className="p-6 md:p-8 grid gap-4 md:grid-cols-[1fr_auto] items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>19:00 – 01:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Retro auto muzejs (ja mainās vieta, informēsim)</span>
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
        </motion.div>
      </div>
    </section>
  );
}
