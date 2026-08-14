# FakeStore BTS - Frontend Developer Assessment

Aplikasi web modern berbasis **React.js + Tailwind CSS** yang mengonsumsi **Platzi Fake Store API**. Proyek ini dibuat untuk memenuhi seluruh persyaratan dalam panduan **Frontend Developer Test**.

---

## 🌟 Fitur Utama

1. **Autentikasi & Route Protection (Middleware)**
   - Halaman login dengan validasi field `username` (atau email) dan `password` (keduanya wajib diisi).
   - Middleware `<ProtectedRoute>` untuk membatasi akses fitur tertentu (seperti Tambah Produk).
   - State sesi tersimpan secara persisten di `localStorage`.
   - Tombol pengisian cepat (1-Click Demo Fill) untuk kemudahan penilai.

2. **Daftar Produk & UI Modern**
   - Fetching data produk langsung dari `https://api.escuelajs.co/api/v1/products`.
   - Kartu produk interaktif menampilkan gambar (dengan sanitasi & fallback otomatis), nama produk, harga berformat mata uang, dan badge kategori.
   - Quick View modal & Halaman Detail Produk lengkap dengan galeri foto dan breadcrumb.
   - Efek shimmer skeleton loading saat data sedang dimuat.

3. **Pencarian Real-Time & Paginasi**
   - Search bar interaktif untuk mencari produk berdasarkan judul, deskripsi, atau kategori.
   - Filter cepat berdasarkan kategori produk via pill buttons.
   - Paginasi dinamis (12 item per halaman) dengan navigasi First/Last, Previous/Next, dan ellipsis nomor halaman.

4. **Tambah Produk Baru (Protected Route)**
   - Form pembuatan produk via `POST https://api.escuelajs.co/api/v1/products`.
   - Validasi ketat:
     - `title`: Wajib diisi, maksimal 150 karakter (disertai indikator panjang karakter).
     - `price`: Wajib diisi, harus berupa angka > 0.
     - `categoryId`: Wajib dipilih dari daftar kategori aktif di server.
     - `description` & `images`: Opsional (disertai Live Card Preview interaktif).
   - Notifikasi Toast (Success / Error) menggunakan `react-hot-toast`.
   - **Instant State Update**: Produk baru langsung ditambahkan ke state katalog lokal di posisi teratas tanpa perlu reload halaman.

5. **Dockerization**
   - Multi-stage `Dockerfile` (Node 20 Alpine builder + Nginx Alpine production server).
   - Konfigurasi `nginx.conf` untuk SPA Routing (`try_files $uri /index.html;`) dan gzip compression.
   - `docker-compose.yml` untuk kemudahan deployment 1-perintah.

---

## 🛠️ Tech Stack

- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios (dengan Interceptor JWT)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Docker & Nginx Alpine

---

## 🔑 Kredensial Demo Akun

Anda dapat menggunakan salah satu akun berikut untuk login:

| Tipe Akun           | Username / Email | Password   |
| :------------------ | :--------------- | :--------- |
| **Akun Platzi API** | `john@mail.com`  | `changeme` |
| **Akun Demo Cepat** | `admin`          | `admin123` |

_(Tersedia tombol 1-klik di halaman login untuk mengisi otomatis)_

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Secara Lokal (Node.js / NPM)

Pastikan Node.js (v18+) sudah terinstal di komputer Anda.

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000` (atau port yang ditampilkan di terminal).

Untuk membuat production build lokal:

```bash
npm run build
npm run preview
```

---

### 2. Menjalankan Menggunakan Docker

Pastikan Docker & Docker Compose sudah berjalan di perangkat Anda.

#### Menggunakan Docker Compose (Direkomendasikan):

```bash
# Build dan jalankan container
docker compose up --build -d

# Memeriksa log
docker compose logs -f

# Menghentikan container
docker compose down
```

Aplikasi dapat langsung diakses melalui browser di:
👉 **`http://localhost:3000`**

#### Menggunakan Docker CLI Manual:

```bash
# Build image
docker build -t fake-store-bts .

# Jalankan container
docker run -d -p 3000:80 --name fake-store-app fake-store-bts
```

---

## 📁 Struktur Direktori

```text
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CategoryFilter.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SearchBar.jsx
│   │   └── SkeletonCard.jsx
│   ├── context/             # Global React Contexts
│   │   ├── AuthContext.jsx
│   │   └── ProductContext.jsx
│   ├── pages/               # Page Views
│   │   ├── AddProductPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── ProductDetailPage.jsx
│   ├── services/            # Axios API Services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── productService.js
│   ├── utils/               # Sanitizers, Formatters, & Validators
│   │   └── helpers.js
│   ├── App.jsx              # Main routes and layouts
│   ├── index.css            # Tailwind & custom CSS
│   └── main.jsx             # React DOM entrypoint
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.html
├── nginx.conf
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---
