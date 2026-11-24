/* =========================================================
   PIRING KOS · data.js
   Semua data konten ada di sini supaya gampang diubah:
   gaya diet, resep gratis, menu 7 hari, daftar belanja, dan paket.
   Harga dan kalori adalah PERKIRAAN, sesuaikan dengan harga di sekitar kos.

   Catatan untuk halaman resep.html (Shaula):
   - Resep gratis ada di DIETS[i].resep
   - Baca parameter ?diet=<id> dari URL untuk membuka gaya diet tertentu
   - Pakai dietById(id) dan ikon dari icon(d.ikon)
   ========================================================= */

const PAKET = {
  hari1:   { nama: "Menu Siap 1 Hari",   harga: 5000,  satuan: "hari" },
  minggu1: { nama: "Menu Siap 1 Minggu", harga: 12000, satuan: "minggu" },
  minggu4: { nama: "Menu Siap 4 Minggu", harga: 40000, satuan: "4 minggu" },
  custom:  { nama: "Menu Custom",        harga: 12000, satuan: "minggu" }
};

const DIETS = [
  {
    id: "seimbang", nama: "Gizi Seimbang", ikon: "seimbang", singkat: "Ala Isi Piringku",
    info: "Mengikuti pedoman Isi Piringku dari Kemenkes: setengah piring sayur dan buah, setengahnya lagi karbohidrat dan lauk dengan porsi secukupnya. Paling aman untuk mulai hidup sehat.",
    resep: [
      { nama: "Nasi Tim Ayam Sayur Rice Cooker", kkal: 450, harga: 11000, waktu: "35 menit", alat: "Rice cooker",
        bahan: ["1 cup beras", "100 g dada ayam, potong dadu", "1 wortel, potong dadu", "Segenggam buncis, potong kecil", "2 siung bawang putih, cincang", "1 sdm kecap asin, garam, merica"],
        langkah: ["Cuci beras, masukkan ke rice cooker dengan air seperti biasa.", "Tumis sebentar bawang putih dan ayam pakai sedikit minyak (atau langsung campur kecap asin dan merica kalau nggak punya kompor).", "Masukkan ayam, wortel, dan buncis di atas beras, beri garam secukupnya.", "Masak seperti menanak nasi. Setelah matang, aduk rata dan diamkan 5 menit."] },
      { nama: "Pecel Sayur + Telur Rebus", kkal: 480, harga: 9000, waktu: "20 menit", alat: "Panci / rice cooker",
        bahan: ["Segenggam kangkung atau bayam", "Segenggam tauge", "Kacang panjang secukupnya", "1 butir telur", "2 sdm bumbu pecel instan", "Nasi secukupnya"],
        langkah: ["Rebus telur sekitar 10 menit, angkat.", "Rebus sayuran sebentar (1–3 menit) supaya tetap renyah, tiriskan.", "Seduh bumbu pecel dengan sedikit air panas sampai kental.", "Tata nasi, sayur, dan telur, lalu siram bumbu pecel."] },
      { nama: "Sayur Sop + Tempe Panggang", kkal: 460, harga: 10000, waktu: "30 menit", alat: "Panci + teflon",
        bahan: ["1 wortel", "¼ buah kol", "1 kentang kecil", "Seledri dan daun bawang", "½ papan tempe", "Bawang putih, garam, merica"],
        langkah: ["Rebus air, masukkan bawang putih geprek, wortel, dan kentang sampai setengah empuk.", "Masukkan kol, seledri, dan daun bawang. Bumbui garam dan merica.", "Iris tempe, beri garam dan bawang putih, panggang di teflon dengan sedikit minyak sampai kecokelatan.", "Sajikan sop dan tempe dengan nasi secukupnya."] },
      { nama: "Pasta Rice Cooker Ayam Sayur", kkal: 520, kekinian: true, harga: 12000, waktu: "30 menit", alat: "Rice cooker",
        bahan: ["80 g pasta (spaghetti dipatah dua atau fusilli)", "80 g dada ayam, potong dadu", "Segenggam brokoli dan wortel", "1 tomat + 2 sdm saus tomat", "2 siung bawang putih cincang", "250 ml air, garam, merica, oregano (opsional)"],
        langkah: ["Masukkan pasta, ayam, wortel, tomat, saus tomat, bawang putih, dan air ke rice cooker.", "Bumbui garam dan merica, aduk rata supaya pasta terendam.", "Tekan tombol masak. Saat pindah ke mode warm, masukkan brokoli.", "Tutup lagi 5 menit, aduk, taburi oregano."] },
      { nama: "Chicken Teriyaki Rice Bowl", kkal: 550, kekinian: true, harga: 13000, waktu: "25 menit", alat: "Teflon",
        bahan: ["1 porsi nasi", "100 g dada ayam, iris tipis", "2 sdm saus teriyaki (atau 1 sdm kecap manis + 1 sdm kecap asin + sedikit jahe)", "Timun dan wortel serut", "Wijen sangrai (opsional)"],
        langkah: ["Tumis ayam dengan sedikit minyak sampai berubah warna.", "Masukkan saus teriyaki dan 2 sdm air, masak sampai mengental.", "Tata nasi di mangkuk, beri ayam teriyaki di atasnya.", "Tambahkan timun dan wortel, taburi wijen."] }
    ],
    menu: [
      ["Nasi + telur dadar + tumis sayur", "Nasi tim ayam sayur", "Nasi + sayur sop + tempe panggang"],
      ["Roti gandum + telur rebus + pisang", "Pecel sayur + telur rebus", "Nasi + pepes tahu jamur + bayam bening"],
      ["Oatmeal + pisang", "Chicken teriyaki rice bowl", "Nasi + capcay kuah"],
      ["Nasi + tempe bacem + lalapan", "Nasi + sayur sop + tahu", "Nasi + telur ceplok + tumis kangkung"],
      ["Roti gandum + selai kacang + pisang", "Nasi tim ayam sayur", "Nasi + tumis tahu tempe + sayur bening"],
      ["Nasi + omelet sayur", "Gado-gado rumahan + nasi sedikit", "Pasta rice cooker ayam sayur"],
      ["Oatmeal + telur rebus", "Pecel sayur + tempe panggang", "Nasi + sup ayam sayur bening"]
    ],
    belanja: [["Beras 1,5 kg", 20000], ["Telur 1 kg", 28000], ["Dada ayam 500 g", 25000], ["Tahu dan tempe", 25000], ["Sayur campur (bayam, kangkung, wortel, kol, buncis)", 35000], ["Buah (pisang, jeruk)", 20000], ["Oat dan roti gandum", 25000], ["Bumbu dasar dan bumbu pecel", 15000], ["Pasta 250 g dan saus teriyaki", 15000]]
  },
  {
    id: "defisit", nama: "Defisit Kalori", ikon: "defisit", singkat: "Porsi terukur",
    info: "Intinya mengatur porsi: nasi lebih sedikit, sayur lebih banyak, dan lebih sering dikukus, direbus, atau dipanggang daripada digoreng. Makanannya tetap makanan sehari-hari.",
    resep: [
      { nama: "Sup Ayam Sayur Bening", kkal: 320, harga: 10000, waktu: "30 menit", alat: "Panci / rice cooker",
        bahan: ["100 g dada ayam", "1 wortel", "Segenggam brokoli atau kol", "Daun bawang dan seledri", "2 siung bawang putih", "Garam dan merica"],
        langkah: ["Rebus dada ayam dengan bawang putih geprek sampai matang, lalu suwir.", "Masukkan wortel ke kaldu, masak sampai setengah empuk.", "Tambahkan brokoli atau kol, daun bawang, dan seledri.", "Bumbui garam dan merica, masukkan lagi ayam suwir. Sajikan dengan setengah porsi nasi."] },
      { nama: "Pepes Tahu Jamur Kukus Rice Cooker", kkal: 220, harga: 8000, waktu: "30 menit", alat: "Rice cooker (dengan saringan kukus)",
        bahan: ["1 tahu putih besar", "Segenggam jamur tiram, suwir", "1 butir telur", "Bawang merah, bawang putih, cabai sesuai selera", "Daun bawang", "Daun pisang atau aluminium foil"],
        langkah: ["Hancurkan tahu, campur dengan telur, jamur, dan daun bawang.", "Haluskan atau cincang halus bawang dan cabai, campurkan ke adonan, beri garam.", "Bungkus adonan dengan daun pisang atau foil.", "Kukus di rice cooker sekitar 20–25 menit sampai padat."] },
      { nama: "Tumis Buncis Telur", kkal: 300, harga: 7000, waktu: "15 menit", alat: "Teflon",
        bahan: ["Segenggam buncis, iris serong", "1 butir telur", "2 siung bawang putih", "1 sdt kecap asin", "Sedikit minyak"],
        langkah: ["Tumis bawang putih dengan sedikit minyak sampai harum.", "Masukkan telur, orak-arik sebentar.", "Masukkan buncis dan sedikit air, masak sampai buncis matang tapi tetap renyah.", "Bumbui kecap asin. Sajikan dengan setengah porsi nasi."] },
      { nama: "Salad Ayam Saus Wijen", kkal: 280, kekinian: true, harga: 12000, waktu: "20 menit", alat: "Panci / teflon",
        bahan: ["100 g dada ayam", "Selada atau kol ungu secukupnya", "1 timun, 1 tomat, ½ wortel", "Saus: 1 sdm kecap asin, 1 sdt minyak wijen, perasan jeruk nipis, ½ sdt madu", "Wijen sangrai"],
        langkah: ["Rebus atau panggang ayam tanpa banyak minyak, lalu iris tipis.", "Potong-potong semua sayur, tata di mangkuk.", "Campur semua bahan saus.", "Letakkan ayam di atas sayur, siram saus, taburi wijen."] },
      { nama: "Sup Makaroni Sayur", kkal: 300, kekinian: true, harga: 8000, waktu: "25 menit", alat: "Panci / rice cooker",
        bahan: ["40 g makaroni", "1 wortel, potong dadu", "¼ kol, iris", "50 g ayam suwir atau 1 tahu potong dadu", "Bawang putih, seledri, daun bawang", "Garam dan merica"],
        langkah: ["Rebus air dengan bawang putih geprek.", "Masukkan makaroni dan wortel, masak 8 menit.", "Tambahkan kol, ayam atau tahu, seledri, dan daun bawang.", "Bumbui garam dan merica. Makaroni sudah jadi karbo, jadi nggak perlu nasi."] }
    ],
    menu: [
      ["2 telur rebus + jeruk", "Nasi ½ porsi + sup ayam sayur bening", "Pepes tahu jamur + tumis buncis"],
      ["Oatmeal + pisang", "Salad ayam saus wijen", "Sayur sop + tahu kukus"],
      ["1 lembar roti gandum + telur rebus", "Nasi ½ porsi + pepes tahu jamur + lalapan", "Ayam panggang teflon + tumis kangkung"],
      ["Telur rebus + pepaya", "Nasi ½ porsi + sayur bening + tempe kukus", "Omelet sayur"],
      ["Oatmeal + buah", "Sup makaroni sayur", "Capcay kuah + tahu"],
      ["Telur dadar sayur (sedikit minyak)", "Nasi ½ porsi + pecel sayur + telur", "Pepes tahu jamur + sayur bening"],
      ["Roti gandum + pisang", "Nasi ½ porsi + ayam suwir + timun", "Sup ayam sayur bening"]
    ],
    belanja: [["Beras 1 kg", 13000], ["Telur 1 kg", 28000], ["Dada ayam 500 g", 25000], ["Tahu dan tempe", 20000], ["Jamur tiram 250 g", 10000], ["Sayur campur", 35000], ["Buah (pisang, jeruk, pepaya)", 25000], ["Oat dan roti gandum", 25000], ["Bumbu dasar", 15000], ["Makaroni, selada, minyak wijen", 15000]]
  },
  {
    id: "lowcarb", nama: "Rendah Karbo", ikon: "lowcarb", singkat: "Kurangi nasi & gula",
    info: "Nasi, roti, mie, dan gula dikurangi, lalu diganti protein (telur, ayam, tahu, tempe) dan sayur yang lebih banyak. Karbohidrat tetap ada, cuma porsinya kecil.",
    resep: [
      { nama: "Omelet Sayur Jamur", kkal: 250, harga: 8000, waktu: "15 menit", alat: "Teflon",
        bahan: ["2 butir telur", "Segenggam jamur tiram, suwir", "Segenggam bayam atau sawi", "1 tomat kecil, potong dadu", "Daun bawang, garam, merica"],
        langkah: ["Kocok telur dengan garam dan merica.", "Tumis jamur dan sayur sebentar di teflon sampai layu.", "Tuang telur di atas sayur, ratakan, taburi tomat dan daun bawang.", "Masak dengan api kecil sampai matang, lipat dua."] },
      { nama: "Ayam Panggang Teflon + Tumis Kangkung", kkal: 350, harga: 13000, waktu: "30 menit", alat: "Teflon",
        bahan: ["150 g dada ayam, iris tipis melebar", "1 sdm kecap manis, 1 siung bawang putih parut, garam, merica", "1 ikat kangkung", "Bawang merah, bawang putih, cabai sesuai selera"],
        langkah: ["Marinasi ayam dengan bawang putih, kecap, garam, dan merica minimal 10 menit.", "Panggang ayam di teflon dengan sedikit minyak, 4–5 menit tiap sisi.", "Di teflon yang sama, tumis bawang dan cabai, masukkan kangkung, masak cepat dengan api besar.", "Sajikan ayam dengan kangkung, nasi cukup ¼ porsi atau tanpa nasi."] },
      { nama: "Tahu Telur Kukus", kkal: 260, harga: 6000, waktu: "25 menit", alat: "Rice cooker (dengan saringan kukus)",
        bahan: ["1 tahu putih", "2 butir telur", "Daun bawang dan wortel parut", "Garam, merica, sedikit kecap asin"],
        langkah: ["Hancurkan tahu, campur dengan telur, daun bawang, dan wortel.", "Bumbui garam, merica, dan kecap asin.", "Tuang ke mangkuk tahan panas.", "Kukus di rice cooker sekitar 20 menit sampai set."] },
      { nama: "Pizza Omelet Teflon", kkal: 320, kekinian: true, harga: 10000, waktu: "15 menit", alat: "Teflon",
        bahan: ["2 butir telur", "2 sdm saus tomat atau saus pizza", "1 sdm keju parut", "Topping: tomat, jamur, paprika atau ayam suwir", "Oregano dan merica"],
        langkah: ["Kocok telur dengan sedikit garam, tuang ke teflon api kecil sampai jadi 'adonan' tipis.", "Saat bagian atas hampir set, olesi saus tomat.", "Tata topping dan taburi keju serta oregano.", "Tutup teflon 2–3 menit sampai keju meleleh, potong seperti pizza."] },
      { nama: "Mie Shirataki Goreng Sayur", kkal: 220, kekinian: true, harga: 14000, waktu: "15 menit", alat: "Teflon",
        bahan: ["½ bungkus mie shirataki", "1 butir telur", "Sawi dan kol secukupnya", "2 siung bawang putih", "1 sdm kecap asin, sedikit kecap manis", "Cabai rawit (opsional)"],
        langkah: ["Cuci shirataki dengan air mengalir, rebus sebentar, tiriskan.", "Tumis bawang putih, masukkan telur dan orak-arik.", "Masukkan sayur dan shirataki.", "Bumbui kecap asin dan sedikit kecap manis, aduk sampai rata."] }
    ],
    menu: [
      ["Omelet sayur jamur", "Ayam panggang teflon + tumis kangkung", "Tahu telur kukus + sayur bening"],
      ["2 telur rebus + timun", "Nasi ¼ porsi + ayam suwir kecap + capcay", "Sup ayam sayur (tanpa kentang)"],
      ["Tahu telur kukus", "Tempe bacem + tumis buncis", "Omelet sayur + lalapan"],
      ["Telur dadar + tomat", "Ayam panggang teflon + tumis kol", "Pizza omelet teflon + lalapan"],
      ["Omelet jamur", "Nasi ¼ porsi + tumis tahu tempe + sayur", "Sayur sop (tanpa kentang) + telur"],
      ["Telur rebus + jeruk", "Mie shirataki goreng sayur + ayam suwir", "Tahu telur kukus + tumis kangkung"],
      ["Omelet sayur", "Ayam panggang teflon + lalapan + sambal", "Sup ayam sayur bening"]
    ],
    belanja: [["Telur 1,5 kg", 42000], ["Dada ayam 1 kg", 50000], ["Tahu dan tempe", 25000], ["Jamur tiram 250 g", 10000], ["Sayur campur", 40000], ["Beras 500 g", 7000], ["Buah (jeruk)", 15000], ["Bumbu dasar", 15000], ["Mie shirataki, keju, saus tomat", 25000]]
  },
  {
    id: "protein", nama: "Tinggi Protein", ikon: "protein", singkat: "Buat yang rutin olahraga",
    info: "Setiap kali makan ada sumber protein yang jelas: telur, ayam, tahu, atau tempe. Cocok untuk yang rutin olahraga atau nge-gym, dan untungnya sumber protein ini termasuk murah.",
    resep: [
      { nama: "Ayam Suwir Kecap Rice Cooker", kkal: 480, harga: 12000, waktu: "35 menit", alat: "Rice cooker",
        bahan: ["200 g dada ayam", "2 sdm kecap manis", "3 siung bawang putih, 3 bawang merah, iris", "Cabai sesuai selera", "Garam, merica, sedikit air"],
        langkah: ["Masukkan ayam, bawang, kecap, garam, merica, dan ½ gelas air ke rice cooker.", "Tekan tombol masak. Tunggu sampai pindah ke mode warm (sekitar 25 menit).", "Angkat ayam, suwir pakai dua garpu.", "Campur lagi dengan sisa bumbu. Bisa untuk 2 kali makan."] },
      { nama: "Oat Telur Gurih", kkal: 250, harga: 6000, waktu: "10 menit", alat: "Panci / microwave",
        bahan: ["4 sdm oat", "1 butir telur", "1 gelas air", "Daun bawang", "Sedikit kecap asin, garam, merica", "Bawang goreng (opsional)"],
        langkah: ["Masak oat dengan air sampai mengental seperti bubur.", "Masukkan telur, aduk cepat supaya jadi serat-serat.", "Bumbui kecap asin, garam, dan merica.", "Taburi daun bawang dan bawang goreng."] },
      { nama: "Tempe Bacem Teflon", kkal: 420, harga: 6000, waktu: "30 menit", alat: "Teflon / panci",
        bahan: ["1 papan tempe, potong-potong", "2 sdm kecap manis", "1 sdm gula merah", "Bawang putih, bawang merah, ketumbar bubuk", "Daun salam, lengkuas, 1 gelas air"],
        langkah: ["Rebus tempe dengan semua bumbu dan air sampai airnya habis dan meresap.", "Panggang di teflon dengan sedikit minyak sampai kecokelatan.", "Sisanya simpan di wadah tertutup untuk lauk besok.", "Sajikan dengan nasi dan sayur."] },
      { nama: "Pasta Tuna Saus Tomat", kkal: 520, kekinian: true, harga: 13000, waktu: "20 menit", alat: "Panci + teflon",
        bahan: ["80 g pasta", "½ kaleng tuna (air, bukan minyak)", "1 tomat + 2 sdm saus tomat", "Segenggam bayam", "2 siung bawang putih", "Garam, merica, cabai bubuk (opsional)"],
        langkah: ["Rebus pasta sampai matang, tiriskan, sisakan sedikit air rebusannya.", "Tumis bawang putih, masukkan tomat dan saus tomat.", "Masukkan tuna dan bayam, beri sedikit air rebusan pasta.", "Masukkan pasta, aduk rata, bumbui garam dan merica."] },
      { nama: "Chicken Wrap Tortilla", kkal: 420, kekinian: true, harga: 13000, waktu: "15 menit", alat: "Teflon",
        bahan: ["1 lembar tortilla", "80 g ayam panggang atau ayam suwir", "1 butir telur", "Selada, timun, tomat", "1 sdm saus sambal atau mayones"],
        langkah: ["Dadar telur tipis di teflon.", "Hangatkan tortilla sebentar di teflon.", "Tata telur dadar, ayam, dan sayur di tengah tortilla, beri saus.", "Gulung rapat, panggang sebentar sisi sambungannya, potong dua."] }
    ],
    menu: [
      ["Oat telur gurih", "Nasi + ayam suwir kecap + sayur", "Nasi + tempe bacem + telur rebus"],
      ["3 telur rebus + pisang", "Nasi + tumis tahu tempe + sayur", "Nasi + ayam panggang teflon + tumis buncis"],
      ["Oat telur gurih", "Pasta tuna saus tomat", "Nasi + pepes tahu jamur + telur dadar"],
      ["Roti gandum + telur orak-arik", "Nasi + tempe bacem + sayur sop", "Nasi + ayam panggang teflon + tumis kangkung"],
      ["Oatmeal susu + pisang", "Nasi + tahu telur kukus + sayur", "Nasi + ayam suwir kecap + lalapan"],
      ["3 telur rebus + roti gandum", "Chicken wrap tortilla", "Nasi + sup ayam sayur bening"],
      ["Oat telur gurih", "Nasi + ayam panggang teflon + tumis kol", "Nasi + tumis tahu tempe + telur"]
    ],
    belanja: [["Beras 1,5 kg", 20000], ["Telur 1,5 kg", 42000], ["Dada ayam 1 kg", 50000], ["Tahu dan tempe", 30000], ["Oat dan roti gandum", 25000], ["Susu UHT 1 liter", 18000], ["Sayur campur", 30000], ["Buah (pisang)", 15000], ["Bumbu dasar", 15000], ["Pasta, tuna kaleng, tortilla", 30000]]
  },
  {
    id: "vegetarian", nama: "Vegetarian", ikon: "vegetarian", singkat: "Tanpa daging",
    info: "Tanpa daging dan ikan. Protein didapat dari tahu, tempe, kacang-kacangan, telur, dan susu. Cocok juga buat yang mau hemat, karena protein nabati lebih murah.",
    resep: [
      { nama: "Tumis Tahu Tempe Kecap", kkal: 450, harga: 8000, waktu: "20 menit", alat: "Teflon",
        bahan: ["½ papan tempe dan 1 tahu, potong dadu", "2 sdm kecap manis", "Bawang merah, bawang putih, cabai", "1 tomat", "Daun bawang"],
        langkah: ["Panggang tahu dan tempe di teflon dengan sedikit minyak sampai kecokelatan, sisihkan.", "Tumis bawang dan cabai sampai harum, masukkan tomat.", "Masukkan tahu, tempe, kecap, dan sedikit air.", "Masak sampai bumbu meresap, taburi daun bawang."] },
      { nama: "Capcay Kuah Sederhana", kkal: 200, harga: 9000, waktu: "20 menit", alat: "Panci / teflon dalam",
        bahan: ["1 wortel", "¼ kol", "Sawi hijau", "Segenggam jamur tiram", "1 butir telur (opsional)", "Bawang putih, saus tiram vegetarian atau kecap asin, garam"],
        langkah: ["Tumis bawang putih sampai harum.", "Masukkan wortel dan jamur, lalu tuang 1 gelas air.", "Masukkan kol dan sawi, kocok telur dan masukkan sambil diaduk.", "Bumbui saus tiram atau kecap asin dan garam, masak sebentar sampai sayur layu."] },
      { nama: "Gado-Gado Rumahan", kkal: 450, harga: 10000, waktu: "25 menit", alat: "Panci / rice cooker",
        bahan: ["Kol, tauge, kacang panjang", "1 kentang kecil", "½ papan tempe dan 1 tahu", "1 butir telur", "3 sdm bumbu kacang instan", "Kerupuk (opsional)"],
        langkah: ["Rebus kentang dan telur sampai matang.", "Rebus sayuran sebentar, tiriskan.", "Panggang tahu dan tempe di teflon.", "Seduh bumbu kacang dengan air panas, siramkan di atas semua bahan."] },
      { nama: "Aglio Olio Brokoli Jamur", kkal: 450, kekinian: true, harga: 9000, waktu: "20 menit", alat: "Panci + teflon",
        bahan: ["80 g spaghetti", "4 siung bawang putih, iris tipis", "Segenggam brokoli", "Segenggam jamur tiram", "1 sdm minyak zaitun atau minyak goreng", "Cabai kering, garam, keju parut (opsional)"],
        langkah: ["Rebus spaghetti sampai matang, sisakan sedikit air rebusan.", "Tumis bawang putih dan cabai kering dengan minyak sampai harum (jangan sampai gosong).", "Masukkan jamur dan brokoli, beri sedikit air rebusan pasta.", "Masukkan spaghetti, bumbui garam, aduk rata, taburi keju."] },
      { nama: "Wrap Tortilla Telur Sayur", kkal: 330, kekinian: true, harga: 8000, waktu: "15 menit", alat: "Teflon",
        bahan: ["1 lembar tortilla", "1 butir telur", "Tempe panggang iris tipis", "Selada, wortel serut, timun", "1 sdm saus sambal"],
        langkah: ["Dadar telur tipis di teflon.", "Panggang tempe sampai kecokelatan.", "Hangatkan tortilla, tata telur, tempe, dan sayur, beri saus.", "Gulung rapat dan potong dua."] }
    ],
    menu: [
      ["Oatmeal + pisang", "Nasi + tumis tahu tempe kecap + sayur", "Nasi + capcay kuah + telur"],
      ["Roti gandum + telur rebus", "Gado-gado rumahan", "Nasi + oseng kacang panjang tempe"],
      ["Oatmeal susu", "Pecel sayur + tempe panggang", "Aglio olio brokoli jamur"],
      ["Telur rebus + buah", "Nasi + capcay kuah + tahu", "Nasi + tempe bacem + tumis kangkung"],
      ["Roti gandum + selai kacang", "Wrap tortilla telur sayur", "Nasi + omelet sayur"],
      ["Oatmeal + pisang", "Gado-gado rumahan", "Nasi + tumis tahu tempe kecap + sayur bening"],
      ["Roti gandum + telur orak-arik", "Nasi + pepes tahu jamur + lalapan", "Nasi + capcay kuah"]
    ],
    belanja: [["Beras 1,5 kg", 20000], ["Telur 1 kg", 28000], ["Tahu dan tempe", 35000], ["Jamur tiram 250 g", 10000], ["Sayur campur", 40000], ["Bumbu pecel dan bumbu kacang instan", 12000], ["Buah (pisang, jeruk)", 20000], ["Oat dan roti gandum", 25000], ["Bumbu dasar", 15000], ["Spaghetti dan tortilla", 22000]]
  }
];

const TIPS = [
  "Masak lauk sekaligus untuk 2 hari (misalnya ayam suwir atau tempe bacem), simpan di wadah tertutup.",
  "Belanja sayur 2x seminggu supaya tetap segar, apalagi kalau nggak punya kulkas.",
  "Rice cooker bisa sekalian mengukus: taruh lauk di saringan kukus selagi menanak nasi.",
  "Minum air putih yang cukup dan kurangi minuman manis kemasan."
];

const dietById = (id) => DIETS.find((d) => d.id === id) || DIETS[0];
const totalBelanja = (d) => d.belanja.reduce((a, b) => a + b[1], 0);
