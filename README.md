# 🏁 Scramble Racers (prototype)

A 2D platformer-racing party game — think **Fun Run × Ultimate Chicken Horse × roguelike drafting**.
You race 3 CPUs across a series of races. Between races, everyone re-rolls part of their
build *and* **re-themes a section** of the shared track, so it escalates into wacky chaos.

It's a **single self-contained HTML file** — no build step, no dependencies, no internet needed
(sound & music are synthesized live with the Web Audio API).

## ▶️ Play

Just open `index.html` in any modern browser (double-click it, or drag it into a browser window).

## 🎮 Controls

| Action | Keys |
| --- | --- |
| Move | `←` `→` or `A` `D` |
| Jump / climb ladders | `↑` or `W` |
| Ability (Dash / Jetpack / Afterburner / etc.) | `Space` |
| Mute / unmute | `M` |

## 🔁 Game loop

1. **Draft** — pick 1 of 3 random options for each of 4 attributes (Helmet, Gravity, Shoes, Ability).
2. **Race** — first across the line scores most. Points: **4 / 3 / 2 / 1**, last race is **double**.
   Once the first racer finishes, everyone else has **15 seconds** (sudden-death) before the race ends.
3. **Scramble phase** — re-roll one random attribute + **re-theme** one section of the track.
4. Repeat for 4 races, then final standings.

## 🗺️ Themed sections

The track is a row of **themed sections**, each drawing its own backdrop and hazard set. Players
(and CPUs) pick a section's theme during the Scramble phase:

- 🌳 **Grassland** — gentle: boost pads + springboards
- 🛝 **Playground** — slides, bounce pads, springboards
- 🏰 **Dungeon** — **lava** + spike traps (dark brick, flickering torches)
- ❄️ **Ice Cave** — icy (slippery) floor + spike traps + chasms
- 🌌 **Sky** — updrafts, sky rings, launch cannons (a flyer's playground)
- ⚙️ **Factory** — boost-strip floor, cannons, speed rings

## 🧠 Design rules (important for future edits)

- **Punishing hazards respawn you at the start of your current section:** **lava**, **spikes**,
  and **falling into a chasm** all send you back to that section's start (with brief mercy invuln).
  This is intentional risk/reward — a polarizing/heavy build can really struggle.
- **Hazards must stay *clearable* by any build** (no permanent softlocks): lava pools and chasms are
  sized so a running jump clears them, and abilities (Double Jump, Jetpack, Blink, Super Jump,
  Afterburner) are the answer for weak-jump builds. A 70s backstop ends any race regardless.
- **Ground-surface effects** (ice/sand/mud/boost) only affect you **while grounded** — flying/gliding
  over them is intended counterplay. Wind hits you in the air too.
- **Slides are ridden, not leapt:** you ride up the front of the ramp and accelerate down the chute,
  exiting fast and **low** (hugging the ground) rather than launching into the air.

## 🗺️ Roadmap ideas

- Local multiplayer (2–4 humans / gamepads)
- More section themes & hazards (literal swings, moving platforms)
- Per-theme music tracks
- More particles & juice

---
Built with [Claude Code](https://claude.com/claude-code).
