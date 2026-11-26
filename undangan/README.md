# Undangan Digital

Website undangan digital.

- **Pemilik:** Shaula Putri (shaulaputri-tech)
- **Pasangan (reviewer):** Winayu Adinda (winayuadinda48-ctrl)
- **Link live saat ini:** https://claude.ai/artifact/B15qWEmPjK5oDpSVut95T9
- **Status:** Belum

## Deskripsi
**Atelier Nara — Digital Invitation Studio.** Landing page bisnis undangan digital untuk pernikahan, pertunangan, ulang tahun, dan acara spesial, dengan tagline *"Every Moment Deserves a Beautiful Beginning."* Pengunjung bisa melihat katalog 8 template, mencoba demo undangan pernikahan yang interaktif, memilih paket harga, lalu mengirim pesanan lewat WhatsApp.

## Struktur folder

```
undangan/
├── index.html          beranda (milik Shaula)
├── rsvp.html           konfirmasi kehadiran (dikerjakan Winayu)
├── buku-tamu.html      buku tamu (dikerjakan Winayu)
├── css/
│   ├── variables.css   warna, font, dan z-index
│   └── style.css       gaya semua section dan tampilan responsif
├── js/
│   ├── data.js         data bisnis: nomor WhatsApp, template, paket, galeri, FAQ
│   ├── components.js   navbar, menu mobile, footer, tombol WhatsApp melayang
│   └── main.js         interaksi beranda (katalog, demo undangan, form, FAQ)
└── README.md
```

Halaman baru cukup memasang `<div id="site-header"></div>` dan `<div id="site-footer"></div>`, menautkan `css/variables.css` dan `css/style.css`, lalu memuat `js/data.js` dan `js/components.js` agar navbar dan footer sama dengan beranda.

## Fitur
- Navbar sticky, smooth scroll, dan menu hamburger di HP.
- Katalog 8 template dengan filter kategori, modal preview, dan tombol pilih desain yang mengisi form otomatis.
- Demo undangan Aditya & Naura: animasi amplop, countdown, galeri dengan lightbox, love story, RSVP, amplop digital, peta lokasi, musik play/pause.
- 4 paket harga (Essential, Signature, Premium, Exclusive Custom).
- Form pemesanan dengan validasi yang membuka WhatsApp dengan pesan otomatis.
- FAQ accordion, tombol WhatsApp melayang, back to top, animasi muncul saat scroll.

## Catatan demo
- RSVP di demo undangan hanya disimpan di browser pengunjung (localStorage) dan tidak dikirim ke mana pun.
- Nomor rekening di bagian amplop digital adalah data contoh, bukan rekening sungguhan.
- Testimoni diberi label "Sample Client Feedback" dan bukan ulasan pelanggan asli.
- Nomor WhatsApp `6281234567890` dan akun Instagram masih placeholder. Ganti di `js/data.js` (`WA_NUMBER` dan `BUSINESS`).
- Foto galeri demo diambil dari Unsplash; jika gagal dimuat, tampil blok warna sebagai pengganti.

## Cara menjalankan
Buka `index.html` langsung di browser. Tidak perlu install atau build.

## Pengembang
- Shaula Putri (shaulaputri-tech)
