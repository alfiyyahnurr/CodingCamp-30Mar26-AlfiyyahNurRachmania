# 📋 Requirements Document - SpendWise

## 1. Deskripsi Proyek

SpendWise adalah aplikasi web pelacak pengeluaran (expense tracker) yang memungkinkan pengguna untuk mencatat, mengelola, dan memvisualisasikan pengeluaran harian mereka. Aplikasi ini dibangun dengan teknologi web standar (HTML, CSS, JavaScript) tanpa framework eksternal.

## 2. Tujuan Aplikasi

- Membantu pengguna melacak pengeluaran harian secara real-time
- Memberikan visualisasi pengeluaran berdasarkan kategori
- Memberikan peringatan ketika pengeluaran melebihi batas yang ditentukan
- Menyediakan antarmuka yang intuitif dan responsif untuk semua perangkat

## 3. Fitur Utama (MVP)

### 3.1 Input Form Pengeluaran
- Input nama item pengeluaran (text field)
- Input jumlah pengeluaran (number field dengan desimal)
- Dropdown kategori pengeluaran (Food, Transport, Fun)
- Tombol submit untuk menambahkan transaksi
- Validasi form sebelum submit

### 3.2 Daftar Transaksi
- Menampilkan semua transaksi yang telah ditambahkan
- Setiap item menampilkan: emoji kategori, nama item, jumlah, dan kategori
- Tombol delete untuk menghapus transaksi individual
- Scrollable list untuk banyak transaksi
- Empty state ketika belum ada transaksi

### 3.3 Total Balance
- Menampilkan total pengeluaran secara real-time
- Progress bar visual menunjukkan persentase terhadap batas pengeluaran
- Indikator batas pengeluaran ($1,000)
- Highlight merah ketika melebihi batas

### 3.4 Visualisasi Chart
- Doughnut chart menampilkan distribusi pengeluaran per kategori
- Warna berbeda untuk setiap kategori
- Tooltip menampilkan jumlah dan persentase
- Auto-update ketika data berubah

### 3.5 Penyimpanan Data
- LocalStorage untuk persistensi data
- Data tetap tersimpan setelah browser ditutup
- Auto-save setiap kali ada perubahan data

## 4. Fitur Opsional (Implemented)

### 4.1 Sorting Transaksi
- Sort berdasarkan tanggal (terbaru)
- Sort berdasarkan jumlah (tertinggi/terendah)
- Sort berdasarkan kategori (alfabetis)
- Dropdown selector untuk memilih metode sorting

### 4.2 Spending Limit Alert
- Batas pengeluaran default: $1,000
- Progress bar berubah warna mendekati batas
- Highlight merah pada total balance ketika melebihi batas
- Visual feedback untuk pengguna

### 4.3 Dark/Light Mode
- Toggle button untuk beralih tema
- Dark mode dengan gradient biru gelap
- Light mode dengan gradient biru terang
- Preferensi tema disimpan di localStorage
- Icon berubah (bulan/matahari) sesuai tema aktif

## 5. Kategori Pengeluaran

| Kategori | Emoji | Warna | Contoh |
|----------|-------|-------|--------|
| Food | 🍔 | Hijau | Makanan, minuman, groceries |
| Transport | 🚗 | Biru | Taksi, bensin, transportasi umum |
| Fun | 🎉 | Oranye | Hiburan, hobi, rekreasi |

## 6. Batasan dan Constraint

### 6.1 Teknis
- Tidak menggunakan framework JavaScript (vanilla JS)
- Tidak menggunakan backend/server
- Data hanya tersimpan di browser (localStorage)
- Maksimal data tergantung kapasitas localStorage browser (~5-10MB)

### 6.2 Fungsional
- Batas pengeluaran fixed di $1,000 (tidak bisa diubah user)
- Hanya 3 kategori yang tersedia
- Tidak ada fitur edit transaksi (hanya delete)
- Tidak ada fitur export/import data
- Tidak ada autentikasi user

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
- Form memiliki field: nama item, jumlah, kategori
- Semua field wajib diisi
- Jumlah harus berupa angka positif
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
- Icon berubah sesuai tema
- Preferensi tersimpan
- Chart colors terupdate

## 8. Persyaratan Non-Fungsional

### 8.1 Performance
- Aplikasi harus load dalam < 2 detik
- Operasi CRUD harus instant (< 100ms)
- Chart rendering < 500ms
- Smooth animations (60fps)

### 8.2 Usability
- Antarmuka intuitif tanpa perlu tutorial
- Form validation dengan pesan error yang jelas
- Feedback visual untuk setiap aksi
- Accessible untuk keyboard navigation

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
  category: String,     // "Food" | "Transport" | "Fun"
  date: String          // ISO date string
}
```

### LocalStorage Keys
- `expenseTrackerData` - Array of transactions
- `expenseTrackerTheme` - "dark" | "light"

## 11. Validasi

### Form Validation
- Item name: required, non-empty string
- Amount: required, positive number
- Category: required, must be one of predefined categories

### Data Validation
- Transaction ID harus unique
- Amount harus valid number
- Date harus valid ISO string
- Category harus valid enum value

## 12. Error Handling

- Alert untuk form validation errors
- Graceful fallback jika localStorage penuh
- Graceful fallback jika Chart.js gagal load
- Empty state untuk list kosong

## 13. Future Enhancements (Out of Scope)

- Edit transaksi
- Custom categories
- Multiple spending limits
- Date range filtering
- Export to CSV/PDF
- Multi-currency support
- Budget planning
- Recurring expenses
- Income tracking
- Multi-user support
- Cloud sync
- Mobile app

## 14. Success Metrics

- User dapat menambah transaksi dalam < 10 detik
- User dapat memahami total pengeluaran dalam < 5 detik
- User dapat menemukan transaksi tertentu dalam < 15 detik
- 0 data loss (dengan localStorage)
- 100% responsive di semua device sizes
