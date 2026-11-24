# Lab Pemrograman Kelompok 1

Monorepo tugas kelompok Lab Pemrograman. Enam anggota membuat lima website bisnis, masing-masing di satu folder. Teknologi: HTML, CSS, dan JavaScript biasa (tanpa framework dan tanpa build step).

## Daftar Website

| Folder | Website | Pengembang | Link live | Status |
|--------|---------|------------|-----------|--------|
| `sihircahaya/` | Sihir Cahaya Photography (foto wisuda) | Galih Chandra (galihabdann04-code), pasangan Winayu Adinda | https://sites.google.com/view/sihircahaya-photography-smg | Belum |
| `piringkos/` | Piring Kos (resep masakan diet) | Qonita Iffatul I (qonitaiffah), pasangan Shaula Putri | https://piringkos.netlify.app | Belum |
| `dearly/` | Dearly (souvenir custom) | Winayu Adinda (winayuadinda48-ctrl), pasangan Galih Chandra | https://dearly-souvernir.netlify.app | Belum |
| `undangan/` | Undangan Digital | Shaula Putri (shaulaputri-tech), pasangan Winayu Adinda | https://claude.ai/artifact/B15qWEmPjK5oDpSVut95T9 | Belum |
| `rutekita/` | Rutekita (itinerary destinasi) | Rafi Favian (rafivahen-debug), pasangan Risky Mulidan | https://rutekitaa.netlify.app | Belum |

**Kolom Status:** Belum, Dikerjakan, Direvisi, Selesai. Hanya Risky (riskymulidan-cloud) yang mengubah kolom ini agar tidak terjadi konflik.

## Anggota dan Dokumentasi

| Anggota | GitHub | Peran |
|---------|--------|-------|
| Risky Mulidan | riskymulidan-cloud | Koordinator dan dokumentasi |
| Galih Chandra | galihabdann04-code | Pemilik sihircahaya |
| Qonita Iffatul I | qonitaiffah | Pemilik piringkos |
| Winayu Adinda | winayuadinda48-ctrl | Pemilik dearly |
| Shaula Putri | shaulaputri-tech | Pemilik undangan |
| Rafi Favian | rafivahen-debug | Pemilik rutekita |

### Pembagian tugas dokumentasi

| Dokumentasi | Penanggung jawab |
|-------------|------------------|
| Riset 30 ide dan penyaringan 5 bisnis (`01-riset/`) | Risky Mulidan |
| [DOKUMENTASI LAIN] | [NAMA] |

## Alur Git

```
main  <-  develop  <-  feature/<nama>-<folder>
```

- `main` berisi versi final, `develop` berisi gabungan pekerjaan semua anggota.
- Tidak ada yang commit langsung ke `main` atau `develop`.
- Setiap orang bekerja di branch sendiri, contoh `feature/galih-sihircahaya`.
- Setelah selesai, buat Pull Request ke `develop`. Pasangan mengecek sebelum merge.

Aturan lengkap ada di [CONTRIBUTING.md](CONTRIBUTING.md).
