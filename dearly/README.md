# Dearly

Website souvenir custom.

- **Pemilik:** Winayu Adinda (winayuadinda48-ctrl)
- **Pasangan (reviewer):** Galih Chandra (galihabdann04-code)
- **Link live saat ini:** https://dearly-souvernir.netlify.app
- **Status:** Belum

## Deskripsi
DEARLY menjual hadiah kecil yang dipersonalisasi, mulai Rp10K: pembeli memilih budget dan satu produk, menceritakan tentang penerima, lalu pesanan tersusun otomatis menjadi pesan WhatsApp. Ada juga kalkulator group order untuk organisasi atau kepanitiaan. Kode aslinya satu file HTML, lalu dipecah menjadi HTML, CSS, dan JavaScript terpisah dengan tampilan yang sama persis.

## Halaman
`index.html` berisi beberapa bagian yang berpindah tanpa memuat ulang halaman: Home, Shop Gifts, How It Works, Gift Stories, Group Gifting, About, FAQ, dan form Create your gift.

| File | Isi | Pengembang |
|------|-----|------------|
| `index.html` | Semua bagian di atas | Winayu Adinda |
| `katalog.html` | Katalog produk dan cara pemesanan | Galih Chandra |

## Struktur
```
dearly/
├── index.html
├── css/variables.css   warna dan huruf
├── css/style.css       gaya semua halaman
├── js/components.js    top bar, navbar, dan footer bersama
├── js/data.js          pengaturan, tier, produk, add-on, cerita, FAQ
├── js/app.js           ilustrasi, perpindahan halaman, form order, kalkulator group order
└── assets/             tempat gambar (opsional, ilustrasi saat ini dibuat dengan SVG)
```

Halaman baru cukup memuat `css/variables.css`, `css/style.css`, lalu `js/components.js` dan `js/data.js`. Data produk di `js/data.js` bisa dipakai ulang, jadi tidak perlu ditulis dua kali.

## Yang perlu diisi
Di bagian atas `js/data.js`:
- `whatsapp`: nomor WhatsApp admin, contoh `"6281234567890"`. Selama kosong, tombol WhatsApp akan meminta pembeli memilih chat sendiri.
- `instagram`: username Instagram tanpa @. Selama kosong, footer menampilkan "Instagram segera hadir".

## Pengembang
- Winayu Adinda (winayuadinda48-ctrl), index.html, gaya, komponen, dan data
- Galih Chandra (galihabdann04-code), katalog.html
