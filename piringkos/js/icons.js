/* =========================================================
   PIRING KOS · icons.js
   Set ikon SVG garis (pengganti emoji). Warna ikut warna teks
   (currentColor), jadi bisa diatur lewat CSS.
   Pakai: icon("protein") atau icon("whatsapp", "icon-lg")
   ========================================================= */
const ICON_PATHS = {
  /* 5 gaya diet */
  seimbang:   '<circle cx="12" cy="12" r="9"/><path d="M12 3v9h9"/><path d="M12 12l-6 6"/>',
  defisit:    '<path d="M12 3v17M7 20h10M5 7h14"/><path d="M5 7l-3 6a3 3 0 0 0 6 0L5 7zM19 7l-3 6a3 3 0 0 0 6 0l-3-6z"/>',
  lowcarb:    '<path d="M12 3c-3.5 0-7 5.5-7 10a7 7 0 0 0 14 0c0-4.5-3.5-10-7-10z"/>',
  protein:    '<path d="M6 6v12M18 6v12M3 9v6M21 9v6M6 12h12"/>',
  vegetarian: '<path d="M11 20a7 7 0 0 1-7-7c0-6 6-9 16-9 0 10-3 16-9 16z"/><path d="M4 20c4-4 7-6 11-8"/>',

  /* Antarmuka */
  book:       '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h1M12 11h1M16 11h0M8 15h1M12 15h1M8 18h1M12 18h1M16 15v3"/>',
  calendar:   '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chat:       '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/>',
  clock:      '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pan:        '<circle cx="10" cy="13" r="6"/><path d="M16 13h6"/>',
  wallet:     '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 15h2"/>',
  flame:      '<path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4.5 2-7 1.5 1 3 2.5 3 4V3z"/>',
  ban:        '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  cart:       '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h11l2-8H6"/>',
  bulb:       '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  lock:       '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  check:      '<path d="M5 12l5 5L20 7"/>',
  close:      '<path d="M6 6l12 12M18 6L6 18"/>',
  arrow:      '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu:       '<path d="M4 7h16M4 12h16M4 17h16"/>',
  printer:    '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
  qr:         '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 20h2M20 14v2"/>'
};

/* Ikon WhatsApp berupa bentuk terisi, bukan garis */
const ICON_WHATSAPP =
  '<svg class="icon {cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z"/></svg>';

function icon(name, cls = "") {
  if (name === "whatsapp") return ICON_WHATSAPP.replace("{cls}", cls);
  const paths = ICON_PATHS[name] || ICON_PATHS.check;
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

/* Ganti semua <i data-icon="nama"></i> di HTML dengan ikon SVG */
function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.outerHTML = icon(el.dataset.icon, el.dataset.iconClass || "");
  });
}
