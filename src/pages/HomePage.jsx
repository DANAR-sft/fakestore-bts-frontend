import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { 
  PackageSearch, 
  PlusCircle, 
  RotateCcw, 
  X, 
  ShoppingBag, 
  Tag, 
  CheckCircle2,
  ExternalLink 
} from 'lucide-react';
import { formatCurrency, cleanImageUrl } from '../utils/helpers';

const HomePage = () => {
  const {
    categories,
    paginatedProducts,
    filteredProducts,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    fetchData,
  } = useProducts();

  const { isAuthenticated } = useAuth();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategoryId('all');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/30 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Katalog Resmi Fake Store API</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Eksplorasi Produk Berkualitas dengan Antarmuka Modern
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Aplikasi manajemen dan katalog produk interaktif dengan pencarian instan, paginasi dinamis, autentikasi aman, dan penambahan produk real-time.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/products/add"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold shadow transition-all hover:scale-105"
              >
                <span>Masuk untuk Kelola Produk</span>
              </Link>
            )}
            <button
              onClick={() => fetchData()}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/10 transition-colors disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Muat Ulang Data</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            totalResults={searchTerm ? filteredProducts.length : undefined}
          />

          <div className="text-xs text-slate-500 flex items-center justify-end gap-2">
            <span>Menampilkan total <strong>{filteredProducts.length}</strong> produk</span>
          </div>
        </div>

        {/* Category Pills */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </section>

      {/* Main Products Grid */}
      <section>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-md mx-auto my-12">
            <p className="text-rose-700 font-semibold mb-2">Terjadi Kesalahan</p>
            <p className="text-xs text-rose-600 mb-4">{error}</p>
            <button
              onClick={() => fetchData()}
              className="px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center max-w-md mx-auto my-8 shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <PackageSearch className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Produk Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mb-5">
              Tidak ada produk yang cocok dengan pencarian "{searchTerm}" pada kategori yang dipilih.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Pencarian & Kategori</span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-slate-100 relative">
              <img
                src={cleanImageUrl(quickViewProduct.images)}
                alt={quickViewProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-2">
                  <Tag className="w-3 h-3" />
                  {quickViewProduct.category?.name || 'Umum'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {quickViewProduct.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-4 leading-relaxed">
                  {quickViewProduct.description || 'Tidak ada deskripsi rinci untuk produk ini.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 uppercase font-medium">Harga</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {formatCurrency(quickViewProduct.price)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/products/${quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <span>Halaman Detail Lengkap</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
