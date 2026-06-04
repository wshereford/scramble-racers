# Online Multiplayer — Setup (give this to Claude-in-Chrome)

The game code (`race.html`) is built. Two accounts need connecting, which an AI can't do
on your behalf (logins/OAuth). Hand the two tasks below to **Claude-in-Chrome**, staying
present to approve any login prompts. Then paste the two results back to Claude Code.

---

## TASK 1 — Firebase (the multiplayer server)

> Go to https://console.firebase.google.com and sign me in if needed (I'll handle the
> Google login). Then:
> 1. Click **Add project**. Name it `scramble-racers` (skip Google Analytics). Create it.
> 2. In the left menu: **Build → Realtime Database → Create Database**.
>    - Pick any location.
>    - Choose **Start in test mode** → Enable.
> 3. Go to **Project settings** (the ⚙ gear, top-left) → scroll to **Your apps** →
>    click the **Web** icon `</>`.
> 4. Register the app (nickname `web`, no hosting). It will display a **`firebaseConfig`**
>    object with apiKey, authDomain, databaseURL, etc.
> 5. **Copy the entire `firebaseConfig` object and report it back to me.**

(The config is safe to share — Firebase web configs are public by design; security comes
from the database rules, which we'll tighten after the playtest.)

---

## TASK 2 — Vercel (hosting → the shareable link)

> Go to https://vercel.com and sign in **with GitHub** (I'll approve the login/authorization).
> Then:
> 1. Click **Add New → Project**.
> 2. Find and **Import** the repo **`wshereford/scramble-racers`**.
> 3. Leave all settings default (it's a static site, zero config) → **Deploy**.
> 4. When it finishes, **report back the live URL** (e.g. `https://scramble-racers.vercel.app`).

The game modes will live at:
- `…/index.html`  → original Scramble Racers
- `…/coins.html`  → Coin Rush
- `…/race.html`   → **online multiplayer** ← share this one with friends

---

## TASK 3 — back to Claude Code (me)

Paste the **`firebaseConfig`** and the **Vercel URL** back here. I'll:
1. Drop the config into `race.html` and push (Vercel auto-redeploys in ~30s).
2. Give you the final link to share with friends.

Then: open `…/race.html`, **Create Room**, share the 4-letter code, friends **Join**,
everyone hits **Ready**, host hits **Start** — you race live.
