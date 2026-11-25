/* Komponen bersama DEARLY: top bar, navbar, dan footer untuk semua halaman.
   Cara pakai di HTML:
     <header id="navbar"></header>   di awal <body>
     <footer id="footer"></footer>   di akhir <body>
     <script src="js/components.js"></script> sebelum js/app.js
   Markup sama persis dengan kode asli. */

(function () {
  var TOPBAR_HTML = "<div class=\"top\">Pre-order · Personalized gifts from Rp10K · Group orders welcome</div>";
  var NAVBAR_HTML = "<div class=\"wrap nav\">\n  <button class=\"logo\" data-go=\"home\">DEARLY</button>\n  <ul class=\"links\" id=\"links\">\n    <li><button data-go=\"home\">Home</button></li><li><button data-go=\"shop\">Shop Gifts</button></li>\n    <li><button data-go=\"how\">How It Works</button></li><li><button data-go=\"stories\">Gift Stories</button></li>\n    <li><button data-go=\"group\">Group Gifting</button></li><li><button data-go=\"about\">About</button></li>\n    <li><button data-go=\"faq\">FAQ</button></li>\n  </ul>\n  <button class=\"btn pri navcta\" data-go=\"create\">Create your gift</button>\n  <button class=\"burger\" id=\"burger\" aria-label=\"Menu\" aria-expanded=\"false\">☰</button>\n</div>";
  var FOOTER_HTML = "<div class=\"wrap\">\n  <div class=\"g\">\n    <div><div style=\"font:600 30px var(--fd);letter-spacing:.32em\">DEARLY</div><p style=\"font:italic 500 24px/1.2 var(--fd);margin-top:10px\">Made with someone in mind.</p></div>\n    <div><h4>Explore</h4><ul><li><button data-go=\"create\">Create your gift</button></li><li><button data-go=\"shop\">Shop gifts</button></li><li><button data-go=\"group\">Group gifting</button></li><li><button data-go=\"faq\">FAQ</button></li></ul></div>\n    <div><h4>Say hello</h4><ul id=\"contact\"></ul></div>\n  </div>\n  <div class=\"fb\"><span>© 2026 DEARLY. Choose the gift. Tell us the story. We make it yours.</span><span>Harga adalah estimasi awal dan bisa berubah.</span></div>\n</div>";

  var nav = document.getElementById("navbar");
  if (nav) {
    nav.insertAdjacentHTML("beforebegin", TOPBAR_HTML);
    nav.innerHTML = NAVBAR_HTML;
  }
  var foot = document.getElementById("footer");
  if (foot) foot.innerHTML = FOOTER_HTML;
})();
