# Piring Kos

Website resep dan menu diet sehat untuk anak kos: resep gratis, kalkulator BMI dan kalori, paket menu siap pakai, dan menu custom yang dipesan lewat WhatsApp.

- **Pemilik:** Qonita Iffatul I (qonitaiffah)
- **Pasangan (reviewer):** Shaula Putri (shaulaputri-tech)
- **Link live:** https://piringkos.netlify.app
- **Status:** Dikerjakan

## Deskripsi

Piring Kos membantu mahasiswa dan anak kos makan sehat dengan budget tipis dan alat masak terbatas (rice cooker, teflon). Ada 5 gaya diet: Gizi Seimbang, Defisit Kalori, Rendah Karbo, Tinggi Protein, dan Vegetarian.

| Halaman | Isi | Pengembang |
|---------|-----|------------|
| `index.html` | Beranda: 5 gaya diet, ringkasan fitur, cara pesan, FAQ | Qonita |
| `kalkulator.html` | Kalkulator BMI (kategori Kemenkes RI), kebutuhan kalori (Mifflin-St Jeor), protein, air minum, dan saran gaya diet | Qonita |
| `paket.html` | 4 paket harga, preview menu, simulasi pembayaran (mode demo), menu terbuka dan daftar belanja | Qonita |
| `custom.html` | Form Menu Custom yang dikirim ke WhatsApp | Qonita |
| `resep.html` | 25 resep gratis per gaya diet | Shaula |

Paket: Menu Siap 1 Hari Rp5.000, 1 Minggu Rp12.000, 4 Minggu Rp40.000, dan Menu Custom Rp12.000/minggu. Pembayaran di website masih berupa simulasi; pesanan sungguhan lewat WhatsApp. Harga bahan dan kalori resep adalah perkiraan.

## Struktur folder

```
piringkos/
├── index.html, resep.html, kalkulator.html, paket.html, custom.html
├── css/
│   ├── variables.css   warna, huruf, jarak (ubah tema di sini)
│   ├── style.css       gaya semua halaman + responsif
│   └── resep.css       gaya khusus halaman resep
├── js/
│   ├── icons.js        ikon SVG (pengganti emoji)
│   ├── components.js   navbar, footer, tombol WhatsApp, pengaturan situs
│   ├── data.js         gaya diet, resep, menu 7 hari, daftar belanja, paket
│   ├── beranda.js, resep.js, kalkulator.js, paket.js, custom.js
└── assets/
    └── favicon.svg
```

## Catatan untuk halaman resep (Shaula)

- Pakai kerangka halaman yang sama: `<header id="site-header">`, `<footer id="site-footer">`, lalu muat `js/icons.js`, `js/components.js`, dan `js/data.js`.
- Data 25 resep sudah ada di `js/data.js` (`DIETS[i].resep`): nama, kalori, harga, waktu, alat, bahan, dan langkah.
- Beranda dan kalkulator menautkan ke `resep.html?diet=<id>` (`seimbang`, `defisit`, `lowcarb`, `protein`, `vegetarian`). Baca parameter itu dengan `getParam("diet")` untuk membuka gaya diet yang dipilih.
- Ikon gaya diet: `icon(d.ikon)`.

## Menjalankan

Tidak perlu instalasi. Buka `index.html` di browser, atau deploy folder `piringkos/` ke Netlify.

## Pengembang

- Qonita Iffatul I (qonitaiffah): kerangka, beranda, kalkulator, paket, menu custom
- Shaula Putri (shaulaputri-tech): halaman resep
