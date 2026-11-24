# Rutekita

Website jasa bikin itinerary perjalanan: pengguna menentukan budget, tujuan, durasi, jumlah orang, dan tanggal, lalu itinerary lengkap per hari (jadwal, estimasi biaya, tips lokal) disusun dan dikirim dalam bentuk PDF.

- **Pemilik:** Rafi Favian (rafivahen-debug)
- **Pasangan (reviewer):** Risky Mulidan (riskymulidan-cloud)
- **Link live:** https://rutekitaa.netlify.app
- **Status:** Dikerjakan — beranda dan kerangka selesai di branch `feature/rafi-rutekita` (PR ke `develop`)

## Deskripsi

Rutekita adalah jasa penyusunan itinerary liburan sesuai budget. Beranda memuat: hero dengan ringkasan layanan, pilihan destinasi populer (klik langsung mengisi form), alur cara kerja 4 langkah, form pemesanan dengan kalkulator estimasi budget otomatis, tiga paket harga (contoh: Rp 49.000 / Rp 99.000 / Rp 199.000, bisa disesuaikan), contoh hasil itinerary 3 hari di Yogyakarta, testimoni (masih contoh), FAQ, serta tombol konfirmasi ke WhatsApp.

## Pengembang

- Rafi Favian (rafivahen-debug) — index.html (beranda: hero, destinasi, fitur, form, kalkulator), css/variables.css, css/style.css, js/components.js, js/main.js, README.md folder
- Risky Mulidan (riskymulidan-cloud) — itinerary.html dan tips.html (kerangka gaya `.page-hero` sudah disiapkan)

## Struktur

```
rutekita/
├── index.html          # beranda: pilih destinasi, fitur, form, kalkulator
├── itinerary.html      # halaman Risky (belum dibuat)
├── tips.html           # halaman Risky (belum dibuat)
├── css/
│   ├── variables.css   # token desain: warna, radius, bayangan, font
│   └── style.css       # gaya semua halaman (komponen + beranda + responsif)
├── js/
│   ├── components.js   # navbar & footer bersama semua halaman + WA melayang
│   └── main.js         # logika beranda: form, kalkulator, tab, validasi
├── assets/
│   └── favicon.svg
└── README.md
```

Halaman baru (mis. `itinerary.html`) cukup memanggil `<div id="site-header"></div>`, `<div id="site-footer"></div>`, dan `js/components.js` — navbar, footer, tombol WhatsApp, dan animasi reveal otomatis ikut.

## Catatan isi yang masih perlu dilengkapi

- `[NOMOR WHATSAPP]`: nomor WhatsApp asli di `js/components.js` (`SITE.waNumber`) masih contoh `6281234567890` dari desain asli.
- Kontak footer (Instagram, `email@contoh.com`) masih contoh dari desain asli.
- Testimoni masih contoh (sudah diberi keterangan di halaman).
- Harga paket adalah contoh dari desain asli dan bisa disesuaikan.
