/* Data DEARLY: pengaturan, tier, produk, add-on, cerita, FAQ.
   Dipakai bersama oleh semua halaman (misalnya index.html dan katalog.html). */
/* ===================== EDIT DI SINI ===================== */
const CONFIG = {
  whatsapp: "",            // nomor WA admin, contoh "6281234567890"
  instagram: "",           // contoh "dearly.gift" (tanpa @)
  productionTime: "3–5 hari kerja setelah desain disetujui",
  groupMin: 10
};
const TIERS = [
  { id: "10", price: 10000, label: "Rp10K", name: "The Little Ones", blurb: "Barang kecil sehari-hari, dibuat terasa miliknya." },
  { id: "15", price: 15000, label: "Rp15K", name: "The Keepsakes", blurb: "Lebih banyak ruang untuk foto, nama, dan wording." }
];
const PRODUCTS = [
  { id: "mirror", tier: "10", name: "Mini Mirror", art: "mirror", tone: "blush", desc: "Kaca saku untuk teman yang selalu ngaca sebelum foto.", custom: ["Sticker belakang", "Nama/inisial", "Warna & vibe"] },
  { id: "clipper", tier: "10", name: "Nail Clipper", art: "clipper", tone: "cream", desc: "Kecil, berguna, dan bakal dibawa bertahun-tahun.", custom: ["Wrap sticker", "Wording singkat", "Warna & vibe"] },
  { id: "keychain", tier: "10", name: "Charm Keychain", art: "keychain", tone: "sage", desc: "Tag kecil dengan nama, satu kata, atau inside joke.", custom: ["Nama", "Satu kata/frasa", "Warna & vibe"] },
  { id: "pen", tier: "10", name: "Name Pen", art: "pen", tone: "rose", desc: "Untuk catatan kuliah dan tanda tangan hal-hal besar.", custom: ["Label nama", "Wording singkat", "Warna & vibe"] },
  { id: "snack", tier: "10", name: "Snack Pack", art: "snack", tone: "butter", desc: "Snack favoritnya, dengan label yang hanya tentang dia.", custom: ["Label custom", "Wording", "Pilihan snack"] },
  { id: "pouch", tier: "15", name: "Zip Pouch", art: "pouch", tone: "rose", desc: "Muat pulpen, lip tint, charger, dan barang kecil lainnya.", custom: ["Patch/sticker", "Nama", "Warna & vibe"] },
  { id: "notebook", tier: "15", name: "Notebook", art: "notebook", tone: "cocoa", desc: "Judul cover khusus untuknya, dengan catatan di dalam.", custom: ["Judul cover", "Catatan halaman 1", "Warna & vibe"] },
  { id: "acrylic", tier: "15", name: "Acrylic Keychain", art: "keychain", tone: "blush", desc: "Akrilik bening dengan nama, kata, atau foto kecil.", custom: ["Foto (opsional)", "Nama & wording", "Warna & vibe"] },
  { id: "frame", tier: "15", name: "Mini Photo Frame", art: "frame", tone: "cream", desc: "Satu foto berarti, dalam bingkai mungil untuk meja.", custom: ["Fotomu", "Caption", "Warna bingkai"] },
  { id: "scrunchie", tier: "15", name: "Scrunchie Duo", art: "scrunchie", tone: "blush", desc: "Dua scrunchie warna favoritnya, dengan kartu darimu.", custom: ["Pasangan warna", "Wording kartu", "Nama"] }
];
const ADDONS = [
  { id: "card", name: "Extra greeting card", price: 2000, desc: "Kartu kedua untuk pesan lebih panjang." },
  { id: "print", name: "Extra photo print", price: 3000, desc: "Satu foto kecil dicetak." },
  { id: "box", name: "Premium packaging", price: 5000, desc: "Gift box, pita, dan seal sticker." }
];
const OCCASIONS = ["Birthday", "Graduation / Wisuda", "Farewell", "Demisioner", "Appreciation", "KKN", "Internship / Magang", "Just because"];
const RELATIONS = ["Best friend", "Friend", "Kakak tingkat", "Adik tingkat", "Partner", "Sibling", "Teman divisi", "Mentor", "Lainnya"];
const VIBES = ["Soft & dreamy", "Playful", "Clean & minimal", "Vintage", "Elegant", "Bold", "Let DEARLY decide"];
const COLORS = [["Blush", "#E8C4BC"], ["Sage", "#A9B59A"], ["Cream", "#EEE2CC"], ["Mocha", "#8A6552"], ["Burgundy", "#7A2E3A"], ["Lilac", "#C9B8D6"], ["Butter", "#EAD58E"], ["Sky", "#B9CEDD"]];
const STORIES = [
  { p: "keychain", tone: "sage", name: "Nadia", occ: "Appreciation", brief: "She's always late, loves matcha, and somehow cares about everyone.", pal: [["Sage", "#A9B59A"], ["Cream", "#EEE2CC"]], msg: "Small gift. Big personality.", det: ["Playful typography", "Custom keychain", "Sticker “OTW”", "Personalized greeting card"], pres: "Keychain di atas kartu sage, dibungkus kertas cream dan pita hijau matcha." },
  { p: "notebook", tone: "cocoa", name: "Kak Raka", occ: "Demisioner", brief: "He ran our whole division on iced coffee and voice notes.", pal: [["Espresso", "#4A3229"], ["Oat", "#EBDCCD"]], msg: "Minutes of a great leader.", det: ["Cover bergaya notulen rapat", "Daftar kalimat andalannya di halaman 1", "Sticker coffee-ring", "Kartu dari satu divisi"], pres: "Notebook diikat tali coklat, kartu diselipkan di bawahnya." },
  { p: "pouch", tone: "rose", name: "Sasa", occ: "Graduation / Wisuda", brief: "She cries at every sad movie, color-codes her life, and finally finished her thesis.", pal: [["Dusty rose", "#A9686B"], ["Lilac", "#C9B8D6"]], msg: "Officially done. Still my favorite overthinker.", det: ["Patch monogram inisialnya", "Sticker tab warna-warni", "Sticker “thesis survivor”", "Kartu timeline semester"], pres: "Pouch dalam box blush dengan tissue paper dan pita lilac." },
  { p: "snack", tone: "butter", name: "Posko 7", occ: "KKN", brief: "Fifteen of us, one village, forty days, too much instant noodles.", pal: [["Butter", "#EAD58E"], ["Brick", "#A4553F"]], msg: "Posko 7 survivors. Same time next year?", det: ["Label snack dengan nama tiap orang", "Sticker peta desa", "Inside joke di belakang", "Group order 15 pcs"], pres: "15 pack berjajar di tray kraft, masing-masing diberi nama." }
];
const FAQ = [
  ["Bagaimana cara order?", "Buka Create Your Gift, pilih budget, pilih satu produk, ceritakan tentang penerima, cek ringkasan, lalu kirim pesan yang sudah tersusun ke WhatsApp. Pesanan diproses setelah admin mengonfirmasi."],
  ["Kenapa hanya bisa pilih satu produk?", "Setiap gift berisi satu barang utama sesuai tier. Fokusnya seberapa personal barang itu terasa: desain, wording, sticker, kartu, dan packaging."],
  ["Apa saja yang dipersonalisasi?", "Warna, vibe, nama, wording, sticker, kartu ucapan, dan packaging."],
  ["Bagaimana cara mengirim foto?", "Foto hanya tampil sebagai preview di form. Kirim fotonya langsung di chat WhatsApp setelah pesan order terkirim."],
  ["Berapa lama proses pembuatannya?", "Estimasi awal: " + CONFIG.productionTime + ". Tulis tanggal butuhnya di form."],
  ["Bisa order untuk banyak orang?", "Bisa, mulai " + CONFIG.groupMin + " pcs. Hitung estimasinya di halaman Group Gifting."],
  ["Bagaimana pembayarannya?", "Pembayaran dilakukan setelah admin mengonfirmasi pesanan. Detail dikirim di WhatsApp. Website tidak memproses pembayaran."],
  ["Apakah bisa dikirim?", "Bisa pickup atau dikirim via ekspedisi. Ongkir dihitung terpisah."],
  ["Bisa request di luar pilihan?", "Ceritakan lewat WhatsApp. Harga dan waktu akan dikonfirmasi dulu."]
];
/* ======================================================== */
