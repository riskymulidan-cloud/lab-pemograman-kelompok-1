/* Atelier Nara — komponen bersama: navbar, menu mobile, footer, dan tombol melayang.
   Dipakai semua halaman di folder undangan/ (index.html, rsvp.html, buku-tamu.html).

   Cara pakai di halaman baru:
     <div id="site-header"></div>   (di awal <body>)
     <div id="site-footer"></div>   (setelah </main>)
     <script src="js/data.js"></script>
     <script src="js/components.js"></script>
   Lalu tautkan css/variables.css dan css/style.css di <head>. */

/* =========================================================
   ICONS (inline SVG)
   ========================================================= */
const ICON_ATTR = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
const ICONS = {
  arrowRight: `<svg ${ICON_ATTR}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  arrowUp: `<svg ${ICON_ATTR}><path d="M12 19V5M6 11l6-6 6 6"/></svg>`,
  x: `<svg ${ICON_ATTR}><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  check: `<svg ${ICON_ATTR}><path d="M20 6 9 17l-5-5"/></svg>`,
  chevLeft: `<svg ${ICON_ATTR}><path d="m15 18-6-6 6-6"/></svg>`,
  chevRight: `<svg ${ICON_ATTR}><path d="m9 18 6-6-6-6"/></svg>`,
  clock: `<svg ${ICON_ATTR}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  image: `<svg ${ICON_ATTR}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>`,
  heart: `<svg ${ICON_ATTR}><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z"/></svg>`,
  mail: `<svg ${ICON_ATTR}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  gift: `<svg ${ICON_ATTR}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>`,
  music: `<svg ${ICON_ATTR}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  pause: `<svg ${ICON_ATTR}><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`,
  copy: `<svg ${ICON_ATTR}><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>`,
  pin: `<svg ${ICON_ATTR}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  calendar: `<svg ${ICON_ATTR}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  home: `<svg ${ICON_ATTR}><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/></svg>`,
  users: `<svg ${ICON_ATTR}><circle cx="9" cy="8" r="4"/><path d="M2 21v-1a7 7 0 0 1 14 0v1M16 3.1a4 4 0 0 1 0 7.8M22 21v-1a7 7 0 0 0-4-6.3"/></svg>`,
  send: `<svg ${ICON_ATTR}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  pen: `<svg ${ICON_ATTR}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  eye: `<svg ${ICON_ATTR}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  info: `<svg ${ICON_ATTR}><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.6 4.8 2.6 7.4 8 10-5.4 2.6-7.4 5.2-8 10-.6-4.8-2.6-7.4-8-10 5.4-2.6 7.4-5.2 8-10Z"/></svg>`,
  ring: `<svg ${ICON_ATTR}><circle cx="12" cy="15" r="6"/><path d="m9 5 3 4 3-4-1.5-2h-3Z"/></svg>`,
  glass: `<svg ${ICON_ATTR}><path d="M8 22h8M12 15v7M7 2h10l-.5 7a4.5 4.5 0 0 1-9 0Z"/></svg>`,
  instagram: `<svg ${ICON_ATTR}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z"/></svg>`
};

/* =========================================================
   SHARED HELPERS
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* scroll lock shared by overlays */
const scrollLocks = new Set();
function lockScroll(key) { scrollLocks.add(key); document.body.classList.add("is-locked"); }
function unlockScroll(key) { scrollLocks.delete(key); if (!scrollLocks.size) document.body.classList.remove("is-locked"); }

/* =========================================================
   NAVIGATION DATA
   ========================================================= */
const CURRENT_PAGE = location.pathname.split("/").pop() || "index.html";
const IS_HOME = CURRENT_PAGE === "index.html" || !CURRENT_PAGE.includes(".");

// Di beranda link cukup "#section"; di halaman lain diarahkan ke "index.html#section".
function pageLink(hash) { return IS_HOME ? hash : "index.html" + hash; }

const NAV_ITEMS = [
  { label: "Home", hash: "#home", key: "home" },
  { label: "Our Collection", hash: "#collection", key: "collection" },
  { label: "Live Preview", hash: "#live-preview", key: "live-preview" },
  { label: "Pricing", hash: "#pricing", key: "pricing" },
  { label: "How It Works", hash: "#how-it-works", key: "how-it-works" },
  { label: "FAQ", hash: "#faq", key: "faq" },
  { label: "RSVP", page: "rsvp.html" },
  { label: "Buku Tamu", page: "buku-tamu.html" }
];

function navHref(item) { return item.page ? item.page : pageLink(item.hash); }
function isCurrentPage(item) { return Boolean(item.page) && item.page === CURRENT_PAGE; }

/* =========================================================
   RENDER: NAVBAR, MOBILE MENU, FOOTER, FLOATING BUTTONS
   ========================================================= */
function renderSiteHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const desktopLinks = NAV_ITEMS.map(item => {
    const attrs = item.key ? ` data-nav="${item.key}"` : "";
    const active = isCurrentPage(item) ? ' class="is-active" aria-current="page"' : "";
    return `<li><a href="${navHref(item)}"${attrs}${active}>${item.label}</a></li>`;
  }).join("\n        ");
  const mobileLinks = NAV_ITEMS.map(item => `<li><a href="${navHref(item)}">${item.label}</a></li>`).join("\n      ");

  mount.outerHTML = `<header class="nav" id="nav">
  <div class="nav__inner container">
    <a href="${pageLink("#home")}" class="logo" aria-label="Atelier Nara — kembali ke atas">
      <span class="logo__name">ATELIER NARA</span>
      <span class="logo__sub">DIGITAL INVITATION STUDIO</span>
    </a>
    <nav class="nav__links-wrap" aria-label="Navigasi utama">
      <ul class="nav__links">
        ${desktopLinks}
      </ul>
    </nav>
    <div class="nav__actions">
      <a href="${pageLink("#order")}" class="btn btn--solid btn--sm nav__cta">Create Your Invitation</a>
      <button type="button" class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="mobileMenu" aria-label="Buka menu"><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <nav aria-label="Navigasi mobile">
    <ol>
      ${mobileLinks}
    </ol>
  </nav>
  <div class="mobile-menu__foot">
    <a href="${pageLink("#order")}" class="btn btn--solid btn--block">Create Your Invitation</a>
    <a href="#" class="btn btn--ghost btn--block" data-wa="general">Chat on WhatsApp</a>
    <p>Open daily · <span data-hours></span></p>
  </div>
</div>`;
}

function renderSiteFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const footerLinks = NAV_ITEMS.map(item => `<li><a href="${navHref(item)}">${item.label}</a></li>`).join("\n          ");

  mount.outerHTML = `<footer class="footer" id="footer">
  <div class="stain" data-stain="terra,rose" data-seed="131" style="width:520px;right:-10%;top:-30%"></div>
  <div class="container">
    <div class="footer__grid">
      <div>
        <a href="${pageLink("#home")}" class="logo"><span class="logo__name">ATELIER NARA</span><span class="logo__sub">DIGITAL INVITATION STUDIO</span></a>
        <p class="footer__tagline">“Every Moment Deserves a Beautiful Beginning.”</p>
      </div>
      <div>
        <h4>Navigation</h4>
        <ul>
          ${footerLinks}
        </ul>
      </div>
      <div class="footer__contact">
        <h4>Contact</h4>
        <ul>
          <li><a href="#" data-wa="general">${ICONS.whatsapp}<span id="footerWa"></span></a></li>
          <li><a href="#" id="instagramLink" target="_blank" rel="noopener">${ICONS.instagram}<span id="instagramHandle"></span></a></li>
          <li><span>${ICONS.pin}Semarang, Jawa Tengah</span></li>
        </ul>
      </div>
      <div class="footer__contact">
        <h4>Business Hours</h4>
        <ul>
          <li><span>${ICONS.clock}Senin – Minggu</span></li>
          <li><span style="padding-left:26px" data-hours></span></li>
        </ul>
      </div>
    </div>
    <div class="footer__wordmark" aria-hidden="true">Atelier Nara</div>
    <div class="footer__bottom">
      <span>© 2026 Atelier Nara Digital Invitation Studio. All Rights Reserved.</span>
      <span>Student Business Project — Lab Pemrograman Kelompok 1.</span>
    </div>
  </div>
</footer>

<div class="floating">
  <button type="button" class="to-top" id="toTop" aria-label="Kembali ke atas">${ICONS.arrowUp}</button>
  <a href="#" class="wa-float" data-wa="float" aria-label="Chat dengan Atelier Nara di WhatsApp">
    <span class="wa-float__label">Chat with us</span>
    <span class="wa-float__icon">${ICONS.whatsapp}</span>
  </a>
</div>`;
}

/* WhatsApp links, jam operasional, dan kontak di navbar/footer */
function initSiteContacts() {
  $$("[data-wa]").forEach(el => {
    const msg = WA_MESSAGES[el.dataset.wa] || WA_MESSAGES.general;
    el.setAttribute("href", buildWhatsAppUrl(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  $$("[data-hours]").forEach(el => (el.textContent = BUSINESS.hours));
  const footerWa = document.getElementById("footerWa");
  if (footerWa) footerWa.textContent = "+" + WA_NUMBER.replace(/^(\d{2})(\d{3})(\d{4})(\d+)$/, "$1 $2-$3-$4");
  const ig = document.getElementById("instagramLink");
  if (ig) ig.href = BUSINESS.instagramUrl;
  const igHandle = document.getElementById("instagramHandle");
  if (igHandle) igHandle.textContent = BUSINESS.instagramHandle;
}

/* =========================================================
   NAVIGATION: sticky, mobile menu, active link, back to top
   ========================================================= */
function initNavigation() {
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const menu = $("#mobileMenu");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    toTop.classList.toggle("is-visible", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = open => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    nav.classList.toggle("menu-open", open);
    open ? lockScroll("menu") : unlockScroll("menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 1240 && menu.classList.contains("is-open")) setMenu(false); });

  // smooth scroll for all in-page anchors (with offset handled by scroll-padding-top)
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.dataset.wa !== undefined) return;
    const id = link.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#" + id);
  });

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // active link highlighting
  const map = { home: "home", about: "home", collection: "collection", "live-preview": "live-preview", pricing: "pricing", order: "pricing", "how-it-works": "how-it-works", "why-digital": "how-it-works", words: "faq", faq: "faq", contact: "faq" };
  const links = $$("[data-nav]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const key = map[entry.target.id];
        links.forEach(l => l.classList.toggle("is-active", l.dataset.nav === key));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section").forEach(s => io.observe(s));
  }
}

/* =========================================================
   INIT COMPONENTS
   ========================================================= */
renderSiteHeader();
renderSiteFooter();
initSiteContacts();
document.addEventListener("DOMContentLoaded", initNavigation);
