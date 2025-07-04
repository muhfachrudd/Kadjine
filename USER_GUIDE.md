# 🍽️ Restaurant Ordering System - User Guide

## Cara Menggunakan Sistem

### 📱 **Frontend - Aplikasi Pelanggan**
**URL:** http://localhost:5173

#### 1. **Melihat Menu**
- Halaman utama menampilkan semua menu yang tersedia
- Gunakan filter kategori untuk mempermudah pencarian:
  - **Semua** - Tampilkan semua menu
  - **Makanan Utama** - Nasi, mie, dll
  - **Minuman** - Es jeruk, kopi, teh
  - **Dessert** - Es krim, pisang goreng
  - **Appetizer** - Kerupuk, tahu isi

#### 2. **Menambah ke Keranjang**
- Klik tombol **"Tambah"** pada menu yang diinginkan
- Notifikasi hijau akan muncul mengkonfirmasi item ditambahkan
- Icon keranjang di header akan menampilkan jumlah item

#### 3. **Mengelola Keranjang**
- Klik icon **🛒 Cart** di header
- Di halaman keranjang Anda bisa:
  - Ubah quantity dengan tombol **+** dan **-**
  - Hapus item dengan tombol **🗑️**
  - Lihat subtotal per item dan total keseluruhan

#### 4. **Membuat Pesanan**
- Isi informasi pelanggan:
  - **Nama** (wajib)
  - **No. Telepon** (opsional)
  - **No. Meja** (opsional)
  - **Catatan** (opsional)
- Klik **"Pesan Sekarang"**

#### 5. **Konfirmasi Pesanan**
- Sistem akan menampilkan:
  - ID Pesanan unik
  - Detail pesanan lengkap
  - Status pesanan (Menunggu Konfirmasi)
  - Total pembayaran
- Tunjukkan ID pesanan kepada pelayan untuk konfirmasi

---

### 🔧 **Backend - Admin Panel**
**URL:** http://localhost:8000/admin

#### Login Admin
- **Email:** admin@example.com
- **Password:** [yang dibuat saat setup]

#### 1. **Dashboard**
Menampilkan statistik real-time:
- Total pesanan keseluruhan
- Pesanan hari ini
- Pesanan yang menunggu diproses
- Total pendapatan dari pesanan selesai
- Chart pesanan mingguan

#### 2. **Mengelola Kategori**
- Menu **"Categories"** di sidebar
- Bisa menambah, edit, hapus kategori
- Field: Nama kategori, Deskripsi

#### 3. **Mengelola Menu Items**
- Menu **"Menu Items"** di sidebar
- Field yang bisa dikelola:
  - Nama menu
  - Deskripsi
  - Harga
  - Kategori
  - Status ketersediaan
  - Upload gambar (opsional)

#### 4. **Mengelola Pesanan**
- Menu **"Pesanan"** di sidebar
- Fitur utama:
  - Lihat semua pesanan dengan filter
  - Update status pesanan:
    - **Pending** → **Preparing** → **Ready** → **Completed**
    - Atau **Cancelled** jika dibatalkan
  - Lihat detail lengkap pesanan
  - Export data pesanan

#### 5. **Status Pesanan**
- **Pending** (Menunggu): Pesanan baru masuk
- **Preparing** (Sedang Disiapkan): Dapur mulai memasak
- **Ready** (Siap Disajikan): Pesanan siap diambil
- **Completed** (Selesai): Pesanan sudah diterima pelanggan
- **Cancelled** (Dibatalkan): Pesanan dibatalkan

---

## 🔄 **Workflow Sistem**

### Sisi Pelanggan:
1. Buka aplikasi → Pilih menu → Tambah ke keranjang
2. Isi data diri → Buat pesanan → Dapat ID pesanan
3. Tunjukkan ID ke pelayan → Tunggu pesanan siap

### Sisi Admin/Pelayan:
1. Terima notifikasi pesanan baru (status: Pending)
2. Konfirmasi → Ubah status ke "Preparing"
3. Informasi ke dapur → Proses memasak
4. Selesai masak → Ubah status ke "Ready"
5. Pesanan diambil pelanggan → Ubah status ke "Completed"

---

## 📊 **Data Sample**

Sistem sudah dilengkapi dengan data contoh:

### Kategori:
- Makanan Utama
- Minuman  
- Dessert
- Appetizer

### Menu Items (10 items):
- Nasi Goreng Spesial (Rp 25.000)
- Mie Ayam Bakso (Rp 20.000)
- Gado-Gado (Rp 18.000)
- Es Jeruk (Rp 8.000)
- Kopi Hitam (Rp 6.000)
- Dan lainnya...

---

## 🚨 **Troubleshooting**

### Frontend tidak load:
- Pastikan `npm run dev` berjalan di port 5173
- Check console browser untuk error

### Backend error:
- Pastikan `php artisan serve` berjalan di port 8000
- Check database connection di `.env`

### API tidak konek:
- Pastikan CORS dikonfigurasi dengan benar
- Check network tab di browser developer tools

---

## 🎯 **Tips Penggunaan**

1. **Untuk Demo:** Buat beberapa pesanan test untuk melihat dashboard statistics
2. **Admin Panel:** Explore semua menu untuk familiarisasi
3. **Mobile:** Sistem responsive, bisa digunakan di smartphone
4. **Performance:** Gunakan sample data untuk testing optimal

---

**Sistem siap digunakan! 🚀**
