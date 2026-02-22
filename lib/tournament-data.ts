import rawSeasons from "./seasons.generated.json";

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

export interface MonthlyPlayerResult {
  name: string;
  position: number;
  points: number;
}

export interface MonthlyStandings {
  month: string;
  results: MonthlyPlayerResult[];
}

export interface Season {
  year: number;
  players: Player[];
  comment: string;
  images?: { src: string; caption: string }[];
  months?: MonthlyStandings[];
}

interface SeasonMeta {
  comment: string;
  images?: { src: string; caption: string }[];
}

const SEASON_META: Record<number, SeasonMeta> = {
  2025: {
    comment: `NEAPTURAMS GOAT Repča atkal dominē - 30 štoses un sīvā finišā pārspēts Dzinča ar 29 štosēm, cementējot savu leģendāro statusu! Pirms decembra turnīra abiem bija pa 26 štosēm. Ļoti spēcīgs sniegums arī šajā sezonā!

Pūgulim izdevās pārspēt 2:0 Repču pēdējā turnīrā uzvarētāju zarā, bet pēcāk zaudētāju zarā piedzīvot tomēr sakāvi. Kā arī Pūgulis no Orļika un 3.vietas kopvērtējumā beigās šķīra TIKAI 1 punkts!

Bija ļoti sīva cīņa par trešo vietu starp Pūguli, Orļiku, Artchy un Ziemi, kur Artchy tikko kā vēl bija 3. ar 108 punktiem, taču pēdējos 2 turnīros nespēja uzlaboties paliekot 10. un 7. vietās, kamēr Pūgulim ar Orļiku bija labi turnīri - Orļiks (3. un 4. vieta) un Pūgulis (5. un 3. vieta). Taču Artchy ir trešais labākais šosētājs šosezon ar 12 štosēm, kamēr Ziemis ar mani dala 4.vietu ar 10 štosēm!

Paldies par sezonu, bija daudz interesantas cīņas un labi pavadīts laiks novusa vakaros!`,
  },
  2024: {
    comment: `GOAT Repča ar 7 uzvarām un perfekto apmeklējumu 2024. gadā parāda, kā izskatās absolūts meistarības standarts - leģenda bez diskusijām!

Šoreiz prasmīgākais TomyG!

Dāmu miniturnīrā dominēja Marija Ābola!

Kopvērtējumā ar 100% apmeklējumu, 256 punktiem kopā, uzvarot 7 no 12 turnīriem un savācot 195 punktus pa TOP8 labākajiem turnīriem, pārliecinoši uzvar Repča!

Viņam seko namatēvs Orļiks ar 149 TOP8 punktiem nosargājot otro vietu no Dzinča, kurš ar 146 TOP8 punktiem strauji tuvojās pēdējos divos turnīros iegūstot otrās vietas. TomyG ar savu uzvaru pār Dzinču decembra posma finālā ir nosargājis Orļika otro vietu, bet diemžēl 1 punkts par īsu, lai kopvērtējumā ielauztos TOP4.

Paldies visiem par ierašanos, Krista Rozenberga-Rudzīte par eglītes aktivitātes novadīšanu, Ziemis par novusa punktu sistēmas uzturēšanu visa gada garumā un, protams, namatēvam Orļikam par kārtējās sezonas virsvadību!

Tiekamies jau drīz Retro auto muzejs viesmīlīgajās telpās uz jaunā gada sagaidīšanas pasākumu!

Priekā!`,
    images: [
      { src: "/images/2024-final-group.png", caption: "2024. gada decembra fināls - kopbilde" },
      { src: "/images/2024-final-bracket.png", caption: "Turnīra zars - TomyG čempions!" },
    ],
  },
  2026: {
    comment: `2026.gada sezona iesākās ar turnīru, kurā nav seeded spēlētāji un vairākām interesantām izspēlēm, interesantiem pavērsieniem. THE G.O.A.T. aka Repča palika 7.vietā un Dzinča nebija ieradies, tāpēc TOPS šoreiz mazāk ierasts. TomyG rādīja spēcīgu sniegumu fināla pārliecinoši sakaujot Rūdi, Ziemim arī izdevās iegūt 2 štoses šajā turnīrā un 4. vietu un Birkants arī ierindojās uz pjedestāla 3.pakāpiena! No iepriekšējo sezonu TOP spēlētājiem Pūgulis nebija ieradies un Artchy aizvadīja pagalam neveiksmīgu sezonas sākumu.

Februāra Turnīrs bija sapulcējis 15 rubakus. Vietas tika izlozētas un The G.O.A.T Repča pirmajā spēlē tikās ar Artchy, kur Artchy uzvarēja ar 2:1 un iegūstot Štosi. Vēlviena pieminēšanas vērta spēle uzvarētāju zarā bija Pūgulis vs TomyG, kura beidzās 3 sitienos - 3 štosēs - 1. Pūgulim, 2. Tomy un 3.spēli atkal iesāka un pabeidza Pūgulis ar Štosi aizsūtot Tomy uz zaudētāju zaru, kur tas tikās pret Ziemīti pārliecinoši to uzvarot ar štosi un tālāk jau 2 sīvākas cīņas - pirmā pret Kārli 2:1, kur tikko Kārlis ar 1 štosi bija izslēdzis Repču no zaudētāja zara 2:1 atstājot 5.-6.vietā un otrā pret Artchy pusfinālā, kur tika svinēta 2:1 uzvara. Fināla cīņā TomyG nākot no zaudētāju zara bija nepieciešamas 3 uzvaras pret Pūguli un iesāka ar ļoti jaudīgu štoses partiju, pēc kuras sekoja vēl 2 uzvaru turpinājums un pilnīga dominance - 3:0 uzvara un jau otrais mēneša čempiona tituls šogad ar pārliecinoši dominanci arī štosēs - 6! Tālāk seko Rūdža un tad 4 spēlētāji dala 3.vietu - Birkants, Ziemīc, Kārlis un Artchy!`,
    images: [
      { src: "/images/2026-feb-games.jpg", caption: "Februāra spēles" },
      { src: "/images/2026-feb-final.jpg", caption: "Februāra fināla cīņa - Pūgulis vs TomyG" },
    ],
  },
};

const COVID_COMMENTS: Record<number, string> = {
  2020: "COVID-19 pandēmijas dēļ no marta līdz maijam un no oktobra līdz decembrim turnīri nenotika.",
  2021: "COVID-19 pandēmijas dēļ 2021. gada sezona nenotika; rezultātu nav.",
  2022: "Sezona atsākās pēc COVID-19 pārtraukuma; janvāris–marts bija lokauts.",
};

function buildDefaultComment(year: number): string {
  return COVID_COMMENTS[year] ?? "Dati importēti no Google Sheets.";
}

type RawSeason = Omit<Season, "comment" | "images">;

export const seasons: Season[] = (rawSeasons as RawSeason[])
  .map((season) => ({
    ...season,
    comment: SEASON_META[season.year]?.comment ?? buildDefaultComment(season.year),
    images: SEASON_META[season.year]?.images,
  }))
  .sort((a, b) => b.year - a.year);

function buildAllTimeBest(seasonsData: Season[]) {
  const totals = new Map<string, { totalPoints: number; totalStoses: number; seasons: number; wins: number }>();

  seasonsData.forEach((season) => {
    if (season.players.length === 0) return;

    season.players.forEach((player) => {
      const entry = totals.get(player.name) ?? {
        totalPoints: 0,
        totalStoses: 0,
        seasons: 0,
        wins: 0,
      };
      entry.totalPoints += player.punktiKopa;
      entry.totalStoses += player.stoses;
      entry.seasons += 1;
      totals.set(player.name, entry);
    });

    const winner = season.players[0];
    const winnerEntry = totals.get(winner.name);
    if (winnerEntry) winnerEntry.wins += 1;
  });

  return Array.from(totals.entries())
    .map(([name, stats]) => ({
      name,
      totalPoints: Math.round(stats.totalPoints * 10) / 10,
      totalStoses: Math.round(stats.totalStoses),
      seasons: stats.seasons,
      wins: stats.wins,
    }))
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.totalStoses !== a.totalStoses) return b.totalStoses - a.totalStoses;
      return a.name.localeCompare(b.name, "lv");
    })
    .slice(0, 5);
}

export const allTimeBest = buildAllTimeBest(seasons);

export const galleryImages = [
  {
    src: "/images/2026-feb-games.jpg",
    caption: "Februāra spēles",
    year: 2026,
  },
  {
    src: "/images/2026-feb-final.jpg",
    caption: "Februāra fināla cīņa - Pūgulis vs TomyG",
    year: 2026,
  },
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

export const rulebookUrl =
  "https://novuss-lnf.lv/wp-content/uploads/2025/03/Novusa-noteikumi-papildinajums-9.03.2025.pdf";
