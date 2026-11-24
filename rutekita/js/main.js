/* =========================================================
   RUTEKITA – js/main.js
   Logika khusus halaman beranda (index.html):
   form pemesanan, kalkulator budget, tab contoh itinerary,
   validasi, dan pengiriman ke WhatsApp.

   Komponen bersama (navbar, footer, WA umum, reveal) ada di
   js/components.js — variabel SITE dan helper $, $$ diambil
   dari sana.
   ========================================================= */

const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

/* ---------- Elemen form ---------- */
const form = $("#orderForm");
const fNama = $("#nama"), fWa = $("#wa"), fTujuan = $("#tujuan");
const fBerangkat = $("#berangkat"), fPulang = $("#pulang");
const fOrang = $("#orang"), fBudget = $("#budgetNum"), fRange = $("#budgetRange");
const fAkomodasi = $("#akomodasi"), fTransport = $("#transport"), fPaket = $("#paket");
const errBox = $("#formError");

/* ---------- Tanggal ---------- */
const toISO = (d) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
const todayISO = toISO(new Date());
fBerangkat.min = todayISO;
fPulang.min = todayISO;

fBerangkat.addEventListener("change", () => {
  if (fBerangkat.value) {
    fPulang.min = fBerangkat.value;
    if (fPulang.value && fPulang.value < fBerangkat.value) fPulang.value = fBerangkat.value;
  }
  updateCalc();
});
fPulang.addEventListener("change", updateCalc);

function getDuration() {
  if (!fBerangkat.value || !fPulang.value) return null;
  const a = new Date(fBerangkat.value), b = new Date(fPulang.value);
  const nights = Math.round((b - a) / 86400000);
  if (nights < 0) return null;
  return { days: nights + 1, nights };
}

const fmtDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

/* ---------- Jumlah orang ---------- */
const clampPeople = () => {
  let v = parseInt(fOrang.value, 10);
  if (isNaN(v) || v < 1) v = 1;
  if (v > 50) v = 50;
  fOrang.value = v;
};
$("#minus").addEventListener("click", () => { fOrang.value = (parseInt(fOrang.value, 10) || 1) - 1; clampPeople(); updateCalc(); });
$("#plus").addEventListener("click", () => { fOrang.value = (parseInt(fOrang.value, 10) || 1) + 1; clampPeople(); updateCalc(); });
fOrang.addEventListener("input", updateCalc);
fOrang.addEventListener("blur", () => { clampPeople(); updateCalc(); });

/* ---------- Budget: slider <-> angka ---------- */
fRange.addEventListener("input", () => { fBudget.value = fRange.value; updateCalc(); });
fBudget.addEventListener("input", () => {
  const v = Number(fBudget.value);
  if (v >= Number(fRange.min) && v <= Number(fRange.max)) fRange.value = v;
  updateCalc();
});

/* ---------- Kalkulator budget ---------- */
const SPLITS = {
  hemat:   [["Transportasi", 30], ["Penginapan", 20], ["Makan & minum", 25], ["Tiket & aktivitas", 15], ["Dana cadangan", 10]],
  standar: [["Transportasi", 28], ["Penginapan", 30], ["Makan & minum", 20], ["Tiket & aktivitas", 12], ["Dana cadangan", 10]],
  nyaman:  [["Transportasi", 25], ["Penginapan", 40], ["Makan & minum", 17], ["Tiket & aktivitas", 10], ["Dana cadangan", 8]]
};

function levelFor(perPersonPerDay) {
  if (perPersonPerDay < 250000) return { text: "Budget sangat ketat. Itinerary tetap bisa dibuat dengan pilihan paling hemat.", warn: true };
  if (perPersonPerDay < 500000) return { text: "Level Backpacker: hemat, transportasi umum, wisata murah.", warn: false };
  if (perPersonPerDay < 1000000) return { text: "Level Standar: nyaman dengan biaya wajar.", warn: false };
  return { text: "Level Nyaman: fleksibel, bisa pilih hotel dan aktivitas premium.", warn: false };
}

function updateCalc() {
  const dur = getDuration();
  const people = Math.max(1, parseInt(fOrang.value, 10) || 1);
  const total = Number(fBudget.value) || 0;

  $("#c-total").textContent = total > 0 ? rupiah(total) : "–";
  $("#c-perorang").textContent = total > 0 ? rupiah(total / people) : "–";
  $("#c-durasi").textContent = dur ? `${dur.days} hari ${dur.nights} malam` : "–";

  const perDay = dur && total > 0 ? total / people / dur.days : null;
  $("#c-perhari").textContent = perDay ? rupiah(perDay) : "–";

  const levelEl = $("#c-level");
  if (perDay) {
    const lv = levelFor(perDay);
    levelEl.textContent = lv.text;
    levelEl.classList.toggle("warn", lv.warn);
  } else {
    levelEl.textContent = "Isi tanggal untuk melihat level budget";
    levelEl.classList.remove("warn");
  }

  const split = SPLITS[fAkomodasi.value] || SPLITS.standar;
  $("#breakdown").innerHTML = split.map(([label, pct]) => `
    <li>
      <div class="bd-row"><span>${label} (${pct}%)</span><span>${total > 0 ? rupiah(total * pct / 100) : "–"}</span></div>
      <div class="bd-bar"><i style="width:${pct * 2}%"></i></div>
    </li>`).join("");

  $("#f-durasi-hidden").value = dur ? `${dur.days} hari ${dur.nights} malam` : "";
  $("#f-bpoh-hidden").value = perDay ? Math.round(perDay) : "";
}
fAkomodasi.addEventListener("change", updateCalc);
updateCalc();

/* ---------- Klik destinasi -> isi form ---------- */
$$(".dest-card").forEach((btn) => btn.addEventListener("click", () => {
  fTujuan.value = btn.dataset.dest || "";
  $("#pesan").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => fTujuan.focus({ preventScroll: true }), 500);
}));

/* ---------- Klik pilih paket -> isi form ---------- */
$$("[data-pick]").forEach((a) => a.addEventListener("click", () => { fPaket.value = a.dataset.pick; }));

/* ---------- Tab contoh itinerary ---------- */
$$(".tab").forEach((tab) => tab.addEventListener("click", () => {
  $$(".tab").forEach((t) => t.classList.remove("active"));
  $$(".tab-panel").forEach((p) => p.classList.remove("active"));
  tab.classList.add("active");
  $("#" + tab.dataset.tab).classList.add("active");
}));

/* ---------- Validasi ---------- */
function showError(msg, field) {
  errBox.textContent = msg;
  errBox.hidden = false;
  if (field) { field.classList.add("invalid"); field.focus(); }
}

function validate() {
  $$(".invalid", form).forEach((el) => el.classList.remove("invalid"));
  errBox.hidden = true;

  if (!fNama.value.trim()) return showError("Nama lengkap wajib diisi.", fNama), false;
  const waDigits = fWa.value.replace(/\D/g, "");
  if (waDigits.length < 9 || waDigits.length > 15) return showError("Nomor WhatsApp tidak valid. Contoh: 08123456789.", fWa), false;
  if (!fTujuan.value.trim()) return showError("Tujuan wisata wajib diisi.", fTujuan), false;
  if (!fBerangkat.value) return showError("Pilih tanggal berangkat.", fBerangkat), false;
  if (!fPulang.value) return showError("Pilih tanggal pulang.", fPulang), false;
  if (fBerangkat.value < todayISO) return showError("Tanggal berangkat tidak boleh sebelum hari ini.", fBerangkat), false;
  if (fPulang.value < fBerangkat.value) return showError("Tanggal pulang tidak boleh sebelum tanggal berangkat.", fPulang), false;
  if (!(Number(fBudget.value) >= 100000)) return showError("Budget minimal Rp 100.000.", fBudget), false;
  return true;
}

/* ---------- Pesan WhatsApp ---------- */
function buildWaMessage() {
  const dur = getDuration();
  const people = Math.max(1, parseInt(fOrang.value, 10) || 1);
  const total = Number(fBudget.value);
  const gaya = $$('input[name="gaya"]:checked').map((c) => c.value).join(", ") || "-";
  const akomText = fAkomodasi.options[fAkomodasi.selectedIndex].text;
  const catatan = $("#catatan").value.trim() || "-";

  const lines = [
    `Halo ${SITE.brand}, saya ingin memesan itinerary.`,
    "",
    `*Nama:* ${fNama.value.trim()}`,
    `*WhatsApp:* ${fWa.value.trim()}`,
    "",
    `*Tujuan:* ${fTujuan.value.trim()}`,
    `*Tanggal:* ${fmtDate(fBerangkat.value)} s/d ${fmtDate(fPulang.value)}`,
    `*Durasi:* ${dur.days} hari ${dur.nights} malam`,
    `*Jumlah orang:* ${people}`,
    `*Budget total:* ${rupiah(total)}`,
    `*Budget per orang/hari:* ${rupiah(total / people / dur.days)}`,
    "",
    `*Gaya liburan:* ${gaya}`,
    `*Penginapan:* ${akomText}`,
    `*Transportasi:* ${fTransport.value}`,
    `*Paket:* ${fPaket.value}`,
    `*Catatan:* ${catatan}`
  ];
  return lines.join("\n");
}

/* ---------- Kirim: Netlify Forms + WhatsApp ---------- */
const submitBtn = $("#submitBtn");
const modal = $("#modal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const waUrl = `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(buildWaMessage())}`;
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Menyimpan pesanan…";

  // 1) Simpan ke Netlify Forms (hanya berhasil setelah di-deploy di Netlify)
  try {
    const data = new URLSearchParams(new FormData(form)).toString();
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data
    });
  } catch (err) {
    console.warn("Netlify Forms tidak terjangkau (normal jika dibuka lokal):", err);
  }

  // 2) Arahkan ke WhatsApp
  $("#waContinue").href = waUrl;
  modal.hidden = false;
  submitBtn.disabled = false;
  submitBtn.textContent = originalText;
  setTimeout(() => { if (!modal.hidden) window.location.href = waUrl; }, 1800);
});

$("#closeModal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.hidden = true; });

/* Hapus tanda error saat pengguna mengetik ulang */
$$("input, select, textarea", form).forEach((el) => el.addEventListener("input", () => el.classList.remove("invalid")));
