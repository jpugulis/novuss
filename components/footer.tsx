"use client";

import { motion } from "framer-motion";
import { Trophy, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-foreground">Rajona Novusa Turnīrs</span>
          </div>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Leģendārā novusa līga, kur draudzība satiekas ar konkurenci un štoses lido pa gaisu!
          </p>

          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>Veidots ar</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>novusa komūnai</span>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            © 2023-{new Date().getFullYear()} Rajona Novusa Turnīrs. Visas tiesības aizsargātas (bet ne tik nopietni).
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
