/* =========================================================
   RUTEKITA – js/components.js
   Komponen bersama yang dipakai SEMUA halaman: navbar,
   footer, tombol WhatsApp melayang, tahun copyright, dan
   animasi reveal saat scroll.

   Cara pakai di halaman baru (mis. itinerary.html, tips.html):
     <div id="site-header"></div>
     ... konten halaman ...
     <div id="site-footer"></div>
     <script src="js/components.js"></script>
   ========================================================= */

const SITE = {
  // [NOMOR WHATSAPP] Nomor di bawah masih contoh dari desain asli.
  // GANTI dengan nomor WhatsApp asli pemilik, format internasional
  // tanpa tanda + dan tanpa awalan 0. Contoh: 0812-3456-7890 -> "6281234567890"
  waNumber: "6281234567890",
  brand: "Jasa Bikin Itinerary"
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Ikon SVG (pengganti emoji, sesuai aturan konten) ---------- */
const ICON_COMPASS = `<svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" fill="currentColor" stroke="none"/></svg>`;

const ICON_WA = `<svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100-.7-.4-1.500-.7-2.400-1.800-.4-.5-.7-1-.9-1.400-.1-.2 0-.3.100-.5l.4-.4.200-.4c.1-.1 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.100-.6.300-.2.200-.9.900-.9 2.100s.9 2.500 1 2.700c.1.200 1.800 2.800 4.400 3.800 1.600.7 2.300.7 2.700.6.400-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.1-1.200-.1-.1-.2-.2-.5-.3z"/></svg>`;

/* ---------- Menu navbar ----------
   itinerary.html dan tips.html adalah halaman pasangan (Risky),
   tautannya disiapkan sekarang supaya navigasi tidak berubah nanti. */
const NAV_LINKS = [
  { label: "Beranda", href: "index.html" },
  { label: "Destinasi", href: "index.html#destinasi" },
  { label: "Itinerary", href: "itinerary.html" },
  { label: "Tips", href: "tips.html" },
  { label: "FAQ", href: "index.html#faq" },
  { label: "Pesan Sekarang", href: "index.html#pesan", cta: true }
];

const FOOTER_MENU = [
  { label: "Destinasi", href: "index.html#destinasi" },
  { label: "Itinerary", href: "itinerary.html" },
  { label: "Tips", href: "tips.html" },
  { label: "Paket", href: "index.html#paket" },
  { label: "Pesan", href: "index.html#pesan" },
  { label: "FAQ", href: "index.html#faq" }
];

function isActive(href) {
  const path = location.pathname.split("/").pop() || "index.html";
  const [linkPath, linkHash] = href.split("#");
  if (linkPath !== path) return false;
  return linkHash ? location.hash === "#" + linkHash : !location.hash;
}

/* ---------- Navbar ---------- */
function renderNavbar() {
  const links = NAV_LINKS.map((l) => {
    const cls = l.cta ? ' class="btn btn-orange btn-sm"' : isActive(l.href) ? ' class="active"' : "";
    return `<a href="${l.href}"${cls}>${l.label}</a>`;
  }).join("\n        ");
  $("#site-header").innerHTML = `
  <header class="navbar" id="navbar">
    <div class="container nav-inner">
      <a href="index.html" class="logo">${ICON_COMPASS} Jasa Bikin <strong>Itinerary</strong></a>
      <button class="burger" id="burger" aria-label="Buka menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="nav-links" id="navLinks">
        ${links}
      </nav>
    </div>
  </header>`;
}

/* ---------- Footer ---------- */
function renderFooter() {
  const menu = FOOTER_MENU.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("\n          ");
  $("#site-footer").innerHTML = `
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <div class="logo light">${ICON_COMPASS} Jasa Bikin <strong>Itinerary</strong></div>
        <p>Itinerary perjalanan sesuai budget, tujuan, dan gaya liburanmu.</p>
      </div>
      <div>
        <h4>Kontak</h4>
        <ul>
          <li><a data-wa href="#" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="mailto:email@contoh.com">email@contoh.com</a></li>
        </ul>
      </div>
      <div>
        <h4>Menu</h4>
        <ul>
          ${menu}
        </ul>
      </div>
    </div>
    <div class="copy">&copy; <span id="year"></span> Jasa Bikin Itinerary. Dibuat untuk tugas Bisnis Digital.</div>
  </footer>`;
}

/* ---------- Render komponen + perilaku situs ---------- */
renderNavbar();
renderFooter();

/* Tombol WhatsApp melayang */
const waFloat = document.createElement("a");
waFloat.className = "wa-float";
waFloat.setAttribute("data-wa", "");
waFloat.href = "#";
waFloat.target = "_blank";
waFloat.rel = "noopener";
waFloat.setAttribute("aria-label", "Chat WhatsApp");
waFloat.innerHTML = ICON_WA;
document.body.appendChild(waFloat);

/* Isi semua tautan WhatsApp (footer & tombol melayang) */
const generalMsg = encodeURIComponent("Halo, saya ingin bertanya tentang jasa pembuatan itinerary.");
$$("[data-wa]").forEach((a) => {
  a.href = `https://wa.me/${SITE.waNumber}?text=${generalMsg}`;
});

/* Tahun copyright */
$("#year").textContent = new Date().getFullYear();

/* Bayangan navbar saat halaman digulir */
const navbar = $("#navbar");
const burger = $("#burger");
const navLinks = $("#navLinks");
window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 10), { passive: true });

/* Menu mobile (burger) */
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
$$("a", navLinks).forEach((a) => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}));

/* Animasi elemen muncul saat scroll (semua halaman) */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("in"));
}
