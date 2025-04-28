# UKDSafe

UKDSafe adalah aplikasi desktop berbasis Electron yang dirancang untuk mendukung pelaksanaan Ujian Kompetensi Dasar (UKD) di SD Anak Saleh 2025. Aplikasi ini menyediakan antarmuka sederhana dengan splash screen dan fitur-fitur seperti status koneksi online/offline, serta mode kiosk untuk keamanan.

---

## Fitur
- **Splash Screen**: Menampilkan layar pembuka dengan tombol "Mulai".
- **Status Koneksi**: Menampilkan status online/offline secara real-time.
- **Mode Kiosk**: Mencegah pengguna keluar dari aplikasi selama ujian berlangsung.
- **Cache Management**: Membersihkan cache setiap kali aplikasi dibuka.
- **Shortcut Global**:
  - `Ctrl + Shift + Q`: Keluar dari aplikasi.
  - `Ctrl + Shift + R`: Reload splash screen.

---

## Teknologi yang Digunakan
- **Electron**: Framework untuk membangun aplikasi desktop lintas platform.
- **HTML/CSS/JavaScript**: Untuk antarmuka pengguna.
- **Node.js**: Untuk backend aplikasi.

---

## Cara Menjalankan Aplikasi

### Clone Repository
Clone repository ini ke komputer Anda:
```bash
git clone <URL_REPOSITORY>
cd UKDSafe
###

### Install & Run
npm install
npm start
npm run build

UKDSafe/
├── assets/               # Folder untuk file statis (ikon, HTML, dll.)
│   ├── splash.html       # File HTML untuk splash screen
│   ├── style.css         # Gaya untuk splash screen
│   └── icon.png          # Ikon aplikasi
├── [main.js](http://_vscodecontentref_/0)               # File utama aplikasi (proses utama Electron)
├── [preload.js](http://_vscodecontentref_/1)            # File preload untuk komunikasi antara proses utama dan renderer
├── [package.json](http://_vscodecontentref_/2)          # Konfigurasi proyek dan dependensi
└── README.md             # Dokumentasi proyek

Shortcut
Ctrl + Shift + Q: Keluar dari aplikasi.
Ctrl + Shift + R: Reload splash screen.
Lisensi
Aplikasi ini dilisensikan di bawah MIT License.

Kontributor
Nama Anda - Pengembang Utama
SD Anak Saleh - Pemilik Proyek

###