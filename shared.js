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

  const DEFAULTS = {
    settings: { master: 0.8, music: true, sfx: true, fullscreen: false },
    cosmetics: { color: '#ff5a5a', hat: 'none' },
    save: { coins: 0, owned: { colors: ['#ff5a5a', '#4aa3ff', '#5fd07a', '#ffd24d'], hats: ['none'] } },
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
    COLORS, HATS,
    settings: () => state.settings,
    cosmetics: () => state.cosmetics,
    save: () => state.save,
    persist,
    reset() { state = clone(DEFAULTS); persist(); },

    // ---- currency / unlocks ----
    addCoins(n) { state.save.coins = Math.max(0, (state.save.coins | 0) + (n | 0)); persist(); return state.save.coins; },
    ownsColor(id) { return state.save.owned.colors.includes(id); },
    ownsHat(id) { return state.save.owned.hats.includes(id); },
    // try to buy; returns true on success
    buyColor(id) {
      const c = COLORS.find(x => x.id === id); if (!c || this.ownsColor(id)) return false;
      if (state.save.coins < c.cost) return false;
      state.save.coins -= c.cost; state.save.owned.colors.push(id); persist(); return true;
    },
    buyHat(id) {
      const h = HATS.find(x => x.id === id); if (!h || this.ownsHat(id)) return false;
      if (state.save.coins < h.cost) return false;
      state.save.coins -= h.cost; state.save.owned.hats.push(id); persist(); return true;
    },
    setColor(id) { if (this.ownsColor(id)) { state.cosmetics.color = id; persist(); return true; } return false; },
    setHat(id) { if (this.ownsHat(id)) { state.cosmetics.hat = id; persist(); return true; } return false; },
    hatIcon(id) { const h = HATS.find(x => x.id === (id || state.cosmetics.hat)); return h ? h.icon : ''; },

    // ---- audio volume: effective gain for a given channel (0..1) ----
    vol(channel) {
      const s = state.settings;
      if (channel === 'music') return s.music ? s.master : 0;
      return s.sfx ? s.master : 0; // default: sfx
    },

    // ---- navigation helpers (so modes can return to the menu) ----
    goMenu() { location.href = 'index.html'; },
  };

  window.SR = SR;
})();
