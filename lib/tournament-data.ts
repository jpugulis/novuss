export interface Player {
  name: string;
  top8: number;
  stoses: number;
  top8avg: number;
  punktiKopa: number;
  avg: number;
  tournaments: number;
  position: number;
}

export interface Season {
  year: number;
  players: Player[];
  comment: string;
  images?: { src: string; caption: string }[];
}

export const seasons: Season[] = [
  {
    year: 2025,
    players: [
      { name: "Repča", top8: 190, stoses: 30, top8avg: 23.8, punktiKopa: 244, avg: 20.3, tournaments: 11, position: 1 },
      { name: "Dzinča", top8: 185, stoses: 29, top8avg: 23.1, punktiKopa: 201, avg: 20.1, tournaments: 9, position: 2 },
      { name: "Orļiks", top8: 112, stoses: 7, top8avg: 14.0, punktiKopa: 143, avg: 11.9, tournaments: 11, position: 3 },
      { name: "Pūgulis", top8: 111, stoses: 10, top8avg: 13.9, punktiKopa: 126, avg: 12.6, tournaments: 9, position: 4 },
      { name: "Artchy", top8: 108, stoses: 12, top8avg: 13.5, punktiKopa: 129, avg: 11.7, tournaments: 10, position: 5 },
      { name: "Ziemis", top8: 102, stoses: 10, top8avg: 12.8, punktiKopa: 117, avg: 11.7, tournaments: 9, position: 6 },
      { name: "Rūdža", top8: 85, stoses: 8, top8avg: 10.6, punktiKopa: 91, avg: 10.1, tournaments: 8, position: 7 },
      { name: "TomyG", top8: 80, stoses: 7, top8avg: 10.0, punktiKopa: 86, avg: 9.6, tournaments: 8, position: 8 },
      { name: "Tuncis", top8: 49, stoses: 1, top8avg: 6.1, punktiKopa: 49, avg: 9.8, tournaments: 5, position: 9 },
      { name: "Osīc", top8: 49, stoses: 1, top8avg: 6.1, punktiKopa: 49, avg: 7.0, tournaments: 6, position: 10 },
    ],
    comment: `Rēpelis ar 30 štosēm beigās pārspējis Dzinti, kuram bija 29 štoses un štošu ieskaitē un kļuvis par absolūto GOAT! Pirms decembra turnīra abiem bija pa 26 štosēm. Ļoti spēcīgs sniegums arī šajā sezonā!

Pūgulim izdevās pārspēt 2:0 Repču pēdējā turnīrā uzvarētāju zarā, bet pēcāk zaudētāju zarā piedzīvot tomēr sakāvi. Kā arī Pūgulis no Kārļa un 3.vietas kopvērtējumā beigās šķīra TIKAI 1 punkts!

Bija ļoti sīva cīņa par trešo vietu starp Pūguli, Kārli, Arčiju un Ziemi, kur Arčijs tikko kā vēl bija 3. ar 108 punktiem, taču pēdējos 2 turnīros nespēja uzlaboties paliekot 10. un 7. vietās, kamēr Pūgulim ar Kārli bija labi turnīri - Kārlis (3. un 4. vieta) un Pūgulis (5. un 3. vieta). Taču Arčijs ir trešais labākais šosētājs šosezon ar 12 štosēm, kamēr Ziemīc ar mani dala 4.vietu ar 10 štosēm!

Paldies par sezonu, bija daudz interesantas cīņas un labi pavadīts laiks novusa vakaros!`,
  },
  {
    year: 2024,
    players: [
      { name: "Kārlis Rēpelis", top8: 195, stoses: 26, top8avg: 24.4, punktiKopa: 256, avg: 21.3, tournaments: 12, position: 1 },
      { name: "Kārlis Orleans", top8: 149, stoses: 18, top8avg: 18.6, punktiKopa: 180, avg: 15.0, tournaments: 12, position: 2 },
      { name: "Dzintis Aļeksejevs", top8: 146, stoses: 20, top8avg: 18.3, punktiKopa: 175, avg: 14.6, tournaments: 12, position: 3 },
      { name: "TomyG", top8: 120, stoses: 14, top8avg: 15.0, punktiKopa: 145, avg: 12.1, tournaments: 12, position: 4 },
      { name: "Pūgulis", top8: 105, stoses: 8, top8avg: 13.1, punktiKopa: 130, avg: 10.8, tournaments: 12, position: 5 },
      { name: "Arčijs", top8: 98, stoses: 10, top8avg: 12.3, punktiKopa: 120, avg: 10.0, tournaments: 12, position: 6 },
      { name: "Ziemis", top8: 92, stoses: 9, top8avg: 11.5, punktiKopa: 110, avg: 9.2, tournaments: 12, position: 7 },
      { name: "Edgars", top8: 85, stoses: 7, top8avg: 10.6, punktiKopa: 100, avg: 8.3, tournaments: 12, position: 8 },
      { name: "Marija Ābola", top8: 75, stoses: 5, top8avg: 9.4, punktiKopa: 90, avg: 7.5, tournaments: 12, position: 9 },
      { name: "Toms Germanis", top8: 70, stoses: 12, top8avg: 8.8, punktiKopa: 85, avg: 7.1, tournaments: 12, position: 10 },
    ],
    comment: `Šoreiz prasmīgākais Toms Germanis!

Dāmu miniturnīrā dominēja Marija Ābola! 

Kopvērtējumā ar 100% apmeklējumu, 256 punktiem kopā, uzvarot 7 no 12 turnīriem un savācot 195 punktus pa TOP8 labākajiem turnīriem, pārliecinoši uzvar Kārlis Rēpelis!

Viņam seko namatēvs Karlis Orleans ar 149 TOP8 punktiem nosargājot otro vietu no Dzintis Aļeksejevs, kurš ar 146 TOP8 punktiem strauji tuvojās pēdējos divos turnīros iegūstot otrās vietas. Tomy ar savu uzvaru pār Dzinti decembra posma finālā ir nosargājis Kārļa otro vietu, bet diemžēl 1 punkts par īsu, lai kopvērtējumā ielauztos TOP4.

Paldies visiem par ierašanos, Krista Rozenberga-Rudzīte par eglītes aktivitātes novadīšanu, Toms Ziemelis par novusa punktu sistēmas uzturēšanu visa gada garumā un, protams, namatēvam Kārlim par kārtējās sezonas virsvadību!

Tiekamies jau drīz Retro auto muzejs viesmīlīgajās telpās uz jaunā gada sagaidīšanas pasākumu!

Priekā!`,
    images: [
      { src: "/images/2024-final-group.png", caption: "2024. gada decembra fināls - kopbilde" },
      { src: "/images/2024-final-bracket.png", caption: "Turnīra zars - TomyG čempions!" },
    ],
  },
];

export const allTimeBest = [
  { name: "Repča / Rēpelis", totalPoints: 500, totalStoses: 56, seasons: 2, wins: 2 },
  { name: "Dzinča / Dzintis", totalPoints: 376, totalStoses: 49, seasons: 2, wins: 0 },
  { name: "Orļiks / Orleans", totalPoints: 261, totalStoses: 25, seasons: 2, wins: 0 },
  { name: "Pūgulis", totalPoints: 216, totalStoses: 18, seasons: 2, wins: 0 },
  { name: "Artchy / Arčijs", totalPoints: 206, totalStoses: 22, seasons: 2, wins: 0 },
];

export const galleryImages = [
  {
    src: "/images/gallery-1.png",
    caption: "Pēc turnīra - čempioni atpūšas!",
    year: 2025,
  },
  {
    src: "/images/gallery-2.jpeg",
    caption: "Novusa vakars pilnā sparā",
    year: 2025,
  },
  {
    src: "/images/gallery-3.png",
    caption: "Rēpelis - 2025. gada čempions!",
    year: 2025,
  },
  {
    src: "/images/2024-final-group.png",
    caption: "2024. gada decembra fināls - kopbilde",
    year: 2024,
  },
  {
    src: "/images/2024-final-bracket.png",
    caption: "Turnīra zars - TomyG čempions!",
    year: 2024,
  },
];

export const rulebookUrl = "https://novuss-lnf.lv/wp-content/uploads/2025/03/Novusa-noteikumi-papildinajums-9.03.2025.pdf";
