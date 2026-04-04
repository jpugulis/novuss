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

export interface MonthlyComment {
  month: string;
  comment: string;
}

export interface Season {
  year: number;
  players: Player[];
  comment: string;
  images?: { src: string; caption: string }[];
  months?: MonthlyStandings[];
  monthlyComments?: MonthlyComment[];
}

interface SeasonMeta {
  comment: string;
  images?: { src: string; caption: string }[];
  monthlyComments?: MonthlyComment[];
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
    comment: `2026. gada sezona iesākusies jaudīgi un ar katru mēnesi dod jaunu materiālu apskatnieka komentāriem.`,
    images: [
      { src: "/images/Aprila TOP3.jpeg", caption: "Aprīļa TOP3" },
      { src: "/images/Aprila Tablo.jpeg", caption: "Aprīļa tablo" },
      { src: "/images/Aprila spele.jpeg", caption: "Aprīļa spēles" },
      { src: "/images/Aprila Cempions Karlis.jpeg", caption: "Aprīļa čempions Kārlis" },
    ],
    monthlyComments: [
      {
        month: "Janvāris",
        comment: `2026. gada sezona iesākās ar turnīru bez izsētajiem spēlētājiem un ar vairākiem negaidītiem pavērsieniem. Repča palika tikai 7. vietā, Dzinča nebija ieradies, un tops uz brīdi izskatījās pavisam citādi. TomyG finālā pārliecinoši sakāva Rūdi, Ziemis paņēma 4. vietu un 2 štoses, bet Birkants sezonu sāka ar pjedestālu.`,
      },
      {
        month: "Februāris",
        comment: `Februāra turnīrā sapulcējās 15 rubaki. Artchy ar 2:0 un štosi jau pirmajā spēlē aizsūtīja Repču uz zaudētāju zaru, bet Pūgulis pret TomyG uzspēlēja īstu trīsštošu klasiku. Finālā TomyG, nākot no zaudētāju zara, salauza Pūguli ar 3:0 un nostiprināja savu sezonas sākuma dominanci, sasniedzot jau 6 štoses.`,
      },
      {
        month: "Marts",
        comment: `Uz Marta turnīru bija ieradies Dzinča, no tālām zemēm nācis un augstas profesionalitātes virsotnes sasniedzis, un gatavs dalīties un iesaistīties interesantāko izspēļu analīzēs kā jau parasti. Mūsu G.O.A.T. Repčas noriets turpinās - šoreiz uzvarētāju zarā jaudīgi iesāka ar 3 štosēm 2 spēlēs, taču nevarēja tikt pāri Dzinčam un zaudētāju zarā Ziemis, uz hot streak pēc uzvaras pār Pūguli, arī paņēma uzvaru pret viņu 2:1 un aizkapājās līdz finālam uzvarot arī spēcīgo kopvērtējuma 2.vietas ieguvēju Rūdžu.

Pūgulis parādīja ārkārtīgi spēcīgu sniegumu iesākot turnīru arī ar 3 štosēm pirmajās 2 spēlēs, tad saspringtu, zaudētu spēli pret Rūdžu, taču 4 štose burtiski norāvās vieglā pēdējā sitienā spēlē pret Ziemi zaudētāju zarā. 3 štoses arī Dzinčam un Repčam.

Kopvērtējuma līderis TomyG šoreiz piedzīvoja GAME1 sagrāvi pret Repču un pēc uzreiz uzvarētāju zarā piekāpās līdzīgā spēlē Pūgulim 1:2 un palika 9.-12. vietu grupā.

Dāvi varētu saukt par sezonas stabilāko spēlētāju - stabila 10.vieta jau trešajā turnīrā pēc kārtas. Katrīna kā jaunpienācēja parādīja ļoti spēcīgu sniegumu aizkapājoties līdz TOP6.`,
      },
      {
        month: "Aprīlis",
        comment: `Aprīļa turnīrs pulcēja skaisti pilnu bracket ar 16 spēlmaņiem. Šoreiz nebija ieradies ne Repča, ne Dzinča, kas radīja vēl lielāku intrigu par TOP3.

Namatēvs Kārlis ar ļoti pārliecinošu sniegumu 5 spēlēs (2:0 (Š), 2:0, 2:0 (Š), 2:1, 2:0) parādīja pilnīgu dominanci. Tikai 1 zaudēta izspēle pret Tūju pusfinālā un pārliecinoša 2:0 uzvara finālā.

Sezonas kopvērtējuma līderis TomyG vēljoprojām ir jūtami priekšā pārējiem zaudējot "Rising Štosing STAR" Ziemim, kurš sablieza 3 Štoses pēdējās 3 spēlēs un tāpat tas bija par maz, lai tiktu pāri Tūjam gan uzvarētāju, gan pēcāk arī zaudētāju zarā, kur ar 3:2 (3xŠ) noslēdzās cīņa par iekļūšanu finālā no zaudētāju zara.

Rūdža no TOP2 ir nokrities uz 4.vietu (51p) pēc dubultzaudējuma Pūgulim un pēcāk Birkantam tādējādi noslēdzot TOP4 karavānu, kas ir krietni punktos atrāvušies no tuvākā sekotāja Pūguļa (39p).

Stabilākais spēlētājs Dāvis, kuram līdz šim bija 3x10.vieta, šoreiz izkrita jau pirmajā kārtā pret Arčiju.

Šomēness arī tikai 8 šoses pa turnīru salīdzinot ar 12 un 13 štosēm februārī un martā.`,
      },
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

type RawSeason = Omit<Season, "comment" | "images" | "monthlyComments">;

export const seasons: Season[] = (rawSeasons as RawSeason[])
  .map((season) => ({
    ...season,
    comment: SEASON_META[season.year]?.comment ?? buildDefaultComment(season.year),
    images: SEASON_META[season.year]?.images,
    monthlyComments: SEASON_META[season.year]?.monthlyComments,
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
    src: "/images/Rajona_Muzizglitiba.jpeg",
    caption: "Rajona Mūžizglītība",
    year: 2026,
  },
  {
    src: "/images/Aprila TOP3.jpeg",
    caption: "Aprīļa TOP3",
    year: 2026,
  },
  {
    src: "/images/Aprila Tablo.jpeg",
    caption: "Aprīļa tablo",
    year: 2026,
  },
  {
    src: "/images/Aprila spele.jpeg",
    caption: "Aprīļa spēles",
    year: 2026,
  },
  {
    src: "/images/Aprila Cempions Karlis.jpeg",
    caption: "Aprīļa čempions Kārlis",
    year: 2026,
  },
  {
    src: "/images/2026-mar-top3.jpeg",
    caption: "Marta TOP3 ar coach",
    year: 2026,
  },
  {
    src: "/images/2026-mar-bracket.jpeg",
    caption: "Marta turnīra zars",
    year: 2026,
  },
  {
    src: "/images/2026-mar-dzinca.jpeg",
    caption: "Guess who is back?",
    year: 2026,
  },
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
