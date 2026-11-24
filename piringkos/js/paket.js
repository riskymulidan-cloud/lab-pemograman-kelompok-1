/* =========================================================
   PIRING KOS · paket.js
   Halaman paket: preview menu (hari 1 terbuka, sisanya blur)
   dan simulasi pembayaran yang membuka menu lengkap.
   Bisa dibuka dengan ?diet=<id> untuk memilih gaya diet.
   ========================================================= */
const rowHTML = (hari, m) => `<tr><td>Hari ${hari}</td><td>${m[0]}</td><td>${m[1]}</td><td>${m[2]}</td></tr>`;

/* ---------- Preview menu ---------- */
function renderPreview() {
  const d = dietById($("#previewDiet").value);
  $("#previewOpen").innerHTML = rowHTML(1, d.menu[0]);
  $("#previewLocked").innerHTML = d.menu.slice(1).map((m, i) => rowHTML(i + 2, m)).join("");
  const tinggiAtas = $("#previewZone thead").offsetHeight + $("#previewOpen").offsetHeight;
  $("#lockOver").style.setProperty("--lock-top", tinggiAtas + "px");
}

function initPreview() {
  const pilih = $("#previewDiet");
  pilih.innerHTML = DIETS.map((d) => `<option value="${d.id}">${d.nama}</option>`).join("");
  const dariUrl = getParam("diet");
  if (dariUrl && DIETS.some((d) => d.id === dariUrl)) pilih.value = dariUrl;
  pilih.addEventListener("change", renderPreview);
  window.addEventListener("resize", renderPreview);
  renderPreview();
}

document.addEventListener("DOMContentLoaded", initPreview);
