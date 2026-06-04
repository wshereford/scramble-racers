# Scramble Racers — project state & context

Self-contained HTML games (no build step; just open the file in a browser, or serve the
folder). Repo: **github.com/wshereford/scramble-racers** (branch `main`). Everything is
committed + pushed unless noted.

## The three game modes (each a standalone HTML file)
- **`index.html`** — the original Scramble Racers (draft a build → race 3 CPUs → scramble
  the track between 4 races; themed sections, hazards, abilities, synth audio/music).
- **`coins.html`** — **Coin Rush**: a playground-themed roguelike. Start with nothing; earn
  coins by placement + grabbing them on risky high/underground routes; spend in a shop
  (sectioned: stackable boosts / abilities / weapons / gear) between races; race points
  decide the winner. Has: multi-tier one-way platforms (S = drop down), trampolines,
  rideable swings (pendulum), tilting seesaws, ladders, sandpits, a long separated
  underground tunnel + vertical camera, global coins, weapons (F) incl. Lightning Strike,
  and premium game-breaker items (Time Warp, Phase Dash, Force Field, Golden Touch...).
- **`race.html`** — **online multiplayer** (Firebase Realtime DB). Lobby (create/join a
  4-letter room, ready-up, host starts), shared-seed deterministic track, client-authoritative
  position broadcast (~20Hz) with interpolated remote racers, live scoreboard + rematch.
  Single race only — NO shop/weapons/coins yet (stripped for v1 to get core sync working).

## ⏳ CURRENT TASK — finish multiplayer go-live
Firebase project `scramble-racers` + Realtime Database (test mode, open 30 days) and a
Vercel deploy of the repo are already set up. **The only thing left:** the user pastes their
real `firebaseConfig`, and we drop it into `race.html`'s placeholder.
1. In `race.html` `<head>` there's a `const firebaseConfig = {...}` with `"PASTE_ME"` values.
   Replace them with the user's real config (esp. `databaseURL`). It's public-safe to commit.
2. `git add race.html && git commit && git push origin main` → Vercel auto-redeploys (~30s).
3. Live at `<vercel-url>/race.html`. Create room → share code → friends join → ready → start.

## Known TODOs / next ideas
- Lock down the Firebase Realtime Database **rules** after playtesting (test mode is open R/W).
- Multiplayer netcode iteration: join/leave mid-race, smoothing, start-time sync.
- Add the shop/weapons/coins back into multiplayer once core sync feels good (needs syncing
  the shop phase + weapon hits across clients).
- The user wants to keep iterating on gameplay generally.

## Dev notes
- `server.ps1` + `coins-server`-type helpers and `.claude/launch.json` are local preview
  tooling (gitignored / outside repo). To preview: serve the folder and open the file.
- The preview **screenshot tool was flaky** this project — verify changes by driving the
  game headlessly via `preview_eval` (call `startRace()` / `raceTick()` and inspect state)
  rather than relying on screenshots.
- Git author is auto-detected (`liam@argsoutheast.onmicrosoft.com`); fine.
