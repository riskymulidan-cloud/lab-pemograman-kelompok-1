# Sihir Cahaya Photography

Website jasa foto wisuda di Semarang.

- **Pemilik:** Galih Chandra (galihabdann04-code)
- **Pasangan (reviewer):** Winayu Adinda (winayuadinda48-ctrl)
- **Link live saat ini:** https://sites.google.com/view/sihircahaya-photography-smg
- **Status:** Belum

## Deskripsi
Sihir Cahaya Photography adalah jasa foto wisuda di Semarang dengan pencahayaan sinematik dan pendampingan pose, untuk individu, bestie, dan keluarga. Kode website ini sebelumnya ditempel sebagai embed HTML di Google Sites, lalu dipecah menjadi file HTML, CSS, dan JavaScript terpisah dengan tampilan yang sama persis, ditambah navbar untuk halaman lain.

## Halaman
| File | Isi | Pengembang |
|------|-----|------------|
| `index.html` | Beranda, tentang, ringkasan portofolio dan paket, ide pose, testimoni, kontak | Galih Chandra |
| `portofolio.html` | Galeri portofolio lengkap | Winayu Adinda |
| `paket-harga.html` | Detail paket dan harga | Winayu Adinda |

## Struktur
```
sihircahaya/
├── index.html
├── css/variables.css   warna, huruf, ukuran
├── css/style.css       gaya semua halaman
├── js/components.js    navbar dan footer bersama
└── assets/             tempat foto lokal (opsional)
```

Halaman baru cukup memakai `<header id="navbar"></header>`, `<footer id="footer"></footer>`, dan memuat `css/variables.css`, `css/style.css`, serta `js/components.js`.

## Foto
Logo dan foto saat ini dimuat dari Google Drive (`lh3.googleusercontent.com/d/...`), sama seperti kode aslinya, jadi file Drive-nya harus tetap dibagikan publik. Folder `assets/` disiapkan kalau nanti foto ingin disimpan langsung di repo.

## Pengembang
- Galih Chandra (galihabdann04-code), index.html, gaya, dan komponen
- Winayu Adinda (winayuadinda48-ctrl), portofolio.html dan paket-harga.html
