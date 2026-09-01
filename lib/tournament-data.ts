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
      { src: "/images/Augusts-Cempions-2026.jpeg", caption: "Augusta čempions Kārlis" },
      { src: "/images/Augusta-top3-2026.gif", caption: "Augusta TOP3" },
      { src: "/images/Augusts-2026-tablo.jpeg", caption: "Augusta tablo" },
      { src: "/images/Saimnieks-cempions-augusts.gif", caption: "Saimnieks svin līdzi" },
      { src: "/images/Reinis-julija-cempions.jpeg", caption: "Jūlija čempions - debitants Reinis!" },
      { src: "/images/julija-2026-tablo.jpeg", caption: "Jūlija tablo - Rūdis pārsvītrots, kauns mūžīgs" },
      { src: "/images/Dzintis Neparspets.jpeg", caption: "Dzintis nepārspēts" },
      { src: "/images/Junija TOP3.jpeg", caption: "Jūnija TOP3" },
      { src: "/images/Junija TOP3 un runner up.jpeg", caption: "Jūnija TOP3 un runner-up" },
      { src: "/images/Junija TOP3 bauda savu veikumu.jpeg", caption: "Jūnija TOP3 bauda savu veikumu" },
      { src: "/images/Junija Tablo.jpeg", caption: "Jūnija tablo" },
      { src: "/images/Maija Cempions Dzintis.jpeg", caption: "Maija čempions Dzintis" },
      { src: "/images/Maija TOP3 un treneris.jpeg", caption: "Maija TOP3 un treneris" },
      { src: "/images/Maija Tablo.jpeg", caption: "Maija tablo" },
      { src: "/images/kaulins-uz-mates.jpeg", caption: "Māte zem kauliņa" },
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
      {
        month: "Maijs",
        comment: `Maija turnīrs pulcēja rekordlielu spēlētāju skaitu - 18 entuziastus. Dzinčisters ir atgriezies ar pārlicienoši uzvaru, kas arī apliecinās faktā, ka no rekordlielā turnīra štošu skaita - 15, 7 ir tieši Dzintim. Pūguļa/TomyG mačā tika piedzīvoti 2 interesanti pavērsieni - abi pēdējie dažādu krāsu kauliņi iesisti vienā, kas noveda pie pārspēles kā arī nākamajā spēlē māte pamanījās pasprukt zem kauliņa. TomyG ar Orļiku saglabā 1. un 2. vietu kopvērtējumā, kamēr 3.vietai ir pietuvojies Rūdža, kuru no Ziemja šķir vairs nu tikai 1 punkts!`,
      },
      {
        month: "Jūnijs",
        comment: `Jūnija pēcsvētku turnīrs piektdienā, kad sestdiena pusei valsts skaitās kā officiālā "pārceltā" darba diena, neliedza uz to ierasties prāvam skaitam spēlēt gribētāju - pulcējot 19 spēlētājus tas kļuva par sezonas apmeklētāko turnīru! Laikapstākļi bija lieliski. Brackets tika papildināts un ielozējās, ka 11/12 zars tika aizpildīts pilnībā - Kārlis vs TomyG un Raibīc vs Pūgulis. Bija āra galds, kur notika vairākas interesantas izspēles, galvenokārt tā iemesla dēļ, ka slīdamība bija nevienmērīga un līdz ar to spēles kļuva neparedzamākas. Neskatoties uz prāvo apmeklētāju skaitu, štoses bija maz - Dzintis dabūja 3 stabili aizvadot turnīru uzvarētāju zarā un kļūstot par stabilu čempionu, kamēr Tomy saglabāja kopvērtējuma līdera pozīciju paliekot 2.vietā un iegūstot arī 2 štoses. Kārlim, Tūjam un Pūgulim pa vienai. Kā sezonas atgriešanās bija Patrīcijas, Katrīnas un Ginta ierašanās!`,
      },
      {
        month: "Jūlijs",
        comment: `Jūlija turnīrs pārspēja visus apmeklējuma rekordus - 26 dalībnieki! - un uzdāvināja sezonas skandalozāko stāstu. Debitants Reinis no pirmās reizes izgāja cauri visam zaram un finālā ar 2:0 pieveica Raimi, kurš pēc zaudējuma pusfinālā bija izcīnījis garu ceļu cauri zaudētāju zaram. Kronis uzzīmēts, čempions jauns - kas to būtu domājis!

Bet tagad par galveno. Rūdis pusfinālā ar 2:1 nolika TomyG, ceļš uz uzvarētāju zara finālu vaļā... un tad vienkārši pameta turnīru, jo Vecrīgā Tallinas kvartālā gaidīja ballīte ar čomiem. Tablo viņa vārds palicis pārsvītrots abās vietās kā mūžīgs pieminekls izvēlei "štose vai šots". Trešā vieta pēc zara - bet kauna traips uz visu sezonu, Rūdi!

Štošu frontē jūlijs bija ražīgs - Pūgulim, Dzinčam un Ziemim katram pa 3! Dzinča ar 16 štosēm sezonā aizbēg no vajātājiem, kamēr Pūgulis ar 12 panāk TomyG. Kopvērtējumā TomyG (118) joprojām drošs līderis, Orļiks (87) otrais, bet dezertieris Rūdis (83) pakāpjas uz trešo vietu - punktus zars tomēr nepiedod tikai sirdsapziņai.

Sveicam pulkā arī Rūda darba biedrus Mieru un Kasparu, kā arī Emīlu - un Endija atgriešanos pie galda!`,
      },
      {
        month: "Augusts",
        comment: `Augusta turnīrs pulcēja prāvu pulku rubaku - 24!

Namatēvs Kārlis nospēlēja gandrīz perfektu turnīru - viena zaudēta spēle visa vakara garumā pret Dzinču pusfinālā, taču finālā ar pārliecinošu 3:0 un 2 štosēm uzvara pār viņu. Karaliskais gājiens!

Dzinčam savukārt bija jauns personīgais rekords - 7 štoses vienā turnīrā! Tik ražīgu vakaru viņam sen nav bijis, un finālā zaudējot tikko uzvarētajam Kārlim tas bija visai pavājš mierinājums, taču kopvērtējumā tas viņu pacēla uz 3.vietu.

Diezgan skandalozs stāsts pieder Tūjam - pēc zaudējuma jau 2.kārtā pret TomyG (1:2) viņš pa zaudētāju zaru izcīnīja ceļu atpakaļ līdz bronzas spēlei un tur pārspēja jaunpienācēju Artūru, nopelnot vēl vienu štosi un nozogot 3.vietu no tā, kurš uzvarētāju zarā bija ticis līdz pusfinālam! Artūram debija ar 4.vietu tomēr ir ļoti spēcīgs sākums.

Jaunas sejas turnīrā netrūka - sveicam Artūru un Buli!`,
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

function sortedByScore(players: Player[]): Player[] {
  return [...players]
    .sort((a, b) => {
      if (b.top8 !== a.top8) return b.top8 - a.top8;
      if (b.punktiKopa !== a.punktiKopa) return b.punktiKopa - a.punktiKopa;
      if (b.stoses !== a.stoses) return b.stoses - a.stoses;
      return a.name.localeCompare(b.name, "lv");
    })
    .map((player, index) => ({ ...player, position: index + 1 }));
}

type RawSeason = Omit<Season, "comment" | "images" | "monthlyComments">;

export const seasons: Season[] = (rawSeasons as RawSeason[])
  .map((season) => ({
    ...season,
    players: sortedByScore(season.players),
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
    src: "/images/Augusts-Cempions-2026.jpeg",
    caption: "Augusta čempions Kārlis",
    year: 2026,
  },
  {
    src: "/images/Augusta-top3-2026.gif",
    caption: "Augusta TOP3",
    year: 2026,
  },
  {
    src: "/images/Augusts-2026-tablo.jpeg",
    caption: "Augusta tablo",
    year: 2026,
  },
  {
    src: "/images/Saimnieks-cempions-augusts.gif",
    caption: "Saimnieks svin līdzi",
    year: 2026,
  },
  {
    src: "/images/Reinis-julija-cempions.jpeg",
    caption: "Jūlija čempions - debitants Reinis!",
    year: 2026,
  },
  {
    src: "/images/julija-2026-tablo.jpeg",
    caption: "Jūlija tablo - Rūdis pārsvītrots, kauns mūžīgs",
    year: 2026,
  },
  {
    src: "/images/Dzintis Neparspets.jpeg",
    caption: "Dzintis nepārspēts",
    year: 2026,
  },
  {
    src: "/images/Junija TOP3.jpeg",
    caption: "Jūnija TOP3",
    year: 2026,
  },
  {
    src: "/images/Junija TOP3 un runner up.jpeg",
    caption: "Jūnija TOP3 un runner-up",
    year: 2026,
  },
  {
    src: "/images/Junija TOP3 bauda savu veikumu.jpeg",
    caption: "Jūnija TOP3 bauda savu veikumu",
    year: 2026,
  },
  {
    src: "/images/Junija Tablo.jpeg",
    caption: "Jūnija tablo",
    year: 2026,
  },
  {
    src: "/images/Maija Cempions Dzintis.jpeg",
    caption: "Maija čempions Dzintis",
    year: 2026,
  },
  {
    src: "/images/Maija TOP3 un treneris.jpeg",
    caption: "Maija TOP3 un treneris",
    year: 2026,
  },
  {
    src: "/images/Maija Tablo.jpeg",
    caption: "Maija tablo",
    year: 2026,
  },
  {
    src: "/images/kaulins-uz-mates.jpeg",
    caption: "Māte zem kauliņa",
    year: 2026,
  },
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
