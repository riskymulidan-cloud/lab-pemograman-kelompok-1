/* Atelier Nara — interaksi halaman undangan: katalog, demo undangan, harga, form, FAQ.
   Membutuhkan js/data.js dan js/components.js dimuat lebih dulu. */

/* =========================================================
   HELPERS  ($, $$, buildWhatsAppUrl, lockScroll ada di js/components.js)
   ========================================================= */
function formatRupiah(amount) {
  return "Rp" + Number(amount).toLocaleString("id-ID");
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  const win = window.open(url, "_blank");
  if (win) { try { win.opener = null; } catch (e) { /* ignore */ } }
  else window.location.href = url; // fallback jika pop-up diblokir
}

function getTemplate(id) { return TEMPLATES.find(t => t.id === id); }
function getPackage(id) { return PACKAGES.find(p => p.id === id); }

let toastTimer = null;
function showToast(message) {
  const toast = $("#toast");
  $("#toastText").textContent = message;
  toast.classList.add("is-shown");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 3000);
}

/* seeded random so watercolor shapes are stable */
function seededRandom(seed) {
  let s = seed >>> 0;
  return function () {
    s += 0x6D2B79F5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


/* =========================================================
   ORNAMENTS (line-art dekoratif)
   ========================================================= */
/* decorative line-art ornaments */
const ORNAMENTS = {
  sprig: `<svg viewBox="0 0 120 160" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" aria-hidden="true"><path d="M60 156C58 120 62 88 60 44"/><path d="M60 122c-15-8-24-20-26-34 14 4 23 16 26 34Z"/><path d="M60 102c15-8 24-20 26-34-14 4-23 16-26 34Z"/><path d="M60 80c-13-8-19-18-20-30 12 4 18 14 20 30Z"/><g transform="translate(60 30)"><ellipse rx="4.5" ry="10" cy="-9"/><ellipse rx="4.5" ry="10" cy="-9" transform="rotate(72)"/><ellipse rx="4.5" ry="10" cy="-9" transform="rotate(144)"/><ellipse rx="4.5" ry="10" cy="-9" transform="rotate(216)"/><ellipse rx="4.5" ry="10" cy="-9" transform="rotate(288)"/><circle r="2.6"/></g></svg>`,
  branch: `<svg viewBox="0 0 200 90" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" aria-hidden="true"><path d="M6 80C50 66 110 54 194 12"/><path d="M40 70c-4-12 0-22 10-28 2 12-2 22-10 28ZM40 70c10-4 20-2 26 6-10 4-20 2-26-6ZM80 59c-3-12 2-22 12-27 1 12-3 21-12 27ZM80 59c10-3 20 0 25 8-10 3-19 0-25-8ZM118 45c-2-12 3-21 13-25 0 12-5 20-13 25ZM118 45c10-2 19 2 23 10-10 2-18-1-23-10ZM156 28c-1-11 5-19 15-22-1 11-6 19-15 22ZM156 28c9 0 17 5 19 13-9 0-16-5-19-13Z"/></svg>`,
  bouquet: `<svg viewBox="0 0 200 220" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" aria-hidden="true"><path d="M100 215V120M100 150c-20-14-40-20-62-18M100 150c20-14 40-20 62-18M100 175c-12-30-30-46-52-56M100 175c12-30 30-46 52-56"/><path d="M38 132c-6-10-4-20 6-26 4 10 2 20-6 26ZM162 132c6-10 4-20-6-26-4 10-2 20 6 26ZM48 119c-10-4-14-12-12-22 10 4 14 12 12 22ZM152 119c10-4 14-12 12-22-10 4-14 12-12 22Z"/><g transform="translate(100 92)"><circle r="20"/><path d="M0-20c10 6 12 18 0 22-12-4-10-16 0-22ZM-14 4c4-10 16-12 22-4-4 10-16 12-22 4ZM14 4C10-6-2-8-8 0c4 10 16 12 22 4Z"/></g><g transform="translate(60 74)"><circle r="12"/><circle r="5"/></g><g transform="translate(140 74)"><circle r="12"/><circle r="5"/></g><path d="M100 72c0-14 4-26 12-34M100 72c0-14-4-26-12-34"/><circle cx="112" cy="36" r="4"/><circle cx="88" cy="36" r="4"/></svg>`,
  rosebud: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" aria-hidden="true"><path d="M24 44V24"/><path d="M24 34c-6-1-10-5-11-10 6 0 10 4 11 10ZM24 30c6-1 10-5 11-10-6 0-10 4-11 10Z"/><path d="M24 24c-7 0-10-6-8-12 2 3 5 4 8 4 3 0 6-1 8-4 2 6-1 12-8 12Z"/><path d="M20 13c0-4 2-8 4-9 2 1 4 5 4 9"/></svg>`,
  share: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="29" stroke-dasharray="2 4" opacity=".6"/><circle cx="20" cy="32" r="6"/><circle cx="44" cy="20" r="6"/><circle cx="44" cy="44" r="6"/><path d="m25.5 29 13-6M25.5 35l13 6"/></svg>`,
  leaf: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="29" stroke-dasharray="2 4" opacity=".6"/><path d="M18 46C16 28 28 16 48 16c0 20-12 32-30 30Z"/><path d="M18 46 40 24M28 36h8M24 32v-8"/></svg>`,
  palette: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="29" stroke-dasharray="2 4" opacity=".6"/><path d="M32 14c-10 0-18 8-18 18s8 18 18 18c3 0 4-2 3-4-1-3 1-5 4-5h4c4 0 7-3 7-7 0-11-8-20-18-20Z"/><circle cx="24" cy="28" r="2"/><circle cx="31" cy="22" r="2"/><circle cx="39" cy="25" r="2"/></svg>`,
  tap: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="29" stroke-dasharray="2 4" opacity=".6"/><rect x="22" y="12" width="20" height="36" rx="4"/><path d="M29 43h6"/><path d="M32 20v8M28 24h8"/></svg>`
};

/* =========================================================
   WATERCOLOR STAINS (SVG + turbulence displacement)
   ========================================================= */
const STAIN_COLORS = {
  rose: "#D7A6A1", blush: "#E9C3BA", sage: "#A6B09A", terra: "#B97862",
  gold: "#C3A477", cream: "#E2D3BD", lavender: "#C9BCE0", peach: "#F2B8A0", butter: "#F3D98B", olive: "#9AA684", burgundy: "#8C3A47"
};
let stainCounter = 0;

function createStainSVG(colorKeys, seed = 1) {
  const id = "wc" + (++stainCounter);
  const rand = seededRandom(seed * 97 + 13);
  const colors = colorKeys.map(k => STAIN_COLORS[k] || k);
  let gradients = "";
  let shapes = "";
  colors.forEach((color, i) => {
    gradients += `<radialGradient id="${id}g${i}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${color}" stop-opacity=".16"/>
      <stop offset=".55" stop-color="${color}" stop-opacity=".28"/>
      <stop offset=".86" stop-color="${color}" stop-opacity=".5"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`;
    const blobs = i === 0 ? 3 : 2;
    for (let b = 0; b < blobs; b++) {
      const cx = 200 + (rand() - .5) * 150;
      const cy = 200 + (rand() - .5) * 150;
      const rx = 70 + rand() * (i === 0 ? 90 : 60);
      const ry = 60 + rand() * (i === 0 ? 80 : 55);
      const rot = Math.round(rand() * 180);
      shapes += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" transform="rotate(${rot} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill="url(#${id}g${i})"/>`;
    }
  });
  // small pigment droplets
  let drops = "";
  for (let d = 0; d < 4; d++) {
    const ang = rand() * Math.PI * 2, dist = 150 + rand() * 40;
    drops += `<circle cx="${(200 + Math.cos(ang) * dist).toFixed(1)}" cy="${(200 + Math.sin(ang) * dist).toFixed(1)}" r="${(2 + rand() * 6).toFixed(1)}" fill="${colors[d % colors.length]}" opacity=".35"/>`;
  }
  return `<svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">
    <defs>
      <filter id="${id}f" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="${seed}" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
        <feGaussianBlur in="displaced" stdDeviation="2.4"/>
      </filter>
      <filter id="${id}d"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="${seed + 3}" result="n2"/><feDisplacementMap in="SourceGraphic" in2="n2" scale="12"/></filter>
      ${gradients}
    </defs>
    <g filter="url(#${id}f)">${shapes}</g>
    <g filter="url(#${id}d)">${drops}</g>
  </svg>`;
}

function renderStains(root = document) {
  $$("[data-stain]", root).forEach(el => {
    if (el.dataset.rendered) return;
    const colors = el.dataset.stain.split(",").map(s => s.trim());
    el.insertAdjacentHTML("afterbegin", createStainSVG(colors, Number(el.dataset.seed) || 1));
    el.dataset.rendered = "1";
    el.classList.add("stain");
  });
}

function renderIcons(root = document) {
  $$("[data-icon]", root).forEach(el => {
    if (el.dataset.rendered) return;
    const svg = ICONS[el.dataset.icon];
    if (!svg) return;
    el.outerHTML = svg;
  });
  $$("[data-ornament]", root).forEach(el => {
    if (el.dataset.rendered) return;
    el.innerHTML = ORNAMENTS[el.dataset.ornament] || "";
    el.dataset.rendered = "1";
    if (!el.classList.contains("hero__sprig") && !el.classList.contains("arch__flower")) el.classList.add("ornament");
  });
  $$("[data-ornament-inline]", root).forEach(el => {
    el.outerHTML = ORNAMENTS[el.dataset.ornamentInline].replace("<svg ", `<svg class="${el.className}" `);
  });
}

/* =========================================================
   INVITATION MOCKUP RENDERER (unique art per template)
   ========================================================= */
function botanicalArc(color) {
  let leaves = "";
  const p0 = [24, 86], p1 = [100, 10], p2 = [176, 86];
  for (let i = 1; i < 14; i++) {
    const t = i / 14;
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0];
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1];
    const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    const side = i % 2 ? -42 : 42;
    leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7.5" ry="2.6" transform="rotate(${(ang + side).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}) translate(6 0)" fill="${color}" fill-opacity=".18"/>`;
  }
  return `<path d="M24 86 Q100 10 176 86" stroke="${color}" stroke-width=".9" fill="none"/>${leaves}`;
}

function inviteOrnament(t) {
  const c = t.colors;
  const rand = seededRandom(t.id.length * 31 + 7);
  switch (t.style) {
    case "classic":
      return `<svg class="inv__orn" viewBox="0 0 200 280" preserveAspectRatio="none" fill="none" stroke="${c.accent}" aria-hidden="true">
        <rect x="9" y="9" width="182" height="262" stroke-width=".9"/><rect x="14" y="14" width="172" height="252" stroke-width=".45"/>
        <path d="M14 36c8 0 14-6 14-14M186 36c-8 0-14-6-14-14M14 244c8 0 14 6 14 14M186 244c-8 0-14 6-14 14" stroke-width=".7"/>
        <path d="M74 46c10-10 20-10 26-2 6-8 16-8 26 2M80 236c8 6 14 6 20 0 6 6 12 6 20 0" stroke-width=".8"/>
        <circle cx="100" cy="40" r="2" fill="${c.accent}" stroke="none"/><circle cx="100" cy="242" r="1.6" fill="${c.accent}" stroke="none"/>
      </svg>`;
    case "watercolor":
      return `<div class="inv__stain inv__stain--tl">${createStainSVG(["rose", "blush"], 61)}</div>
        <div class="inv__stain inv__stain--br">${createStainSVG(["blush", "sage"], 62)}</div>
        <svg class="inv__orn" viewBox="0 0 200 280" fill="none" stroke="${c.accent}" stroke-width=".8" stroke-linecap="round" aria-hidden="true">
          <path d="M100 44v-16M100 34c-6-1-9-5-10-9 5 0 9 4 10 9ZM100 32c6-1 9-5 10-9-5 0-9 4-10 9Z"/><circle cx="100" cy="24" r="4"/>
          <path d="M70 250h60" stroke-width=".6"/>
        </svg>`;
    case "botanical":
      return `<svg class="inv__orn" viewBox="0 0 200 280" fill="none" aria-hidden="true">
        ${botanicalArc(c.accent)}
        <rect x="12" y="12" width="176" height="256" rx="2" stroke="${c.accent}" stroke-opacity=".35" stroke-width=".6"/>
        <path d="M100 262v-22M100 252c-8-2-12-6-13-12 7 0 11 5 13 12ZM100 246c8-2 12-6 13-12-7 0-11 5-13 12Z" stroke="${c.accent}" stroke-width=".8"/>
      </svg>`;
    case "celestial": {
      let stars = "";
      for (let i = 0; i < 34; i++) {
        const x = rand() * 200, y = rand() * 280, r = rand() * 1.1 + .3;
        stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${c.accent}" opacity="${(.3 + rand() * .6).toFixed(2)}"/>`;
      }
      return `<svg class="inv__orn" viewBox="0 0 200 280" fill="none" aria-hidden="true">${stars}
        <ellipse cx="100" cy="140" rx="86" ry="118" stroke="${c.accent}" stroke-opacity=".35" stroke-width=".6"/>
        <ellipse cx="100" cy="140" rx="80" ry="112" stroke="${c.accent}" stroke-opacity=".2" stroke-width=".5" stroke-dasharray="1 4"/>
        <path d="M112 30a18 18 0 1 0 0 36 14 14 0 1 1 0-36Z" fill="${c.accent}"/>
        <path d="M160 214l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z M40 70l1.5 4.5 4.5 1.5-4.5 1.5L40 82l-1.5-4.5L34 76l4.5-1.5Z" fill="${c.accent}"/>
      </svg>`;
    }
    case "floral": {
      const flower = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map(a => `<ellipse rx="5" ry="9" cy="-8" transform="rotate(${a})" fill="${fill}" fill-opacity=".55"/>`).join("")}<circle r="3" fill="${c.accent}"/></g>`;
      return `<svg class="inv__orn" viewBox="0 0 200 280" fill="none" aria-hidden="true">
        <path d="M26 272V110a74 74 0 0 1 148 0v162" stroke="${c.accent}" stroke-width="1.3"/>
        <path d="M34 272V112a66 66 0 0 1 132 0v160" stroke="${c.accent}" stroke-width=".5"/>
        <path d="M56 70c10-18 28-28 44-28s34 10 44 28" stroke="${c.accent2}" stroke-width=".8"/>
        <path d="M62 64c-8-6-10-14-6-20 7 3 9 11 6 20ZM138 64c8-6 10-14 6-20-7 3-9 11-6 20ZM80 50c-4-8-2-16 4-18 3 6 1 14-4 18ZM120 50c4-8 2-16-4-18-3 6-1 14 4 18Z" fill="${c.accent2}" fill-opacity=".5"/>
        ${flower(100, 44, 1.2, c.accent2)}${flower(70, 60, .8, c.accent2)}${flower(130, 60, .8, c.accent2)}${flower(52, 86, .55, c.accent)}${flower(148, 86, .55, c.accent)}
      </svg>`;
    }
    case "pastel": {
      const cols = ["#F2B8A0", "#F3D98B", "#EFB0B8", "#BFD3C1"];
      let confetti = "";
      for (let i = 0; i < 26; i++) {
        const x = rand() * 200, y = rand() * 280;
        confetti += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="3" height="6" rx="1" fill="${cols[i % 4]}" transform="rotate(${Math.round(rand() * 180)} ${x.toFixed(1)} ${y.toFixed(1)})" opacity=".8"/>`;
      }
      const balloon = (x, y, fill, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse rx="14" ry="17" fill="${fill}"/><path d="M-3 16h6l-3 4Z" fill="${fill}"/><path d="M0 20c-4 10 4 16 0 30" stroke="#C9A99A" stroke-width=".7"/><ellipse cx="-5" cy="-6" rx="3" ry="5" fill="#fff" opacity=".45"/></g>`;
      return `<svg class="inv__orn" viewBox="0 0 200 280" fill="none" aria-hidden="true">${confetti}
        ${balloon(70, 48, "#F2B8A0")}${balloon(100, 36, "#F3D98B", 1.1)}${balloon(132, 52, "#EFB0B8")}
        <path d="M30 250q70-20 140 0" stroke="${c.accent}" stroke-width=".8" stroke-dasharray="2 3"/>
      </svg>`;
    }
    case "cute": {
      const heart = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 4C-6-2-10 2-8 6l8 7 8-7c2-4-2-8-8-2Z" fill="${f}"/>`;
      const star = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-6l1.8 4.2L6-1.8 2.8 1.6 3.6 6 0 3.8-3.6 6l.8-4.4L-6-1.8l4.2-.4Z" fill="${f}"/>`;
      return `<svg class="inv__orn" viewBox="0 0 200 280" fill="none" aria-hidden="true">
        <rect x="12" y="12" width="176" height="256" rx="22" stroke="${c.accent}" stroke-width="1" stroke-dasharray="3 4"/>
        <path d="M54 66a12 12 0 0 1 22-6 14 14 0 0 1 26 4 10 10 0 0 1 4 19H58a10 10 0 0 1-4-17Z" fill="#fff" stroke="${c.accent}" stroke-width=".8"/>
        <path d="M118 52a9 9 0 0 1 16-4 10 10 0 0 1 18 3 7 7 0 0 1 2 13h-34a7 7 0 0 1-2-12Z" fill="#fff" stroke="${c.accent}" stroke-width=".7"/>
        ${heart(44, 222, 1, c.accent2)}${heart(160, 210, .8, c.accent)}${star(150, 36, 1, c.accent2)}${star(40, 42, .8, c.accent)}${star(166, 240, .7, c.accent2)}
      </svg>`;
    }
    case "editorial":
      return `<svg class="inv__orn" viewBox="0 0 200 280" fill="none" aria-hidden="true">
        <circle cx="132" cy="84" r="52" fill="${c.accent}" fill-opacity=".9"/>
        <path d="M80 136h104" stroke="${c.ink}" stroke-width=".7"/>
        <path d="M22 22h40M22 26h26" stroke="${c.ink}" stroke-width=".6"/>
        <text x="22" y="40" font-family="Plus Jakarta Sans, sans-serif" font-size="6" letter-spacing="2" fill="${c.ink}">VOL. 01 — INVITATION</text>
        <path d="M22 160h156M22 164h156" stroke="${c.accent2}" stroke-width=".5"/>
      </svg>`;
    default:
      return "";
  }
}

function renderInvite(t, overrides = {}) {
  const c = t.colors;
  const s = Object.assign({}, t.sample, overrides);
  const isEditorial = t.style === "editorial";
  const names = isEditorial
    ? `${escapeHTML(s.names[0])}<br><span class="inv__amp">&amp;</span> ${escapeHTML(s.names[1])}`
    : (t.category === "birthday" || t.category === "special")
      ? `${escapeHTML(s.names[0])}<br>${escapeHTML(s.names[1])}`
      : `${escapeHTML(s.names[0])}<span class="inv__amp">&amp;</span>${escapeHTML(s.names[1])}`;
  return `<div class="inv inv--${t.style}" style="--p:${c.paper};--i:${c.ink};--a:${c.accent}">
    ${inviteOrnament(t)}
    <div class="inv__content">
      <span class="inv__kicker">${escapeHTML(s.kicker)}</span>
      <span class="inv__names">${names}</span>
      <span class="inv__rule"></span>
      <span class="inv__date">${escapeHTML(s.date)}</span>
      <span class="inv__place">${escapeHTML(s.place)}</span>
    </div>
  </div>`;
}

/* =========================================================
   COLLECTION: filters, cards, modal
   ========================================================= */
let activeCategory = "all";
let modalTemplateId = null;
let lastFocusedBeforeModal = null;

function renderFilters() {
  const wrap = $("#filters");
  wrap.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === "all" ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat.id).length;
    return `<button type="button" class="filter-btn" data-filter="${cat.id}" aria-pressed="${cat.id === activeCategory}">${cat.label}<sup>${count}</sup></button>`;
  }).join("");
  wrap.addEventListener("click", e => {
    const btn = e.target.closest("[data-filter]");
    if (btn) applyFilter(btn.dataset.filter);
  });
}

function renderTemplateCards() {
  const grid = $("#templateGrid");
  grid.innerHTML = TEMPLATES.map((t, i) => {
    const pkg = getPackage(t.pkg);
    const catLabel = CATEGORIES.find(c => c.id === t.category).label;
    return `<article class="tpl-card reveal" style="--d:${(i % 4) * .08}s" data-category="${t.category}" data-id="${t.id}">
      <div class="tpl-card__art" style="--s:${t.colors.surface};--tilt:${t.tilt}" role="button" tabindex="0" data-action="preview" aria-label="Preview ${escapeHTML(t.name)}">
        <div class="stain" data-stain="${t.style === "botanical" ? "sage,olive" : t.style === "celestial" ? "gold,cream" : t.style === "floral" ? "burgundy,rose" : t.style === "pastel" ? "peach,butter" : t.style === "cute" ? "lavender,peach" : t.style === "editorial" ? "terra,gold" : t.style === "watercolor" ? "rose,blush" : "gold,cream"}" data-seed="${i * 7 + 300}" style="width:120%;left:-10%;top:-10%"></div>
        <span class="tpl-card__tag">${catLabel}</span>
        ${renderInvite(t)}
      </div>
      <div class="tpl-card__body">
        <span class="tpl-card__theme">${escapeHTML(t.theme)}</span>
        <h3 class="tpl-card__name">${escapeHTML(t.name)}</h3>
        <p class="tpl-card__desc">${escapeHTML(t.desc)}</p>
        <div class="tpl-card__row">
          <span class="swatches" aria-label="Palet warna">${t.palette.map(p => `<i style="background:${p[1]}" title="${p[0]}"></i>`).join("")}</span>
          <span class="price"><small>mulai</small>${formatRupiah(pkg.price)}</span>
        </div>
        <div class="tpl-card__actions">
          <button type="button" class="btn btn--ghost" data-action="preview">Preview Design</button>
          <button type="button" class="btn btn--solid" data-action="choose">Choose This Design</button>
        </div>
      </div>
    </article>`;
  }).join("");

  grid.addEventListener("click", e => {
    const trigger = e.target.closest("[data-action]");
    if (!trigger) return;
    const id = trigger.closest(".tpl-card").dataset.id;
    if (trigger.dataset.action === "preview") openTemplateModal(id);
    if (trigger.dataset.action === "choose") selectTemplateForOrder(id);
  });
  grid.addEventListener("keydown", e => {
    const art = e.target.closest(".tpl-card__art");
    if (art && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openTemplateModal(art.closest(".tpl-card").dataset.id);
    }
  });
  updateCollectionCount();
}

function applyFilter(category) {
  activeCategory = category;
  $$(".filter-btn").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === category)));
  const cards = $$(".tpl-card");
  cards.forEach(card => {
    const match = category === "all" || card.dataset.category === category;
    if (match) {
      card.hidden = false;
      card.classList.add("is-visible");
      requestAnimationFrame(() => card.classList.remove("is-hiding"));
    } else {
      card.classList.add("is-hiding");
      setTimeout(() => { if (card.classList.contains("is-hiding")) card.hidden = true; }, 380);
    }
  });
  updateCollectionCount();
}

function updateCollectionCount() {
  const count = activeCategory === "all" ? TEMPLATES.length : TEMPLATES.filter(t => t.category === activeCategory).length;
  const label = CATEGORIES.find(c => c.id === activeCategory).label;
  $("#collectionCount").textContent = `Menampilkan ${count} desain · ${label}`;
  $("#emptyState").style.display = count ? "none" : "block";
}

function openTemplateModal(id) {
  const t = getTemplate(id);
  if (!t) return;
  modalTemplateId = id;
  lastFocusedBeforeModal = document.activeElement;
  const pkg = getPackage(t.pkg);
  const modal = $("#templateModal");
  const art = $("#modalArt");
  art.style.setProperty("--s", t.colors.surface);
  art.innerHTML = `<div class="stain" data-stain="${t.style === "celestial" ? "gold,cream" : t.style === "botanical" ? "sage,olive" : "rose,gold"}" data-seed="${id.length * 11}" style="width:110%;left:-5%;top:-5%"></div>${renderInvite(t)}`;
  renderStains(art);
  $("#modalCategory").textContent = CATEGORIES.find(c => c.id === t.category).label;
  $("#modalTitle").textContent = t.name;
  $("#modalTheme").textContent = t.theme;
  $("#modalDesc").textContent = t.desc;
  $("#modalPalette").innerHTML = t.palette.map(p => `<span><i style="background:${p[1]}"></i>${p[0]}</span>`).join("");
  $("#modalFeatures").innerHTML = t.features.map(f => `<li>${ICONS.check}${escapeHTML(f)}</li>`).join("");
  $("#modalPrice").innerHTML = `${formatRupiah(pkg.price)} <small class="muted" style="font-family:var(--sans);font-size:12px">· ${pkg.name}</small>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  lockScroll("modal");
  setTimeout(() => $("#modalClose").focus(), 60);
}

function closeTemplateModal() {
  const modal = $("#templateModal");
  if (!modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  unlockScroll("modal");
  if (lastFocusedBeforeModal) lastFocusedBeforeModal.focus({ preventScroll: true });
}

/* =========================================================
   PRICING
   ========================================================= */
function renderPricing() {
  $("#pricingGrid").innerHTML = PACKAGES.map((p, i) => `
    <article class="plan reveal ${p.popular ? "plan--featured" : ""}" style="--d:${i * .08}s" data-package="${p.id}">
      ${p.popular ? '<span class="plan__badge">MOST POPULAR</span>' : ""}
      <span class="plan__no">${p.no}</span>
      <h3>${p.name}</h3>
      <p class="plan__tagline">${p.tagline}</p>
      <div class="plan__price"><small>${p.prefix ? p.prefix : "Harga paket"}</small><strong>${formatRupiah(p.price)}</strong></div>
      <ul>${p.features.map(f => `<li>${ICONS.check}<span>${f}</span></li>`).join("")}</ul>
      <button type="button" class="btn ${p.popular ? "btn--light" : "btn--ghost"} btn--block" data-choose-package="${p.id}">Choose Package</button>
    </article>`).join("");
  $("#pricingGrid").addEventListener("click", e => {
    const btn = e.target.closest("[data-choose-package]");
    if (btn) selectPackageForOrder(btn.dataset.choosePackage);
  });
}

/* =========================================================
   ORDER FORM
   ========================================================= */
function populateOrderSelects() {
  const tplSelect = $("#orderTemplate");
  tplSelect.innerHTML = `<option value="">Pilih template</option>` +
    CATEGORIES.filter(c => c.id !== "all").map(cat => {
      const items = TEMPLATES.filter(t => t.category === cat.id);
      return `<optgroup label="${cat.label}">${items.map(t => `<option value="${t.id}">${t.name}</option>`).join("")}</optgroup>`;
    }).join("") +
    `<option value="consult">Belum yakin — bantu rekomendasikan</option>`;

  $("#orderPackage").innerHTML = `<option value="">Pilih paket</option>` +
    PACKAGES.map(p => `<option value="${p.id}">${p.name} — ${p.prefix ? p.prefix + " " : ""}${formatRupiah(p.price)}</option>`).join("");

  $("#colorChips").innerHTML = COLOR_SUGGESTIONS.map(([name, hex]) =>
    `<button type="button" class="color-chip" data-color="${name}" style="--c:${hex}"><i></i>${name}</button>`).join("");

  // min date = today
  const today = new Date();
  const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $("#orderDate").min = iso;
}

function updateOrderSummary() {
  const t = getTemplate($("#orderTemplate").value);
  const pkg = getPackage($("#orderPackage").value);
  const artWrap = $("#summaryArt");
  if (t) {
    artWrap.innerHTML = renderInvite(t);
    $("#summaryTemplate").textContent = t.name;
  } else {
    artWrap.innerHTML = `<div class="summary__placeholder">${ICONS.sparkle}</div>`;
    $("#summaryTemplate").textContent = $("#orderTemplate").value === "consult" ? "Rekomendasi dari kami" : "Belum memilih desain";
  }
  $("#summaryPackage").textContent = pkg ? pkg.name : "—";
  $("#summaryPrice").textContent = pkg ? `${pkg.prefix ? pkg.prefix + " " : ""}${formatRupiah(pkg.price)}` : "—";
  $$(".plan").forEach(p => p.classList.toggle("is-selected", Boolean(pkg && p.dataset.package === pkg.id)));
}

function scrollToOrder() {
  const card = $("#orderCard");
  $("#order").scrollIntoView({ behavior: "smooth", block: "start" });
  card.classList.remove("flash");
  void card.offsetWidth;
  card.classList.add("flash");
}

function selectTemplateForOrder(id) {
  const t = getTemplate(id);
  if (!t) return;
  $("#orderTemplate").value = id;
  $("#orderEvent").value = CATEGORY_TO_EVENT[t.category];
  if (!$("#orderPackage").value) $("#orderPackage").value = t.pkg;
  clearFieldError("orderTemplate"); clearFieldError("orderEvent"); clearFieldError("orderPackage");
  updateOrderSummary();
  closeTemplateModal();
  scrollToOrder();
  showToast(`Desain “${t.name}” dipilih`);
}

function selectPackageForOrder(id) {
  const pkg = getPackage(id);
  if (!pkg) return;
  $("#orderPackage").value = id;
  clearFieldError("orderPackage");
  updateOrderSummary();
  scrollToOrder();
  showToast(`Paket ${pkg.name} dipilih`);
}

function setFieldError(id, message) {
  const field = document.getElementById(id);
  const err = document.getElementById(id + "-error");
  if (field) { field.classList.add("is-invalid"); field.setAttribute("aria-invalid", "true"); }
  if (err) err.textContent = message;
}
function clearFieldError(id) {
  const field = document.getElementById(id);
  const err = document.getElementById(id + "-error");
  if (field) { field.classList.remove("is-invalid"); field.removeAttribute("aria-invalid"); }
  if (err) err.textContent = "";
}

function normalizePhone(raw) { return raw.replace(/[\s\-().]/g, ""); }

function validateOrderForm() {
  const errors = [];
  const name = $("#orderName").value.trim();
  const phone = normalizePhone($("#orderWa").value.trim());
  const event = $("#orderEvent").value;
  const date = $("#orderDate").value;
  const template = $("#orderTemplate").value;
  const pkg = $("#orderPackage").value;
  const honoree = $("#orderHonoree").value.trim();

  ["orderName", "orderWa", "orderEvent", "orderDate", "orderTemplate", "orderPackage", "orderHonoree"].forEach(clearFieldError);

  if (name.length < 3) errors.push(["orderName", "Mohon isi nama lengkap (minimal 3 karakter)."]);
  if (!/^(\+?62|0)8\d{7,12}$/.test(phone)) errors.push(["orderWa", "Masukkan nomor WhatsApp yang valid, contoh 081234567890."]);
  if (!event) errors.push(["orderEvent", "Pilih jenis acara."]);
  if (!date) {
    errors.push(["orderDate", "Pilih tanggal acara."]);
  } else {
    const chosen = new Date(date + "T23:59:59");
    if (chosen < new Date()) errors.push(["orderDate", "Tanggal acara tidak boleh di masa lalu."]);
  }
  if (!template) errors.push(["orderTemplate", "Pilih template atau minta rekomendasi."]);
  if (!pkg) errors.push(["orderPackage", "Pilih paket."]);
  if (honoree.length < 2) errors.push(["orderHonoree", "Isi nama yang diundang atau nama pasangan."]);

  errors.forEach(([id, msg]) => setFieldError(id, msg));
  return errors;
}

function formatEventDate(value) {
  const d = new Date(value + "T00:00:00");
  return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function buildOrderMessage() {
  const t = getTemplate($("#orderTemplate").value);
  const pkg = getPackage($("#orderPackage").value);
  const color = $("#orderColor").value.trim() || "-";
  const reference = $("#orderReference").value.trim() || "-";
  const notes = $("#orderNotes").value.trim() || "-";
  return [
    "Halo Atelier Nara!",
    "Saya ingin memesan undangan digital. Berikut detailnya:",
    "",
    "*DATA PEMESAN*",
    `Nama: ${$("#orderName").value.trim()}`,
    `WhatsApp: ${normalizePhone($("#orderWa").value.trim())}`,
    "",
    "*DETAIL UNDANGAN*",
    `Jenis acara: ${$("#orderEvent").value}`,
    `Template: ${t ? `${t.name} (${t.theme})` : "Belum memilih - mohon rekomendasi"}`,
    `Paket: ${pkg.name} - ${pkg.prefix ? pkg.prefix + " " : ""}${formatRupiah(pkg.price)}`,
    `Nama yang diundang / pasangan: ${$("#orderHonoree").value.trim()}`,
    `Tanggal acara: ${formatEventDate($("#orderDate").value)}`,
    `Warna tema: ${color}`,
    `Referensi desain: ${reference}`,
    `Catatan tambahan: ${notes}`,
    "",
    "Mohon info langkah selanjutnya. Terima kasih!"
  ].join("\n");
}

function handleOrderSubmit() {
  const alertBox = $("#orderAlert");
  alertBox.className = "form-alert";
  const errors = validateOrderForm();
  if (errors.length) {
    alertBox.textContent = `Ada ${errors.length} isian yang perlu dilengkapi. Silakan periksa kembali form di atas.`;
    alertBox.classList.add("is-shown");
    document.getElementById(errors[0][0]).focus();
    return;
  }
  openWhatsApp(buildOrderMessage());
  alertBox.textContent = "Pesan pemesanan sudah disiapkan. WhatsApp sedang dibuka — tinggal tekan kirim di WhatsApp.";
  alertBox.classList.add("is-shown", "form-alert--ok");
  showToast("Membuka WhatsApp…");
}

function initOrderForm() {
  populateOrderSelects();
  updateOrderSummary();
  $("#orderSubmit").addEventListener("click", handleOrderSubmit);
  $("#orderForm").addEventListener("submit", e => { e.preventDefault(); handleOrderSubmit(); });
  $("#orderTemplate").addEventListener("change", e => {
    const t = getTemplate(e.target.value);
    if (t && !$("#orderEvent").value) $("#orderEvent").value = CATEGORY_TO_EVENT[t.category];
    updateOrderSummary();
  });
  $("#orderPackage").addEventListener("change", updateOrderSummary);
  $("#colorChips").addEventListener("click", e => {
    const chip = e.target.closest("[data-color]");
    if (!chip) return;
    const input = $("#orderColor");
    const current = input.value.split(",").map(s => s.trim()).filter(Boolean);
    if (!current.includes(chip.dataset.color)) current.push(chip.dataset.color);
    input.value = current.join(", ");
  });
  ["orderName", "orderWa", "orderEvent", "orderDate", "orderTemplate", "orderPackage", "orderHonoree"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => clearFieldError(id));
    document.getElementById(id).addEventListener("change", () => clearFieldError(id));
  });
}

/* =========================================================
   WHATSAPP LINKS & MODAL BUTTONS
   ========================================================= */
/* WhatsApp links */
function initWhatsAppLinks() {
  $$("[data-wa]").forEach(el => {
    const msg = WA_MESSAGES[el.dataset.wa] || WA_MESSAGES.general;
    el.setAttribute("href", buildWhatsAppUrl(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  $("#footerWa").textContent = "+" + WA_NUMBER.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, "$1 $2-$3-$4");
  $$("[data-hours]").forEach(el => (el.textContent = BUSINESS.hours));
  $("#instagramLink").href = BUSINESS.instagramUrl;
  $("#instagramHandle").textContent = BUSINESS.instagramHandle;
  $("#modalAsk").addEventListener("click", () => {
    const t = getTemplate(modalTemplateId);
    openWhatsApp(`Halo Atelier Nara! Saya tertarik dengan desain "${t ? t.name : ""}". Boleh minta info lebih lanjut?`);
  });
  $("#modalChoose").addEventListener("click", () => selectTemplateForOrder(modalTemplateId));
  $("#modalClose").addEventListener("click", closeTemplateModal);
  $("#templateModal").addEventListener("click", e => { if (e.target.id === "templateModal") closeTemplateModal(); });
}

/* =========================================================
   SCROLL REVEAL
   ========================================================= */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
    });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  items.forEach(i => {
    // elements already on screen (e.g. hero) are revealed immediately
    if (i.getBoundingClientRect().top < window.innerHeight) i.classList.add("is-visible");
    else io.observe(i);
  });
}

/* =========================================================
   HERO MOCKUP
   ========================================================= */
function renderHeroArt() {
  $("#heroPaper1").innerHTML = renderInvite(getTemplate("ever-after"));
  $("#heroPaper2").innerHTML = renderInvite(getTemplate("olive-garden"));
  $("#heroPhone").insertAdjacentHTML("afterbegin", renderInvite(getTemplate("rose-amour"), { kicker: "The Wedding of", names: ["Aditya", "Naura"], date: "20 · 12 · 2026", place: "Semarang" }));
}

/* =========================================================
   COUNTDOWN
   ========================================================= */
function getCountdown(targetISO) {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };
}
const pad = n => String(n).padStart(2, "0");

function updateCountdowns() {
  // aman dipanggil walaupun sebagian elemen countdown belum ada di halaman
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  const cd = getCountdown(DEMO_EVENT.date);
  if (!cd) {
    ["cdDays", "cdHours", "cdMinutes", "cdSeconds"].forEach(id => setText(id, "00"));
    setText("cdMessage", "Hari bahagia telah tiba. Terima kasih atas doa dan restu Anda.");
    setText("heroCountdown", "Today is the day");
    return;
  }
  setText("cdDays", pad(cd.days));
  setText("cdHours", pad(cd.hours));
  setText("cdMinutes", pad(cd.minutes));
  setText("cdSeconds", pad(cd.seconds));
  setText("cdMessage", `${cd.days} hari lagi menuju hari bahagia kami.`);
  setText("heroCountdown", `${cd.days}d : ${pad(cd.hours)}h : ${pad(cd.minutes)}m`);
}

/* =========================================================
   ENVELOPE + INVITATION DEMO
   ========================================================= */
let envelopeTimer = null;
let lastFocusedBeforeInvite = null;

function openEnvelope() {
  const env = $("#envelope");
  if (env.classList.contains("is-open")) { openInvitation(); return; }
  env.classList.add("is-open");
  $("#stageHint").textContent = "With love, from Aditya & Naura…";
  $("#openEnvelopeBtn").firstChild.textContent = "View Invitation ";
  $("#resetEnvelopeBtn").hidden = false;
  clearTimeout(envelopeTimer);
  envelopeTimer = setTimeout(openInvitation, 1800);
}

function resetEnvelope() {
  clearTimeout(envelopeTimer);
  $("#envelope").classList.remove("is-open");
  $("#stageHint").textContent = "A little envelope, waiting to be opened.";
  $("#openEnvelopeBtn").firstChild.textContent = "Open Invitation ";
  $("#resetEnvelopeBtn").hidden = true;
}

function openInvitation() {
  clearTimeout(envelopeTimer);
  const overlay = $("#invitation");
  if (overlay.classList.contains("is-open")) return;
  lastFocusedBeforeInvite = document.activeElement;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  lockScroll("invite");
  setTimeout(() => $("#ivOpen").focus({ preventScroll: true }), 120);
}

function closeInvitation() {
  const overlay = $("#invitation");
  if (!overlay.classList.contains("is-open")) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  unlockScroll("invite");
  Music.pause();
  setTimeout(() => { // reset to cover for next visit
    $("#ivCover").classList.remove("is-gone");
    $("#ivNav").classList.remove("is-visible");
    $("#ivScroll").scrollTop = 0;
  }, 500);
  if (lastFocusedBeforeInvite) lastFocusedBeforeInvite.focus({ preventScroll: true });
}

function openInvitationCover() {
  $("#ivCover").classList.add("is-gone");
  $("#ivNav").classList.add("is-visible");
  $("#ivScroll").scrollTop = 0;
  showToast("Selamat datang! Tekan ikon musik untuk memutar lagu.");
}

function renderGallery() {
  $("#ivGallery").innerHTML = GALLERY.map((g, i) => `
    <button type="button" data-index="${i}" aria-label="Buka foto: ${escapeHTML(g.caption)}">
      <img src="${g.src}" alt="${escapeHTML(g.caption)}" loading="lazy">
      <span class="img-fallback">${escapeHTML(g.caption)}</span>
    </button>`).join("");
  $$("#ivGallery img").forEach(img => {
    const fail = () => img.parentElement.classList.add("img-failed");
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0 && img.src) fail();
  });
  $("#ivGallery").addEventListener("click", e => {
    const btn = e.target.closest("[data-index]");
    if (btn) openLightbox(Number(btn.dataset.index));
  });
}

function initInvitation() {
  $("#openEnvelopeBtn").addEventListener("click", openEnvelope);
  $("#resetEnvelopeBtn").addEventListener("click", resetEnvelope);
  $("#envLetter").addEventListener("click", () => {
    if ($("#envelope").classList.contains("is-open")) openInvitation(); else openEnvelope();
  });
  $("#ivOpen").addEventListener("click", openInvitationCover);
  $("#ivClose").addEventListener("click", closeInvitation);
  $("#ivCloseAside").addEventListener("click", closeInvitation);
  $("#invitation").addEventListener("click", e => { if (e.target.id === "invitation") closeInvitation(); });
  $("#ivChoosePackage").addEventListener("click", () => { closeInvitation(); selectPackageForOrder("signature"); });

  // in-invitation navigation
  const scroller = $("#ivScroll");
  const navButtons = $$("#ivNav [data-target]");
  navButtons.forEach(btn => btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    scroller.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }));
  const ivTop = $("#ivToTop");
  scroller.addEventListener("scroll", () => {
    ivTop.classList.toggle("is-visible", scroller.scrollTop > 500);
    const pos = scroller.scrollTop + scroller.clientHeight * .35;
    let current = navButtons[0].dataset.target;
    navButtons.forEach(b => { if (document.getElementById(b.dataset.target).offsetTop <= pos) current = b.dataset.target; });
    navButtons.forEach(b => b.classList.toggle("is-active", b.dataset.target === current));
  }, { passive: true });
  ivTop.addEventListener("click", () => scroller.scrollTo({ top: 0, behavior: "smooth" }));

  // links
  $("#ivMaps").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(DEMO_EVENT.mapsQuery);
  const toGCal = iso => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  $("#ivCalendar").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("The Wedding of " + DEMO_EVENT.couple + " (Demo)") +
    "&dates=" + toGCal(DEMO_EVENT.date) + "/" + toGCal(DEMO_EVENT.dateEnd) +
    "&details=" + encodeURIComponent("Contoh undangan demo oleh Atelier Nara.") +
    "&location=" + encodeURIComponent(DEMO_EVENT.location);

  // copy dummy account
  $$("[data-copy]").forEach(btn => btn.addEventListener("click", () => {
    const text = document.getElementById(btn.dataset.copy).textContent.replace(/\s/g, "");
    copyToClipboard(text).then(ok => showToast(ok ? `Nomor contoh ${text} disalin` : "Gagal menyalin, silakan salin manual"));
  }));

  // music
  $("#ivMusic").addEventListener("click", () => {
    const playing = Music.toggle();
    updateMusicButton(playing);
  });
  updateMusicButton(false);

  renderGallery();
  initRSVP();
}

function updateMusicButton(playing) {
  const btn = $("#ivMusic");
  btn.classList.toggle("is-playing", playing);
  btn.setAttribute("aria-pressed", String(playing));
  btn.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
  $("#ivMusicIcon").innerHTML = playing ? ICONS.pause : ICONS.music;
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}
function legacyCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  ta.remove();
  return ok;
}

/* =========================================================
   MUSIC — generated with Web Audio API (no copyrighted audio)
   ========================================================= */
const Music = (() => {
  let ctx = null, master = null, delay = null, timer = null, playing = false, step = 0, nextTime = 0;
  const NOTE = { G4: 392, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5 };
  const melody = ["C5", "E5", "G5", "E5", "D5", "G5", "A5", "G5", "C5", "E5", "G5", "C6", "A5", "G5", "E5", "D5"];
  const bass = [130.81, 110, 174.61, 196];
  const STEP = 0.46;

  function setup() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    delay = ctx.createDelay();
    delay.delayTime.value = 0.34;
    const feedback = ctx.createGain(); feedback.gain.value = 0.32;
    const wet = ctx.createGain(); wet.gain.value = 0.35;
    delay.connect(feedback); feedback.connect(delay); delay.connect(wet); wet.connect(master);
    master.connect(ctx.destination);
    return true;
  }
  function tone(freq, time, dur, vol, type) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(vol, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(g); g.connect(master); g.connect(delay);
    osc.start(time); osc.stop(time + dur + 0.05);
  }
  function schedule() {
    while (nextTime < ctx.currentTime + 0.4) {
      const n = NOTE[melody[step % melody.length]];
      tone(n, nextTime, 1.6, 0.16, "sine");
      tone(n * 2, nextTime, 0.6, 0.03, "triangle");
      if (step % 4 === 0) tone(bass[(step / 4) % bass.length], nextTime, STEP * 4, 0.07, "sine");
      nextTime += STEP;
      step++;
    }
  }
  function play() {
    if (!ctx && !setup()) { showToast("Browser tidak mendukung audio demo."); return false; }
    ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.4);
    nextTime = ctx.currentTime + 0.05;
    clearInterval(timer);
    timer = setInterval(schedule, 100);
    playing = true;
    return true;
  }
  function pause() {
    if (!ctx || !playing) return;
    clearInterval(timer);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.12);
    playing = false;
    setTimeout(() => { if (!playing) ctx.suspend(); }, 600);
    updateMusicButton(false);
  }
  function toggle() {
    if (playing) { pause(); return false; }
    return play();
  }
  return { toggle, pause, isPlaying: () => playing };
})();

/* =========================================================
   RSVP (stored only in localStorage — demo)
   ========================================================= */
function readRSVP() {
  try { return JSON.parse(localStorage.getItem(RSVP_STORAGE_KEY)) || []; } catch (e) { return []; }
}
function writeRSVP(list) {
  try { localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
}

function renderWishes() {
  const list = readRSVP();
  $("#wishCount").textContent = list.length;
  $("#rsvpClear").hidden = !list.length;
  $("#wishList").innerHTML = list.length
    ? list.slice().reverse().map(r => `<li><strong>${escapeHTML(r.name)}</strong><em>${escapeHTML(r.attend)}${r.guests ? " · " + r.guests + " tamu" : ""}</em><p>${escapeHTML(r.message)}</p></li>`).join("")
    : `<li class="iv-wishes__empty" style="background:none;border:0;padding:0">Belum ada ucapan. Jadilah yang pertama!</li>`;
}

function initRSVP() {
  const guests = $("#rsvpGuests");
  $$('input[name="rsvpAttend"]').forEach(r => r.addEventListener("change", () => {
    clearFieldError("rsvpAttend");
    const notAttending = r.value === "Tidak Hadir" && r.checked;
    guests.disabled = notAttending;
    if (notAttending) { guests.value = ""; clearFieldError("rsvpGuests"); }
  }));
  ["rsvpName", "rsvpGuests", "rsvpMessage"].forEach(id => document.getElementById(id).addEventListener("input", () => clearFieldError(id)));

  $("#rsvpSubmit").addEventListener("click", () => {
    const name = $("#rsvpName").value.trim();
    const attendEl = $('input[name="rsvpAttend"]:checked');
    const attend = attendEl ? attendEl.value : "";
    const guestCount = guests.value;
    const message = $("#rsvpMessage").value.trim();
    let valid = true;
    ["rsvpName", "rsvpAttend", "rsvpGuests", "rsvpMessage"].forEach(clearFieldError);
    $("#rsvpSuccess").classList.remove("is-shown");

    if (name.length < 2) { setFieldError("rsvpName", "Mohon isi nama Anda."); valid = false; }
    if (!attend) { setFieldError("rsvpAttend", "Pilih konfirmasi kehadiran."); valid = false; }
    if (attend && attend !== "Tidak Hadir" && !guestCount) { setFieldError("rsvpGuests", "Pilih jumlah tamu."); valid = false; }
    if (message.length < 5) { setFieldError("rsvpMessage", "Tuliskan ucapan minimal 5 karakter."); valid = false; }
    if (!valid) return;

    const list = readRSVP();
    list.push({ name, attend, guests: attend === "Tidak Hadir" ? 0 : Number(guestCount), message, time: new Date().toISOString() });
    const saved = writeRSVP(list);
    const box = $("#rsvpSuccess");
    box.innerHTML = saved
      ? `<strong>Terima kasih, ${escapeHTML(name)}!</strong> RSVP demo Anda berhasil disimpan <strong>di perangkat ini saja</strong> (localStorage browser). Karena ini halaman demo, data tidak dikirim ke pemilik undangan maupun ke server mana pun.`
      : `Penyimpanan browser tidak tersedia, sehingga RSVP demo tidak dapat disimpan di perangkat ini.`;
    box.classList.add("is-shown");
    if (saved) {
      $("#rsvpName").value = ""; $("#rsvpMessage").value = ""; guests.value = ""; guests.disabled = false;
      $$('input[name="rsvpAttend"]').forEach(r => (r.checked = false));
      renderWishes();
    }
  });

  $("#rsvpClear").addEventListener("click", () => {
    try { localStorage.removeItem(RSVP_STORAGE_KEY); } catch (e) { /* ignore */ }
    renderWishes();
    $("#rsvpSuccess").classList.remove("is-shown");
    showToast("Data RSVP demo di perangkat ini telah dihapus");
  });
  renderWishes();
}

/* =========================================================
   LIGHTBOX
   ========================================================= */
let lightboxIndex = 0;
function showLightboxImage(index) {
  lightboxIndex = (index + GALLERY.length) % GALLERY.length;
  const item = GALLERY[lightboxIndex];
  const lb = $("#lightbox");
  const img = $("#lbImg");
  lb.classList.remove("img-failed");
  img.onerror = () => lb.classList.add("img-failed");
  img.src = item.src;
  img.alt = item.caption;
  $("#lbCaption").textContent = `${item.caption} — ${lightboxIndex + 1} / ${GALLERY.length}`;
}
function openLightbox(index) {
  showLightboxImage(index);
  const lb = $("#lightbox");
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  setTimeout(() => $("#lbClose").focus({ preventScroll: true }), 50);
}
function closeLightbox() {
  const lb = $("#lightbox");
  if (!lb.classList.contains("is-open")) return;
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  const btn = $(`#ivGallery [data-index="${lightboxIndex}"]`);
  if (btn) btn.focus({ preventScroll: true });
}
function initLightbox() {
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
  $("#lbNext").addEventListener("click", () => showLightboxImage(lightboxIndex + 1));
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox" || e.target.tagName === "FIGURE") closeLightbox(); });
}

/* =========================================================
   FAQ ACCORDION
   ========================================================= */
function renderFAQ() {
  const acc = $("#accordion");
  acc.innerHTML = FAQS.map(([q, a], i) => `
    <div class="acc-item reveal" style="--d:${i * .04}s">
      <h3 style="margin:0"><button type="button" class="acc-trigger" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}"><span>${q}</span><i class="acc-icon" aria-hidden="true"></i></button></h3>
      <div class="acc-panel" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div><p>${a}</p></div></div>
    </div>`).join("");
  acc.addEventListener("click", e => {
    const trigger = e.target.closest(".acc-trigger");
    if (!trigger) return;
    const item = trigger.closest(".acc-item");
    const willOpen = !item.classList.contains("is-open");
    $$(".acc-item", acc).forEach(other => {
      other.classList.remove("is-open");
      $(".acc-trigger", other).setAttribute("aria-expanded", "false");
    });
    if (willOpen) { item.classList.add("is-open"); trigger.setAttribute("aria-expanded", "true"); }
  });
}

/* =========================================================
   FEEDBACK SLIDER
   ========================================================= */
function initSlider() {
  const slides = $$("#slider .slide");
  const dots = $("#slideDots");
  let index = 0, timer = null;
  dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Tampilkan feedback ${i + 1}" data-slide="${i}"></button>`).join("");
  const go = i => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
    $$("button", dots).forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 7000); };
  $("#slidePrev").addEventListener("click", () => { go(index - 1); restart(); });
  $("#slideNext").addEventListener("click", () => { go(index + 1); restart(); });
  dots.addEventListener("click", e => { const b = e.target.closest("[data-slide]"); if (b) { go(Number(b.dataset.slide)); restart(); } });
  go(0); restart();
}

/* =========================================================
   GLOBAL KEYBOARD (Esc / arrows)
   ========================================================= */
function initKeyboard() {
  document.addEventListener("keydown", e => {
    const lbOpen = $("#lightbox").classList.contains("is-open");
    if (e.key === "Escape") {
      if (lbOpen) return closeLightbox();
      if ($("#invitation").classList.contains("is-open")) return closeInvitation();
      if ($("#templateModal").classList.contains("is-open")) return closeTemplateModal();
      if ($("#mobileMenu").classList.contains("is-open")) $("#navToggle").click();
    }
    if (lbOpen && e.key === "ArrowLeft") showLightboxImage(lightboxIndex - 1);
    if (lbOpen && e.key === "ArrowRight") showLightboxImage(lightboxIndex + 1);
  });
}

/* =========================================================
   INIT  (navbar & footer diinisialisasi di js/components.js)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderTemplateCards();
  renderPricing();
  renderFAQ();
  renderHeroArt();
  renderIcons();
  renderStains();
  initWhatsAppLinks();
  initOrderForm();
  initInvitation();
  initLightbox();
  initSlider();
  initKeyboard();
  initReveal();
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
});
