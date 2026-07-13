/* ============================================================================
 * Scramble Racers — SHARED SYSTEMS  (window.SR)
 * One place for settings, cosmetics, and save data, used by the main-menu shell
 * AND both game modes (coins.html / race.html). This is the first step of
 * de-duplicating the two games: shared state lives here, persisted to
 * localStorage so it survives across pages and (later) the desktop build.
 * ==========================================================================*/
(function () {
  const LS_KEY = 'scrambleRacers.v1';

  // cosmetics catalogs -------------------------------------------------------
  const COLORS = [
    { id: '#ff5a5a', name: 'Cherry',     cost: 0 },
    { id: '#4aa3ff', name: 'Sky',        cost: 0 },
    { id: '#5fd07a', name: 'Mint',       cost: 0 },
    { id: '#ffd24d', name: 'Sunny',      cost: 0 },
    { id: '#c77bff', name: 'Grape',      cost: 40 },
    { id: '#ff8a3d', name: 'Tangerine',  cost: 40 },
    { id: '#ff7eb6', name: 'Bubblegum',  cost: 60 },
    { id: '#7be0ff', name: 'Aqua',       cost: 60 },
    { id: '#9aa0a6', name: 'Silver',     cost: 80 },
    { id: '#2a2a2a', name: 'Onyx',       cost: 120 },
  ];
  const HATS = [
    { id: 'none', name: 'None',      icon: '',   cost: 0 },
    { id: 'cap',  name: 'Cap',       icon: '🧢', cost: 30 },
    { id: 'bow',  name: 'Bow',       icon: '🎀', cost: 30 },
    { id: 'star', name: 'Star',      icon: '⭐', cost: 50 },
    { id: 'top',  name: 'Top Hat',   icon: '🎩', cost: 70 },
    { id: 'crown',name: 'Crown',     icon: '👑', cost: 150 },
    { id: 'mush', name: 'Mushroom',  icon: '🍄', cost: 50 },
    { id: 'flow', name: 'Flower',    icon: '🌸', cost: 40 },
  ];

  // achievements — each grants a one-time coin reward when unlocked ----------
  const ACHIEVEMENTS = [
    { id: 'first_finish', name: 'Off to the Races', desc: 'Finish your first tournament.',        icon: '🏁', reward: 20 },
    { id: 'first_win',    name: 'Winner!',          desc: 'Win a single race.',                    icon: '🥇', reward: 30 },
    { id: 'tourney_win',  name: 'Champion',         desc: 'Win a tournament.',                     icon: '🏆', reward: 100 },
    { id: 'podium',       name: 'On the Podium',    desc: 'Finish a tournament in the top 3.',     icon: '🥉', reward: 40 },
    { id: 'flawless',     name: 'Flawless',         desc: 'Win every race in one tournament.',     icon: '✨', reward: 150 },
    { id: 'online_win',   name: 'Top of the Lobby', desc: 'Win an online multiplayer tournament.', icon: '🌐', reward: 80 },
    { id: 'campaign1',    name: 'World Traveller',  desc: 'Clear the first campaign world.',        icon: '🗺️', reward: 60 },
    { id: 'campaign_all', name: 'Legend',           desc: 'Clear the whole campaign.',              icon: '👑', reward: 300 },
    { id: 'first_buy',    name: 'Fashionista',      desc: 'Buy a cosmetic.',                       icon: '🛍️', reward: 20 },
    { id: 'hatter',       name: 'Mad Hatter',       desc: 'Equip a hat.',                          icon: '🎩', reward: 20 },
    { id: 'wardrobe',     name: 'Full Wardrobe',    desc: 'Own 8 cosmetics.',                      icon: '🧑‍🎤', reward: 100 },
    { id: 'rich',         name: 'Rolling in It',    desc: 'Earn 500 coins in total.',              icon: '🤑', reward: 75 },
  ];
  // coins awarded by final tournament placement (1st..4th)
  const PLACEMENT_COINS = [120, 70, 40, 20];

  // ---- CAMPAIGN: worlds of hand-set levels, each a single race with an objective ----
  const WORLDS = [
    { n: 1, name: 'Sunny Meadows',  icon: '🌳', story: 'The Scramble Cup begins! Race the sunny meadows and show the critters who is fastest.' },
    { n: 2, name: 'Spooky Caverns', icon: '🕯️', story: 'Deeper in, the tracks turn dark and dangerous. Dodge spike-critters and slick ice to claim the crown.' },
  ];
  const CAMPAIGN = [
    { id: '1-1', world: 1, name: 'First Steps',     theme: 'grassland',  obj: { type: 'place', n: 1 },  tip: 'Beat the CPUs to the finish.' },
    { id: '1-2', world: 1, name: 'Bounce Around',   theme: 'playground', obj: { type: 'place', n: 1 },  tip: 'Trampolines and swings — finish 1st.' },
    { id: '1-3', world: 1, name: 'Coin Country',    theme: 'playground', obj: { type: 'coins', n: 12 }, tip: 'Grab at least 12 coins on the way.' },
    { id: '1-4', world: 1, name: 'Meadow Cup',      theme: 'playground', obj: { type: 'place', n: 1 },  tip: 'The meadow final — win it!' },
    { id: '2-1', world: 2, name: 'Into the Dark',   theme: 'dungeon',    obj: { type: 'place', n: 1 },  tip: 'Watch for hazards. Finish 1st.' },
    { id: '2-2', world: 2, name: 'Slippery Slopes', theme: 'ice',        obj: { type: 'place', n: 2 },  tip: 'Ice is slick — just finish top 2.' },
    { id: '2-3', world: 2, name: 'Spike Gauntlet',  theme: 'dungeon',    obj: { type: 'place', n: 1 },  tip: 'Spike-critters everywhere. Win it.' },
    { id: '2-4', world: 2, name: 'Cavern Cup',      theme: 'dungeon',    obj: { type: 'place', n: 1 },  tip: 'The grand final. Take the crown.' },
  ];

  const DEFAULTS = {
    settings: { master: 0.8, music: true, sfx: true, fullscreen: false },
    cosmetics: { color: '#ff5a5a', hat: 'none' },
    save: {
      coins: 0, lifetime: 0,
      owned: { colors: ['#ff5a5a', '#4aa3ff', '#5fd07a', '#ffd24d'], hats: ['none'] },
      achievements: [],
      campaign: { cleared: [] }, // ids of cleared campaign levels
    },
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function deepMerge(base, over) {
    for (const k in over) {
      if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k])) {
        base[k] = deepMerge(base[k] || {}, over[k]);
      } else base[k] = over[k];
    }
    return base;
  }

  let state = clone(DEFAULTS);
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) state = deepMerge(clone(DEFAULTS), JSON.parse(raw));
  } catch (e) { /* corrupt / unavailable → defaults */ }

  function persist() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }

  const SR = {
    COLORS, HATS, ACHIEVEMENTS, PLACEMENT_COINS, CAMPAIGN, WORLDS,
    settings: () => state.settings,
    cosmetics: () => state.cosmetics,
    save: () => state.save,
    persist,
    reset() { state = clone(DEFAULTS); persist(); },

    // ---- currency ----
    addCoins(n) {
      n = n | 0;
      if (n > 0) state.save.lifetime = (state.save.lifetime | 0) + n;
      state.save.coins = Math.max(0, (state.save.coins | 0) + n);
      persist();
      if ((state.save.lifetime | 0) >= 500) this.unlock('rich');
      return state.save.coins;
    },

    // ---- achievements ----
    hasAch(id) { return state.save.achievements.includes(id); },
    achievement(id) { return ACHIEVEMENTS.find(a => a.id === id); },
    // unlock once; grants reward coins + shows a toast. returns true only the FIRST time.
    unlock(id) {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (!a || state.save.achievements.includes(id)) return false;
      state.save.achievements.push(id);   // mark first (so reward's addCoins can't re-trigger)
      persist();
      if (a.reward) this.addCoins(a.reward);
      this.toast(`🏅 <b>${a.name}</b> — ${a.desc}<br><span style="color:#ffd24d">+${a.reward} 💰</span>`);
      return true;
    },

    // ---- cosmetics ownership / purchase / equip ----
    ownedCount() { return state.save.owned.colors.length + state.save.owned.hats.length; },
    ownsColor(id) { return state.save.owned.colors.includes(id); },
    ownsHat(id) { return state.save.owned.hats.includes(id); },
    buyColor(id) {
      const c = COLORS.find(x => x.id === id); if (!c || this.ownsColor(id)) return false;
      if (state.save.coins < c.cost) return false;
      state.save.coins -= c.cost; state.save.owned.colors.push(id); persist();
      this.unlock('first_buy'); if (this.ownedCount() >= 8) this.unlock('wardrobe');
      return true;
    },
    buyHat(id) {
      const h = HATS.find(x => x.id === id); if (!h || this.ownsHat(id)) return false;
      if (state.save.coins < h.cost) return false;
      state.save.coins -= h.cost; state.save.owned.hats.push(id); persist();
      this.unlock('first_buy'); if (this.ownedCount() >= 8) this.unlock('wardrobe');
      return true;
    },
    setColor(id) { if (this.ownsColor(id)) { state.cosmetics.color = id; persist(); return true; } return false; },
    setHat(id) { if (this.ownsHat(id)) { state.cosmetics.hat = id; persist(); if (id !== 'none') this.unlock('hatter'); return true; } return false; },
    hatIcon(id) { const h = HATS.find(x => x.id === (id || state.cosmetics.hat)); return h ? h.icon : ''; },

    // ---- campaign progress ----
    level(id) { return CAMPAIGN.find(l => l.id === id); },
    clearedLevel(id) { return state.save.campaign.cleared.includes(id); },
    levelUnlocked(id) {
      const i = CAMPAIGN.findIndex(l => l.id === id);
      if (i <= 0) return true;
      return this.clearedLevel(CAMPAIGN[i - 1].id);
    },
    worldDone(n) { return CAMPAIGN.filter(l => l.world === n).every(l => this.clearedLevel(l.id)); },
    campaignDone() { return CAMPAIGN.every(l => this.clearedLevel(l.id)); },
    nextLevel(id) { const i = CAMPAIGN.findIndex(l => l.id === id); return (i >= 0 && i < CAMPAIGN.length - 1) ? CAMPAIGN[i + 1] : null; },
    // clear a level; fires world/campaign achievements. returns coins rewarded (first clear only)
    clearLevel(id) {
      const first = !state.save.campaign.cleared.includes(id);
      if (first) { state.save.campaign.cleared.push(id); persist(); }
      const lvl = CAMPAIGN.find(l => l.id === id);
      if (lvl && this.worldDone(lvl.world) && lvl.world === 1) this.unlock('campaign1');
      if (this.campaignDone()) this.unlock('campaign_all');
      // reward coins for a first clear
      if (first) { this.addCoins(30); return 30; }
      return 0;
    },

    // ---- audio volume: effective gain for a given channel (0..1) ----
    vol(channel) {
      const s = state.settings;
      if (channel === 'music') return s.music ? s.master : 0;
      return s.sfx ? s.master : 0; // default: sfx
    },

    // ---- toast (works on any page) ----
    toast(html) {
      let host = document.getElementById('sr-toasts');
      if (!host) {
        host = document.createElement('div'); host.id = 'sr-toasts';
        host.style.cssText = 'position:fixed;top:14px;right:14px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;font-family:"Segoe UI",sans-serif';
        (document.body || document.documentElement).appendChild(host);
      }
      const t = document.createElement('div');
      t.style.cssText = 'background:rgba(16,24,40,.95);color:#e8edf5;border:1px solid rgba(255,255,255,.14);border-left:4px solid #ffd24d;border-radius:12px;padding:11px 15px;font-size:13.5px;line-height:1.35;box-shadow:0 10px 30px rgba(0,0,0,.5);max-width:300px;opacity:0;transform:translateX(30px);transition:opacity .25s,transform .25s';
      t.innerHTML = html; host.appendChild(t);
      requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; });
      setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(30px)'; setTimeout(() => t.remove(), 300); }, 3800);
    },

    // ---- navigation helpers ----
    goMenu() { location.href = 'index.html'; },
  };

  window.SR = SR;
})();
