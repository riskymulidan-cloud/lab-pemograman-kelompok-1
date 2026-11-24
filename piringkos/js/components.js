/* =========================================================
   PIRING KOS · components.js
   Komponen yang dipakai semua halaman: navbar, footer,
   tombol WhatsApp melayang, dan fungsi bantu.
   Setiap halaman cukup punya:
     <header id="site-header"></header>
     <footer id="site-footer"></footer>
   ========================================================= */

/* ---------- Pengaturan situs ---------- */
const SITE = {
  nama: "Piring Kos",
  tagline: "Menu diet sehat ala anak kos.",
  waNumber: "6282124344401",          // format 62..., tanpa 0 di depan
  jamBalas: "09.00–21.00 WIB"
};

const NAV_LINKS = [
  { href: "index.html",      label: "Beranda" },
  { href: "resep.html",      label: "Resep Gratis" },
  { href: "kalkulator.html", label: "Kalkulator" },
  { href: "paket.html",      label: "Paket Menu" },
  { href: "custom.html",     label: "Menu Custom" }
];

/* ---------- Fungsi bantu ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");
const waLink = (text) => `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(text)}`;
const getParam = (key) => new URLSearchParams(location.search).get(key);

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

/* ---------- Navbar ---------- */
function renderNavbar() {
  const el = $("#site-header");
  if (!el) return;
  const page = currentPage();
  el.className = "navbar";
  el.innerHTML = `
    <div class="wrap nav-inner">
      <a href="index.html" class="logo"><span class="logo-plate" aria-hidden="true"></span>${SITE.nama}</a>
      <button class="burger" id="burger" type="button" aria-label="Buka menu" aria-expanded="false">${icon("menu")}</button>
      <nav class="nav-links" id="navLinks">
        ${NAV_LINKS.map((l) => `<a href="${l.href}" class="${l.href === page ? "active" : ""}">${l.label}</a>`).join("")}
        <a href="paket.html" class="btn btn-primary nav-cta">Pilih Paket</a>
      </nav>
    </div>`;

  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    burger.innerHTML = icon(open ? "close" : "menu");
  });
}

/* ---------- Footer ---------- */
function renderFooter() {
  const el = $("#site-footer");
  if (!el) return;
  el.className = "footer";
  el.innerHTML = `
    <div class="wrap footer-inner">
      <div>
        <div class="logo light"><span class="logo-plate" aria-hidden="true"></span>${SITE.nama}</div>
        <p>${SITE.tagline}</p>
        <p>Konsultasi WhatsApp: ${SITE.jamBalas}</p>
      </div>
      <div>
        <h4>Menu</h4>
        <ul>${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Tentang</h4>
        <p>Proyek Tugas Lab Pemrograman · Kelompok 1</p>
        <p>Pembayaran di website ini masih berupa simulasi.</p>
      </div>
    </div>`;
}

/* ---------- Tombol WhatsApp melayang ---------- */
function renderWaFloat() {
  const a = document.createElement("a");
  a.className = "wa-float";
  a.href = waLink(`Halo ${SITE.nama}! Saya mau konsultasi soal menu diet.`);
  a.target = "_blank";
  a.rel = "noopener";
  a.innerHTML = `${icon("whatsapp")} Konsultasi`;
  document.body.appendChild(a);
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
  renderWaFloat();
  renderIcons();
});
