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

/* ---------- Simulasi pembayaran (MODE DEMO) ---------- */
const order = { paket: "minggu1", diet: "seimbang", hari: 1 };

function stepper(n) {
  return `<div class="stepper">${[1, 2, 3].map((i) => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div>`;
}

function checkoutStep(step) {
  const body = $("#checkoutBody");
  const pilihanPaket = ["hari1", "minggu1", "minggu4"];

  if (step === 1) {
    body.innerHTML = `
      <h3>Pilih paket &amp; gaya diet</h3>${stepper(1)}
      <label>Paket</label>
      <div class="opt-list">${pilihanPaket.map((k) => `
        <label class="opt"><span><input type="radio" name="pk" value="${k}" ${k === order.paket ? "checked" : ""}>${PAKET[k].nama}</span><b>${rupiah(PAKET[k].harga)}</b></label>`).join("")}
      </div>
      <label for="ckDiet">Gaya diet</label>
      <select id="ckDiet">${DIETS.map((d) => `<option value="${d.id}" ${d.id === order.diet ? "selected" : ""}>${d.nama}</option>`).join("")}</select>
      <div id="hariWrap" class="mt" style="display:${order.paket === "hari1" ? "block" : "none"}">
        <label for="ckHari">Pilih hari</label>
        <select id="ckHari">${[1, 2, 3, 4, 5, 6, 7].map((h) => `<option value="${h}" ${h === order.hari ? "selected" : ""}>Hari ${h}</option>`).join("")}</select>
      </div>
      <button class="btn btn-primary btn-block mt" type="button" id="toPay">Lanjut ke Pembayaran</button>`;

    $$('input[name="pk"]', body).forEach((r) => r.addEventListener("change", () => {
      $("#hariWrap").style.display = $('input[name="pk"]:checked', body).value === "hari1" ? "block" : "none";
    }));
    $("#toPay").addEventListener("click", () => {
      order.paket = $('input[name="pk"]:checked', body).value;
      order.diet = $("#ckDiet").value;
      order.hari = +$("#ckHari").value;
      checkoutStep(2);
    });
  }

  if (step === 2) {
    const p = PAKET[order.paket], d = dietById(order.diet);
    const pesanWa = `Halo ${SITE.nama}! Saya mau pesan ${p.nama} (${d.nama}${order.paket === "hari1" ? `, Hari ${order.hari}` : ""}) seharga ${rupiah(p.harga)}. Bagaimana cara bayarnya?`;
    body.innerHTML = `
      <h3>Pembayaran</h3>${stepper(2)}
      <span class="badge-demo">MODE DEMO · bukan pembayaran sungguhan</span>
      <div class="pay-summary">
        <div><span>Paket</span><b>${p.nama}</b></div>
        <div><span>Gaya diet</span><b>${d.nama}</b></div>
        ${order.paket === "hari1" ? `<div><span>Hari</span><b>Hari ${order.hari}</b></div>` : ""}
        <div><span>Total</span><b>${rupiah(p.harga)}</b></div>
      </div>
      <div class="qr-demo">${icon("qr")}<span>QR DEMO</span></div>
      <p class="muted center">Ini simulasi untuk menunjukkan alur pembelian. Untuk pesanan sungguhan, pesan lewat WhatsApp.</p>
      <button class="btn btn-primary btn-block mt" type="button" id="paid">Saya Sudah Bayar (Simulasi)</button>
      <a class="btn btn-wa btn-block mt-s" target="_blank" rel="noopener" href="${waLink(pesanWa)}">${icon("whatsapp")} Pesan Sungguhan via WhatsApp</a>`;

    $("#paid").addEventListener("click", () => {
      body.innerHTML = `<h3>Memeriksa pembayaran…</h3>${stepper(2)}<p class="muted">Tunggu sebentar.</p>`;
      setTimeout(() => checkoutStep(3), 1200);
    });
  }

  if (step === 3) {
    const d = dietById(order.diet);
    body.innerHTML = `
      <h3>Pembayaran berhasil</h3>${stepper(3)}
      <p>${order.paket === "hari1" ? `Menu ${d.nama} Hari ${order.hari} sudah terbuka.` : `Menu ${d.nama} 7 hari sudah terbuka, lengkap dengan daftar belanjanya.`}</p>
      <button class="btn btn-primary btn-block mt" type="button" id="seeMenu">Lihat Menu Saya</button>`;
    $("#seeMenu").addEventListener("click", () => { tutupModal(); bukaMenu(); });
  }
}

function bukaModal() { $("#checkoutModal").classList.add("open"); document.body.style.overflow = "hidden"; }
function tutupModal() { $("#checkoutModal").classList.remove("open"); document.body.style.overflow = ""; }

/* ---------- Menu yang sudah terbuka ---------- */
function bukaMenu() {
  const d = dietById(order.diet), p = PAKET[order.paket];
  const total = totalBelanja(d);
  const satuHari = order.paket === "hari1";
  const baris = satuHari ? rowHTML(order.hari, d.menu[order.hari - 1]) : d.menu.map((m, i) => rowHTML(i + 1, m)).join("");

  const belanja = satuHari
    ? `<ul><li class="total"><span>Rata-rata per hari</span><span>± ${rupiah(Math.round(total / 7 / 1000) * 1000)}</span></li></ul>
       <p class="muted mt-s">Dihitung dari rata-rata belanja seminggu. Daftar belanja lengkap ada di paket mingguan.</p>`
    : `<ul>${d.belanja.map((b) => `<li><span>${b[0]}</span><span>± ${rupiah(b[1])}</span></li>`).join("")}
         <li class="total"><span>Perkiraan total</span><span>± ${rupiah(total)}</span></li></ul>
       <p class="muted mt-s">Harga perkiraan, bisa beda tergantung tempat belanja.</p>`;

  $("#menukuCard").innerHTML = `
    <div class="unlocked-head">
      <div>
        <span class="badge-demo">Hasil simulasi pembelian</span>
        <h2>Menu ${d.nama} · ${satuHari ? `Hari ${order.hari}` : "7 Hari"}</h2>
        <p class="muted">${p.nama}${order.paket === "minggu4" ? " · menu minggu 2–4 dikirim tiap minggu via WhatsApp" : ""}</p>
      </div>
      <div class="no-print unlocked-actions">
        <button class="btn btn-ghost" type="button" onclick="window.print()">${icon("printer")} Cetak / Simpan PDF</button>
        ${satuHari
          ? `<button class="btn btn-primary" type="button" data-buy="minggu1">Lanjut Seminggu · Rp12rb</button>`
          : `<a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Halo ${SITE.nama}! Saya mau konsultasi soal menu ${d.nama}.`)}">${icon("whatsapp")} Konsultasi</a>`}
      </div>
    </div>
    <div class="table-scroll">
      <table class="menu-table">
        <thead><tr><th>Hari</th><th>Sarapan</th><th>Makan Siang</th><th>Makan Malam</th></tr></thead>
        <tbody>${baris}</tbody>
      </table>
    </div>
    <div class="belanja">
      <div>
        <h3 class="with-icon">${icon("cart")} ${satuHari ? "Perkiraan biaya sehari" : "Daftar belanja seminggu"}</h3>
        ${belanja}
      </div>
      <div class="tips">
        <h3 class="with-icon">${icon("bulb")} Tips meal prep anak kos</h3>
        <ul>${TIPS.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>
    </div>`;

  $("#menuku").classList.add("show");
  $("#menuku").scrollIntoView({ behavior: "smooth" });
}

function initCheckout() {
  document.addEventListener("click", (e) => {
    const beli = e.target.closest("[data-buy]");
    if (beli) {
      tutupModal();
      order.paket = beli.dataset.buy;
      order.diet = $("#previewDiet").value;
      checkoutStep(1);
      bukaModal();
      return;
    }
    if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) tutupModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutupModal(); });
}

document.addEventListener("DOMContentLoaded", () => {
  initPreview();
  initCheckout();
});
