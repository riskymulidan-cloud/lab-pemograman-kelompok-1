/* Atelier Nara — data bisnis, template, paket, galeri, dan FAQ.
   Ubah nomor WhatsApp dan data bisnis di file ini saja. */

/* =========================================================
   DATA & CONFIG  — ubah data bisnis di bagian ini
   ========================================================= */
const WA_NUMBER = "6281234567890"; // ganti dengan nomor WhatsApp bisnis (format 62…)

const BUSINESS = {
  name: "Atelier Nara",
  category: "Digital Invitation Studio",
  tagline: "Every Moment Deserves a Beautiful Beginning.",
  hours: "09.00–21.00 WIB",
  city: "Semarang, Jawa Tengah",
  instagramHandle: "@ateliernara (placeholder)",
  instagramUrl: "https://www.instagram.com/" // ganti dengan URL Instagram bisnis
};

const WA_MESSAGES = {
  general: "Halo Atelier Nara! Saya ingin bertanya tentang layanan undangan digital.",
  float: "Halo Atelier Nara! Saya tertarik membuat undangan digital. Boleh minta info lebih lanjut?",
  cta: "Halo Atelier Nara! Saya ingin konsultasi untuk membuat undangan digital acara saya.",
  faq: "Halo Atelier Nara! Saya punya pertanyaan seputar pemesanan undangan digital."
};

const CATEGORIES = [
  { id: "all", label: "All Designs" },
  { id: "wedding", label: "Wedding" },
  { id: "engagement", label: "Engagement" },
  { id: "birthday", label: "Birthday" },
  { id: "special", label: "Special Events" }
];

const CATEGORY_TO_EVENT = { wedding: "Wedding", engagement: "Engagement", birthday: "Birthday", special: "Special Event" };

const PACKAGES = [
  {
    id: "essential", no: "Package 01", name: "Essential", price: 49000, prefix: "",
    tagline: "Simple, elegant, and ready to share.",
    features: ["1 desain undangan", "Informasi acara", "Nama mempelai", "Lokasi Google Maps", "Countdown", "Unlimited sharing", "Revisi maksimal 1 kali"]
  },
  {
    id: "signature", no: "Package 02", name: "Signature", price: 89000, prefix: "", popular: true,
    tagline: "The complete experience for your guests.",
    features: ["Semua fitur Essential", "Gallery foto", "Love story", "RSVP", "Musik latar", "Revisi maksimal 2 kali"]
  },
  {
    id: "premium", no: "Package 03", name: "Premium", price: 149000, prefix: "",
    tagline: "Refined details, made truly yours.",
    features: ["Semua fitur Signature", "Custom color palette", "Custom typography", "Digital gift section", "Animasi tambahan", "Revisi maksimal 3 kali"]
  },
  {
    id: "exclusive", no: "Package 04", name: "Exclusive Custom", price: 199000, prefix: "Mulai",
    tagline: "Designed from scratch, only for you.",
    features: ["Desain dari nol", "Desain eksklusif sesuai permintaan", "Layout custom", "Full personalization", "Konsultasi desain", "Revisi sesuai kesepakatan"]
  }
];

const TEMPLATES = [
  {
    id: "ever-after", name: "The Ever After", category: "wedding", theme: "Classic Romantic", style: "classic", pkg: "essential", tilt: "-3deg",
    colors: { paper: "#FBF7EF", ink: "#4E4036", accent: "#B8975F", accent2: "#E4D6C3", surface: "#ECE3D5" },
    palette: [["Ivory", "#F8F3EA"], ["Champagne Gold", "#C3A477"], ["Soft Beige", "#E4D6C3"]],
    sample: { kicker: "The Wedding of", names: ["Dimas", "Laras"], date: "14 · 02 · 2027", place: "Semarang" },
    desc: "Bingkai emas ganda dan tipografi klasik untuk pernikahan yang anggun dan abadi.",
    features: ["Cover dengan bingkai champagne gold", "Tipografi script & serif klasik", "Animasi pembuka yang lembut"]
  },
  {
    id: "rose-amour", name: "Rosé Amour", category: "wedding", theme: "Romantic Watercolor", style: "watercolor", pkg: "signature", tilt: "3deg",
    colors: { paper: "#FBF3F0", ink: "#5B3F3B", accent: "#C98C86", accent2: "#E8C4BC", surface: "#F2E1DC" },
    palette: [["Dusty Rose", "#D7A6A1"], ["Cream", "#F4ECE2"], ["Blush", "#E8C4BC"]],
    sample: { kicker: "Together with their families", names: ["Bima", "Ayu"], date: "08 · 03 · 2027", place: "Ungaran" },
    desc: "Sapuan cat air dusty rose yang lembut — romantis, hangat, dan penuh perasaan.",
    features: ["Ornamen watercolor organik", "Galeri foto & love story", "Musik latar romantis"]
  },
  {
    id: "olive-garden", name: "Olive Garden", category: "wedding", theme: "Botanical Minimalist", style: "botanical", pkg: "essential", tilt: "-2deg",
    colors: { paper: "#F6F5EE", ink: "#3F4536", accent: "#7D8B6A", accent2: "#C9CFB8", surface: "#E3E6D9" },
    palette: [["Sage Green", "#A6B09A"], ["Ivory", "#F6F5EE"], ["Olive", "#7D8B6A"]],
    sample: { kicker: "Save the Date", names: ["Raka", "Nadia"], date: "21 · 06 · 2027", place: "Salatiga" },
    desc: "Ranting zaitun line-art dan ruang putih yang lega untuk pasangan yang menyukai kesederhanaan.",
    features: ["Ilustrasi botanical line-art", "Layout minimalis yang lega", "Peta lokasi terintegrasi"]
  },
  {
    id: "celestial-love", name: "Celestial Love", category: "wedding", theme: "Modern Elegant", style: "celestial", pkg: "premium", tilt: "2deg",
    colors: { paper: "#4A3B33", ink: "#F1E6D6", accent: "#D9BF8F", accent2: "#7A6556", surface: "#E6DCCF" },
    palette: [["Mocha", "#4A3B33"], ["Cream", "#F1E6D6"], ["Champagne", "#D9BF8F"]],
    sample: { kicker: "Written in the stars", names: ["Fajar", "Alya"], date: "12 · 09 · 2027", place: "Semarang" },
    desc: "Nuansa mocha dengan bintang dan bulan sabit champagne — modern, dramatis, dan elegan.",
    features: ["Mode gelap yang mewah", "Detail bintang & bulan", "Animasi tambahan premium"]
  },
  {
    id: "fleur-de-nuit", name: "Fleur de Nuit", category: "engagement", theme: "Floral Luxury", style: "floral", pkg: "signature", tilt: "-3deg",
    colors: { paper: "#F8EFEC", ink: "#5E2430", accent: "#7A2E3B", accent2: "#D9A3A8", surface: "#EBDAD6" },
    palette: [["Burgundy", "#6E2B33"], ["Dusty Pink", "#D9A3A8"], ["Ivory", "#F8EFEC"]],
    sample: { kicker: "Engagement of", names: ["Reza", "Kirana"], date: "05 · 01 · 2027", place: "Semarang" },
    desc: "Jendela lengkung burgundy dengan rangkaian bunga — mewah untuk momen lamaran yang berkesan.",
    features: ["Frame arch burgundy", "Ilustrasi floral mewah", "RSVP untuk keluarga inti"]
  },
  {
    id: "sunday-bloom", name: "Sunday Bloom", category: "birthday", theme: "Playful Pastel", style: "pastel", pkg: "essential", tilt: "3deg",
    colors: { paper: "#FFF5EA", ink: "#6A4A3E", accent: "#E9A08A", accent2: "#F3D98B", surface: "#F8E6D8" },
    palette: [["Peach", "#F2B8A0"], ["Butter Yellow", "#F3D98B"], ["Pink", "#EFB0B8"]],
    sample: { kicker: "You're invited to", names: ["Kayla's", "21st"], date: "Sunday · 07 · 03", place: "Garden Party" },
    desc: "Balon dan confetti pastel yang ceria — playful, manis, dan tetap terlihat rapi.",
    features: ["Ilustrasi balon & confetti", "Countdown ulang tahun", "Unlimited sharing link"]
  },
  {
    id: "little-moments", name: "Little Moments", category: "birthday", theme: "Minimalist Cute", style: "cute", pkg: "essential", tilt: "-2deg",
    colors: { paper: "#F4F0F8", ink: "#5E5070", accent: "#B7A6D3", accent2: "#F4C7AE", surface: "#E9E3EF" },
    palette: [["Soft Lavender", "#C9BCE0"], ["Cream", "#F7F1E8"], ["Peach", "#F4C7AE"]],
    sample: { kicker: "First birthday of", names: ["Baby Arsa", "turns one"], date: "Saturday · 15 · 05", place: "Semarang" },
    desc: "Lavender lembut dengan awan dan bintang kecil — menggemaskan untuk perayaan si kecil.",
    features: ["Ilustrasi awan & bintang", "Tipografi rounded yang ramah", "Galeri foto si kecil"]
  },
  {
    id: "golden-hour", name: "Golden Hour", category: "special", theme: "Modern Editorial", style: "editorial", pkg: "signature", tilt: "2deg",
    colors: { paper: "#EFE3D3", ink: "#3E2F27", accent: "#B97862", accent2: "#B39260", surface: "#E8D8C5" },
    palette: [["Terracotta", "#B97862"], ["Beige", "#EFE3D3"], ["Muted Gold", "#B39260"]],
    sample: { kicker: "An evening soirée", names: ["Graduation", "Night"], date: "30 · 08 · 2027", place: "Semarang" },
    desc: "Layout editorial ala majalah dengan matahari terracotta — cocok untuk wisuda, gathering, atau launching.",
    features: ["Layout editorial asimetris", "Tipografi display tegas", "Cocok untuk acara non-pernikahan"]
  }
];

const DEMO_EVENT = {
  couple: "Aditya & Naura",
  date: "2026-12-20T09:00:00+07:00",
  dateEnd: "2026-12-20T14:00:00+07:00",
  location: "Semarang, Jawa Tengah",
  mapsQuery: "Semarang, Jawa Tengah"
};

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=70", caption: "A quiet promise" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=70", caption: "Blooms of the day" },
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=70", caption: "Two rings, one story" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=70", caption: "Hand in hand" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=70", caption: "Golden afternoon" },
  { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=70", caption: "The table is set" }
];

const FAQS = [
  ["Apa itu undangan digital?", "Undangan digital adalah undangan berbentuk website yang dapat dibuka melalui tautan (link) di HP maupun laptop. Selain informasi acara, undangan digital dapat dilengkapi countdown, galeri foto, RSVP, musik, dan peta lokasi."],
  ["Bagaimana cara memesan undangan di Atelier Nara?", "Pilih desain di Our Collection, tentukan paket, lalu isi form pemesanan. WhatsApp akan terbuka dengan pesan berisi detail pesanan Anda. Tim kami akan membalas untuk konsultasi dan langkah berikutnya."],
  ["Apakah desain bisa disesuaikan?", "Bisa. Nama, tanggal, foto, teks, musik, hingga warna dapat disesuaikan. Paket Premium mendukung custom color palette dan typography, sedangkan Exclusive Custom dibuat sepenuhnya dari nol."],
  ["Apakah undangan bisa dibagikan melalui WhatsApp?", "Tentu. Setiap undangan memiliki tautan yang dapat dibagikan tanpa batas melalui WhatsApp, Instagram, dan media sosial lainnya."],
  ["Berapa lama proses pengerjaan?", "Estimasi pengerjaan paket Essential dan Signature sekitar 1–3 hari kerja setelah data lengkap, Premium sekitar 3–5 hari kerja, dan Exclusive Custom mengikuti kesepakatan bersama."],
  ["Apakah bisa melakukan revisi?", "Bisa. Jumlah revisi menyesuaikan paket: Essential 1 kali, Signature 2 kali, Premium 3 kali, dan Exclusive Custom sesuai kesepakatan."],
  ["Apakah undangan dapat dibuka melalui HP?", "Ya. Semua undangan dirancang mobile-first sehingga nyaman dibuka di HP, tablet, maupun desktop tanpa perlu menginstal aplikasi."],
  ["Apakah saya bisa melihat preview sebelum memesan?", "Bisa. Anda dapat mencoba demo di bagian Live Preview, membuka preview setiap template di Our Collection, dan kami juga akan mengirimkan preview undangan untuk disetujui sebelum dibagikan."]
];

const COLOR_SUGGESTIONS = [
  ["Dusty Rose", "#D7A6A1"], ["Sage", "#A6B09A"], ["Terracotta", "#B97862"], ["Champagne", "#C3A477"], ["Ivory", "#F1EADF"], ["Lavender", "#C9BCE0"]
];

const RSVP_STORAGE_KEY = "ateliernara_demo_rsvp";
