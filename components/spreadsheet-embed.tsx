"use client";

import { motion } from "framer-motion";

export function SpreadsheetEmbed() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-primary">Pilnā Tabula</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Google Sheets pārskats</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Tiešais skats uz sezonu datiem un rezultātiem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <iframe
            title="Novusa turnīru tabula"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSVQqxoZX9HB8fbTqhFcN9LnLqyVv-vNJ8IsL4OvplVDdKnzxV7T2X8RDt3_xltKl2WtWONj_OAsRms/pubhtml?widget=true&headers=false"
            className="w-full h-[600px] md:h-[720px]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
