# 📋 Requirements Document - SpendWise

## 1. Deskripsi Proyek

SpendWise adalah aplikasi web pelacak pengeluaran (expense tracker) yang memungkinkan pengguna untuk mencatat, mengelola, dan memvisualisasikan pengeluaran harian mereka. Aplikasi ini dibangun dengan teknologi web standar (HTML, CSS, JavaScript) tanpa framework eksternal.

## 2. Tujuan Aplikasi

- Membantu pengguna melacak pengeluaran harian secara real-time
- Memberikan visualisasi pengeluaran berdasarkan kategori
- Memberikan peringatan ketika pengeluaran melebihi batas yang ditentukan
- Menyediakan antarmuka yang intuitif dan responsif untuk semua perangkat
- Memungkinkan kustomisasi kategori sesuai kebutuhan pengguna
- Menyediakan laporan bulanan untuk analisis pengeluaran

## 3. Fitur Utama (MVP)

### 3.1 Input Form Pengeluaran
- Input nama item pengeluaran (text field)
- Input jumlah pengeluaran (number field dengan desimal)
- Dropdown kategori pengeluaran (dinamis berdasarkan kategori yang tersedia)
- Input tanggal transaksi (date picker)
- Tombol submit untuk menambahkan transaksi
- Validasi form sebelum submit

### 3.2 Daftar Transaksi
- Menampilkan semua transaksi yang telah ditambahkan
- Setiap item menampilkan: nama item, jumlah, dan kategori
- Tombol delete untuk menghapus transaksi individual
- Scrollable list untuk banyak transaksi
- Empty state ketika belum ada transaksi

### 3.3 Total Balance
- Menampilkan total pengeluaran secara real-time
- Progress bar visual menunjukkan persentase terhadap batas pengeluaran
- Indikator batas pengeluaran (dapat diubah oleh user)
- Tombol "Edit" untuk mengubah batas pengeluaran
- Highlight merah ketika melebihi batas

### 3.4 Visualisasi Chart
- Doughnut chart menampilkan distribusi pengeluaran per kategori
- Warna berbeda untuk setiap kategori (hingga 9 warna unik)
- Tooltip menampilkan jumlah dan persentase
- Auto-update ketika data berubah
- Mendukung kategori dinamis

### 3.5 Penyimpanan Data
- LocalStorage untuk persistensi data
- Data tetap tersimpan setelah browser ditutup
- Auto-save setiap kali ada perubahan data
- Menyimpan: transaksi, kategori custom, spending limit, dan tema

## 4. Fitur Lanjutan (Implemented)

### 4.1 Sorting Transaksi
- Sort berdasarkan tanggal (terbaru)
- Sort berdasarkan jumlah (tertinggi/terendah)
- Sort berdasarkan kategori (alfabetis)
- Dropdown selector untuk memilih metode sorting

### 4.2 Spending Limit Management
- Batas pengeluaran default: $1,000
- User dapat mengubah batas pengeluaran kapan saja
- Progress bar berubah warna mendekati batas
- Highlight merah pada total balance ketika melebihi batas
- Visual feedback untuk pengguna
- Batas pengeluaran tersimpan di localStorage

### 4.3 Dark/Light Mode
- Toggle button untuk beralih tema
- Dark mode dengan warna gelap
- Light mode dengan warna terang
- Preferensi tema disimpan di localStorage
- Text "Light" atau "Dark" pada toggle button
- Chart colors terupdate sesuai tema

### 4.4 Custom Categories Management
- User dapat menambah kategori baru
- User dapat menghapus kategori (dengan warning jika ada transaksi)
- Modal dialog untuk manajemen kategori
- Minimal 1 kategori harus ada
- Kategori default: Food, Transport, Fun
- Kategori tersimpan di localStorage
- Dropdown kategori terupdate otomatis

### 4.5 Monthly Summary View
- Modal dialog untuk melihat ringkasan bulanan
- Dropdown untuk memilih bulan dan tahun
- Menampilkan:
  - Total pengeluaran bulan tersebut
  - Jumlah transaksi
  - Rata-rata per transaksi
  - Breakdown per kategori dengan persentase
- Data diurutkan berdasarkan jumlah pengeluaran tertinggi
- Empty state jika tidak ada transaksi di bulan tersebut

## 5. Kategori Pengeluaran

### 5.1 Kategori Default

| Kategori | Warna | Contoh |
|----------|-------|--------|
| Food | Hijau | Makanan, minuman, groceries |
| Transport | Biru | Taksi, bensin, transportasi umum |
| Fun | Oranye | Hiburan, hobi, rekreasi |

### 5.2 Kategori Custom
- User dapat menambah kategori sesuai kebutuhan
- Contoh: Shopping, Health, Education, Entertainment, Bills, Other
- Setiap kategori mendapat warna otomatis dari palet 9 warna
- Tidak ada batasan jumlah kategori

## 6. Batasan dan Constraint

### 6.1 Teknis
- Tidak menggunakan framework JavaScript (vanilla JS)
- Tidak menggunakan backend/server
- Data hanya tersimpan di browser (localStorage)
- Maksimal data tergantung kapasitas localStorage browser (~5-10MB)

### 6.2 Fungsional
- Batas pengeluaran dapat diubah user (tidak fixed)
- Kategori dapat ditambah/dihapus oleh user
- Tidak ada fitur edit transaksi (hanya delete dan add ulang)
- Tidak ada fitur export/import data
- Tidak ada autentikasi user
- Minimal 1 kategori harus ada

### 6.3 Browser
- Memerlukan browser modern dengan dukungan ES6+
- Memerlukan JavaScript enabled
- Memerlukan localStorage API

## 7. User Stories

### US-01: Menambah Pengeluaran
**Sebagai** pengguna  
**Saya ingin** menambahkan pengeluaran baru  
**Sehingga** saya dapat melacak kemana uang saya dihabiskan

**Kriteria Penerimaan:**
- Form memiliki field: nama item, jumlah, kategori, tanggal
- Semua field wajib diisi
- Jumlah harus berupa angka positif
- Tanggal dapat dipilih dari date picker
- Setelah submit, form direset
- Transaksi muncul di daftar
- Total balance terupdate

### US-02: Melihat Total Pengeluaran
**Sebagai** pengguna  
**Saya ingin** melihat total pengeluaran saya  
**Sehingga** saya tahu berapa banyak yang telah saya habiskan

**Kriteria Penerimaan:**
- Total ditampilkan dengan format currency ($X.XX)
- Total terupdate otomatis setiap ada perubahan
- Progress bar menunjukkan persentase terhadap limit
- Warning visual ketika melebihi limit

### US-03: Menghapus Transaksi
**Sebagai** pengguna  
**Saya ingin** menghapus transaksi yang salah  
**Sehingga** data pengeluaran saya akurat

**Kriteria Penerimaan:**
- Setiap transaksi memiliki tombol delete
- Klik delete menghapus transaksi
- Total balance terupdate
- Chart terupdate
- Data tersimpan di localStorage

### US-04: Melihat Visualisasi Pengeluaran
**Sebagai** pengguna  
**Saya ingin** melihat chart pengeluaran per kategori  
**Sehingga** saya dapat memahami pola pengeluaran saya

**Kriteria Penerimaan:**
- Chart berbentuk doughnut
- Setiap kategori memiliki warna berbeda
- Tooltip menampilkan jumlah dan persentase
- Chart terupdate otomatis
- Mendukung kategori dinamis

### US-05: Mengurutkan Transaksi
**Sebagai** pengguna  
**Saya ingin** mengurutkan transaksi  
**Sehingga** saya dapat menemukan transaksi tertentu dengan mudah

**Kriteria Penerimaan:**
- Dropdown dengan 4 opsi sorting
- Sort by date (default)
- Sort by amount (high/low)
- Sort by category
- List terupdate setelah sorting

### US-06: Mengubah Tema
**Sebagai** pengguna  
**Saya ingin** mengubah tema aplikasi  
**Sehingga** saya dapat menggunakan aplikasi dengan nyaman di berbagai kondisi pencahayaan

**Kriteria Penerimaan:**
- Toggle button di header
- Beralih antara dark dan light mode
- Text berubah sesuai tema (Light/Dark)
- Preferensi tersimpan
- Chart colors terupdate

### US-07: Mengelola Kategori Custom
**Sebagai** pengguna  
**Saya ingin** menambah dan menghapus kategori  
**Sehingga** saya dapat menyesuaikan kategori dengan kebutuhan saya

**Kriteria Penerimaan:**
- Tombol "Manage Categories" membuka modal
- Modal menampilkan daftar kategori yang ada
- Input field untuk menambah kategori baru
- Tombol "Add" untuk menambah kategori
- Tombol "Delete" untuk setiap kategori
- Warning jika kategori memiliki transaksi
- Minimal 1 kategori harus ada
- Dropdown kategori terupdate otomatis
- Kategori tersimpan di localStorage

### US-08: Mengubah Batas Pengeluaran
**Sebagai** pengguna  
**Saya ingin** mengubah batas pengeluaran  
**Sehingga** saya dapat menyesuaikan budget dengan kebutuhan saya

**Kriteria Penerimaan:**
- Tombol "Edit" di samping spending limit
- Klik tombol membuka prompt input
- User memasukkan angka baru
- Validasi angka positif
- Batas pengeluaran terupdate
- Progress bar terupdate
- Batas tersimpan di localStorage

### US-09: Melihat Ringkasan Bulanan
**Sebagai** pengguna  
**Saya ingin** melihat ringkasan pengeluaran per bulan  
**Sehingga** saya dapat menganalisis pola pengeluaran saya

**Kriteria Penerimaan:**
- Tombol "Monthly Summary" membuka modal
- Dropdown untuk memilih bulan
- Dropdown untuk memilih tahun
- Menampilkan total pengeluaran bulan tersebut
- Menampilkan jumlah transaksi
- Menampilkan rata-rata per transaksi
- Menampilkan breakdown per kategori
- Kategori diurutkan dari tertinggi ke terendah
- Menampilkan persentase setiap kategori
- Empty state jika tidak ada transaksi

## 8. Persyaratan Non-Fungsional

### 8.1 Performance
- Aplikasi harus load dalam < 2 detik
- Operasi CRUD harus instant (< 100ms)
- Chart rendering < 500ms
- Smooth animations (60fps)
- Modal open/close < 300ms

### 8.2 Usability
- Antarmuka intuitif tanpa perlu tutorial
- Form validation dengan pesan error yang jelas
- Feedback visual untuk setiap aksi
- Accessible untuk keyboard navigation
- Modal dapat ditutup dengan klik di luar

### 8.3 Responsiveness
- Mobile-first design
- Breakpoint untuk tablet dan desktop
- Touch-friendly buttons (min 44x44px)
- Readable text di semua ukuran layar

### 8.4 Compatibility
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### 8.5 Security & Privacy
- Tidak ada data dikirim ke server
- Tidak ada tracking/analytics
- Tidak ada cookies
- Data hanya di browser user

## 9. Dependencies

### 9.1 External Libraries
- **Chart.js** (v3.x) - untuk visualisasi chart
  - CDN: `https://cdn.jsdelivr.net/npm/chart.js`
  - Digunakan untuk doughnut chart

### 9.2 Browser APIs
- **localStorage** - untuk penyimpanan data
- **DOM API** - untuk manipulasi UI
- **Date API** - untuk timestamp transaksi

## 10. Data Model

### Transaction Object
```javascript
{
  id: Number,           // Timestamp (Date.now())
  name: String,         // Nama item
  amount: Number,       // Jumlah pengeluaran (float)
  category: String,     // Nama kategori (dinamis)
  date: String          // ISO date string
}
```

### LocalStorage Keys
- `expenseTrackerData` - Array of transactions
- `expenseTrackerTheme` - "dark" | "light"
- `expenseTrackerCategories` - Array of category names
- `expenseTrackerLimit` - Number (spending limit)

## 11. Validasi

### Form Validation
- Item name: required, non-empty string
- Amount: required, positive number
- Category: required, must be one of available categories
- Date: required, valid date

### Data Validation
- Transaction ID harus unique
- Amount harus valid number
- Date harus valid ISO string
- Category harus ada di daftar kategori

### Category Validation
- Category name: required, non-empty string
- Category name: tidak boleh duplikat
- Minimal 1 kategori harus ada

### Spending Limit Validation
- Limit: required, positive number
- Limit: harus lebih besar dari 0

## 12. Error Handling

- Alert untuk form validation errors
- Graceful fallback jika localStorage penuh
- Graceful fallback jika Chart.js gagal load
- Empty state untuk list kosong
- Confirmation dialog untuk delete kategori dengan transaksi
- Validation error untuk spending limit

## 13. Future Enhancements (Out of Scope)

- Edit transaksi
- Multiple spending limits per kategori
- Date range filtering
- Export to CSV/PDF
- Multi-currency support
- Budget planning
- Recurring expenses
- Income tracking
- Multi-user support
- Cloud sync
- Mobile app
- Category icons/colors customization

## 14. Success Metrics

- User dapat menambah transaksi dalam < 10 detik
- User dapat memahami total pengeluaran dalam < 5 detik
- User dapat menemukan transaksi tertentu dalam < 15 detik
- User dapat menambah kategori baru dalam < 15 detik
- User dapat melihat monthly summary dalam < 5 detik
- 0 data loss (dengan localStorage)
- 100% responsive di semua device sizes

