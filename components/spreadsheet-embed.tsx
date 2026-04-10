"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMBED_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVQqxoZX9HB8fbTqhFcN9LnLqyVv-vNJ8IsL4OvplVDdKnzxV7T2X8RDt3_xltKl2WtWONj_OAsRms/pubhtml/sheet?headers=false&gid=";

const SHEET_SECTIONS = [
  { id: "overview", label: "Pārskats", note: "Satura rādītājs visām publicētajām lapām." },
  { id: "2026", label: "2026", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}1659881521` },
  { id: "2025", label: "2025", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}680304360` },
  { id: "2024", label: "2024", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}896123171` },
  { id: "2023", label: "2023", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}1273478125` },
  { id: "2020-21-22-c19", label: "2020-21-22 C-19", note: "Apvienotais periods ar COVID lokautiem", src: `${EMBED_SHEET_URL}2031005057` },
  { id: "2022", label: "2022", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}802844939` },
  { id: "2021", label: "2021", note: "COVID (turnīri nenotika)", src: `${EMBED_SHEET_URL}1029121250` },
  { id: "2020", label: "2020", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}290983024` },
  { id: "2019", label: "2019", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}1913034709` },
  { id: "2018", label: "2018", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}1555513506` },
  { id: "2017", label: "2017", note: "Gada kopsavilkums", src: `${EMBED_SHEET_URL}610551329` },
] as const;

export function SpreadsheetEmbed() {
  const [activeSectionId, setActiveSectionId] = useState<(typeof SHEET_SECTIONS)[number]["id"]>("overview");

  const activeSection = SHEET_SECTIONS.find(({ id }) => id === activeSectionId) ?? SHEET_SECTIONS[0];
  const yearSections = SHEET_SECTIONS.filter((section) => section.id !== "overview");

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
          <div className="border-b border-border bg-muted/30 px-4 py-4 md:px-6">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Spreadsheet sections">
              {SHEET_SECTIONS.map((section) => {
                const isActive = section.id === activeSectionId;

                return (
                  <Button
                    key={section.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveSectionId(section.id)}
                    className={cn(
                      "rounded-full border-border/70 bg-background/80",
                      isActive && "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {section.label}
                  </Button>
                );
              })}
            </div>
          </div>
          {activeSection.id === "overview" ? (
            <div className="px-4 py-6 md:px-6 md:py-8">
              <div className="rounded-2xl border border-dashed border-border bg-background/60 p-5 md:p-6">
                <h3 className="text-xl font-semibold text-foreground">Sezonu satura rādītājs</h3>
                <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                  <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] bg-muted/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    <span>Gads / Lapa</span>
                    <span>Piezīme</span>
                  </div>
                  {yearSections.map((section) => (
                    <div
                      key={section.id}
                      className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-3 border-t border-border bg-background px-4 py-3"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-xl px-3 py-3 text-left text-base font-semibold"
                        onClick={() => setActiveSectionId(section.id)}
                      >
                        {section.label}
                      </Button>
                      <span className="text-sm text-muted-foreground">{section.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <iframe
              title={`Novusa turnīru tabula ${activeSection.label}`}
              src={activeSection.src}
              className="w-full h-[600px] md:h-[720px]"
              loading="lazy"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
