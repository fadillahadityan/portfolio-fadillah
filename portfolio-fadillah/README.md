# Portofolio Fadillah Adityan

Website portofolio statis menggunakan HTML, CSS, dan JavaScript.

## Menjalankan website

1. Buka folder ini di Visual Studio Code.
2. Jalankan `index.html` dengan ekstensi Live Server agar pemeriksaan dokumen berfungsi.
3. Untuk publikasi, unggah seluruh folder `portfolio-fadillah` ke hosting statis.

## Berkas yang dapat diganti

- Foto profil: `assets/foto-profil.jpg`
- Pratinjau proyek ABSENKU: `assets/proyek-absenku.jpg`
- Pratinjau pendataan: `assets/proyek-pendataan.jpg`
- Karya desain: `assets/proyek-desain.jpg`
- CV asli milik Anda: `assets/CV-Fadillah-Adityan.pdf` (tambahkan sendiri; file CV contoh tidak disertakan)

Pertahankan nama file agar tautan tidak perlu diubah. Untuk tombol **Unduh CV**, salin berkas CV PDF milik Anda ke `assets/CV-Fadillah-Adityan.pdf`. Tombol sudah tersedia, tetapi unduhan baru berfungsi setelah berkas CV asli Anda ditambahkan. Gambar proyek bersifat opsional; jika tidak tersedia, kartu akan menampilkan visual pengganti.

## Dokumen sertifikasi dan pelatihan

Bagian **Sertifikasi, Sertifikat & Pelatihan** sudah diisi dengan 10 entri dari daftar yang diberikan, satu entri MOOC SE2026 yang sudah ada, serta dua kartu placeholder untuk sertifikasi BNSP. Dua kartu BNSP sengaja diberi label **DRAFT · LENGKAPI** agar tidak terkesan sebagai sertifikasi yang sudah terverifikasi.

PDF asli belum disertakan dalam ZIP ini. Untuk mengaktifkan tombol **Lihat/Unduh**, salin setiap PDF ke `assets/sertifikat/` dengan nama file persis seperti yang tercantum pada kartu. Jika nama file berbeda, ubah atribut `data-files` pada elemen `article.certificate-item` yang sesuai di `index.html`.

Semua entri sertifikasi/pelatihan yang baru ditambahkan masih diberi atribut `data-demo="true"` sebagai penanda agar mudah ditemukan dan diedit. Setelah data serta berkas asli sudah benar, hapus atribut tersebut. Lengkapi nama sertifikasi, LSP, dan tanggal pada dua kartu BNSP berdasarkan sertifikat asli. Entri MOOC SE2026 dipertahankan seperti sebelumnya.

## Sebelum dipublikasikan

Periksa ulang email, nomor telepon, tautan GitHub, pengalaman, keahlian, dan semua keterangan tanggal. Pastikan isi CV serta sertifikat yang diunggah benar dan boleh dipublikasikan.


### Catatan revisi terbaru
- Logo teknologi pada bagian Keahlian menggunakan SVG lokal agar tampil konsisten tanpa meminta ikon dari layanan eksternal. Pita logo bergerak ke kanan dan berhenti sementara saat diarahkan dengan kursor.
- Tombol **Hubungi Saya** pada bagian pembuka menggulir ke bagian kontak di bawah. Tombol **Kirim Email** pada bagian kontak membuka aplikasi email.
- Menu **Hubungi** di navbar liquid glass dibuat lebih kontras agar mudah ditemukan.
- Untuk tombol **Unduh CV**, masukkan CV milik sendiri ke `assets/CV-Fadillah-Adityan.pdf`. Tidak ada desain CV buatan yang disertakan.


## Pembaruan tampilan keahlian dan pengalaman
- Logo perangkat menggunakan ikon merek SVG dari Simple Icons agar lebih sesuai dengan nama perangkat. Koneksi internet diperlukan untuk memuat logo aslinya; bila logo tidak dapat diakses, website menampilkan fallback singkat dengan gaya warna yang konsisten.
- Pita logo bergerak otomatis ke kanan, dan berhenti ketika diarahkan dengan kursor.
- Keahlian disusun menjadi enam kategori dalam tiga kolom pada layar besar; jumlah kolom menyesuaikan layar kecil.
- Pengalaman kini berbentuk kartu dengan tanggal di bagian atas setiap kartu sehingga tanggal selalu sejajar dengan informasi pekerjaan.


### Interaksi dan tata letak terbaru
- Bagian Keahlian menampilkan tiga kategori utama terlebih dahulu. Tombol **Lihat semua keahlian** membuka seluruh kategori dan berubah menjadi **Tampilkan lebih sedikit**.
- Pengalaman ditampilkan dalam satu kolom dari atas ke bawah.
- Kartu Hubungi Saya dan isi kartu kontak memiliki efek hover yang konsisten; gerakan otomatis tetap menghormati pengaturan pengurangan gerak pada perangkat.


## Gambar proyek
Letakkan tiga mockup proyek berikut di folder `assets/` dengan nama file persis:
- `ABSENKU Dashboard Promotional Mockup.png`
- `BPS Jakarta Selatan Design Portfolio.png`
- `Modern UI_UX Portfolio Showcase.png`

Kartu proyek menampilkan ABSENKU, UI/UX Design (BPS Jakarta Selatan Design Portfolio), dan Modern UI/UX Portfolio Showcase. Jika file gambar memakai ekstensi berbeda, sesuaikan atribut `src` pada `index.html`.
Bagian dokumen memakai tab ringkas dan kartu horizontal yang dapat digeser. Riwayat pengalaman disusun dari yang paling lama ke yang terbaru.


## Revisi tampilan terbaru
- Timeline sertifikasi/pelatihan terpisah dihapus agar tidak ada pengulangan.
- Tab dokumen tetap memisahkan Sertifikat, Sertifikasi, dan Pelatihan.
- Kategori Sertifikasi berisi 5 entri (termasuk dua placeholder BNSP).
- Kategori Pelatihan berisi 5 entri.
- Riwayat Pengalaman ditampilkan sebagai timeline vertikal dari yang paling lama ke terbaru.
- Kartu proyek diringkas dengan deskripsi yang sesuai dan tag lebih sederhana.


## Revisi dokumen dan timeline (31 Oktober 2026)
- Sertifikasi: 5 kartu (ITIL, IAII, TOEFL, dan 2 placeholder BNSP).
- Sertifikat: 2 kartu (penghargaan BPS dan Surat Keterangan Lulus).
- Pelatihan: 5 kartu (MOOC SE2026, Odoo, Data Scientist, Junior Web Developer, Basic Network).
- Sampul kartu dokumen dibuat dari halaman pertama PDF asli di `assets/sertifikat/cover-*.jpg`.
- Kartu dokumen memakai carousel horizontal; geser ke samping untuk melihat dokumen lainnya.
- Timeline pengalaman memakai satu kolom vertikal responsif, dengan urutan paling lama ke terbaru.
- Placeholder BNSP belum memiliki tautan PDF sampai dokumen aslinya ditambahkan.
