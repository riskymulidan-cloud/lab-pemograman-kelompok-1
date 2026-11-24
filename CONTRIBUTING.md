# Panduan Kontribusi

## Struktur branch

```
main  <-  develop  <-  feature/<nama>-<folder>
```

- Jangan pernah commit langsung ke `main` atau `develop`.
- Nama branch: `feature/<nama>-<folder>`, contoh `feature/galih-sihircahaya`.
- Hanya ubah folder dan file bagianmu. Jangan mengubah file milik anggota lain.

## Memulai kerja

```bash
git pull origin develop
git checkout -b feature/<nama>-<folder>
```

## Identitas commit

Commit harus dari akunmu sendiri. Sebelum commit pertama, cek:

```bash
git config user.name
git config user.email
```

Email harus sama dengan email yang terverifikasi di akun GitHub-mu (Settings > Emails). Kalau tidak sama, commit tidak masuk ke profilmu.

## Format commit

Gunakan commit kecil dan sering, satu perubahan logis per commit.

- `feat: ...` untuk fitur atau halaman baru
- `fix: ...` untuk perbaikan
- `docs: ...` untuk dokumentasi

Target minimal **5 commit bermakna per orang**.

## Pull Request dan review

1. Push branchmu: `git push -u origin feature/<nama>-<folder>`.
2. Buka Pull Request ke `develop`.
3. Minta pasanganmu mereview.
4. Merge hanya setelah pasangan menyetujui.

## Menyelesaikan konflik

Konflik muncul saat dua orang mengubah bagian file yang sama. Karena tiap orang punya folder sendiri, konflik seharusnya jarang. Kalau terjadi:

1. Jalankan `git pull origin develop` di branchmu.
2. Buka file yang bertanda konflik, cari penanda `<<<<<<<`, `=======`, `>>>>>>>`.
3. Gabungkan kedua versi secara manual. Jangan menghapus pekerjaan anggota lain.
4. Hapus semua penanda, lalu `git add <file>` dan `git commit`.
5. Kalau ragu, tanyakan ke koordinator (Risky) sebelum melanjutkan.

## Status di README utama

Kolom Status di README utama hanya diubah oleh koordinator.
