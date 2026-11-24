/* =========================================================
   PIRING KOS · beranda.js
   Menampilkan kartu 5 gaya diet di beranda.
   Tiap kartu mengarah ke resep.html?diet=<id>.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const grid = $("#dietGrid");
  if (!grid) return;
  grid.innerHTML = DIETS.map((d) => `
    <a class="diet-card" href="resep.html?diet=${d.id}">
      <span class="icon-box">${icon(d.ikon)}</span>
      <h3>${d.nama}</h3>
      <small>${d.singkat}</small>
      <p>${d.info}</p>
      <span class="more">${d.resep.length} resep gratis ${icon("arrow")}</span>
    </a>`).join("");
});
