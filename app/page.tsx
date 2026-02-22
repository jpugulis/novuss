"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { Leaderboard } from "@/components/leaderboard";
import { CommentarySection } from "@/components/commentary-section";
import { StoseCounter } from "@/components/stose-counter";
import { GallerySection } from "@/components/gallery-section";
import { SpreadsheetEmbed } from "@/components/spreadsheet-embed";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <Leaderboard />
      <SpreadsheetEmbed />
      <StoseCounter />
      <CommentarySection />
      <GallerySection />
      <Footer />
    </main>
  );
}
