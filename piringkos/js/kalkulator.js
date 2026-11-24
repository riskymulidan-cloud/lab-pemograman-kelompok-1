/* =========================================================
   PIRING KOS · kalkulator.js
   Kalkulator BMI dan kebutuhan kalori.
   - BMI memakai kategori Kemenkes RI
   - Kebutuhan energi memakai rumus Mifflin-St Jeor
   ========================================================= */
function bmiKategori(bmi) {
  if (bmi < 17)    return ["Kurus (berat)", "#5b8fd1"];
  if (bmi < 18.5)  return ["Kurus (ringan)", "#c99a1e"];
  if (bmi <= 25)   return ["Normal", "#2f7d4f"];
  if (bmi <= 27)   return ["Gemuk (ringan)", "#d9822b"];
  return ["Gemuk (berat)", "#c8473a"];
}

const bulat = (n, k = 50) => Math.round(n / k) * k;

function hitungKalkulator() {
  const form = $("#calcForm");
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const jk = $('input[name="jk"]:checked').value;
  const usia = +$("#kUsia").value, berat = +$("#kBerat").value, tinggi = +$("#kTinggi").value;
  const aktif = +$("#kAktif").value, tujuan = $("#kTujuan").value;

  const tM = tinggi / 100;
  const bmi = berat / (tM * tM);
  const [kategori, warna] = bmiKategori(bmi);
  const bmr = 10 * berat + 6.25 * tinggi - 5 * usia + (jk === "l" ? 5 : -161);
  const tdee = bmr * aktif;
  const batasMin = Math.max(bmr, jk === "l" ? 1500 : 1200);   // pengaman: target tidak terlalu rendah
  const kurus = bmi < 18.5;

  let target = tdee, catatan = "", diet = "seimbang";
  if (tujuan === "turun") {
    if (kurus) {
      catatan = `<div class="warn"><b>BMI kamu sudah di bawah normal.</b> Menurunkan berat badan tidak disarankan, jadi target di bawah adalah kalori untuk menjaga berat badan. Kalau ada kekhawatiran soal berat badan atau pola makan, ngobrol dengan dokter atau ahli gizi ya.</div>`;
    } else {
      target = Math.max(tdee - 400, batasMin);
      diet = bmi > 25 ? "defisit" : "seimbang";
    }
  } else if (tujuan === "naik") {
    target = tdee + 300;
    diet = "protein";
  } else {
    diet = aktif >= 1.55 ? "protein" : "seimbang";
  }
  if (kurus && tujuan !== "naik") diet = "seimbang";

  const aktifAtauNaik = aktif >= 1.55 || tujuan === "naik";
  const protMin = berat * (aktifAtauNaik ? 1.2 : 0.8);
  const protMax = berat * (aktifAtauNaik ? 1.6 : 1.2);
  const air = berat * 0.033;
  const bbMin = 18.5 * tM * tM, bbMax = 25 * tM * tM;
  const posisi = Math.min(Math.max((bmi - 14) / (35 - 14) * 100, 2), 98);
  const d = dietById(diet);
  const labelTarget = {
    turun: "Target kalori untuk turun berat badan",
    jaga: "Kalori untuk menjaga berat badan",
    naik: "Target kalori untuk naik berat badan"
  }[kurus && tujuan === "turun" ? "jaga" : tujuan];

  $("#calcOut").innerHTML = `
    <div class="res">
      <small>BMI (Indeks Massa Tubuh)</small>
      <div class="big">${bmi.toFixed(1).replace(".", ",")} <span style="color:${warna};font-weight:800">· ${kategori}</span></div>
      <div class="bmi-bar"><div class="bmi-dot" style="left:${posisi}%"></div></div>
      <div class="bmi-scale"><span>Kurus</span><span>Normal 18,5–25</span><span>Gemuk</span></div>
      <p class="muted" style="margin-top:8px">Berat badan ideal untuk tinggimu: <b>${bbMin.toFixed(0)}–${bbMax.toFixed(0)} kg</b></p>
    </div>
    ${catatan}
    <div class="res-cards">
      <div class="res"><small>${labelTarget}</small><div class="big">${bulat(target).toLocaleString("id-ID")} <span>kkal/hari</span></div></div>
      <div class="res"><small>Kalori yang dipakai tubuh (TDEE)</small><div class="big">${bulat(tdee).toLocaleString("id-ID")} <span>kkal/hari</span></div></div>
      <div class="res"><small>Kebutuhan protein</small><div class="big">${Math.round(protMin)}–${Math.round(protMax)} <span>gram/hari</span></div></div>
      <div class="res"><small>Air minum</small><div class="big">± ${air.toFixed(1).replace(".", ",")} <span>liter/hari</span></div></div>
    </div>
    <div class="rec">
      <div class="rec-diet">
        <span class="icon-box">${icon(d.ikon)}</span>
        <div><small>Gaya diet yang cocok buatmu</small><b>${d.nama}</b></div>
      </div>
      <a class="btn" href="resep.html?diet=${d.id}">Lihat Resepnya ${icon("arrow")}</a>
    </div>`;

  if (window.innerWidth < 900) $("#calcOut").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  $("#calcBtn").addEventListener("click", hitungKalkulator);
  $("#calcForm").addEventListener("submit", (e) => { e.preventDefault(); hitungKalkulator(); });
});
