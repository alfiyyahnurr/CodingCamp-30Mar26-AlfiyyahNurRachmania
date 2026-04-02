# 📤 Panduan Upload Project ke GitHub

## Metode 1: Menggunakan GitHub Desktop (Paling Mudah)

### Langkah 1: Install GitHub Desktop
1. Download GitHub Desktop dari https://desktop.github.com/
2. Install aplikasi
3. Login dengan akun GitHub Anda

### Langkah 2: Buat Repository Baru
1. Buka GitHub Desktop
2. Klik **File** → **New Repository**
3. Isi form:
   - **Name**: `spendwise` (atau nama lain)
   - **Description**: `Expense & Budget Visualizer`
   - **Local Path**: Pilih folder project Anda
   - ✅ Centang "Initialize this repository with a README" (skip jika sudah ada)
   - **Git Ignore**: None
   - **License**: MIT License (optional)
4. Klik **Create Repository**

### Langkah 3: Publish ke GitHub
1. Klik tombol **Publish repository** di toolbar atas
2. Pilih:
   - ✅ Keep this code private (jika ingin private)
   - ❌ Uncheck jika ingin public
3. Klik **Publish Repository**

### Langkah 4: Push Changes (Setiap Kali Ada Perubahan)
1. GitHub Desktop akan otomatis detect perubahan file
2. Di bagian kiri bawah, tulis commit message:
   - **Summary**: `Initial commit` atau `Add new feature`
   - **Description**: (optional) penjelasan detail
3. Klik **Commit to main**
4. Klik **Push origin** untuk upload ke GitHub

✅ **Selesai!** Project Anda sudah di GitHub.

---

## Metode 2: Menggunakan Git Command Line

### Langkah 1: Install Git
```bash
# Cek apakah Git sudah terinstall
git --version

# Jika belum, download dari: https://git-scm.com/downloads
```

### Langkah 2: Konfigurasi Git (Pertama Kali)
```bash
# Set username
git config --global user.name "Nama Anda"

# Set email (gunakan email GitHub)
git config --global user.email "email@example.com"

# Cek konfigurasi
git config --list
```

### Langkah 3: Buat Repository di GitHub.com
1. Buka https://github.com
2. Login ke akun Anda
3. Klik tombol **+** di pojok kanan atas → **New repository**
4. Isi form:
   - **Repository name**: `spendwise`
   - **Description**: `Expense & Budget Visualizer`
   - **Public** atau **Private**
   - ❌ **JANGAN** centang "Initialize this repository with a README"
5. Klik **Create repository**
6. **SIMPAN URL** yang muncul (contoh: `https://github.com/username/spendwise.git`)

### Langkah 4: Initialize Git di Project Anda
```bash
# Masuk ke folder project
cd path/to/spendwise

# Initialize Git
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Add SpendWise expense tracker"
```

### Langkah 5: Connect ke GitHub dan Push
```bash
# Tambahkan remote repository (ganti URL dengan URL Anda)
git remote add origin https://github.com/username/spendwise.git

# Cek remote
git remote -v

# Push ke GitHub
git branch -M main
git push -u origin main
```

### Langkah 6: Push Changes Selanjutnya
```bash
# Setiap kali ada perubahan:

# 1. Tambahkan file yang berubah
git add .

# 2. Commit dengan pesan
git commit -m "Update: Add dark mode feature"

# 3. Push ke GitHub
git push
```

---

## Metode 3: Upload Langsung via GitHub Web

### Langkah 1: Buat Repository
1. Buka https://github.com
2. Klik **+** → **New repository**
3. Isi nama dan deskripsi
4. Klik **Create repository**

### Langkah 2: Upload Files
1. Di halaman repository, klik **uploading an existing file**
2. Drag & drop semua file project Anda:
   - `index.html`
   - `css/style.css`
   - `js/app.js`
   - `README.md`
3. Tulis commit message: `Initial commit`
4. Klik **Commit changes**

⚠️ **Catatan**: Metode ini kurang praktis untuk update berkala.

---

## 🚀 Deploy ke GitHub Pages

Setelah project di GitHub, deploy sebagai website:

### Via GitHub Web
1. Buka repository di GitHub
2. Klik **Settings** (tab di atas)
3. Scroll ke bagian **Pages** (menu kiri)
4. Di **Source**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
5. Klik **Save**
6. Tunggu 1-2 menit
7. Refresh halaman, akan muncul link:
   ```
   Your site is live at https://username.github.io/spendwise/
   ```

### Via GitHub Desktop
1. Setelah push, buka repository di GitHub.com
2. Ikuti langkah di atas

---

## 📝 Git Commands Cheat Sheet

```bash
# Status - cek file yang berubah
git status

# Add - tambahkan file untuk commit
git add .                    # Semua file
git add index.html          # File spesifik
git add css/                # Folder spesifik

# Commit - simpan perubahan
git commit -m "Pesan commit"

# Push - upload ke GitHub
git push

# Pull - download perubahan dari GitHub
git pull

# Clone - download repository
git clone https://github.com/username/spendwise.git

# Branch - buat cabang baru
git branch feature-name
git checkout feature-name
# atau
git checkout -b feature-name

# Log - lihat history commit
git log
git log --oneline

# Undo changes
git restore index.html      # Undo file yang belum di-add
git reset HEAD index.html   # Unstage file
git revert HEAD             # Undo commit terakhir
```

---

## 🔧 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/username/spendwise.git
```

### Error: "failed to push"
```bash
# Pull dulu, baru push
git pull origin main --allow-unrelated-histories
git push
```

### Error: "Permission denied"
```bash
# Setup SSH key atau gunakan Personal Access Token
# Tutorial: https://docs.github.com/en/authentication
```

### Lupa Commit Message
```bash
# Edit commit message terakhir
git commit --amend -m "Pesan baru"
```

### File Terlalu Besar
```bash
# Tambahkan ke .gitignore
echo "nama-file-besar.zip" >> .gitignore
git add .gitignore
git commit -m "Add gitignore"
```

---

## 📋 Best Practices

### Commit Messages yang Baik
```bash
# ✅ Good
git commit -m "Add dark mode toggle feature"
git commit -m "Fix: Balance calculation bug"
git commit -m "Update: Improve mobile responsiveness"

# ❌ Bad
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### Commit Sering
- Commit setiap kali selesai satu fitur kecil
- Jangan tunggu sampai banyak perubahan
- Lebih mudah untuk tracking dan rollback

### Gunakan .gitignore
Buat file `.gitignore` untuk ignore file yang tidak perlu:
```
# .gitignore
node_modules/
.DS_Store
*.log
.env
dist/
```

---

## 🎯 Workflow Recommended

```bash
# 1. Mulai kerja
git pull                    # Sync dengan GitHub

# 2. Buat perubahan di code editor
# ... edit files ...

# 3. Cek status
git status

# 4. Add & Commit
git add .
git commit -m "Add feature X"

# 5. Push ke GitHub
git push

# 6. Ulangi langkah 2-5
```

---

## 🆘 Butuh Bantuan?

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **GitHub Desktop Help**: https://docs.github.com/en/desktop
- **Video Tutorial**: Search "Git GitHub tutorial" di YouTube

---

**Selamat! Project Anda sekarang di GitHub! 🎉**

Jangan lupa update README.md dengan link GitHub Pages setelah deploy!
