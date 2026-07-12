# Ikmēneša turnīra rezultātu atjaunošana

## Ko dot Claude pēc turnīra

1. **Tablo foto** (obligāti) — bilde ar vietām, vārdiem un apvilktajiem Š (štoses).
2. Pēc izvēles: TOP3 / fināla bildes galerijai un pāris teikumi vai fakti komentāram.

## Ko Claude izdara

1. Nolasa tablo: vietas, vārdi, štoses (apvilktais Š).
2. Vārdus sasaista ar `lib/players.json` (pilnais vārds ↔ segvārds ↔ aliases).
   Nepazīstamu vārdu gadījumā pajautā un pievieno jaunu ierakstu `players.json`.
3. Pievieno jauno mēnesi `lib/seasons.generated.json` sadaļā `months[]`:
   ```json
   { "month": "Jūlijs", "results": [
     { "name": "TomyG", "position": 1, "points": 25, "stoses": 2 },
     { "name": "Orļiks", "position": 2, "points": 20 }
   ]}
   ```
   `stoses` pieraksta tikai tiem, kam tās bija (no 2026. jūlija; janvāris–jūnijs sēž `stosesBase`).
4. Palaiž pārrēķinu:
   ```
   node scripts/recalc-season.mjs 2026
   ```
   Tas pārrēķina `players[]` (punkti, TOP8, AVG, štoses, vietas) no mēnešu datiem.
   **Skriptu darbina tikai tekošajai sezonai** — vecāko gadu (2017–2025) `players[]` ir
   autoritatīvi no Google Sheet un mēnešu dati tos precīzi neatjauno.
5. Pievieno bildes `public/images/` un ierakstus `SEASON_META` galerijā (`lib/tournament-data.ts`).
6. Uzmet mēneša komentāra melnrakstu (`monthlyComments`) — Jānis rediģē/apstiprina.
7. Sagatavo **ielīmēšanas bloku Google Sheet** — vietas un punkti pilnajos vārdos tabulas secībā.

## Ko Jānis izdara pēc tam

1. Pārskata izmaiņas (`git diff`), komentāru un jaunos spēlētājus.
2. Ielīmē bloku Google Sheet mēneša kolonnās, atjauno Štoses kolonnu.
3. `git add -A && git commit && git push` → Vercel izliek automātiski.

## Punktu sistēma

| Vieta | 1 | 2 | 3 | 4 | 5–6 | 7–8 | 9–12 | 13–16 | 17+ |
|-------|---|---|---|---|-----|-----|------|-------|-----|
| Punkti | 25 | 20 | 16 | 12 | 10 | 9 | 6 | 5 | 3 |

Definēta arī `lib/players.json` (`pointsByPosition`) — noder foto nolasījuma pārbaudei
(vieta ↔ punkti jāsakrīt).
