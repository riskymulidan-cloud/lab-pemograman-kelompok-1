/* Logika halaman DEARLY: ilustrasi, router halaman, form Create your gift, kalkulator group order. */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const rp = n => "Rp" + n.toLocaleString("id-ID");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const tierOf = id => TIERS.find(t => t.id === id), prodOf = id => PRODUCTS.find(p => p.id === id);
const wa = t => "https://wa.me/" + CONFIG.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(t);

/* ---------- illustrations ---------- */
const TONES = { blush: ["#EBD5CD", "#C98F8C", "#F7E9E3", "#7A2E3A"], sage: ["#DDE1D2", "#97A889", "#F4F2E7", "#4A5A43"], cream: ["#EFE5D5", "#D4BC9C", "#FCF7EF", "#6B4A3A"], cocoa: ["#DCC8BA", "#6B4A3A", "#EFE2D4", "#2F1F19"], rose: ["#E6CAC5", "#A9686B", "#F6E6E2", "#5C2330"], butter: ["#F0E5C8", "#D9B76E", "#FCF5E3", "#7A2E3A"] };
let uid = 0;
function art(kind, tone, name) {
  const [bg, o, s, a] = TONES[tone] || TONES.blush, id = "a" + (++uid), N = esc(name || "Nadia");
  const sh = `filter="url(#${id})"`, T = (x, y, t, sz, c, it = 1) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" ${it ? 'font-style="italic"' : ""} font-size="${sz}" fill="${c}">${t}</text>`;
  const stk = (x, y, w, c) => `<g ${sh}><circle cx="${x}" cy="${y}" r="30" fill="#FFFDF9"/><circle cx="${x}" cy="${y}" r="26" fill="${c}"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Hanken Grotesk,Arial" font-weight="700" font-size="13" fill="${s}">${w}</text></g>`;
  const card = (x, y, r, t) => `<g transform="translate(${x} ${y}) rotate(${r})" ${sh}><rect width="140" height="96" fill="${s}"/><rect x="8" y="8" width="124" height="80" fill="none" stroke="${o}" stroke-opacity=".5"/>${T(70, 56, t, 22, a)}</g>`;
  const P = {
    mirror: `${card(230, 80, 8, "for you")}<g ${sh}><circle cx="165" cy="235" r="80" fill="${o}"/>${T(165, 258, N[0], 64, s)}<circle cx="240" cy="305" r="74" fill="${a}"/><circle cx="240" cy="305" r="64" fill="${s}"/><path d="M196 276 L266 248 L278 262 L204 296Z" fill="#fff" opacity=".6"/></g>${stk(110, 400, "hi you", a)}`,
    clipper: `${card(50, 70, -7, "keep it neat")}<g transform="translate(205 270) rotate(-24)" ${sh}><rect x="-120" y="-20" width="230" height="40" rx="20" fill="#D6CFC7"/><rect x="-70" y="-17" width="120" height="34" fill="${o}"/>${T(-10, 6, N, 20, s)}<path d="M100 -24 C40 -70 -60 -64 -112 -44 L-108 -32 C-60 -48 30 -52 92 -14Z" fill="#C9C1B8"/></g>${stk(300, 400, "♡ u", a)}`,
    keychain: `<g ${sh}><circle cx="170" cy="130" r="32" fill="none" stroke="#C9C1B8" stroke-width="8"/><g transform="rotate(7 220 300)"><rect x="128" y="190" width="180" height="200" rx="28" fill="${s}" stroke="${o}" stroke-width="2"/><circle cx="196" cy="216" r="9" fill="${bg}"/>${T(218, 300, N, 44, a)}<rect x="178" y="322" width="80" height="26" rx="13" fill="${o}"/><text x="218" y="340" text-anchor="middle" font-family="Hanken Grotesk,Arial" font-weight="700" font-size="12" fill="${s}">OTW</text></g></g>${stk(90, 410, "OTW", o)}`,
    pen: `${card(60, 310, -6, "thank you")}<g transform="translate(206 210) rotate(-32)" ${sh}><rect x="-150" y="-13" width="270" height="26" rx="13" fill="${o}"/><path d="M120 -11 L168 0 L120 11Z" fill="#C9C1B8"/><rect x="-140" y="-18" width="110" height="7" rx="3" fill="#C9C1B8"/><text x="20" y="5" text-anchor="middle" font-family="Hanken Grotesk,Arial" font-weight="700" font-size="11" letter-spacing="3" fill="${s}">${N.toUpperCase()}</text></g>${stk(320, 390, "yes!", a)}`,
    snack: `<g transform="rotate(6 200 260)" ${sh}><rect x="120" y="140" width="160" height="240" fill="${s}"/><rect x="120" y="196" width="160" height="120" fill="${o}"/><circle cx="200" cy="256" r="44" fill="${a}"/>${T(200, 262, "for you", 22, s)}</g>${stk(320, 400, "yum", a)}`,
    pouch: `${card(232, 64, 8, "done!")}<g ${sh}><path d="M86 196 Q86 176 106 176 L294 176 Q314 176 314 196 L322 360 Q324 392 292 392 L108 392 Q76 392 78 360Z" fill="${o}"/><line x1="96" y1="196" x2="304" y2="196" stroke="#D6CFC7" stroke-width="6" stroke-dasharray="3 2"/><circle cx="200" cy="292" r="46" fill="${s}"/>${T(200, 308, N[0], 46, a)}</g>${stk(330, 430, "yay", a)}`,
    notebook: `<g transform="rotate(-5 205 260)" ${sh}><rect x="118" y="110" width="190" height="270" rx="5" fill="${o}"/><rect x="118" y="110" width="16" height="270" fill="#000" opacity=".12"/><rect x="276" y="110" width="10" height="270" fill="${a}"/><rect x="150" y="170" width="112" height="78" fill="${s}"/>${T(206, 222, N, 22, a)}</g>${stk(98, 112, "kopi?", a)}`,
    frame: `${card(46, 360, -8, "22")}<g ${sh}><rect x="120" y="96" width="180" height="230" fill="${o}"/><rect x="134" y="110" width="152" height="202" fill="${s}"/><rect x="150" y="126" width="120" height="140" fill="${bg}"/><path d="M150 266 L150 230 C176 200 196 214 210 226 C226 206 254 198 270 220 L270 266Z" fill="${a}" opacity=".5"/>${T(210, 294, N, 18, a)}</g>${stk(316, 410, "yay", a)}`,
    scrunchie: `${card(130, 330, -4, N)}<g ${sh}><circle cx="150" cy="196" r="72" fill="none" stroke="${o}" stroke-width="40"/><circle cx="262" cy="236" r="62" fill="none" stroke="${s}" stroke-width="36"/></g>${stk(334, 116, "xo", a)}`,
    box: `${card(40, 300, -9, "made for you")}<g ${sh}><rect x="150" y="190" width="200" height="190" fill="${o}"/><rect x="140" y="160" width="220" height="44" fill="${o}"/><rect x="236" y="160" width="28" height="220" fill="${a}"/><path d="M250 160 C210 110 168 120 186 150 C196 166 230 162 250 160Z M250 160 C290 110 332 120 314 150 C304 166 270 162 250 160Z" fill="${a}"/></g>${stk(380, 120, "best", a)}${stk(90, 150, "OTW", o)}`,
    card: `<g transform="rotate(-4 200 250)" ${sh}><rect x="90" y="90" width="230" height="300" fill="${s}"/>${T(205, 140, "About " + N + "…", 26, a)}${[0, 1, 2, 3, 4, 5].map(i => `<line x1="120" y1="${185 + i * 30}" x2="${290 - (i % 3) * 30}" y2="${185 + i * 30}" stroke="${o}" stroke-width="1.6"/>`).join("")}</g>${stk(320, 410, "matcha", o)}`,
    stickers: `<g ${sh}><rect x="80" y="80" width="250" height="330" rx="10" fill="${s}"/></g>${["OTW", "best", "♡", "yay", "luv", "kopi?", "hi", "xo"].map((w, i) => stk(140 + (i % 2) * 120, 140 + Math.floor(i / 2) * 76, w, [a, o][i % 2])).join("")}`,
    tags: ["Raka", "Sasa", "Dimas", "Nadia", "Tari", "Bima", "Laras", "Yoga", "Kirana"].map((n, i) => `<g transform="translate(${70 + (i % 3) * 100} ${100 + Math.floor(i / 3) * 120}) rotate(${(i * 37) % 14 - 7})" ${sh}><path d="M0 0 L66 0 L84 22 L66 44 L0 44Z" fill="${s}"/><rect width="8" height="44" fill="${[o, a][i % 2]}"/>${T(38, 28, n, 17, a)}</g>`).join("")
  };
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${kind}"><defs><filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="6" dy="12" stdDeviation="10" flood-color="#3A2620" flood-opacity=".22"/></filter><radialGradient id="g${id}" cx="20%" cy="10%" r="95%"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#3A2620" stop-opacity=".1"/></radialGradient></defs><rect width="400" height="500" fill="${bg}"/>${P[kind] || P.box}<rect width="400" height="500" fill="url(#g${id})"/></svg>`;
}
const drawArt = () => $$("[data-art]:not([data-done])").forEach(el => { el.innerHTML = art(el.dataset.art, el.dataset.tone, el.dataset.name); el.dataset.done = 1; });

/* ---------- router ---------- */
function go(page, productId) {
  $$("[data-page]").forEach(s => s.hidden = s.dataset.page !== page);
  $$(".links button").forEach(b => b.dataset.go === page ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
  $("#links").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false");
  if (page === "create") startCreate(productId);
  window.scrollTo(0, 0);
}
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]"); if (!g) return;
  e.preventDefault(); go(g.dataset.go, g.dataset.product);
  if (g.dataset.filter) filterShop(g.dataset.filter);
});
$("#burger").onclick = () => { const o = $("#links").classList.toggle("open"); $("#burger").setAttribute("aria-expanded", o); };

/* ---------- shared renders ---------- */
const prodCard = (p, chips = true) => `<article class="prod"><div class="art">${art(p.art, p.tone, p.name.split(" ")[0])}</div>
  <div class="pt"><h3>${esc(p.name)}</h3><span class="price">${rp(tierOf(p.tier).price)}</span></div><p>${esc(p.desc)}</p>
  ${chips ? `<div class="chips">${p.custom.map(c => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
  <button class="btn" data-go="create" data-product="${p.id}">Select product →</button></article>`;
$("#home-tiers").innerHTML = TIERS.map((t, i) => `<button class="tier" data-go="shop" data-filter="${t.id}"><div class="art">${art(i ? "notebook" : "mirror", i ? "cocoa" : "blush", i ? "Kak Raka" : "N")}</div>
  <div class="b"><span class="big">${t.label}</span><h3 style="font-size:30px">${esc(t.name)}</h3><p style="font-size:14px;color:var(--muted)">${PRODUCTS.filter(p => p.tier === t.id).map(p => p.name).join(", ")}</p><span class="eye" style="color:var(--ink)">Browse ${t.label} →</span></div></button>`).join("");
$("#home-picks").innerHTML = ["keychain", "pouch", "mirror", "frame"].map(id => prodCard(prodOf(id), false)).join("");
$("#shop-list").innerHTML = TIERS.map(t => `<div class="coll" data-tier="${t.id}"><div class="collh"><span class="big">${t.label}</span><div><h2 style="font-size:32px">${esc(t.name)}</h2><p style="color:var(--muted)">${esc(t.blurb)}</p></div><span class="tag" style="margin-left:auto">Choose 1 of 5</span></div>
  <div class="grid">${PRODUCTS.filter(p => p.tier === t.id).map(p => prodCard(p)).join("")}</div></div>`).join("") +
  `<div class="coll" data-tier="soon"><div class="collh"><span class="big">Rp25K+</span><div><h2 style="font-size:32px">The Story Box</h2><p style="color:var(--muted)">Sedang kami siapkan. Belum bisa dipesan.</p></div><span class="tag" style="margin-left:auto">Coming soon</span></div></div>`;
function filterShop(f) { $$(".pill").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === f)); $$(".coll").forEach(c => c.hidden = !(f === "all" || c.dataset.tier === f)); }
$$(".pill").forEach(b => b.onclick = () => filterShop(b.dataset.f));
$("#story-list").innerHTML = STORIES.map(s => { const p = prodOf(s.p); return `<article class="story"><div><div class="art">${art(p.art, s.tone, s.name)}</div><p class="cap">Concept render · ${esc(p.name)}, ${rp(tierOf(p.tier).price)}</p></div>
  <div class="stack" style="gap:24px"><div class="row"><span class="tag">${esc(s.occ)}</span><span class="flag">○ Concept mockup, bukan pesanan asli</span></div>
  <div class="stack" style="gap:8px"><p class="eye">Customer story (contoh)</p><p class="brief">“${esc(s.brief)}”</p></div>
  <div class="cols"><div><h4>Color palette</h4>${s.pal.map(([n, h]) => `<span class="sw"><i style="background:${h}"></i>${n}</span>`).join("")}</div><div><h4>Personalized wording</h4><p class="msg">“${esc(s.msg)}”</p></div>
  <div><h4>Design details</h4><ul class="list">${s.det.map(d => `<li>${esc(d)}</li>`).join("")}</ul></div><div><h4>Final presentation</h4><p>${esc(s.pres)}</p></div></div>
  <div><button class="btn" data-go="create" data-product="${p.id}">Start a gift like this →</button></div></div></article>`; }).join("");
$("#faq-list").innerHTML = FAQ.map(([q, a], i) => `<details${i ? "" : " open"}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
$("#faqWa").href = wa("Halo DEARLY! Saya mau tanya tentang gift.");
$("#contact").innerHTML = `<li><a href="${wa("Halo DEARLY!")}" target="_blank" rel="noopener">WhatsApp${CONFIG.whatsapp ? " +" + esc(CONFIG.whatsapp) : ""}</a></li>` +
  (CONFIG.instagram ? `<li><a href="https://instagram.com/${esc(CONFIG.instagram)}" target="_blank" rel="noopener">Instagram @${esc(CONFIG.instagram)}</a></li>` : `<li style="opacity:.6">Instagram segera hadir</li>`) + `<li style="opacity:.6">Pre-order only</li>`;
$$(".cfg-prod").forEach(e => e.textContent = CONFIG.productionTime); $$(".cfg-min").forEach(e => e.textContent = CONFIG.groupMin);

/* ---------- create flow ---------- */
const S = { step: 1, tier: null, prod: null, add: [], photo: null };
const v = id => ($("#" + id)?.value || "").trim(), picked = n => $$(`input[name="${n}"]:checked`).map(i => i.value);
$("#opt-tier").innerHTML = TIERS.map(t => `<label class="opt"><input type="radio" name="tier" value="${t.id}"><span class="ob" style="padding:22px"><span class="big">${t.label}</span><strong class="msg" style="color:var(--ink);font-size:24px">${esc(t.name)}</strong><span style="font-size:14px;color:var(--muted)">${esc(t.blurb)}</span></span></label>`).join("");
$("#opt-add").innerHTML = ADDONS.map(a => `<label class="add"><input type="checkbox" name="add" value="${a.id}"><div><strong>${esc(a.name)}</strong><small>${esc(a.desc)}</small></div><span class="price">+${rp(a.price)}</span></label>`).join("");
$("#occasion").innerHTML = '<option value="">Pilih…</option>' + OCCASIONS.map(o => `<option>${o}</option>`).join("");
$("#relationship").innerHTML = '<option value="">Pilih…</option>' + RELATIONS.map(o => `<option>${o}</option>`).join("");
$("#opt-color").innerHTML = COLORS.map(([n, h]) => `<label class="c"><input type="checkbox" name="color" value="${n}"><span><i class="dot" style="background:${h}"></i>${n}</span></label>`).join("");
$("#opt-vibe").innerHTML = VIBES.map(x => `<label class="c"><input type="radio" name="vibe" value="${x}"><span>${x}</span></label>`).join("");
const total = () => (tierOf(S.tier)?.price || 0) + S.add.reduce((s, id) => s + ADDONS.find(a => a.id === id).price, 0);
function renderProds() {
  $("#opt-prod").innerHTML = PRODUCTS.filter(p => p.tier === S.tier).map(p => `<label class="opt"><input type="radio" name="prod" value="${p.id}" ${S.prod === p.id ? "checked" : ""}><span class="ob"><span class="art">${art(p.art, p.tone, p.name.split(" ")[0])}</span><span class="tx"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p></span></span></label>`).join("");
}
function side() {
  const t = tierOf(S.tier), p = prodOf(S.prod);
  $("#sideArt").innerHTML = p ? art(p.art, p.tone, v("toName") || p.name.split(" ")[0]) : art("box", "blush");
  $("#sTier").textContent = t ? t.label : "—"; $("#sProd").textContent = p ? p.name : "—"; $("#sTo").textContent = v("toName") || "—"; $("#sTot").textContent = rp(total());
}
function mark(el, bad) { const w = el.closest(".f,fieldset") || el; w.classList.toggle("bad", bad); return bad; }
function valid(step) {
  const bad = [];
  if (step === 1 && mark($("#fs-tier"), !S.tier)) bad.push($("#fs-tier"));
  if (step === 2 && mark($("#fs-prod"), !S.prod)) bad.push($("#fs-prod"));
  if (step === 3) {
    ["toName", "fromName", "occasion", "relationship", "personality"].forEach(id => { if (mark($("#" + id), !v(id))) bad.push($("#" + id)); });
    if (mark($("#fs-vibe"), !picked("vibe").length)) bad.push($("#fs-vibe"));
    if (mark($("#wording"), !v("wording") && !$("#letUs").checked)) bad.push($("#wording"));
    if (mark($("#fs-del"), !picked("del").length)) bad.push($("#fs-del"));
  }
  $("#fst").textContent = bad.length ? "Ada yang belum diisi. Cek kolom bertanda merah." : "";
  if (bad.length) bad[0].scrollIntoView({ behavior: "smooth", block: "center" });
  return !bad.length;
}
function show(n) {
  S.step = n;
  $$(".panel").forEach(p => p.hidden = +p.dataset.step !== n);
  $$("#prog li").forEach((li, i) => { li.className = i + 1 === n ? "cur" : i + 1 < n ? "done" : ""; });
  if (n === 2) renderProds(); if (n === 4) review(); if (n === 5) message();
  side(); $("#create").scrollIntoView({ block: "start" });
}
function startCreate(pid) {
  const p = prodOf(pid);
  if (p) { S.tier = p.tier; S.prod = p.id; $(`input[name=tier][value="${p.tier}"]`).checked = true; show(3); }
  else show(S.step || 1);
}
const fdate = d => new Date(d + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
function review() {
  const t = tierOf(S.tier), p = prodOf(S.prod), col = picked("color").concat(v("colorOther") ? [v("colorOther")] : []);
  const B = (h, s, x) => `<div class="rb"><h4>${h}<button type="button" data-goto="${s}">Edit</button></h4>${x ? `<p>${esc(x)}</p>` : '<p class="em">Tidak diisi</p>'}</div>`;
  $("#review").innerHTML = `<div class="row" style="justify-content:space-between;align-items:end"><div class="tofrom"><small>TO</small>${esc(v("toName"))}<br><small>FROM</small>${esc(v("fromName"))}</div><span class="tag">${esc(v("occasion"))}</span></div>
  <div class="rg">${B("Budget", 1, t.label + " · " + t.name)}${B("Product", 2, p.name)}${B("Relationship", 3, v("relationship"))}${B("In three words", 3, v("personality"))}
  ${B("What makes them special", 3, v("special"))}${B("A little thing", 3, v("littleThing"))}${B("Inside joke", 3, v("insideJoke"))}${B("Colors & vibe", 3, (col.join(", ") || "Bebas") + " · " + picked("vibe")[0])}
  ${B("Wording", 3, v("wording") || "Serahkan ke DEARLY")}${B("Photo", 3, S.photo ? "Ada, dikirim manual di WhatsApp" : "")}${B("Needed by & delivery", 3, [v("neededBy") && fdate(v("neededBy")), picked("del")[0]].filter(Boolean).join(" · "))}${B("Notes", 3, v("notes"))}</div>`;
  totals();
}
function totals() {
  const t = tierOf(S.tier);
  $("#lines").innerHTML = `<dt>${t.label} · ${esc(prodOf(S.prod).name)}</dt><dd>${rp(t.price)}</dd>` + S.add.map(id => { const a = ADDONS.find(x => x.id === id); return `<dt>${a.name}</dt><dd>${rp(a.price)}</dd>`; }).join("");
  $("#rtot").textContent = rp(total()); side();
}
function message() {
  const t = tierOf(S.tier), p = prodOf(S.prod), col = picked("color").concat(v("colorOther") ? [v("colorOther")] : []), del = picked("del")[0];
  const L = ["Halo DEARLY! Saya mau order personalized gift.", "", "*ORDER*", `Budget: ${t.label} (${t.name})`, `Produk: ${p.name}`, "",
    "*UNTUK SIAPA*", `Nama penerima: ${v("toName")}`, `Occasion: ${v("occasion")}`, `Hubungan: ${v("relationship")}`, `Dalam 3 kata: ${v("personality")}`];
  if (v("special")) L.push(`Yang bikin dia spesial: ${v("special")}`);
  if (v("littleThing")) L.push(`Hal kecil tentang dia: ${v("littleThing")}`);
  if (v("insideJoke")) L.push(`Inside joke: ${v("insideJoke")}`);
  L.push("", "*PREFERENSI DESAIN*", `Warna: ${col.join(", ") || "Bebas"}`, `Vibe: ${picked("vibe")[0]}`,
    `Wording: ${v("wording") ? v("wording") + ($("#letUs").checked ? " (boleh dirapikan)" : "") : "Serahkan ke DEARLY"}`,
    `Foto: ${S.photo ? "Ada, akan saya kirim di chat ini" : "Tidak ada"}`, "", "*DETAIL LAIN*",
    `Add-on: ${S.add.length ? S.add.map(id => ADDONS.find(a => a.id === id).name).join(", ") : "Tidak ada"}`);
  if (v("neededBy")) L.push(`Dibutuhkan tanggal: ${fdate(v("neededBy"))}`);
  L.push(`Pengambilan: ${del}`);
  if (v("notes")) L.push(`Catatan: ${v("notes")}`);
  L.push("", `*Estimasi total: ${rp(total())}*${del.startsWith("Dikirim") ? " (belum termasuk ongkir)" : ""}`, "", `Dari: ${v("fromName")}`, "", "Mohon konfirmasi ketersediaan dan detail pembayarannya ya. Terima kasih!");
  const msg = L.join("\n");
  $("#wam").value = msg; $("#waBtn").href = wa(msg);
  $("#photoWarn").hidden = !S.photo; $("#numWarn").hidden = CONFIG.whatsapp.replace(/\D/g, "").length >= 9;
  $("#waBtn").setAttribute("aria-disabled", !$("#ok").checked);
}
$("#cf").addEventListener("change", e => {
  const t = e.target;
  if (t.name === "tier") { if (S.tier !== t.value) S.prod = null; S.tier = t.value; mark($("#fs-tier"), false); }
  if (t.name === "prod") { S.prod = t.value; mark($("#fs-prod"), false); }
  if (t.name === "add") { S.add = picked("add"); totals(); }
  if (t.id === "ok") { mark(t, false); $("#waBtn").setAttribute("aria-disabled", !t.checked); }
  if (["vibe", "del"].includes(t.name) || t.id === "letUs") mark(t, false);
  side();
});
$("#cf").addEventListener("input", e => { if (e.target.value?.trim()) mark(e.target, false); if (e.target.id === "toName") side(); });
$("#cf").addEventListener("click", e => {
  if (e.target.closest("[data-next]")) { if (valid(S.step)) show(S.step + 1); }
  if (e.target.closest("[data-back]")) show(S.step - 1);
  const g = e.target.closest("[data-goto]"); if (g) show(+g.dataset.goto);
});
$("#cf").addEventListener("submit", e => e.preventDefault());
$("#photo").onchange = () => {
  const f = $("#photo").files[0]; $("#pe").textContent = ""; if (!f) return;
  if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { $("#pe").textContent = "Gunakan JPG, PNG, atau WEBP."; $("#photo").value = ""; return; }
  if (f.size > 10e6) { $("#pe").textContent = "Maksimal 10 MB."; $("#photo").value = ""; return; }
  const r = new FileReader(); r.onload = () => { S.photo = r.result; $("#pv").src = r.result; $("#pv").hidden = $("#prm").hidden = false; $("#pn").textContent = f.name; }; r.readAsDataURL(f);
};
$("#prm").onclick = () => { S.photo = null; $("#photo").value = ""; $("#pv").hidden = $("#prm").hidden = true; $("#pn").textContent = ""; };
$("#waBtn").onclick = e => { if (!$("#ok").checked) { e.preventDefault(); mark($("#ok"), true); } else $("#sst").textContent = "WhatsApp dibuka di tab baru. Tekan kirim di sana."; };
$("#copyBtn").onclick = async () => { try { await navigator.clipboard.writeText($("#wam").value); $("#sst").textContent = "Pesan disalin."; } catch (_) { $("#wam").select(); $("#sst").textContent = "Pesan dipilih, tekan Ctrl/Cmd + C."; } };
$("#reset").onclick = () => { $("#cf").reset(); Object.assign(S, { tier: null, prod: null, add: [], photo: null }); $("#pv").hidden = $("#prm").hidden = true; show(1); };

/* ---------- group calculator ---------- */
const gq = $("#gQty"), gr = $("#gRange");
gq.min = gr.min = CONFIG.groupMin; gq.max = gr.max = 200;
$("#gTier").innerHTML = TIERS.map(t => `<option value="${t.id}">${t.label} · ${t.name}</option>`).join(""); $("#gTier").value = "15";
$("#gOcc").innerHTML = ["Farewell", "Graduation / Wisuda", "Demisioner", "Committee appreciation", "KKN", "Internship / Magang", "Class gift", "Lainnya"].map(o => `<option>${o}</option>`).join("");
$("#gAdd").innerHTML = ADDONS.map(a => `<label class="add"><input type="checkbox" name="gadd" value="${a.id}"><div><strong>${a.name}</strong></div><span class="price">+${rp(a.price)}</span></label>`).join("");
const clamp = x => Math.max(CONFIG.groupMin, Math.min(200, parseInt(x, 10) || CONFIG.groupMin));
function calc() {
  const q = clamp(gq.value), t = tierOf($("#gTier").value), adds = picked("gadd").map(id => ADDONS.find(a => a.id === id));
  const per = t.price + adds.reduce((s, a) => s + a.price, 0), tot = per * q;
  $("#gEq").textContent = `${q} orang × ${rp(per)}`; $("#gTot").textContent = rp(tot);
  $("#gLines").innerHTML = `<dt>Gift ${t.label} × ${q}</dt><dd>${rp(t.price * q)}</dd>` + adds.map(a => `<dt>${a.name} × ${q}</dt><dd>${rp(a.price * q)}</dd>`).join("");
  $("#gWa").href = wa(["Halo DEARLY! Saya mau tanya group order.", "", `Occasion: ${$("#gOcc").value}`, v("gOrg") && `Organisasi: ${v("gOrg")}`, `Jumlah: ${q} pcs`, `Tier: ${t.label} (${t.name})`,
    `Add-on: ${adds.length ? adds.map(a => a.name).join(", ") : "Tidak ada"}`, v("gDate") && `Dibutuhkan: ${fdate(v("gDate"))}`, "", `Estimasi: ${q} × ${rp(per)} = ${rp(tot)}`].filter(Boolean).join("\n"));
}
gq.oninput = () => { if (gq.value) gr.value = clamp(gq.value); calc(); };
gq.onblur = () => { gq.value = clamp(gq.value); calc(); };
gr.oninput = () => { gq.value = gr.value; calc(); };
$("#gm").onclick = () => { gq.value = gr.value = clamp(+gq.value - 1); calc(); };
$("#gp").onclick = () => { gq.value = gr.value = clamp(+gq.value + 1); calc(); };
$("#gf").addEventListener("input", calc); $("#gf").addEventListener("change", calc); $("#gf").addEventListener("submit", e => e.preventDefault());

drawArt(); calc(); go("home");
