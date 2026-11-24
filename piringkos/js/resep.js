/* =========================================================
   PIRING KOS · resep.js
   Halaman resep gratis: tab 5 gaya diet, kartu resep,
   dan detail resep (bahan + langkah) di modal.
   Membaca ?diet=<id> dari URL untuk membuka gaya diet tertentu.
   ========================================================= */
let dietAktif = null;

function renderTabs() {
  $("#dietTabs").innerHTML = DIETS.map((d) => `
    <button class="diet-tab${d.id === dietAktif.id ? " active" : ""}" type="button" role="tab"
            aria-selected="${d.id === dietAktif.id}" data-diet="${d.id}">
      <span class="tab-icon">${icon(d.ikon)}</span>
      <b>${d.nama}</b>
      <small>${d.singkat}</small>
    </button>`).join("");
}

function renderInfo() {
  const d = dietAktif;
  $("#dietInfo").innerHTML = `
    <p><b>${d.nama}.</b> ${d.info}</p>
    <a class="btn btn-primary" href="paket.html">Lihat Menu Seminggu ${icon("arrow")}</a>`;
}

function renderResep() {
  $("#recipeGrid").innerHTML = dietAktif.resep.map((r, i) => `
    <article class="recipe" tabindex="0" role="button" data-i="${i}" aria-label="Lihat resep ${r.nama}">
      <div class="recipe-top">${icon(dietAktif.ikon)}</div>
      <div class="recipe-body">
        <div class="badges">
          ${r.kekinian ? '<span class="badge">KEKINIAN</span>' : '<span class="badge badge-green">RUMAHAN</span>'}
        </div>
        <h3>${r.nama}</h3>
        <div class="tags">
          <span class="tag">${icon("flame")} ${r.kkal} kkal</span>
          <span class="tag">${icon("clock")} ${r.waktu}</span>
          <span class="tag price">± ${rupiah(r.harga)}</span>
        </div>
        <span class="more">Lihat resep ${icon("arrow")}</span>
      </div>
    </article>`).join("");
}

function pilihDiet(id, ubahUrl = true) {
  dietAktif = dietById(id);
  renderTabs();
  renderInfo();
  renderResep();
  if (ubahUrl) history.replaceState(null, "", `?diet=${dietAktif.id}`);
}

function bukaResep(i) {
  const r = dietAktif.resep[i];
  $("#recipeBody").innerHTML = `
    <h3>${r.nama}</h3>
    <div class="tags">
      <span class="tag">${icon("flame")} ${r.kkal} kkal</span>
      <span class="tag">${icon("clock")} ${r.waktu}</span>
      <span class="tag">${icon("pan")} ${r.alat}</span>
      <span class="tag price">± ${rupiah(r.harga)} / porsi</span>
    </div>
    <h4>Bahan</h4>
    <ul class="resep-list">${r.bahan.map((b) => `<li>${b}</li>`).join("")}</ul>
    <h4>Cara membuat</h4>
    <ol class="resep-list">${r.langkah.map((l) => `<li>${l}</li>`).join("")}</ol>
    <a class="btn btn-wa btn-block" target="_blank" rel="noopener"
       href="${waLink(`Halo ${SITE.nama}! Saya mau tanya soal resep "${r.nama}" (${dietAktif.nama}).`)}">
      ${icon("whatsapp")} Tanya resep ini lewat WhatsApp
    </a>`;
  $("#recipeModal").classList.add("open");
  document.body.style.overflow = "hidden";
  $("#recipeModal .modal-close").focus();
}

function tutupResep() {
  $("#recipeModal").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  pilihDiet(getParam("diet"), false);

  $("#dietTabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".diet-tab");
    if (tab) pilihDiet(tab.dataset.diet);
  });

  const grid = $("#recipeGrid");
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe");
    if (card) bukaResep(+card.dataset.i);
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".recipe");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); bukaResep(+card.dataset.i); }
  });

  $("#recipeModal").addEventListener("click", (e) => {
    if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) tutupResep();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutupResep(); });
});
