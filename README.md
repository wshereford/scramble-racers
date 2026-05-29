# 🏁 Scramble Racers (prototype)

A 2D platformer-racing party game — think **Fun Run × Ultimate Chicken Horse × roguelike drafting**.
You race 3 CPUs across a series of races. Between races, everyone re-rolls part of their
build *and* drops a modifier onto the shared track, so it escalates into wacky chaos.

It's a **single self-contained HTML file** — no build step, no dependencies, no internet needed.

## ▶️ Play

Just open `index.html` in any modern browser (double-click it, or drag it into a browser window).

## 🎮 Controls

| Action | Keys |
| --- | --- |
| Move | `←` `→` or `A` `D` |
| Jump / climb ladders | `↑` or `W` |
| Ability (Dash / Jetpack / etc.) | `Space` |

## 🔁 Game loop

1. **Draft** — pick 1 of 3 random options for each of 4 attributes (Helmet, Gravity, Shoes, Ability).
2. **Race** — first across the line scores most. Points: **4 / 3 / 2 / 1**, last race is **double**.
3. **Scramble phase** — re-roll one random attribute + drop one map modifier into a section.
4. Repeat for 4 races, then final standings.

## 🧠 Design rules (important for future edits)

- **Every obstacle/modifier must stay passable by any build.** No hard walls (use low hurdles +
  step-up), no backward knockback, no pads that re-trigger in place (use cooldowns), and any
  climb/launch structure must auto-resolve.
- Ground-surface modifiers (ice/sand/mud/boost) only affect you **while grounded** — flying/gliding
  over them is intended counterplay. Wind hits you in the air too.
- After touching movement or modifiers, run the headless **deadlock sweep** (a batch sim of ~160
  races); a true deadlock shows up as a race hitting the ~70s timeout.

## 🗺️ Roadmap ideas

- Local multiplayer (2–4 humans / gamepads)
- More attributes & modifiers
- The "4 distinct stages with checkpoint flags" race structure (deferred)
- Sound, particles, more juice

---
Built with [Claude Code](https://claude.com/claude-code).
