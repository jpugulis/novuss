"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Novusa%20turn%C4%ABrs%20-%20j%C5%ABnijs&dates=20260626T190000/20260627T010000&ctz=Europe%2FRiga&details=No%2019%20iera%C5%A1an%C4%81s%2C%20ap%2020%20s%C4%81kam%20sp%C4%93l%C4%93t!&location=Retro%20Auto%20muzejs";

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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">26. jūnijs, piektdiena</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Nākamais novusa vakars.
            </p>
          </div>

          <div className="p-6 md:p-8 grid gap-4 md:grid-cols-[1fr_auto] items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>No 19 ierašanās, ap 20 sākam spēlēt!</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Vieta: Kur parasti</span>
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
