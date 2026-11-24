/* =========================================================
   PIRING KOS · custom.js
   Form Menu Custom: data form dirangkai jadi pesan WhatsApp.
   Bisa dibuka dengan ?diet=<id> supaya gaya diet terisi otomatis.
   ========================================================= */
function kirimCustom() {
  const form = $("#customForm");
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const alat = $$("#cAlat input:checked").map((i) => i.value).join(", ") || "-";
  const pesan =
`Halo ${SITE.nama}! Saya mau pesan *Menu Custom* (${rupiah(PAKET.custom.harga)}/minggu).

Nama: ${$("#cNama").value.trim()}
Gaya diet: ${$("#cDiet").value}
Budget per minggu: ${$("#cBudget").value}
Makan per hari: ${$("#cMakan").value}
Alat masak: ${alat}
Alergi/pantangan: ${$("#cPantang").value.trim() || "-"}
Catatan: ${$("#cCatatan").value.trim() || "-"}`;

  const jendela = window.open(waLink(pesan), "_blank", "noopener");
  if (!jendela) location.href = waLink(pesan);
}

document.addEventListener("DOMContentLoaded", () => {
  const dariUrl = getParam("diet");
  $("#cDiet").innerHTML = DIETS.map((d) =>
    `<option value="${d.nama}" ${d.id === dariUrl ? "selected" : ""}>${d.nama}</option>`).join("");
  $("#customBtn").addEventListener("click", kirimCustom);
  $("#customForm").addEventListener("submit", (e) => { e.preventDefault(); kirimCustom(); });
});
